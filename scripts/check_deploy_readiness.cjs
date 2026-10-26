const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '..', 'dist', 'bundle.js');
const bundleContent = fs.readFileSync(bundlePath, 'utf8');

console.log('Checking deployment readiness...');
console.log('1. Hardcoded localhost:', bundleContent.includes('localhost'));
console.log('2. Hardcoded http://:', (bundleContent.match(/http:\/\/[^s]/g) || []).filter(u => !u.includes('w3.org')));

// Check image paths in bundle
const imgMatches = bundleContent.match(/['"][^'"]*images\/[^'"]*['"]/g) || [];
console.log('Total image path references found:', imgMatches.length);

let absolutePaths = 0;
let relativePaths = 0;
for (const m of imgMatches) {
  const clean = m.replace(/['"]/g, '');
  if (clean.startsWith('/images')) {
    absolutePaths++;
  } else if (clean.startsWith('./images') || clean.startsWith('images')) {
    relativePaths++;
  }
}
console.log(`Relative image paths: ${relativePaths}, Absolute /images paths: ${absolutePaths}`);

// Check index.html
const indexPath = path.join(__dirname, '..', 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');
console.log('index.html script src:', (indexContent.match(/<script[^>]*src="([^"]*)"/g) || []));
console.log('index.html link href:', (indexContent.match(/<link[^>]*href="([^"]*)"/g) || []));
