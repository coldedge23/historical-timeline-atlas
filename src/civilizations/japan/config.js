// 日本歷史: one data pack for the whole civilization, navigated by era (plan v2 sections 3.1 and 3.7).
// Small config only, no history data.
export default {
  id: 'japan',
  name: '日本歷史',
  shortName: '日本',
  // Pages are eras inside one pack: the URL carries ?civ=japan&era=.
  unit: 'era',
  pageId: 'japanAtlas',
  defaultEraId: 'jp_sengoku',
  figureIdPrefix: 'fig_jp_',
  // Picking an era selects the first event of that era on the page, else the page's first event.
  eraLandingEvent: (events, era) => events.find(e => e.eraId === era.id) || events[0],
  // A battle selected within the era already shown still moves the timeline to the era's first event.
  battleRefocusesSameEra: true,
  loadMap: () => import('../../components/JapanAtlasMap.jsx').then(m => m.JapanAtlasMap),
  features: { demographics: false },
  badgeClass: 'bg-rose-950/60 border-rose-500/40 text-rose-300',
  regimeLabel(year) {
    if (year < 710) return '飛鳥・古墳時代';
    if (year < 794) return '奈良時代';
    if (year < 1185) return '平安時代';
    if (year < 1336) return '鎌倉幕府';
    if (year < 1467) return '室町南北朝';
    if (year < 1573) return '戰國群雄時代';
    if (year < 1603) return '安土桃山時代';
    if (year < 1853) return '江戶德川幕府';
    if (year < 1868) return '幕末尊皇倒幕';
    return '明治維新・近代日本';
  },
};
