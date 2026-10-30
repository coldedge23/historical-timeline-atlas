// Explicit caller context always wins over heuristic fallbacks.
export function resolvePeriodId(activePeriodId, figures = []) {
  const aliases = { japan: 'japanAtlas', taiwan: 'taiwanLens' };
  if (activePeriodId) return aliases[activePeriodId] || activePeriodId;
  if (figures.some(f => f.id?.startsWith('fig_jp_'))) return 'japanAtlas';
  if (figures.some(f => f.id?.startsWith('fig_tw_'))) return 'taiwanLens';
  return 'threeKingdoms';
}
