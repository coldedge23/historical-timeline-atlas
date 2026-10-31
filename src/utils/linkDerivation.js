// Link descriptors (plan v2, section 3.2): built by scripts/build_data_packs.mjs and, until stage 2b,
// computed in the browser by src/store/historyStore.js. Pure: inputs are records and link pools, no data imports.
import { linkedEvents, figureRelations } from './figureLinks.js';
import { figureBattleLinks, battleAttacker, battleDefender, battleFigureIndex, resolveCommander, battleLinkedEvent, battleLinkedEventBasis, eventFigures } from './relationRules.js';

// Bases that come from text matching or reverse lookup rather than an explicit id in the record.
export const DERIVED_BASES = new Set(['commander-name', 'summary-text', 'reverse-relation', 'inferred-relation', 'inferred-reverse-relation']);

export const entityKey = (dataset, type, id) => `${dataset}:${type}:${id}`;

// Smallest card a modal needs to draw a chip without loading the target pack.
// eraId lets a click switch a Taiwan/Japan era before the target pack is loaded (resolveFigureSelection).
export function describe(type, record, fallbackDataset, basis, review = null) {
  const dataset = record.datasetId || fallbackDataset;
  const card = type === 'figure' ? { name: record.name, courtesyName: record.courtesyName ?? null, avatar: record.avatar ?? null, faction: record.faction ?? null, eraId: record.eraId ?? null }
    : type === 'event' ? { title: record.title, year: record.year ?? null }
    : { name: record.name, year: record.year ?? null };
  return { key: entityKey(dataset, type, record.id), homePack: dataset, type, id: record.id, ...card, derived: DERIVED_BASES.has(basis), basis, review };
}

// pools: { id, figuresForLinks, eventsForLinks, battlesForLinks } of the page the modal is opened on.
export function figureLinkSet(figure, pools) {
  return {
    relations: figureRelations(figure, pools.figuresForLinks).map(r => ({ ...describe('figure', r.targetFigure, pools.id, r.basis), relationType: r.relationType, label: r.label })),
    events: linkedEvents(figure, pools.eventsForLinks).map(e => describe('event', e, pools.id, 'participated-event-id', figure.eventLinkReviews?.[e.id] ?? null)),
    battles: figureBattleLinks(figure, pools.battlesForLinks).map(({ battle, basis }) => describe('battle', battle, pools.id, basis)),
  };
}

export function battleLinkSet(battle, pools, figMap = battleFigureIndex(pools.figuresForLinks)) {
  // One entry per drawn commander chip, in the order BattleModal draws them; null means plain text.
  const commanders = side => (Array.isArray(side.commanders) ? side.commanders : []).filter(Boolean).map(cmd => {
    const c = resolveCommander(cmd, figMap);
    return c.fig ? describe('figure', c.fig, pools.id, c.basis) : null;
  });
  const event = battleLinkedEvent(battle, pools.eventsForLinks);
  return {
    commanders: { attacker: commanders(battleAttacker(battle)), defender: commanders(battleDefender(battle)) },
    event: event ? describe('event', event, pools.id, battleLinkedEventBasis(battle)) : null,
  };
}

// pools.battles: the page's own battles (the timeline only links a battle shown on the page).
export function eventLinkSet(evt, pools) {
  const battle = evt.battleId ? pools.battles.find(b => b.id === evt.battleId) : null;
  return {
    figures: eventFigures(evt, pools.figuresForLinks).map(f => describe('figure', f, pools.id, 'event-figure-id', evt.figureLinkReviews?.[f.id] ?? null)),
    battle: battle ? describe('battle', battle, pools.id, 'event-battle-id') : null,
  };
}

export function pageLinks(page) {
  const figMap = battleFigureIndex(page.figuresForLinks);
  return {
    figures: Object.fromEntries(page.figures.map(f => [f.id, figureLinkSet(f, page)])),
    events: Object.fromEntries(page.events.map(e => [e.id, eventLinkSet(e, page)])),
    battles: Object.fromEntries(page.battles.map(b => [b.id, battleLinkSet(b, page, figMap)])),
  };
}
