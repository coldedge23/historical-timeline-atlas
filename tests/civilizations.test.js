// Civilization registry (plan v2 section 3.7): the registry agrees with what the build produces,
// and civilization configs stay small (no history data, maps only through dynamic import()).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CIVILIZATIONS, CIV_IDS, DEFAULT_CIV, ERA_CIVS, civById, civForPage, pageIdFor } from '../src/civilizations/registry.js';
import { createDataPacks } from '../scripts/build_data_packs.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CIV_DIR = join(ROOT, 'src', 'civilizations');
const { catalog } = createDataPacks();

test('the registry lists the civilizations the build packs, in the same order', () => {
  assert.deepEqual(catalog.civilizations.map(c => c.id), CIV_IDS);
  for (const civ of CIVILIZATIONS) {
    assert.equal(catalog.civilizations.find(c => c.id === civ.id).name, civ.shortName);
    assert.ok(['period', 'era'].includes(civ.unit), civ.id);
    assert.equal(typeof civ.loadMap, 'function', civ.id);
    assert.equal(typeof civ.regimeLabel(1600), 'string', civ.id);
  }
  assert.equal(DEFAULT_CIV.unit, 'period');
});

test('page ids and defaults exist in the built catalog', () => {
  const periodIds = catalog.civilizations.find(c => c.id === DEFAULT_CIV.id).packs;
  assert.ok(periodIds.includes(DEFAULT_CIV.defaultPeriodId));
  for (const id of periodIds) {
    assert.equal(pageIdFor(DEFAULT_CIV.id, id), id);
    assert.equal(civForPage(id), DEFAULT_CIV);
  }
  for (const civ of ERA_CIVS) {
    assert.deepEqual(catalog.civilizations.find(c => c.id === civ.id).packs, [civ.pageId]);
    assert.equal(pageIdFor(civ.id, 'ignored'), civ.pageId);
    assert.equal(civForPage(civ.pageId), civ);
    assert.ok(catalog.eras[civ.id].some(era => era.id === civ.defaultEraId), `${civ.id} default era`);
  }
  assert.equal(civById('atlantis'), null);
});

const configFiles = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? configFiles(path) : path.endsWith('.js') ? [path] : [];
});

test('civilization configs import no history data and load maps only dynamically', () => {
  for (const file of configFiles(CIV_DIR)) {
    const rel = relative(ROOT, file).replace(/\\/g, '/');
    const source = readFileSync(file, 'utf8');
    const staticImports = [...source.matchAll(/^\s*import\s[^;]*?from\s+['"]([^'"]+)['"]/gm)].map(m => m[1]);
    // Only the registry imports statically, and only the configs.
    for (const spec of staticImports) assert.match(spec, /^\.\/[a-z]+\/config\.js$/, `${rel} imports ${spec}`);
    if (!rel.endsWith('registry.js')) assert.equal(staticImports.length, 0, `${rel} must not import statically`);
    for (const [, spec] of source.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g)) {
      assert.match(spec, /^\.\.\/\.\.\/components\/[A-Za-z]+Map\.jsx$/, `${rel} dynamically imports ${spec}`);
    }
    assert.doesNotMatch(source, /src\/data|\.\.\/data\//, `${rel} references src/data`);
  }
});
