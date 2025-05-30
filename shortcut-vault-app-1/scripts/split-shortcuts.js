const fs = require('fs');
const path = require('path');

// 현재 shortcuts.json 파일 읽기
const shortcutsPath = path.join(__dirname, '../src/data/shortcuts.json');
const shortcuts = JSON.parse(fs.readFileSync(shortcutsPath, 'utf8'));

// 도구별로 데이터 분리
const toolGroups = {
  figma: [],
  vscode: [],
  photoshop: [],
  chrome: [],
  notion: [],
  slack: []
};

// 각 단축키를 도구별로 분류
shortcuts.forEach(shortcut => {
  const toolKey = shortcut.tool.toLowerCase();
  if (toolGroups[toolKey]) {
    // ID를 도구별로 재정렬
    const newId = toolGroups[toolKey].length + 1;
    toolGroups[toolKey].push({
      ...shortcut,
      id: newId
    });
  }
});

// 각 도구별 파일로 저장
Object.keys(toolGroups).forEach(tool => {
  const filePath = path.join(__dirname, `../src/data/${tool}.json`);
  fs.writeFileSync(filePath, JSON.stringify(toolGroups[tool], null, 2));
  console.log(`Created ${tool}.json with ${toolGroups[tool].length} shortcuts`);
});

console.log('Data splitting completed!');
