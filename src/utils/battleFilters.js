// Battle list filters (plan docs/20261107_二戰歐洲戰場模組規劃_v6.md, section 4.7). Pure helpers, no history data.
// Phases come from the page's pack (battlePhases, built from src/data/battlePhases.js); theater labels from its
// battleTaxonomy (only packs whose battles carry theaters have one).

// Whether a battle belongs to a phase: { eraId } by its era, { min, max } by its year, anything else matches all.
export const battleInPhase = (battle, phase) => phase.eraId ? battle.eraId === phase.eraId
  : typeof phase.min === 'number' ? battle.year >= phase.min && battle.year <= phase.max : true;

// Theater filter options: the taxonomy's theaters that at least one battle uses, in taxonomy order, with counts.
export function theaterOptions(battles, theaters = {}) {
  return Object.entries(theaters).map(([id, label]) => ({ id, label, count: battles.filter((b) => (b.theaters || []).includes(id)).length }))
    .filter((option) => option.count > 0);
}

export const battleInTheater = (battle, theaterId) => theaterId === 'all' || (battle.theaters || []).includes(theaterId);
