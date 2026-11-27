// Page ids and small pure helpers shared by the pack source and the build. No data imports.
export { pageIdFor } from '../civilizations/registry.js';

// Era descriptions as data packs carry them: no keyEvents, firstEventId instead.
export const eraSummary = ({ keyEvents, ...era }) => ({ ...era, firstEventId: keyEvents?.[0]?.id ?? null });

// Taiwan/Japan battles as navigation and search see them: each carries the era it is listed under.
export const withEraIds = (battles, eraBattleIds) => battles.map(b => ({ ...b, eraId: Object.entries(eraBattleIds).find(([, ids]) => ids.includes(b.id))?.[0] }));

// The era to switch to when a battle is picked on an era-based page, or null to stay: a battle listed under the
// era already shown (also one under way in it, as on the WWII Europe map) leaves the timeline where it is; any
// other battle opens in the first era listing it, which is its start era.
export const eraToOpenBattle = (eraBattleIds, battleId, activeEraId) => {
  if ((eraBattleIds?.[activeEraId] || []).includes(battleId)) return null;
  return Object.entries(eraBattleIds || {}).find(([, ids]) => ids.includes(battleId))?.[0] || null;
};
