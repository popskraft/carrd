const fs = require('fs');
const path = require('path');

// Создаёт структуру dist/ с разделёнными CSS и JS файлами
const projectDirs = ['mini'];
const distDir = path.join(__dirname, '../../dist');

// Очистить dist папку
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

projectDirs.forEach(projectName => {
  const projectPath = path.join(__dirname, `../../${projectName}`);
  const projectDistDir = path.join(distDir, projectName);
  
  fs.mkdirSync(projectDistDir, { recursive: true });
  
  // Найти все .html файлы кастомизаций (кроме src/)
  const files = fs.readdirSync(projectPath).filter(f => 
    f.endsWith('.html') && f !== 'index.html'
  );
  
  files.forEach(file => {
    const filePath = path.join(projectPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const baseName = path.basename(file, '.html');
    
    // Извлечь CSS
    const cssMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
    if (cssMatch) {
      const cssContent = cssMatch[1].trim();
      const cssFile = path.join(projectDistDir, `${baseName}.css`);
      fs.writeFileSync(cssFile, cssContent);
      console.log(`✓ Created: ${projectName}/${baseName}.css`);
    }
    
    // Извлечь JS
    const jsMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (jsMatch) {
      const jsContent = jsMatch[1].trim();
      const jsFile = path.join(projectDistDir, `${baseName}.js`);
      fs.writeFileSync(jsFile, jsContent);
      console.log(`✓ Created: ${projectName}/${baseName}.js`);
    }
  });
});

console.log('\n✓ Assets extracted successfully!');
