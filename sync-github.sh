#!/bin/bash
# Quest Coach - GitHub Sync Script
# Syncs your local changes with GitHub automatically

echo "🔄 Quest Coach - GitHub Sync"
echo "=============================="
echo ""

cd "$(dirname "$0")"

# Check if we're in a git repo
if [ ! -d .git ]; then
    echo "❌ Error: Not a git repository"
    exit 1
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "📝 Found local changes. Committing..."

    # Show what changed
    git status -s
    echo ""

    # Add all changes
    git add -A

    # Create auto-commit with timestamp
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    git commit -m "Auto-sync: Quest Coach updates - $timestamp"
    echo "✅ Changes committed"
    echo ""
else
    echo "✨ No local changes to commit"
    echo ""
fi

# Pull latest changes from GitHub
echo "⬇️  Pulling latest changes from GitHub..."
git pull --rebase origin main

if [ $? -ne 0 ]; then
    echo "❌ Error pulling from GitHub. Resolve conflicts and try again."
    exit 1
fi

echo "✅ Pulled latest changes"
echo ""

# Push local commits to GitHub
echo "⬆️  Pushing to GitHub..."
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ Error pushing to GitHub"
    exit 1
fi

echo "✅ Pushed to GitHub"
echo ""
echo "🎉 Sync complete! Your Quest Coach is up to date on GitHub."
echo "   You can now access it from any device!"
