const fs = require('fs');

const allKoei = new Set(JSON.parse(fs.readFileSync('all_koei_names.json', 'utf8')));

// Load existing 150 IDs
const figures150 = JSON.parse(fs.readFileSync('src/data/threeKingdoms/figures.js', 'utf8').replace(/^\s*export\s+const\s+THREE_KINGDOMS_FIGURES\s*=\s*/, '').replace(/;\s*$/, ''));
const existingIds = new Set(figures150.map(f => f.id));
console.log('Existing figures:', existingIds.size);

// Read candidate definition file
// We will test all candidates and make sure all exist in Koei 11
