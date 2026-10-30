import fs from 'node:fs';
let app=fs.readFileSync('src/app.js','utf8');
app=app.replace("const [searchTerm, setSearchTerm] = useState('');", "const [searchTerm, setSearchTerm] = useState('');\n  const [timelineSearch, setTimelineSearch] = useState('');");
app=app.replace("  // Global search navigates; each collection keeps its own local filters.\n  const eventsForTimeline = currentEvents;", `  // The timeline tag filter is local and does not alter the global search input.
  useEffect(() => setTimelineSearch(''), [civilizationMode, activePeriodId, activeTaiwanEraId, activeJapanEraId]);
  const eventsForTimeline = useMemo(() => {
    const q = timelineSearch.trim().toLowerCase();
    if (!q) return currentEvents;
    return currentEvents.filter(event => [event.title, event.summary, event.detail,
      event.locationNameAncient, event.locationNameModern, ...(event.tags || [])]
      .filter(Boolean).join(' ').toLowerCase().includes(q));
  }, [currentEvents, timelineSearch]);`);
app=app.replace('                    searchTerm=""\n                    onClearSearch={() => setSearchTerm(\'\')}\n                    onSearchChange={setSearchTerm}', '                    searchTerm={timelineSearch}\n                    onClearSearch={() => setTimelineSearch(\'\')}\n                    onSearchChange={setTimelineSearch}');
// Do not leave a local filter in place when navigating to a specific event.
app=app.replace('  const handleSelectGlobalResult = (res) => {\n    if (!res) return;', '  const handleSelectGlobalResult = (res) => {\n    if (!res) return;\n    setTimelineSearch(\'\');');
app=app.replace('  const handleJumpToCrossCivEvent = (targetCiv, targetEvt) => {\n    if (!targetEvt) return;', '  const handleJumpToCrossCivEvent = (targetCiv, targetEvt) => {\n    if (!targetEvt) return;\n    setTimelineSearch(\'\');\n    setActiveTab(\'map-timeline\');\n    setMobileSurface(\'timeline\');\n    setIsCinemaMode(false);');
app=app.replace("JAPAN_ALL_EVENTS.find(event => event.id === initialHash.event)?.eraId ||", "JAPAN_ALL_EVENTS.find(event => event.id === initialHash.event)?.eraId ||\n    Object.entries(JAPAN_ERA_BATTLE_IDS).find(([, ids]) => ids.includes(initialHash.battle))?.[0] ||");
app=app.replace("TAIWAN_LENS_ERAS.find(era => (era.keyEvents || []).some(event => event.id === initialHash.event))?.id ||", "TAIWAN_LENS_ERAS.find(era => (era.keyEvents || []).some(event => event.id === initialHash.event))?.id ||\n    Object.entries(ERA_BATTLE_IDS).find(([, ids]) => ids.includes(initialHash.battle))?.[0] ||");
fs.writeFileSync('src/app.js',app);
let nav=fs.readFileSync('src/utils/navigation.js','utf8');
nav=nav.replace("  const event = dataset.events.find", "  const battle = dataset.battles.find(b => b.id === route.battle) || null;\n  if (!route.event && battle?.eraId) route.era = battle.eraId;\n  const event = dataset.events.find");
nav=nav.replace("  const figure = dataset.figures.find(f => f.id === route.figure) || null;\n  const battle = dataset.battles.find(b => b.id === route.battle) || null;", "  const figure = dataset.figures.find(f => f.id === route.figure) || null;");
fs.writeFileSync('src/utils/navigation.js',nav);
