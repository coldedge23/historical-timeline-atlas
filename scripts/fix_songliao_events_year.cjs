const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'periods', 'songLiao', 'events.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace "yearDisplay": "960 CE" -> "yearDisplay": "西元 960 年"
content = content.replace(/"yearDisplay":\s*"(\d+)\s+CE"/g, '"yearDisplay": "西元 $1 年"');
// Replace "yearDisplay": "963 - 975 CE" -> "yearDisplay": "西元 963 - 975 年"
content = content.replace(/"yearDisplay":\s*"(\d+\s*-\s*\d+)\s+CE"/g, '"yearDisplay": "西元 $1 年"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated songLiao events yearDisplay to Chinese format!');
