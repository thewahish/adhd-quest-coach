# 🧹 Clean Import with Progress Preservation

## What This Does

Removes all duplicate quests and old data from your Quest Coach while keeping:
- ✅ Your XP and Level
- ✅ All completed quests (marked as done)
- ✅ Subtask progress (which subtasks you've finished)
- ✅ Your streak

After the clean import, you'll have:
- 🎯 All 42 real quests from `all-projects-quests.js`
- ❌ No duplicates (like the two CPA K-1 quests)
- 🎨 Clean, fresh UI
- 📊 All your progress intact

---

## How to Run Clean Import

**In Quest Coach webpage:**

1. Open browser console (F12 or Cmd+Option+I)

2. Copy and paste this entire script:

```javascript
(function() {
    console.log('🧹 Starting clean import with progress preservation...\n');

    const currentState = JSON.parse(localStorage.getItem('questCoachState') || '{}');

    const progressBackup = {
        xp: currentState.xp || 0,
        level: currentState.level || 1,
        streak: currentState.streak || 0,
        completedQuests: [],
        questProgress: {}
    };

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

    localStorage.clear();
    console.log('✅ localStorage cleared\n');
    console.log('🔄 Reloading page to import fresh quests...\n');
    console.log('⚙️ Your progress will be automatically restored after reload\n');

    sessionStorage.setItem('questProgressBackup', JSON.stringify(progressBackup));
    sessionStorage.setItem('autoRestore', 'true');

    setTimeout(function() {
        location.reload();
    }, 1000);
})();
```

3. Press Enter

4. **Wait for the page to reload automatically**

5. After reload, you'll see an alert: "✅ Clean import complete!"

6. Done! Check your quests - all duplicates gone, progress intact.

---

## What You'll See After

**Before Clean Import:**
- "Request K-1 from CPA for Taxes" (Step 1/3 chain) ✅ Real quest
- "Follow up with CPA for K1s (tax returns)" ❌ Duplicate
- Other duplicates and old sample data

**After Clean Import:**
- "Request K-1 from CPA for Taxes" (Step 1/3 chain) ✅ Only this one!
- All 42 real quests, no duplicates
- Your completed quests still marked as done
- Your XP/level unchanged

---

## Troubleshooting

**If progress doesn't restore:**
- Check console for error messages
- Make sure you waited for the reload to complete
- The restore happens automatically 1 second after reload

**If you see issues:**
- Open console and check for any red errors
- Screenshot and send to me

---

## Manual Restore (If Auto-Restore Fails)

If the automatic restore doesn't work, you can manually trigger it:

```javascript
// Check if backup exists
console.log(sessionStorage.getItem('questProgressBackup'));

// If you see data, manually restore:
autoRestoreProgress();
```

---

## Summary

This is the **safest way** to clean up duplicates while keeping your progress. The script:

1. Backs up your XP, level, completed quests, and subtask progress
2. Clears all localStorage (removes duplicates and old data)
3. Reloads page → Quest Importer loads fresh 42 quests
4. Auto-restores your progress to the fresh quest list
5. Shows success message with restored stats

**Ready to run it?** Just copy-paste the script from step 2 above into your browser console!
