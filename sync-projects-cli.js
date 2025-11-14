#!/usr/bin/env node
// CLI tool to sync Quest Coach completions to project folders
// Usage: node sync-projects-cli.js [state-file]

const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = '/Volumes/Ai/Projects';

// Parse all-projects-quests.js (simple string parsing)
function loadProjectQuests() {
    try {
        const questsPath = path.join(__dirname, 'all-projects-quests.js');
        const content = fs.readFileSync(questsPath, 'utf8');

        // Extract quest objects using regex (simple approach)
        const questPattern = /{[\s\S]*?name:\s*["'](.+?)["'][\s\S]*?project:\s*["'](.+?)["'][\s\S]*?questId:\s*["'](.+?)["'][\s\S]*?}/g;

        const quests = [];
        let match;

        // More reliable: use eval with proper context (safe since we control the file)
        const questsFile = content;
        const match2 = questsFile.match(/const allProjectQuests = (\[[\s\S]*\]);/);
        if (match2) {
            try {
                const questsArray = eval(match2[1]);
                return questsArray;
            } catch (e) {
                console.error('Failed to parse quests:', e.message);
            }
        }

        return quests;
    } catch (err) {
        console.error('❌ Failed to load all-projects-quests.js:', err.message);
        return [];
    }
}

// Load Quest Coach state (from file or GitHub sync)
function loadQuestCoachState(stateFile) {
    try {
        let statePath = stateFile;

        if (!statePath) {
            // Try common locations
            const locations = [
                path.join(__dirname, 'quest-coach-state.json'),
                path.join(__dirname, '.github-sync', 'quest-coach-state.json'),
                '/tmp/quest-coach-state.json'
            ];

            for (const loc of locations) {
                if (fs.existsSync(loc)) {
                    statePath = loc;
                    break;
                }
            }
        }

        if (!statePath || !fs.existsSync(statePath)) {
            console.error('❌ Quest Coach state file not found');
            console.log('💡 Provide state file path or ensure GitHub sync has created quest-coach-state.json');
            return null;
        }

        const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
        console.log(`📖 Loaded state from: ${statePath}`);
        return state;

    } catch (err) {
        console.error('❌ Failed to load Quest Coach state:', err.message);
        return null;
    }
}

// Sync completions to project folders
function syncToProjectFolders(state) {
    if (!state || !state.history || !state.history.questCompletions) {
        console.log('📭 No quest completions found in state');
        return;
    }

    const completions = state.history.questCompletions;
    console.log(`\n📊 Found ${completions.length} total quest completions`);
    console.log(`📤 Syncing to project folders in: ${PROJECTS_DIR}\n`);

    const allQuests = loadProjectQuests();
    const projectUpdates = {};
    let syncCount = 0;

    // Group completions by project
    completions.forEach(completion => {
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
                xpEarned: completion.xpEarned,
                category: completion.category
            });
        }
    });

    // Update each project's quest-status.json
    Object.entries(projectUpdates).forEach(([projectName, projectCompletions]) => {
        const projectPath = path.join(PROJECTS_DIR, projectName);
        const statusFile = path.join(projectPath, 'quest-status.json');

        try {
            // Create project directory if needed
            if (!fs.existsSync(projectPath)) {
                console.log(`  📁 Creating project folder: ${projectName}`);
                fs.mkdirSync(projectPath, { recursive: true });
            }

            // Load or create status file
            let status = {
                project: projectName,
                projectPath: projectPath,
                lastSyncedAt: null,
                lastSyncedFrom: 'Quest Coach',
                completedQuests: [],
                totalXPEarned: 0
            };

            if (fs.existsSync(statusFile)) {
                status = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
            }

            // Add new completions (avoid duplicates)
            let projectSyncCount = 0;
            projectCompletions.forEach(comp => {
                const exists = status.completedQuests.find(q =>
                    q.questName === comp.questName ||
                    (q.questId && comp.questId && q.questId === comp.questId)
                );

                if (!exists) {
                    status.completedQuests.push(comp);
                    status.totalXPEarned += (comp.xpEarned || 0);
                    projectSyncCount++;
                }
            });

            if (projectSyncCount > 0) {
                status.lastSyncedAt = new Date().toISOString();
                fs.writeFileSync(statusFile, JSON.stringify(status, null, 2), 'utf8');
                console.log(`  ✅ ${projectName}: Synced ${projectSyncCount} completions (${status.totalXPEarned} total XP)`);
                syncCount += projectSyncCount;
            } else {
                console.log(`  ⏭️  ${projectName}: Already up to date`);
            }

        } catch (err) {
            console.error(`  ❌ ${projectName}: Failed to sync - ${err.message}`);
        }
    });

    console.log(`\n✨ Sync complete! Updated ${syncCount} quests across ${Object.keys(projectUpdates).length} projects`);

    if (syncCount > 0) {
        console.log(`\n💡 Each project now has a quest-status.json file tracking completions`);
    }
}

// Main execution
function main() {
    console.log('🎮 Quest Coach → Projects Sync Tool\n');

    const args = process.argv.slice(2);
    const stateFile = args[0];

    const state = loadQuestCoachState(stateFile);
    if (!state) {
        process.exit(1);
    }

    syncToProjectFolders(state);
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { syncToProjectFolders, loadQuestCoachState, loadProjectQuests };
