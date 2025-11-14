# 📁 Quest Coach → Project Folders Sync

## What It Does

When you complete quests in Quest Coach, this system syncs those completions back to individual project folders. Each project gets a `quest-status.json` file tracking:
- Which quests are completed
- When they were completed
- Total XP earned for that project
- Last sync timestamp

## How to Use

### Step 1: Complete Quests in Quest Coach
Use Quest Coach normally - complete quests, earn XP, level up!

### Step 2: Export State
1. Open Quest Coach
2. Click "⚙️ Sync" button (top-right)
3. Click "📁 Sync to Projects" button
4. Download `quest-coach-state.json` file

### Step 3: Run Sync Command
```bash
cd /Volumes/Ai/Projects/adhd-quest-coach
node sync-projects-cli.js ~/Downloads/quest-coach-state.json
```

### Step 4: Check Results
Each project folder now has `quest-status.json`:
```json
{
  "project": "mawlid-songs",
  "projectPath": "/Volumes/Ai/Projects/mawlid-songs",
  "lastSyncedAt": "2025-11-14T10:30:00.000Z",
  "lastSyncedFrom": "Quest Coach",
  "completedQuests": [
    {
      "questName": "Mawlid Songs - Audio Production",
      "questId": "quest-mawlid-audio",
      "completedAt": "2025-11-13T15:45:00.000Z",
      "xpEarned": 1000,
      "category": "urgent"
    }
  ],
  "totalXPEarned": 1000
}
```

## What Gets Synced

✅ Quest completions from Quest Coach history
✅ XP earned per quest
✅ Completion timestamps
✅ Quest categories
✅ Project association

❌ Active (incomplete) quests are NOT synced
❌ Quest Coach UI state (level, streak, etc.) is NOT synced

## Benefits

1. **Per-Project Tracking**: Each project knows its own status
2. **Cross-Tool Compatibility**: Other tools can read `quest-status.json`
3. **Audit Trail**: See when quests were completed
4. **XP by Project**: Track which projects earn most XP
5. **Bidirectional Sync Ready**: Foundation for project → Quest Coach sync

## File Locations

- **Quest Coach State**: `~/Downloads/quest-coach-state.json` (exported)
- **Sync Script**: `/Volumes/Ai/Projects/adhd-quest-coach/sync-projects-cli.js`
- **Project Status**: `/Volumes/Ai/Projects/[project-name]/quest-status.json`

## Example Output

```bash
🎮 Quest Coach → Projects Sync Tool

📖 Loaded state from: /Users/you/Downloads/quest-coach-state.json

📊 Found 15 total quest completions
📤 Syncing to project folders in: /Volumes/Ai/Projects

  ✅ mawlid-songs: Synced 3 completions (1500 total XP)
  ✅ adhd-quest-coach: Synced 5 completions (310 total XP)
  ✅ personal-urgent: Synced 1 completions (100 total XP)
  ⏭️  path-of-heroes: Already up to date

✨ Sync complete! Updated 9 quests across 3 projects

💡 Each project now has a quest-status.json file tracking completions
```

## Automation Ideas

Want to auto-sync? Add this to your workflow:

**Option 1: Git Hook**
```bash
# In adhd-quest-coach/.git/hooks/post-commit
cd /Volumes/Ai/Projects/adhd-quest-coach
node sync-projects-cli.js quest-coach-state.json
```

**Option 2: Cron Job**
```bash
# Run sync every hour
0 * * * * cd /Volumes/Ai/Projects/adhd-quest-coach && node sync-projects-cli.js ~/.quest-coach-state.json
```

**Option 3: GitHub Actions**
- Push state to GitHub (already implemented in Quest Coach)
- GitHub Action runs sync script
- Commits updated project status files

## Troubleshooting

**"Quest Coach state file not found"**
- Make sure you downloaded the state file
- Provide full path to the file

**"No quest completions found"**
- Complete some quests in Quest Coach first!
- Check that history tracking is working

**"Failed to update project"**
- Check project folder exists
- Ensure write permissions
- Verify project name matches in `all-projects-quests.js`

## Next Steps

This is **Step 1** of bidirectional sync. Future enhancements:
- Project → Quest Coach sync (update UI when project status changes)
- Real-time sync via file watchers
- Web API for instant sync
- Multi-device sync via GitHub

---

**Built with Quest Coach - Your ADHD-Friendly RPG Life System** 🎮
