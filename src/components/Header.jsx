import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  MapPin,
  Users,
  Swords,
  BarChart3,
  Search,
  Calendar,
  Layers,
  X,
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
  globalSearchResults = [],
  onSelectGlobalResult,
  eventCount,
  figureCount,
  battleCount,
  isTaiwanLensMode = false,
  onToggleTaiwanLens,
}) => {
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Support Ctrl+K / Cmd+K global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSpotlightOpen(true);
      } else if (e.key === 'Escape') {
        setIsSpotlightOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close spotlight dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSpotlightOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getEraIcon = (id) => {
    switch (id) {
      case 'xiaShangZhou': return '🏺 ';
      case 'warringStates': return '🏹 ';
      case 'qinHan': return '🏛️ ';
      case 'threeKingdoms': return '⚔️ ';
      case 'weiJin': return '👑 ';
      case 'suiTang': return '🐎 ';
      case 'songLiao': return '🏮 ';
      case 'yuanMing': return '⛵ ';
      case 'qingDynasty': return '🐉 ';
      case 'republicModern': return '🏙️ ';
      default: return '📜 ';
    }
  };

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
                    {periodOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {getEraIcon(opt.id)}
                        {opt.name}（{opt.range}）
                      </option>
                    ))}
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

        {/* Right Tools: Taiwan Lens, Ancient Names Toggle & Cross-Era Global Search */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Taiwan Lens Dedicated Toggle Button */}
          {onToggleTaiwanLens && (
            <button
              onClick={onToggleTaiwanLens}
              title="切換至臺灣四千年歷史縱貫專題視角（Taiwan Chronological Lens）"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all shrink-0 ${
                isTaiwanLensMode
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 border-emerald-400 text-white shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-400/40'
                  : 'bg-emerald-950/40 border-emerald-600/40 text-emerald-300 hover:bg-emerald-900/50 hover:border-emerald-400 hover:text-emerald-100'
              }`}
            >
              <span className="text-sm">🏝️</span>
              <span>{isTaiwanLensMode ? '臺灣專題中' : '臺灣專題視角'}</span>
            </button>
          )}

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

          {/* Global Cross-Era Spotlight Search */}
          <div ref={dropdownRef} className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-amber-400/80 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="跨朝代搜尋人物/戰役/事件 (Ctrl+K)"
              value={searchTerm}
              onFocus={() => setIsSpotlightOpen(true)}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setIsSpotlightOpen(true);
              }}
              className="w-full bg-black/50 border border-white/15 rounded-lg pl-8 pr-6 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  onSearchChange('');
                  setIsSpotlightOpen(false);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200"
              >
                <X className="w-3 h-3" />
              </button>
            )}

            {/* Floating Cross-Era Spotlight Results Dropdown */}
            {isSpotlightOpen && searchTerm.trim().length > 0 && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 max-h-[72vh] overflow-y-auto rounded-xl bg-[#16171d] border border-amber-500/40 shadow-2xl z-50 divide-y divide-white/5">
                <div className="px-3 py-2 bg-amber-950/30 flex items-center justify-between text-[11px] text-amber-200 font-serif">
                  <span>✨ 跨朝代四千年時空檢索結果</span>
                  <span className="text-zinc-400 font-mono">共 {globalSearchResults.length} 筆匹配</span>
                </div>

                {globalSearchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-zinc-500">
                    找不到與「<span className="text-amber-300">{searchTerm}</span>」相符之跨朝代紀錄
                  </div>
                ) : (
                  <div className="py-1">
                    {globalSearchResults.map((res, idx) => {
                      const typeBadge =
                        res.type === 'figure'
                          ? { label: '人物', cls: 'bg-blue-950/80 text-blue-300 border-blue-500/40' }
                          : res.type === 'battle'
                          ? { label: '戰役', cls: 'bg-rose-950/80 text-rose-300 border-rose-500/40' }
                          : { label: '事件', cls: 'bg-amber-950/80 text-amber-300 border-amber-500/40' };

                      const isSamePeriod = res.periodId === activePeriodId;

                      return (
                        <button
                          key={`${res.periodId}_${res.type}_${res.item.id}_${idx}`}
                          type="button"
                          onClick={() => {
                            setIsSpotlightOpen(false);
                            if (onSelectGlobalResult) {
                              onSelectGlobalResult(res);
                            }
                          }}
                          className="w-full px-3 py-2.5 text-left hover:bg-amber-500/10 transition-colors flex items-center justify-between gap-2 group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {res.type === 'figure' && res.item.avatar ? (
                              <img
                                src={res.item.avatar}
                                alt={res.title}
                                className="w-8 h-8 rounded-lg object-cover border border-white/15 shrink-0 bg-zinc-800"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-xs shrink-0">
                                {res.type === 'battle' ? '⚔️' : res.type === 'figure' ? '👤' : '📜'}
                              </div>
                            )}

                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-bold font-serif text-zinc-100 group-hover:text-amber-300 truncate">
                                  {res.title}
                                </span>
                                <span className={`text-[9px] px-1.5 py-0.2 rounded border ${typeBadge.cls}`}>
                                  {typeBadge.label}
                                </span>
                              </div>
                              <div className="text-[10px] text-zinc-400 truncate mt-0.5">
                                {res.subtitle}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full border font-bold whitespace-nowrap ${
                                isSamePeriod
                                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                                  : 'bg-zinc-800 border-white/10 text-zinc-300'
                              }`}
                            >
                              {getEraIcon(res.periodId)}
                              {res.periodName}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
