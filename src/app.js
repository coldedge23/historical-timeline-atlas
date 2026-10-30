import React, { useState, useMemo, useEffect, useRef, lazy, Suspense } from 'react';
import { Header } from './components/Header.jsx';
const HistoricalAtlasMap = lazy(() => import('./components/HistoricalAtlasMap.jsx').then(m => ({default: m.HistoricalAtlasMap})));
const TaiwanAtlasMap = lazy(() => import('./components/TaiwanAtlasMap.jsx').then(m => ({default: m.TaiwanAtlasMap})));
const JapanAtlasMap = lazy(() => import('./components/JapanAtlasMap.jsx').then(m => ({default: m.JapanAtlasMap})));
import { Timeline } from './components/Timeline.js';
import { FigureModal } from './components/FigureModal.js';
import { BattleModal } from './components/BattleModal.js';
import { DemographicsModal } from './components/DemographicsModal.js';
const FiguresView = lazy(() => import('./components/FiguresView.js').then(m => ({default: m.FiguresView})));
const BattlesView = lazy(() => import('./components/BattlesView.js').then(m => ({default: m.BattlesView})));
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { X } from './components/Icons.js';
import { PERIOD_OPTIONS } from './data/periodsRegistry.js';
import { LINKED_PERIODS as HISTORICAL_PERIODS, LINKED_TAIWAN_EVENTS, LINKED_JAPAN_EVENTS, LINKED_JAPAN_FIGURES, LINKED_TAIWAN_FIGURES, ALL_LINKED_FIGURES, ALL_LINKED_EVENTS, ALL_LINKED_BATTLES } from './data/linkedHistoryCatalog.js';
import {
  TAIWAN_LENS_ERAS,
  TAIWAN_RELATED_BATTLES,
  ERA_BATTLE_IDS,
} from './data/taiwanLensData.js';
import {
  JAPAN_ERAS,
  JAPAN_BATTLES,
  JAPAN_ALL_EVENTS,
  JAPAN_ERA_BATTLE_IDS,
} from './data/japan/index.js';

import { parseNavigationHash, serializeNavigation, resolveNavigation, unknownRouteParts } from './utils/navigation.js';
import { useGlobalSearch } from './hooks/useGlobalSearch.js';

