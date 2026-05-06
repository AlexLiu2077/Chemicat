const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.css') && !fullPath.includes('App.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content
        .replace(/var\(--color-bg-card\)/g, 'var(--color-glass)')
        .replace(/var\(--shadow-card-hover\)/g, 'var(--shadow-ambient)')
        .replace(/var\(--gradient-btn-hover\)/g, 'var(--gradient-btn)')
        .replace(/border-radius: 999px/g, 'border-radius: var(--radius-full)')
        .replace(/border-radius: var\(--radius-sm\)/g, 'border-radius: var(--radius-full)')
        .replace(/var\(--color-primary-light\)/g, 'var(--color-primary-light)')
        .replace(/var\(--color-text-accent\)/g, 'var(--color-primary)')
        .replace(/rgba\(139, 92, 246, 0.08\)/g, 'var(--color-glass)')
        .replace(/rgba\(255, 255, 255, 0.72\)/g, 'var(--color-glass)')
        .replace(/backdrop-filter: blur\(12px\)/g, 'backdrop-filter: blur(12px)')
        .replace(/rgba\(255, 255, 255, 0.6\)/g, 'var(--color-border)');
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Updated:', fullPath);
      }
    }
  }
}
replaceInDir('c:/Users/confusion/Desktop/ACEtate/src');
