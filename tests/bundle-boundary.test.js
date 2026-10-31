// Plan v2 section 3.7: which bundle each class of src/data file may land in, read from the esbuild metafile.
// - main entry (and its static imports): no geo; no content once the store reads data packs (stage 2b-①)
// - geo: only in chunks that the main entry loads lazily
// - content: only in the legacy fallback chunk (stage 2b), which stage 4 removes
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const esbuild = require(process.env.ATLAS_NODE_MODULES ? join(process.env.ATLAS_NODE_MODULES, 'esbuild') : 'esbuild');
const { bundleOptions } = require('../scripts/esbuild_options.cjs');
const classes = JSON.parse(readFileSync(join(ROOT, 'scripts', 'data_file_classes.json'), 'utf8')).classes;
const classOf = Object.fromEntries(Object.entries(classes).flatMap(([name, { files }]) => files.map((file) => [`src/data/${file}`, name])));

// Stage 2b-0: the store still imports content statically. 2b-① moves it into the fallback chunk and sets this to false.
const CONTENT_IN_MAIN_ENTRY = true;
// The legacy data source is the only module that may pull content into a lazy chunk.
const LEGACY_SOURCE = 'src/store/legacySource.js';

const { metafile } = await esbuild.build({ ...bundleOptions(join(ROOT, 'dist', 'assets')), minify: false });
const outputs = metafile.outputs;
const entryFile = Object.keys(outputs).find((file) => outputs[file].entryPoint === 'src/main.js');
const staticClosure = (start) => {
  const seen = new Set([start]);
  const queue = [start];
  while (queue.length) for (const imp of outputs[queue.shift()].imports) if (imp.kind === 'import-statement' && !seen.has(imp.path)) { seen.add(imp.path); queue.push(imp.path); }
  return seen;
};
const mainFiles = staticClosure(entryFile);
const inputsOf = (files) => [...files].flatMap((file) => Object.keys(outputs[file].inputs));
const dataInputs = (files, cls) => inputsOf(files).filter((input) => classOf[input] === cls).sort();

test('every bundled src/data file is classified', () => {
  const unclassified = inputsOf(Object.keys(outputs)).filter((input) => input.startsWith('src/data/') && !classOf[input]);
  assert.deepEqual(unclassified, []);
});

test('the main entry carries no map geography', () => {
  // linkedHistoryCatalog.js projects Japan event coordinates (svgPos); it leaves the main entry in 2b-①.
  assert.deepEqual(dataInputs(mainFiles, 'geo'), CONTENT_IN_MAIN_ENTRY ? ['src/data/japan/japanPrefecturesGeoData.js'] : []);
});

test('history content stays out of the main entry, except during stage 2b-0', () => {
  const content = dataInputs(mainFiles, 'content');
  if (CONTENT_IN_MAIN_ENTRY) assert.ok(content.includes('src/data/linkedHistoryCatalog.js'), 'flag is stale: set CONTENT_IN_MAIN_ENTRY to false');
  else assert.deepEqual(content, []);
});

test('lazy chunks carry history content only through the legacy data source', () => {
  for (const file of Object.keys(outputs).filter((f) => f.endsWith('.js') && !mainFiles.has(f))) {
    const inputs = Object.keys(outputs[file].inputs);
    const content = inputs.filter((input) => classOf[input] === 'content');
    if (content.length) assert.ok(inputs.includes(LEGACY_SOURCE) || isOnlyReachedFromLegacy(file), `${file}: ${content.slice(0, 3).join(', ')}`);
  }
});

// A chunk split out of the legacy chunk (shared modules) is reached only from chunks that hold the legacy source.
function isOnlyReachedFromLegacy(file) {
  const importers = Object.keys(outputs).filter((f) => outputs[f].imports.some((imp) => imp.path === file));
  return importers.length > 0 && importers.every((f) => Object.keys(outputs[f].inputs).includes(LEGACY_SOURCE) || isOnlyReachedFromLegacy(f));
}
