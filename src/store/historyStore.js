// The one place the browser gets history data from (plan v2, stage 2b): the data packs built into dist/data
// (packSource.js). Stage 4 removed the ?data=legacy fallback; the parameter is now ignored.
import { createPackSource } from './packSource.js';
import { pageIdFor, withEraIds } from './pageIds.js';
import { DEFAULT_CIV, ERA_CIVS, civById } from '../civilizations/registry.js';

export { pageIdFor } from './pageIds.js';
export { DataLoadError } from './packSource.js';

let source = null;
const dataSource = () => (source ||= createPackSource());

export const loadCatalog = (options) => dataSource().loadCatalog(options);
export const loadPage = (pageId) => dataSource().loadPage(pageId);
export const loadSearchIndex = () => dataSource().loadSearchIndex();
// A page that is already in memory, or null.
export const peekPage = (pageId) => source?.peekPage(pageId) || null;

// Link descriptors for a record on the page, precomputed in its pack.
const NO_FIGURE_LINKS = { relations: [], events: [], battles: [] };
const NO_BATTLE_LINKS = { commanders: { attacker: [], defender: [] }, event: null };
const NO_EVENT_LINKS = { figures: [], battle: null, tags: {} };
export const figureLinksFor = (page, figure) => page.links?.figures[figure.id] || NO_FIGURE_LINKS;
export const battleLinksFor = (page, battle) => page.links?.battles[battle.id] || NO_BATTLE_LINKS;
export const eventLinksFor = (page, evt) => page.links?.events[evt.id] || NO_EVENT_LINKS;

const poolOf = (page, type) => type === 'figure' ? page.figures : type === 'event' ? page.events : page.battles;
// Plan v2 section 3.3: a link opens on the current page when the page lists that id, otherwise in its home pack.
export const findOnPage = (page, link) => poolOf(page, link.type).find(r => r.id === link.id) || null;
export const homeRecord = (page, link) => {
  const pool = poolOf(page, link.type);
  return pool.find(r => r.id === link.id && (r.datasetId || page.id) === link.homePack) || pool.find(r => r.id === link.id) || null;
};

const byEra = (page) => civById(page.civ)?.unit === 'era';

// Taiwan/Japan pages as navigation and search see them: battles carry their era.
const navigationPages = new WeakMap();
export function navigationDataset(page) {
  if (!byEra(page)) return page;
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
  if (civById(route.civ).unit === 'era') return pageIdFor(route.civ);
  return periodIds.includes(route.period) ? route.period : DEFAULT_CIV.defaultPeriodId;
}

const EMPTY_DATASET = { events: [], figures: [], battles: [] };
const knownPeriods = (catalog) => Object.fromEntries(catalog.periodIds.map(id => [id, { id, ...EMPTY_DATASET }]));

// resolveNavigation reads only the dataset the route opens; other periods only need to be known by id.
export function navigationCatalogs(catalog, page) {
  return { ...knownPeriods(catalog), [byEra(page) ? page.civ : page.id]: navigationDataset(page) };
}

// resolveInitialNavigation's context. Taiwan and Japan event and battle ids never collide with each other or with
// China's (checked by tests/history-store.test.js), so the pages that are not open can stay empty.
export function initialContext(catalog, page) {
  const eraCivs = Object.fromEntries(ERA_CIVS.map((civ) => {
    const open = page.civ === civ.id ? page : null;
    return [civ.id, { ...(open || EMPTY_DATASET), eras: catalog.eras[civ.id] || [], eraBattleIds: open?.eraBattleIds || {} }];
  }));
  return { periods: { ...knownPeriods(catalog), ...(byEra(page) ? {} : { [page.id]: page }) }, eraCivs };
}

// resolveFigureSelection's context when switching to the figure's own page.
export function selectionContext(page) {
  return {
    periods: civById(page.civ)?.unit === 'period' ? { [page.id]: page } : {},
    eventsByCiv: Object.fromEntries(ERA_CIVS.map(civ => [civ.id, page.civ === civ.id ? page.events : []])),
  };
}
