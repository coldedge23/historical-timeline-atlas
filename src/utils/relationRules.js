// Pure relation rules shared by the modals, the timeline and app navigation.
// Inputs are plain records; this module must never import history data.

// Battles where this figure was a commander or is mentioned in the summary (text match, not a confirmed link).
export function figureBattles(figure, allBattles = []) {
  return (allBattles || []).filter((bat) => {
    const cmds = [
      ...(bat.attacker?.commanders || []),
      ...(bat.defender?.commanders || []),
    ];
    const cleanName = (figure.cleanName || figure.name || '').split('(')[0].split('（')[0].trim();
    if (
      cmds.some(
        (c) =>
          c.figureId === figure.id ||
          (typeof c === 'string' ? c.includes(cleanName) : (c.name || '').includes(cleanName))
      )
    ) {
      return true;
    }
    return cleanName.length >= 2 && (bat.summary || '').includes(cleanName);
  });
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
  const fig = (cmdFigureId && figMap.get(cmdFigureId)) || figMap.get(cleanName) || figMap.get(cmdName);
  return { cmdName, cmdTitle, fig };
}

export function battleLinkedEvent(battle, allEvents) {
  if (!allEvents || !allEvents.length) return null;
  if (battle.eventId) {
    return allEvents.find((e) => e.id === battle.eventId);
  }
  return allEvents.find((e) => e.battleId === battle.id);
}

export function getContemporaryRegimeLabel(civ, year) {
  if (civ === 'china') {
    if (year < -770) return '商周時代';
    if (year < -221) return '春秋戰國';
    if (year < 220) return '秦漢帝國';
    if (year < 280) return '魏蜀吳三國';
    if (year < 581) return '魏晉南北朝';
    if (year < 907) return '隋唐盛世';
    if (year < 960) return '五代十國';
    if (year < 1279) return '宋遼金夏';
    if (year < 1368) return '大元帝國';
    if (year < 1644) return '大明帝國';
    if (year < 1912) return '大清帝國';
    return '近現代中華';
  }
  if (civ === 'japan') {
    if (year < 710) return '飛鳥・古墳時代';
    if (year < 794) return '奈良時代';
    if (year < 1185) return '平安時代';
    if (year < 1336) return '鎌倉幕府';
    if (year < 1467) return '室町南北朝';
    if (year < 1573) return '戰國群雄時代';
    if (year < 1603) return '安土桃山時代';
    if (year < 1853) return '江戶德川幕府';
    if (year < 1868) return '幕末尊皇倒幕';
    return '明治維新・近代日本';
  }
  if (civ === 'taiwan') {
    if (year < 1624) return '南島原住民部落與大肚王國';
    if (year < 1662) return '荷西殖民與大航海時代';
    if (year < 1683) return '明鄭東寧王國';
    if (year < 1874) return '清領拓墾時期';
    if (year < 1895) return '清季自強建省時期';
    if (year < 1945) return '日治抗日與啟蒙時期';
    return '戰後臺灣與現代矽島';
  }
  return '';
}

// Closest event by year in each other civilization; ties keep the earliest item in the pool.
export function contemporaryMatches(evt, civilizationMode, crossCivPools) {
  const otherCivs = ['china', 'taiwan', 'japan'].filter((c) => c !== civilizationMode);
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
  const civ = target.civ || (scope === 'taiwanLens' ? 'taiwan' : scope === 'japanAtlas' ? 'japan' : 'china');
  const switchTo = { civ };
  if (civ === 'china') switchTo.periodId = scope;
  if (civ === 'japan') switchTo.japanEraId = target.eraId || 'jp_sengoku';
  if (civ === 'taiwan') switchTo.taiwanEraId = target.eraId || 'tw_tungning';
  const events = civ === 'china' ? periods[scope]?.events : civ === 'japan' ? japanEvents : taiwanEvents;
  switchTo.selectedEvent = events?.find(event => !target.eraId || event.eraId === target.eraId) || events?.[0] || null;
  return { target, switchTo };
}
