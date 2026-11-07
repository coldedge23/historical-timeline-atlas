import { computeForcesTugOfWar, formatForcePercent } from '../utils/forces.js';
import React, { useState, useMemo, useEffect } from 'react';
import { Swords, Trophy, MapPin, Search } from './Icons.js';
import { DerivedBadge } from './DerivedBadge.jsx';
import { battleInPhase, battleInTheater, theaterOptions } from '../utils/battleFilters.js';
import { formatDateRange } from '../utils/datedRecords.js';

// phases: the page's battle list phases (pack battlePhases); taxonomy: its battleTaxonomy, when battles carry theaters.
export const BattlesView = ({
  battles = [],
  figures = [],
  onSelectBattle,
  onSelectFigure,
  ancientNamesOnly,
  globalSearchTerm = '',
  activePeriodId,
  phases = [],
  taxonomy = null,
}) => {
  const [periodFilter, setPeriodFilter] = useState('all');
  const [theaterFilter, setTheaterFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Reset phase filter when switching historical era
  useEffect(() => {
    setPeriodFilter('all');
    setTheaterFilter('all');
  }, [activePeriodId]);

  const theaters = useMemo(() => theaterOptions(battles, taxonomy?.theaters), [battles, taxonomy]);

  const phaseDefs = useMemo(() => {
    const withCounts = phases.map((p) => {
      const count = battles.filter((b) => battleInPhase(b, p)).length;
      return {
        ...p,
        displayLabel: `${p.label} (${count})`,
      };
    });
    return [
      { id: 'all', displayLabel: `全部戰役 (${battles.length})` },
      ...withCounts,
    ];
  }, [battles, phases]);

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
      if (periodFilter !== 'all' && activePhase && !battleInPhase(b, activePhase)) return false;
      if (!battleInTheater(b, theaterFilter)) return false;

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
          ...(b.participants?.map((p) => p?.name) || []),
        ]
          .join(' ')
          .toLowerCase();
        return q.split(/\s+/).every((term) => text.includes(term));
      }
      return true;
    });
  }, [battles, periodFilter, theaterFilter, phaseDefs, search, globalSearchTerm]);

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

          {theaters.length > 0 && (
            <label className="flex items-center gap-1 text-xs text-zinc-400">
              <span className="whitespace-nowrap">戰場</span>
              <select
                value={theaterFilter}
                onChange={(e) => setTheaterFilter(e.target.value)}
                aria-label="依戰場篩選戰役"
                className="bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
              >
                <option value="all">全部戰場 ({battles.length})</option>
                {theaters.map((t) => (
                  <option key={t.id} value={t.id}>{t.label} ({t.count})</option>
                ))}
              </select>
            </label>
          )}

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
          const yearLabel = battle.startDate ? formatDateRange(battle.startDate, battle.endDate)
            : battle.year < 0 ? `西元前 ${Math.abs(battle.year)} 年` : `西元 ${battle.year} 年`;

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
