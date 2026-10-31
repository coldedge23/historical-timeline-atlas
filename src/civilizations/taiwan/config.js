// 臺灣歷史: one data pack for the whole civilization, navigated by era (plan v2 sections 3.1 and 3.7).
// Small config only, no history data.
export default {
  id: 'taiwan',
  name: '臺灣歷史',
  shortName: '臺灣',
  // Pages are eras inside one pack: the URL carries ?civ=taiwan&era=.
  unit: 'era',
  pageId: 'taiwanLens',
  defaultEraId: 'tw_tungning',
  figureIdPrefix: 'fig_tw_',
  // Picking an era selects the era's listed first event (when it is on the page).
  eraLandingEvent: (events, era) => events.find(e => e.id === era.firstEventId),
  // A battle selected within the era already shown leaves the selected event alone.
  battleRefocusesSameEra: false,
  loadMap: () => import('../../components/TaiwanAtlasMap.jsx').then(m => m.TaiwanAtlasMap),
  features: { demographics: false },
  badgeClass: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300',
  regimeLabel(year) {
    if (year < 1624) return '南島原住民部落與大肚王國';
    if (year < 1662) return '荷西殖民與大航海時代';
    if (year < 1683) return '明鄭東寧王國';
    if (year < 1874) return '清領拓墾時期';
    if (year < 1895) return '清季自強建省時期';
    if (year < 1945) return '日治抗日與啟蒙時期';
    return '戰後臺灣與現代矽島';
  },
};
