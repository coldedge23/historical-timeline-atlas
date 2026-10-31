import React, { useState, useMemo, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
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
import { BootScreen, DataStatus, DataStatusContext } from './components/DataStatus.jsx';
import { X } from './components/Icons.js';
import { TAIWAN_PAGE, JAPAN_PAGE, pageIdFor, loadCatalog, loadPage, loadSearchIndex, createPageNavigator, figureLinksFor, battleLinksFor, eventLinksFor,
  findOnPage, homeRecord, navigationDataset, routePageId, navigationCatalogs, initialContext, selectionContext } from './store/historyStore.js';

import { parseNavigationHash, serializeNavigation, resolveNavigation, resolveInitialNavigation, unknownRouteParts } from './utils/navigation.js';
import { searchIndex } from './utils/search.js';
import { resolveFigureSelection, battleLinkedEvent } from './utils/relationRules.js';

// Two-step start (plan v2 section 3.5): catalog, then the page the address opens, then the app with the
// address resolved against that page. Nothing writes the address until this is done.
export function App() {
  const [boot, setBoot] = useState({ catalog: null, page: null, error: null });
  const start = useCallback(async (force = false) => {
    setBoot({ catalog: null, page: null, error: null });
    try {
      const catalog = await loadCatalog({ force });
      const page = await loadPage(routePageId(parseNavigationHash(window.location.hash), catalog.periodIds));
      setBoot({ catalog, page, error: null });
    } catch (error) {
      setBoot({ catalog: null, page: null, error });
    }
  }, []);
  useEffect(() => { start(); }, [start]);
  if (!boot.page) return <BootScreen error={boot.error} onRetry={() => start(true)} />;
  return <Atlas catalog={boot.catalog} initialPage={boot.page} />;
}

function Atlas({ catalog, initialPage }) {
  const isKnownPeriod = (id) => catalog.periodIds.includes(id);
  const initialHash = useMemo(() => parseNavigationHash(window.location.hash), []);
  const initialRoute = useMemo(() => resolveInitialNavigation(window.location.hash, initialContext(catalog, initialPage)), []);
  const initialPeriodId = initialRoute.period;

  // The page on screen. Every change of civilization or period goes through goToPage, which loads the page first.
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageStatus, setPageStatus] = useState(null);
  const dataStatus = useMemo(() => ({ state: pageStatus, onRetry: () => pageStatus?.retry?.() }), [pageStatus]);
  // Only the latest request wins: a slower, older load is dropped when it arrives (plan v2 section 3.5).
  const whenLoaded = useMemo(() => createPageNavigator({ onStatus: setPageStatus }), []);

  const [activePeriodId, setActivePeriodId] = useState(initialPeriodId);
  // The notice belongs to the view it fell back to; navigating elsewhere hides it.
  const [routeNotice, setRouteNotice] = useState(() => ({ ...unknownRouteParts(window.location.hash, isKnownPeriod), at: `${initialHash.civ}:${initialPeriodId}` }));
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

  const [activeTaiwanEraId, setActiveTaiwanEraId] = useState(initialRoute.taiwanEra);


  const [activeJapanEraId, setActiveJapanEraId] = useState(initialRoute.japanEra);

  const goToPage = (pageId, apply) => whenLoaded(pageId, (page) => { setCurrentPage(page); apply(page); });

  // All China Events across all periods for cross-civilization contemporary reference
  const crossCivPools = catalog.contemporaryPools;

  const handleJumpToCrossCivEvent = (targetCiv, entry) => {
    if (!entry) return;
    const pageId = targetCiv === 'china' ? entry.periodId : pageIdFor(targetCiv);
    if (targetCiv === 'china' && !isKnownPeriod(pageId)) return;
    goToPage(pageId, (page) => {
      const targetEvt = page.events.find(event => event.id === entry.id) || entry;
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
        setActivePeriodId(page.id);
        setSelectedEvent({ ...targetEvt, _scrollTs: Date.now() });
      }
    });
  };

  const currentEraConfig = useMemo(() => {
    if (civilizationMode === 'japan') {
      return catalog.eras.japan.find((e) => e.id === activeJapanEraId) || catalog.eras.japan[1];
    }
    if (civilizationMode === 'taiwan') {
      return catalog.eras.taiwan.find((e) => e.id === activeTaiwanEraId) || catalog.eras.taiwan[2];
    }
    return null;
  }, [civilizationMode, activeTaiwanEraId, activeJapanEraId]);

  // Active Datasets (dynamically swapped between China Dynasties, Taiwan Lens & Japan Atlas)
  // The period header, territories and demographics are shown in China mode only.
  const currentPeriodConfig = currentPage.civ === 'china' ? currentPage : {};
  const currentPageId = currentPage.id;
  const currentEvents = currentPage.events;
  const currentFigures = currentPage.figures;
  const currentBattles = currentPage.battles;
  const currentTerritories = currentPeriodConfig.territories;
  const currentWarlordPeriods = currentPeriodConfig.warlordPeriods;
  const currentDemographics = currentPeriodConfig.demographics;

  const [selectedEvent, setSelectedEvent] = useState(initialRoute.selectedEvent);

  const [selectedFigure, setSelectedFigure] = useState(initialRoute.selectedFigure);

  const [selectedBattle, setSelectedBattle] = useState(initialRoute.selectedBattle);

  const [showDemographicsModal, setShowDemographicsModal] = useState(false);

  useEffect(() => {
    const restore = () => {
      const hash = window.location.hash;
      goToPage(routePageId(parseNavigationHash(hash), catalog.periodIds), (page) => {
        const route = resolveNavigation(hash, navigationCatalogs(catalog, page), catalog.eras);
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
      });
    };
    window.addEventListener('popstate', restore);
    window.addEventListener('hashchange', restore);
    return () => { window.removeEventListener('popstate', restore); window.removeEventListener('hashchange', restore); };
  }, [catalog]);

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
    goToPage(pageIdFor(mode, activePeriodId), (page) => {
      setCivilizationMode(mode);
      setSelectedFigure(null);
      setSelectedBattle(null);
      if (mode === 'japan') {
        const targetEra = catalog.eras.japan.find((e) => e.id === activeJapanEraId) || catalog.eras.japan[1];
        const found = page.events.find((e) => e.eraId === targetEra.id) || page.events[0];
        setSelectedEvent(found || null);
      } else if (mode === 'taiwan') {
        const targetEra = catalog.eras.taiwan.find((e) => e.id === activeTaiwanEraId) || catalog.eras.taiwan[2];
        const found = page.events.find((e) => e.eraId === targetEra.id) || page.events[0];
        setSelectedEvent(found || null);
      } else {
        setSelectedEvent(page.events[0] || null);
      }
    });
  };

  // Handle Epoch / Period Switching (華夏朝代選單切換)
  const handleSelectPeriodId = (periodId) => {
    if (!isKnownPeriod(periodId)) return;
    goToPage(periodId, (newConfig) => {
      setCivilizationMode('china');
      setActivePeriodId(periodId);
      if (newConfig.events && newConfig.events.length > 0) {
        setSelectedEvent(newConfig.events[0]);
      } else {
        setSelectedEvent(null);
      }
      setSelectedFigure(null);
      setSelectedBattle(null);
      setSearchTerm('');
    });
  };

  // Handle Taiwan Era Select (臺灣專題紀元切換)
  const handleSelectTaiwanEraId = (eraId) => {
    goToPage(TAIWAN_PAGE, (page) => {
      setCivilizationMode('taiwan');
      setActiveTaiwanEraId(eraId);
      setSearchTerm('');
      const targetEra = catalog.eras.taiwan.find((e) => e.id === eraId);
      if (targetEra && targetEra.firstEventId) {
        const found = page.events.find((e) => e.id === targetEra.firstEventId);
        if (found) {
          setSelectedEvent({ ...found, _scrollTs: Date.now() });
        }
      }
      setSelectedFigure(null);
      setSelectedBattle(null);
    });
  };

  // Handle Japan Era Select (日本歷史紀元切換)
  const handleSelectJapanEraId = (eraId) => {
    goToPage(JAPAN_PAGE, (page) => {
      setCivilizationMode('japan');
      setActiveJapanEraId(eraId);
      setSearchTerm('');
      const targetEra = catalog.eras.japan.find((e) => e.id === eraId);
      if (targetEra && targetEra.firstEventId) {
        const found = page.events.find((e) => e.eraId === targetEra.id) || page.events[0];
        if (found) {
          setSelectedEvent({ ...found, _scrollTs: Date.now() });
        }
      }
      setSelectedFigure(null);
      setSelectedBattle(null);
    });
  };

  // The search index loads on the first focus of the search box (plan v2 section 3.4).
  const [search, setSearch] = useState({ status: 'idle', entries: null });
  const searchRequest = useRef(null);
  const requestSearchIndex = () => {
    if (searchRequest.current) return;
    setSearch({ status: 'loading', entries: null });
    searchRequest.current = loadSearchIndex().then((entries) => setSearch({ status: 'ready', entries }), () => {
      searchRequest.current = null;
      setSearch({ status: 'error', entries: null });
    });
  };
  const globalSearchResults = useMemo(() => search.entries ? searchIndex(search.entries, searchTerm, currentPageId) : [], [search.entries, searchTerm, currentPageId]);
  const handleSelectGlobalResult = (res) => {
    if (!res) return;
    setTimelineSearch('');
    const civ = res.civ || 'china';
    if (civ === 'china' && !isKnownPeriod(res.periodId)) return;
    // A result opens in the pack it appears in (plan v2 section 3.3).
    goToPage(civ === 'china' ? res.periodId : pageIdFor(civ), (page) => {
      setCivilizationMode(civ);
      const dataset = navigationDataset(page);
      if (civ === 'china') setActivePeriodId(res.periodId);
      const item = (res.type === 'figure' ? dataset.figures : res.type === 'battle' ? dataset.battles : dataset.events).find((r) => r.id === res.item.id) || null;
      const activeEra = civ === 'japan' ? activeJapanEraId : activeTaiwanEraId;
      const targetEra = res.eraId || activeEra;
      const event = res.type === 'event' ? item : dataset.events.find(e => targetEra && e.eraId === targetEra) || dataset.events[0] || null;
      setSelectedEvent(event);
      if (civ === 'japan' && event?.eraId) setActiveJapanEraId(event.eraId);
      if (civ === 'taiwan' && event?.eraId) setActiveTaiwanEraId(event.eraId);
      setSelectedFigure(res.type === 'figure' ? item : null);
      setSelectedBattle(res.type === 'battle' ? item : null);
      setActiveTab(res.type === 'event' ? 'map-timeline' : res.type === 'figure' ? 'figures' : 'battles');
      setSearchTerm('');
      setIsCinemaMode(false);
    });
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
    const select = (target) => {
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
    if (target?.datasetId && target.datasetId !== currentPageId) {
      goToPage(target.datasetId, (page) => {
        const record = page.events.find(event => event.id === target.id) || target;
        const civ = record.civ || (record.datasetId === 'taiwanLens' ? 'taiwan' : record.datasetId === 'japanAtlas' ? 'japan' : 'china');
        setCivilizationMode(civ);
        if (civ === 'china') setActivePeriodId(record.datasetId);
        if (civ === 'taiwan' && record.eraId) setActiveTaiwanEraId(record.eraId);
        if (civ === 'japan' && record.eraId) setActiveJapanEraId(record.eraId);
        select(record);
      });
      return;
    }
    select(target);
  };

  const handleSelectBattle = (bat) => {
    setSelectedFigure(null);
    setSelectedBattle(bat);
    if (civilizationMode === 'japan' && bat?.id) {
      const era = Object.entries(currentPage.eraBattleIds || {}).find(([, ids]) => ids.includes(bat.id))?.[0];
      if (era) {
        setActiveJapanEraId(era);
        setSelectedEvent(currentEvents.find(event => event.eraId === era) || null);
      }
    }
    if (isTaiwanLensMode && bat?.id) {
      const eraEntry = Object.entries(currentPage.eraBattleIds || {}).find(([_, bIds]) => bIds.includes(bat.id));
      if (eraEntry && eraEntry[0] !== activeTaiwanEraId) {
        setActiveTaiwanEraId(eraEntry[0]);
        setSelectedEvent(currentEvents.find(event => event.eraId === eraEntry[0]) || null);
      }
    }
  };

  // A battle linked from another pack opens on its own page (plan v2 section 3.3), with the event it belongs to.
  const openBattleOnPage = (page, battle) => {
    setCivilizationMode(page.civ);
    setSelectedFigure(null);
    setSelectedBattle(battle);
    if (page.civ === 'china') {
      setActivePeriodId(page.id);
      setSelectedEvent(battleLinkedEvent(battle, page.events) || page.events[0] || null);
      return;
    }
    const era = Object.entries(page.eraBattleIds || {}).find(([, ids]) => ids.includes(battle.id))?.[0];
    if (era) (page.civ === 'japan' ? setActiveJapanEraId : setActiveTaiwanEraId)(era);
    setSelectedEvent(battleLinkedEvent(battle, page.events) || page.events.find(event => !era || event.eraId === era) || page.events[0] || null);
  };

  const handleSelectFigure = (figure) => {
    if (!figure) return;
    const apply = ({ target, switchTo }) => {
      if (switchTo) {
        setCivilizationMode(switchTo.civ);
        if (switchTo.civ === 'china') setActivePeriodId(switchTo.periodId);
        if (switchTo.civ === 'japan') setActiveJapanEraId(switchTo.japanEraId);
        if (switchTo.civ === 'taiwan') setActiveTaiwanEraId(switchTo.taiwanEraId);
        setSelectedEvent(switchTo.selectedEvent);
      }
      setSelectedBattle(null);
      setSelectedFigure(target);
    };
    // A figure listed on this page opens in place; otherwise switch to its own dataset.
    if (!figure.datasetId || currentFigures.some(item => item.id === figure.id)) {
      apply(resolveFigureSelection(figure, currentFigures, selectionContext(currentPage)));
      return;
    }
    goToPage(figure.datasetId, (page) => apply(resolveFigureSelection(figure, currentFigures, selectionContext(page))));
  };

  // Link descriptors (modals, timeline chips): open on this page when it lists the id, otherwise load the home pack.
  const openLink = (link, open) => {
    if (!link) return;
    const here = findOnPage(currentPage, link);
    if (here) { open(here); return; }
    whenLoaded(link.homePack, (page) => { const record = homeRecord(page, link); if (record) open(record, page); });
  };
  const openFigureLink = (link) => openLink(link, (record) => handleSelectFigure(record));
  const openEventLink = (link, after) => openLink(link, (record) => { handleSelectEvent(record); after?.(); });
  const openBattleLink = (link) => openLink(link, (record, page) => {
    if (!page) { handleSelectBattle(record); return; }
    setCurrentPage(page);
    openBattleOnPage(page, record);
  });

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
    <DataStatusContext.Provider value={dataStatus}>
    <div className="min-h-screen bg-[#0f1013] text-[#e2dfd9] flex flex-col font-sans">
      {/* Navigation Header with Civilization Switcher, Epoch Switcher & Global Search */}
      <Header
        activePeriodId={activePeriodId}
        onSelectPeriodId={handleSelectPeriodId}
        periodOptions={catalog.periodOptions}
        eraOptionsByCiv={catalog.eras}
        currentPeriod={currentPeriodConfig.fullTitle}
        currentPeriodShortEra={currentPeriodConfig.shortEra}
        ancientNamesOnly={ancientNamesOnly}
        onToggleAncientNames={() => setAncientNamesOnly(!ancientNamesOnly)}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        globalSearchResults={globalSearchResults}
        searchStatus={search.status}
        onRequestSearchIndex={requestSearchIndex}
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
          <DataStatus state={dataStatus.state} onRetry={dataStatus.onRetry} />
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
                    eras={currentPage.eras}
                    eraBattleIds={currentPage.eraBattleIds}
                    warlordPeriods={currentPage.warlordPeriods}
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
                    eras={currentPage.eras}
                    eraBattleIds={currentPage.eraBattleIds}
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
                    eventLinksFor={(evt) => eventLinksFor(currentPage, evt)}
                    battles={currentBattles}
                    selectedEvent={selectedEvent}
                    onSelectEvent={handleSelectEvent}
                    onOpenFigureLink={openFigureLink}
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
              figureLinksFor={(fig) => figureLinksFor(currentPage, fig)}
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
            links={figureLinksFor(currentPage, selectedFigure)}
            onClose={() => setSelectedFigure(null)}
            onSelectFigure={openFigureLink}
            // Modals close when the target opens, not before: a pack still loading must not leave
            // an extra history entry without the figure or battle.
            onSelectEvent={(link) => openEventLink(link, () => {
              setSelectedFigure(null);
              setSelectedBattle(null);
              setActiveTab('map-timeline');
            })}
            onSelectBattle={openBattleLink}
            ancientNamesOnly={ancientNamesOnly}
            activePeriodId={civilizationMode === 'japan' ? 'japanAtlas' : isTaiwanLensMode ? 'taiwanLens' : activePeriodId}
          />
        )}

        {/* Battle Detail Modal */}
        {selectedBattle && (
          <BattleModal
            battle={selectedBattle}
            links={battleLinksFor(currentPage, selectedBattle)}
            onClose={() => setSelectedBattle(null)}
            onSelectFigure={openFigureLink}
            onSelectEvent={(link) => openEventLink(link, () => {
              setSelectedBattle(null);
              setActiveTab('map-timeline');
            })}
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
    </DataStatusContext.Provider>
  );
}
