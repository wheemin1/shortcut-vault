const fs = require('fs');

const files = ['chrome', 'notion', 'photoshop', 'slack', 'vscode', 'figma', 'discord', 'github', 'spotify', 'excel'];

files.forEach(file => {
  try {
    const data = fs.readFileSync(`src/data/${file}.json`, 'utf8');
    JSON.parse(data);
    console.log(`✓ ${file}.json is valid`);
  } catch(e) {
    console.log(`✗ ${file}.json error:`, e.message);
  }
});
