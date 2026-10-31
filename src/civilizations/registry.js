// Civilization registry (plan v2 section 3.7). The app, navigation and the build use civilizations only
// through this list and the configs it holds; adding one means a new folder, its data and map, and an entry here.
// Configs must stay small: no history data, and maps only through dynamic import().
import china from './china/config.js';
import taiwan from './taiwan/config.js';
import japan from './japan/config.js';

// Order is the order of the civilization selector and of the contemporary sync rows.
export const CIVILIZATIONS = [china, taiwan, japan];
export const DEFAULT_CIV = china;
export const CIV_IDS = CIVILIZATIONS.map(civ => civ.id);

const byId = new Map(CIVILIZATIONS.map(civ => [civ.id, civ]));
export const civById = (id) => byId.get(id) || null;
export const isCivId = (id) => byId.has(id);

// Civilizations navigated by era inside a single pack (as opposed to one pack per period).
export const ERA_CIVS = CIVILIZATIONS.filter(civ => civ.unit === 'era');

// The page (data pack) a civilization shows: its period for per-period civilizations, else its only pack.
export const pageIdFor = (civId, periodId) => {
  const civ = civById(civId) || DEFAULT_CIV;
  return civ.unit === 'period' ? civ.pageIdFor(periodId) : civ.pageId;
};

// The civilization a page belongs to; any page that is not a whole-civilization pack is a period of the default one.
export const civForPage = (pageId) => ERA_CIVS.find(civ => civ.pageId === pageId) || DEFAULT_CIV;
