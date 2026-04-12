// ========================================
// FILTERS.JS - Filtrování a vyhledávání
// ========================================

let searchTerm = '';
let selectedTier = 'all';

// Filtrování hráčů
function filterPlayers(players) {
    let filtered = [...players];
    
    // Filtrování podle jména
    if (searchTerm) {
        filtered = filtered.filter(player => 
            player.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Filtrování podle tieru
    if (selectedTier !== 'all') {
        filtered = filtered.filter(player => {
            if (currentKit === 'overall') {
                // Pro overall: hráč musí mít alespoň jeden kit s vybraným tierem
                return GAMEMODES.some(gamemode => player[gamemode.id] === selectedTier);
            } else {
                // Pro konkrétní kit: hráč musí mít v tom kitu vybraný tier
                return player[currentKit] === selectedTier;
            }
        });
    }
    
    return filtered;
}

// Aplikace všech filtrů a řazení
function applyFiltersAndSort(players) {
    const filtered = filterPlayers(players);
    const sorted = sortPlayers(filtered);
    renderTable(sorted);
    updateStatsDisplay(sorted);
    return sorted;
}

// Reset všech filtrů
function resetFilters() {
    searchTerm = '';
    selectedTier = 'all';
    document.getElementById('searchInput').value = '';
    document.getElementById('tierFilter').value = 'all';
    
    const filtered = filterPlayers(window.allPlayers);
    const sorted = sortPlayers(filtered);
    renderTable(sorted);
    updateStatsDisplay(sorted);
}
