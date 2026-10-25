// Unified Cross-Epoch Schema Normalizer & Intelligence Enricher
// Ensures 100% consistent data structure across all 9 historical periods (Xia-Shang-Zhou to Qing Dynasty)

function cleanFigureName(name = '') {
  return name.split('(')[0].split('（')[0].trim();
}

function parseBirthDeathYears(fig) {
  if (typeof fig.birthYear === 'number' && typeof fig.deathYear === 'number') {
    return { birthYear: fig.birthYear, deathYear: fig.deathYear };
  }
  if (Array.isArray(fig.birthDeath) && fig.birthDeath.length >= 2) {
    return {
      birthYear: Number(fig.birthDeath[0]) || 0,
      deathYear: Number(fig.birthDeath[1]) || 0,
    };
  }
  const raw = fig.birthDeathDisplay || fig.lifeSpan || '';
  const isBCE = /前|BCE/i.test(raw);
  const nums = raw.match(/\d+/g);
  if (nums && nums.length >= 2) {
    let b = parseInt(nums[0], 10);
    let d = parseInt(nums[1], 10);
    if (isBCE) {
      b = -b;
      // If second number is larger than first in BCE string or also BCE
      if (d > Math.abs(b) || raw.indexOf('前', raw.indexOf(nums[0]) + 1) !== -1 || b < -250) {
        d = -d;
      }
    }
    return { birthYear: b, deathYear: d };
  }
  if (nums && nums.length === 1) {
    const y = parseInt(nums[0], 10) * (isBCE ? -1 : 1);
    return { birthYear: y, deathYear: y + 60 };
  }
  return { birthYear: fig.birthYear ?? 9999, deathYear: fig.deathYear ?? 9999 };
}

