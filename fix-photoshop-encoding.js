const fs = require('fs');
const path = require('path');

// Read the current photoshop.json file
const filePath = path.join(__dirname, 'src', 'data', 'photoshop.json');
const data = fs.readFileSync(filePath, 'utf8');

// Parse and re-stringify to ensure clean JSON
const jsonData = JSON.parse(data);

// Write back with explicit UTF-8 encoding
fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');

console.log('Photoshop.json encoding fixed successfully!');
