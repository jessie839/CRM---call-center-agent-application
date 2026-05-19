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
      if (file.endsWith('.jsx') || file.endsWith('.css')) {
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
  
  // Indigo / Blue colors to Accent
  newContent = newContent.replace(/#6366f1/gi, 'var(--accent)');
  newContent = newContent.replace(/#4f46e5/gi, 'var(--accent-2)');
  
  // Grays to variables
  newContent = newContent.replace(/#f1f5f9/gi, 'var(--border)');
  newContent = newContent.replace(/#94a3b8/gi, 'var(--muted)');
  newContent = newContent.replace(/#64748b/gi, 'var(--muted)');
  
  // Fix AI Insights gradient again just to be safe if there's any #24BB96
  newContent = newContent.replace(/linear-gradient\(135deg, var\(--accent\), #24BB96\)/gi, 'linear-gradient(135deg, var(--surface), var(--accent-light))');
  
  // Replace Analytics page rgb
  newContent = newContent.replace(/rgba\(99,102,241,/gi, 'rgba(var(--accent-rgb),');

  if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    modifiedCount++;
    console.log('Modified: ' + file);
  }
});

console.log('Total files thoroughly themed for SVGs: ' + modifiedCount);
