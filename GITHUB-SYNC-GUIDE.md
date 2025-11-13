# 🔄 GitHub Sync Guide - Quest Coach

## ✅ Problem Solved!

You asked: **"if i use the subdomain and marked stuff and dumped ideas, how does it get back to claude code?"**

**Answer:** With this GitHub Sync feature, your web progress now syncs bidirectionally! 🎉

---

## 🎯 What This Adds

### Before (localStorage only):
```
❌ Web changes trapped in browser
❌ No sync to files/GitHub/Claude
❌ Each device separate
❌ Progress lost if browser cleared
```

### After (with GitHub Sync):
```
✅ Web → GitHub (manual or auto)
✅ GitHub → All devices
✅ Claude Code can see updates
✅ Never lose progress
✅ Same data everywhere!
```

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create GitHub Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it: "Quest Coach Sync"
4. Select scope: **`repo`** (full control)
5. Click "Generate token"
6. Copy the token (starts with `ghp_`)

### Step 2: Configure Quest Coach

1. Open Quest Coach: `quests.obaisukar.com` (after GitHub Pages setup)
2. Click "⚙️ Sync Settings"
3. Paste your GitHub token
4. (Optional) Enable auto-sync
5. Click "💾 Save Settings"

### Step 3: Initial Sync

**If you have progress locally:**
```
Click "⬆️ Sync to GitHub" → Pushes your data
```

**If you have progress on GitHub:**
```
Click "⬇️ Load from GitHub" → Pulls your data
```

---

## 📱 How It Works

### Workflow A: Manual Sync (Recommended to Start)

```
1. Use Quest Coach on web
2. Complete quests, dump thoughts
3. Click "⬆️ Sync to GitHub" when done
4. Changes pushed to GitHub
5. Open on other device
6. Click "⬇️ Load from GitHub"
7. All progress synced! ✅
```

### Workflow B: Auto-Sync (After Testing)

```
1. Enable auto-sync in settings
2. Use Quest Coach normally
3. Every change auto-syncs after 5 seconds
4. All devices stay in sync automatically! 🔄
```

---

## 🎮 Usage Examples

### Example 1: Web → Local Files
```
You on quests.obaisukar.com:
  → Complete "Anas Bitar" quest (+100 XP)
  → Brain dump: "Great idea for new song"
  → Click "⬆️ Sync to GitHub"
  → ✅ Pushed to GitHub

Claude Code:
  → Can now read quest-progress.json
  → Sees "Anas Bitar" completed
  → Sees your brain dump
  → Can respond to your notes!
```

### Example 2: Phone → Laptop
```
On phone (quests.obaisukar.com):
  → Mark 2 subtasks complete
  → Sync to GitHub

On laptop:
  → Load from GitHub
  → See same progress
  → Continue working ✅
```

### Example 3: Auto-Sync Magic
```
Enable auto-sync:
  → Complete quest → Auto-syncs in 5 sec
  → Add brain dump → Auto-syncs in 5 sec
  → Update anything → Auto-syncs in 5 sec
  → All devices stay current automatically! 🎉
```

---

## 📊 What Gets Synced

### All Your Quest Data:
- ✅ XP earned
- ✅ Level progress
- ✅ Completed quests
- ✅ Active quests
- ✅ Quest inventory
- ✅ Subtask completion
- ✅ Streak count
- ✅ Mood check-ins
- ✅ Brain dumps
- ✅ Daily reflections

**Everything stored in localStorage gets synced to GitHub!**

---

## 🔐 Security & Privacy

### Your Token is Safe:
- Stored only in your browser's localStorage
- Never sent anywhere except GitHub API
- You control it (can revoke anytime)
- Only you can access your quest data

### Token Permissions:
- Only needs `repo` scope
- Can read/write your repositories
- Cannot access other accounts
- Revoke anytime at: https://github.com/settings/tokens

---

## 🎯 Sync Strategies

### Option 1: Manual Sync (Best Control)
```
Pros:
  ✅ You control when sync happens
  ✅ Review changes before pushing
  ✅ No surprise overwrites
  ✅ Lower API usage

Best for:
  → When you want full control
  → Testing the feature
  → Infrequent syncing
```

### Option 2: Auto-Sync (Best Convenience)
```
Pros:
  ✅ Automatic syncing
  ✅ Never forget to sync
  ✅ All devices stay current
  ✅ No manual work

Best for:
  → After testing manual sync
  → Multiple devices
  → Frequent updates
```

---

## 🚨 Important Notes

### Conflict Resolution:
- **Sync to GitHub** = Overwrites remote (GitHub)
- **Load from GitHub** = Overwrites local (browser)
- If unsure, download your local data first!

