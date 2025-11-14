// GitHub Sync for Quest Coach
// This enables bidirectional sync between localStorage and GitHub

class GitHubSync {
    constructor() {
        this.owner = 'thewahish';
        this.repo = 'adhd-quest-coach';
        this.filePath = 'quest-progress.json';
        this.token = localStorage.getItem('github_token');
        this.lastSyncTime = localStorage.getItem('last_sync_time');
        this.autoSyncEnabled = localStorage.getItem('auto_sync') === 'true';
    }

    // Export state as downloadable JSON file
    exportStateForProjectSync(questData) {
        const stateJSON = JSON.stringify(questData, null, 2);
        const blob = new Blob([stateJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quest-coach-state.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return true;
    }

    // Check if sync is configured
    isConfigured() {
        return !!this.token;
    }

    // Set GitHub token
    setToken(token) {
        this.token = token;
        localStorage.setItem('github_token', token);
    }

    // Enable/disable auto-sync
    setAutoSync(enabled) {
        this.autoSyncEnabled = enabled;
        localStorage.setItem('auto_sync', enabled ? 'true' : 'false');
    }

    // Push current quest data to GitHub
    async pushToGitHub(questData) {
        if (!this.isConfigured()) {
            throw new Error('GitHub token not configured. Please add your token in settings.');
        }

        try {
            // First, get the current file SHA (needed for updates)
            let sha = null;
            try {
                const getResponse = await fetch(
                    `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.filePath}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${this.token}`,
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    }
                );

                if (getResponse.ok) {
                    const fileData = await getResponse.json();
                    sha = fileData.sha;
                }
            } catch (e) {
                // File doesn't exist yet, that's okay
                console.log('File does not exist yet, will create new file');
            }

            // Prepare the commit
            const content = btoa(unescape(encodeURIComponent(JSON.stringify(questData, null, 2))));
            const message = `Quest sync from web - ${new Date().toISOString()}`;

            const body = {
                message: message,
                content: content,
                branch: 'main'
            };

            if (sha) {
                body.sha = sha; // Include SHA for updates
            }

            // Push to GitHub
            const response = await fetch(
                `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.filePath}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.github.v3+json'
                    },
                    body: JSON.stringify(body)
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to sync to GitHub');
            }

            const result = await response.json();
            this.lastSyncTime = new Date().toISOString();
            localStorage.setItem('last_sync_time', this.lastSyncTime);

            return {
                success: true,
                message: 'Successfully synced to GitHub!',
                commitUrl: result.commit.html_url,
                timestamp: this.lastSyncTime
            };

        } catch (error) {
            console.error('GitHub sync error:', error);
            throw error;
        }
    }

    // Pull quest data from GitHub
    async pullFromGitHub() {
        if (!this.isConfigured()) {
            throw new Error('GitHub token not configured. Please add your token in settings.');
        }

        try {
            const response = await fetch(
                `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.filePath}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('No quest data found on GitHub. Push your data first!');
                }
                throw new Error('Failed to fetch from GitHub');
            }

            const fileData = await response.json();
            const content = decodeURIComponent(escape(atob(fileData.content)));
            const questData = JSON.parse(content);

            this.lastSyncTime = new Date().toISOString();
            localStorage.setItem('last_sync_time', this.lastSyncTime);

            return {
                success: true,
                data: questData,
                message: 'Successfully loaded from GitHub!',
                timestamp: this.lastSyncTime
            };

        } catch (error) {
            console.error('GitHub pull error:', error);
            throw error;
        }
    }

    // Get last sync time formatted
    getLastSyncFormatted() {
        if (!this.lastSyncTime) return 'Never';
        const date = new Date(this.lastSyncTime);
        const now = new Date();
        const diffMinutes = Math.floor((now - date) / 60000);

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes} min ago`;
        if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hours ago`;
        return date.toLocaleDateString();
    }
}

// Initialize global sync instance
window.githubSync = new GitHubSync();

// === UI Functions ===

