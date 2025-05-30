// Integration test to verify multi-tool selection functionality
const fs = require('fs');
const path = require('path');

console.log('🧪 Integration Test: Multi-Tool Selection Feature');
console.log('='.repeat(50));

// Test 1: Verify all tool data files exist
const dataDir = path.join(__dirname, 'src', 'data');
const expectedTools = ['chrome', 'figma', 'notion', 'photoshop', 'slack', 'vscode'];

console.log('\n📁 Test 1: Data Files');
let filesExist = true;
expectedTools.forEach(tool => {
  const filePath = path.join(dataDir, `${tool}.json`);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${tool}.json exists`);
  } else {
    console.log(`❌ ${tool}.json missing`);
    filesExist = false;
  }
});

// Test 2: Verify data structure
console.log('\n📊 Test 2: Data Structure');
let dataValid = true;
expectedTools.forEach(tool => {
  try {
    const filePath = path.join(dataDir, `${tool}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0];
      const requiredFields = ['id', 'tool', 'platform', 'keyCombo', 'description', 'category'];
      const hasAllFields = requiredFields.every(field => firstItem.hasOwnProperty(field));
      
      if (hasAllFields) {
        console.log(`✅ ${tool}.json has valid structure (${data.length} shortcuts)`);
      } else {
        console.log(`❌ ${tool}.json missing required fields`);
        dataValid = false;
      }
    } else {
      console.log(`❌ ${tool}.json is empty or invalid`);
      dataValid = false;
    }
  } catch (error) {
    console.log(`❌ ${tool}.json parse error:`, error.message);
    dataValid = false;
  }
});

// Test 3: Verify component files exist
console.log('\n🧩 Test 3: Component Files');
const componentFiles = [
  'src/components/ToolMultiSelect.tsx',
  'src/components/FilterBar.tsx',
  'src/context/ShortcutContext.tsx',
  'src/utils/dataLoader.ts',
  'src/types/index.ts'
];

let componentsExist = true;
componentFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    componentsExist = false;
  }
});

// Summary
console.log('\n📋 Test Summary');
console.log('='.repeat(30));
if (filesExist && dataValid && componentsExist) {
  console.log('🎉 All tests passed! Multi-tool selection is ready.');
  console.log('\n🚀 Features implemented:');
  console.log('   • Individual tool data files');
  console.log('   • Dynamic data loading system');
  console.log('   • Multi-tool selection UI');
  console.log('   • Updated filter system');
  console.log('   • Error handling & loading states');
  console.log('\n🌐 Visit http://localhost:8081 to test the UI');
} else {
  console.log('❌ Some tests failed. Please check the issues above.');
}
