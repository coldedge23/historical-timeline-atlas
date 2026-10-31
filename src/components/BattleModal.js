import { SourceDisclosure } from './SourceDisclosure.jsx';
import { computeForcesTugOfWar, formatForcePercent } from '../utils/forces.js';
import { Dialog } from './Dialog.jsx';
import { battleAttacker, battleDefender, battleFigureIndex, battleLinkedEvent, resolveCommander } from '../utils/relationRules.js';
import React, { useMemo } from 'react';
import { X, Swords, Trophy, MapPin, ShieldAlert, Crosshair, Layers } from './Icons.js';

export const BattleModal = ({
  battle,
  allFigures = [],
  allEvents = [],
  onClose,
  onSelectFigure,
  onSelectEvent,
  ancientNamesOnly,
}) => {
  if (!battle) return null;

  const figMap = useMemo(() => battleFigureIndex(allFigures), [allFigures]);

  const linkedEvent = useMemo(() => battleLinkedEvent(battle, allEvents), [battle, allEvents]);

  // Robustly extract attacker and defender with backward & cross-period compatibility
  const attacker = useMemo(() => battleAttacker(battle), [battle]);

  const defender = useMemo(() => battleDefender(battle), [battle]);

  const parsedTactics = useMemo(() => {
    if (battle.tactics) {
      if (Array.isArray(battle.tactics)) return battle.tactics;
      if (typeof battle.tactics === 'string') return [battle.tactics];
    }
    if (battle.keyStrategies && Array.isArray(battle.keyStrategies)) {
      return battle.keyStrategies;
    }
    return [];
  }, [battle.tactics, battle.keyStrategies]);

  const renderCommanders = (commanders = []) => {
    if (!commanders || !Array.isArray(commanders)) return null;
    return (
      <div className="flex flex-wrap gap-2">
        {commanders.map((cmd, idx) => {
          if (!cmd) return null;
          const { cmdName, cmdTitle, fig } = resolveCommander(cmd, figMap);

          if (fig && onSelectFigure) {
            return (
              <button
                key={idx}
                onClick={() => {
                  onClose();
                  onSelectFigure(fig);
                }}
                title={`點擊查看【${fig.name}】人物列傳`}
                className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-lg bg-zinc-800/90 hover:bg-amber-950/50 text-zinc-200 hover:text-amber-200 border border-white/10 hover:border-amber-500/50 transition-all text-xs group"
              >
                {fig.avatar && (
                  <img
                    src={fig.avatar}
                    alt={fig.name}
                    className="w-5 h-5 rounded-md object-cover border border-white/15"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <b className="group-hover:text-amber-300">{cmdName}</b>
                {cmdTitle && <span className="text-zinc-400 text-[10px]">({cmdTitle})</span>}
              </button>
            );
          }

          return (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-200 border border-white/5"
            >
              <b>{cmdName}</b> {cmdTitle && <span className="text-zinc-500 text-[10px]">({cmdTitle})</span>}
            </span>
          );
        })}
      </div>
    );
  };

  const victorStatement = battle.victorStatement || battle.result || '勝負已定，詳見概述';
  const locationText = battle.locationAncient || battle.location || '中原腹地';
  const modernLocText = battle.locationModern ? ` (今${battle.locationModern})` : '';

  return (
    <Dialog onClose={onClose} label="戰役詳情">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#16171c] border border-rose-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Battle Banner */}
        <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-rose-950/60 via-zinc-900 to-zinc-900">
          <button
            aria-label="關閉戰役詳情"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-300 shadow-lg shadow-rose-950/40 shrink-0">
                <Swords className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-2xl font-bold font-serif text-rose-200">{battle.name}</h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono">
                    {battle.year} 年
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 border border-white/10 text-zinc-300 font-serif">
                    {battle.eraName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    戰場位置：{locationText}
                    {!ancientNamesOnly && modernLocText}
                  </span>
                </div>
              </div>
            </div>

            {linkedEvent && onSelectEvent && (
              <button
                onClick={() => {
                  onClose();
                  onSelectEvent(linkedEvent);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/20 border border-amber-500/40 text-amber-300 hover:bg-amber-600/30 text-xs font-medium transition-colors shrink-0 self-start sm:self-center"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>於歷史地圖定位戰場</span>
              </button>
            )}
          </div>
        </div>

        {/* Victor Summary Banner */}
        <div className="bg-amber-950/30 border-b border-amber-500/20 px-6 py-2.5 flex items-center gap-2 text-xs text-amber-200">
          <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-bold">勝負結果：</span>
          <span>{victorStatement}</span>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Battle Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              戰役始末概述
            </h3>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5 text-justify">
              {battle.summary}
            </p>
          </div>

          {/* Belligerents Side-by-Side Comparison */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>參戰雙方兵力、統帥與傷亡對比</span>
              </h3>
              <span className="text-[11px] text-amber-400/80">
                💡 點擊將領名牌可直接開啟人物列傳
              </span>
            </div>

            {/* Tug-of-War Visual Forces Bar */}
            {(() => {
              const tug = computeForcesTugOfWar(attacker.forcesEstimate, defender.forcesEstimate);
              if (!tug.comparable) return <p className="text-sm text-zinc-300 py-2">兵力資料不足或為模糊估計，無法比較比例。</p>;
              return (
                <div className="mb-3.5 p-3 rounded-xl bg-zinc-900/90 border border-white/10 space-y-2 shadow-inner">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400 inline-block shadow" />
                      <span className="font-bold text-blue-300">
                        {attacker.factionName || '進攻方'}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        ({formatForcePercent(tug.atkPct)}%)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {tug.isDisparity && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-[10px]">
                          ⚡ 兵力懸殊對決
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-black/50 border border-white/10 text-zinc-200 font-mono text-[11px]">
                        依記載估計兵力比 {tug.ratioText}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-zinc-400 font-mono">
                        ({formatForcePercent(tug.defPct)}%)
                      </span>
                      <span className="font-bold text-emerald-300">
                        {defender.factionName || '迎戰方'}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow" />
                    </div>
                  </div>

                  <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden flex border border-white/10">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Attacker Box */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-zinc-400 font-bold">進攻方</span>
                  <span className="text-sm font-bold text-blue-300 font-serif">
                    {attacker.factionName || '進攻方'}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-500 block mb-1.5">主要統帥 / 指揮官：</span>
                  {renderCommanders(attacker.commanders)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-black/30 p-2 rounded">
                    <span className="text-[10px] text-zinc-500 block">兵力估算</span>
                    <span className="font-bold text-zinc-200">{attacker.forcesEstimate || '不詳'}</span>
                  </div>
                  <div className="bg-black/30 p-2 rounded">
                    <span className="text-[10px] text-zinc-500 block">死傷與戰損</span>
                    <span className="font-bold text-rose-400">{attacker.casualtiesEstimate || '不詳'}</span>
                  </div>
                </div>
              </div>

              {/* Defender Box */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-zinc-400 font-bold">防守 / 迎戰方</span>
                  <span className="text-sm font-bold text-emerald-300 font-serif">
                    {defender.factionName || '迎戰方'}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-500 block mb-1.5">主要統帥 / 指揮官：</span>
                  {renderCommanders(defender.commanders)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-black/30 p-2 rounded">
                    <span className="text-[10px] text-zinc-500 block">兵力估算</span>
                    <span className="font-bold text-zinc-200">{defender.forcesEstimate || '不詳'}</span>
                  </div>
                  <div className="bg-black/30 p-2 rounded">
                    <span className="text-[10px] text-zinc-500 block">死傷與戰損</span>
                    <span className="font-bold text-emerald-400">{defender.casualtiesEstimate || '不詳'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Tactics */}
          {parsedTactics.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                <Crosshair className="w-4 h-4 text-amber-400" />
                <span>勝敗關鍵戰術剖析</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {parsedTactics.map((tac, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-zinc-900/60 border border-white/5 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-zinc-300 leading-relaxed">{tac}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategic Outcome & Historical Significance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5">
              <h4 className="font-bold text-amber-300 mb-1 flex items-center gap-1 font-serif">
                <span>戰略後續影響</span>
              </h4>
              <p className="text-zinc-400 leading-relaxed">
                {battle.strategicOutcome || battle.result || '奠定歷史深遠轉折'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5">
              <h4 className="font-bold text-rose-300 mb-1 flex items-center gap-1 font-serif">
                <span>歷史軍事地位</span>
              </h4>
              <p className="text-zinc-400 leading-relaxed">
                {battle.significance || battle.strategicSignificance || '三代著名歷史會戰'}
              </p>
            </div>
          </div>
          <SourceDisclosure record={battle} />
        </div>
      </div>
    </Dialog>
  );
};
