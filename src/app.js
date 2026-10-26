import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header.jsx';
import { HistoricalAtlasMap } from './components/HistoricalAtlasMap.jsx';
import { TaiwanAtlasMap } from './components/TaiwanAtlasMap.jsx';
import { JapanAtlasMap } from './components/JapanAtlasMap.jsx';
import { Timeline } from './components/Timeline.js';
import { FigureModal } from './components/FigureModal.js';
import { BattleModal } from './components/BattleModal.js';
import { DemographicsModal } from './components/DemographicsModal.js';
import { FiguresView } from './components/FiguresView.js';
import { BattlesView } from './components/BattlesView.js';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { HISTORICAL_PERIODS, PERIOD_OPTIONS } from './data/periodsRegistry.js';
import {
  TAIWAN_LENS_ERAS,
  TAIWAN_DEDICATED_FIGURES,
  TAIWAN_RELATED_FIGURE_IDS,
  TAIWAN_RELATED_BATTLES,
  ERA_BATTLE_IDS,
} from './data/taiwanLensData.js';
import {
  JAPAN_ERAS,
  JAPAN_FIGURES,
  JAPAN_BATTLES,
  JAPAN_ALL_EVENTS,
  JAPAN_ERA_BATTLE_IDS,
  projectLngLatToJapanMap,
} from './data/japan/index.js';
import { normalizePeriodDataset } from './data/schemaNormalizer.js';

