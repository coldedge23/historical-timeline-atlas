// 二戰歐洲戰場: a topic covering 1939-1945, one data pack navigated by era like Taiwan and Japan
// (plan docs/20261108_二戰歐洲戰場模組規劃_v8.md). Small config only, no history data.
export default {
  id: 'europewar',
  name: '二戰歐洲戰場',
  shortName: '二戰歐洲',
  unit: 'era',
  pageId: 'europeWarAtlas',
  defaultEraId: 'ewar_blitz',
  figureIdPrefix: 'fig_ew_',
  // A topic, not a long-span civilization: contemporary sync rows for it appear only for events in yearRange
  // (plan v4 section 5). Years only, so all of 1939 and 1945 count.
  scope: { kind: 'topic', yearRange: [1939, 1945] },
  // Picking an era selects the first event of that era on the page, else the page's first event.
  eraLandingEvent: (events, era) => events.find(e => e.eraId === era.id) || events[0],
  loadMap: () => import('../../components/EuropeWarAtlasMap.jsx').then(m => m.EuropeWarAtlasMap),
  features: { demographics: false },
  badgeClass: 'bg-slate-900/70 border-slate-400/40 text-slate-200',
  // One fixed label: a year can fall in two eras, so the year alone cannot name the phase (plan v4 section 3).
  regimeLabel(year) {
    return year >= 1939 && year <= 1945 ? '第二次世界大戰（歐洲）' : '';
  },
};