export function App() {
  const initialHash = useMemo(() => parseNavigationHash(window.location.hash), []);
  const initialPeriodId =
    initialHash.period && HISTORICAL_PERIODS[initialHash.period]
      ? initialHash.period
      : 'yuanMing';

  const [activePeriodId, setActivePeriodId] = useState(initialPeriodId);
  // The notice belongs to the view it fell back to; navigating elsewhere hides it.
  const [routeNotice, setRouteNotice] = useState(() => ({ ...unknownRouteParts(window.location.hash, id => !!HISTORICAL_PERIODS[id]), at: `${initialHash.civ}:${initialPeriodId}` }));
  const [activeTab, setActiveTab] = useState(
    ['map-timeline', 'figures', 'battles'].includes(initialHash.tab)
      ? initialHash.tab
      : 'map-timeline'
  );
  const [ancientNamesOnly, setAncientNamesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [timelineSearch, setTimelineSearch] = useState('');
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [mobileSurface, setMobileSurface] = useState('timeline');
  const lastNavigation = useRef(null);

  // Multi-Civilization Mode States ('china' | 'taiwan' | 'japan')
  const initialCiv = initialHash.civ;
  const [civilizationMode, setCivilizationMode] = useState(initialCiv);
  const isTaiwanLensMode = civilizationMode === 'taiwan';
  const isJapanMode = civilizationMode === 'japan';

  const [activeTaiwanEraId, setActiveTaiwanEraId] = useState(() => TAIWAN_LENS_ERAS.find(era => (era.keyEvents || []).some(event => event.id === initialHash.event))?.id ||
    Object.entries(ERA_BATTLE_IDS).find(([, ids]) => ids.includes(initialHash.battle))?.[0] ||
    (TAIWAN_LENS_ERAS.some(e => e.id === initialHash.era) ? initialHash.era : 'tw_tungning'));


  const [activeJapanEraId, setActiveJapanEraId] = useState(() => JAPAN_ALL_EVENTS.find(event => event.id === initialHash.event)?.eraId ||
    Object.entries(JAPAN_ERA_BATTLE_IDS).find(([, ids]) => ids.includes(initialHash.battle))?.[0] ||
    (JAPAN_ERAS.some(e => e.id === initialHash.era) ? initialHash.era : 'jp_sengoku'));


  const normalizedJapanFigures = LINKED_JAPAN_FIGURES;
  const allFiguresPool = ALL_LINKED_FIGURES;
  const taiwanLensEvents = LINKED_TAIWAN_EVENTS;
  const japanEvents = LINKED_JAPAN_EVENTS;

  // All China Events across all periods for cross-civilization contemporary reference
  const allChinaEvents = useMemo(() => {
    const list = [];
    for (const [periodId, p] of Object.entries(HISTORICAL_PERIODS)) {
      for (const evt of p.events || []) {
        list.push({ ...evt, periodId, periodName: p.name });
      }
    }
    return list.sort((a, b) => a.year - b.year);
  }, []);

  const crossCivPools = useMemo(
    () => ({
      china: allChinaEvents,
      taiwan: taiwanLensEvents,
      japan: japanEvents,
    }),
    [allChinaEvents, taiwanLensEvents, japanEvents]
  );

  const handleJumpToCrossCivEvent = (targetCiv, targetEvt) => {
    if (!targetEvt) return;
    setTimelineSearch('');
    setActiveTab('map-timeline');
    setMobileSurface('timeline');
    setIsCinemaMode(false);
    setSearchTerm('');
    setSelectedFigure(null);
    setSelectedBattle(null);

    if (targetCiv === 'japan') {
      setCivilizationMode('japan');
      if (targetEvt.eraId) setActiveJapanEraId(targetEvt.eraId);
      setSelectedEvent({ ...targetEvt, _scrollTs: Date.now() });
    } else if (targetCiv === 'taiwan') {
      setCivilizationMode('taiwan');
      if (targetEvt.eraId) setActiveTaiwanEraId(targetEvt.eraId);
      setSelectedEvent({ ...targetEvt, _scrollTs: Date.now() });
    } else if (targetCiv === 'china') {
      setCivilizationMode('china');
      if (targetEvt.periodId && HISTORICAL_PERIODS[targetEvt.periodId]) {
        setActivePeriodId(targetEvt.periodId);
      }
      setSelectedEvent({ ...targetEvt, _scrollTs: Date.now() });
    }
  };

  const taiwanLensFigures = LINKED_TAIWAN_FIGURES;

  const currentEraConfig = useMemo(() => {
    if (civilizationMode === 'japan') {
      return JAPAN_ERAS.find((e) => e.id === activeJapanEraId) || JAPAN_ERAS[1];
    }
    if (civilizationMode === 'taiwan') {
      return TAIWAN_LENS_ERAS.find((e) => e.id === activeTaiwanEraId) || TAIWAN_LENS_ERAS[2];
    }
    return null;
  }, [civilizationMode, activeTaiwanEraId, activeJapanEraId]);

  // Active Datasets (dynamically swapped between China Dynasties, Taiwan Lens & Japan Atlas)
  const currentPeriodConfig = HISTORICAL_PERIODS[activePeriodId] || HISTORICAL_PERIODS.qinHan;
  const currentEvents =
    civilizationMode === 'japan'
      ? japanEvents
      : isTaiwanLensMode
      ? taiwanLensEvents
      : currentPeriodConfig.events || [];
  const currentFigures =
    civilizationMode === 'japan'
      ? normalizedJapanFigures
      : isTaiwanLensMode
      ? taiwanLensFigures
      : currentPeriodConfig.figures || [];
  const currentBattles =
    civilizationMode === 'japan'
      ? JAPAN_BATTLES
      : isTaiwanLensMode
      ? TAIWAN_RELATED_BATTLES
      : currentPeriodConfig.battles || [];
  const currentTerritories = currentPeriodConfig.territories;
  const currentWarlordPeriods = currentPeriodConfig.warlordPeriods || [];
  const currentDemographics = currentPeriodConfig.demographics;

  const [selectedEvent, setSelectedEvent] = useState(() => {
    const evts = currentEvents;
    if (initialHash.event) {
      const found = evts.find((e) => e.id === initialHash.event);
      if (found) return found;
    }
    return evts.find(e => initialCiv === 'china' || e.eraId === (initialCiv === 'japan' ? activeJapanEraId : activeTaiwanEraId)) || evts[0] || null;
  });

  const [selectedFigure, setSelectedFigure] = useState(() => {
    if (!initialHash.figure) return null;
    const figs = currentFigures;
    return figs.find((f) => f.id === initialHash.figure) || null;
  });

  const [selectedBattle, setSelectedBattle] = useState(() => {
    if (!initialHash.battle) return null;
    const bats = currentBattles;
    return bats.find((b) => b.id === initialHash.battle) || null;
  });

  const [showDemographicsModal, setShowDemographicsModal] = useState(false);

  const catalogs = useMemo(() => ({ ...HISTORICAL_PERIODS,
    taiwan: {id:'taiwanLens', civ:'taiwan', name:'臺灣歷史', events:taiwanLensEvents, figures:taiwanLensFigures, battles:TAIWAN_RELATED_BATTLES.map(b => ({...b, eraId:Object.entries(ERA_BATTLE_IDS).find(([, ids]) => ids.includes(b.id))?.[0]}))},
    japan: {id:'japanAtlas', civ:'japan', name:'日本歷史', events:japanEvents, figures:normalizedJapanFigures, battles:JAPAN_BATTLES.map(b => ({...b, eraId:Object.entries(JAPAN_ERA_BATTLE_IDS).find(([, ids]) => ids.includes(b.id))?.[0]}))}
  }), [taiwanLensEvents, taiwanLensFigures, japanEvents, normalizedJapanFigures]);

  useEffect(() => {
    const restore = () => {
      const route = resolveNavigation(window.location.hash, catalogs, {taiwan:TAIWAN_LENS_ERAS, japan:JAPAN_ERAS});
      lastNavigation.current = serializeNavigation(route);
      setRouteNotice({ ...route.unknown, at: `${route.civ}:${route.period}` });
      setCivilizationMode(route.civ);
      setActivePeriodId(route.period);
      setActiveTab(route.tab);
      if (route.civ === 'taiwan') setActiveTaiwanEraId(route.era);
      if (route.civ === 'japan') setActiveJapanEraId(route.era);
      setSelectedEvent(route.selectedEvent);
      setSelectedFigure(route.selectedFigure);
      setSelectedBattle(route.selectedBattle);
      setShowDemographicsModal(false);
      setSearchTerm('');
      setIsCinemaMode(false);
    };
    window.addEventListener('popstate', restore);
    window.addEventListener('hashchange', restore);
    return () => { window.removeEventListener('popstate', restore); window.removeEventListener('hashchange', restore); };
  }, [catalogs]);

  useEffect(() => {
    const hash = serializeNavigation({civ:civilizationMode, period:activePeriodId,
      era:civilizationMode === 'japan' ? activeJapanEraId : activeTaiwanEraId,
      tab:activeTab, event:selectedEvent?.id, figure:selectedFigure?.id, battle:selectedBattle?.id});
    if (lastNavigation.current === hash) return;
    if (lastNavigation.current === null) window.history.replaceState(null, '', hash);
    else if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    lastNavigation.current = hash;
  }, [civilizationMode, activePeriodId, activeTab, activeTaiwanEraId, activeJapanEraId, selectedEvent?.id, selectedFigure?.id, selectedBattle?.id]);

  // Handle Civilization Mode Switching (華夏 / 臺灣 / 日本 三大文明體系)
  const handleSelectCivilizationMode = (mode) => {
    setCivilizationMode(mode);
    setSelectedFigure(null);
    setSelectedBattle(null);
    if (mode === 'japan') {
      const targetEra = JAPAN_ERAS.find((e) => e.id === activeJapanEraId) || JAPAN_ERAS[1];
      const found = japanEvents.find((e) => e.eraId === targetEra.id) || japanEvents[0];
      setSelectedEvent(found || null);
    } else if (mode === 'taiwan') {
      const targetEra = TAIWAN_LENS_ERAS.find((e) => e.id === activeTaiwanEraId) || TAIWAN_LENS_ERAS[2];
      const found = taiwanLensEvents.find((e) => e.eraId === targetEra.id) || taiwanLensEvents[0];
      setSelectedEvent(found || null);
    } else {
      const curEvts = (HISTORICAL_PERIODS[activePeriodId] || HISTORICAL_PERIODS.yuanMing).events || [];
      setSelectedEvent(curEvts[0] || null);
    }
  };

  // Handle Epoch / Period Switching (華夏朝代選單切換)
  const handleSelectPeriodId = (periodId) => {
    if (!HISTORICAL_PERIODS[periodId]) return;
    setCivilizationMode('china');
    setActivePeriodId(periodId);
    const newConfig = HISTORICAL_PERIODS[periodId];
    if (newConfig.events && newConfig.events.length > 0) {
      setSelectedEvent(newConfig.events[0]);
    } else {
      setSelectedEvent(null);
    }
    setSelectedFigure(null);
    setSelectedBattle(null);
    setSearchTerm('');
  };

  // Handle Taiwan Era Select (臺灣專題紀元切換)
  const handleSelectTaiwanEraId = (eraId) => {
    setCivilizationMode('taiwan');
    setActiveTaiwanEraId(eraId);
    setSearchTerm('');
    const targetEra = TAIWAN_LENS_ERAS.find((e) => e.id === eraId);
    if (targetEra && targetEra.keyEvents && targetEra.keyEvents.length > 0) {
      const found = taiwanLensEvents.find((e) => e.id === targetEra.keyEvents[0].id);
      if (found) {
        setSelectedEvent({ ...found, _scrollTs: Date.now() });
      }
    }
    setSelectedFigure(null);
    setSelectedBattle(null);
  };

  // Handle Japan Era Select (日本歷史紀元切換)
  const handleSelectJapanEraId = (eraId) => {
    setCivilizationMode('japan');
    setActiveJapanEraId(eraId);
    setSearchTerm('');
    const targetEra = JAPAN_ERAS.find((e) => e.id === eraId);
    if (targetEra && targetEra.keyEvents && targetEra.keyEvents.length > 0) {
      const found = japanEvents.find((e) => e.eraId === targetEra.id) || japanEvents[0];
      if (found) {
        setSelectedEvent({ ...found, _scrollTs: Date.now() });
      }
    }
    setSelectedFigure(null);
    setSelectedBattle(null);
  };

  const searchDatasets = useMemo(() => Object.values(catalogs), [catalogs]);
  const globalSearchResults = useGlobalSearch(searchDatasets, searchTerm, civilizationMode === 'china' ? activePeriodId : civilizationMode === 'japan' ? 'japanAtlas' : 'taiwanLens');
  const handleSelectGlobalResult = (res) => {
    if (!res) return;
    setTimelineSearch('');
    const civ = res.civ || 'china';
    setCivilizationMode(civ);
    const dataset = civ === 'china' ? catalogs[res.periodId] : catalogs[civ];
    if (!dataset) return;
    if (civ === 'china') setActivePeriodId(res.periodId);
    const activeEra = civ === 'japan' ? activeJapanEraId : activeTaiwanEraId;
    const targetEra = res.eraId || activeEra;
    const event = res.type === 'event' ? res.item : dataset.events.find(e => targetEra && e.eraId === targetEra) || dataset.events[0] || null;
    setSelectedEvent(event);
    if (civ === 'japan' && event?.eraId) setActiveJapanEraId(event.eraId);
    if (civ === 'taiwan' && event?.eraId) setActiveTaiwanEraId(event.eraId);
    setSelectedFigure(res.type === 'figure' ? res.item : null);
    setSelectedBattle(res.type === 'battle' ? res.item : null);
    setActiveTab(res.type === 'event' ? 'map-timeline' : res.type === 'figure' ? 'figures' : 'battles');
    setSearchTerm('');
    setIsCinemaMode(false);
  };
  // The timeline tag filter is local and does not alter the global search input.
  useEffect(() => setTimelineSearch(''), [civilizationMode, activePeriodId, activeTaiwanEraId, activeJapanEraId]);
  const eventsForTimeline = useMemo(() => {
    const q = timelineSearch.trim().toLowerCase();
    if (!q) return currentEvents;
    return currentEvents.filter(event => [event.title, event.summary, event.detail,
      event.locationNameAncient, event.locationNameModern, ...(event.tags || [])]
      .filter(Boolean).join(' ').toLowerCase().includes(q));
  }, [currentEvents, timelineSearch]);

  const handleSelectEvent = (evt) => {
    const target = currentEvents.find(event => event.id === evt?.id) || evt;
    if (target?.datasetId && target.datasetId !== (civilizationMode === 'china' ? activePeriodId : civilizationMode === 'taiwan' ? 'taiwanLens' : 'japanAtlas')) {
      const civ = target.civ || (target.datasetId === 'taiwanLens' ? 'taiwan' : target.datasetId === 'japanAtlas' ? 'japan' : 'china');
      setCivilizationMode(civ);
      if (civ === 'china') setActivePeriodId(target.datasetId);
      if (civ === 'taiwan' && target.eraId) setActiveTaiwanEraId(target.eraId);
      if (civ === 'japan' && target.eraId) setActiveJapanEraId(target.eraId);
    }
    setTimelineSearch('');
    setMobileSurface('timeline');
    setSelectedEvent(target);
    if (isTaiwanLensMode && target?.eraId && target.eraId !== activeTaiwanEraId) {
      setActiveTaiwanEraId(target.eraId);
    }
    if (civilizationMode === 'japan' && target?.eraId && target.eraId !== activeJapanEraId) {
      setActiveJapanEraId(target.eraId);
    }
  };

  const handleSelectBattle = (bat) => {
    setSelectedFigure(null);
    setSelectedBattle(bat);
    if (civilizationMode === 'japan' && bat?.id) {
      const era = Object.entries(JAPAN_ERA_BATTLE_IDS).find(([, ids]) => ids.includes(bat.id))?.[0];
      if (era) {
        setActiveJapanEraId(era);
        setSelectedEvent(japanEvents.find(event => event.eraId === era) || null);
      }
    }
    if (isTaiwanLensMode && bat?.id) {
      const eraEntry = Object.entries(ERA_BATTLE_IDS).find(([_, bIds]) => bIds.includes(bat.id));
      if (eraEntry && eraEntry[0] !== activeTaiwanEraId) {
        setActiveTaiwanEraId(eraEntry[0]);
        setSelectedEvent(taiwanLensEvents.find(event => event.eraId === eraEntry[0]) || null);
      }
    }
  };

  const handleSelectFigure = (figure) => {
    const target = currentFigures.find(item => item.id === figure?.id) || figure;
    if (!target) return;
    const scope = target.datasetId;
    if (scope && !currentFigures.some(item => item.id === target.id)) {
      const civ = target.civ || (scope === 'taiwanLens' ? 'taiwan' : scope === 'japanAtlas' ? 'japan' : 'china');
      setCivilizationMode(civ);
      if (civ === 'china') setActivePeriodId(scope);
      if (civ === 'japan') setActiveJapanEraId(target.eraId || 'jp_sengoku');
      if (civ === 'taiwan') setActiveTaiwanEraId(target.eraId || 'tw_tungning');
      const events = civ === 'china' ? HISTORICAL_PERIODS[scope]?.events : civ === 'japan' ? japanEvents : taiwanLensEvents;
      setSelectedEvent(events?.find(event => !target.eraId || event.eraId === target.eraId) || events?.[0] || null);
    }
    setSelectedBattle(null);
    setSelectedFigure(target);
  };
  const figuresForLinks = [...currentFigures, ...allFiguresPool.filter(figure => !currentFigures.some(local => local.id === figure.id))];
  const eventsForLinks = [...currentEvents, ...ALL_LINKED_EVENTS.filter(event => !currentEvents.some(local => local.id === event.id))];

  const handleSelectFigureById = (figId) => {
    const fig = figuresForLinks.find((f) => f.id === figId);
    if (fig) handleSelectFigure(fig);
  };

  const handleSelectBattleById = (battleId) => {
    const bat = currentBattles.find((b) => b.id === battleId);
    if (bat) handleSelectBattle(bat);
  };

  const handleSelectTab = (tab) => {
    if (tab === 'demographics') {
      setShowDemographicsModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1013] text-[#e2dfd9] flex flex-col font-sans">
      {/* Navigation Header with Civilization Switcher, Epoch Switcher & Global Search */}
      <Header
        activePeriodId={activePeriodId}
        onSelectPeriodId={handleSelectPeriodId}
        periodOptions={PERIOD_OPTIONS}
        currentPeriod={currentPeriodConfig.fullTitle}
        currentPeriodShortEra={currentPeriodConfig.shortEra}
        ancientNamesOnly={ancientNamesOnly}
        onToggleAncientNames={() => setAncientNamesOnly(!ancientNamesOnly)}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        globalSearchResults={globalSearchResults}
        onSelectGlobalResult={handleSelectGlobalResult}
        eventCount={currentEvents.length}
        figureCount={currentFigures.length}
        battleCount={currentBattles.length}
        civilizationMode={civilizationMode}
        onSelectCivilizationMode={handleSelectCivilizationMode}
        isTaiwanLensMode={isTaiwanLensMode}
        activeTaiwanEraId={activeTaiwanEraId}
        onSelectTaiwanEraId={handleSelectTaiwanEraId}
        activeJapanEraId={activeJapanEraId}
        onSelectJapanEraId={handleSelectJapanEraId}
      />

      {/* Main Content Area */}
      <ErrorBoundary>
        <Suspense fallback={<div className="loading-surface" role="status">正在載入歷史內容…</div>}>
        <main id="main-content" tabIndex={-1} className={`flex-1 ${isCinemaMode && activeTab === 'map-timeline' ? 'max-w-[1440px]' : 'max-w-7xl'} w-full mx-auto p-3 sm:p-4 flex flex-col min-h-0 transition-all duration-300`}>
          <h1 className="sr-only">歷史星圖：{civilizationMode === 'china' ? `華夏通史・${currentPeriodConfig.name}` : civilizationMode === 'taiwan' ? '臺灣歷史' : '日本歷史'}</h1>
          {(routeNotice.period || routeNotice.civ) && routeNotice.at === `${civilizationMode}:${activePeriodId}` && (
            <div className="route-notice" role="status">
              <p>網址中的{routeNotice.period ? `時期「${routeNotice.period}」` : `歷史體系「${routeNotice.civ}」`}不存在，已改為顯示{civilizationMode === 'china' ? `「${currentPeriodConfig.name}」` : '預設內容'}。</p>
              <button type="button" onClick={() => setRouteNotice({ civ: '', period: '', at: '' })} aria-label="關閉提示"><X aria-hidden="true" className="w-4 h-4" /></button>
            </div>
          )}
          {activeTab === 'map-timeline' && (
            <div className={`atlas-layout ${isCinemaMode ? 'is-cinema' : ''}`} data-mobile-surface={mobileSurface}>
              <div className="mobile-surface-switch" role="group" aria-label="歷史探索視圖">
                <button type="button" aria-pressed={mobileSurface === 'timeline'} onClick={() => {setMobileSurface('timeline'); setIsCinemaMode(false);}}>年表</button>
                <button type="button" aria-pressed={mobileSurface === 'map'} onClick={() => setMobileSurface('map')}>地圖</button>
              </div>
              {/* Map Canvas: Switches dynamically between China Atlas, Taiwan Atlas & Japan Atlas */}
              <div className="map-pane">
                {civilizationMode === 'japan' ? (
                  <JapanAtlasMap
                    activeJapanEraId={activeJapanEraId}
                    onSelectJapanEraId={handleSelectJapanEraId}
                    events={eventsForTimeline}
                    allEvents={currentEvents}
                    battles={currentBattles}
                    selectedEvent={selectedEvent}
                    selectedBattle={selectedBattle}
                    onSelectEvent={handleSelectEvent}
                    onSelectBattle={handleSelectBattle}
                    ancientNamesOnly={ancientNamesOnly}
                    onClearSearch={() => setSearchTerm('')}
                    isCinemaMode={isCinemaMode}
                    onToggleCinemaMode={() => { setMobileSurface('map'); setIsCinemaMode((v) => !v); }}
                  />
                ) : isTaiwanLensMode ? (
                  <TaiwanAtlasMap
                    activeTaiwanEraId={activeTaiwanEraId}
                    onSelectTaiwanEraId={handleSelectTaiwanEraId}
                    events={eventsForTimeline}
                    allEvents={currentEvents}
                    battles={currentBattles}
                    selectedEvent={selectedEvent}
                    selectedBattle={selectedBattle}
                    onSelectEvent={handleSelectEvent}
                    onSelectBattle={handleSelectBattle}
                    ancientNamesOnly={ancientNamesOnly}
                    onClearSearch={() => setSearchTerm('')}
                    isCinemaMode={isCinemaMode}
                    onToggleCinemaMode={() => { setMobileSurface('map'); setIsCinemaMode((v) => !v); }}
                  />
                ) : (
                  <HistoricalAtlasMap
                    warlordPeriodConfigs={currentWarlordPeriods}
                    territories={currentTerritories}
                    events={eventsForTimeline}
                    allEvents={currentEvents}
                    battles={currentBattles}
                    selectedEvent={selectedEvent}
                    onSelectEvent={handleSelectEvent}
                    onSelectBattle={handleSelectBattle}
                    ancientNamesOnly={ancientNamesOnly}
                    onClearSearch={() => setSearchTerm('')}
                    isCinemaMode={isCinemaMode}
                    onToggleCinemaMode={() => { setMobileSurface('map'); setIsCinemaMode((v) => !v); }}
                  />
                )}
              </div>

              {/* Dual-Axis Timeline (5 cols on Desktop, hidden in Cinema Mode) */}
              {!isCinemaMode && (
                <div className="timeline-pane">
                  <Timeline
                    events={eventsForTimeline}
                    figures={figuresForLinks}
                    battles={currentBattles}
                    selectedEvent={selectedEvent}
                    onSelectEvent={handleSelectEvent}
                    onSelectFigureById={handleSelectFigureById}
                    onSelectBattleById={handleSelectBattleById}
                    ancientNamesOnly={ancientNamesOnly}
                    activePeriodId={civilizationMode === 'japan' ? 'japanAtlas' : isTaiwanLensMode ? 'taiwanLens' : activePeriodId}
                    searchTerm={timelineSearch}
                    onClearSearch={() => setTimelineSearch('')}
                    onSearchChange={setTimelineSearch}
                    civilizationMode={civilizationMode}
                    crossCivPools={crossCivPools}
                    onJumpToCrossCivEvent={handleJumpToCrossCivEvent}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'figures' && (
            <FiguresView
              figures={currentFigures}
              referenceFigures={figuresForLinks}
              referenceEvents={eventsForLinks}
              onSelectFigure={handleSelectFigure}
              ancientNamesOnly={ancientNamesOnly}
              globalSearchTerm=""
              activePeriodId={civilizationMode === 'japan' ? 'japanAtlas' : isTaiwanLensMode ? 'taiwanLens' : activePeriodId}
            />
          )}

          {activeTab === 'battles' && (
            <BattlesView
              battles={currentBattles}
              figures={currentFigures}
              onSelectBattle={handleSelectBattle}
              onSelectFigure={handleSelectFigure}
              ancientNamesOnly={ancientNamesOnly}
              globalSearchTerm=""
              activePeriodId={civilizationMode === 'japan' ? 'japanAtlas' : isTaiwanLensMode ? 'taiwanLens' : activePeriodId}
            />
          )}
        </main>

        {/* Historical Figure Modal */}
        {selectedFigure && (
          <FigureModal
            figure={selectedFigure}
            allFigures={figuresForLinks}
            allEvents={eventsForLinks}
            allBattles={[...currentBattles, ...ALL_LINKED_BATTLES.filter(battle => !currentBattles.some(local => local.id === battle.id))]}
            onClose={() => setSelectedFigure(null)}
            onSelectFigure={handleSelectFigure}
            onSelectEvent={(evt) => {
              setSelectedFigure(null);
              setSelectedBattle(null);
              handleSelectEvent(evt);
              setActiveTab('map-timeline');
            }}
            onSelectBattle={(bat) => {
              setSelectedFigure(null);
              handleSelectBattle(bat);
            }}
            ancientNamesOnly={ancientNamesOnly}
            activePeriodId={civilizationMode === 'japan' ? 'japanAtlas' : isTaiwanLensMode ? 'taiwanLens' : activePeriodId}
          />
        )}

        {/* Battle Detail Modal */}
        {selectedBattle && (
          <BattleModal
            battle={selectedBattle}
            allFigures={figuresForLinks}
            allEvents={eventsForLinks}
            onClose={() => setSelectedBattle(null)}
            onSelectFigure={handleSelectFigure}
            onSelectEvent={(evt) => {
              handleSelectEvent(evt);
              setActiveTab('map-timeline');
            }}
            ancientNamesOnly={ancientNamesOnly}
          />
        )}

        {/* Demographics & Ethnicities Modal */}
        {showDemographicsModal && (
          <DemographicsModal
            data={currentDemographics}
            onClose={() => setShowDemographicsModal(false)}
          />
        )}
      </Suspense>
      </ErrorBoundary>
    </div>
  );
}
