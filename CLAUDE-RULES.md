# Claude Code Instructions for /Volumes/Ai Drive

## Core Rules (ALWAYS FOLLOW)

### 1. Chat Transcript Generation
**MANDATORY:** At the end of every significant Claude Code session, generate a chat summary transcript.

- **Location:** `/Volumes/Ai/chat-transcripts/`
- **Naming:** `YYYY-MM-DD_topic-description.txt` (plain text, NOT markdown)
- **Content:**
  - Date and session topic
  - Summary of accomplishments
  - Technical details (code changes, file paths with line numbers)
  - User requests addressed
  - Recommendations for next session
  - Important notes and follow-ups

**Why:** This allows the user to review chat results at any time, maintains history of work done, and provides continuity across sessions.

---

### 2. Project Structure Awareness

**Remember this structure:**

```
/Volumes/Ai/
├── .Master/              # Master scripts and templates
│   ├── scripts/          # Automation scripts
│   └── templates/        # Project templates
├── Projects/             # All active projects (23 repos)
│   ├── adhd-quest-coach/ # ADHD Quest Coach app
│   ├── ai-courses/       # AI learning materials
│   ├── AutoAgent/        # Multi-agent system
│   ├── Karazah/          # Syrian cuisine platform
│   ├── mawlid-songs/     # Mawlid songs project
│   ├── p-o-h/            # Pillars of Health
│   ├── ... (16 more)
│   └── website2.0/       # Personal website v2
├── Documentation/        # Central docs
├── chat-transcripts/     # Session transcripts (NEW)
└── *.md files           # Various docs at root
```

**Key Points:**
- All projects have GitHub remotes under `github.com/thewahish/`
- Use `./sync-github.sh` in any project to sync
- Most projects are on `main` branch

---

### 3. Knowledgebase & Documentation

**Always check these locations:**
- `/Volumes/Ai/Documentation/` - Central documentation
- `/Volumes/Ai/ALL-PROJECTS-OVERVIEW.md` - Project summaries
- `/Volumes/Ai/COMPLETE-MERGED-QUEST-LIST.md` - Quest Coach quests
- `/Volumes/Ai/.Master/` - Master scripts and templates
- Individual project READMEs

**When starting a session:**
1. Understand which project(s) are involved
2. Check for existing documentation
3. Reference previous chat transcripts if available

---

### 4. Multi-Agent/Project Architecture

**AutoAgent Structure:**
- Multi-agent system for automated tasks
- Located in `/Volumes/Ai/Projects/AutoAgent/`
- Uses specialized agents for different tasks

**Quest Coach Structure:**
- Browser-based ADHD task management
- Located in `/Volumes/Ai/Projects/adhd-quest-coach/`
- Quest definitions in `all-projects-quests.js`
- Syncs to GitHub via API

---

## Session Best Practices

### At Session Start:
1. Identify which project(s) are relevant
2. Check for recent changes: `git status` in project
3. Review existing documentation
4. Understand current context

### During Session:
1. Use TodoWrite to track tasks
2. Log comprehensive console output for debugging
3. Commit frequently with descriptive messages
4. Sync to GitHub after significant changes

### At Session End:
1. **GENERATE CHAT TRANSCRIPT** (see Rule #1)
2. Commit all changes
3. Sync all modified projects to GitHub
4. Note any pending tasks for next session

---

## GitHub Sync Commands

**Quick sync for any project:**
```bash
cd /Volumes/Ai/Projects/<project-name>
./sync-github.sh
```

**Manual sync:**
```bash
git add -A
git commit -m "Description of changes"
git pull --rebase origin main
git push origin main
```

**Bulk sync all projects:**
```bash
for dir in /Volumes/Ai/Projects/*/; do
    if [ -d "$dir/.git" ]; then
        echo "Syncing $(basename $dir)..."
        cd "$dir" && git pull --rebase origin main && git push origin main
        cd -
    fi
done
```

---

## Important Files Reference

| File | Purpose |
|------|---------|
| `/Volumes/Ai/CLAUDE.md` | This file - Claude Code instructions |
| `/Volumes/Ai/chat-transcripts/*.md` | Session transcripts |
| `/Volumes/Ai/ALL-PROJECTS-OVERVIEW.md` | Project summaries |
| `/Volumes/Ai/.Master/scripts/` | Automation scripts |
| `/Volumes/Ai/Projects/*/package.json` | Project dependencies |
| `/Volumes/Ai/Projects/*/.git/` | Git repositories |

---

## User Preferences

- **Console logging:** Comprehensive logging for debugging
- **Priority system:** Urgent > High > Medium > Low
- **Emoji usage:** Only when user requests
- **Notifications:** Clear, concise alerts
- **GitHub:** Keep all projects synced both ways
- **Documentation:** Generate transcripts, not unnecessary README files

---

*Last updated: 2025-11-16*
