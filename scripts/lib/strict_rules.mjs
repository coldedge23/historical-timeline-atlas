// Rules only the WWII Europe module follows (plan docs/20261108_二戰歐洲戰場模組規劃_v8.md, sections 4 and 9.5):
// dates, structured source claims, battle classification, participants and related battles.
// Pure: returns [{ rule, detail }] for one record. Used by scripts/validate_history_data.mjs and tests.
import { dateProblems } from '../../src/utils/datedRecords.js';

const fieldValue = (record, path) => path.split('.').reduce((v, key) => v?.[key], record);
// A value counts as filled unless it is empty or still 待考; filled values need a source whose claims list the field.
export const isFilled = (value) => Array.isArray(value) ? value.length > 0
  : typeof value === 'string' ? !!value.trim() && !/^待考/.test(value.trim()) : value != null;

// strict: { eras, claimFields, theaters, scales, modes }; battles: every battle of the record's dataset.
export function strictProblems(strict, kind, record, battles = []) {
  const out = [];
  const add = (rule, detail) => out.push({ rule, detail });
  // Figures have no record dates; their birth and death dates are checked as claims (plan v6, section 9.5).
  if (kind !== 'figures') for (const problem of dateProblems(record, { eras: strict.eras, requireStart: true })) add('invalid-date', problem);
  const fields = strict.claimFields[kind] || [];
  const claimed = new Set((record.sources || []).flatMap((source) => Array.isArray(source?.claims) ? source.claims : []));
  for (const path of claimed) if (!fields.includes(path)) add('unknown-claim-field', `claims 列了不受檢查的欄位：${path}`);
  for (const path of fields) if (isFilled(fieldValue(record, path)) && !claimed.has(path)) add('unsupported-claim', `${path} 已填值，但沒有來源的 claims 涵蓋它`);
  if (kind !== 'battles') return out;
  if (!strict.scales[record.scale]) add('invalid-battle-scale', `scale 不在分類表內：${record.scale}`);
  for (const [field, table] of [['modes', strict.modes], ['theaters', strict.theaters]]) {
    const values = record[field];
    if (!Array.isArray(values) || !values.length) add(`invalid-battle-${field}`, `${field} 必須是非空陣列`);
    else for (const value of values) if (!table[value]) add(`invalid-battle-${field}`, `${field} 不在分類表內：${value}`);
  }
  for (const p of record.participants || []) {
    if (!['attacker', 'defender'].includes(p?.side) || !p?.name) add('invalid-participant', `參與方必須有名稱，side 只能是 attacker 或 defender：${JSON.stringify(p)}`);
  }
  const related = record.relatedBattleIds || [];
  const byId = new Map(battles.map((b) => [b.id, b]));
  if (new Set(related).size !== related.length) add('related-battle', 'relatedBattleIds 有重複');
  for (const id of related) {
    if (id === record.id) add('related-battle', 'relatedBattleIds 連到自己');
    else if (!byId.has(id)) add('related-battle', `相關戰役不在同一資料包：${id}`);
    else if (!(byId.get(id).relatedBattleIds || []).includes(record.id)) add('related-battle', `相關戰役沒有反向連結：${id}`);
  }
  return out;
}

// Whether [lng, lat] lies inside the map bounds { minLng, maxLng, minLat, maxLat }.
export const insideBounds = ([lng, lat], b) => lng >= b.minLng && lng <= b.maxLng && lat >= b.minLat && lat <= b.maxLat;
