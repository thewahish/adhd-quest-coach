// Epic Gamification System for Quest Coach
// Makes earning XP and completing quests EXCITING!

// =====================================
// ACHIEVEMENTS & BADGES SYSTEM
// =====================================

const ACHIEVEMENTS = {
    // Getting Started
    firstQuest: {
        id: 'firstQuest',
        title: 'First Steps',
        description: 'Complete your first quest',
        icon: '🎯',
        xpBonus: 25,
        condition: (state) => state.history?.questCompletions?.length >= 1
    },
    streakStarter: {
        id: 'streakStarter',
        title: 'Consistency King',
        description: 'Maintain a 3-day streak',
        icon: '🔥',
        xpBonus: 50,
        condition: (state) => state.streak >= 3
    },

    // XP Milestones
    xp100: {
        id: 'xp100',
        title: 'Centurion',
        description: 'Earn 100 total XP',
        icon: '💯',
        xpBonus: 25,
        condition: (state) => state.xp >= 100
    },
    xp500: {
        id: 'xp500',
        title: 'Champion',
        description: 'Earn 500 total XP',
        icon: '⭐',
        xpBonus: 100,
        condition: (state) => state.xp >= 500
    },
    xp1000: {
        id: 'xp1000',
        title: 'Legend',
        description: 'Earn 1,000 total XP',
        icon: '👑',
        xpBonus: 200,
        condition: (state) => state.xp >= 1000
    },

    // Quest Completion
    quests5: {
        id: 'quests5',
        title: 'Quest Hunter',
        description: 'Complete 5 quests',
        icon: '🏹',
        xpBonus: 50,
        condition: (state) => state.history?.questCompletions?.length >= 5
    },
    quests10: {
        id: 'quests10',
        title: 'Quest Master',
        description: 'Complete 10 quests',
        icon: '⚔️',
        xpBonus: 100,
        condition: (state) => state.history?.questCompletions?.length >= 10
    },
    quests25: {
        id: 'quests25',
        title: 'Legendary Hero',
        description: 'Complete 25 quests',
        icon: '🛡️',
        xpBonus: 250,
        condition: (state) => state.history?.questCompletions?.length >= 25
    },

    // Level Milestones
    level5: {
        id: 'level5',
        title: 'Rising Star',
        description: 'Reach level 5',
        icon: '🌟',
        xpBonus: 100,
        condition: (state) => state.level >= 5
    },
    level10: {
        id: 'level10',
        title: 'Elite Warrior',
        description: 'Reach level 10',
        icon: '💪',
        xpBonus: 250,
        condition: (state) => state.level >= 10
    },

    // Streak Achievements
    streak7: {
        id: 'streak7',
        title: 'Week Warrior',
        description: '7-day streak',
        icon: '📅',
        xpBonus: 100,
        condition: (state) => state.streak >= 7
    },
    streak30: {
        id: 'streak30',
        title: 'Unstoppable',
        description: '30-day streak',
        icon: '🔥🔥',
        xpBonus: 500,
        condition: (state) => state.streak >= 30
    },

    // Special
    oneDayGrind: {
        id: 'oneDayGrind',
        title: 'Grind Master',
        description: 'Earn 500 XP in one day',
        icon: '⚡',
        xpBonus: 150,
        condition: (state) => {
            const today = new Date().toISOString().split('T')[0];
            const todayStats = state.history?.dailyStats?.find(s => s.date === today);
            return todayStats && todayStats.xpEarned >= 500;
        }
    },
    speedRunner: {
        id: 'speedRunner',
        title: 'Speed Runner',
        description: 'Complete 5 quests in one day',
        icon: '🏃',
        xpBonus: 100,
        condition: (state) => {
            const today = new Date().toISOString().split('T')[0];
            const todayStats = state.history?.dailyStats?.find(s => s.date === today);
            return todayStats && todayStats.questsCompleted >= 5;
        }
    }
};

// Check for new achievements
function checkAchievements(state) {
    if (!state.achievements) state.achievements = [];

    const newAchievements = [];

    Object.values(ACHIEVEMENTS).forEach(achievement => {
        const alreadyEarned = state.achievements.includes(achievement.id);
        if (!alreadyEarned && achievement.condition(state)) {
            state.achievements.push(achievement.id);
            newAchievements.push(achievement);
        }
    });

    return newAchievements;
}

