// The one place the browser gets history data from (plan v2, stage 2a).
// Stage 2a: backed by linkedHistoryCatalog.js in memory, links derived on demand with the same
// pure functions the build uses. Stage 2b swaps the backing for catalog.json + data packs.
import { LINKED_PERIODS, LINKED_TAIWAN_EVENTS, LINKED_JAPAN_EVENTS, LINKED_JAPAN_FIGURES, LINKED_TAIWAN_FIGURES, ALL_LINKED_FIGURES, ALL_LINKED_EVENTS, ALL_LINKED_BATTLES } from '../data/linkedHistoryCatalog.js';
import { PERIOD_OPTIONS } from '../data/periodsRegistry.js';
import { TAIWAN_LENS_ERAS, TAIWAN_RELATED_BATTLES, ERA_BATTLE_IDS } from '../data/taiwanLensData.js';
import { JAPAN_ERAS, JAPAN_BATTLES, JAPAN_ALL_EVENTS, JAPAN_ERA_BATTLE_IDS } from '../data/japan/index.js';
import { figureLinkSet, battleLinkSet, eventLinkSet } from '../utils/linkDerivation.js';
import { battleFigureIndex } from '../utils/relationRules.js';

export const TAIWAN_PAGE = 'taiwanLens';
export const JAPAN_PAGE = 'japanAtlas';
export const CHINA_PAGE_IDS = Object.keys(LINKED_PERIODS);
export const PAGE_IDS = [...CHINA_PAGE_IDS, TAIWAN_PAGE, JAPAN_PAGE];

export const hasPeriod = (periodId) => !!LINKED_PERIODS[periodId];
export const pageIdFor = (civ, periodId) => civ === 'japan' ? JAPAN_PAGE : civ === 'taiwan' ? TAIWAN_PAGE : periodId;

// Era descriptions as data packs carry them: no keyEvents, firstEventId instead.
const eraSummary = ({ keyEvents, ...era }) => ({ ...era, firstEventId: keyEvents?.[0]?.id ?? null });

const pages = new Map();
// A page: what one view shows (a China period, all of Taiwan, all of Japan) plus the pools its links resolve in.
export function getPage(pageId) {
  if (pages.has(pageId)) return pages.get(pageId);
  let page;
  if (pageId === TAIWAN_PAGE) page = { id: pageId, civ: 'taiwan', events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: TAIWAN_RELATED_BATTLES };
  else if (pageId === JAPAN_PAGE) page = { id: pageId, civ: 'japan', events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: JAPAN_BATTLES };
  else if (LINKED_PERIODS[pageId]) {
    const period = LINKED_PERIODS[pageId];
    page = { ...period, id: pageId, civ: 'china', events: period.events || [], figures: period.figures || [], battles: period.battles || [], warlordPeriods: period.warlordPeriods || [] };
  } else return null;
  page.figuresForLinks = [...page.figures, ...ALL_LINKED_FIGURES.filter(f => !page.figures.some(l => l.id === f.id))];
  page.eventsForLinks = [...page.events, ...ALL_LINKED_EVENTS.filter(e => !page.events.some(l => l.id === e.id))];
  page.battlesForLinks = [...page.battles, ...ALL_LINKED_BATTLES.filter(b => !page.battles.some(l => l.id === b.id))];
  pages.set(pageId, page);
  return page;
}

const withEraIds = (battles, eraBattleIds) => battles.map(b => ({ ...b, eraId: Object.entries(eraBattleIds).find(([, ids]) => ids.includes(b.id))?.[0] }));

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
    eras: { taiwan: TAIWAN_LENS_ERAS.map(eraSummary), japan: JAPAN_ERAS.map(eraSummary) },
    eraBattleIds: { taiwan: ERA_BATTLE_IDS, japan: JAPAN_ERA_BATTLE_IDS },
    // Same order and copies as the timeline's cross-civilization pools.
    contemporaryPools: { china: allChinaEvents, taiwan: LINKED_TAIWAN_EVENTS, japan: LINKED_JAPAN_EVENTS },
    navigationCatalogs,
    searchDatasets: Object.values(navigationCatalogs),
    initialContext: { periods: LINKED_PERIODS,
      taiwanEras: TAIWAN_LENS_ERAS, taiwanEraBattleIds: ERA_BATTLE_IDS,
      japanEras: JAPAN_ERAS, japanAllEvents: JAPAN_ALL_EVENTS, japanEraBattleIds: JAPAN_ERA_BATTLE_IDS,
      taiwan: { events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: TAIWAN_RELATED_BATTLES },
      japan: { events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: JAPAN_BATTLES } },
    selectionContext: { periods: LINKED_PERIODS, japanEvents: LINKED_JAPAN_EVENTS, taiwanEvents: LINKED_TAIWAN_EVENTS },
    // The pool a figure leaving its page is looked up in (ALL_LINKED_FIGURES).
    allFigures: ALL_LINKED_FIGURES,
  };
}
let catalog = null;
export function getCatalog() { return catalog ||= buildCatalog(); }

// Links are cached per page and per record object; a record not on the page is derived in the page's pools,
// exactly as the modals did before (e.g. a battle opened from a figure modal on another page).
const linkCache = new Map();
function cached(pageId, kind, record, derive) {
  const key = `${pageId}|${kind}`;
  if (!linkCache.has(key)) linkCache.set(key, new WeakMap());
  const cache = linkCache.get(key);
  if (!cache.has(record)) cache.set(record, derive(getPage(pageId)));
  return cache.get(record);
}
const figMaps = new Map();
const figMapFor = (page) => { if (!figMaps.has(page.id)) figMaps.set(page.id, battleFigureIndex(page.figuresForLinks)); return figMaps.get(page.id); };

export const figureLinksFor = (pageId, figure) => cached(pageId, 'figure', figure, page => figureLinkSet(figure, page));
export const battleLinksFor = (pageId, battle) => cached(pageId, 'battle', battle, page => battleLinkSet(battle, page, figMapFor(page)));
export const eventLinksFor = (pageId, evt) => cached(pageId, 'event', evt, page => eventLinkSet(evt, page));

// The full record behind a link descriptor: the same object the page's pool holds.
export function resolveLink(pageId, link) {
  if (!link) return null;
  const page = getPage(pageId);
  const pool = link.type === 'figure' ? page.figuresForLinks : link.type === 'event' ? page.eventsForLinks : page.battlesForLinks;
  return pool.find(r => r.id === link.id && (r.datasetId || page.id) === link.homePack) || null;
}
