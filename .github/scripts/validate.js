#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
};

function validate() {
  let errors = [];
  let warnings = [];

  const projects = fs.readdirSync(SRC_DIR).filter(f => {
    const stat = fs.statSync(path.join(SRC_DIR, f));
    return stat.isDirectory() && !f.startsWith('.');
  });

  projects.forEach(project => {
    const projectPath = path.join(SRC_DIR, project);
    const indexPath = path.join(projectPath, 'index.json');

    if (!fs.existsSync(indexPath)) {
      errors.push(`Missing index.json in ${project}`);
      return;
    }

    const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

    index.customizations.forEach(custom => {
      if (!custom.enabled) return;

      const customPath = path.join(projectPath, custom.path);
      const metaPath = path.join(customPath, 'meta.json');

      if (!fs.existsSync(metaPath)) {
        errors.push(`Missing meta.json for ${project}/${custom.id}`);
        return;
      }

      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

      const cssPath = path.join(customPath, meta.files.css);
      const jsPath = path.join(customPath, meta.files.js);

      if (!fs.existsSync(cssPath)) {
        errors.push(`Missing CSS file: ${project}/${custom.id}/${meta.files.css}`);
      }

      if (!fs.existsSync(jsPath)) {
        errors.push(`Missing JS file: ${project}/${custom.id}/${meta.files.js}`);
      }

      if (!meta.version) {
        warnings.push(`No version in ${project}/${custom.id}/meta.json`);
      }
    });
  });

  if (errors.length > 0) {
    console.log(`${colors.red}✗ Validation failed!${colors.reset}\n`);
    errors.forEach(e => console.log(`  ${colors.red}✗${colors.reset} ${e}`));
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.log(`${colors.yellow}⚠ Warnings:${colors.reset}\n`);
    warnings.forEach(w => console.log(`  ${colors.yellow}⚠${colors.reset} ${w}`));
  }

  console.log(`${colors.green}✓ Validation passed!${colors.reset}`);
}

validate();
