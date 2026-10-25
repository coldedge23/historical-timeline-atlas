import React, { useState } from 'react';
import { Header } from './components/Header.jsx';
import { HistoricalAtlasMap } from './components/HistoricalAtlasMap.jsx';
import { Timeline } from './components/Timeline.js';
import { FigureModal } from './components/FigureModal.js';
import { BattleModal } from './components/BattleModal.js';
import { DemographicsModal } from './components/DemographicsModal.js';
import { FiguresView } from './components/FiguresView.js';
import { BattlesView } from './components/BattlesView.js';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { HISTORICAL_PERIODS, PERIOD_OPTIONS } from './data/periodsRegistry.js';

export function App() {
  const [activePeriodId, setActivePeriodId] = useState('suiTang'); // Stage 5: Sui, Tang, and Five Dynasties
  const [activeTab, setActiveTab] = useState('map-timeline');
  const [ancientNamesOnly, setAncientNamesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Active Period Datasets
  const currentPeriodConfig = HISTORICAL_PERIODS[activePeriodId] || HISTORICAL_PERIODS.qinHan;
  const currentEvents = currentPeriodConfig.events || [];
  const currentFigures = currentPeriodConfig.figures || [];
  const currentBattles = currentPeriodConfig.battles || [];
  const currentTerritories = currentPeriodConfig.territories;
  const currentWarlordPeriods = currentPeriodConfig.warlordPeriods || [];
  const currentDemographics = currentPeriodConfig.demographics;

  const [selectedEvent, setSelectedEvent] = useState(currentEvents[0]);
  const [selectedFigure, setSelectedFigure] = useState(null);
  const [selectedBattle, setSelectedBattle] = useState(null);
  const [showDemographicsModal, setShowDemographicsModal] = useState(false);

  // Handle Epoch / Period Switching
  const handleSelectPeriodId = (periodId) => {
    if (!HISTORICAL_PERIODS[periodId]) return;
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

  // Search filtering across events
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

  const handleSelectFigureById = (figId) => {
    const fig = currentFigures.find((f) => f.id === figId);
    if (fig) setSelectedFigure(fig);
  };

  const handleSelectBattleById = (battleId) => {
    const bat = currentBattles.find((b) => b.id === battleId);
    if (bat) setSelectedBattle(bat);
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
      {/* Navigation Header with Epoch Switcher */}
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
        eventCount={currentEvents.length}
        figureCount={currentFigures.length}
        battleCount={currentBattles.length}
      />

      {/* Main Content Area */}
      <ErrorBoundary>
        <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6">
          {activeTab === 'map-timeline' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:h-[calc(100vh-115px)] min-h-[700px]">
              {/* Authentic Historical Atlas Scroll Map */}
              <div className="lg:col-span-7 h-full flex flex-col">
                <HistoricalAtlasMap
                  warlordPeriodConfigs={currentWarlordPeriods}
                  territories={currentTerritories}
                  events={filteredEvents}
                  battles={currentBattles}
                  selectedEvent={selectedEvent}
                  onSelectEvent={setSelectedEvent}
                  onSelectBattle={setSelectedBattle}
                  ancientNamesOnly={ancientNamesOnly}
                />
              </div>

              {/* Dual-Axis Timeline (5 cols on Desktop) */}
              <div className="lg:col-span-5 h-full flex flex-col">
                <Timeline
                  events={filteredEvents}
                  figures={currentFigures}
                  selectedEvent={selectedEvent}
                  onSelectEvent={setSelectedEvent}
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
              activePeriodId={activePeriodId}
            />
          )}

          {activeTab === 'battles' && (
            <BattlesView
              battles={currentBattles}
              figures={currentFigures}
              onSelectBattle={setSelectedBattle}
              ancientNamesOnly={ancientNamesOnly}
              globalSearchTerm={searchTerm}
            />
          )}
        </main>

        {/* Historical Figure Modal */}
        {selectedFigure && (
          <FigureModal
            figure={selectedFigure}
            allFigures={currentFigures}
            allEvents={currentEvents}
            allBattles={currentBattles}
            onClose={() => setSelectedFigure(null)}
            onSelectFigure={setSelectedFigure}
            onSelectEvent={(evt) => {
              setSelectedEvent(evt);
              setActiveTab('map-timeline');
            }}
            onSelectBattle={(bat) => {
              setSelectedBattle(bat);
            }}
            ancientNamesOnly={ancientNamesOnly}
            activePeriodId={activePeriodId}
          />
        )}

        {/* Battle Detail Modal */}
        {selectedBattle && (
          <BattleModal
            battle={selectedBattle}
            allFigures={currentFigures}
            allEvents={currentEvents}
            onClose={() => setSelectedBattle(null)}
            onSelectFigure={setSelectedFigure}
            onSelectEvent={(evt) => {
              setSelectedEvent(evt);
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
