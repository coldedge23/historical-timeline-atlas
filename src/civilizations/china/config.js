// 華夏通史: one data pack per period (plan v2 sections 3.1 and 3.7). Small config only, no history data.
export default {
  id: 'china',
  name: '華夏通史',
  shortName: '華夏',
  // Pages are periods: the URL carries ?period=, and the page id is the period id.
  unit: 'period',
  defaultPeriodId: 'yuanMing',
  pageIdFor: (periodId) => periodId,
  // Map component, loaded with its geo data only when the map is shown.
  loadMap: () => import('../../components/HistoricalAtlasMap.jsx').then(m => m.HistoricalAtlasMap),
  features: { demographics: true },
  badgeClass: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
  // Contemporary sync: the regime a year falls in (build time and Timeline).
  regimeLabel(year) {
    if (year < -770) return '商周時代';
    if (year < -221) return '春秋戰國';
    if (year < 220) return '秦漢帝國';
    if (year < 280) return '魏蜀吳三國';
    if (year < 581) return '魏晉南北朝';
    if (year < 907) return '隋唐盛世';
    if (year < 960) return '五代十國';
    if (year < 1279) return '宋遼金夏';
    if (year < 1368) return '大元帝國';
    if (year < 1644) return '大明帝國';
    if (year < 1912) return '大清帝國';
    return '近現代中華';
  },
};
