// Period-Aware Faction Configurations, Labels, and Visual Styling
export const FACTION_CONFIGS = {
  xiaShangZhou: {
    order: ['xia', 'shang', 'zhou', 'feudal', 'tribal', 'other'],
    labels: {
      xia: '大夏王朝',
      shang: '大商帝國',
      zhou: '西周王朝',
      feudal: '諸侯方國',
      tribal: '方國/部落',
      other: '神話/部族/其他',
    },
    styles: {
      xia: {
        card: 'border-amber-600/50 hover:border-amber-400',
        badge: 'bg-amber-950/70 text-amber-200 border-amber-500/50',
        stroke: '#d97706',
      },
      shang: {
        card: 'border-yellow-600/50 hover:border-yellow-400',
        badge: 'bg-yellow-950/70 text-yellow-200 border-yellow-500/50',
        stroke: '#eab308',
      },
      zhou: {
        card: 'border-red-600/50 hover:border-red-400',
        badge: 'bg-red-950/70 text-red-200 border-red-500/50',
        stroke: '#ef4444',
      },
      feudal: {
        card: 'border-cyan-600/50 hover:border-cyan-400',
        badge: 'bg-cyan-950/70 text-cyan-200 border-cyan-500/50',
        stroke: '#06b6d4',
      },
      tribal: {
        card: 'border-purple-600/50 hover:border-purple-400',
        badge: 'bg-purple-950/70 text-purple-200 border-purple-500/50',
        stroke: '#a855f7',
      },
      other: {
        card: 'border-zinc-600/50 hover:border-zinc-400',
        badge: 'bg-zinc-900/80 text-zinc-300 border-zinc-600/50',
        stroke: '#71717a',
      },
    }
  },
  warringStates: {
    order: ['qin', 'zhao', 'qi', 'wei', 'chu', 'yan', 'han', 'jin', 'other'],
    labels: {
      qin: '秦國',
      zhao: '趙國',
      qi: '齊國',
      wei: '魏國',
      chu: '楚國',
      yan: '燕國',
      han: '韓國',
      jin: '晉國',
      zhou: '周王室',
      wu: '吳國',
      yue: '越國',
      song: '宋國',
      lu: '魯國',
      zheng: '鄭國',
      other: '諸侯/百家',
    },
    styles: {
      qin: {
        card: 'border-red-600/40 hover:border-red-500',
        badge: 'bg-red-950/70 text-red-200 border-red-500/50',
        stroke: '#ef4444',
      },
      zhao: {
        card: 'border-amber-600/40 hover:border-amber-500',
        badge: 'bg-amber-950/70 text-amber-200 border-amber-500/50',
        stroke: '#f59e0b',
      },
      qi: {
        card: 'border-cyan-600/40 hover:border-cyan-500',
        badge: 'bg-cyan-950/70 text-cyan-200 border-cyan-500/50',
        stroke: '#06b6d4',
      },
      wei: {
        card: 'border-emerald-600/40 hover:border-emerald-500',
        badge: 'bg-emerald-950/70 text-emerald-200 border-emerald-500/50',
        stroke: '#10b981',
      },
      chu: {
        card: 'border-purple-600/40 hover:border-purple-500',
        badge: 'bg-purple-950/70 text-purple-200 border-purple-500/50',
        stroke: '#a855f7',
      },
      yan: {
        card: 'border-indigo-600/40 hover:border-indigo-500',
        badge: 'bg-indigo-950/70 text-indigo-200 border-indigo-500/50',
        stroke: '#6366f1',
      },
      han: {
        card: 'border-orange-600/40 hover:border-orange-500',
        badge: 'bg-orange-950/70 text-orange-200 border-orange-500/50',
        stroke: '#f97316',
      },
      jin: {
        card: 'border-yellow-600/40 hover:border-yellow-500',
        badge: 'bg-yellow-950/70 text-yellow-200 border-yellow-500/50',
        stroke: '#eab308',
      },
      zhou: {
        card: 'border-yellow-500/40 hover:border-yellow-400',
        badge: 'bg-yellow-900/60 text-yellow-100 border-yellow-400/50',
        stroke: '#facc15',
      },
      other: {
        card: 'border-amber-700/30 hover:border-amber-500/50',
        badge: 'bg-zinc-800/80 text-amber-300/90 border-amber-500/30',
        stroke: '#d97706',
      },
    }
  },
  qinHan: {
    order: ['han', 'chu', 'qin', 'xiongnu', 'other'],
    labels: {
      han: '大漢',
      chu: '西楚',
      qin: '大秦',
      xiongnu: '匈奴',
      other: '諸侯/西域/外邦',
    },
    styles: {
      han: {
        card: 'border-red-500/40 hover:border-red-400',
        badge: 'bg-red-950/70 text-red-300 border-red-500/40',
        stroke: '#ef4444',
      },
      chu: {
        card: 'border-purple-500/40 hover:border-purple-400',
        badge: 'bg-purple-950/70 text-purple-300 border-purple-500/40',
        stroke: '#a855f7',
      },
      qin: {
        card: 'border-zinc-500/40 hover:border-zinc-400',
        badge: 'bg-zinc-900 text-zinc-300 border-zinc-500/40',
        stroke: '#71717a',
      },
      xiongnu: {
        card: 'border-amber-600/40 hover:border-amber-500',
        badge: 'bg-amber-950/70 text-amber-200 border-amber-500/40',
        stroke: '#f59e0b',
      },
      other: {
        card: 'border-amber-500/40 hover:border-amber-400',
        badge: 'bg-amber-950/70 text-amber-300 border-amber-500/40',
        stroke: '#d97706',
      },
    }
  },
  threeKingdoms: {
    order: ['wei', 'shu', 'wu', 'han', 'jin', 'other'],
    labels: {
      wei: '曹魏',
      shu: '蜀漢',
      wu: '東吳',
      han: '大漢',
      jin: '西晉',
      other: '群雄/諸侯/外邦',
    },
    styles: {
      wei: {
        card: 'border-blue-500/40 hover:border-blue-400',
        badge: 'bg-blue-950/70 text-blue-300 border-blue-500/40',
        stroke: '#60a5fa',
      },
      shu: {
        card: 'border-rose-500/40 hover:border-rose-400',
        badge: 'bg-rose-950/70 text-rose-300 border-rose-500/40',
        stroke: '#fb7185',
      },
      wu: {
        card: 'border-emerald-500/40 hover:border-emerald-400',
        badge: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40',
        stroke: '#34d399',
      },
      han: {
        card: 'border-red-500/40 hover:border-red-400',
        badge: 'bg-red-950/70 text-red-300 border-red-500/40',
        stroke: '#ef4444',
      },
      jin: {
        card: 'border-yellow-500/40 hover:border-yellow-400',
        badge: 'bg-yellow-950/70 text-yellow-300 border-yellow-500/40',
        stroke: '#facc15',
      },
      other: {
        card: 'border-amber-500/40 hover:border-amber-400',
        badge: 'bg-amber-950/70 text-amber-300 border-amber-500/40',
        stroke: '#d97706',
      },
    }
  },
  weiJin: {
    order: ['jin', 'sixteen', 'southern', 'northern', 'sui', 'other'],
    labels: {
      jin: '兩晉（西晉·東晉）',
      sixteen: '五胡十六國',
      southern: '南朝（宋齊梁陳）',
      northern: '北朝（北魏·齊·周）',
      sui: '大隋（統一天下）',
      other: '諸胡/外邦/文化宗匠',
    },
    styles: {
      jin: {
        card: 'border-yellow-500/40 hover:border-yellow-400',
        badge: 'bg-yellow-950/70 text-yellow-300 border-yellow-500/40',
        stroke: '#eab308',
      },
      sixteen: {
        card: 'border-purple-500/40 hover:border-purple-400',
        badge: 'bg-purple-950/70 text-purple-300 border-purple-500/40',
        stroke: '#a855f7',
      },
      southern: {
        card: 'border-emerald-500/40 hover:border-emerald-400',
        badge: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40',
        stroke: '#10b981',
      },
      northern: {
        card: 'border-sky-500/40 hover:border-sky-400',
        badge: 'bg-sky-950/70 text-sky-300 border-sky-500/40',
        stroke: '#0284c7',
      },
      sui: {
        card: 'border-amber-500/40 hover:border-amber-400',
        badge: 'bg-amber-950/70 text-amber-200 border-amber-500/40',
        stroke: '#f59e0b',
      },
      other: {
        card: 'border-indigo-500/40 hover:border-indigo-400',
        badge: 'bg-indigo-950/70 text-indigo-300 border-indigo-500/40',
        stroke: '#6366f1',
      },
    }
  }
};

