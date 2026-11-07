// 二戰歐洲戰場的 4 個時期（規劃 v5 第三節，2026-11-07 Ivan 核准）。
// 依完整日期劃分、彼此不重疊；事件與戰役依開始日期歸入時期（src/utils/datedRecords.js）。
// 劃分日期：1939-08-23 德蘇互不侵犯條約簽訂、1941-06-22 巴巴羅薩行動、1942-07-17 史達林格勒戰役開始、
// 1945-05-08 德國投降生效。1943-12-31／1944-01-01 只是分組用的年份界線。
// 史達林格勒的開始日期原定 1942-08-23；IWM 與 Britannica 都寫 1942-07-17，2026-11-07 Ivan 核准改為 07-17。
export const EUROPEWAR_ERA_DEFS = [
  {
    id: 'ewar_blitz',
    name: '開戰與閃電戰',
    startDate: '1939-08-23',
    endDate: '1941-06-21',
    dateRangeDisplay: '1939 年 8 月 – 1941 年 6 月',
    shortEra: '1939–1941',
    tagline: '德蘇條約・入侵波蘭・西歐戰役',
    description: '從德蘇互不侵犯條約簽訂、德國入侵波蘭，到德國入侵蘇聯前夕。',
    highlightFigures: [],
  },
  {
    id: 'ewar_eastfront',
    name: '東線開戰',
    startDate: '1941-06-22',
    endDate: '1942-07-16',
    dateRangeDisplay: '1941 年 6 月 – 1942 年 7 月',
    shortEra: '1941–1942',
    tagline: '巴巴羅薩行動・莫斯科・列寧格勒',
    description: '從德國入侵蘇聯，到史達林格勒戰役開始前。',
    highlightFigures: [],
  },
  {
    id: 'ewar_turning',
    name: '戰局轉折',
    startDate: '1942-07-17',
    endDate: '1943-12-31',
    dateRangeDisplay: '1942 年 7 月 – 1943 年 12 月',
    shortEra: '1942–1943',
    tagline: '史達林格勒・阿拉曼・庫斯克',
    description: '從史達林格勒戰役開始到 1943 年底。',
    highlightFigures: [],
  },
  {
    id: 'ewar_endgame',
    name: '盟軍反攻與德國投降',
    startDate: '1944-01-01',
    endDate: '1945-05-08',
    dateRangeDisplay: '1944 年 1 月 – 1945 年 5 月',
    shortEra: '1944–1945',
    tagline: '諾曼第・巴格拉季昂・柏林',
    description: '從 1944 年初到德國投降生效。',
    highlightFigures: [],
  },
];
