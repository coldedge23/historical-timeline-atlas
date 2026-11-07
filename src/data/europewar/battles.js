// 二戰歐洲戰場戰役。座標一律 [lng, lat]（EUROPEWAR_COORDINATE_ORDER）。
// 欄位規格見規劃 v5 第四節；每個來源以 claims 列出它支持的欄位，沒有來源支持的數值標「待考」（第 9.5 節）。
export const EUROPEWAR_BATTLES = [
  {
    id: 'bat_ew_german_invasion_of_poland_1939',
    name: '德國入侵波蘭',
    year: 1939,
    startDate: '1939-09-01',
    endDate: '1939-10-06',
    scale: 'campaign',
    modes: ['land', 'air'],
    theaters: ['centraleast'],
    locationAncient: '波蘭',
    locationModern: '波蘭',
    coordinates: [21.01, 52.23],
    locationNote: '戰場遍及波蘭，地圖座標取華沙作為代表位置',
    summary: '德國由北面的東普魯士與德國、南面的西里西亞與斯洛伐克進攻波蘭。華沙於 9 月 28 日投降，波蘭部隊最後的抵抗於 10 月 6 日結束。9 月 17 日蘇聯由東面入侵波蘭，另列一筆。',
    attacker: {
      factionName: '德國',
      faction: 'axis',
      commanders: [],
      forcesEstimate: '60 個師，近 150 萬人（含 2,000 輛以上戰車的先頭部隊）',
      casualtiesEstimate: '待考',
    },
    defender: {
      factionName: '波蘭',
      faction: 'allies',
      commanders: [],
      forcesEstimate: '待考',
      casualtiesEstimate: '待考',
    },
    participants: [
      { name: '德國', role: '入侵方', side: 'attacker' },
      { name: '波蘭', role: '防守方', side: 'defender' },
    ],
    parties: { invader: '德國', defender: '波蘭' },
    victor: 'attacker',
    victorStatement: '華沙於 1939 年 9 月 28 日投降，波蘭部隊最後的抵抗於 10 月 6 日結束',
    // 沒有來源支持的敘述明寫「待考」（規劃 v5 第 9.5 節）。
    strategicOutcome: '待考',
    significance: '待考',
    relatedBattleIds: [],
    sources: [{
      title: 'United States Holocaust Memorial Museum, Holocaust Encyclopedia: Invasion of Poland, Fall 1939',
      url: 'https://encyclopedia.ushmm.org/content/en/article/invasion-of-poland-fall-1939',
      externalReviewed: true, reviewedAt: '2026-11-07',
      claimScope: '1939-09-01 德國入侵；9 月 17 日蘇聯由東面入侵；9 月 28 日華沙投降；10 月 6 日波蘭部隊最後的抵抗結束；德國投入 60 個師、近 150 萬人，先頭部隊有 2,000 輛以上戰車',
      claims: ['startDate', 'endDate', 'attacker.forcesEstimate'],
    }],
  },
];
