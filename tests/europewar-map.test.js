// WWII Europe map (plan docs/20261107_二戰歐洲戰場模組規劃_v5.md, sections 4.5 and 7): coordinate anchors against
// Natural Earth city points, a swapped-coordinate check that must fail, and every marker inside the drawn map.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { EUROPEWAR_MAP } from '../src/data/europewar/europeWarMapGeoData.js';
import { createMapProjection } from '../src/utils/conicProjection.js';
import { EUROPEWAR_ALL_EVENTS, EUROPEWAR_BATTLES, EUROPEWAR_MAP_BOUNDS } from '../src/data/europewar/index.js';
import { insideBounds } from '../scripts/lib/strict_rules.mjs';

const { cities } = JSON.parse(readFileSync(new URL('./fixtures/europewar_anchor_cities.json', import.meta.url), 'utf8'));
const city = (name) => cities.find((c) => c.name === name);
const project = createMapProjection(EUROPEWAR_MAP.projection);
const records = [...EUROPEWAR_ALL_EVENTS, ...EUROPEWAR_BATTLES];
const byId = (id) => records.find((r) => r.id === id);

// Records placed at a city, and the Natural Earth city. Stage 4 adds battles until there are at least 5 (plan 4.5).
const ANCHORS = [
  ['bat_ew_german_invasion_of_poland_1939', 'Warsaw'],
  ['evt_ew_invasion_of_poland_1939', 'Warsaw'],
  ['evt_ew_german_soviet_pact_1939', 'Moscow'],
];
// Distance in degrees between [lng, lat] and a city.
const offBy = ([lng, lat], c) => Math.hypot(lng - c.lng, lat - c.lat);
const anchorProblems = (coordinatesOf) => ANCHORS.filter(([id, name]) => !(offBy(coordinatesOf(byId(id)), city(name)) <= 1))
  .map(([id, name]) => `${id} 離 ${name} 超過 1°`);

test('anchors: records placed at a city lie within 1° of its Natural Earth point', () => {
  for (const [id, name] of ANCHORS) { assert.ok(byId(id), id); assert.ok(city(name), name); }
  assert.deepEqual(anchorProblems((r) => r.coordinates), []);
});

test('anchors: swapped coordinates ([lat, lng]) fail the anchor and the bounds checks', () => {
  const swapped = (r) => [r.coordinates[1], r.coordinates[0]];
  assert.equal(anchorProblems(swapped).length, ANCHORS.length);
  for (const [id] of ANCHORS) assert.equal(insideBounds(swapped(byId(id)), EUROPEWAR_MAP_BOUNDS), false, id);
});

test('every module record projects inside the drawn map', () => {
  for (const r of records) {
    const [x, y] = project(r.coordinates);
    assert.ok(x >= 0 && x <= EUROPEWAR_MAP.width && y >= 0 && y <= EUROPEWAR_MAP.height, `${r.id} → ${x}, ${y}`);
  }
  // The corners of the map bounds are inside the view too, so any record that passes the bounds check is drawn.
  const b = EUROPEWAR_MAP_BOUNDS;
  for (const corner of [[b.minLng, b.minLat], [b.minLng, b.maxLat], [b.maxLng, b.minLat], [b.maxLng, b.maxLat]]) {
    const [x, y] = project(corner);
    assert.ok(x >= 0 && x <= EUROPEWAR_MAP.width && y >= 0 && y <= EUROPEWAR_MAP.height, `corner ${corner}`);
  }
});

test('projection keeps compass directions: west is left, north is up', () => {
  const [berlin, warsaw, oslo, rome] = ['Berlin', 'Warsaw', 'Oslo', 'Rome'].map((n) => project([city(n).lng, city(n).lat]));
  assert.ok(berlin[0] < warsaw[0], 'Berlin west of Warsaw');
  assert.ok(oslo[1] < rome[1], 'Oslo north of Rome');
});

test('base map data: Natural Earth coastline only, under the 100 KB gzip budget', () => {
  const source = readFileSync(new URL('../src/data/europewar/europeWarMapGeoData.js', import.meta.url));
  assert.ok(gzipSync(source).length < 100 * 1024, `${gzipSync(source).length} bytes`);
  assert.equal(EUROPEWAR_MAP.source.name, 'Natural Earth');
  assert.equal(EUROPEWAR_MAP.viewBox, `0 0 ${EUROPEWAR_MAP.width} ${EUROPEWAR_MAP.height}`);
  assert.ok(EUROPEWAR_MAP.land.startsWith('M') && EUROPEWAR_MAP.lakes.startsWith('M'));
});
