const fs = require('fs');
const path = require('path');
const srcDir = 'd:/agent in app(clone)/agent_u1_v3/src/styles';

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else if (file.endsWith('.css')) results.push(file);
  });
  return results;
};

const allCss = walk(srcDir);
allCss.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let newContent = content;
  
  // 1. Fix white background areas (text-inverse being used as background)
  newContent = newContent.replace(/background(-color)?:\s*var\(--text-inverse\);?/gi, 'background: var(--surface);');
  
  // 2. Fix property typos
  newContent = newContent.replace(/[;]\s*order:/gi, '; border:');
  newContent = newContent.replace(/[;]\s*order-bottom:/gi, '; border-bottom:');
  newContent = newContent.replace(/[;]\s*order-radius:/gi, '; border-radius:');
  newContent = newContent.replace(/bborder-radius:/gi, 'border-radius:');
  newContent = newContent.replace(/ackground(-color)?:\s/gi, 'background$1: ');
  newContent = newContent.replace(/[;{]\s+olor:\s/gi, (match) => match.replace('olor:', 'color:'));
  
  // 3. Fix hardcoded black fonts
  newContent = newContent.replace(/color:\s*(black|#000(000)?|#1a1a1a|#111827|#333(333)?);?/gi, 'color: var(--text-main);');
  
  // 4. Fix specific white backgrounds remaining in Meetings/Appointments
  newContent = newContent.replace(/background-color:\s*white;?/gi, 'background-color: var(--surface);');
  newContent = newContent.replace(/background:\s*#ffffff;?/gi, 'background: var(--surface);');

  if (newContent !== content) {
    fs.writeFileSync(f, newContent);
    console.log('Successfully Polished: ' + f);
  }
});
