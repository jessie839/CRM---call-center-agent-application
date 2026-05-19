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
      if (file.endsWith('.jsx')) filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

const allFiles = walkSync('d:/agent in app(clone)/agent_u1_v3/src/components');
const pages = walkSync('d:/agent in app(clone)/agent_u1_v3/src/pages');
const allJsxFiles = [...allFiles, ...pages];

const replacements = [
  // Backgrounds
  { regex: /(background|backgroundColor):\s*'#(fcfdfe|f9fafb|f7f9fc|f8f9fa|fafafa|fafaf9|f3f4f6|f0f2f7|f8faff|f0f2f5)'/gi, replace: "$1: 'var(--surface2)'" },
  { regex: /(background|backgroundColor):\s*'#(ffffff|fff)'/gi, replace: "$1: 'var(--surface)'" },
  
  // Borders
  { regex: /border:\s*'1px solid #(e5e7eb|e5e9f4|e2e8f0|e0e7ff|bfdbfe|fce7f3|f0f2f5)'/gi, replace: "border: '1px solid var(--border)'" },
  { regex: /borderBottom:\s*'1px solid #(e5e7eb|e5e9f4|e2e8f0|e0e7ff|bfdbfe|fce7f3|f0f2f5)'/gi, replace: "borderBottom: '1px solid var(--border)'" },
  { regex: /borderTop:\s*'1px solid #(e5e7eb|e5e9f4|e2e8f0|e0e7ff|bfdbfe|fce7f3|f0f2f5)'/gi, replace: "borderTop: '1px solid var(--border)'" },
  { regex: /borderColor:\s*'#(e5e7eb|e5e9f4|e2e8f0|e0e7ff|bfdbfe|fce7f3|f0f2f5)'/gi, replace: "borderColor: 'var(--border)'" },

  // Muted/Sec colors
  { regex: /color:\s*'#(d1d5db|9ca3af|6b7280|64748b|94a3b8|cbd5e1)'/gi, replace: "color: 'var(--muted)'" },
  { regex: /color:\s*'#(4b5563|374151)'/gi, replace: "color: 'var(--text-sec)'" },
  
  // Main text
  { regex: /color:\s*'#(1f2937|111827|0f172a|1e293b|111|333|000000|000)'/gi, replace: "color: 'var(--text-main)'" },

  // Accents
  { regex: /(background|backgroundColor|color):\s*'#(eff6ff|f0f7ff|dbeafe|e0e7ff|93c5fd)'/gi, replace: "$1: 'var(--accent-light)'" },
  { regex: /(background|backgroundColor|color):\s*'#(60a5fa|3b82f6|2196f3|3c50e0|1e88e5|0ea5e9)'/gi, replace: "$1: 'var(--accent)'" },
  { regex: /(background|backgroundColor|color):\s*'#(1e3a8a|1d4ed8|1e40af)'/gi, replace: "$1: 'var(--accent-2)'" },

  // Green palette
  { regex: /(background|backgroundColor|color):\s*'#(dcfce7|ecfdf5|d1fae5)'/gi, replace: "$1: 'var(--success-light)'" },
  { regex: /(background|backgroundColor|color):\s*'#(10b981|15803d)'/gi, replace: "$1: 'var(--success)'" },

  // Red palette
  { regex: /(background|backgroundColor|color):\s*'#(fee2e2|fef2f2)'/gi, replace: "$1: 'var(--danger-light)'" },
  { regex: /(background|backgroundColor|color):\s*'#(ef4444|dc2626|b91c1c)'/gi, replace: "$1: 'var(--danger)'" },

  // Orange / Yellow palette
  { regex: /(background|backgroundColor|color):\s*'#(fffbeb|fef3c7)'/gi, replace: "$1: 'var(--warning-light)'" },
  { regex: /(background|backgroundColor|color):\s*'#(f59e0b|d97706)'/gi, replace: "$1: 'var(--warning)'" },

  // Pink / other
  { regex: /(background|backgroundColor|color):\s*'#(fdf2f8|be185d)'/gi, replace: "$1: 'var(--accent)'" }
];

let modifiedCount = 0;

allJsxFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  replacements.forEach(r => {
    newContent = newContent.replace(r.regex, r.replace);
  });
  
  // Specific case for blue shadow
  newContent = newContent.replace(/boxShadow:\s*(isCalled\s*\?\s*'none'\s*:\s*)?'0 2px 8px rgba\(33,150,243,0.2\)'/g, "boxShadow: $1'var(--shadow-base)'");
  
  // Fix color white manually where they appear in buttons usually mapped previously to #fff
  newContent = newContent.replace(/color:\s*(isCalled\s*\?\s*'var\(--muted\)'\s*:\s*)?'#(fff|ffffff)'/g, "color: $1'var(--text-inverse)'");

  if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    modifiedCount++;
    console.log('Modified: ' + file);
  }
});

console.log('Total JSX files completely themed: ' + modifiedCount);
