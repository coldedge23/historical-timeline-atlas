import React, { useState, useEffect, useRef } from 'react';
import { Compass, Search, X, Layers, Users, Swords, MapPin, BarChart3 } from './Icons.js';
import { CIVILIZATIONS, DEFAULT_CIV, civById } from '../civilizations/registry.js';

export const Header = ({
  currentPeriod,
  activePeriodId = 'threeKingdoms',
  onSelectPeriodId,
  periodOptions = [],
  eraOptionsByCiv = {},
  currentPeriodShortEra = '西元 184 — 280 年',
  ancientNamesOnly,
  onToggleAncientNames,
  activeTab,
  onSelectTab,
  searchTerm,
  onSearchChange,
  globalSearchResults = [],
  // The search index loads on first focus (plan v2 section 3.4): idle | loading | ready | error.
  searchStatus = 'ready',
  onRequestSearchIndex,
  onSelectGlobalResult,
  eventCount,
  figureCount,
  battleCount,
  civilizationMode = DEFAULT_CIV.id,
  onSelectCivilizationMode,
  // The era shown, for civilizations navigated by era.
  activeEraId = '',
  onSelectEraId,
}) => {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const input = useRef(null);
  const searchBox = useRef(null);
  useEffect(() => {
    const key = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); input.current?.focus(); setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const outside = (e) => { if (!searchBox.current?.contains(e.target)) setOpen(false); };
    window.addEventListener('keydown', key);
    document.addEventListener('pointerdown', outside);
    return () => { window.removeEventListener('keydown', key); document.removeEventListener('pointerdown', outside); };
  }, []);
  useEffect(() => setCursor(0), [searchTerm]);
  const byPeriod = civById(civilizationMode)?.unit !== 'era';
  const eraOptions = eraOptionsByCiv[civilizationMode] || [];
  const tabs = [
    ['map-timeline', '地圖與年表', Layers],
    ['figures', '人物誌', Users],
    ['battles', '戰役錄', Swords],
  ];
  const choose = (res) => { setOpen(false); onSelectGlobalResult?.(res); input.current?.blur(); };
  return (
    <header className="atlas-header">
      <a className="skip-link" href="#main-content" onClick={(e) => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>跳至主要內容</a>
      <div className="header-top">
        <button type="button" className="atlas-brand" onClick={() => onSelectTab('map-timeline')} aria-label="歷史星圖，返回地圖與年表">
          <Compass aria-hidden="true" className="w-8 h-8" />
          <span>歷史星圖<small>年代・疆域・人物</small></span>
        </button>
        <div ref={searchBox} className="atlas-search">
          <Search aria-hidden="true" className="w-4 h-4" />
          <input ref={input} value={searchTerm} placeholder="搜尋全部歷史" aria-label="搜尋華夏、臺灣、日本的人物、戰役與事件"
            role="combobox" aria-expanded={open && !!searchTerm.trim()} aria-controls="history-search-results" aria-autocomplete="list"
            aria-activedescendant={open && globalSearchResults[cursor] ? `search-result-${cursor}` : undefined}
            onFocus={() => { setOpen(true); onRequestSearchIndex?.(); }}
            onChange={(e) => { onSearchChange(e.target.value); setOpen(true); onRequestSearchIndex?.(); }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setCursor((n) => Math.min(n + 1, globalSearchResults.length - 1)); }
              if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((n) => Math.max(n - 1, 0)); }
              if (e.key === 'Enter' && open && globalSearchResults[cursor]) { e.preventDefault(); choose(globalSearchResults[cursor]); }
            }} />
          {searchTerm ? <button className="search-clear" onClick={() => { onSearchChange(''); input.current?.focus(); }} aria-label="清除搜尋"><X className="w-4 h-4" /></button> : <kbd>Ctrl K</kbd>}
          {open && searchTerm.trim() && <div className="search-results">
            <p className="search-caption" role="status">全體系搜尋・最多顯示 24 筆</p>
            <div id="history-search-results" role="listbox" aria-label="歷史搜尋結果">
              {searchStatus === 'ready' && !globalSearchResults.length && <p className="search-empty">找不到「{searchTerm}」，請試試人物別名或事件名稱。</p>}
              {(searchStatus === 'loading' || searchStatus === 'idle') && <p className="search-empty" role="status">搜尋索引載入中…</p>}
              {searchStatus === 'error' && <p className="search-empty" role="alert">搜尋索引載入失敗。<button type="button" className="data-retry" onMouseDown={(e) => e.preventDefault()} onClick={() => onRequestSearchIndex?.()}>重試</button></p>}
              {globalSearchResults.map((res, i) => <div key={`${res.periodId}-${res.type}-${res.item.id}-${i}`} id={`search-result-${i}`} role="option" aria-selected={cursor === i}
                onMouseDown={(e) => e.preventDefault()} onClick={() => choose(res)} className={`search-result ${cursor === i ? 'is-active' : ''}`}>
                <div><strong>{res.title}</strong><small>{res.subtitle}</small></div>
                <span>{res.type === 'figure' ? '人物' : res.type === 'battle' ? '戰役' : '事件'}<small>{res.periodName}</small></span>
              </div>)}
            </div>
          </div>}
        </div>
      </div>
      <div className="header-navigation">
        <div className="context-selectors">
          <label><span>歷史體系</span><select aria-label="歷史體系" value={civilizationMode} onChange={(e) => onSelectCivilizationMode(e.target.value)}>
            {CIVILIZATIONS.map((civ) => <option key={civ.id} value={civ.id}>{civ.name}</option>)}
          </select></label>
          <label><span>時期</span>{byPeriod ?
            <select aria-label="時期" value={activePeriodId} onChange={(e) => onSelectPeriodId(e.target.value)}>{periodOptions.map((o) => <option key={o.id} value={o.id}>{o.name}（{o.range}）</option>)}</select> :
            <select aria-label="時期" value={activeEraId} onChange={(e) => onSelectEraId(e.target.value)}>
              {eraOptions.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>}
          </label>
        </div>
        <nav aria-label="主要功能" className="primary-navigation">
          {tabs.map(([id, name, Icon]) => <button key={id} type="button" aria-current={activeTab === id ? 'page' : undefined} onClick={() => onSelectTab(id)}><Icon aria-hidden="true" className="w-4 h-4" /><span>{name}</span></button>)}
        </nav>
        <details className="header-tools"><summary>閱讀設定</summary><div>
          <button onClick={onToggleAncientNames} aria-pressed={ancientNamesOnly}><MapPin className="w-4 h-4" />{ancientNamesOnly ? '目前：僅古地名' : '目前：古今地名對照'}</button>
          {civById(civilizationMode)?.features.demographics && <button onClick={() => onSelectTab('demographics')}><BarChart3 className="w-4 h-4" />人口與民族</button>}
        </div></details>
      </div>
      <div className="header-context" aria-live="polite"><span>{byPeriod ? currentPeriodShortEra : eraOptions.find((o) => o.id === activeEraId)?.name}</span><span>{eventCount} 事件・{figureCount} 人物・{battleCount} 戰役</span></div>
    </header>
  );
};