function hashCode(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function clampScore(val, min = 58, max = 99) {
  return Math.max(min, Math.min(max, Math.round(val)));
}

// Compute authentic 6-dimension ability scores when not explicitly defined
function computeFigureAbilities(fig, participatedEventCount = 0, participatedBattleCount = 0) {
  if (
    fig.abilities &&
    typeof fig.abilities.strategy === 'number' &&
    typeof fig.abilities.commanding === 'number'
  ) {
    return fig.abilities;
  }

  const h = hashCode(fig.id || fig.name || 'fig');
  const roleText = [...(fig.roles || []), fig.role || '', ...(fig.titles || [])].join(' ');
  const bioText = `${roleText} ${fig.bio || ''} ${(fig.keyAchievements || []).join(' ')}`;

  const impBonus = ((fig.importance || 4) - 3) * 4 + Math.min(8, participatedEventCount * 1.5 + participatedBattleCount * 2);

  let strategy = 72 + (h % 11) + impBonus * 0.6;
  let commanding = 68 + ((h >> 3) % 12) + impBonus * 0.6;
  let politics = 70 + ((h >> 6) % 12) + impBonus * 0.6;
  let intellect = 74 + ((h >> 9) % 11) + impBonus * 0.6;
  let courage = 68 + ((h >> 12) % 12) + impBonus * 0.5;
  let charisma = 74 + ((h >> 15) % 12) + impBonus * 0.6;

  // Monarch / Ruler / Hegemon
  if (/皇帝|君主|王|太祖|太宗|世祖|高祖|聖祖|高宗|霸主|單于|可汗|大總統|主公|盟主/.test(roleText)) {
    politics += 14;
    charisma += 16;
    strategy += 10;
    commanding += 8;
  }

  // Prime Minister / Reformer / Statesman
  if (/丞相|宰相|首輔|尚書|侍中|變法|改革|新政|治世|中書令|同平章事|大學士|太師|太傅|名臣|清官/.test(roleText)) {
    politics += 18;
    intellect += 14;
    strategy += 10;
    charisma += 8;
  }

  // Military Strategist / Tactician
  if (/兵聖|兵家|謀|軍師|策士|參謀|奇謀|縱橫|算無遺策/.test(bioText)) {
    strategy += 19;
    intellect += 17;
    commanding += 8;
  }

  // Supreme Commander / Marshal / Admiral
  if (/大將軍|元帥|都督|名將|統帥|節度使|總兵|水師|北伐|滅|破敵|大捷/.test(bioText)) {
    commanding += 18;
    strategy += 12;
    courage += 14;
  }

  // Vanguard / Fierce Warrior / Martyr
  if (/猛將|驍將|先鋒|萬人敵|虎癡|虎威|勇士|死士|烈士|殉國|壯烈|勇冠三軍/.test(bioText)) {
    courage += 20;
    commanding += 10;
    charisma += 8;
  }

  // Scholar / Scientist / Poet / Philosopher
  if (/聖人|思想家|哲學|大儒|理學|心學|詩仙|詩聖|詞宗|文學|史學|科學|天文|算學|工程|醫聖|書聖|畫/.test(bioText)) {
    intellect += 20;
    charisma += 14;
    politics += 6;
    commanding -= 8;
  }

  return {
    strategy: clampScore(strategy),
    commanding: clampScore(commanding),
    politics: clampScore(politics),
    intellect: clampScore(intellect),
    courage: clampScore(courage),
    charisma: clampScore(charisma),
  };
}

export function normalizePeriodDataset(periodConfig) {
  if (!periodConfig) return periodConfig;

  const periodId = periodConfig.id;
  const periodName = periodConfig.name || '歷代';
  const rawEvents = periodConfig.events || [];
  const rawFigures = periodConfig.figures || [];
  const rawBattles = periodConfig.battles || [];
  const rawDemographics = periodConfig.demographics || null;

  // Map of figures by ID and clean name for fast cross-linking
  const figById = new Map();
  const figByName = new Map();

  // 1. First pass on figures to normalize core fields
  const normalizedFigures = rawFigures.map((f) => {
    const cleanName = cleanFigureName(f.name);
    const { birthYear, deathYear } = parseBirthDeathYears(f);
    const birthDeathDisplay =
      f.birthDeathDisplay ||
      f.lifeSpan ||
      (Array.isArray(f.birthDeath) ? `西元 ${f.birthDeath[0]} — ${f.birthDeath[1]} 年` : '生卒待考');

    let roles = [];
    if (Array.isArray(f.roles) && f.roles.length > 0) {
      roles = f.roles;
    } else if (typeof f.role === 'string' && f.role.trim()) {
      roles = f.role.split(/[\/、，,]/).map((s) => s.trim()).filter(Boolean);
    } else if (Array.isArray(f.titles) && f.titles.length > 0) {
      roles = f.titles;
    } else if (typeof f.title === 'string' && f.title.trim()) {
      roles = [
        ...f.title.split(/[\/、，,·]/).map((s) => s.trim()).filter(Boolean),
        ...(Array.isArray(f.tags) ? f.tags : []),
      ];
    } else if (Array.isArray(f.tags) && f.tags.length > 0) {
      roles = f.tags;
    } else {
      roles = ['時代風雲人物'];
    }

    const nativePlaceAncient = f.nativePlaceAncient || f.origin || f.hometown || '華夏九州';
    const nativePlaceModern = f.nativePlaceModern || '';
    const bio = f.bio || f.shortBio || f.summary || '';

    const keyAchievements =
      Array.isArray(f.keyAchievements) && f.keyAchievements.length > 0
        ? f.keyAchievements
        : Array.isArray(f.achievements) && f.achievements.length > 0
        ? f.achievements
        : f.historicalSignificance
        ? [f.historicalSignificance]
        : [];

    const famousQuotes =
      Array.isArray(f.famousQuotes) && f.famousQuotes.length > 0
        ? f.famousQuotes
        : Array.isArray(f.quotes) && f.quotes.length > 0
        ? f.quotes
        : f.historicalEvaluation
        ? [f.historicalEvaluation]
        : [];

    const avatar = f.avatar
      ? f.avatar.startsWith('./') || f.avatar.startsWith('http') || f.avatar.startsWith('/')
        ? f.avatar
        : `./${f.avatar}`
      : '';

    const normFig = {
      ...f,
      cleanName,
      birthYear,
      deathYear,
      birthDeathDisplay,
      roles,
      nativePlaceAncient,
      nativePlaceModern,
      bio,
      keyAchievements,
      famousQuotes,
      avatar,
      participatedEventIds: Array.isArray(f.participatedEventIds) ? [...f.participatedEventIds] : [],
      relations: Array.isArray(f.relations) ? [...f.relations] : [],
    };

    figById.set(normFig.id, normFig);
    if (cleanName) figByName.set(cleanName, normFig);
    figByName.set(normFig.name, normFig);
    return normFig;
  });

  // 2. Normalize Events & auto-link figures and battles
  const defaultFactionByPeriod = {
    xiaShangZhou: 'zhou',
    warringStates: 'qin',
    qinHan: 'han',
    threeKingdoms: 'wei',
    weiJin: 'southern',
    suiTang: 'tang',
    songLiao: 'song',
    yuanMing: 'ming',
    qingDynasty: 'qing',
  };

  const normalizedEvents = rawEvents.map((e) => {
    const title = e.title || e.name || '歷史重大事件';
    const summary = e.summary || e.shortDescription || e.description || '';
    const detail =
      e.detail ||
      (e.description && e.description !== summary ? e.description : '') ||
      summary;
    const locationNameAncient =
      e.locationNameAncient || e.locationAncient || e.locationName || '中原';
    const locationNameModern = e.locationNameModern || e.locationModern || '';

    const explicitFigIds = Array.isArray(e.figureIds)
      ? e.figureIds
      : Array.isArray(e.figuresInvolved)
      ? e.figuresInvolved
      : [];

    const figureIdSet = new Set(explicitFigIds);
    const fullText = `${title} ${summary} ${detail}`;

    // Also auto-detect figures mentioned by name in event text
    normalizedFigures.forEach((fig) => {
      if (fig.cleanName && fig.cleanName.length >= 2 && fullText.includes(fig.cleanName)) {
        figureIdSet.add(fig.id);
      }
    });

    const figureIds = Array.from(figureIdSet);

    // Infer faction if not explicitly set
    let faction = e.faction;
    if (!faction) {
      const firstFig = figureIds.map((id) => figById.get(id)).find(Boolean);
      if (firstFig && firstFig.faction) {
        faction = firstFig.faction;
      } else {
        faction = defaultFactionByPeriod[periodId] || 'other';
      }
    }

    // Match battle if battleId not explicitly set
    let battleId = e.battleId;
    if (!battleId) {
      const matchedBat = rawBattles.find(
        (b) =>
          b.eventId === e.id ||
          (Math.abs((b.year || 0) - (e.year || 0)) <= 1 &&
            (title.includes(cleanFigureName(b.name).slice(0, 2)) ||
              b.name.includes(title.slice(0, 2))))
      );
      if (matchedBat) battleId = matchedBat.id;
    }

    // Ensure coordinates object for maps
    let coordinates = e.coordinates;
    if (!coordinates && Array.isArray(e.coords) && e.coords.length >= 2) {
      // Check if coords is [lng, lat] or [lat, lng]
      const [c0, c1] = e.coords;
      coordinates = c0 > 60 ? { lat: c1, lng: c0 } : { lat: c0, lng: c1 };
    }

    // Back-populate figure.participatedEventIds
    figureIds.forEach((fid) => {
      const fig = figById.get(fid);
      if (fig && !fig.participatedEventIds.includes(e.id)) {
        fig.participatedEventIds.push(e.id);
      }
    });

    return {
      ...e,
      title,
      name: title,
      summary,
      detail,
      locationNameAncient,
      locationNameModern,
      figureIds,
      faction,
      battleId,
      coordinates,
    };
  });

  // 3. Normalize Battles & auto-link commanders and events
  const normalizedBattles = rawBattles.map((b) => {
    const locationAncient = b.locationAncient || b.locationNameAncient || b.locationName || '古戰場';
    const locationModern = b.locationModern || b.locationNameModern || '';
    const summary = b.summary || b.shortDescription || b.description || '';
    const victorStatement =
      b.victorStatement || b.result || (b.winner ? `最終勝方：${b.winner}` : '勝負已分');

    let tactics = [];
    if (Array.isArray(b.tactics)) {
      tactics = b.tactics;
    } else if (typeof b.tactics === 'string' && b.tactics.trim()) {
      tactics = b.tactics.split(/[、；;]/).map((s) => s.trim()).filter(Boolean);
    }

    const rawAttacker = b.attacker || {};
    const rawDefender = b.defender || {};

    let attackerCommanders = Array.isArray(rawAttacker.commanders) ? [...rawAttacker.commanders] : [];
    let defenderCommanders = Array.isArray(rawDefender.commanders) ? [...rawDefender.commanders] : [];

    // If commanders are missing, infer from factionName and battle text
    if (attackerCommanders.length === 0 && defenderCommanders.length === 0) {
      const batText = `${b.name} ${summary} ${b.strategicSignificance || ''}`;
      const matchedFigs = normalizedFigures.filter(
        (fig) => fig.cleanName && fig.cleanName.length >= 2 && batText.includes(fig.cleanName)
      );
      matchedFigs.forEach((fig, idx) => {
        const attackerName = rawAttacker.factionName || '';
        const defenderName = rawDefender.factionName || '';
        if (attackerName.includes(fig.cleanName)) {
          attackerCommanders.push({ figureId: fig.id, name: fig.cleanName, title: fig.roles[0] || '統帥' });
        } else if (defenderName.includes(fig.cleanName)) {
          defenderCommanders.push({ figureId: fig.id, name: fig.cleanName, title: fig.roles[0] || '統帥' });
        } else if (idx % 2 === 0) {
          attackerCommanders.push({ figureId: fig.id, name: fig.cleanName, title: fig.roles[0] || '將領' });
        } else {
          defenderCommanders.push({ figureId: fig.id, name: fig.cleanName, title: fig.roles[0] || '將領' });
        }
      });
    }

    // Link eventId if missing
    let eventId = b.eventId;
    if (!eventId) {
      const linkedEvt = normalizedEvents.find((e) => e.battleId === b.id);
      if (linkedEvt) eventId = linkedEvt.id;
    }

    return {
      ...b,
      locationAncient,
      locationModern,
      summary,
      victorStatement,
      tactics,
      impact: b.impact || b.strategicSignificance || '',
      eventId,
      attacker: {
        ...rawAttacker,
        factionName: rawAttacker.factionName || rawAttacker.name || '進攻方軍團',
        forcesEstimate: rawAttacker.forcesEstimate || rawAttacker.troops || '精銳主力',
        casualtiesEstimate: rawAttacker.casualtiesEstimate || rawAttacker.casualties || '詳見戰報記述',
        commanders: attackerCommanders,
      },
      defender: {
        ...rawDefender,
        factionName: rawDefender.factionName || rawDefender.name || '迎戰方軍團',
        forcesEstimate: rawDefender.forcesEstimate || rawDefender.troops || '守備主力',
        casualtiesEstimate: rawDefender.casualtiesEstimate || rawDefender.casualties || '詳見戰報記述',
        commanders: defenderCommanders,
      },
    };
  });

  // 4. Second pass on Figures: auto-enrich relations & compute 6-dimension abilities
  normalizedFigures.forEach((fig) => {
    // Auto-discover historical relations from shared events if relations are sparse
    if (fig.relations.length < 3) {
      const existingTargetIds = new Set(fig.relations.map((r) => r.figureId));
      // Check shared events
      for (const evtId of fig.participatedEventIds) {
        const evt = normalizedEvents.find((e) => e.id === evtId);
        if (!evt) continue;
        for (const otherId of evt.figureIds || []) {
          if (otherId !== fig.id && !existingTargetIds.has(otherId)) {
            const other = figById.get(otherId);
            if (other) {
              const relType = other.faction === fig.faction ? 'colleague' : 'rival';
              fig.relations.push({
                figureId: other.id,
                relationType: relType,
                label: `同見於「${evt.title.slice(0, 10)}」`,
              });
              existingTargetIds.add(other.id);
              if (fig.relations.length >= 5) break;
            }
          }
        }
        if (fig.relations.length >= 5) break;
      }

      // If still sparse, link with same-faction contemporaries
      if (fig.relations.length < 2) {
        const sameFactionPeers = normalizedFigures.filter(
          (other) =>
            other.id !== fig.id &&
            other.faction === fig.faction &&
            !existingTargetIds.has(other.id) &&
            Math.abs((other.birthYear || 0) - (fig.birthYear || 0)) <= 65
        );
        sameFactionPeers.slice(0, 3).forEach((peer) => {
          fig.relations.push({
            figureId: peer.id,
            relationType: 'colleague',
            label: '同朝 / 同陣營先賢',
          });
          existingTargetIds.add(peer.id);
        });
      }
    }

    // Count battles participated
    const batCount = normalizedBattles.filter((b) => {
      const cmds = [...(b.attacker?.commanders || []), ...(b.defender?.commanders || [])];
      return (
        cmds.some((c) => c.figureId === fig.id || (c.name && c.name.includes(fig.cleanName))) ||
        (b.summary || '').includes(fig.cleanName)
      );
    }).length;

    fig.abilities = computeFigureAbilities(fig, fig.participatedEventIds.length, batCount);
  });

  // 5. Normalize Demographics
  let normalizedDemographics = null;
  if (rawDemographics) {
    const title =
      rawDemographics.title ||
      rawDemographics.eraName ||
      `${periodName}人口戶籍與各民族分佈考實`;
    const subtitle =
      rawDemographics.subtitle ||
      rawDemographics.sourceNote ||
      `依據《二十四史·食貨志》、《地理志》與歷代官方戶部版籍考實`;
    const alertTitle =
      rawDemographics.alertTitle ||
      (rawDemographics.peakPopulation
        ? `時代極盛人口規模：${rawDemographics.peakPopulation}`
        : rawDemographics.estimatedTotalPopulation
        ? `人口規模考證：${rawDemographics.estimatedTotalPopulation}`
        : `${periodName}戶口變遷與社會結構總覽`);
    const commentary = rawDemographics.commentary || rawDemographics.summary || '';

    const rawPoints = rawDemographics.dataPoints || rawDemographics.censusData || [];
    const dataPoints = rawPoints.map((dp) => ({
      regimeName:
        dp.regimeName ||
        dp.name ||
        dp.yearDisplay ||
        (dp.year ? `西元 ${dp.year} 年` : '官方戶籍普查'),
      population: dp.population || dp.total || '待考',
      households: dp.households || '待考',
      armyCount: dp.armyCount || '',
      officialsCount: dp.officialsCount || '',
      source: dp.source || dp.note || '正史食貨志記載',
    }));

    const rawGroups =
      rawDemographics.ethnicGroups ||
      rawDemographics.ethnicIntegration ||
      [];
    const ethnicGroups = rawGroups.map((g) => ({
      name: g.name || g.group || '周邊部族',
      proportion: g.proportion || '',
      distributionRegion: g.distributionRegion || g.region || '',
      relationshipWithRegime:
        g.relationshipWithRegime || g.traits || g.description || g.desc || '',
    }));

    normalizedDemographics = {
      ...rawDemographics,
      title,
      subtitle,
      alertTitle,
      commentary,
      dataPoints,
      ethnicGroups,
    };
  }

  return {
    ...periodConfig,
    events: normalizedEvents,
    figures: normalizedFigures,
    battles: normalizedBattles,
    demographics: normalizedDemographics,
  };
}
