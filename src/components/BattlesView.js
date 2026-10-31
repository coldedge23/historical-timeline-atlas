import { computeForcesTugOfWar, formatForcePercent } from '../utils/forces.js';
import React, { useState, useMemo, useEffect } from 'react';
import { Swords, Trophy, MapPin, Search } from './Icons.js';
import { DerivedBadge } from './DerivedBadge.jsx';

const ERA_BATTLE_PHASES = {
  xiaShangZhou: [
    { id: 'early', label: '🔥 夏商革鼎 (前2070–前1100年)', min: -3000, max: -1100 },
    { id: 'mid', label: '⚔️ 牧野克商與周公東征 (前1099–前950年)', min: -1099, max: -950 },
    { id: 'late', label: '🏹 宣王中興與西周覆亡 (前949–前771年)', min: -949, max: -700 },
  ],
  warringStates: [
    { id: 'early', label: '🛡️ 春秋五霸爭衡 (前770–前454年)', min: -800, max: -454 },
    { id: 'mid', label: '⚔️ 三家分晉與合縱連橫 (前453–前280年)', min: -453, max: -280 },
    { id: 'late', label: '🔥 長平決戰與秦滅六國 (前279–前221年)', min: -279, max: -200 },
  ],
  qinHan: [
    { id: 'early', label: '🔥 秦末與楚漢爭霸 (前209–前202年)', min: -250, max: -201 },
    { id: 'mid', label: '🏹 漢匈決戰與鑿空西域 (前200–前1年)', min: -200, max: 0 },
    { id: 'late', label: '⚔️ 昆陽大捷與東漢定鼎 (1–184年)', min: 1, max: 200 },
  ],
  threeKingdoms: [
    { id: 'early', label: '🔥 群雄逐鹿 (184–207年)', min: 180, max: 207 },
    { id: 'mid', label: '🌊 赤壁與三分天下 (208–225年)', min: 208, max: 225 },
    { id: 'late', label: '⚔️ 祁山北伐與三國歸晉 (226–280年)', min: 226, max: 300 },
  ],
  weiJin: [
    { id: 'early', label: '🔥 西晉興亡與衣冠南渡 (265–349年)', min: 260, max: 349 },
    { id: 'mid', label: '🌊 北伐中原與淝水大捷 (350–419年)', min: 350, max: 419 },
    { id: 'late', label: '⚔️ 南北朝爭鋒與隋滅陳 (420–589年)', min: 420, max: 600 },
  ],
  suiTang: [
    { id: 'early', label: '🔥 隋末群雄與大唐開國 (581–626年)', min: 580, max: 626 },
    { id: 'mid', label: '🐎 天可汗開疆與盛唐外戰 (627–754年)', min: 627, max: 754 },
    { id: 'late', label: '⚔️ 安史之亂、藩鎮與五代 (755–960年)', min: 755, max: 965 },
  ],
  songLiao: [
    { id: 'early', label: '🛡️ 北宋開國與宋遼夏交鋒 (960–1114年)', min: 960, max: 1114 },
    { id: 'mid', label: '🔥 女真崛起与岳韓抗金 (1115–1205年)', min: 1115, max: 1205 },
    { id: 'late', label: '🌊 蒙古滅金與宋元襄樊崖山 (1206–1279年)', min: 1206, max: 1285 },
  ],
  yuanMing: [
    { id: 'early', label: '🔥 元末紅巾與洪武永樂北伐 (1271–1448年)', min: 1270, max: 1448 },
    { id: 'mid', label: '🌊 京師保衛與抗倭援朝 (1449–1615年)', min: 1449, max: 1615 },
    { id: 'late', label: '⚔️ 明清遼東決戰與海權爭鋒 (1616–1644年)', min: 1616, max: 1650 },
  ],
  qingDynasty: [
    { id: 'early', label: '🐉 清初定鼎、收復臺灣與十全武功 (1644–1838年)', min: 1640, max: 1838 },
    { id: 'mid', label: '🔥 鴉片戰爭、太平天國與收復新疆 (1839–1882年)', min: 1839, max: 1882 },
    { id: 'late', label: '🌊 中法保台、甲午乙未與辛亥首義 (1883–1912年)', min: 1883, max: 1920 },
  ],
  taiwanLens: [
    { id: 'early', label: '⛵ 荷西明鄭與清領拓墾 (1624–1873年)', min: 1500, max: 1873 },
    { id: 'mid', label: '🛡️ 清法保台與乙未抗日 (1874–1945年)', min: 1874, max: 1945 },
    { id: 'late', label: '🔥 臺海防衛與金馬戰役 (1946–1980年)', min: 1946, max: 2000 },
  ],
  japanAtlas: [
    { id: 'early', label: '⛩️ 源平合戰與室町動亂 (600–1559年)', min: 500, max: 1559 },
    { id: 'mid', label: '⚔️ 戰國群雄與關原大坂 (1560–1638年)', min: 1560, max: 1638 },
    { id: 'late', label: '🌸 幕末戊辰與西南戰爭 (1850–1912年)', min: 1850, max: 1925 },
  ],
};

