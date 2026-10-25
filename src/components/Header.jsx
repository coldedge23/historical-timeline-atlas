import React from 'react';
import { 
  Compass, 
  MapPin, 
  Users, 
  Swords, 
  BarChart3, 
  Search, 
  Calendar,
  Layers,
  X
} from './Icons.js';

export const Header = ({
  currentPeriod,
  activePeriodId = 'threeKingdoms',
  onSelectPeriodId,
  periodOptions = [],
  currentPeriodShortEra = '西元 184 — 280 年',
  ancientNamesOnly,
  onToggleAncientNames,
  activeTab,
  onSelectTab,
  searchTerm,
  onSearchChange,
  eventCount,
  figureCount,
  battleCount,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo and Period Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div
            onClick={() => onSelectTab('map-timeline')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600/30 to-amber-900/60 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-lg shadow-amber-950/40 group-hover:border-amber-400 transition-colors">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-bold font-serif tracking-wider text-amber-200 group-hover:text-amber-100 transition-colors">
                  歷史星圖
                </h1>
                
                {/* Epoch Switcher Dropdown */}
                {onSelectPeriodId ? (
                  <select
                    value={activePeriodId}
                    onChange={(e) => onSelectPeriodId(e.target.value)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#1f1a14] border border-amber-500/50 text-amber-300 font-bold focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer shadow-sm"
                  >
                    {periodOptions.map((opt) => {
                      const icon =
                        opt.id === 'xiaShangZhou' ? '🏺 ' :
                        opt.id === 'warringStates' ? '🏹 ' :
                        opt.id === 'qinHan' ? '🏛️ ' :
                        opt.id === 'threeKingdoms' ? '⚔️ ' :
                        opt.id === 'weiJin' ? '👑 ' :
                        opt.id === 'suiTang' ? '🐎 ' :
                        opt.id === 'songLiao' ? '🏮 ' : '📜 ';
                      return (
                        <option key={opt.id} value={opt.id}>
                          {icon}{opt.name}（{opt.range}）
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
                    {currentPeriod}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                <span>華夏與臺灣時空總覽</span>
                <span>•</span>
                <span className="text-amber-400/90 font-mono font-medium">{currentPeriodShortEra}</span>
              </p>
            </div>
          </div>

          {/* Clickable Quick Stats */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
            <button
              onClick={() => onSelectTab('map-timeline')}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <b>{eventCount}</b> 事件
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={() => onSelectTab('figures')}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <b>{figureCount}</b> 人物
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={() => onSelectTab('battles')}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Swords className="w-3.5 h-3.5 text-rose-400" />
              <b>{battleCount}</b> 戰役
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-zinc-900/80 p-1 rounded-xl border border-white/5 text-xs w-full md:w-auto overflow-x-auto justify-center">
          <button
            onClick={() => onSelectTab('map-timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap ${
              activeTab === 'map-timeline'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>時空地圖與時間軸</span>
          </button>

          <button
            onClick={() => onSelectTab('figures')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap ${
              activeTab === 'figures'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>歷史人物誌 ({figureCount})</span>
          </button>

          <button
            onClick={() => onSelectTab('battles')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap ${
              activeTab === 'battles'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>重大戰役錄 ({battleCount})</span>
          </button>

          <button
            onClick={() => onSelectTab('demographics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap ${
              activeTab === 'demographics'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>人口與民族</span>
          </button>
        </div>

        {/* Right Tools: Ancient Names Toggle & Global Search */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Ancient / Modern Toggle Button */}
          <button
            onClick={onToggleAncientNames}
            title="切換僅顯示當代古地名或附帶現代地名對照"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors shrink-0 ${
              ancientNamesOnly
                ? 'bg-amber-950/40 border-amber-600/50 text-amber-300'
                : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300 hover:border-zinc-500'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{ancientNamesOnly ? '古地名專注' : '古今地名對照'}</span>
          </button>

          {/* Global Quick Search */}
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="全域搜尋事件/人物/戰役..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-6 py-1 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/70 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
