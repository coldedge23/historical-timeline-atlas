// Pure relation rules shared by the modals, the timeline and app navigation.
// Inputs are plain records; this module must never import history data.
import { CIV_IDS, civById, civForPage } from '../civilizations/registry.js';

// Battles where this figure was a commander or is mentioned in the summary (text match, not a confirmed link).
// basis: commander-id (explicit), commander-name or summary-text (both derived from text).
export function figureBattleLinks(figure, allBattles = []) {
  const links = [];
  for (const bat of allBattles || []) {
    const cmds = [
      ...(bat.attacker?.commanders || []),
      ...(bat.defender?.commanders || []),
    ];
    const cleanName = (figure.cleanName || figure.name || '').split('(')[0].split('（')[0].trim();
    if (cmds.some((c) => c.figureId === figure.id)) links.push({ battle: bat, basis: 'commander-id' });
    else if (cmds.some((c) => (typeof c === 'string' ? c.includes(cleanName) : (c.name || '').includes(cleanName)))) links.push({ battle: bat, basis: 'commander-name' });
    else if (cleanName.length >= 2 && (bat.summary || '').includes(cleanName)) links.push({ battle: bat, basis: 'summary-text' });
  }
  return links;
}

export function figureBattles(figure, allBattles = []) {
  return figureBattleLinks(figure, allBattles).map((link) => link.battle);
}

// Robustly extract attacker and defender with backward & cross-period compatibility
export function battleAttacker(battle) {
  if (battle.attacker) {
    return {
      ...battle.attacker,
      forcesEstimate: battle.attacker.forcesEstimate || battle.forces?.attacker || '待考',
      casualtiesEstimate: battle.attacker.casualtiesEstimate || battle.casualties?.attacker || '詳見戰報記敘'
    };
  }
  if (battle.belligerents) {
    return {
      factionName: typeof battle.belligerents === 'object' ? battle.belligerents.attacker : '進攻方',
      commanders: Array.isArray(battle.commanders?.attacker) ? battle.commanders.attacker : (Array.isArray(battle.commanders) ? battle.commanders : []),
      forcesEstimate: battle.forces?.attacker || '待考',
      casualtiesEstimate: battle.casualties?.attacker || '詳見戰報記敘'
    };
  }
  if (battle.parties?.invader) {
    const partyStr = battle.parties.invader;
    const match = partyStr.match(/^(.*?)[（(](.*)[）)]$/);
    const cmds = Array.isArray(battle.commanders?.invader) ? battle.commanders.invader : (Array.isArray(battle.commanders) ? battle.commanders : []);
    return {
      factionName: match ? match[1].trim() : partyStr,
      commanders: cmds,
      forcesEstimate: match ? match[2].trim() : (battle.forces?.attacker || '待考'),
      casualtiesEstimate: battle.casualties?.attacker || '詳見戰報記敘'
    };
  }
  return {
    factionName: '進攻方',
    commanders: [],
    forcesEstimate: '待考',
    casualtiesEstimate: '詳見戰報記敘'
  };
}

export function battleDefender(battle) {
  if (battle.defender) {
    return {
      ...battle.defender,
      forcesEstimate: battle.defender.forcesEstimate || battle.forces?.defender || '待考',
      casualtiesEstimate: battle.defender.casualtiesEstimate || battle.casualties?.defender || '詳見戰報記敘'
    };
  }
  if (battle.belligerents) {
    return {
      factionName: typeof battle.belligerents === 'object' ? battle.belligerents.defender : '迎戰方',
      commanders: Array.isArray(battle.commanders?.defender) ? battle.commanders.defender : [],
      forcesEstimate: battle.forces?.defender || '待考',
      casualtiesEstimate: battle.casualties?.defender || '詳見戰報記敘'
    };
  }
  if (battle.parties?.defender) {
    const partyStr = battle.parties.defender;
    const match = partyStr.match(/^(.*?)[（(](.*)[）)]$/);
    const cmds = Array.isArray(battle.commanders?.defender) ? battle.commanders.defender : [];
    return {
      factionName: match ? match[1].trim() : partyStr,
      commanders: cmds,
      forcesEstimate: match ? match[2].trim() : (battle.forces?.defender || '待考'),
      casualtiesEstimate: battle.casualties?.defender || '詳見戰報記敘'
    };
  }
  return {
    factionName: '迎戰方',
    commanders: [],
    forcesEstimate: '待考',
    casualtiesEstimate: '詳見戰報記敘'
  };
}

