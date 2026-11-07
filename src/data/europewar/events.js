// 二戰歐洲戰場事件。座標一律 [lng, lat]（EUROPEWAR_COORDINATE_ORDER）。
// 每個來源以 claims 列出它支持的欄位（規劃 v4 第 9.5 節）；未列入 claims 的數值要標「待考」。
const USHMM_PACT = {
  title: 'United States Holocaust Memorial Museum, Holocaust Encyclopedia: German-Soviet Pact',
  url: 'https://encyclopedia.ushmm.org/content/en/article/german-soviet-pact',
  externalReviewed: true, reviewedAt: '2026-11-07',
  claimScope: '簽訂日期 1939-08-23；由里賓特洛甫與莫洛托夫談判；祕密議定書劃分東歐勢力範圍，約定沿納雷夫河、維斯瓦河、桑河一線瓜分波蘭',
  claims: ['date'],
};
const AVALON_PACT = {
  title: 'The Avalon Project (Yale Law School): Treaty of Nonaggression Between Germany and the Union of Soviet Socialist Republics',
  url: 'https://avalon.law.yale.edu/20th_century/nonagres.asp',
  externalReviewed: true, reviewedAt: '2026-11-07',
  claimScope: '條約文末記「MOSCOW, August 23, 1939」；簽署人 V. Ribbentrop、V. Molotov',
  claims: ['date'],
};
const USHMM_POLAND = {
  title: 'United States Holocaust Memorial Museum, Holocaust Encyclopedia: Invasion of Poland, Fall 1939',
  url: 'https://encyclopedia.ushmm.org/content/en/article/invasion-of-poland-fall-1939',
  externalReviewed: true, reviewedAt: '2026-11-07',
  claimScope: '德國於 1939-09-01 入侵波蘭，由北面的東普魯士與德國、南面的西里西亞與斯洛伐克進攻',
  claims: ['date'],
};

export const EUROPEWAR_EVENTS = [
  {
    id: 'evt_ew_german_soviet_pact_1939',
    year: 1939,
    date: '1939-08-23',
    yearDisplay: '1939 年 8 月 23 日',
    title: '德蘇互不侵犯條約簽訂',
    summary: '德國與蘇聯在莫斯科簽訂互不侵犯條約，祕密議定書劃分兩國在東歐的勢力範圍。',
    detail: '條約由德國外交部長里賓特洛甫與蘇聯外交部長莫洛托夫談判簽署。祕密議定書約定沿納雷夫河、維斯瓦河、桑河一線瓜分波蘭。',
    locationNameAncient: '莫斯科',
    locationNameModern: '俄羅斯莫斯科',
    coordinates: [37.62, 55.75],
    faction: 'other',
    figureIds: [],
    tags: ['里賓特洛甫', '莫洛托夫'],
    sources: [USHMM_PACT, AVALON_PACT],
  },
  {
    id: 'evt_ew_invasion_of_poland_1939',
    year: 1939,
    date: '1939-09-01',
    yearDisplay: '1939 年 9 月 1 日',
    title: '德國入侵波蘭',
    summary: '德國由北面的東普魯士與德國、南面的西里西亞與斯洛伐克進攻波蘭。',
    detail: '詳見戰役「德國入侵波蘭」。',
    locationNameAncient: '波蘭',
    locationNameModern: '波蘭',
    coordinates: [21.01, 52.23],
    faction: 'axis',
    figureIds: [],
    battleId: 'bat_ew_german_invasion_of_poland_1939',
    tags: [],
    sources: [USHMM_POLAND],
  },
];
