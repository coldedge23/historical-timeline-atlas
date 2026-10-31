// The one place the browser gets history data from (plan v2, stage 2b).
// Two sources with the same async interface: data packs (packSource.js) and, during the transition,
// the stage 2a in-memory catalog (legacySource.js, a separate chunk loaded only through import()).
import { createPackSource } from './packSource.js';
import { pageIdFor, withEraIds } from './pageIds.js';

export { TAIWAN_PAGE, JAPAN_PAGE, pageIdFor } from './pageIds.js';
export { DataLoadError } from './packSource.js';

// Stage 2b-①: the legacy source stays the default; ?data=packs switches to the data packs.
const requested = new URLSearchParams(globalThis.location?.search || '').get('data');
export const DATA_MODE = requested === 'packs' ? 'packs' : 'legacy';

let sourcePromise = null;
let source = null;
function dataSource() {
  sourcePromise ||= (DATA_MODE === 'packs' ? Promise.resolve(createPackSource()) : import('./legacySource.js').then(m => m.createLegacySource()))
    .then(s => (source = s));
  return sourcePromise;
}

export const loadCatalog = async (options) => (await dataSource()).loadCatalog(options);
export const loadPage = async (pageId) => (await dataSource()).loadPage(pageId);
export const loadSearchIndex = async () => (await dataSource()).loadSearchIndex();
// A page that is already in memory, or null.
export const peekPage = (pageId) => source?.peekPage(pageId) || null;

// Link descriptors for a record on the page: precomputed in the pack, or derived by the legacy source.
const NO_FIGURE_LINKS = { relations: [], events: [], battles: [] };
const NO_BATTLE_LINKS = { commanders: { attacker: [], defender: [] }, event: null };
const NO_EVENT_LINKS = { figures: [], battle: null, tags: {} };
export const figureLinksFor = (page, figure) => (page.links ? page.links.figures[figure.id] : page.deriveLinks?.('figure', figure)) || NO_FIGURE_LINKS;
export const battleLinksFor = (page, battle) => (page.links ? page.links.battles[battle.id] : page.deriveLinks?.('battle', battle)) || NO_BATTLE_LINKS;
export const eventLinksFor = (page, evt) => (page.links ? page.links.events[evt.id] : page.deriveLinks?.('event', evt)) || NO_EVENT_LINKS;

const poolOf = (page, type) => type === 'figure' ? page.figures : type === 'event' ? page.events : page.battles;
// Plan v2 section 3.3: a link opens on the current page when the page lists that id, otherwise in its home pack.
export const findOnPage = (page, link) => poolOf(page, link.type).find(r => r.id === link.id) || null;
export const homeRecord = (page, link) => {
  const pool = poolOf(page, link.type);
  return pool.find(r => r.id === link.id && (r.datasetId || page.id) === link.homePack) || pool.find(r => r.id === link.id) || null;
};

// Taiwan/Japan pages as navigation and search see them: battles carry their era.
const navigationPages = new WeakMap();
export function navigationDataset(page) {
  if (page.civ === 'china') return page;
  if (!navigationPages.has(page)) navigationPages.set(page, { ...page, battles: withEraIds(page.battles, page.eraBattleIds || {}) });
  return navigationPages.get(page);
}

// Page loads for navigation: only the latest request is applied; an older load that finishes later is dropped
// (plan v2 section 3.5). A page already in memory applies at once and cancels any load still pending.
// onStatus receives null, { pageId } while loading, or { pageId, error, retry } on failure.
export function createPageNavigator({ peek = peekPage, load = loadPage, onStatus = () => {} } = {}) {
  let seq = 0;
  return function whenLoaded(pageId, apply) {
    const mine = ++seq;
    const ready = peek(pageId);
    if (ready) { onStatus(null); apply(ready); return; }
    onStatus({ pageId });
    load(pageId).then((page) => {
      if (mine !== seq) return;
      onStatus(null);
      apply(page);
    }, (error) => {
      if (mine !== seq) return;
      onStatus({ pageId, error, retry: () => whenLoaded(pageId, apply) });
    });
  };
}

// --- Routing with only the page a route opens in memory (plan v2 section 3.5, two-step navigation) ---

// The page a route opens: its China period (unknown -> yuanMing, as resolveNavigation does) or Taiwan/Japan.
export function routePageId(route, periodIds) {
  if (route.civ !== 'china') return pageIdFor(route.civ);
  return periodIds.includes(route.period) ? route.period : 'yuanMing';
}

const EMPTY_DATASET = { events: [], figures: [], battles: [] };
const knownPeriods = (catalog) => Object.fromEntries(catalog.periodIds.map(id => [id, { id, ...EMPTY_DATASET }]));

// resolveNavigation reads only the dataset the route opens; other periods only need to be known by id.
export function navigationCatalogs(catalog, page) {
  return { ...knownPeriods(catalog), [page.civ === 'china' ? page.id : page.civ]: navigationDataset(page) };
}

// resolveInitialNavigation's context. Taiwan and Japan event and battle ids never collide with each other or with
// China's (checked by tests/history-store.test.js), so the pages that are not open can stay empty.
export function initialContext(catalog, page) {
  const taiwan = page.civ === 'taiwan' ? page : null;
  const japan = page.civ === 'japan' ? page : null;
  return {
    periods: { ...knownPeriods(catalog), ...(page.civ === 'china' ? { [page.id]: page } : {}) },
    taiwanEras: catalog.eras.taiwan.map(era => ({ ...era, keyEvents: taiwan ? taiwan.events.filter(e => e.eraId === era.id) : [] })),
    taiwanEraBattleIds: taiwan?.eraBattleIds || {},
    japanEras: catalog.eras.japan, japanAllEvents: japan?.events || [], japanEraBattleIds: japan?.eraBattleIds || {},
    taiwan: taiwan || EMPTY_DATASET, japan: japan || EMPTY_DATASET,
  };
}

// resolveFigureSelection's context when switching to the figure's own page.
export function selectionContext(page) {
  return {
    periods: page.civ === 'china' ? { [page.id]: page } : {},
    japanEvents: page.civ === 'japan' ? page.events : [],
    taiwanEvents: page.civ === 'taiwan' ? page.events : [],
  };
}
