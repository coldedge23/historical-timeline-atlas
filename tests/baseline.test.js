// Stage 0 baseline: current behaviour must not change until a stage says so.
// To accept an intended change, rerun `node scripts/capture_baseline.mjs` and review the fixture diff.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { BASELINE_DIR, collectBaseline, toFixture } from '../scripts/capture_baseline.mjs';

const current = collectBaseline();
const changedKeys = (expected, actual) => [...new Set([...Object.keys(expected), ...Object.keys(actual)])]
  .filter(k => JSON.stringify(expected[k]) !== JSON.stringify(actual[k])).slice(0, 10);

for (const [name, value] of Object.entries(current)) {
  test(`baseline unchanged: ${name}`, () => {
    const expected = JSON.parse(readFileSync(join(BASELINE_DIR, `${name}.json`), 'utf8'));
    const actual = JSON.parse(JSON.stringify(toFixture(value)));
    assert.equal(actual.hashed, expected.hashed, `${name}: fixture format changed`);
    assert.deepEqual(actual.data, expected.data, `${name}: changed entries ${JSON.stringify(changedKeys(expected.data, actual.data))}`);
  });
}
