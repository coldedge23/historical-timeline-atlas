import { ERA_CIVS } from '../civilizations/registry.js';

// Explicit caller context always wins over heuristic fallbacks.
export function resolvePeriodId(activePeriodId, figures = []) {
  const alias = ERA_CIVS.find(civ => civ.id === activePeriodId);
  if (activePeriodId) return alias ? alias.pageId : activePeriodId;
  // Later entries are checked first, keeping the original precedence (日本 before 臺灣) for mixed lists.
  const owner = [...ERA_CIVS].reverse().find(civ => figures.some(f => f.id?.startsWith(civ.figureIdPrefix)));
  if (owner) return owner.pageId;
  return 'threeKingdoms';
}
