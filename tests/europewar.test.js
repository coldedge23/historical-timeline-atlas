// WWII Europe module (docs/20261107_二戰歐洲戰場模組規劃_v4.md): date rules, strict data rules,
// topic year range in the contemporary sync, and dataset attribution.
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDate, eraForDate, dateProblems, formatDateRange } from '../src/utils/datedRecords.js';
import { strictProblems, insideBounds } from '../scripts/lib/strict_rules.mjs';
import { EUROPEWAR_ERA_DEFS, EUROPEWAR_ALL_EVENTS, EUROPEWAR_BATTLES, EUROPEWAR_CLAIM_FIELDS, EUROPEWAR_THEATERS, EUROPEWAR_SCALES,
  EUROPEWAR_MODES, EUROPEWAR_MAP_BOUNDS, EUROPEWAR_PAGE_ID } from '../src/data/europewar/index.js';
import { contemporaryMatches } from '../src/utils/relationRules.js';
import { civCoversYear } from '../src/civilizations/registry.js';
import { createDataPacks } from '../scripts/build_data_packs.mjs';

const STRICT = { eras: EUROPEWAR_ERA_DEFS, claimFields: EUROPEWAR_CLAIM_FIELDS, theaters: EUROPEWAR_THEATERS, scales: EUROPEWAR_SCALES, modes: EUROPEWAR_MODES };
const rules = (problems) => problems.map((p) => p.rule);

test('dates: only real YYYY-MM-DD or YYYY-MM dates parse', () => {
  assert.deepEqual(parseDate('1939-09-01'), { year: 1939, month: 9, day: 1 });
  assert.deepEqual(parseDate('1940-05'), { year: 1940, month: 5, day: null });
  for (const bad of ['1941-02-30', '1939-13', '1939-9-1', '1939', '', null]) assert.equal(parseDate(bad), null, String(bad));
});

test('dates: a month that crosses an era boundary belongs to no era', () => {
  assert.equal(eraForDate('1941-06-22', EUROPEWAR_ERA_DEFS).id, 'ewar_eastfront');
  assert.equal(eraForDate('1941-06-21', EUROPEWAR_ERA_DEFS).id, 'ewar_blitz');
  assert.equal(eraForDate('1941-05', EUROPEWAR_ERA_DEFS).id, 'ewar_blitz');
  for (const crossing of ['1941-06', '1942-08', '1945-05', '1939-08']) assert.equal(eraForDate(crossing, EUROPEWAR_ERA_DEFS), null, crossing);
  assert.equal(eraForDate('1939-08-22', EUROPEWAR_ERA_DEFS), null, 'before the first era');
});

test('dates: start after end, wrong year and wrong era are reported', () => {
  assert.deepEqual(dateProblems({ year: 1940, startDate: '1940-06-25', endDate: '1940-05-10' }).length, 1);
  assert.deepEqual(dateProblems({ year: 1941, startDate: '1940-05-10' }).length, 1);
  assert.deepEqual(dateProblems({ year: 1940, startDate: '1940-05-10', eraId: 'ewar_turning' }, { eras: EUROPEWAR_ERA_DEFS }).length, 1);
  assert.deepEqual(dateProblems({ year: 1940 }, { requireStart: true }).length, 1);
  assert.deepEqual(dateProblems({ year: 1940, startDate: '1940-05-10', endDate: '1940-06-25' }, { eras: EUROPEWAR_ERA_DEFS }), []);
});

test('dates: display writes the shared year once', () => {
  assert.equal(formatDateRange('1940-05-10', '1940-06-25'), '1940 年 5 月 10 日 – 6 月 25 日');
  assert.equal(formatDateRange('1944-12-16', '1945-01-25'), '1944 年 12 月 16 日 – 1945 年 1 月 25 日');
  assert.equal(formatDateRange('1940-05'), '1940 年 5 月');
});

const goodBattle = () => structuredClone(EUROPEWAR_BATTLES[0]);

