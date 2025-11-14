// Quest Importer - Load all 42 real quests from all-projects-quests.js
// This populates the Quest Coach inventory with your actual project quests

// Import all quest data (this will be loaded from all-projects-quests.js)
function importAllQuests() {
    if (typeof allProjectQuests === 'undefined') {
        console.error('allProjectQuests not found! Make sure all-projects-quests.js is loaded first.');
        return false;
    }

    // Convert quest format from all-projects-quests.js to Quest Coach format
    const convertedQuests = allProjectQuests.map((quest, index) => {
        return {
            id: Date.now() + index,
            title: quest.name,
            category: quest.category || 'work',
            completed: quest.status === 'completed',
            xpValue: quest.xpValue,
            icon: quest.icon || '📋',
            status: quest.status || 'active',
            priority: quest.priority || 'medium',
            notes: quest.notes || '',
            project: quest.project || '',
            subtasks: quest.subtasks || [],
            // 🔗 Quest chain properties
            questId: quest.questId || null,  // Unique ID for referencing
            requiresQuest: quest.requiresQuest || null,  // Locks quest until another is completed
            questChain: quest.questChain || []  // Shows next steps in sequence
        };
    });

    // Separate into active and inventory based on status/priority
    const activeQuests = convertedQuests.filter(q =>
        q.status === 'active' &&
        (q.priority === 'urgent' || q.completed) &&
        appState.quests.length < 10 // Limit active quests to keep UI manageable
    );

    const inventoryQuests = convertedQuests.filter(q =>
        !activeQuests.find(aq => aq.id === q.id)
    );

    // Update appState
    if (!appState.quests) appState.quests = [];
    if (!appState.inventory) appState.inventory = [];

    // Add to inventory (avoid duplicates - check both title AND questId)
    let inventoryAdded = 0;
    inventoryQuests.forEach(quest => {
        const exists = appState.inventory.find(q =>
            q.title === quest.title ||
            (q.questId && quest.questId && q.questId === quest.questId)
        );
        if (!exists) {
            appState.inventory.push(quest);
            inventoryAdded++;
        }
    });

    // Add urgent/completed to active (avoid duplicates - check both title AND questId)
    let activeAdded = 0;
    activeQuests.forEach(quest => {
        const exists = appState.quests.find(q =>
            q.title === quest.title ||
            (q.questId && quest.questId && q.questId === quest.questId)
        );
        if (!exists && appState.quests.length < 10) {
            appState.quests.push(quest);
            activeAdded++;
        }
    });

    console.log(`📥 Quest Import: Added ${activeAdded} active, ${inventoryAdded} inventory (skipped ${inventoryQuests.length - inventoryAdded + activeQuests.length - activeAdded} duplicates)`);

    // Save and update
    saveState();
    updateUI();

    return {
        success: true,
        totalQuests: convertedQuests.length,
        activeQuests: appState.quests.length,
        inventoryQuests: appState.inventory.length,
        message: `✅ Imported ${convertedQuests.length} quests! ${appState.quests.length} active, ${appState.inventory.length} in inventory.`
    };
}

// Clear all quests and reimport (useful for testing)
function reimportAllQuests() {
    const confirmed = confirm('⚠️ This will clear all current quests and reimport from all-projects-quests.js. Continue?');
    if (!confirmed) return false;

    // Clear existing
    appState.quests = [];
    appState.inventory = [];

    // Import fresh
    return importAllQuests();
}

// Show import UI button
function showImportButton() {
    const questSection = document.querySelector('.quest-section');
    if (!questSection || document.getElementById('import-quests-btn')) return;

    const importBtn = document.createElement('button');
    importBtn.id = 'import-quests-btn';
    importBtn.textContent = '📥 Import All 42 Quests';
    importBtn.style.cssText = 'background: #17a2b8; margin-left: 10px; padding: 12px 20px;';
    importBtn.onclick = function() {
        const result = importAllQuests();
        if (result && result.success) {
            alert(result.message);
            this.textContent = '✅ Quests Imported!';
            this.disabled = true;
        }
    };

    const questListButtons = questSection.querySelector('button');
    questListButtons.parentNode.insertBefore(importBtn, questListButtons.nextSibling);
}

// Auto-import on first load if inventory is empty
function autoImportIfNeeded() {
    // Only auto-import if:
    // 1. Inventory is empty
    // 2. allProjectQuests is available
    // 3. Not already imported (check for Quest Coach Dev quest)

    if (appState.inventory && appState.inventory.length > 0) {
        console.log('✅ Inventory already has quests, skipping auto-import');
        return;
    }

    if (typeof allProjectQuests === 'undefined') {
        console.warn('⚠️ allProjectQuests not loaded yet');
        return;
    }

    console.log('📥 Auto-importing quests from all-projects-quests.js...');
    const result = importAllQuests();
    if (result && result.success) {
        console.log(result.message);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for all scripts to load
    setTimeout(() => {
        showImportButton();
        autoImportIfNeeded();
    }, 500);
});