// =====================================
// RANK/TITLE SYSTEM
// =====================================

const RANKS = [
    { level: 1, title: 'Novice Adventurer', color: '#999' },
    { level: 2, title: 'Apprentice Quester', color: '#4CAF50' },
    { level: 3, title: 'Skilled Explorer', color: '#2196F3' },
    { level: 5, title: 'Veteran Warrior', color: '#9C27B0' },
    { level: 7, title: 'Elite Champion', color: '#FF9800' },
    { level: 10, title: 'Master Hero', color: '#F44336' },
    { level: 15, title: 'Legendary Conqueror', color: '#FFD700' },
    { level: 20, title: 'Mythic Overlord', color: '#FF1744' },
    { level: 25, title: 'Divine Ascendant', color: '#E040FB' }
];

function getPlayerRank(level) {
    for (let i = RANKS.length - 1; i >= 0; i--) {
        if (level >= RANKS[i].level) {
            return RANKS[i];
        }
    }
    return RANKS[0];
}

// =====================================
// SOUND EFFECTS
// =====================================

const SOUNDS = {
    questComplete: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCx+zPLTgjMGHm7A7+OZURE'),
    levelUp: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCx+zPLTgjMGHm7A7+OZURE'),
    achievement: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCx+zPLTgjMGHm7A7+OZURE')
};

// Set volumes
Object.values(SOUNDS).forEach(sound => sound.volume = 0.4);

function playSound(soundName) {
    if (SOUNDS[soundName]) {
        SOUNDS[soundName].currentTime = 0;
        SOUNDS[soundName].play().catch(() => {});
    }
}

// =====================================
// VISUAL CELEBRATIONS
// =====================================

