const fs = require('fs');
const path = require('path');

// 1. Read existing figures.js
const currentFiguresContent = fs.readFileSync(path.join(__dirname, 'src', 'data', 'threeKingdoms', 'figures.js'), 'utf8');

// Strip "export const THREE_KINGDOMS_FIGURES = " and trailing semicolon
const jsonText = currentFiguresContent
  .replace(/^\s*export\s+const\s+THREE_KINGDOMS_FIGURES\s*=\s*/, '')
  .replace(/;\s*$/, '');

const figures50 = JSON.parse(jsonText);
console.log('Original figures count:', figures50.length);

// 2. Load tier 2 figures (100)
const tier2 = require('./tier2_figures_data.cjs');
console.log('Tier 2 figures count:', tier2.length);

// 3. Check duplicate IDs
const existingIds = new Set(figures50.map(f => f.id));
for (const fig of tier2) {
  if (existingIds.has(fig.id)) {
    console.error('Duplicate ID detected:', fig.id);
    process.exit(1);
  }
}

// 4. Combine
const all150 = [...figures50, ...tier2];
console.log('Total combined figures:', all150.length);

// 5. Verify all avatars exist
const avatarDir = path.join(__dirname, 'images', 'figures');
let missingAvatars = 0;
for (const fig of all150) {
  // avatar path is like ./images/figures/xxx.jpg
  const filename = path.basename(fig.avatar);
  const fullPath = path.join(avatarDir, filename);
  if (!fs.existsSync(fullPath)) {
    console.error(`Avatar missing for ${fig.name} (${fig.id}): ${fullPath}`);
    missingAvatars++;
  }
}

if (missingAvatars > 0) {
  console.error(`Missing ${missingAvatars} avatars! Aborting.`);
  process.exit(1);
}
console.log('All 150 avatars exist locally in images/figures/!');

// 6. Write back to figures.js
const outPath = path.join(__dirname, 'src', 'data', 'threeKingdoms', 'figures.js');
const outputContent = 'export const THREE_KINGDOMS_FIGURES = ' + JSON.stringify(all150, null, 2) + ';\n';
fs.writeFileSync(outPath, outputContent, 'utf8');

console.log('Successfully wrote 150 figures to figures.js!');

// 7. Breakdown by faction
const counts = {};
all150.forEach(f => {
  counts[f.faction] = (counts[f.faction] || 0) + 1;
});
console.log('Final faction counts:', counts);
