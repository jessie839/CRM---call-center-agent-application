const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let entries = fs.readdirSync(dir);
  filelist = filelist || [];
  entries.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      if (file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.js')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const allFiles = walkSync('d:/agent in app(clone)/agent_u1_v3/src');

let modifiedCount = 0;

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  // Replace ALL semantic color hex codes with accent
  newContent = newContent.replace(/#ef4444/gi, 'var(--accent)');
  newContent = newContent.replace(/#f59e0b/gi, 'var(--accent)');
  newContent = newContent.replace(/#10b981/gi, 'var(--accent)');
  newContent = newContent.replace(/#8b5cf6/gi, 'var(--accent)');
  newContent = newContent.replace(/#a855f7/gi, 'var(--accent)');
  newContent = newContent.replace(/#06b6d4/gi, 'var(--accent)');
  newContent = newContent.replace(/#0ea5e9/gi, 'var(--accent)');
  newContent = newContent.replace(/#22c55e/gi, 'var(--accent)');

  // Replace global CSS variables to fallback to accent
  if (file.endsWith('index.css')) {
    newContent = newContent.replace(/--success:.*?;/g, '--success: var(--accent);');
    newContent = newContent.replace(/--success-light:.*?;/g, '--success-light: var(--accent-light);');
    newContent = newContent.replace(/--warning:.*?;/g, '--warning: var(--accent);');
    newContent = newContent.replace(/--warning-light:.*?;/g, '--warning-light: var(--accent-light);');
    newContent = newContent.replace(/--danger:.*?;/g, '--danger: var(--accent);');
    newContent = newContent.replace(/--danger-light:.*?;/g, '--danger-light: var(--accent-light);');
  }

  if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    modifiedCount++;
    console.log('Modified: ' + file);
  }
});

console.log('Total files thoroughly monochromed: ' + modifiedCount);