function showAchievementPopup(achievement) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-content">
            <div class="achievement-title">Achievement Unlocked!</div>
            <div class="achievement-name">${achievement.title}</div>
            <div class="achievement-desc">${achievement.description}</div>
            <div class="achievement-bonus">+${achievement.xpBonus} XP Bonus!</div>
        </div>
    `;

    document.body.appendChild(popup);
    playSound('achievement');

    setTimeout(() => {
        popup.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => popup.remove(), 500);
    }, 4000);
}

function showLevelUpCelebration(newLevel) {
    const celebration = document.createElement('div');
    celebration.className = 'level-up-celebration';

    const rank = getPlayerRank(newLevel);

    celebration.innerHTML = `
        <div class="celebration-content">
            <div class="level-up-text">LEVEL UP!</div>
            <div class="new-level">Level ${newLevel}</div>
            <div class="new-rank" style="color: ${rank.color}">${rank.title}</div>
            <div class="level-up-perks">
                <div class="perk">✨ New rank achieved!</div>
                <div class="perk">💪 Power increased!</div>
                <div class="perk">🎯 Keep going!</div>
            </div>
        </div>
    `;

    document.body.appendChild(celebration);
    playSound('levelUp');
    createFireworks();

    setTimeout(() => {
        celebration.style.opacity = '0';
        setTimeout(() => celebration.remove(), 500);
    }, 5000);
}

function createFireworks() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            document.body.appendChild(firework);

            setTimeout(() => firework.remove(), 1000);
        }, i * 100);
    }
}

function showQuestCompleteAnimation(xpEarned) {
    const animation = document.createElement('div');
    animation.className = 'quest-complete-burst';
    animation.innerHTML = `
        <div class="burst-text">QUEST COMPLETE!</div>
        <div class="burst-xp">+${xpEarned} XP</div>
    `;

    document.body.appendChild(animation);
    playSound('questComplete');

    setTimeout(() => {
        animation.style.opacity = '0';
        setTimeout(() => animation.remove(), 500);
    }, 2000);
}

// =====================================
// COMBO SYSTEM
// =====================================

let comboCount = 0;
let comboTimeout = null;

function incrementCombo(xpEarned) {
    comboCount++;
    clearTimeout(comboTimeout);

    // Show combo indicator
    updateComboDisplay();

    // Reset after 10 seconds of inactivity
    comboTimeout = setTimeout(() => {
        comboCount = 0;
        updateComboDisplay();
    }, 10000);

    // Combo bonus XP
    if (comboCount >= 3) {
        const bonusXP = Math.floor(xpEarned * 0.1 * comboCount);
        return bonusXP;
    }

    return 0;
}

function updateComboDisplay() {
    let comboEl = document.getElementById('combo-indicator');

    if (comboCount === 0) {
        if (comboEl) comboEl.remove();
        return;
    }

    if (!comboEl) {
        comboEl = document.createElement('div');
        comboEl.id = 'combo-indicator';
        comboEl.className = 'combo-indicator';
        document.body.appendChild(comboEl);
    }

    comboEl.innerHTML = `
        <div class="combo-text">COMBO!</div>
        <div class="combo-number">x${comboCount}</div>
        <div class="combo-bonus">+${comboCount * 10}% XP</div>
    `;

    comboEl.style.animation = 'none';
    setTimeout(() => comboEl.style.animation = 'comboPulse 0.5s ease', 10);
}

// =====================================
// HELPER FUNCTIONS
// =====================================

// Toggle sync controls visibility
function toggleSyncControls() {
    const syncControls = document.getElementById('sync-controls');
    const toggleBtn = document.getElementById('toggle-sync-btn');

    if (syncControls.style.display === 'none' || syncControls.style.display === '') {
        syncControls.style.display = 'flex';
        toggleBtn.textContent = '✕ Close';
    } else {
        syncControls.style.display = 'none';
        toggleBtn.textContent = '⚙️ Sync';
    }
}

// Update player title based on rank
function updatePlayerTitle() {
    const titleEl = document.getElementById('player-title');
    if (!titleEl) return;

    const rank = getPlayerRank(window.appState?.level || 1);
    titleEl.textContent = rank.title;
    titleEl.style.color = rank.color;
    titleEl.style.fontWeight = 'bold';
}

// Initialize gamification on load
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for gamification
    addGamificationStyles();

    // Update rank display
    setTimeout(() => updatePlayerTitle(), 100);
});

// Add CSS styles
function addGamificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .achievement-popup {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            max-width: 350px;
            display: flex;
            gap: 15px;
        }

        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOut {
            to { transform: translateX(400px); opacity: 0; }
        }

        .achievement-icon {
            font-size: 3em;
            animation: bounce 0.6s ease infinite;
        }

        .achievement-title {
            font-size: 0.9em;
            opacity: 0.9;
            margin-bottom: 5px;
        }

        .achievement-name {
            font-size: 1.3em;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .achievement-desc {
            font-size: 0.95em;
            opacity: 0.8;
            margin-bottom: 10px;
        }

        .achievement-bonus {
            font-size: 1.1em;
            font-weight: bold;
            color: #FFD700;
        }

        .level-up-celebration {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            animation: fadeIn 0.3s ease;
        }

        .celebration-content {
            text-align: center;
            color: white;
            animation: scaleIn 0.5s ease;
        }

        .level-up-text {
            font-size: 4em;
            font-weight: bold;
            background: linear-gradient(45deg, #FFD700, #FFA500, #FFD700);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 1s infinite;
        }

        @keyframes shimmer {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.5); }
        }

        .new-level {
            font-size: 5em;
            font-weight: bold;
            margin: 20px 0;
        }

        .new-rank {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 30px;
        }

        .level-up-perks {
            display: flex;
            gap: 20px;
            justify-content: center;
        }

        .perk {
            background: rgba(255,255,255,0.1);
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 1.1em;
        }

        .firework {
            position: fixed;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            animation: explode 1s ease-out;
            z-index: 10000;
        }

        @keyframes explode {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(20); opacity: 0; }
        }

        .quest-complete-burst {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 9999;
            animation: burstIn 0.5s ease-out;
        }

        .burst-text {
            font-size: 3em;
            font-weight: bold;
            color: #4CAF50;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .burst-xp {
            font-size: 2em;
            color: #FFD700;
            font-weight: bold;
            margin-top: 10px;
        }

        @keyframes burstIn {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.2); }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        .combo-indicator {
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(245, 87, 108, 0.4);
            z-index: 9998;
            text-align: center;
        }

        .combo-text {
            font-size: 0.9em;
            font-weight: bold;
        }

        .combo-number {
            font-size: 2.5em;
            font-weight: bold;
            margin: 5px 0;
        }

        .combo-bonus {
            font-size: 0.85em;
            opacity: 0.9;
        }

        @keyframes comboPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes scaleIn {
            from { transform: scale(0); }
            to { transform: scale(1); }
        }
    `;

    document.head.appendChild(style);
}
