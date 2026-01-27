document.addEventListener('DOMContentLoaded', function() {
    // Bodový systém
    const tierPoints = {
        '': 0,
        'LT5': 1,
        'HT5': 2,
        'LT4': 3,
        'HT4': 4,
        'LT3': 10,
        'HT3': 15,
        'LT2': 20,
        'HT2': 30,
        'LT1': 45,
        'HT1': 60
    };

    // Pořadí a názvy kitů
    const kitsOrder = ['Sword', 'Axe', 'UHC', 'DiaPot', 'NethPot', 'SMP', 'Crystal', 'Mace', 'Spear'];
    
    // Data hráčů (načtou se z localStorage)
    let players = JSON.parse(localStorage.getItem('minecraft-tierlist-players')) || [];
    
    // Uložení dat do localStorage
    function saveData() {
        localStorage.setItem('minecraft-tierlist-players', JSON.stringify(players));
    }
    
    // Výpočet bodů pro hráče
    function calculatePoints(player) {
        let total = 0;
        kitsOrder.forEach(kit => {
            const tier = player.kits[kit] || '';
            total += tierPoints[tier] || 0;
        });
        return total;
    }
    
    // Seřazení hráčů podle bodů
    function sortPlayers() {
        players.forEach(player => {
            player.totalPoints = calculatePoints(player);
        });
        players.sort((a, b) => b.totalPoints - a.totalPoints);
    }
    
    // Vykreslení tabulky
    function renderTable() {
        sortPlayers();
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';
        
        if (players.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="13" style="text-align: center; padding: 40px; color: #aaa;">Žádní hráči. Přidejte prvního hráče výše!</td>`;
            tableBody.appendChild(row);
            return;
        }
        
        players.forEach((player, index) => {
            const row = document.createElement('tr');
            
            // Pořadí
            const rankCell = document.createElement('td');
            rankCell.className = 'rank-cell';
            rankCell.textContent = `#${index + 1}`;
            row.appendChild(rankCell);
            
            // Hráč + skin
            const playerCell = document.createElement('td');
            playerCell.className = 'player-cell';
            const skinUrl = player.skin || `https://mc-heads.net/avatar/${player.name}/100.png`;
            playerCell.innerHTML = `
                <img class="skin" src="${skinUrl}" alt="${player.name}" onerror="this.src='https://mc-heads.net/avatar/Steve/100.png'">
                <span>${player.name}</span>
            `;
            row.appendChild(playerCell);
            
            // Kity (select boxy)
            kitsOrder.forEach(kit => {
                const kitCell = document.createElement('td');
                kitCell.className = 'kit-cell';
                
                const select = document.createElement('select');
                select.className = 'kit-select';
                select.dataset.player = player.name;
                select.dataset.kit = kit;
                
                // Možnosti tierů
                const options = ['', 'LT5', 'HT5', 'LT4', 'HT4', 'LT3', 'HT3', 'LT2', 'HT2', 'LT1', 'HT1'];
                options.forEach(tier => {
                    const option = document.createElement('option');
                    option.value = tier;
                    option.textContent = tier || '-';
                    if (tier === (player.kits[kit] || '')) {
                        option.selected = true;
                    }
                    select.appendChild(option);
                });
                
                // Událost změny tieru
                select.addEventListener('change', function() {
                    updatePlayerTier(player.name, kit, this.value);
                });
                
                kitCell.appendChild(select);
                row.appendChild(kitCell);
            });
            
            // Celkem bodů
            const pointsCell = document.createElement('td');
            pointsCell.className = 'points-cell';
            pointsCell.textContent = player.totalPoints || calculatePoints(player);
            row.appendChild(pointsCell);
            
            // Akce
            const actionCell = document.createElement('td');
            actionCell.className = 'action-cell';
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" data-name="${player.name}"><i class="fas fa-edit"></i> Upravit</button>
                <button class="action-btn delete-btn" data-name="${player.name}"><i class="fas fa-trash"></i> Smazat</button>
            `;
            row.appendChild(actionCell);
            
            tableBody.appendChild(row);
        });
        
        // Přidání událostí pro tlačítka
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                openEditModal(this.dataset.name);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm(`Opravdu chcete smazat hráče ${this.dataset.name}?`)) {
                    deletePlayer(this.dataset.name);
                }
            });
        });
    }
    
    // Přidání hráče
    document.getElementById('add-player-btn').addEventListener('click', function() {
        const nameInput = document.getElementById('player-name');
        const skinInput = document.getElementById('player-skin');
        const name = nameInput.value.trim();
        
        if (!name) {
            alert('Zadejte jméno hráče!');
            return;
        }
        
        // Kontrola, zda hráč již existuje
        if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
            alert('Hráč s tímto jménem již existuje!');
            return;
        }
        
        // Vytvoření nového hráče
        const newPlayer = {
            name: name,
            skin: skinInput.value.trim() || '',
            kits: {
                Sword: '',
                Axe: '',
                UHC: '',
                DiaPot: '',
                NethPot: '',
                SMP: '',
                Crystal: '',
                Mace: '',
                Spear: ''
            },
            totalPoints: 0
        };
        
        players.push(newPlayer);
        saveData();
        renderTable();
        
        // Vyčištění formuláře
        nameInput.value = '';
        skinInput.value = '';
        nameInput.focus();
    });
    
    // Aktualizace tieru
    function updatePlayerTier(playerName, kit, tier) {
        const player = players.find(p => p.name === playerName);
        if (player) {
            player.kits[kit] = tier;
            saveData();
            renderTable();
        }
    }
    
    // Otevření modálního okna pro úpravu
    let currentEditPlayer = null;
    
    function openEditModal(playerName) {
        const player = players.find(p => p.name === playerName);
        if (!player) return;
        
        currentEditPlayer = player;
        document.getElementById('edit-player-name').textContent = playerName;
        
        const container = document.getElementById('kits-edit-container');
        container.innerHTML = '';
        
        kitsOrder.forEach(kit => {
            const item = document.createElement('div');
            item.className = 'kit-edit-item';
            
            const select = document.createElement('select');
            select.dataset.kit = kit;
            
            const options = ['', 'LT5', 'HT5', 'LT4', 'HT4', 'LT3', 'HT3', 'LT2', 'HT2', 'LT1', 'HT1'];
            options.forEach(tier => {
                const option = document.createElement('option');
                option.value = tier;
                option.textContent = tier || '-';
                if (tier === (player.kits[kit] || '')) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            
            item.innerHTML = `<label>${kit}</label>`;
            item.appendChild(select);
            container.appendChild(item);
        });
        
        document.getElementById('edit-modal').style.display = 'flex';
    }
    
    // Uložení změn z modálního okna
    document.getElementById('save-edit-btn').addEventListener('click', function() {
        if (!currentEditPlayer) return;
        
        const selects = document.querySelectorAll('#kits-edit-container select');
        selects.forEach(select => {
            const kit = select.dataset.kit;
            const tier = select.value;
            currentEditPlayer.kits[kit] = tier;
        });
        
        saveData();
        renderTable();
        document.getElementById('edit-modal').style.display = 'none';
    });
    
    // Zrušení úprav
    document.getElementById('cancel-edit-btn').addEventListener('click', function() {
        document.getElementById('edit-modal').style.display = 'none';
    });
    
    // Smazání hráče
    function deletePlayer(playerName) {
        players = players.filter(p => p.name !== playerName);
        saveData();
        renderTable();
    }
    
    // Reset všech dat
    document.getElementById('reset-data').addEventListener('click', function() {
        if (confirm('Opravdu chcete smazat VŠECHNA data? Tuto akci nelze vrátit zpět!')) {
            players = [];
            saveData();
            renderTable();
        }
    });
    
    // Enter pro přidání hráče
    document.getElementById('player-name').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('add-player-btn').click();
        }
    });
    
    // Zavření modálního okna kliknutím mimo
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('edit-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Načtení tabulky při startu
    renderTable();
    
    // Testovací data (můžete smazat)
    if (players.length === 0) {
        console.log('Žádná data, můžete přidat hráče.');
    }
});
