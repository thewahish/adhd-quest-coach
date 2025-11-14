// Sync Quest Coach completions back to individual project folders
// This creates/updates quest-status.json in each project folder

const fs = require('fs');
const path = require('path');

// Base projects directory
const PROJECTS_DIR = '/Volumes/Ai/Projects';

// Read all-projects-quests.js to get project mappings
function loadProjectQuests() {
    try {
        const questsFile = fs.readFileSync('./all-projects-quests.js', 'utf8');
        // Extract the array (basic parsing - could be improved)
        const match = questsFile.match(/const allProjectQuests = (\[[\s\S]*\]);/);
        if (match) {
            // Use eval to parse (in production, use proper JSON parser)
            const quests = eval(match[1]);
            return quests;
        }
    } catch (err) {
        console.error('Failed to load all-projects-quests.js:', err.message);
    }
    return [];
}

// Sync completion queue to project folders
function syncCompletionsToProjects(completionQueue) {
    if (!completionQueue || completionQueue.length === 0) {
        console.log('📭 No pending completions to sync');
        return { success: true, synced: 0 };
    }

    console.log(`📤 Syncing ${completionQueue.length} quest completions to project folders...`);

    const allQuests = loadProjectQuests();
    const projectUpdates = {};
    let syncCount = 0;

    // Group completions by project
    completionQueue.forEach(completion => {
        const quest = allQuests.find(q =>
            q.name === completion.questName ||
            q.questId === completion.questId
        );

        if (quest && quest.project) {
            if (!projectUpdates[quest.project]) {
                projectUpdates[quest.project] = [];
            }
            projectUpdates[quest.project].push({
                questName: completion.questName,
                questId: completion.questId || quest.questId,
                completedAt: completion.completedAt,
                xpEarned: completion.xpEarned
            });
        }
    });

    // Update each project's quest-status.json
    Object.entries(projectUpdates).forEach(([projectName, completions]) => {
        const projectPath = path.join(PROJECTS_DIR, projectName);
        const statusFile = path.join(projectPath, 'quest-status.json');

        try {
            // Create project directory if it doesn't exist
            if (!fs.existsSync(projectPath)) {
                fs.mkdirSync(projectPath, { recursive: true });
            }

            // Load existing status or create new
            let status = {
                project: projectName,
                lastSyncedAt: null,
                completedQuests: [],
                activeQuests: []
            };

            if (fs.existsSync(statusFile)) {
                status = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
            }

            // Add new completions (avoid duplicates)
            completions.forEach(comp => {
                const exists = status.completedQuests.find(q =>
                    q.questName === comp.questName || q.questId === comp.questId
                );
                if (!exists) {
                    status.completedQuests.push(comp);
                    console.log(`  ✅ ${projectName}: "${comp.questName}"`);
                    syncCount++;
                }
            });

            // Update sync timestamp
            status.lastSyncedAt = new Date().toISOString();

            // Write back to file
            fs.writeFileSync(statusFile, JSON.stringify(status, null, 2), 'utf8');

        } catch (err) {
            console.error(`  ❌ Failed to update ${projectName}:`, err.message);
        }
    });

    console.log(`\n✨ Synced ${syncCount} quest completions to ${Object.keys(projectUpdates).length} projects!`);

    return {
        success: true,
        synced: syncCount,
        projects: Object.keys(projectUpdates).length
    };
}

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        syncCompletionsToProjects,
        loadProjectQuests
    };
}

// Browser compatibility - expose globally
if (typeof window !== 'undefined') {
    window.syncToProjects = {
        syncCompletionsToProjects,
        loadProjectQuests
    };
}
