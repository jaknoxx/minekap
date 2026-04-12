// ========================================
// UTILS.JS - Pomocné funkce
// ========================================

// Získání titulu podle bodů
function getTitle(points) {
    for (const title of TITLES) {
        if (points >= title.min && points < title.max) {
            return { ...title };
        }
    }
    return { ...TITLES[TITLES.length - 1] };
}

// Výpočet bodů pro hráče
function calculatePlayerStats(player) {
    let totalPoints = 0;
    const kitPoints = {};
    
    GAMEMODES.forEach(gamemode => {
        const tier = player[gamemode.id];
        if (tier && POINTS_SYSTEM[tier]) {
            const points = POINTS_SYSTEM[tier];
            kitPoints[gamemode.id] = points;
            totalPoints += points;
        } else {
            kitPoints[gamemode.id] = 0;
        }
    });
    
    return {
        ...player,
        totalPoints,
        kitPoints,
        title: getTitle(totalPoints)
    };
}

// Získání nejlepšího kitu hráče
function getBestKit(player) {
    let bestTier = null;
    let bestPoints = -1;
    let bestKitName = '-';
    
    GAMEMODES.forEach(gamemode => {
        const tier = player[gamemode.id];
        if (tier && POINTS_SYSTEM[tier] && POINTS_SYSTEM[tier] > bestPoints) {
            bestPoints = POINTS_SYSTEM[tier];
            bestTier = tier;
            bestKitName = gamemode.display;
        }
    });
    
    return { tier: bestTier, name: bestKitName, points: bestPoints };
}

// Formátování čísel
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Zpožděná exekuce (debounce)
function debounce(func, delay) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, delay);
    };
}

// Escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
