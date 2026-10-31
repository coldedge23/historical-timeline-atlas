// Stage 2a: the browser reads history data only through src/store/historyStore.js.
// The store APIs the components use must reproduce the stage 0 baseline, and no new direct data imports may appear.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASELINE_DIR, collectBaseline, memorySource, toFixture } from '../scripts/capture_baseline.mjs';
import { PAGE_IDS, getPage, figureLinksFor, battleLinksFor, eventLinksFor, resolveLink } from '../src/store/historyStore.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const bk = (d) => d ? `${d.homePack}:${d.id}` : null;

function storeSource() {
  const base = memorySource();
  return {
    ...base,
    figureLinks: (page, figure) => { const l = figureLinksFor(page.id, figure);
      return { relations: l.relations.map((d) => [bk(d), d.relationType, d.label]), events: l.events.map(bk), battles: l.battles.map(bk) }; },
    commanderTargets: (page, battle) => { const l = battleLinksFor(page.id, battle);
      return { attacker: l.commanders.attacker.map(bk), defender: l.commanders.defender.map(bk), event: bk(l.event) }; },
    eventLinks: (page, evt) => { const l = eventLinksFor(page.id, evt); return { figures: l.figures.map((d) => [bk(d), d.review]), battle: bk(l.battle) }; },
    taiwanRelationTargets: (page, figure) => figureLinksFor(page.id, figure).relations.map((d) => resolveLink(page.id, d)),
  };
}

const { validateFailures, ...fromStore } = collectBaseline(storeSource());
for (const [name, value] of Object.entries(fromStore)) {
  test(`store reproduces baseline: ${name}`, () => {
    const expected = JSON.parse(readFileSync(join(BASELINE_DIR, `${name}.json`), 'utf8'));
    assert.deepEqual(JSON.parse(JSON.stringify(toFixture(value))), expected);
  });
}

test('every link descriptor resolves to the record in the page pool', () => {
  for (const pageId of PAGE_IDS) {
    const page = getPage(pageId);
    const check = (d) => { if (!d) return; const r = resolveLink(pageId, d); assert.ok(r, `${pageId} ${d.key}`); assert.equal(r.id, d.id); };
    for (const f of page.figures) { const l = figureLinksFor(pageId, f); [...l.relations, ...l.events, ...l.battles].forEach(check); }
    for (const b of page.battles) { const l = battleLinksFor(pageId, b); [...l.commanders.attacker, ...l.commanders.defender, l.event].forEach(check); }
    for (const e of page.events) { const l = eventLinksFor(pageId, e); [...l.figures, l.battle].forEach(check); }
  }
});

// Direct data imports left for stage 2b (map geometry and page config). Remove an entry when it moves into the store.
const KNOWN_DIRECT_DATA_IMPORTS = [
  'src/components/FigureModal.js ../data/chronologyReviews.js',
  'src/components/FigureModal.js ../data/factionConfig.js',
  'src/components/FiguresView.js ../data/chronologyReviews.js',
  'src/components/FiguresView.js ../data/factionConfig.js',
  'src/components/HistoricalAtlasMap.jsx ../data/threeKingdoms/chinaMapData.js',
  'src/components/HistoricalAtlasMap.jsx ../data/threeKingdoms/warlordPeriods.js',
  'src/components/JapanAtlasMap.jsx ../data/japan/index.js',
  'src/components/TaiwanAtlasMap.jsx ../data/taiwanLensData.js',
  'src/components/TaiwanAtlasMap.jsx ../data/taiwanMapGeoData.js',
  'src/components/TaiwanLensBanner.jsx ../data/taiwanLensData.js',
  'src/components/Timeline.js ../data/chronologyReviews.js',
  'src/components/Timeline.js ../data/factionConfig.js',
];

test('no new direct data imports outside the store', () => {
  const found = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) { if (!['data', 'store'].includes(entry.name)) walk(path); continue; }
      if (!/\.(js|jsx)$/.test(entry.name)) continue;
      const file = relative(ROOT, path).split('\\').join('/');
      for (const [, spec] of readFileSync(path, 'utf8').matchAll(/from\s+'(\.{1,2}\/(?:\.\.\/)*data\/[^']+)'/g)) found.push(`${file} ${spec}`);
    }
  };
  walk(join(ROOT, 'src'));
  assert.deepEqual(found.sort(), [...KNOWN_DIRECT_DATA_IMPORTS].sort());
});
