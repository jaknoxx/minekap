// ========================================
// MAIN.JS - Hlavní inicializace
// ========================================

let allPlayers = [];
let currentFilteredPlayers = [];

// Inicializace hráčů
function initPlayers() {
    console.log('Inicializace hráčů...');
    allPlayers = PLAYERS_DATA.map(player => calculatePlayerStats({ ...player }));
    allPlayers.sort((a, b) => b.totalPoints - a.totalPoints);
    console.log('Načteno hráčů:', allPlayers.length);
    return allPlayers;
}

// Filtrování hráčů
function filterPlayers(players) {
    let filtered = [...players];
    
    const searchTerm = document.getElementById('searchInput')?.value || '';
    const selectedTier = document.getElementById('tierFilter')?.value || 'all';
    
    if (searchTerm) {
        filtered = filtered.filter(player => 
            player.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (selectedTier !== 'all') {
        filtered = filtered.filter(player => {
            if (currentKit === 'overall') {
                return GAMEMODES.some(gamemode => player[gamemode.id] === selectedTier);
            } else {
                return player[currentKit] === selectedTier;
            }
        });
    }
    
    return filtered;
}

// Aplikace filtrů a vykreslení
function applyFiltersAndRender() {
    const filtered = filterPlayers(allPlayers);
    const sorted = sortPlayersByKit(filtered, currentKit);
    renderTable(sorted);
    updateStatsDisplay(sorted);
    return sorted;
}

// Vytvoření navigačních tabů
function renderNavTabs() {
    const container = document.getElementById('kitTabs');
    if (!container) return;
    
    container.innerHTML = `
        <button class="nav-tab ${currentKit === 'overall' ? 'active' : ''}" data-kit="overall">
            <i class="fas fa-trophy"></i> Overall
        </button>
        ${GAMEMODES.map(gm => `
            <button class="nav-tab ${currentKit === gm.id ? 'active' : ''}" data-kit="${gm.id}">
                <i class="fas ${gm.icon || 'fa-gamepad'}"></i> ${gm.name}
            </button>
        `).join('')}
    `;
    
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            const newKit = btn.dataset.kit;
            currentKit = newKit;
            
            // Nastavení řazení podle typu
            if (currentKit === 'overall') {
                currentSort = 'points';
                currentSortDir = 'desc';
            } else {
                currentSort = 'points';
                currentSortDir = 'desc';  // DESC = od nejlepšího (HT1) dolů
            }
            
            renderNavTabs();
            setActiveSortButton();
            applyFiltersAndRender();
        });
    });
}

// Reset filtrů
function resetFilters() {
    const searchInput = document.getElementById('searchInput');
    const tierFilter = document.getElementById('tierFilter');
    
    if (searchInput) searchInput.value = '';
    if (tierFilter) tierFilter.value = 'all';
    
    if (currentKit === 'overall') {
        currentSort = 'points';
        currentSortDir = 'desc';
    } else {
        currentSort = 'points';
        currentSortDir = 'desc';
    }
    setActiveSortButton();
    applyFiltersAndRender();
}

// Event listenery
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => applyFiltersAndRender());
    }
    
    const tierFilter = document.getElementById('tierFilter');
    if (tierFilter) {
        tierFilter.addEventListener('change', () => applyFiltersAndRender());
    }
    
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
    
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sort = btn.dataset.sort;
            if (currentSort === sort) {
                currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort = sort;
                if (sort === 'name') {
                    currentSortDir = 'asc';
                } else if (sort === 'points') {
                    currentSortDir = 'desc';
                }
            }
            setActiveSortButton();
            applyFiltersAndRender();
        });
    });
    
    setupModalEvents();
}

// Inicializace
function init() {
    console.log('Spouštím PvP Tier List...');
    initPlayers();
    renderNavTabs();
    updateInfoPanels();
    setActiveSortButton();
    applyFiltersAndRender();
    setupEventListeners();
    
    window.allPlayers = allPlayers;
    window.showPlayerProfile = showPlayerProfile;
    console.log('Inicializace dokončena. Hráčů:', allPlayers.length);
}

document.addEventListener('DOMContentLoaded', init);
