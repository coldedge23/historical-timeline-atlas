const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'periods', 'songLiao', 'warlordPeriods.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace "shortLabel": "960 北宋立國" with "shortLabel": "北宋立國"
content = content.replace(/"shortLabel":\s*"\d+\s+([^"]+)"/g, '"shortLabel": "$1"');
// Replace "yearDisplay": "960 CE" with "yearDisplay": "西元 960 年"
content = content.replace(/"yearDisplay":\s*"(\d+)\s+CE"/g, '"yearDisplay": "西元 $1 年"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated songLiao warlordPeriods labels!');
