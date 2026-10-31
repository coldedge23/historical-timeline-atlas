// Plan v2 section 3.7: every src/data file belongs to exactly one class, and only content files may import content.
// The main-entry metafile check is enforced from stage 2b.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'src', 'data');
const classes = JSON.parse(readFileSync(join(ROOT, 'scripts', 'data_file_classes.json'), 'utf8'));
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.js') ? [join(dir, e.name)] : []);
const dataFiles = walk(DATA).map((file) => relative(DATA, file).split(sep).join('/')).sort();
const classOf = {};
for (const [name, { files }] of Object.entries(classes.classes)) for (const file of files) (classOf[file] ||= []).push(name);

test('every src/data file is classified exactly once', () => {
  const unclassified = dataFiles.filter((file) => !classOf[file]);
  const duplicated = Object.entries(classOf).filter(([, names]) => names.length > 1).map(([file]) => file);
  const stale = Object.keys(classOf).filter((file) => !dataFiles.includes(file));
  assert.deepEqual({ unclassified, duplicated, stale }, { unclassified: [], duplicated: [], stale: [] });
});

const importsOf = (file) => [...readFileSync(join(DATA, file), 'utf8').matchAll(/^\s*(?:import|export)\b[^;'"]*?from\s*['"](\.[^'"]+)['"]|^\s*import\s*['"](\.[^'"]+)['"]/gm)]
  .map((m) => relative(DATA, resolve(dirname(join(DATA, file)), m[1] || m[2])).split(sep).join('/'))
  .filter((target) => !target.startsWith('..'));

test('geo and config files do not import content, except the listed known violations', () => {
  const found = [];
  for (const file of dataFiles.filter((f) => classOf[f]?.[0] !== 'content')) {
    for (const target of importsOf(file)) if (classOf[target]?.[0] === 'content') found.push(`${file} -> ${target}`);
  }
  const known = classes.knownViolations.map((v) => `${v.file} -> ${v.imports}`);
  // A fixed violation must also be removed from the list, so the list stays true.
  assert.deepEqual(found.sort(), known.sort());
});
