// Plan v2 section 3.7: which bundle each class of src/data file may land in, read from the esbuild metafile.
// - main entry (and its static imports): no geo, no content
// - geo: only in chunks that the main entry loads lazily
// - content: in no browser bundle at all; it reaches the browser only as data packs (stage 4 removed the fallback)
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
  assert.deepEqual(dataInputs(mainFiles, 'geo'), []);
});

test('history content stays out of every bundle', () => {
  assert.deepEqual(dataInputs(Object.keys(outputs), 'content'), []);
});

// Civilization maps (src/civilizations/*/config.js loadMap) are reached only through import().
test('civilization map components stay out of the main entry', () => {
  const maps = inputsOf(mainFiles).filter((input) => /^src\/components\/[A-Za-z]+AtlasMap\.jsx$/.test(input));
  assert.deepEqual(maps, []);
});

// npm run verify sums first loads (scripts/check_first_load.cjs) assuming these are the tabs app.js loads lazily.
test('the first-load check knows every lazily loaded tab', () => {
  const { TAB_MODULES } = require('../scripts/check_first_load.cjs');
  const app = readFileSync(join(ROOT, 'src', 'app.js'), 'utf8');
  const lazy = [...app.matchAll(/lazy\(\s*\(\)\s*=>\s*import\(\s*'\.\/([^']+)'\s*\)/g)].map((m) => `src/${m[1]}`);
  assert.deepEqual(lazy.sort(), Object.values(TAB_MODULES).sort());
});
