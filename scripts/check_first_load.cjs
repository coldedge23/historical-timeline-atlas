// First load (plan v2 section 3.9 A) for npm run verify: for every page and tab a link can open cold, the JS, CSS,
// catalog and pack the browser requests before the page is usable, gzip-compressed like the other limits.
// Summed from the build's chunk graph (build-manifest.json chunks). The file lists were checked against browser
// network requests on 2026-10-31 (docs/20261031_資料包體積實測_v4.md); recheck them in a browser after big changes.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const zlib = require('node:zlib');

const ROOT = path.join(__dirname, '..');
// The tabs app.js loads lazily (const FiguresView/BattlesView = lazy(...)); the map tab loads the civilization's map.
const TAB_MODULES = { figures: 'src/components/FiguresView.js', battles: 'src/components/BattlesView.js' };

// The map module a civilization's config.js loads with import() (tests/civilizations.test.js keeps that the only form).
function mapModule(civ) {
  const configFile = path.join(ROOT, 'src', 'civilizations', civ, 'config.js');
  assert(fs.existsSync(configFile), `找不到文明設定 ${civ}`);
  const spec = fs.readFileSync(configFile, 'utf8').match(/loadMap:[^\n]*import\(\s*['"]([^'"]+)['"]\s*\)/)?.[1];
  assert(spec, `${civ} 的 config.js 找不到 loadMap 的 import()`);
  return path.relative(ROOT, path.resolve(path.dirname(configFile), spec)).split(path.sep).join('/');
}

function firstLoadScenarios(dist, manifest, catalog) {
  assert(manifest.chunks, 'build-manifest.json 缺少分包關係，請重新建置');
  const closure = (start) => {
    const seen = new Set([start]);
    const queue = [start];
    while (queue.length) for (const next of manifest.chunks[queue.shift()].imports) if (!seen.has(next)) { seen.add(next); queue.push(next); }
    return seen;
  };
  const chunkOf = (module) => {
    const chunk = Object.keys(manifest.chunks).find((file) => manifest.chunks[file].entryPoint === module);
    assert(chunk, `找不到 ${module} 的延後分包`);
    return chunk;
  };
  const css = manifest.assets.find((asset) => asset.endsWith('.css'));
  const shared = [...closure(manifest.entry), css, manifest.data.catalog];
  const gzipKb = new Map();
  const kb = (file) => {
    if (!gzipKb.has(file)) gzipKb.set(file, zlib.gzipSync(fs.readFileSync(path.join(dist, file))).length / 1024);
    return gzipKb.get(file);
  };
  return Object.entries(catalog.packs).flatMap(([pageId, pack]) => Object.entries({ map: mapModule(pack.civ), ...TAB_MODULES }).map(([tab, module]) => {
    const files = [...new Set([...shared, pack.file, ...closure(chunkOf(module))])];
    return { pageId, tab, files, kb: files.reduce((sum, file) => sum + kb(file), 0) };
  }));
}

module.exports = { firstLoadScenarios, TAB_MODULES };
