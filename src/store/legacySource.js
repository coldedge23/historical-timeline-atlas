// Legacy data source (plan v2 stage 2b fallback): the stage 2a in-memory catalog, links derived on demand.
// The browser loads this only through a dynamic import (?data=legacy); build scripts import it directly.
// Stage 4 removes it together with the switch.
import { LINKED_PERIODS, LINKED_TAIWAN_EVENTS, LINKED_JAPAN_EVENTS, LINKED_JAPAN_FIGURES, LINKED_TAIWAN_FIGURES, ALL_LINKED_FIGURES, ALL_LINKED_EVENTS, ALL_LINKED_BATTLES } from '../data/linkedHistoryCatalog.js';
import { PERIOD_OPTIONS } from '../data/periodsRegistry.js';
import { TAIWAN_LENS_ERAS, TAIWAN_RELATED_BATTLES, ERA_BATTLE_IDS } from '../data/taiwanLensData.js';
import { JAPAN_ERAS, JAPAN_BATTLES, JAPAN_ERA_BATTLE_IDS, JAPAN_WARLORD_PERIOD_CONFIGS } from '../data/japan/index.js';
import { figureLinkSet, battleLinkSet, eventLinkSet } from '../utils/linkDerivation.js';
import { battleFigureIndex } from '../utils/relationRules.js';
import { createSearchIndex } from '../utils/search.js';
import { TAIWAN_PAGE, JAPAN_PAGE, eraSummary, withEraIds } from './pageIds.js';

export const CHINA_PAGE_IDS = Object.keys(LINKED_PERIODS);
export const PAGE_IDS = [...CHINA_PAGE_IDS, TAIWAN_PAGE, JAPAN_PAGE];

const pages = new Map();
// A page: what one view shows (a China period, all of Taiwan, all of Japan) plus the pools its links resolve in.
export function getPage(pageId) {
  if (pages.has(pageId)) return pages.get(pageId);
  let page;
  if (pageId === TAIWAN_PAGE) page = { id: pageId, civ: 'taiwan', events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: TAIWAN_RELATED_BATTLES,
    eras: TAIWAN_LENS_ERAS.map(eraSummary), eraBattleIds: ERA_BATTLE_IDS };
  else if (pageId === JAPAN_PAGE) page = { id: pageId, civ: 'japan', events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: JAPAN_BATTLES,
    eras: JAPAN_ERAS.map(eraSummary), eraBattleIds: JAPAN_ERA_BATTLE_IDS, warlordPeriods: JAPAN_WARLORD_PERIOD_CONFIGS };
  else if (LINKED_PERIODS[pageId]) {
    const period = LINKED_PERIODS[pageId];
    page = { ...period, id: pageId, civ: 'china', events: period.events || [], figures: period.figures || [], battles: period.battles || [], warlordPeriods: period.warlordPeriods || [] };
  } else return null;
  page.figuresForLinks = [...page.figures, ...ALL_LINKED_FIGURES.filter(f => !page.figures.some(l => l.id === f.id))];
  page.eventsForLinks = [...page.events, ...ALL_LINKED_EVENTS.filter(e => !page.events.some(l => l.id === e.id))];
  page.battlesForLinks = [...page.battles, ...ALL_LINKED_BATTLES.filter(b => !page.battles.some(l => l.id === b.id))];
  page.deriveLinks = linkDeriver(page);
  pages.set(pageId, page);
  return page;
}

// Links are derived per record on first use, with the same pure functions the build uses.
function linkDeriver(page) {
  const caches = { figure: new WeakMap(), battle: new WeakMap(), event: new WeakMap() };
  let figMap = null;
  const derive = { figure: r => figureLinkSet(r, page), battle: r => battleLinkSet(r, page, figMap ||= battleFigureIndex(page.figuresForLinks)), event: r => eventLinkSet(r, page) };
  return (kind, record) => {
    const cache = caches[kind];
    if (!cache.has(record)) cache.set(record, derive[kind](record));
    return cache.get(record);
  };
}

function buildCatalog() {
  const allChinaEvents = [];
  for (const [periodId, p] of Object.entries(LINKED_PERIODS)) for (const evt of p.events || []) allChinaEvents.push({ ...evt, periodId, periodName: p.name });
  allChinaEvents.sort((a, b) => a.year - b.year);
  const navigationCatalogs = { ...LINKED_PERIODS,
    taiwan: { id: TAIWAN_PAGE, civ: 'taiwan', name: '臺灣歷史', events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: withEraIds(TAIWAN_RELATED_BATTLES, ERA_BATTLE_IDS) },
    japan: { id: JAPAN_PAGE, civ: 'japan', name: '日本歷史', events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: withEraIds(JAPAN_BATTLES, JAPAN_ERA_BATTLE_IDS) },
  };
  return {
    periodOptions: PERIOD_OPTIONS,
    periodIds: CHINA_PAGE_IDS,
    eras: { taiwan: TAIWAN_LENS_ERAS.map(eraSummary), japan: JAPAN_ERAS.map(eraSummary) },
    eraBattleIds: { taiwan: ERA_BATTLE_IDS, japan: JAPAN_ERA_BATTLE_IDS },
    // Same order and copies as the timeline's cross-civilization pools.
    contemporaryPools: { china: allChinaEvents, taiwan: LINKED_TAIWAN_EVENTS, japan: LINKED_JAPAN_EVENTS },
    navigationCatalogs,
    searchDatasets: Object.values(navigationCatalogs),
    initialContext: { periods: LINKED_PERIODS, eraCivs: {
      taiwan: { eras: TAIWAN_LENS_ERAS, eraBattleIds: ERA_BATTLE_IDS, events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: TAIWAN_RELATED_BATTLES },
      japan: { eras: JAPAN_ERAS, eraBattleIds: JAPAN_ERA_BATTLE_IDS, events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: JAPAN_BATTLES } } },
    selectionContext: { periods: LINKED_PERIODS, eventsByCiv: { japan: LINKED_JAPAN_EVENTS, taiwan: LINKED_TAIWAN_EVENTS } },
    // The pool a figure leaving its page is looked up in (ALL_LINKED_FIGURES).
    allFigures: ALL_LINKED_FIGURES,
  };
}
let catalog = null;
export function getCatalog() { return catalog ||= buildCatalog(); }

// The browser-facing source: the same async interface as packSource.js, resolved from memory.
export function createLegacySource() {
  const view = () => { const c = getCatalog(); return { schemaVersion: 1, buildId: 'legacy', periodOptions: c.periodOptions, periodIds: c.periodIds, eras: c.eras, contemporaryPools: c.contemporaryPools }; };
  return {
    mode: 'legacy',
    loadCatalog: async () => view(),
    peekPage: getPage,
    loadPage: async (pageId) => { const page = getPage(pageId); if (!page) throw new Error(`unknown page ${pageId}`); return page; },
    loadSearchIndex: async () => createSearchIndex(getCatalog().searchDatasets),
  };
}
