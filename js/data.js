// ========================================
// DATA.JS - Všechna data a konfigurace
// ========================================

// Bodový systém
const POINTS_SYSTEM = {
    'HT1': 60, 'LT1': 45,
    'HT2': 30, 'LT2': 20,
    'HT3': 15, 'LT3': 10,
    'HT4': 4,  'LT4': 3,
    'HT5': 2,  'LT5': 1
};

// Title systém
const TITLES = [
    { min: 0, max: 10, name: 'Rookie', color: '#95a5a6', textColor: 'white' },
    { min: 10, max: 15, name: 'Combat Novice', color: '#7bed9f', textColor: '#0a0c15' },
    { min: 15, max: 50, name: 'Combat Cadet', color: '#70a1ff', textColor: '#0a0c15' },
    { min: 50, max: 100, name: 'Combat Specialist', color: '#ff9ff3', textColor: '#0a0c15' },
    { min: 100, max: 250, name: 'Combat Ace', color: '#ff6b6b', textColor: 'white' },
    { min: 250, max: 350, name: 'Combat Master', color: '#f39c12', textColor: '#0a0c15' },
    { min: 350, max: Infinity, name: 'Combat Grandmaster', color: '#f1c40f', textColor: '#0a0c15' }
];

// Seznam gamemodů (kitů)
const GAMEMODES = [
    { id: 'sword', name: '⚔️ Sword', display: 'Sword', icon: 'fa-khanda' },
    { id: 'axe', name: '🪓 Axe', display: 'Axe', icon: 'fa-gavel' },
    { id: 'uhc', name: '🏹 UHC', display: 'UHC', icon: 'fa-bow-arrow' },
    { id: 'diapot', name: '💎 DiaPot', display: 'DiaPot', icon: 'fa-gem' },
    { id: 'nethpot', name: '🔥 NethPot', display: 'NethPot', icon: 'fa-fire' },
    { id: 'smp', name: '🌍 SMP', display: 'SMP', icon: 'fa-globe' },
    { id: 'crystal', name: '🔮 Crystal', display: 'Crystal', icon: 'fa-crystal-ball' },
    { id: 'mace', name: '🔨 Mace', display: 'Mace', icon: 'fa-hammer' },
    { id: 'spear', name: '🏹 Spear', display: 'Spear', icon: 'fa-gun' }
];

// Data hráčů (PŘÍMO ZDE, aby se načetla hned)
const PLAYERS_DATA = [
    { "name": "jaknox", "region": "EU", "sword": "LT3", "axe": "LT3", "uhc": "HT4", "diapot": "HT4", "nethpot": "HT4", "smp": "LT3", "crystal": "HT4", "mace": "LT4", "spear": "LT3" },
    { "name": "YT_lacjim168", "region": "EU", "sword": "LT3", "axe": "LT4", "uhc": "", "diapot": "LT5", "nethpot": "LT5", "smp": "", "crystal": "", "mace": "HT5", "spear": "HT5" },
    { "name": "citronyx1", "region": "EU", "sword": "HT4", "axe": "HT5", "uhc": "LT5", "diapot": "", "nethpot": "LT5", "smp": "HT5", "crystal": "LT5", "mace": "HT5", "spear": "" },
    { "name": "Jirkafogus", "region": "EU", "sword": "HT4", "axe": "HT4", "uhc": "LT3", "diapot": "HT4", "nethpot": "", "smp": "LT3", "crystal": "HT5", "mace": "", "spear": "LT3" },
    { "name": "SetProfile", "region": "EU", "sword": "LT3", "axe": "", "uhc": "", "diapot": "", "nethpot": "LT4", "smp": "", "crystal": "LT5", "mace": "HT5", "spear": "LT5" },
    { "name": "FaZeTraRanTula", "region": "EU", "sword": "HT3", "axe": "", "uhc": "", "diapot": "", "nethpot": "", "smp": "", "crystal": "", "mace": "HT5", "spear": "" },
    { "name": "ItzLunas", "region": "EU", "sword": "LT4", "axe": "", "uhc": "", "diapot": "", "nethpot": "", "smp": "", "crystal": "LT4", "mace": "", "spear": "" },
    { "name": "Vojtas_", "region": "EU", "sword": "HT4", "axe": "", "uhc": "HT5", "diapot": "", "nethpot": "", "smp": "HT5", "crystal": "", "mace": "HT5", "spear": "" },
    { "name": "vlk_1", "region": "EU", "sword": "LT5", "axe": "", "uhc": "", "diapot": "", "nethpot": "", "smp": "", "crystal": "", "mace": "", "spear": "" },
    { "name": "itz_bronikk", "region": "EU", "sword": "LT3", "axe": "", "uhc": "", "diapot": "", "nethpot": "", "smp": "", "crystal": "", "mace": "", "spear": "" },
    { "name": "doge_cg", "region": "EU", "sword": "", "axe": "LT4", "uhc": "", "diapot": "", "nethpot": "", "smp": "", "crystal": "", "mace": "", "spear": "" },
    { "name": "Terry885522", "region": "EU", "sword": "LT5", "axe": "", "uhc": "", "diapot": "", "nethpot": "", "smp": "", "crystal": "", "mace": "", "spear": "LT5" }
];
