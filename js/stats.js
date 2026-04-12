// ========================================
// STATS.JS - Správa statistik
// ========================================

// Aktualizace statistik v dashboardu
function updateStatsDisplay(players) {
    const totalPlayers = players.length;
    const topPlayer = players.length > 0 ? players[0].name : '-';
    const avgPoints = players.length > 0 
        ? Math.round(players.reduce((sum, p) => sum + p.totalPoints, 0) / players.length)
        : 0;
    
    // Nejvyšší tier mezi všemi hráči
    let highestTier = 'N/A';
    let highestPoints = -1;
    
    players.forEach(player => {
        GAMEMODES.forEach(gamemode => {
            const tier = player[gamemode.id];
            if (tier && POINTS_SYSTEM[tier] && POINTS_SYSTEM[tier] > highestPoints) {
                highestPoints = POINTS_SYSTEM[tier];
                highestTier = tier;
            }
        });
    });
    
    const totalEl = document.getElementById('totalPlayers');
    const topEl = document.getElementById('topPlayerName');
    const avgEl = document.getElementById('avgPoints');
    const highestEl = document.getElementById('highestTier');
    
    if (totalEl) totalEl.textContent = totalPlayers;
    if (topEl) topEl.textContent = topPlayer;
    if (avgEl) avgEl.textContent = avgPoints;
    if (highestEl) highestEl.innerHTML = `<span class="tier-badge tier-${highestTier}">${highestTier}</span>`;
}

// Aktualizace info panelů
function updateInfoPanels() {
    // Points System
    const pointsContainer = document.getElementById('pointsList');
    if (pointsContainer) {
        pointsContainer.innerHTML = Object.entries(POINTS_SYSTEM)
            .sort((a, b) => b[1] - a[1])
            .map(([tier, pts]) => `
                <div class="points-item">
                    <span class="tier-badge tier-${tier}" style="width: auto; padding: 4px 12px;">${tier}</span>
                    <span style="font-weight: 600; color: #00d4ff;">${pts} pts</span>
                </div>
            `).join('');
    }
    
    // Titles System
    const titlesContainer = document.getElementById('titlesList');
    if (titlesContainer) {
        titlesContainer.innerHTML = TITLES.map(title => `
            <div class="title-item">
                <span class="title-name" style="color: ${title.color};">${title.name}</span>
                <span class="title-range">${title.min} - ${title.max === Infinity ? '+' : title.max} pts</span>
            </div>
        `).join('');
    }
    
    // Gamemodes
    const gamemodesContainer = document.getElementById('gamemodesList');
    if (gamemodesContainer) {
        gamemodesContainer.innerHTML = GAMEMODES.map(gm => `
            <div class="gamemode-item">
                <span><i class="fas ${gm.icon || 'fa-gamepad'}"></i> ${gm.name}</span>
                <span>Ranked PvP</span>
            </div>
        `).join('');
    }
}
