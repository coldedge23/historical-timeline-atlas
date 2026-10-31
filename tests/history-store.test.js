// Stage 2b: the browser reads history data only through src/store/historyStore.js, from the data packs.
// Routed the way the app routes (only the page a route opens in memory), the packs must reproduce the
// stage 0 baseline, and the pack source must handle failures as plan v2 sections 3.5-3.6 describe.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASELINE_DIR, collectBaseline, toFixture } from '../scripts/capture_baseline.mjs';
import { createDataPacks } from '../scripts/build_data_packs.mjs';
import { PAGE_IDS } from '../scripts/lib/app_views.mjs';
import { createPackSource } from '../src/store/packSource.js';
import { figureLinksFor, battleLinksFor, eventLinksFor, findOnPage, homeRecord, navigationDataset, routePageId, navigationCatalogs,
  initialContext, selectionContext, createPageNavigator } from '../src/store/historyStore.js';
import { parseNavigationHash, resolveNavigation, resolveInitialNavigation } from '../src/utils/navigation.js';
import { contemporaryMatches } from '../src/utils/relationRules.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const bk = (d) => d ? `${d.homePack}:${d.id}` : null;
const rk = (r) => r ? `${r.datasetId || '?'}:${r.id}` : null;

// A source in the baseline collector's format, built only from what the store hands the app.
async function storeSource(source) {
  const catalog = await source.loadCatalog();
  for (const id of PAGE_IDS) await source.loadPage(id);
  const pageOf = (id) => source.peekPage(id);
  const pages = PAGE_IDS.map(pageOf);
  const catalogs = navigationCatalogs(catalog, pages[0]);
  for (const page of pages) catalogs[page.civ === 'china' ? page.id : page.civ] = navigationDataset(page);
  const routePage = (hash) => pageOf(routePageId(parseNavigationHash(hash), catalog.periodIds));
  // ALL_LINKED_FIGURES: every dataset's own figures, first occurrence of an id wins.
  const seen = new Set();
  const selectionFigures = pages.flatMap((p) => p.figures.filter((f) => !f.ref && (f.datasetId || p.id) === p.id)).filter((f) => !seen.has(f.id) && seen.add(f.id));
  return {
    pages, catalogs, eras: catalog.eras,
    searchEntries: await source.loadSearchIndex(),
    resolveRoute: (hash) => resolveNavigation(hash, navigationCatalogs(catalog, routePage(hash)), catalog.eras),
    resolveColdStart: (hash) => resolveInitialNavigation(hash, initialContext(catalog, routePage(hash))),
    figureLinks: (page, figure) => { const l = figureLinksFor(page, figure);
      return { relations: l.relations.map((d) => [bk(d), d.relationType, d.label]), events: l.events.map(bk), battles: l.battles.map(bk) }; },
    commanderTargets: (page, battle) => { const l = battleLinksFor(page, battle);
      return { attacker: l.commanders.attacker.map(bk), defender: l.commanders.defender.map(bk), event: bk(l.event) }; },
    eventLinks: (page, evt) => { const l = eventLinksFor(page, evt); return { figures: l.figures.map((d) => [bk(d), d.review]), battle: bk(l.battle) }; },
    tagTargets: (page, evt) => Object.fromEntries((evt.tags || []).map((tag) => [tag, bk(eventLinksFor(page, evt).tags[tag])])),
    contemporary: (page, evt) => contemporaryMatches(evt, page.civ, catalog.contemporaryPools)
      .map((m) => [m.civKey, m.regimeLabel, rk(m.closest), m.closest?.periodId || m.closest?.eraId || null, Number.isFinite(m.minDiff) ? m.minDiff : null]),
    selectionFigures,
    selectionContextFor: (figure) => figure?.datasetId && pageOf(figure.datasetId) ? selectionContext(pageOf(figure.datasetId)) : selectionContext({ civ: 'none' }),
    // A relation chip opens the record the app's openLink would open.
    taiwanRelationTargets: (page, figure) => figureLinksFor(page, figure).relations.map((d) => findOnPage(page, d) || homeRecord(pageOf(d.homePack), d)),
  };
}

// Serves the built files from memory; failing(url) may return a broken response.
function memoryFetch(files, { failing = () => null, log = [] } = {}) {
  return async (url, init) => {
    log.push([url, init?.cache]);
    const broken = failing(url);
    if (broken === 'network') throw new TypeError('Failed to fetch');
    if (broken) return broken;
    const text = files[url];
    if (text === undefined) return { ok: false, status: 404, json: async () => { throw new SyntaxError('not json'); } };
    return { ok: true, status: 200, json: async () => JSON.parse(text) };
  };
}
const built = createDataPacks();

