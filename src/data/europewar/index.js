// 二戰歐洲戰場資料彙整：時期、事件、戰役、人物。事件與戰役的時期一律由開始日期決定（規劃 v4 第三節），
// 不在資料正本手寫 eraId，避免和日期不一致。
import { EUROPEWAR_ERA_DEFS } from './eras.js';
import { EUROPEWAR_EVENTS } from './events.js';
import { EUROPEWAR_BATTLES as RAW_BATTLES } from './battles.js';
import { eraForDate, startOf, dateSortKey } from '../../utils/datedRecords.js';

export * from './rules.js';
export { EUROPEWAR_ERA_DEFS };

export const EUROPEWAR_PAGE_ID = 'europeWarAtlas';
const eraOf = (record) => eraForDate(startOf(record), EUROPEWAR_ERA_DEFS);
const byDate = (a, b) => (a.year - b.year) || dateSortKey(a).localeCompare(dateSortKey(b));

export const EUROPEWAR_ALL_EVENTS = EUROPEWAR_EVENTS.map((event) => {
  const era = eraOf(event);
  return { ...event, eraId: era?.id, eraName: era?.name, period: EUROPEWAR_PAGE_ID, periodName: '二戰歐洲戰場' };
}).sort(byDate);

export const EUROPEWAR_ERAS = EUROPEWAR_ERA_DEFS.map((era) => ({ ...era, keyEvents: EUROPEWAR_ALL_EVENTS.filter((e) => e.eraId === era.id) }));

export const EUROPEWAR_BATTLES = RAW_BATTLES.map((battle) => {
  const era = eraOf(battle);
  return { ...battle, eraId: era?.id, period: EUROPEWAR_PAGE_ID };
}).sort(byDate);

export const EUROPEWAR_ERA_BATTLE_IDS = Object.fromEntries(EUROPEWAR_ERA_DEFS.map((era) => [era.id,
  EUROPEWAR_BATTLES.filter((b) => b.eraId === era.id).map((b) => b.id)]));

// 第一批人物尚未建立（規劃 v4 第 9.4 節）。
export const EUROPEWAR_FIGURES = [];
