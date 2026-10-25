import React, { useState, useMemo } from 'react';
import { Swords, Trophy, MapPin, Search } from './Icons.js';

export const BattlesView = ({
  battles,
  figures = [],
  onSelectBattle,
  ancientNamesOnly,
  globalSearchTerm = '',
}) => {
  const [periodFilter, setPeriodFilter] = useState('all');
  const [search, setSearch] = useState('');

  const isQinHan = useMemo(() => battles.some((b) => b.year < 0), [battles]);

  const periods = useMemo(() => {
    if (isQinHan) {
      return [
        { id: 'all', label: `全部戰役 (${battles.length})` },
        { id: 'early', label: '🔥 楚漢爭霸 (前207–前202年)' },
        { id: 'mid', label: '🏹 漢匈開疆與西域 (前200–前36年)' },
        { id: 'late', label: '⚔️ 昆陽與東漢一統 (23–89年)' },
      ];
    }
    return [
      { id: 'all', label: `全部戰役 (${battles.length})` },
      { id: 'early', label: '🔥 群雄逐鹿 (184–205年)' },
      { id: 'mid', label: '🌊 赤壁與三分 (208–222年)' },
      { id: 'late', label: '⚔️ 北伐與一統 (228–280年)' },
    ];
  }, [battles, isQinHan]);

  const figMap = useMemo(() => {
    const m = new Map();
    figures.forEach((f) => {
      m.set(f.id, f);
      m.set(f.name, f);
    });
    return m;
  }, [figures]);

  const filteredBattles = useMemo(() => {
    const q = `${globalSearchTerm} ${search}`.trim().toLowerCase();
    return battles.filter((b) => {
      if (isQinHan) {
        if (periodFilter === 'early' && b.year > -201) return false;
        if (periodFilter === 'mid' && (b.year < -200 || b.year > 0)) return false;
        if (periodFilter === 'late' && b.year <= 0) return false;
      } else {
        if (periodFilter === 'early' && b.year > 205) return false;
        if (periodFilter === 'mid' && (b.year < 206 || b.year > 225)) return false;
        if (periodFilter === 'late' && b.year < 226) return false;
      }

      if (q) {
        const text = [
          b.name,
          b.eraName,
          b.locationAncient,
          b.locationModern,
          b.summary,
          b.victorStatement,
          ...(b.attacker?.commanders?.map((c) => c.name) || []),
          ...(b.defender?.commanders?.map((c) => c.name) || []),
        ]
          .join(' ')
          .toLowerCase();
        return q.split(/\s+/).every((term) => text.includes(term));
      }
      return true;
    });
  }, [battles, periodFilter, search, globalSearchTerm]);

  const renderCommandersPreview = (commanders = []) => {
    return (
      <div className="flex items-center gap-1 flex-wrap mt-1.5">
        {commanders.slice(0, 4).map((cmd, idx) => {
          const fig = (cmd.figureId && figMap.get(cmd.figureId)) || figMap.get(cmd.name);
          return (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-900/90 border border-white/10 text-[10px] text-zinc-200"
            >
              {fig?.avatar && (
                <img
                  src={fig.avatar}
                  alt={cmd.name}
                  className="w-3.5 h-3.5 rounded-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <span>{cmd.name}</span>
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
            （共收錄 <b className="text-rose-300">{filteredBattles.length}</b> 場決定天下走向之經典會戰）
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5 text-xs overflow-x-auto">
            {periods.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriodFilter(p.id)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  periodFilter === p.id
                    ? 'bg-rose-600 text-white font-bold shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {p.label}
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
        {filteredBattles.map((battle) => (
          <div
            key={battle.id}
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
                    {battle.year} 年
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
                  {!ancientNamesOnly && ` (今${battle.locationModern})`}
                </span>
              </div>

              {/* Victor Banner */}
              <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-200 mb-3">
                <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold">{battle.victorStatement}</span>
              </div>

              {/* Belligerents Preview with Commander Avatars */}
              <div className="grid grid-cols-2 gap-2.5 text-xs mb-3">
                <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">進攻方軍團</span>
                  <span className="font-bold text-blue-300 truncate block">
                    {battle.attacker.factionName.split('(')[0].split('（')[0]}
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-0.5 block truncate">
                    兵力：{battle.attacker.forcesEstimate.split('，')[0]}
                  </span>
                  {renderCommandersPreview(battle.attacker.commanders)}
                </div>

                <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">迎戰方軍團</span>
                  <span className="font-bold text-emerald-300 truncate block">
                    {battle.defender.factionName.split('(')[0].split('（')[0]}
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-0.5 block truncate">
                    兵力：{battle.defender.forcesEstimate.split('，')[0]}
                  </span>
                  {renderCommandersPreview(battle.defender.commanders)}
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
        ))}
      </div>
    </div>
  );
};