function parseUrlHash() {
  try {
    const raw = (window.location.hash || '').replace(/^#/, '');
    const params = new URLSearchParams(raw);
    return {
      period: params.get('period') || '',
      tab: params.get('tab') || '',
      event: params.get('event') || '',
      figure: params.get('figure') || '',
      battle: params.get('battle') || '',
      lens: params.get('lens') || '',
      era: params.get('era') || '',
    };
  } catch {
    return { period: '', tab: '', event: '', figure: '', battle: '', lens: '', era: '' };
  }
}

export function App() {
  const initialHash = useMemo(() => parseUrlHash(), []);
  const initialPeriodId =
    initialHash.period && HISTORICAL_PERIODS[initialHash.period]
      ? initialHash.period
      : 'yuanMing';

  const [activePeriodId, setActivePeriodId] = useState(initialPeriodId);
  const [activeTab, setActiveTab] = useState(
    ['map-timeline', 'figures', 'battles'].includes(initialHash.tab)
      ? initialHash.tab
      : 'map-timeline'
  );
  const [ancientNamesOnly, setAncientNamesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Multi-Civilization Mode States ('china' | 'taiwan' | 'japan')
  const initialCiv = initialHash.civ || (initialHash.lens === 'taiwan' ? 'taiwan' : initialHash.lens === 'japan' ? 'japan' : 'china');
  const [civilizationMode, setCivilizationMode] = useState(initialCiv);
  const isTaiwanLensMode = civilizationMode === 'taiwan';
  const isJapanMode = civilizationMode === 'japan';

  const [activeTaiwanEraId, setActiveTaiwanEraId] = useState(
    initialHash.era && TAIWAN_LENS_ERAS.some((e) => e.id === initialHash.era)
      ? initialHash.era
      : 'tw_tungning'
  );

  const [activeJapanEraId, setActiveJapanEraId] = useState(
    initialHash.era && JAPAN_ERAS.some((e) => e.id === initialHash.era)
      ? initialHash.era
      : 'jp_sengoku'
  );

  // Normalize dedicated Taiwan figures using unified schema
  const normalizedTaiwanDedicatedFigures = useMemo(() => {
    const norm = normalizePeriodDataset({
      id: 'taiwanLens',
      name: '臺灣歷史縱貫專題',
      figures: TAIWAN_DEDICATED_FIGURES || [],
      events: [],
      battles: [],
    });
    return norm.figures || [];
  }, []);

  // Normalize Japan figures using unified schema
  const normalizedJapanFigures = useMemo(() => {
    const norm = normalizePeriodDataset({
      id: 'japanAtlas',
      name: '日本歷史星圖',
      figures: JAPAN_FIGURES || [],
      events: [],
      battles: [],
    });
    return norm.figures || [];
  }, []);

  // Pool of all figures across all 10 periods + Dedicated Taiwan Figures + Japan Figures
  const allFiguresPool = useMemo(() => {
    const list = [];
    const seen = new Set();
    for (const p of Object.values(HISTORICAL_PERIODS)) {
      for (const fig of p.figures || []) {
        if (!seen.has(fig.id)) {
          seen.add(fig.id);
          list.push(fig);
        }
      }
    }
    for (const fig of normalizedTaiwanDedicatedFigures) {
      if (!seen.has(fig.id)) {
        seen.add(fig.id);
        list.push(fig);
      }
    }
    for (const fig of normalizedJapanFigures) {
      if (!seen.has(fig.id)) {
        seen.add(fig.id);
        list.push(fig);
      }
    }
    return list;
  }, [normalizedTaiwanDedicatedFigures, normalizedJapanFigures]);

  // Taiwan Lens Datasets
  const taiwanLensEvents = useMemo(() => {
    const evts = [];
    TAIWAN_LENS_ERAS.forEach((era) => {
      (era.keyEvents || []).forEach((ke) => {
        evts.push({
          ...ke,
          eraId: era.id,
          eraName: era.name,
          svgPos: ke.coordinates
            ? [
                580 + (ke.coordinates[0] - 118) * 7.5,
                495 - (ke.coordinates[1] - 22) * 9.5,
              ]
            : [602, 478],
        });
      });
    });
    return evts.sort((a, b) => a.year - b.year);
  }, []);

  // Japan Historical Atlas Events Dataset
  const japanEvents = useMemo(() => {
    return JAPAN_ALL_EVENTS.map((ke) => ({
      ...ke,
      svgPos: ke.coordinates
        ? projectLngLatToJapanMap(ke.coordinates[0], ke.coordinates[1])
        : [400, 360],
    }));
  }, []);

  const taiwanLensFigures = useMemo(() => {
    return allFiguresPool
      .filter(
        (f) =>
          TAIWAN_RELATED_FIGURE_IDS.includes(f.id) ||
          f.faction === 'taiwan' ||
          (f.hometown && (f.hometown.includes('臺') || f.hometown.includes('台')))
      )
      .sort((a, b) => (b.importance || 3) - (a.importance || 3));
  }, [allFiguresPool]);

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
    const evts = (HISTORICAL_PERIODS[initialPeriodId] || HISTORICAL_PERIODS.yuanMing).events || [];
    if (initialHash.event) {
      const found = evts.find((e) => e.id === initialHash.event);
      if (found) return found;
    }
    return evts[0] || null;
  });

  const [selectedFigure, setSelectedFigure] = useState(() => {
    if (!initialHash.figure) return null;
    const figs = (HISTORICAL_PERIODS[initialPeriodId] || HISTORICAL_PERIODS.yuanMing).figures || [];
    return figs.find((f) => f.id === initialHash.figure) || null;
  });

  const [selectedBattle, setSelectedBattle] = useState(() => {
    if (!initialHash.battle) return null;
    const bats = (HISTORICAL_PERIODS[initialPeriodId] || HISTORICAL_PERIODS.yuanMing).battles || [];
    return bats.find((b) => b.id === initialHash.battle) || null;
  });

  const [showDemographicsModal, setShowDemographicsModal] = useState(false);

  // Sync URL hash for state persistence across page reloads & deep linking
  useEffect(() => {
    try {
      const params = new URLSearchParams();
      if (civilizationMode === 'japan') {
        params.set('civ', 'japan');
        if (activeJapanEraId) params.set('era', activeJapanEraId);
      } else if (civilizationMode === 'taiwan') {
        params.set('civ', 'taiwan');
        params.set('lens', 'taiwan');
        if (activeTaiwanEraId) params.set('era', activeTaiwanEraId);
      } else {
        params.set('period', activePeriodId);
      }
      if (activeTab && activeTab !== 'map-timeline') {
        params.set('tab', activeTab);
      }
      if (selectedEvent?.id) {
        params.set('event', selectedEvent.id);
      }
      if (selectedFigure?.id) {
        params.set('figure', selectedFigure.id);
      }
      if (selectedBattle?.id) {
        params.set('battle', selectedBattle.id);
      }
      const newHash = `#${params.toString()}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, '', newHash);
      }
    } catch {}
  }, [
    civilizationMode,
    activePeriodId,
    activeTab,
    selectedEvent?.id,
    selectedFigure?.id,
    selectedBattle?.id,
    isTaiwanLensMode,
    activeTaiwanEraId,
    activeJapanEraId,
  ]);

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

  // Cross-Era Global Search across all 9 historical periods (980 figures, 161 battles, 260 events)
  const globalSearchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];

    const results = [];
    for (const period of Object.values(HISTORICAL_PERIODS)) {
      const pId = period.id;
      const pName = period.name;

      // 1. Figures
      for (const fig of period.figures || []) {
        const hay = `${fig.name || ''} ${fig.courtesyName || ''} ${fig.posthumousName || ''} ${(fig.roles || []).join(' ')} ${fig.nativePlaceAncient || ''} ${fig.bio || ''}`.toLowerCase();
        if (hay.includes(q)) {
          const nameMatch = (fig.name || '').toLowerCase().includes(q) ? 10 : 0;
          const samePeriodBonus = pId === activePeriodId ? 3 : 0;
          results.push({
            type: 'figure',
            periodId: pId,
            periodName: pName,
            title: fig.name,
            subtitle: `${fig.birthDeathDisplay || ''} · ${(fig.roles || []).slice(0, 2).join(' / ')}`,
            score: 20 + nameMatch + samePeriodBonus,
            item: fig,
          });
        }
      }

      // 2. Battles
      for (const bat of period.battles || []) {
        const hay = `${bat.name || ''} ${bat.locationAncient || ''} ${bat.locationModern || ''} ${bat.summary || ''} ${bat.victorStatement || ''}`.toLowerCase();
        if (hay.includes(q)) {
          const nameMatch = (bat.name || '').toLowerCase().includes(q) ? 10 : 0;
          const samePeriodBonus = pId === activePeriodId ? 3 : 0;
          results.push({
            type: 'battle',
            periodId: pId,
            periodName: pName,
            title: bat.name,
            subtitle: `${bat.year < 0 ? `前${Math.abs(bat.year)}` : bat.year}年 · ${bat.locationAncient || ''}`,
            score: 18 + nameMatch + samePeriodBonus,
            item: bat,
          });
        }
      }

      // 3. Events
      for (const evt of period.events || []) {
        const hay = `${evt.title || ''} ${evt.summary || ''} ${evt.detail || ''} ${evt.locationNameAncient || ''} ${evt.locationNameModern || ''}`.toLowerCase();
        if (hay.includes(q)) {
          const titleMatch = (evt.title || '').toLowerCase().includes(q) ? 10 : 0;
          const samePeriodBonus = pId === activePeriodId ? 3 : 0;
          results.push({
            type: 'event',
            periodId: pId,
            periodName: pName,
            title: evt.title,
            subtitle: `${evt.yearDisplay || `${evt.year}年`} · ${evt.locationNameAncient || ''}`,
            score: 15 + titleMatch + samePeriodBonus,
            item: evt,
          });
        }
      }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, 24);
  }, [searchTerm, activePeriodId]);

  const handleSelectGlobalResult = (res) => {
    if (!res) return;
    const targetPeriod = HISTORICAL_PERIODS[res.periodId];
    if (!targetPeriod) return;

    if (res.periodId !== activePeriodId) {
      setActivePeriodId(res.periodId);
      if (targetPeriod.events && targetPeriod.events.length > 0) {
        setSelectedEvent(targetPeriod.events[0]);
      }
    }

    if (res.type === 'figure') {
      setSelectedBattle(null);
      setSelectedFigure(res.item);
    } else if (res.type === 'battle') {
      setSelectedFigure(null);
      setSelectedBattle(res.item);
    } else if (res.type === 'event') {
      setSelectedFigure(null);
      setSelectedBattle(null);
      setActiveTab('map-timeline');
      setSelectedEvent(res.item);
      setSearchTerm('');
    }
  };

  // Search filtering across current period's events
  const filteredEvents = currentEvents.filter((evt) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    const matchTitle = (evt.title || '').toLowerCase().includes(q);
    const matchSummary = (evt.summary || '').toLowerCase().includes(q);
    const matchDetail = (evt.detail || '').toLowerCase().includes(q);
    const matchLoc =
      (evt.locationNameAncient || '').toLowerCase().includes(q) ||
      (evt.locationNameModern || '').toLowerCase().includes(q);
    const matchTags = evt.tags && evt.tags.some((t) => t.toLowerCase().includes(q));
    return matchTitle || matchSummary || matchDetail || matchLoc || matchTags;
  });

  // Ensure Timeline never looks empty if user searched a figure/battle from another period
  const eventsForTimeline = filteredEvents.length > 0 ? filteredEvents : currentEvents;

  const handleSelectEvent = (evt) => {
    setSelectedEvent(evt);
    if (isTaiwanLensMode && evt?.eraId && evt.eraId !== activeTaiwanEraId) {
      setActiveTaiwanEraId(evt.eraId);
    }
  };

  const handleSelectBattle = (bat) => {
    setSelectedBattle(bat);
    if (isTaiwanLensMode && bat?.id) {
      const eraEntry = Object.entries(ERA_BATTLE_IDS).find(([_, bIds]) => bIds.includes(bat.id));
      if (eraEntry && eraEntry[0] !== activeTaiwanEraId) {
        setActiveTaiwanEraId(eraEntry[0]);
      }
    }
  };

  const handleSelectFigureById = (figId) => {
    const fig = currentFigures.find((f) => f.id === figId);
    if (fig) setSelectedFigure(fig);
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
        <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 flex flex-col min-h-0">
          {activeTab === 'map-timeline' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:h-[calc(100vh-104px)] md:max-h-[calc(100vh-104px)] min-h-0 overflow-hidden">
              {/* Map Canvas: Switches dynamically between China Atlas, Taiwan Atlas & Japan Atlas */}
              <div className="md:col-span-7 h-[560px] md:h-full min-h-0 overflow-hidden flex flex-col">
                {civilizationMode === 'japan' ? (
                  <JapanAtlasMap
                    activeJapanEraId={activeJapanEraId}
                    onSelectJapanEraId={handleSelectJapanEraId}
                    events={eventsForTimeline}
                    battles={currentBattles}
                    selectedEvent={selectedEvent}
                    selectedBattle={selectedBattle}
                    onSelectEvent={handleSelectEvent}
                    onSelectBattle={handleSelectBattle}
                    ancientNamesOnly={ancientNamesOnly}
                  />
                ) : isTaiwanLensMode ? (
                  <TaiwanAtlasMap
                    activeTaiwanEraId={activeTaiwanEraId}
                    onSelectTaiwanEraId={handleSelectTaiwanEraId}
                    events={eventsForTimeline}
                    battles={currentBattles}
                    selectedEvent={selectedEvent}
                    selectedBattle={selectedBattle}
                    onSelectEvent={handleSelectEvent}
                    onSelectBattle={handleSelectBattle}
                    ancientNamesOnly={ancientNamesOnly}
                  />
                ) : (
                  <HistoricalAtlasMap
                    warlordPeriodConfigs={currentWarlordPeriods}
                    territories={currentTerritories}
                    events={eventsForTimeline}
                    battles={currentBattles}
                    selectedEvent={selectedEvent}
                    onSelectEvent={setSelectedEvent}
                    onSelectBattle={setSelectedBattle}
                    ancientNamesOnly={ancientNamesOnly}
                  />
                )}
              </div>

              {/* Dual-Axis Timeline (5 cols on Desktop) */}
              <div className="md:col-span-5 h-[560px] md:h-full min-h-0 overflow-hidden flex flex-col">
                <Timeline
                  events={eventsForTimeline}
                  figures={currentFigures}
                  selectedEvent={selectedEvent}
                  onSelectEvent={handleSelectEvent}
                  onSelectFigureById={handleSelectFigureById}
                  onSelectBattleById={handleSelectBattleById}
                  ancientNamesOnly={ancientNamesOnly}
                  activePeriodId={activePeriodId}
                />
              </div>
            </div>
          )}

          {activeTab === 'figures' && (
            <FiguresView
              figures={currentFigures}
              onSelectFigure={setSelectedFigure}
              ancientNamesOnly={ancientNamesOnly}
              globalSearchTerm={searchTerm}
              activePeriodId={civilizationMode === 'japan' ? 'japanAtlas' : isTaiwanLensMode ? 'taiwanLens' : activePeriodId}
            />
          )}

          {activeTab === 'battles' && (
            <BattlesView
              battles={currentBattles}
              figures={currentFigures}
              onSelectBattle={setSelectedBattle}
              onSelectFigure={setSelectedFigure}
              ancientNamesOnly={ancientNamesOnly}
              globalSearchTerm={searchTerm}
              activePeriodId={civilizationMode === 'japan' ? 'japanAtlas' : isTaiwanLensMode ? 'taiwanLens' : activePeriodId}
            />
          )}
        </main>

        {/* Historical Figure Modal */}
        {selectedFigure && (
          <FigureModal
            figure={selectedFigure}
            allFigures={allFiguresPool.length > 0 ? allFiguresPool : currentFigures}
            allEvents={isTaiwanLensMode ? taiwanLensEvents : currentEvents}
            allBattles={currentBattles}
            onClose={() => setSelectedFigure(null)}
            onSelectFigure={setSelectedFigure}
            onSelectEvent={(evt) => {
              handleSelectEvent(evt);
              setActiveTab('map-timeline');
            }}
            onSelectBattle={(bat) => {
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
            allFigures={allFiguresPool.length > 0 ? allFiguresPool : currentFigures}
            allEvents={isTaiwanLensMode ? taiwanLensEvents : currentEvents}
            onClose={() => setSelectedBattle(null)}
            onSelectFigure={setSelectedFigure}
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
      </ErrorBoundary>
    </div>
  );
}
