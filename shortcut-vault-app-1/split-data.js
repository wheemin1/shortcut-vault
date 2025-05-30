const fs = require('fs');

const shortcuts = JSON.parse(fs.readFileSync('./src/data/shortcuts.json', 'utf8'));

const toolGroups = {
  figma: [],
  vscode: [],
  photoshop: [],
  chrome: [],
  notion: [],
  slack: []
};

shortcuts.forEach(shortcut => {
  const toolKey = shortcut.tool.toLowerCase();
  if (toolGroups[toolKey]) {
    const newId = toolGroups[toolKey].length + 1;
    toolGroups[toolKey].push({
      ...shortcut,
      id: newId
    });
  }
});

Object.keys(toolGroups).forEach(tool => {
  const filePath = './src/data/' + tool + '.json';
  fs.writeFileSync(filePath, JSON.stringify(toolGroups[tool], null, 2));
  console.log('Created ' + tool + '.json with ' + toolGroups[tool].length + ' shortcuts');
});

console.log('Data splitting completed!');