async function compare(name, source) {
  const { validateFailures, ...collected } = collectBaseline(await storeSource(source));
  for (const [fixture, value] of Object.entries(collected)) {
    const expected = JSON.parse(readFileSync(join(BASELINE_DIR, `${fixture}.json`), 'utf8'));
    assert.deepEqual(JSON.parse(JSON.stringify(toFixture(value))), expected, `${name}: ${fixture}`);
  }
}

const packSource = () => createPackSource({ fetch: memoryFetch(built.files), maxPacks: 99 });

test('pack source, routed one page at a time, reproduces the baseline', () => compare('packs', packSource()));

test('every link descriptor resolves on this page or in its home pack', async () => {
  const source = packSource();
  // Home packs are looked up with peekPage, so every pack is loaded first.
  for (const pageId of PAGE_IDS) await source.loadPage(pageId);
  for (const pageId of PAGE_IDS) {
    const page = source.peekPage(pageId);
    const check = (d) => { if (!d) return; const r = findOnPage(page, d) || homeRecord(source.peekPage(d.homePack), d); assert.ok(r, `${pageId} ${d.key}`); assert.equal(r.id, d.id); };
    for (const f of page.figures) { const l = figureLinksFor(page, f); [...l.relations, ...l.events, ...l.battles].forEach(check); }
    for (const b of page.battles) { const l = battleLinksFor(page, b); [...l.commanders.attacker, ...l.commanders.defender, l.event].forEach(check); }
    for (const e of page.events) { const l = eventLinksFor(page, e); [...l.figures, l.battle, ...Object.values(l.tags)].forEach(check); }
  }
});

test('Taiwan, Japan and China event and battle ids do not collide (initialContext relies on it)', async () => {
  const source = packSource();
  const pages = await Promise.all(PAGE_IDS.map((id) => source.loadPage(id)));
  const ids = (civ, kind) => new Set(pages.filter((p) => p.civ === civ).flatMap((p) => p[kind].map((r) => r.id)));
  for (const kind of ['events', 'battles']) {
    const [china, taiwan, japan] = ['china', 'taiwan', 'japan'].map((civ) => ids(civ, kind));
    const shared = [...taiwan].filter((id) => china.has(id) || japan.has(id)).concat([...japan].filter((id) => china.has(id)));
    assert.deepEqual(shared, [], kind);
  }
});

// --- pack source failures (plan v2 sections 3.5 and 3.6) ---

test('catalog: retries twice bypassing the cache, then reports the error', async () => {
  const log = [];
  const source = createPackSource({ fetch: memoryFetch(built.files, { log, failing: (url) => url === 'data/catalog.json' ? 'network' : null }) });
  await assert.rejects(source.loadCatalog(), { kind: 'network' });
  assert.deepEqual(log, [['data/catalog.json', 'no-cache'], ['data/catalog.json', 'reload'], ['data/catalog.json', 'reload']]);
});

test('catalog: 404, broken JSON and unsupported schemaVersion are told apart', async () => {
  const withCatalog = (text) => ({ ...built.files, 'data/catalog.json': text });
  await assert.rejects(createPackSource({ fetch: memoryFetch({}) }).loadCatalog(), { kind: 'http', status: 404 });
  await assert.rejects(createPackSource({ fetch: memoryFetch(withCatalog('{"schemaVersion":')) }).loadCatalog(), { kind: 'parse' });
  const log = [];
  const future = JSON.stringify({ ...built.catalog, schemaVersion: 2 });
  await assert.rejects(createPackSource({ fetch: memoryFetch(withCatalog(future), { log }) }).loadCatalog(), { kind: 'schema' });
  assert.equal(log.length, 1, 'an unsupported version is not retried');
});

test('pack: 404 after a new deployment reports "updated"; 404 within the same build reports the error', async () => {
  const file = built.catalog.packs.threeKingdoms.file;
  const newer = JSON.stringify({ ...built.catalog, buildId: 'newer' });
  let deployed = false;
  const files = { ...built.files };
  delete files[file];
  const source = createPackSource({ fetch: memoryFetch(files, { failing: (url) => deployed && url === 'data/catalog.json' ? { ok: true, status: 200, json: async () => JSON.parse(newer) } : null }) });
  await source.loadCatalog();
  await assert.rejects(source.loadPage('threeKingdoms'), { kind: 'http', status: 404 });
  deployed = true;
  await assert.rejects(source.loadPage('threeKingdoms'), { kind: 'updated' });
});

