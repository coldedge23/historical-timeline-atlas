import React from 'react';
import { TAIWAN_LENS_ERAS } from '../data/taiwanLensData.js';
import { Compass, X, Sparkles, MapPin, Calendar } from './Icons.js';

export const TaiwanLensBanner = ({
  activeTaiwanEraId,
  onSelectTaiwanEraId,
  onExitTaiwanLens,
  currentEraConfig,
  eventCount,
  figureCount,
  battleCount
}) => {
  return (
    <div className="w-full mb-3 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#102419]/90 to-emerald-950/80 border border-emerald-500/40 p-3 sm:p-4 shadow-xl shadow-emerald-950/30 backdrop-blur-md">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-500/20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-md shadow-emerald-900/40 shrink-0">
            <span className="text-lg">🏝️</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold font-serif text-emerald-200 tracking-wide flex items-center gap-1.5">
                <span>臺灣歷史縱貫專題視角</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-sans border border-emerald-500/40 font-normal">
                  Taiwan Chronological Lens
                </span>
              </h2>
            </div>
            <p className="text-xs text-emerald-300/80 mt-0.5 font-sans">
              南島大肚王國 • 荷西大航海 • 明鄭東寧 • 清領建省 • 乙未文化啟蒙 • 戰後防衛 • 全球高科技矽島與民主轉型
            </p>
          </div>
        </div>

        {/* Exit Button */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={onExitTaiwanLens}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-all shadow-sm"
            title="退出臺灣專題視角，返回朝代全通史模式"
          >
            <X className="w-3.5 h-3.5 text-zinc-400" />
            <span>返回全通史</span>
          </button>
        </div>
      </div>

      {/* 8 Chronological Eras Quick Navigator Pills */}
      <div className="mt-3 overflow-x-auto pb-1 flex items-center gap-2 no-scrollbar">
        {TAIWAN_LENS_ERAS.map((era, idx) => {
          const isActive = era.id === activeTaiwanEraId;
          return (
            <button
              key={era.id}
              onClick={() => onSelectTaiwanEraId(era.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 border ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-300 shadow-md shadow-emerald-900/50 scale-[1.02]'
                  : 'bg-black/40 hover:bg-emerald-950/60 text-emerald-200/80 hover:text-emerald-100 border-emerald-500/20'
              }`}
            >
              <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
              <span className="font-serif font-bold">{era.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({era.dateRangeDisplay.split(' ')[0]})</span>
            </button>
          );
        })}
      </div>

      {/* Current Active Era Summary Card */}
      {currentEraConfig && (
        <div className="mt-2.5 px-3 py-2 rounded-xl bg-black/40 border border-emerald-500/20 text-xs text-emerald-100/90 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold font-serif border border-emerald-500/30">
              {currentEraConfig.tagline}
            </span>
            <span className="font-bold text-amber-200">{currentEraConfig.name}</span>
            <span className="text-zinc-400 font-mono">（{currentEraConfig.dateRangeDisplay}）</span>
          </div>
          <p className="text-[11px] text-zinc-300 line-clamp-1 flex-1 md:text-right">
            {currentEraConfig.description}
          </p>
        </div>
      )}
    </div>
  );
};