// Show sync status notification
function showSyncNotification(message, type = 'success') {
    const notif = document.createElement('div');
    notif.className = `sync-notification ${type}`;
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#ffc107'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Push to GitHub
async function syncToGitHub() {
    const syncBtn = document.getElementById('sync-push-btn');
    const originalText = syncBtn.textContent;

    try {
        syncBtn.textContent = '⏳ Syncing...';
        syncBtn.disabled = true;

        const questData = JSON.parse(localStorage.getItem('questCoachState'));
        const result = await window.githubSync.pushToGitHub(questData);

        showSyncNotification('✅ ' + result.message);
        updateSyncStatus();

        // Play success sound
        playSuccessSound();

    } catch (error) {
        showSyncNotification('❌ Sync failed: ' + error.message, 'error');
        console.error(error);
    } finally {
        syncBtn.textContent = originalText;
        syncBtn.disabled = false;
    }
}

// Pull from GitHub
async function syncFromGitHub() {
    if (!confirm('⚠️ This will replace your current progress with data from GitHub. Continue?')) {
        return;
    }

    const syncBtn = document.getElementById('sync-pull-btn');
    const originalText = syncBtn.textContent;

    try {
        syncBtn.textContent = '⏳ Loading...';
        syncBtn.disabled = true;

        const result = await window.githubSync.pullFromGitHub();

        // Update local storage
        localStorage.setItem('questCoachState', JSON.stringify(result.data));

        // Reload the page to refresh UI
        showSyncNotification('✅ ' + result.message + ' Reloading...');
        setTimeout(() => location.reload(), 1500);

    } catch (error) {
        showSyncNotification('❌ Load failed: ' + error.message, 'error');
        console.error(error);
    } finally {
        syncBtn.textContent = originalText;
        syncBtn.disabled = false;
    }
}

// Show sync settings modal
function showSyncSettings() {
    const modal = document.getElementById('sync-settings-modal');
    const tokenInput = document.getElementById('github-token-input');
    const autoSyncCheckbox = document.getElementById('auto-sync-checkbox');
    const tokenStatus = document.getElementById('token-status');

    tokenInput.value = window.githubSync.token || '';
    autoSyncCheckbox.checked = window.githubSync.autoSyncEnabled;

    // Show status if token exists
    if (window.githubSync.token) {
        tokenStatus.style.display = 'block';
    } else {
        tokenStatus.style.display = 'none';
    }

    modal.style.display = 'flex';
}

// Toggle token visibility
function showTokenMask() {
    const tokenInput = document.getElementById('github-token-input');
    if (tokenInput.type === 'password') {
        tokenInput.type = 'text';
    } else {
        tokenInput.type = 'password';
    }
}

// Close sync settings modal
function closeSyncSettings() {
    document.getElementById('sync-settings-modal').style.display = 'none';
}

// Save sync settings
function saveSyncSettings() {
    const token = document.getElementById('github-token-input').value.trim();
    const autoSync = document.getElementById('auto-sync-checkbox').checked;

    if (token) {
        window.githubSync.setToken(token);
        window.githubSync.setAutoSync(autoSync);
        showSyncNotification('✅ Settings saved!');
        updateSyncStatus();
        closeSyncSettings();
    } else {
        alert('Please enter a GitHub token');
    }
}

// Update sync status display
function updateSyncStatus() {
    const statusEl = document.getElementById('sync-status');
    if (statusEl) {
        const lastSync = window.githubSync.getLastSyncFormatted();
        const configured = window.githubSync.isConfigured();
        statusEl.textContent = configured ? `Last sync: ${lastSync}` : 'Not configured';
        statusEl.style.color = configured ? '#28a745' : '#ffc107';
    }
}

// Play success sound
function playSuccessSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCx+zPLTgjMGHm7A7+OZURE');
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignore if audio fails
}

// Initialize sync status on page load
document.addEventListener('DOMContentLoaded', function() {
    updateSyncStatus();

    // Auto-sync on state changes (if enabled)
    const originalSaveState = window.saveState;
    if (typeof originalSaveState === 'function') {
        window.saveState = function() {
            originalSaveState();

            // Auto-sync if enabled (debounced)
            if (window.githubSync.autoSyncEnabled && window.githubSync.isConfigured()) {
                clearTimeout(window.autoSyncTimeout);
                window.autoSyncTimeout = setTimeout(() => {
                    syncToGitHub().catch(console.error);
                }, 5000); // Wait 5 seconds after last change
            }
        };
    }
});
