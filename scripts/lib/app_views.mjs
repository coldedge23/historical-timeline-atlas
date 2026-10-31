// Build-only adapter: the page data and link pools as the app sees them, assembled from the data sources in src/data.
// Shared by scripts/capture_baseline.mjs and scripts/build_data_packs.mjs. The browser never loads this; it reads
// the data packs built from it (src/store/packSource.js).
import { LINKED_PERIODS, LINKED_TAIWAN_EVENTS, LINKED_JAPAN_EVENTS, LINKED_JAPAN_FIGURES, LINKED_TAIWAN_FIGURES, ALL_LINKED_FIGURES, ALL_LINKED_EVENTS, ALL_LINKED_BATTLES } from '../../src/data/linkedHistoryCatalog.js';
import { PERIOD_OPTIONS } from '../../src/data/periodsRegistry.js';
import { TAIWAN_LENS_ERAS, TAIWAN_RELATED_BATTLES, ERA_BATTLE_IDS } from '../../src/data/taiwanLensData.js';
import { JAPAN_ERAS, JAPAN_BATTLES, JAPAN_ERA_BATTLE_IDS, JAPAN_WARLORD_PERIOD_CONFIGS } from '../../src/data/japan/index.js';
import { eraSummary, withEraIds } from '../../src/store/pageIds.js';
import { civById } from '../../src/civilizations/registry.js';

export { LINKED_PERIODS, ALL_LINKED_FIGURES, PERIOD_OPTIONS, TAIWAN_LENS_ERAS, ERA_BATTLE_IDS, JAPAN_ERAS, JAPAN_ERA_BATTLE_IDS, JAPAN_WARLORD_PERIOD_CONFIGS };

// Each civilization's data is wired in by hand here; a new civilization adds its own branch.
const TAIWAN_PAGE = civById('taiwan').pageId;
const JAPAN_PAGE = civById('japan').pageId;

const CHINA_PAGE_IDS = Object.keys(LINKED_PERIODS);
export const PAGE_IDS = [...CHINA_PAGE_IDS, TAIWAN_PAGE, JAPAN_PAGE];

// A page: what one view shows (a China period, all of Taiwan, all of Japan) plus the pools its links resolve in.
function buildPage(pageId) {
  let page;
  if (pageId === TAIWAN_PAGE) page = { id: pageId, civ: 'taiwan', events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: TAIWAN_RELATED_BATTLES,
    eras: TAIWAN_LENS_ERAS.map(eraSummary), eraBattleIds: ERA_BATTLE_IDS };
  else if (pageId === JAPAN_PAGE) page = { id: pageId, civ: 'japan', events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: JAPAN_BATTLES,
    eras: JAPAN_ERAS.map(eraSummary), eraBattleIds: JAPAN_ERA_BATTLE_IDS, warlordPeriods: JAPAN_WARLORD_PERIOD_CONFIGS };
  else {
    const period = LINKED_PERIODS[pageId];
    page = { ...period, id: pageId, civ: 'china', events: period.events || [], figures: period.figures || [], battles: period.battles || [], warlordPeriods: period.warlordPeriods || [] };
  }
  page.figuresForLinks = [...page.figures, ...ALL_LINKED_FIGURES.filter(f => !page.figures.some(l => l.id === f.id))];
  page.eventsForLinks = [...page.events, ...ALL_LINKED_EVENTS.filter(e => !page.events.some(l => l.id === e.id))];
  page.battlesForLinks = [...page.battles, ...ALL_LINKED_BATTLES.filter(b => !page.battles.some(l => l.id === b.id))];
  return page;
}
let pages = null;

const allChinaEvents = [];
for (const [periodId, p] of Object.entries(LINKED_PERIODS)) for (const evt of p.events || []) allChinaEvents.push({ ...evt, periodId, periodName: p.name });
allChinaEvents.sort((a, b) => a.year - b.year);

const navigationCatalogs = { ...LINKED_PERIODS,
  taiwan: { id: TAIWAN_PAGE, civ: 'taiwan', name: '臺灣歷史', events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: withEraIds(TAIWAN_RELATED_BATTLES, ERA_BATTLE_IDS) },
  japan: { id: JAPAN_PAGE, civ: 'japan', name: '日本歷史', events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: withEraIds(JAPAN_BATTLES, JAPAN_ERA_BATTLE_IDS) },
};
// Same order and copies as the timeline's cross-civilization pools.
const contemporaryPools = { china: allChinaEvents, taiwan: LINKED_TAIWAN_EVENTS, japan: LINKED_JAPAN_EVENTS };

// Each page: id, civ, events, figures, battles, plus figuresForLinks/eventsForLinks/battlesForLinks.
export const appPages = () => (pages ||= PAGE_IDS.map(buildPage));
// app.js navigation and search datasets (Taiwan/Japan battles carry their eraId).
export const appCatalogs = () => navigationCatalogs;
export const appContemporaryPools = () => contemporaryPools;
export const APP_ERAS = { taiwan: TAIWAN_LENS_ERAS.map(eraSummary), japan: JAPAN_ERAS.map(eraSummary) };
export const APP_INITIAL_CONTEXT = { periods: LINKED_PERIODS, eraCivs: {
  taiwan: { eras: TAIWAN_LENS_ERAS, eraBattleIds: ERA_BATTLE_IDS, events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: TAIWAN_RELATED_BATTLES },
  japan: { eras: JAPAN_ERAS, eraBattleIds: JAPAN_ERA_BATTLE_IDS, events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: JAPAN_BATTLES } } };
export const APP_SELECTION_CONTEXT = { periods: LINKED_PERIODS, eventsByCiv: { japan: LINKED_JAPAN_EVENTS, taiwan: LINKED_TAIWAN_EVENTS } };
