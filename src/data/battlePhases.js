// 戰役錄的分段設定，依資料包代號查表（規劃 v4 第 4.7 節）。小型設定，不含歷史內容。
// 舊的分段 { min, max } 依戰役年份；新的分段 { eraId } 依戰役所屬時期。華夏、臺灣、日本的數值從 BattlesView.js 原封不動搬來。
export const BATTLE_PHASES = {
  xiaShangZhou: [
    { id: 'early', label: '🔥 夏商革鼎 (前2070–前1100年)', min: -3000, max: -1100 },
    { id: 'mid', label: '⚔️ 牧野克商與周公東征 (前1099–前950年)', min: -1099, max: -950 },
    { id: 'late', label: '🏹 宣王中興與西周覆亡 (前949–前771年)', min: -949, max: -700 },
  ],
  warringStates: [
    { id: 'early', label: '🛡️ 春秋五霸爭衡 (前770–前454年)', min: -800, max: -454 },
    { id: 'mid', label: '⚔️ 三家分晉與合縱連橫 (前453–前280年)', min: -453, max: -280 },
    { id: 'late', label: '🔥 長平決戰與秦滅六國 (前279–前221年)', min: -279, max: -200 },
  ],
  qinHan: [
    { id: 'early', label: '🔥 秦末與楚漢爭霸 (前209–前202年)', min: -250, max: -201 },
    { id: 'mid', label: '🏹 漢匈決戰與鑿空西域 (前200–前1年)', min: -200, max: 0 },
    { id: 'late', label: '⚔️ 昆陽大捷與東漢定鼎 (1–184年)', min: 1, max: 200 },
  ],
  threeKingdoms: [
    { id: 'early', label: '🔥 群雄逐鹿 (184–207年)', min: 180, max: 207 },
    { id: 'mid', label: '🌊 赤壁與三分天下 (208–225年)', min: 208, max: 225 },
    { id: 'late', label: '⚔️ 祁山北伐與三國歸晉 (226–280年)', min: 226, max: 300 },
  ],
  weiJin: [
    { id: 'early', label: '🔥 西晉興亡與衣冠南渡 (265–349年)', min: 260, max: 349 },
    { id: 'mid', label: '🌊 北伐中原與淝水大捷 (350–419年)', min: 350, max: 419 },
    { id: 'late', label: '⚔️ 南北朝爭鋒與隋滅陳 (420–589年)', min: 420, max: 600 },
  ],
  suiTang: [
    { id: 'early', label: '🔥 隋末群雄與大唐開國 (581–626年)', min: 580, max: 626 },
    { id: 'mid', label: '🐎 天可汗開疆與盛唐外戰 (627–754年)', min: 627, max: 754 },
    { id: 'late', label: '⚔️ 安史之亂、藩鎮與五代 (755–960年)', min: 755, max: 965 },
  ],
  songLiao: [
    { id: 'early', label: '🛡️ 北宋開國與宋遼夏交鋒 (960–1114年)', min: 960, max: 1114 },
    { id: 'mid', label: '🔥 女真崛起与岳韓抗金 (1115–1205年)', min: 1115, max: 1205 },
    { id: 'late', label: '🌊 蒙古滅金與宋元襄樊崖山 (1206–1279年)', min: 1206, max: 1285 },
  ],
  yuanMing: [
    { id: 'early', label: '🔥 元末紅巾與洪武永樂北伐 (1271–1448年)', min: 1270, max: 1448 },
    { id: 'mid', label: '🌊 京師保衛與抗倭援朝 (1449–1615年)', min: 1449, max: 1615 },
    { id: 'late', label: '⚔️ 明清遼東決戰與海權爭鋒 (1616–1644年)', min: 1616, max: 1650 },
  ],
  qingDynasty: [
    { id: 'early', label: '🐉 清初定鼎、收復臺灣與十全武功 (1644–1838年)', min: 1640, max: 1838 },
    { id: 'mid', label: '🔥 鴉片戰爭、太平天國與收復新疆 (1839–1882年)', min: 1839, max: 1882 },
    { id: 'late', label: '🌊 中法保台、甲午乙未與辛亥首義 (1883–1912年)', min: 1883, max: 1920 },
  ],
  taiwanLens: [
    { id: 'early', label: '⛵ 荷西明鄭與清領拓墾 (1624–1873年)', min: 1500, max: 1873 },
    { id: 'mid', label: '🛡️ 清法保台與乙未抗日 (1874–1945年)', min: 1874, max: 1945 },
    { id: 'late', label: '🔥 臺海防衛與金馬戰役 (1946–1980年)', min: 1946, max: 2000 },
  ],
  japanAtlas: [
    { id: 'early', label: '⛩️ 源平合戰與室町動亂 (600–1559年)', min: 500, max: 1559 },
    { id: 'mid', label: '⚔️ 戰國群雄與關原大坂 (1560–1638年)', min: 1560, max: 1638 },
    { id: 'late', label: '🌸 幕末戊辰與西南戰爭 (1850–1912年)', min: 1850, max: 1925 },
  ],
  // 二戰歐洲戰場依時期分段，不依年份：同一年可能跨兩個時期（規劃 v4 第 4.7 節）。
  europeWarAtlas: [
    { id: 'ewar_blitz', label: '⚔️ 開戰與閃電戰 (1939–1941年)', eraId: 'ewar_blitz' },
    { id: 'ewar_eastfront', label: '❄️ 東線開戰 (1941–1942年)', eraId: 'ewar_eastfront' },
    { id: 'ewar_turning', label: '🔥 戰局轉折 (1942–1943年)', eraId: 'ewar_turning' },
    { id: 'ewar_endgame', label: '🏁 盟軍反攻與德國投降 (1944–1945年)', eraId: 'ewar_endgame' },
  ],
};

// 戰役是否屬於某個分段。
export const battleInPhase = (battle, phase) => phase.eraId ? battle.eraId === phase.eraId
  : typeof phase.min === 'number' ? battle.year >= phase.min && battle.year <= phase.max : true;
