#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../');
const SRC_DIR = path.join(ROOT, 'src');
const DIST_DIR = path.join(ROOT, 'dist');
const DOCS_DIR = path.join(ROOT, 'docs');
const MINI_DIR = path.join(ROOT, 'mini');
const { minifyCSS, minifyJS } = require('../../lib/minify');

// Цвета для консоли
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(type, message) {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = {
    info: `${colors.blue}ℹ${colors.reset}`,
    success: `${colors.green}✓${colors.reset}`,
    warn: `${colors.yellow}⚠${colors.reset}`,
    error: `${colors.red}✗${colors.reset}`,
  }[type] || type;

  console.log(`[${timestamp}] ${prefix} ${message}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function buildProject(projectName) {
  const projectPath = path.join(SRC_DIR, projectName);
  const projectDistPath = path.join(DIST_DIR, projectName);
  const projectIndexPath = path.join(projectPath, 'index.json');

  if (!fs.existsSync(projectIndexPath)) {
    log('warn', `No index.json found for ${projectName}`);
    return null;
  }

  const projectIndex = JSON.parse(fs.readFileSync(projectIndexPath, 'utf-8'));
  ensureDir(projectDistPath);

  const customizations = [];

  projectIndex.customizations.forEach(custom => {
    if (!custom.enabled) return;

    const customPath = path.join(projectPath, custom.path);
    const metaPath = path.join(customPath, 'meta.json');

    if (!fs.existsSync(metaPath)) {
      log('warn', `No meta.json for ${projectName}/${custom.id}`);
      return;
    }

    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    const cssPath = path.join(customPath, meta.files.css);
    const jsPath = path.join(customPath, meta.files.js);

    const customId = custom.id;
    const customDistPath = path.join(projectDistPath, customId);
    ensureDir(customDistPath);

    // Build CSS
    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf-8');
      const minifiedCSS = minifyCSS(cssContent);
      const cssDistPath = path.join(DIST_DIR, projectName, `${customId}.css`);
      fs.writeFileSync(cssDistPath, minifiedCSS);
      log('success', `Built CSS: dist/${projectName}/${customId}.css (${minifiedCSS.length} bytes)`);
    }

    // Build JS
    if (fs.existsSync(jsPath)) {
      const jsContent = fs.readFileSync(jsPath, 'utf-8');
      const minifiedJS = minifyJS(jsContent);
      const jsDistPath = path.join(DIST_DIR, projectName, `${customId}.js`);
      fs.writeFileSync(jsDistPath, minifiedJS);
      log('success', `Built JS: dist/${projectName}/${customId}.js (${minifiedJS.length} bytes)`);
    }

    const relativeSource = path.relative(ROOT, customPath).split(path.sep).join('/');

    customizations.push({
      id: customId,
      sourcePath: relativeSource,
      ...meta,
      cdn: {
        css: `https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/${projectName}/${customId}.css`,
        js: `https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/${projectName}/${customId}.js`,
      },
    });
  });

  return {
    project: projectName,
    ...projectIndex,
    customizations,
  };
}

function generateManifest(projects) {
  const manifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    projects: projects,
  };

  const manifestPath = path.join(DIST_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  log('success', `Generated manifest: dist/manifest.json`);

  return manifest;
}

function generateCDNLinks(manifest) {
  let markdown = '# CDN Links\n\n';
  markdown += `Generated: ${new Date().toLocaleString()}\n\n`;
  markdown += 'Use these links to include customizations in your Carrd site:\n\n';

  manifest.projects.forEach(project => {
    markdown += `## ${project.title || project.project}\n\n`;

    project.customizations.forEach(custom => {
      markdown += `### ${custom.title || custom.name}\n\n`;
      markdown += `**Version:** ${custom.version}\n\n`;
      markdown += `**Description:** ${custom.description}\n\n`;

      if (custom.cdn.css) {
        markdown += `**CSS:**\n\`\`\`html\n<link rel="stylesheet" href="${custom.cdn.css}">\n\`\`\`\n\n`;
      }

      if (custom.cdn.js) {
        markdown += `**JavaScript:**\n\`\`\`html\n<script src="${custom.cdn.js}"><\/script>\n\`\`\`\n\n`;
      }

      markdown += '---\n\n';
    });
  });

  const cdnLinksPath = path.join(DOCS_DIR, 'CDN-LINKS.md');
  fs.writeFileSync(cdnLinksPath, markdown);
  log('success', `Generated CDN links: docs/CDN-LINKS.md`);
}

function escapeScriptContent(content) {
  return content.replace(/<\/script/gi, '<\\/script');
}

function generateSnippets(projects) {
  ensureDir(MINI_DIR);

  projects.forEach(project => {
    project.customizations.forEach(custom => {
      const normalizedSource = custom.sourcePath.split('/').join(path.sep);
      const customDir = path.join(ROOT, normalizedSource);
      const cssPath = path.join(customDir, custom.files?.css || '');
      const jsPath = path.join(customDir, custom.files?.js || '');

      const parts = [
        '<!--',
        '  AUTOGENERATED FILE — edit source files in src/ instead of this snippet.',
        `  Source: ${custom.sourcePath}`,
        custom.description ? `  Description: ${custom.description}` : null,
        '-->',
      ].filter(Boolean);

      if (fs.existsSync(cssPath)) {
        const cssContent = fs.readFileSync(cssPath, 'utf-8').trim();
        parts.push('<style>', cssContent, '</style>');
      }

      if (fs.existsSync(jsPath)) {
        const jsContent = escapeScriptContent(fs.readFileSync(jsPath, 'utf-8').trim());
        parts.push('<script>', jsContent, '</script>');
      }

      const snippet = parts.join('\n\n') + '\n';
      const snippetPath = path.join(MINI_DIR, `${custom.id}.html`);
      fs.writeFileSync(snippetPath, snippet);
      log('success', `Generated snippet: mini/${custom.id}.html`);
    });
  });
}

function main() {
  log('info', 'Starting build process...');

  ensureDir(DIST_DIR);
  ensureDir(DOCS_DIR);

  // Get all projects
  const projects = fs.readdirSync(SRC_DIR).filter(f => {
    const stat = fs.statSync(path.join(SRC_DIR, f));
    return stat.isDirectory() && !f.startsWith('.');
  });

  log('info', `Found ${projects.length} project(s): ${projects.join(', ')}`);

  const builtProjects = projects
    .map(project => buildProject(project))
    .filter(p => p !== null);

  if (builtProjects.length === 0) {
    log('error', 'No projects built!');
    process.exit(1);
  }

  const manifest = generateManifest(builtProjects);
  generateCDNLinks(manifest);
  generateSnippets(builtProjects);

  log('success', `\n✨ Build complete! ${builtProjects.length} project(s) processed\n`);
  log('info', `📦 Output: ${DIST_DIR}`);
  log('info', `📄 Manifest: ${path.join(DIST_DIR, 'manifest.json')}`);
  log('info', `🔗 CDN Links: ${path.join(DOCS_DIR, 'CDN-LINKS.md')}`);
}

main();
