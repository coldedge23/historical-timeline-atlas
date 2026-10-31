// Build-only adapter: the page data and link pools exactly as the legacy source assembles them (src/store/legacySource.js).
// Shared by scripts/capture_baseline.mjs and scripts/build_data_packs.mjs.
import { PAGE_IDS, getPage, getCatalog } from '../../src/store/legacySource.js';
export { LINKED_PERIODS, ALL_LINKED_FIGURES } from '../../src/data/linkedHistoryCatalog.js';
export { PERIOD_OPTIONS } from '../../src/data/periodsRegistry.js';
export { TAIWAN_LENS_ERAS, ERA_BATTLE_IDS } from '../../src/data/taiwanLensData.js';
export { JAPAN_ERAS, JAPAN_ERA_BATTLE_IDS, JAPAN_WARLORD_PERIOD_CONFIGS } from '../../src/data/japan/index.js';

// Each page: id, civ, events, figures, battles, plus figuresForLinks/eventsForLinks/battlesForLinks.
export const appPages = () => PAGE_IDS.map(getPage);
// app.js navigation and search datasets (Taiwan/Japan battles carry their eraId).
export const appCatalogs = () => getCatalog().navigationCatalogs;
export const appContemporaryPools = () => getCatalog().contemporaryPools;
export const APP_ERAS = getCatalog().eras;
export const APP_INITIAL_CONTEXT = getCatalog().initialContext;
export const APP_SELECTION_CONTEXT = getCatalog().selectionContext;
