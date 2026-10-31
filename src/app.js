import React, { useState, useMemo, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Header } from './components/Header.jsx';
import { CIVILIZATIONS, DEFAULT_CIV, civById, civForPage } from './civilizations/registry.js';
// Each civilization's map, loaded with its geo data only when shown (src/civilizations/*/config.js).
const CIV_MAPS = Object.fromEntries(CIVILIZATIONS.map(civ => [civ.id, lazy(() => civ.loadMap().then(Map => ({ default: Map })))]));
import { Timeline } from './components/Timeline.js';
import { FigureModal } from './components/FigureModal.js';
import { BattleModal } from './components/BattleModal.js';
import { DemographicsModal } from './components/DemographicsModal.js';
const FiguresView = lazy(() => import('./components/FiguresView.js').then(m => ({default: m.FiguresView})));
const BattlesView = lazy(() => import('./components/BattlesView.js').then(m => ({default: m.BattlesView})));
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { BootScreen, DataStatus, DataStatusContext } from './components/DataStatus.jsx';
import { X } from './components/Icons.js';
import { pageIdFor, loadCatalog, loadPage, loadSearchIndex, createPageNavigator, figureLinksFor, battleLinksFor, eventLinksFor,
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

  // The civilization shown (src/civilizations/registry.js) and, for each civilization navigated by era,
  // the era it is on; an era is kept while another civilization is shown.
  const initialCiv = initialHash.civ;
  const [civilizationMode, setCivilizationMode] = useState(initialCiv);
  const activeCiv = civById(civilizationMode);
  const [activeEraIds, setActiveEraIds] = useState(initialRoute.eras);
  const setEraFor = (civId, eraId) => setActiveEraIds(prev => prev[civId] === eraId ? prev : { ...prev, [civId]: eraId });
  const activeEraId = activeEraIds[civilizationMode] || '';
  const activePageId = pageIdFor(civilizationMode, activePeriodId);

  const goToPage = (pageId, apply) => whenLoaded(pageId, (page) => { setCurrentPage(page); apply(page); });

  // All China Events across all periods for cross-civilization contemporary reference
  const crossCivPools = catalog.contemporaryPools;

  const handleJumpToCrossCivEvent = (targetCiv, entry) => {
    if (!entry) return;
    const civ = civById(targetCiv);
    const pageId = pageIdFor(targetCiv, entry.periodId);
    if (civ.unit === 'period' && !isKnownPeriod(pageId)) return;
    goToPage(pageId, (page) => {
      const targetEvt = page.events.find(event => event.id === entry.id) || entry;
      setTimelineSearch('');
      setActiveTab('map-timeline');
      setMobileSurface('timeline');
      setIsCinemaMode(false);
      setSearchTerm('');
      setSelectedFigure(null);
      setSelectedBattle(null);

      setCivilizationMode(civ.id);
      if (civ.unit === 'period') setActivePeriodId(page.id);
      else if (targetEvt.eraId) setEraFor(civ.id, targetEvt.eraId);
      setSelectedEvent({ ...targetEvt, _scrollTs: Date.now() });
    });
  };

  // Active Datasets: the page on screen (a China period, or a whole-civilization pack)
  // The period header, territories and demographics are shown in China mode only.
  const currentPeriodConfig = civById(currentPage.civ)?.unit === 'period' ? currentPage : {};
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
        if (civById(route.civ).unit === 'era') setEraFor(route.civ, route.era);
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
      era:activeEraId,
      tab:activeTab, event:selectedEvent?.id, figure:selectedFigure?.id, battle:selectedBattle?.id});
    if (lastNavigation.current === hash) return;
    if (lastNavigation.current === null) window.history.replaceState(null, '', hash);
    else if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    lastNavigation.current = hash;
  }, [civilizationMode, activePeriodId, activeTab, activeEraId, selectedEvent?.id, selectedFigure?.id, selectedBattle?.id]);

  // Handle Civilization Mode Switching (歷史體系切換)
  const handleSelectCivilizationMode = (mode) => {
    const civ = civById(mode);
    goToPage(pageIdFor(mode, activePeriodId), (page) => {
      setCivilizationMode(mode);
      setSelectedFigure(null);
      setSelectedBattle(null);
      if (civ.unit === 'era') {
        const eras = catalog.eras[mode];
        const targetEra = eras.find((e) => e.id === activeEraIds[mode]) || eras.find((e) => e.id === civ.defaultEraId);
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
      setCivilizationMode(DEFAULT_CIV.id);
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

  // Handle Era Select for civilizations navigated by era (臺灣、日本紀元切換)
  const handleSelectEra = (civId, eraId) => {
    const civ = civById(civId);
    goToPage(civ.pageId, (page) => {
      setCivilizationMode(civ.id);
      setEraFor(civ.id, eraId);
      setSearchTerm('');
      const targetEra = catalog.eras[civ.id].find((e) => e.id === eraId);
      if (targetEra && targetEra.firstEventId) {
        const found = civ.eraLandingEvent(page.events, targetEra);
        if (found) {
          setSelectedEvent({ ...found, _scrollTs: Date.now() });
        }
      }
      setSelectedFigure(null);
      setSelectedBattle(null);
    });
  };
  const handleSelectActiveEra = (eraId) => handleSelectEra(civilizationMode, eraId);

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
    const civ = res.civ || DEFAULT_CIV.id;
    const byPeriod = civById(civ).unit === 'period';
    if (byPeriod && !isKnownPeriod(res.periodId)) return;
    // A result opens in the pack it appears in (plan v2 section 3.3).
    goToPage(pageIdFor(civ, res.periodId), (page) => {
      setCivilizationMode(civ);
      const dataset = navigationDataset(page);
      if (byPeriod) setActivePeriodId(res.periodId);
      const item = (res.type === 'figure' ? dataset.figures : res.type === 'battle' ? dataset.battles : dataset.events).find((r) => r.id === res.item.id) || null;
      const targetEra = res.eraId || activeEraIds[civ];
      const event = res.type === 'event' ? item : dataset.events.find(e => targetEra && e.eraId === targetEra) || dataset.events[0] || null;
      setSelectedEvent(event);
      if (!byPeriod && event?.eraId) setEraFor(civ, event.eraId);
      setSelectedFigure(res.type === 'figure' ? item : null);
      setSelectedBattle(res.type === 'battle' ? item : null);
      setActiveTab(res.type === 'event' ? 'map-timeline' : res.type === 'figure' ? 'figures' : 'battles');
      setSearchTerm('');
      setIsCinemaMode(false);
    });
  };
  // The timeline tag filter is local and does not alter the global search input.
  useEffect(() => setTimelineSearch(''), [civilizationMode, activePeriodId, activeEraIds]);
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
      if (activeCiv.unit === 'era' && target?.eraId && target.eraId !== activeEraId) {
        setEraFor(activeCiv.id, target.eraId);
      }
    };
    if (target?.datasetId && target.datasetId !== currentPageId) {
      goToPage(target.datasetId, (page) => {
        const record = page.events.find(event => event.id === target.id) || target;
        const civ = civById(record.civ) || civForPage(record.datasetId);
        setCivilizationMode(civ.id);
        if (civ.unit === 'period') setActivePeriodId(record.datasetId);
        else if (record.eraId) setEraFor(civ.id, record.eraId);
        select(record);
      });
      return;
    }
    select(target);
  };

  const handleSelectBattle = (bat) => {
    setSelectedFigure(null);
    setSelectedBattle(bat);
    if (activeCiv.unit === 'era' && bat?.id) {
      const era = Object.entries(currentPage.eraBattleIds || {}).find(([, ids]) => ids.includes(bat.id))?.[0];
      if (era && (activeCiv.battleRefocusesSameEra || era !== activeEraId)) {
        setEraFor(activeCiv.id, era);
        setSelectedEvent(currentEvents.find(event => event.eraId === era) || null);
      }
    }
  };

  // A battle linked from another pack opens on its own page (plan v2 section 3.3), with the event it belongs to.
  const openBattleOnPage = (page, battle) => {
    setCivilizationMode(page.civ);
    setSelectedFigure(null);
    setSelectedBattle(battle);
    if (civById(page.civ).unit === 'period') {
      setActivePeriodId(page.id);
      setSelectedEvent(battleLinkedEvent(battle, page.events) || page.events[0] || null);
      return;
    }
    const era = Object.entries(page.eraBattleIds || {}).find(([, ids]) => ids.includes(battle.id))?.[0];
    if (era) setEraFor(page.civ, era);
    setSelectedEvent(battleLinkedEvent(battle, page.events) || page.events.find(event => !era || event.eraId === era) || page.events[0] || null);
  };

  const handleSelectFigure = (figure) => {
    if (!figure) return;
    const apply = ({ target, switchTo }) => {
      if (switchTo) {
        setCivilizationMode(switchTo.civ);
        if (switchTo.periodId) setActivePeriodId(switchTo.periodId);
        if (switchTo.eraId) setEraFor(switchTo.civ, switchTo.eraId);
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
        activeEraId={activeEraId}
        onSelectEraId={handleSelectActiveEra}
      />

      {/* Main Content Area */}
      <ErrorBoundary>
        <Suspense fallback={<div className="loading-surface" role="status">正在載入歷史內容…</div>}>
        <main id="main-content" tabIndex={-1} className={`flex-1 ${isCinemaMode && activeTab === 'map-timeline' ? 'max-w-[1440px]' : 'max-w-7xl'} w-full mx-auto p-3 sm:p-4 flex flex-col min-h-0 transition-all duration-300`}>
          <h1 className="sr-only">歷史星圖：{activeCiv.unit === 'period' ? `${activeCiv.name}・${currentPeriodConfig.name}` : activeCiv.name}</h1>
          <DataStatus state={dataStatus.state} onRetry={dataStatus.onRetry} />
          {(routeNotice.period || routeNotice.civ) && routeNotice.at === `${civilizationMode}:${activePeriodId}` && (
            <div className="route-notice" role="status">
              <p>網址中的{routeNotice.period ? `時期「${routeNotice.period}」` : `歷史體系「${routeNotice.civ}」`}不存在，已改為顯示{activeCiv.unit === 'period' ? `「${currentPeriodConfig.name}」` : '預設內容'}。</p>
              <button type="button" onClick={() => setRouteNotice({ civ: '', period: '', at: '' })} aria-label="關閉提示"><X aria-hidden="true" className="w-4 h-4" /></button>
            </div>
          )}
          {activeTab === 'map-timeline' && (
            <div className={`atlas-layout ${isCinemaMode ? 'is-cinema' : ''}`} data-mobile-surface={mobileSurface}>
              <div className="mobile-surface-switch" role="group" aria-label="歷史探索視圖">
                <button type="button" aria-pressed={mobileSurface === 'timeline'} onClick={() => {setMobileSurface('timeline'); setIsCinemaMode(false);}}>年表</button>
                <button type="button" aria-pressed={mobileSurface === 'map'} onClick={() => setMobileSurface('map')}>地圖</button>
              </div>
              {/* Map Canvas: the shown civilization's own map (loadMap in its src/civilizations config) */}
              <div className="map-pane">
                {(() => {
                  const CivMap = CIV_MAPS[civilizationMode];
                  // Per-period maps take the period's territories and force snapshots; era maps take the
                  // era selection and the page's era tables.
                  const unitProps = activeCiv.unit === 'period'
                    ? { warlordPeriodConfigs: currentWarlordPeriods, territories: currentTerritories }
                    : { activeEraId, onSelectEraId: handleSelectActiveEra, eras: currentPage.eras, eraBattleIds: currentPage.eraBattleIds,
                        warlordPeriods: currentPage.warlordPeriods, selectedBattle };
                  return (
                    <CivMap
                      {...unitProps}
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
                  );
                })()}
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
                    activePeriodId={activePageId}
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
              activePeriodId={activePageId}
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
              activePeriodId={activePageId}
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
            activePeriodId={activePageId}
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
