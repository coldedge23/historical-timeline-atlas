// WWII Europe module (docs/20261107_二戰歐洲戰場模組規劃_v5.md): date rules, strict data rules,
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

// --- Stage 2: format and UI (plan v5, sections 4.4, 4.6, 4.7) ---
import { battleLinkSet } from '../src/utils/linkDerivation.js';
import { createSearchIndex } from '../src/utils/search.js';
import { battleInPhase, battleInTheater, theaterOptions } from '../src/utils/battleFilters.js';
import { BATTLE_PHASES, battlePhasesFor } from '../src/data/battlePhases.js';
import { EUROPEWAR_BATTLE_TAXONOMY } from '../src/data/europewar/index.js';

test('display dates come from the date fields', () => {
  for (const evt of EUROPEWAR_ALL_EVENTS) assert.equal(evt.yearDisplay, formatDateRange(evt.date, evt.endDate), evt.id);
  const poland = EUROPEWAR_BATTLES.find((b) => b.id === 'bat_ew_german_invasion_of_poland_1939');
  assert.equal(poland.yearDisplay, '1939 年 9 月 1 日 – 10 月 6 日');
  assert.equal(poland.eraName, '開戰與閃電戰');
});

test('related battles: descriptors for same-page battles only, no key when there are none', () => {
  const a = { ...goodBattle(), id: 'a', name: '甲', relatedBattleIds: ['b', 'elsewhere'] }, b = { ...goodBattle(), id: 'b', name: '乙', relatedBattleIds: ['a'] };
  const pools = { id: EUROPEWAR_PAGE_ID, battles: [a, b], figuresForLinks: [], eventsForLinks: [] };
  const links = battleLinkSet(a, pools);
  assert.deepEqual(links.related.map((l) => [l.key, l.type, l.id, l.name, l.basis]), [[`${EUROPEWAR_PAGE_ID}:battle:b`, 'battle', 'b', '乙', 'related-battle-id']]);
  assert.equal('related' in battleLinkSet({ ...b, relatedBattleIds: [] }, pools), false);
  assert.equal('related' in battleLinkSet({ id: 'old', name: '舊', year: 200 }, pools), false);
});

test('battle phases: every pack carries its phases; old packs keep the values moved from BattlesView', () => {
  for (const [pageId, info] of Object.entries(catalog.packs)) {
    const pack = JSON.parse(built.files[info.file]);
    assert.deepEqual(pack.battlePhases, battlePhasesFor(pageId), pageId);
    assert.equal('battleTaxonomy' in pack, pageId === EUROPEWAR_PAGE_ID, pageId);
  }
  assert.equal(battlePhasesFor('noSuchPage'), BATTLE_PHASES.threeKingdoms);
  const byYear = { min: 1939, max: 1940 }, byEra = { eraId: 'ewar_blitz' };
  assert.equal(battleInPhase({ year: 1939 }, byYear), true);
  assert.equal(battleInPhase({ year: 1941 }, byYear), false);
  assert.equal(battleInPhase({ year: 1941, eraId: 'ewar_blitz' }, byEra), true);
  assert.equal(battleInPhase({ year: 1941, eraId: 'ewar_eastfront' }, byEra), false);
});

test('theater filter: options in taxonomy order, only theaters in use, with counts', () => {
  const battles = [{ theaters: ['western', 'atlantic'] }, { theaters: ['western'] }, {}];
  assert.deepEqual(theaterOptions(battles, EUROPEWAR_BATTLE_TAXONOMY.theaters).map((o) => [o.id, o.count]), [['western', 2], ['atlantic', 1]]);
  assert.deepEqual(theaterOptions(battles, undefined), []);
  assert.equal(battleInTheater(battles[2], 'all'), true);
  assert.equal(battleInTheater(battles[2], 'western'), false);
  assert.equal(battleInTheater(battles[0], 'atlantic'), true);
});

test('search: participant names are indexed', () => {
  const battle = { ...goodBattle(), participants: [{ name: '斯洛伐克', role: '入侵方', side: 'attacker' }] };
  const [entry] = createSearchIndex([{ id: EUROPEWAR_PAGE_ID, name: '二戰歐洲戰場', civ: 'europewar', battles: [battle] }]);
  assert.ok(entry.text.includes('斯洛伐克'));
});
