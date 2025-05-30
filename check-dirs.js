const fs = require('fs');
const path = require('path');

console.log('Current working directory:', process.cwd());
console.log('Script directory:', __dirname);

const targetDir = path.join(__dirname, 'src', 'data');
console.log('Target directory:', targetDir);
console.log('Target directory exists:', fs.existsSync(targetDir));

if (fs.existsSync(targetDir)) {
  console.log('Files in target directory:', fs.readdirSync(targetDir));
}
