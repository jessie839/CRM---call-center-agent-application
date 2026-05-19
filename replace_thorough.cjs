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
  
  // 1. Aggressively replace all blue hex codes regardless of context
  newContent = newContent.replace(/#2196f3/gi, 'var(--accent)');
  newContent = newContent.replace(/#3b82f6/gi, 'var(--accent)');
  newContent = newContent.replace(/#1d4ed8/gi, 'var(--accent-2)');
  newContent = newContent.replace(/#1e88e5/gi, 'var(--accent-2)');
  newContent = newContent.replace(/#0ea5e9/gi, 'var(--accent)');
  newContent = newContent.replace(/#3040b3/gi, 'var(--accent-2)');
  
  // 2. Aggressively replace specific gray hex codes
  newContent = newContent.replace(/#111827/gi, 'var(--text-main)');
  newContent = newContent.replace(/#1f2937/gi, 'var(--text-main)');
  newContent = newContent.replace(/#374151/gi, 'var(--text-sec)');
  newContent = newContent.replace(/#4b5563/gi, 'var(--text-sec)');
  newContent = newContent.replace(/#6b7280/gi, 'var(--muted)');
  newContent = newContent.replace(/#9ca3af/gi, 'var(--muted)');
  newContent = newContent.replace(/#d1d5db/gi, 'var(--muted)');
  newContent = newContent.replace(/#e5e7eb/gi, 'var(--border)');
  newContent = newContent.replace(/#f3f4f6/gi, 'var(--surface2)');
  newContent = newContent.replace(/#f9fafb/gi, 'var(--surface3)');
  // Care with white as some things (like badges) might need to stay white, but surface handles it for most cases.
  // We'll leave #fff / #ffffff alone in this blind pass to avoid breaking text-inverse.

  // 3. AI Insights Gradient
  if (file.endsWith('AIInsights.jsx')) {
    newContent = newContent.replace(/linear-gradient\(135deg, var\(--accent\), #24BB96\)/gi, 'linear-gradient(135deg, var(--surface), var(--accent-light))');
    newContent = newContent.replace(/color:\s*'var\(--text-inverse\)'/gi, "color: 'var(--text-main)'");
    newContent = newContent.replace(/color:\s*'#e0f7fa'/gi, "color: 'var(--text-sec)'");
    newContent = newContent.replace(/background:\s*'rgba\(255, 255, 255, 0\.15\)'/gi, "background: 'var(--surface2)'");
    newContent = newContent.replace(/border:\s*'1px solid rgba\(255,255,255,0\.3\)'/gi, "border: '1px solid var(--border)'");
    newContent = newContent.replace(/color:\s*'#bbf7d0'/gi, "color: 'var(--accent)'");
  }

  // 4. Hover states in CSS
  if (file.endsWith('index.css')) {
    newContent = newContent.replace(/background:\s*var\(--accent-2\);\s*box-shadow:\s*0 6px 20px rgba\(60, 80, 224, 0\.4\);/gi, 'background: var(--accent-2);\n      box-shadow: 0 6px 20px var(--accent-light);');
  }

  if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    modifiedCount++;
    console.log('Modified: ' + file);
  }
});

console.log('Total files thoroughly themed: ' + modifiedCount);