test('pack: broken JSON and a pack that does not match its catalog entry are rejected', async () => {
  const file = built.catalog.packs.qinHan.file;
  await assert.rejects(createPackSource({ fetch: memoryFetch({ ...built.files, [file]: '{' }) }).loadPage('qinHan'), { kind: 'parse' });
  const wrong = built.files[built.catalog.packs.weiJin.file];
  await assert.rejects(createPackSource({ fetch: memoryFetch({ ...built.files, [file]: wrong }) }).loadPage('qinHan'), { kind: 'schema' });
  await assert.rejects(createPackSource({ fetch: memoryFetch(built.files) }).loadPage('atlantis'), { kind: 'unknown' });
});

test('pack: concurrent requests share one download; at most maxPacks stay in memory, least recently used first out', async () => {
  const log = [];
  const source = createPackSource({ fetch: memoryFetch(built.files, { log }), maxPacks: 2 });
  const [a, b] = await Promise.all([source.loadPage('qinHan'), source.loadPage('qinHan')]);
  assert.equal(a, b);
  assert.equal(log.filter(([url]) => url.includes('/qinHan.')).length, 1);
  await source.loadPage('weiJin');
  await source.loadPage('qinHan'); // touch: weiJin is now the oldest
  await source.loadPage('suiTang');
  assert.ok(source.peekPage('qinHan') && source.peekPage('suiTang'));
  assert.equal(source.peekPage('weiJin'), null);
});

test('search index: a failed load can be retried', async () => {
  let fail = true;
  const source = createPackSource({ fetch: memoryFetch(built.files, { failing: (url) => fail && url === built.catalog.searchIndex.file ? 'network' : null }) });
  await assert.rejects(source.loadSearchIndex(), { kind: 'network' });
  fail = false;
  const entries = await source.loadSearchIndex();
  assert.ok(entries.length > 1000 && entries[0].item.id);
});

// --- navigation: only the latest request is applied (plan v2 section 3.5) ---

function deferred() { let resolve, reject; const promise = new Promise((a, b) => { resolve = a; reject = b; }); return { promise, resolve, reject }; }

test('navigator: a slow older load arriving after a newer one is dropped', async () => {
  const pending = { a: deferred(), b: deferred() };
  const applied = [];
  const statuses = [];
  const go = createPageNavigator({ peek: () => null, load: (id) => pending[id].promise, onStatus: (s) => statuses.push(s && (s.error ? 'error' : 'loading')) });
  go('a', (p) => applied.push(p));
  go('b', (p) => applied.push(p));
  pending.b.resolve('B');
  await pending.b.promise;
  pending.a.resolve('A');
  await pending.a.promise;
  await new Promise((r) => setImmediate(r));
  assert.deepEqual(applied, ['B']);
  assert.deepEqual(statuses, ['loading', 'loading', null]);
});

test('navigator: a page already in memory applies at once and cancels the pending load', async () => {
  const slow = deferred();
  const applied = [];
  const go = createPageNavigator({ peek: (id) => id === 'here' ? 'HERE' : null, load: () => slow.promise });
  go('far', (p) => applied.push(p));
  go('here', (p) => applied.push(p));
  slow.resolve('FAR');
  await new Promise((r) => setImmediate(r));
  assert.deepEqual(applied, ['HERE']);
});

test('navigator: a failure reports the error with a retry that loads again', async () => {
  let attempts = 0;
  const applied = [];
  let status = null;
  const go = createPageNavigator({ peek: () => null, load: async () => { if (++attempts === 1) throw Object.assign(new Error('x'), { kind: 'network' }); return 'P'; }, onStatus: (s) => { status = s; } });
  go('p', (p) => applied.push(p));
  await new Promise((r) => setImmediate(r));
  assert.equal(status.error.kind, 'network');
  status.retry();
  await new Promise((r) => setImmediate(r));
  assert.deepEqual(applied, ['P']);
  assert.equal(status, null);
});

// Direct data imports that stay: config files and map geography (plan v2 section 3.7; tests/bundle-boundary.test.js
// checks which bundle they land in). Only build scripts (scripts/lib/app_views.mjs) read the data modules themselves.
const KNOWN_DIRECT_DATA_IMPORTS = [
  'src/components/FigureModal.js ../data/factionConfig.js',
  'src/components/FiguresView.js ../data/factionConfig.js',
  'src/components/HistoricalAtlasMap.jsx ../data/threeKingdoms/chinaMapData.js',
  'src/components/JapanAtlasMap.jsx ../data/japan/japanPrefecturesGeoData.js',
  'src/components/TaiwanAtlasMap.jsx ../data/taiwanMapGeoData.js',
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

test('nothing in src/store imports data', () => {
  const dir = join(ROOT, 'src', 'store');
  const importers = readdirSync(dir).filter((f) => /from\s+'\.\.\/data\//.test(readFileSync(join(dir, f), 'utf8')));
  assert.deepEqual(importers, []);
});