export function getFactionMeta(factionId, periodId = 'threeKingdoms') {
  const periodConfig = FACTION_CONFIGS[periodId] || FACTION_CONFIGS.threeKingdoms;
  const label = periodConfig.labels[factionId] || (
    factionId === 'qin' ? '秦國' :
    factionId === 'qi' ? '齊國' :
    factionId === 'chu' ? '楚國' :
    factionId === 'zhao' ? '趙國' :
    factionId === 'yan' ? '燕國' :
    factionId === 'wei' ? (periodId === 'warringStates' ? '魏國' : '曹魏') :
    factionId === 'han' ? (periodId === 'warringStates' ? '韓國' : '大漢') :
    factionId === 'jin' ? (periodId === 'warringStates' ? '晉國' : '西晉') :
    factionId === 'zhou' ? '周王室' :
    factionId === 'wu' ? (periodId === 'warringStates' ? '吳國' : '東吳') :
    factionId === 'yue' ? '越國' :
    factionId === 'song' ? '宋國' :
    factionId === 'lu' ? '魯國' :
    factionId === 'zheng' ? '鄭國' :
    factionId === 'other' ? (periodId === 'warringStates' ? '諸侯/百家' : '群雄/外邦') :
    factionId
  );

  const style = periodConfig.styles[factionId] || periodConfig.styles.other || {
    card: 'border-amber-500/40 hover:border-amber-400',
    badge: 'bg-zinc-800 text-zinc-300 border-zinc-600',
    stroke: '#f59e0b',
  };

  return {
    label,
    card: style.card,
    badge: style.badge,
    stroke: style.stroke,
  };
}