export const BattlesView = ({
  battles = [],
  figures = [],
  onSelectBattle,
  onSelectFigure,
  ancientNamesOnly,
  globalSearchTerm = '',
  activePeriodId = 'threeKingdoms',
}) => {
  const [periodFilter, setPeriodFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Reset phase filter when switching historical era
  useEffect(() => {
    setPeriodFilter('all');
  }, [activePeriodId]);

  const phaseDefs = useMemo(() => {
    const rawPhases = ERA_BATTLE_PHASES[activePeriodId] || ERA_BATTLE_PHASES.threeKingdoms;
    const withCounts = rawPhases.map((p) => {
      const count = battles.filter((b) => b.year >= p.min && b.year <= p.max).length;
      return {
        ...p,
        displayLabel: `${p.label} (${count})`,
      };
    });
    return [
      { id: 'all', displayLabel: `全部戰役 (${battles.length})` },
      ...withCounts,
    ];
  }, [battles, activePeriodId]);

  const figMap = useMemo(() => {
    const m = new Map();
    figures.forEach((f) => {
      m.set(f.id, f);
      m.set(f.name, f);
      if (f.cleanName) m.set(f.cleanName, f);
    });
    return m;
  }, [figures]);

  const filteredBattles = useMemo(() => {
    const q = `${globalSearchTerm} ${search}`.trim().toLowerCase();
    const activePhase = phaseDefs.find((p) => p.id === periodFilter);

    return battles.filter((b) => {
      if (periodFilter !== 'all' && activePhase && typeof activePhase.min === 'number') {
        if (b.year < activePhase.min || b.year > activePhase.max) return false;
      }

      if (q) {
        const text = [
          b.name,
          b.eraName,
          b.locationAncient,
          b.locationModern,
          b.summary,
          b.victorStatement,
          ...(b.attacker?.commanders?.map((c) => (typeof c === 'string' ? c : c.name)) || []),
          ...(b.defender?.commanders?.map((c) => (typeof c === 'string' ? c : c.name)) || []),
        ]
          .join(' ')
          .toLowerCase();
        return q.split(/\s+/).every((term) => text.includes(term));
      }
      return true;
    });
  }, [battles, periodFilter, phaseDefs, search, globalSearchTerm]);

  const renderCommandersPreview = (commanders = []) => {
    return (
      <div className="flex items-center gap-1 flex-wrap mt-1.5">
        {commanders.slice(0, 4).map((cmd, idx) => {
          const cmdName = typeof cmd === 'string' ? cmd : cmd.name || '';
          const clean = cmdName.split('(')[0].split('（')[0].trim();
          const byId = cmd.figureId && figMap.get(cmd.figureId);
          const fig = byId || figMap.get(cmdName) || figMap.get(clean);

          if (fig && onSelectFigure) {
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectFigure(fig);
                }}
                title={`點擊查看【${fig.name}】列傳`}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-900/90 hover:bg-amber-950/70 border border-white/10 hover:border-amber-500/50 text-[10px] text-zinc-200 hover:text-amber-200 transition-colors"
              >
                {fig.avatar && (
                  <img
                    src={fig.avatar}
                    alt={cmdName}
                    className="w-3.5 h-3.5 rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <span>{cmdName}</span>
                {!byId && <DerivedBadge basis="commander-name" />}
              </button>
            );
          }

          return (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-900/90 border border-white/10 text-[10px] text-zinc-200"
            >
              <span>{cmdName}</span>
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header & Filter Bar */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Swords className="w-5 h-5 text-rose-500" />
          <h2 className="text-lg font-bold font-serif text-rose-200">重大戰役錄專區</h2>
          <span className="text-xs text-zinc-400">
            （符合條件：<b className="text-rose-300">{filteredBattles.length}</b> / {battles.length} 場經典會戰）
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5 text-xs overflow-x-auto">
            {phaseDefs.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriodFilter(p.id)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  periodFilter === p.id
                    ? 'bg-rose-600 text-white font-bold shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {p.displayLabel}
              </button>
            ))}
          </div>

          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="搜尋戰役/統帥/地點..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-8 pr-2.5 py-1 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>
      </div>

      {/* Battles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBattles.map((battle) => {
          const yearLabel =
            battle.year < 0 ? `西元前 ${Math.abs(battle.year)} 年` : `西元 ${battle.year} 年`;

          return (
            <div
              key={battle.id}
              role="button"
              tabIndex={0}
              aria-label={`查看${battle.name}戰役詳情`}
              onKeyDown={(e) => { if(e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelectBattle(battle); } }}
              onClick={() => onSelectBattle(battle)}
              className="group p-5 rounded-xl bg-[#17181e] border border-rose-500/30 hover:border-rose-500 transition-all hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header Title & Date */}
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-serif text-rose-200 group-hover:text-rose-100 transition-colors">
                      {battle.name}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 border border-rose-500/30 text-rose-300">
                      {yearLabel}
                    </span>
                  </div>
                  <span className="text-xs font-serif text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">
                    {battle.eraName}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    戰場古名：{battle.locationAncient}
                    {!ancientNamesOnly && battle.locationModern && ` (今${battle.locationModern})`}
                  </span>
                </div>

                {/* Victor Banner */}
                <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-200 mb-2.5">
                  <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold">{battle.victorStatement}</span>
                </div>

                {/* Tug-of-War Battle Forces Bar */}
                {(() => {
                  const atkStr = battle.attacker?.forcesEstimate || battle.attacker?.troops || '待考';
                  const defStr = battle.defender?.forcesEstimate || battle.defender?.troops || '待考';
                  const tug = computeForcesTugOfWar(atkStr, defStr);
                  if (!tug.comparable) return <p className="text-sm text-zinc-300 py-2">兵力資料不足或為模糊估計，無法比較比例。</p>;
                  return (
                    <div className="mb-2.5 px-2.5 py-2 rounded-lg bg-black/35 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-blue-300 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                          <span>攻方兵力 ({formatForcePercent(tug.atkPct)}%)</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          {tug.isDisparity && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-[9.5px]">
                              ⚡ 兵力懸殊
                            </span>
                          )}
                          <span className="font-mono text-zinc-300 bg-zinc-800/90 px-1.5 py-0.2 rounded border border-white/10">
                            依記載估計兵力比 {tug.ratioText}
                          </span>
                        </div>
                        <span className="text-emerald-300 font-bold flex items-center gap-1">
                          <span>守方兵力 ({formatForcePercent(tug.defPct)}%)</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden flex border border-white/10">
                        <div
                          className="h-full rounded-l-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 transition-all duration-300"
                          style={{ width: `${tug.atkPct}%` }}
                        />
                        <div
                          className="h-full rounded-r-full bg-gradient-to-r from-teal-400 via-emerald-500 to-emerald-600 transition-all duration-300"
                          style={{ width: `${tug.defPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })()}

                {/* Belligerents Preview with Commander Avatars */}
                <div className="grid grid-cols-2 gap-2.5 text-xs mb-3">
                  <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                    <span className="text-[10px] text-zinc-500 block">進攻方軍團</span>
                    <span className="font-bold text-blue-300 truncate block">
                      {((battle.attacker?.factionName || battle.attacker?.name || '進攻方').split('(')[0] || '').split('（')[0]}
                    </span>
                    <span className="text-[11px] text-zinc-400 mt-0.5 block truncate">
                      兵力：{(battle.attacker?.forcesEstimate || battle.attacker?.troops || '待考').split('，')[0]}
                    </span>
                    {renderCommandersPreview(battle.attacker?.commanders)}
                  </div>

                  <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                    <span className="text-[10px] text-zinc-500 block">迎戰方軍團</span>
                    <span className="font-bold text-emerald-300 truncate block">
                      {((battle.defender?.factionName || battle.defender?.name || '迎戰方').split('(')[0] || '').split('（')[0]}
                    </span>
                    <span className="text-[11px] text-zinc-400 mt-0.5 block truncate">
                      兵力：{(battle.defender?.forcesEstimate || battle.defender?.troops || '待考').split('，')[0]}
                    </span>
                    {renderCommandersPreview(battle.defender?.commanders)}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed text-justify mb-3">
                  {battle.summary}
                </p>
              </div>

              {/* Click CTA */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-rose-400 font-bold">
                <span>點擊檢視將領檔案、死傷與關鍵戰術剖析</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  戰役詳情 &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