test('strict rules: the module data has no problems', () => {
  for (const evt of EUROPEWAR_ALL_EVENTS) assert.deepEqual(strictProblems(STRICT, 'events', evt), [], evt.id);
  for (const bat of EUROPEWAR_BATTLES) assert.deepEqual(strictProblems(STRICT, 'battles', bat, EUROPEWAR_BATTLES), [], bat.id);
});

test('strict rules: a filled value without a claiming source fails; 待考 does not', () => {
  const bat = goodBattle();
  bat.defender.casualtiesEstimate = '約 6 萬人';
  assert.deepEqual(rules(strictProblems(STRICT, 'battles', bat, [bat])), ['unsupported-claim']);
  bat.defender.casualtiesEstimate = '待考';
  bat.sources[0].claims.push('summary');
  assert.deepEqual(rules(strictProblems(STRICT, 'battles', bat, [bat])), ['unknown-claim-field']);
});

test('strict rules: classification, participants and related battles', () => {
  const bat = goodBattle();
  Object.assign(bat, { scale: 'war', modes: [], theaters: ['pacific'], participants: [{ name: '蘇聯', side: 'other' }], relatedBattleIds: [bat.id, 'missing', 'missing'] });
  assert.deepEqual(rules(strictProblems(STRICT, 'battles', bat, [bat])).sort(),
    ['invalid-battle-modes', 'invalid-battle-scale', 'invalid-battle-theaters', 'invalid-participant', 'related-battle', 'related-battle', 'related-battle', 'related-battle'].sort());
  const a = { ...goodBattle(), id: 'a', relatedBattleIds: ['b'] }, b = { ...goodBattle(), id: 'b', relatedBattleIds: [] };
  assert.deepEqual(rules(strictProblems(STRICT, 'battles', a, [a, b])), ['related-battle'], 'one-way link');
});

test('every module coordinate is [lng, lat] inside the map', () => {
  for (const r of [...EUROPEWAR_ALL_EVENTS, ...EUROPEWAR_BATTLES]) assert.ok(insideBounds(r.coordinates, EUROPEWAR_MAP_BOUNDS), r.id);
});

test('topic year range: no WWII Europe row outside 1939-1945', () => {
  const pools = { china: [{ id: 'c1941', year: 1941 }], taiwan: [], japan: [], europewar: [{ id: 'e1939', year: 1939 }] };
  const civs = (evt, civ) => contemporaryMatches(evt, civ, pools).map((m) => m.civKey);
  assert.ok(!civs({ year: -200 }, 'china').includes('europewar'));
  assert.ok(civs({ year: 1941 }, 'china').includes('europewar'));
  assert.ok(!civs({ year: 1946 }, 'japan').includes('europewar'));
  assert.equal(civCoversYear('china', -2000), true);
  // From a WWII Europe event, other civilizations' events outside the range are never the closest match.
  const far = { china: [{ id: 'c1900', year: 1900 }], taiwan: [], japan: [], europewar: [] };
  assert.equal(contemporaryMatches({ year: 1939 }, 'europewar', far).find((m) => m.civKey === 'china').closest, null);
});

const built = createDataPacks();
const catalog = built.catalog;

test('built catalog: WWII Europe labels only for events in range, and its pack is attributed to it', () => {
  for (const [civ, rows] of Object.entries(catalog.contemporary)) {
    const yearAt = catalog.contemporaryFields.indexOf('year'), regimesAt = catalog.contemporaryFields.indexOf('regimes');
    for (const row of rows) {
      if (!row[regimesAt] || civ === 'europewar') continue;
      assert.equal('europewar' in row[regimesAt], row[yearAt] >= 1939 && row[yearAt] <= 1945, `${civ} ${row[0]}`);
    }
  }
  assert.equal(catalog.packs[EUROPEWAR_PAGE_ID].civ, 'europewar');
  const search = JSON.parse(built.files[catalog.searchIndex.file]);
  const civAt = search.fields.indexOf('civ'), periodAt = search.fields.indexOf('periodId');
  const own = search.entries.filter((e) => e[periodAt] === EUROPEWAR_PAGE_ID);
  assert.ok(own.length > 0);
  assert.deepEqual([...new Set(own.map((e) => e[civAt]))], ['europewar']);
});
