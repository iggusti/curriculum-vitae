const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skip = /^(?:[a-z]+:|\/\/|#|javascript:|data:)/i;
const failures = [];

function checkAsset(from, ref) {
  if (!ref || skip.test(ref)) {
    return;
  }

  const clean = decodeURIComponent(ref.split('#')[0].split('?')[0]);

  if (!clean) {
    return;
  }

  let target = path.resolve(path.dirname(from), clean);

  if (!path.extname(target)) {
    target = path.join(target, 'index.html');
  }

  if (!fs.existsSync(target)) {
    failures.push(`${path.relative(root, from)} -> ${ref}`);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') {
      continue;
    }

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.html$/.test(entry.name)) {
      const html = fs.readFileSync(full, 'utf8');

      for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
        checkAsset(full, match[1]);
      }

      for (const match of html.matchAll(/\ssrcset="([^"]+)"/g)) {
        for (const part of match[1].split(',')) {
          checkAsset(full, part.trim().split(/\s+/)[0]);
        }
      }
    } else if (/\.css$/.test(entry.name)) {
      const css = fs.readFileSync(full, 'utf8');

      for (const match of css.matchAll(/url\("?([^")]+)"?\)/g)) {
        checkAsset(full, match[1]);
      }
    }
  }
}

walk(root);

const manifestPath = path.join(root, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

for (const icon of manifest.icons || []) {
  checkAsset(manifestPath, icon.src);
}

const swPath = path.join(root, 'sw.js');
const sw = fs.readFileSync(swPath, 'utf8');

for (const match of sw.matchAll(/'(\.\/[^']+)'/g)) {
  checkAsset(swPath, match[1]);
}

if (failures.length) {
  console.error('Broken local references:');
  for (const failure of failures) {
    console.error('  ' + failure);
  }
  process.exit(1);
}

console.log('Local references OK');