export function battleFigureIndex(allFigures = []) {
  const m = new Map();
  allFigures.forEach((f) => {
    m.set(f.id, f);
    m.set(f.name, f);
  });
  return m;
}

export function resolveCommander(cmd, figMap) {
  const cmdName = typeof cmd === 'string' ? cmd : (cmd.name || '');
  const cmdTitle = typeof cmd === 'string' ? '' : (cmd.title || '');
  const cleanName = cmdName.split('/')[0].split('(')[0].trim();
  const cmdFigureId = typeof cmd === 'string' ? null : cmd.figureId;
  const byId = cmdFigureId && figMap.get(cmdFigureId);
  const fig = byId || figMap.get(cleanName) || figMap.get(cmdName);
  return { cmdName, cmdTitle, fig, basis: fig ? (byId ? 'commander-id' : 'commander-name') : null };
}

export function battleLinkedEvent(battle, allEvents) {
  if (!allEvents || !allEvents.length) return null;
  if (battle.eventId) {
    return allEvents.find((e) => e.id === battle.eventId);
  }
  return allEvents.find((e) => e.battleId === battle.id);
}

export function battleLinkedEventBasis(battle) {
  return battle.eventId ? 'event-id' : 'event-battle-id';
}

// Figures listed on an event card, in figureIds order; reviews are split by the caller.
export function eventFigures(evt, figures = []) {
  return (evt.figureIds || [])
    .map((fid) => (figures || []).find((f) => f.id === fid))
    .filter(Boolean);
}

// Each civilization's config owns its regime periodization (src/civilizations/*/config.js).
export function getContemporaryRegimeLabel(civ, year) {
  return civById(civ)?.regimeLabel(year) || '';
}

// Closest event by year in each other civilization; ties keep the earliest item in the pool.
export function contemporaryMatches(evt, civilizationMode, crossCivPools) {
  const otherCivs = CIV_IDS.filter((c) => c !== civilizationMode);
  return otherCivs.map((civKey) => {
    const pool = crossCivPools[civKey] || [];
    let closest = null;
    let minDiff = Infinity;
    for (const item of pool) {
      if (typeof item.year === 'number') {
        const d = Math.abs(item.year - evt.year);
        if (d < minDiff) {
          minDiff = d;
          closest = item;
        }
      }
    }
    const regimeLabel = getContemporaryRegimeLabel(civKey, evt.year);
    return { civKey, regimeLabel, closest, minDiff };
  });
}

// A figure already on the current page opens in place; otherwise switch to its own dataset.
// Returns the decision only; the caller applies it to state.
export function resolveFigureSelection(figure, currentFigures, { periods, japanEvents, taiwanEvents }) {
  const target = currentFigures.find(item => item.id === figure?.id) || figure;
  if (!target) return null;
  const scope = target.datasetId;
  if (!(scope && !currentFigures.some(item => item.id === target.id))) return { target, switchTo: null };
  const civ = target.civ || civForPage(scope).id;
  const switchTo = { civ };
  if (civ === 'china') switchTo.periodId = scope;
  if (civ === 'japan') switchTo.japanEraId = target.eraId || civById(civ).defaultEraId;
  if (civ === 'taiwan') switchTo.taiwanEraId = target.eraId || civById(civ).defaultEraId;
  const events = civ === 'china' ? periods[scope]?.events : civ === 'japan' ? japanEvents : taiwanEvents;
  switchTo.selectedEvent = events?.find(event => !target.eraId || event.eraId === target.eraId) || events?.[0] || null;
  return { target, switchTo };
}
