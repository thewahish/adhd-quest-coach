# 🔄 GitHub Sync - Access Quest Coach From Anywhere

## What This Does

Keeps your Quest Coach code synced with GitHub so you can:
- ✅ Access from any device (laptop, desktop, etc.)
- ✅ Never lose your quest definitions
- ✅ Keep everything backed up automatically
- ✅ Edit quests from anywhere and sync

**Note:** This syncs the **code and quest definitions** in `all-projects-quests.js`, not your browser's localStorage data (XP, completed quests, etc.). For localStorage sync, see the Export/Import feature in the app.

---

## Quick Sync (Easiest Way)

### Option 1: Run the Sync Script

Just run this in your terminal from the adhd-quest-coach directory:

```bash
./sync-github.sh
```

**What it does:**
1. ✅ Commits any local changes automatically
2. ⬇️ Pulls latest changes from GitHub
3. ⬆️ Pushes your local changes to GitHub
4. 🎉 Done!

---

### Option 2: Manual Sync (Step by Step)

**To sync your local changes to GitHub:**

```bash
cd /Volumes/Ai/Projects/adhd-quest-coach

# Add all changes
git add -A

# Commit with a message
git commit -m "Update quests - $(date '+%Y-%m-%d %H:%M')"

# Pull latest from GitHub first (in case you edited from another device)
git pull --rebase origin main

# Push to GitHub
git push origin main
```

---

## Setting Up From Another Device

**On your new device (laptop, desktop, etc.):**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/thewahish/adhd-quest-coach.git
   cd adhd-quest-coach
   ```

2. **Open in browser:**
   - Just open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Python 3
     python3 -m http.server 8000

     # Then open: http://localhost:8000
     ```

3. **Make changes and sync:**
   ```bash
   ./sync-github.sh
   ```

---

## Automatic Sync (Optional - Advanced)

If you want to sync every time you make changes automatically:

### Create a Git Hook

```bash
cd /Volumes/Ai/Projects/adhd-quest-coach

# Create post-commit hook
cat > .git/hooks/post-commit << 'EOF'
#!/bin/bash
echo "🔄 Auto-syncing to GitHub..."
git push origin main
EOF

chmod +x .git/hooks/post-commit
```

Now every time you commit, it will automatically push to GitHub!

---

## Syncing Your Progress (XP, Completed Quests)

The GitHub sync handles **code and quest definitions**. To sync your **progress** (XP, level, completed quests):

### Export Your State
1. Open Quest Coach in browser
2. Click "⚙️ Sync" → "📁 Sync to Projects"
3. This creates `quest-coach-state.json`

### Commit State File (Optional)
```bash
git add quest-coach-state.json
git commit -m "Update quest progress"
git push origin main
```

### Import State on Another Device
1. Pull latest changes: `git pull origin main`
2. Copy `quest-coach-state.json` to browser localStorage
3. Or use the Import feature (coming soon!)

---

## Workflow Example

**Working from your main laptop:**
1. Edit quests in Quest Coach or update `all-projects-quests.js`
2. Run `./sync-github.sh`
3. ✅ Changes on GitHub

**Later, from your desktop:**
1. Run `git pull origin main` in the project folder
2. Hard refresh browser (Cmd+Shift+R)
3. ✅ Latest quests appear!

**Made more changes on desktop:**
1. Run `./sync-github.sh`
2. ✅ Synced back to GitHub

**Back to laptop:**
1. Run `git pull origin main`
2. ✅ Desktop changes now on laptop!

---

## Troubleshooting

**"Error pushing to GitHub":**
- Make sure you've authenticated with GitHub
- Check your internet connection
- Try: `git pull --rebase origin main` first, then `git push origin main`

**"Merge conflicts":**
- This means you edited the same file from different devices
- Resolve conflicts manually:
  ```bash
  git status  # See conflicted files
  # Edit files to fix conflicts (look for <<<<<<, ======, >>>>>>)
  git add -A
  git commit -m "Resolved conflicts"
  git push origin main
  ```

**"Permission denied":**
- Run: `chmod +x sync-github.sh`
- Or use manual sync commands instead

---

## Summary

✅ **Easy way:** `./sync-github.sh` in terminal
✅ **Access anywhere:** Git clone on any device
✅ **Never lose work:** Everything backed up on GitHub
✅ **Stay synced:** Pull before editing, push after changes

Your Quest Coach is now accessible from anywhere! 🎉
