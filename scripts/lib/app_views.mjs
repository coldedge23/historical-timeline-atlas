// Build-only adapter: the page data and link pools exactly as App assembles them in the browser.
// Shared by scripts/capture_baseline.mjs and scripts/build_data_packs.mjs.
import { LINKED_PERIODS, LINKED_TAIWAN_EVENTS, LINKED_JAPAN_EVENTS, LINKED_JAPAN_FIGURES, LINKED_TAIWAN_FIGURES, ALL_LINKED_FIGURES, ALL_LINKED_EVENTS, ALL_LINKED_BATTLES } from '../../src/data/linkedHistoryCatalog.js';
import { PERIOD_OPTIONS } from '../../src/data/periodsRegistry.js';
import { TAIWAN_LENS_ERAS, TAIWAN_RELATED_BATTLES, ERA_BATTLE_IDS } from '../../src/data/taiwanLensData.js';
import { JAPAN_ERAS, JAPAN_BATTLES, JAPAN_ALL_EVENTS, JAPAN_ERA_BATTLE_IDS, JAPAN_WARLORD_PERIOD_CONFIGS } from '../../src/data/japan/index.js';

export { LINKED_PERIODS, LINKED_TAIWAN_EVENTS, LINKED_JAPAN_EVENTS, LINKED_JAPAN_FIGURES, LINKED_TAIWAN_FIGURES, ALL_LINKED_FIGURES, ALL_LINKED_EVENTS, ALL_LINKED_BATTLES,
  PERIOD_OPTIONS, TAIWAN_LENS_ERAS, TAIWAN_RELATED_BATTLES, ERA_BATTLE_IDS, JAPAN_ERAS, JAPAN_BATTLES, JAPAN_ALL_EVENTS, JAPAN_ERA_BATTLE_IDS, JAPAN_WARLORD_PERIOD_CONFIGS };

// app.js currentEvents/currentFigures/currentBattles per page, plus figuresForLinks/eventsForLinks and the modal battle pool.
export function appPages() {
  const list = Object.entries(LINKED_PERIODS).map(([id, p]) => ({ id, civ: 'china', events: p.events || [], figures: p.figures || [], battles: p.battles || [] }));
  list.push({ id: 'taiwanLens', civ: 'taiwan', events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: TAIWAN_RELATED_BATTLES });
  list.push({ id: 'japanAtlas', civ: 'japan', events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: JAPAN_BATTLES });
  for (const page of list) {
    page.figuresForLinks = [...page.figures, ...ALL_LINKED_FIGURES.filter(f => !page.figures.some(l => l.id === f.id))];
    page.eventsForLinks = [...page.events, ...ALL_LINKED_EVENTS.filter(e => !page.events.some(l => l.id === e.id))];
    page.battlesForLinks = [...page.battles, ...ALL_LINKED_BATTLES.filter(b => !page.battles.some(l => l.id === b.id))];
  }
  return list;
}

// app.js `catalogs`: navigation and search datasets (Taiwan/Japan battles carry their eraId).
export function appCatalogs() {
  return { ...LINKED_PERIODS,
    taiwan: { id: 'taiwanLens', civ: 'taiwan', name: '臺灣歷史', events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: TAIWAN_RELATED_BATTLES.map(b => ({ ...b, eraId: Object.entries(ERA_BATTLE_IDS).find(([, ids]) => ids.includes(b.id))?.[0] })) },
    japan: { id: 'japanAtlas', civ: 'japan', name: '日本歷史', events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: JAPAN_BATTLES.map(b => ({ ...b, eraId: Object.entries(JAPAN_ERA_BATTLE_IDS).find(([, ids]) => ids.includes(b.id))?.[0] })) },
  };
}

export const APP_ERAS = { taiwan: TAIWAN_LENS_ERAS, japan: JAPAN_ERAS };

export const APP_INITIAL_CONTEXT = { periods: LINKED_PERIODS,
  taiwanEras: TAIWAN_LENS_ERAS, taiwanEraBattleIds: ERA_BATTLE_IDS,
  japanEras: JAPAN_ERAS, japanAllEvents: JAPAN_ALL_EVENTS, japanEraBattleIds: JAPAN_ERA_BATTLE_IDS,
  taiwan: { events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: TAIWAN_RELATED_BATTLES },
  japan: { events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: JAPAN_BATTLES } };

export const APP_SELECTION_CONTEXT = { periods: LINKED_PERIODS, japanEvents: LINKED_JAPAN_EVENTS, taiwanEvents: LINKED_TAIWAN_EVENTS };

// app.js crossCivPools: China events from every period (sorted by year), Taiwan and Japan events as listed.
export function appContemporaryPools() {
  const allChinaEvents = [];
  for (const [periodId, p] of Object.entries(LINKED_PERIODS)) for (const evt of p.events || []) allChinaEvents.push({ ...evt, periodId, periodName: p.name });
  allChinaEvents.sort((a, b) => a.year - b.year);
  return { china: allChinaEvents, taiwan: LINKED_TAIWAN_EVENTS, japan: LINKED_JAPAN_EVENTS };
}
