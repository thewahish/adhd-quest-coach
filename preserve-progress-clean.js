// Quest Coach: Clean Import While Preserving Progress
// Run this in browser console to clear duplicates but keep quest completion status

(function() {
    console.log('🧹 Starting clean import with progress preservation...\n');

    // Step 1: Backup current progress
    const currentState = JSON.parse(localStorage.getItem('questCoachState') || '{}');

    const progressBackup = {
        xp: currentState.xp || 0,
        level: currentState.level || 1,
        streak: currentState.streak || 0,
        completedQuests: [],
        questProgress: {}
    };

    // Save which quests are completed and their progress
    if (currentState.quests) {
        currentState.quests.forEach(quest => {
            if (quest.completed) {
                progressBackup.completedQuests.push({
                    title: quest.title,
                    questId: quest.questId,
                    completed: true,
                    xpValue: quest.xpValue
                });
            }

            // Save subtask progress
            if (quest.subtasks && quest.subtasks.length > 0) {
                const completedSubtasks = quest.subtasks.filter(st => st.completed);
                if (completedSubtasks.length > 0) {
                    progressBackup.questProgress[quest.title] = {
                        subtasks: quest.subtasks.map(st => ({
                            title: st.title,
                            completed: st.completed
                        }))
                    };
                }
            }
        });
    }

    console.log('📦 Progress backed up:');
    console.log('   XP: ' + progressBackup.xp + ', Level: ' + progressBackup.level);
    console.log('   Completed quests: ' + progressBackup.completedQuests.length);
    console.log('   Quests with subtask progress: ' + Object.keys(progressBackup.questProgress).length + '\n');

    // Step 2: Clear localStorage
    localStorage.clear();
    console.log('✅ localStorage cleared\n');

    // Step 3: Store backup and reload
    console.log('🔄 Reloading page to import fresh quests...\n');
    console.log('⚙️ Your progress will be automatically restored after reload\n');

    // Store backup in sessionStorage (survives page reload)
    sessionStorage.setItem('questProgressBackup', JSON.stringify(progressBackup));
    sessionStorage.setItem('autoRestore', 'true');

    // Reload after 1 second
    setTimeout(function() {
        location.reload();
    }, 1000);
})();
