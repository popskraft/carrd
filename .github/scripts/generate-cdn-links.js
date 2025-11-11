const fs = require('fs');
const path = require('path');

// Генерирует файл с CDN ссылками для всех кастомизаций
const distDir = path.join(__dirname, '../../dist');
const docsDir = path.join(__dirname, '../../docs');

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

let cdnLinks = '# CDN Links\n\n';
cdnLinks += 'Используйте эти ссылки для подключения кастомизаций через jsDelivr CDN:\n\n';

const projects = fs.readdirSync(distDir);

projects.forEach(project => {
  const projectPath = path.join(distDir, project);
  const files = fs.readdirSync(projectPath);
  
  cdnLinks += `## ${project}\n\n`;
  
  const basenames = new Set();
  files.forEach(f => {
    const base = path.basename(f, path.extname(f));
    basenames.add(base);
  });
  
  basenames.forEach(basename => {
    const cssFile = `${basename}.css`;
    const jsFile = `${basename}.js`;
    
    cdnLinks += `### ${basename}\n\n`;
    
    if (files.includes(cssFile)) {
      const cdnUrl = `https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/${project}/${cssFile}`;
      cdnLinks += `**CSS:**\n\`\`\`html\n<link rel="stylesheet" href="${cdnUrl}">\n\`\`\`\n\n`;
    }
    
    if (files.includes(jsFile)) {
      const cdnUrl = `https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/${project}/${jsFile}`;
      cdnLinks += `**JavaScript:**\n\`\`\`html\n<script src="${cdnUrl}"><\/script>\n\`\`\`\n\n`;
    }
  });
});

fs.writeFileSync(path.join(docsDir, 'CDN-LINKS.md'), cdnLinks);
console.log('✓ CDN links generated: docs/CDN-LINKS.md');