### Export Before Major Changes:
```javascript
// In browser console:
JSON.stringify(localStorage.getItem('questCoachState'))
// Copy this as backup before loading from GitHub
```

### GitHub API Limits:
- Free: 5,000 requests/hour
- Manual sync: ~1 request per sync
- Auto-sync: ~12 requests/hour (if active)
- You'll never hit the limit! ✅

---

## 🎉 Complete Sync Flow

```
┌─────────────────────────────────────────────────┐
│  You at quests.obaisukar.com                    │
│    ↓                                             │
│  Complete quest, add brain dump                 │
│    ↓                                             │
│  Click "⬆️ Sync to GitHub" (or auto-sync)      │
│    ↓                                             │
│  GitHub API receives data                       │
│    ↓                                             │
│  quest-progress.json updated in repo            │
│    ↓                                             │
│  ALL devices can now "⬇️ Load from GitHub"     │
│    ↓                                             │
│  ✅ Everyone sees same progress!                │
│                                                   │
│  Claude Code can also read quest-progress.json  │
│    ↓                                             │
│  Claude responds to your brain dumps! 🤖         │
└─────────────────────────────────────────────────┘
```

---

## 💡 Pro Tips

### 1. Test First
Start with manual sync to understand how it works before enabling auto-sync.

### 2. Sync Before Switching Devices
Always sync on current device before switching to another.

### 3. Check Sync Status
Look at "Last sync: X min ago" in header to verify syncs.

### 4. Bookmark the Web App
Add `quests.obaisukar.com` to your home screen on phone!

### 5. Use Auto-Sync After Testing
Once comfortable, enable auto-sync for hands-free syncing.

---

## 🆘 Troubleshooting

### "GitHub token not configured"
- Click "⚙️ Sync Settings"
- Add your GitHub token
- Make sure it has `repo` scope

### "Sync failed: 401 Unauthorized"
- Token is invalid or expired
- Generate a new token
- Update in settings

### "Sync failed: 404 Not Found"
- File doesn't exist yet on GitHub
- Use "⬆️ Sync to GitHub" first to create it
- Then "⬇️ Load from GitHub" will work

### "Load from GitHub" shows old data
- Make sure you synced from other device first
- Check GitHub: https://github.com/thewahish/adhd-quest-coach/blob/main/quest-progress.json
- Verify file has latest data

### Auto-sync not working
- Check if enabled in settings
- Look for sync notifications (top-right)
- Check browser console for errors

---

## 📂 Files Added

### New Files:
1. **`github-sync.js`** - Sync functionality
2. **`GITHUB-SYNC-GUIDE.md`** - This guide

### Modified Files:
1. **`index.html`** - Added sync buttons and modal

---

## 🎯 What You Can Do Now

### On Web (quests.obaisukar.com):
- ✅ Complete quests
- ✅ Add brain dumps (type or speak!)
- ✅ Track mood and reflections
- ✅ Sync to GitHub with one click
- ✅ Access from any device

### On Local Files:
- ✅ Claude Code can read quest-progress.json
- ✅ See all your web progress
- ✅ Respond to brain dumps
- ✅ Track quest completions

### Result:
**TRUE BIDIRECTIONAL SYNC! 🎉**

---

## 🚀 Next Steps

### Today:
1. ✅ Create GitHub token
2. ✅ Add to Quest Coach settings
3. ✅ Do initial sync (push your current progress)
4. ✅ Test on another device

### This Week:
- Enable auto-sync after testing
- Access from phone/tablet
- Let Claude Code read your progress
- Enjoy seamless cross-device tracking!

### Future Enhancement (Optional):
- Full Backend API (250 XP quest)
- Real-time WebSocket sync
- User authentication
- Share progress with others

---

## ✅ Summary

### What This Solves:
Your question: "how does it get back to claude code?"

**Answer:**
```
Web changes → GitHub Sync → quest-progress.json → Claude can read it! ✅
```

### How to Use:
1. Create GitHub token (5 min)
2. Add to Quest Coach settings (1 min)
3. Click sync buttons when needed
4. Optional: Enable auto-sync

### Result:
- ✅ Web progress syncs to GitHub
- ✅ All devices can load same data
- ✅ Claude Code can read updates
- ✅ Never lose progress
- ✅ True bidirectional sync!

---

**🎉 You now have Option 2 from the solution document - Manual sync with optional auto-sync!**

**Later, you can still build Option 3 (Full Backend API) as a 250 XP quest if you want real-time WebSocket sync and user accounts.**

---

*Built: November 13, 2025*
*Time to build: 1-2 hours*
*XP earned: 50 XP (bonus quest!)*
*Status: ✅ COMPLETE - Ready to use!*
