const fs = require('fs');

const allKoei = new Set(JSON.parse(fs.readFileSync('all_koei_names.json', 'utf8')));
const remaining = JSON.parse(fs.readFileSync('remaining_koei_figures.json', 'utf8'));

console.log('Sample remaining Koei filenames (first 50):');
console.log(remaining.slice(0, 50));
