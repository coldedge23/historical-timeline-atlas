// Japan Feudal Warlord Periods & Tactical Campaigns GeoData
// Synchronized with Japan Geographic Bounds (820 x 720 Viewport)

export const JAPAN_WARLORD_PERIOD_CONFIGS = [
  {
    id: 'jp_year_1560',
    yearNumber: 1560,
    yearDisplay: '1560 年',
    shortLabel: '桶狹間之戰',
    headline: '桶狹間奇襲，織田信長天下布武之發端',
    subTitle: '今川義元兩萬五千西上上洛 · 信長三千疾馳出擊 · 田樂窪雨夜大逆轉',
    provinceWarlordMap: {
      jp_owari_mikawa: { warlord: '織田信長', color: '#fca5a5' },
      jp_suruga_totomi: { warlord: '今川義元', color: '#fbcfe8' },
      jp_kai_shinano: { warlord: '武田信玄', color: '#fecaca' },
      jp_echigo: { warlord: '上杉謙信', color: '#bae6fd' },
      jp_sagami: { warlord: '後北條氏', color: '#ddd6fe' },
      jp_musashi: { warlord: '後北條氏', color: '#ddd6fe' },
      jp_kanto_north: { warlord: '佐竹氏 / 宇都宮氏', color: '#e2e8f0' },
      jp_mino_hida: { warlord: '齋藤道三·義龍', color: '#fef08a' },
      jp_echizen_kaga_noto: { warlord: '朝倉義景 / 一向一揆', color: '#fed7aa' },
      jp_omi: { warlord: '淺井長政 / 六角氏', color: '#e2e8f0' },
      jp_yamashiro_settsu: { warlord: '足利將軍 / 三好長慶', color: '#ccfbf1' },
      jp_yamato_kii: { warlord: '畠山氏 / 根來眾', color: '#e2e8f0' },
      jp_harima_tamba: { warlord: '波多野氏 / 赤松氏', color: '#fef08a' },
      jp_bizen_mimasaka: { warlord: '浦上氏 / 宇喜多氏', color: '#fef08a' },
      jp_aki_bingo: { warlord: '毛利元就', color: '#bbf7d0' },
      jp_nagato_suo: { warlord: '毛利元就', color: '#bbf7d0' },
      jp_izumo_inaba: { warlord: '尼子義久', color: '#bfdbfe' },
      jp_iyo_sanuki_awa: { warlord: '河野氏 / 三好氏', color: '#ccfbf1' },
      jp_tosa: { warlord: '長宗我部元親', color: '#a5f3fc' },
      jp_bungo_hyuga: { warlord: '大友宗麟', color: '#fed7aa' },
      jp_chikuzen_hizen: { warlord: '龍造寺隆信 / 少貳氏', color: '#fef08a' },
      jp_higo: { warlord: '相良氏 / 阿蘇氏', color: '#e2e8f0' },
      jp_satsuma_osumi: { warlord: '島津貴久', color: '#fed7aa' },
      jp_mutsu_south: { warlord: '伊達晴宗 / 蘆名氏', color: '#fef08a' },
      jp_dewa: { warlord: '最上氏', color: '#e2e8f0' },
      jp_mutsu_north: { warlord: '南部氏 / 津輕氏', color: '#e2e8f0' },
      jp_hokkaido_south: { warlord: '蠣崎氏 (松前)', color: '#cbd5e1' },
      jp_hokkaido_main: { warlord: '阿伊努諸酋長', color: '#cbd5e1' },
      jp_tsushima: { warlord: '宗氏', color: '#e2e8f0' },
      jp_sado: { warlord: '本間氏', color: '#e2e8f0' },
      jp_awaji: { warlord: '安宅水軍', color: '#ccfbf1' }
    },
    labels: [
      { name: '織 田', pos: [412, 458], color: '#991b1b', size: 26 },
      { name: '今 川', pos: [464, 472], color: '#be123c', size: 24 },
      { name: '武 田', pos: [454, 424], color: '#7f1d1d', size: 26 },
      { name: '上 杉', pos: [462, 368], color: '#0369a1', size: 26 },
      { name: '北 條', pos: [516, 428], color: '#6d28d9', size: 26 },
      { name: '齋 藤', pos: [404, 432], color: '#b45309', size: 20 },
      { name: '毛 利', pos: [214, 488], color: '#166534', size: 26 },
      { name: '島 津', pos: [154, 616], color: '#78350f', size: 24 },
      { name: '大 友', pos: [185, 545], size: 22, color: '#9a3412' },
      { name: '長宗我部', pos: [270, 545], size: 20, color: '#0e7490' },
      { name: '伊 達', pos: [554, 345], size: 22, color: '#854d0e' },
      { name: '朝廷·足利', pos: [352, 466], size: 18, color: '#334155' }
    ],
    cities: [
      { name: '京都(帝都)', pos: [355, 471], isCap: true },
      { name: '清洲城', pos: [398, 463] },
      { name: '駿府城', pos: [460, 468] },
      { name: '岡崎城', pos: [412, 472] },
      { name: '躑躅崎館', pos: [465, 444] },
      { name: '春日山城', pos: [452, 384] },
      { name: '小田原城', pos: [488, 462] },
      { name: '稻葉山城', pos: [395, 454] },
      { name: '廣島城', pos: [225, 497] },
      { name: '鹿兒島', pos: [150, 612] }
    ],
    battles: [
      { name: '⚔️ 桶狹間之戰', pos: [403, 468], battleId: 'bat_jp_okehazama_1560' },
      { name: '⚔️ 川中島決戰', pos: [451, 406], battleId: 'bat_jp_kawanakajima_1561' }
    ],
    routes: [
      {
        label: '今川義元西上進軍線 (兩萬五千大軍上洛)',
        color: '#dc2626',
        path: 'M 460,468 Q 436,470 412,472 Q 406,470 403,468'
      },
      {
        label: '織田信長雨夜奇襲疾馳線 (清洲出擊)',
        color: '#2563eb',
        path: 'M 398,463 Q 399,465 403,468'
      }
    ],
    chronicleLeft: [
      '5月12日，今川義元自駿府起兵兩萬五千西進，意圖踏平尾張上洛稱霸。',
      '5月19日晨，今川軍前鋒松平元康（德川家康）攻陷織田方丸根·鷲津要塞。',
      '信長於清洲城跳起《敦盛》名句「人生五十年」，率輕騎疾馳熱田神宮祈勝。',
      '午後驟雨狂降，信長率三千精銳自後山迂迴，直搗今川本陣田樂窪，斬殺義元。'
    ],
    chronicleRight: [
      '戰後德川家康脫離今川氏獨立，與織田信長結成堅不可摧的「清洲同盟」。',
      '織田信長威名震懾列島，開啟吞併美濃稻葉山城、「天下布武」統一大業。'
    ]
  },
  {
    id: 'jp_year_1575',
    yearNumber: 1575,
    yearDisplay: '1575 年',
    shortLabel: '長篠之戰',
    headline: '長篠設樂原合戰，三段擊火繩槍陣大破赤備',
    subTitle: '織田信長德川家康聯軍 · 武田勝賴騎兵衝鋒 · 戰國軍事科技劃時代轉折',
    provinceWarlordMap: {
      jp_owari_mikawa: { warlord: '織田·德川聯軍', color: '#fca5a5' },
      jp_mino_hida: { warlord: '織田信長', color: '#fca5a5' },
      jp_omi: { warlord: '織田信長 (安土城)', color: '#fca5a5' },
      jp_yamashiro_settsu: { warlord: '織田信長 (天下中心)', color: '#fca5a5' },
      jp_suruga_totomi: { warlord: '德川家康 (濱松城)', color: '#fed7aa' },
      jp_kai_shinano: { warlord: '武田勝賴', color: '#fecaca' },
      jp_echigo: { warlord: '上杉謙信 (毘沙門天)', color: '#bae6fd' },
      jp_sagami: { warlord: '後北條氏', color: '#ddd6fe' },
      jp_musashi: { warlord: '後北條氏', color: '#ddd6fe' },
      jp_kanto_north: { warlord: '佐竹義重', color: '#e2e8f0' },
      jp_aki_bingo: { warlord: '毛利輝元', color: '#bbf7d0' },
      jp_nagato_suo: { warlord: '毛利輝元', color: '#bbf7d0' },
      jp_izumo_inaba: { warlord: '毛利輝元', color: '#bbf7d0' },
      jp_tosa: { warlord: '長宗我部元親', color: '#a5f3fc' },
      jp_satsuma_osumi: { warlord: '島津義久', color: '#fed7aa' },
      jp_bungo_hyuga: { warlord: '大友宗麟', color: '#fed7aa' },
      jp_chikuzen_hizen: { warlord: '龍造寺隆信', color: '#fef08a' },
      jp_mutsu_south: { warlord: '伊達氏 / 蘆名氏', color: '#fef08a' }
    },
    labels: [
      { name: '織 田 信 長', pos: [378, 442], color: '#991b1b', size: 28 },
      { name: '德 川', pos: [428, 468], color: '#c2410c', size: 22 },
      { name: '武 田 勝 賴', pos: [454, 424], color: '#7f1d1d', size: 26 },
      { name: '上 杉 謙 信', pos: [462, 368], color: '#0369a1', size: 26 },
      { name: '北 條', pos: [516, 428], color: '#6d28d9', size: 26 },
      { name: '毛 利', pos: [214, 488], color: '#166534', size: 26 },
      { name: '長宗我部', pos: [270, 545], size: 20, color: '#0e7490' },
      { name: '島 津', pos: [154, 616], color: '#78350f', size: 24 }
    ],
    cities: [
      { name: '京都(帝都)', pos: [355, 471], isCap: true },
      { name: '岐阜城', pos: [395, 454] },
      { name: '濱松城', pos: [432, 480] },
      { name: '春日山城', pos: [452, 384] },
      { name: '小田原城', pos: [488, 462] }
    ],
    battles: [
      { name: '⚔️ 長篠設樂原之戰', pos: [422, 468], battleId: 'bat_jp_nagashino_1575' },
      { name: '⚔️ 三方原之戰', pos: [432, 478], battleId: 'bat_jp_mikata_1573' }
    ],
    routes: [
      {
        label: '織田·德川三萬八千聯軍進軍線 (布設馬防柵)',
        color: '#2563eb',
        path: 'M 395,454 Q 408,460 422,468'
      },
      {
        label: '武田勝賴一萬五千赤備騎兵突擊線',
        color: '#dc2626',
        path: 'M 454,424 Q 438,446 422,468'
      }
    ],
    chronicleLeft: [
      '5月，武田信玄之子武田勝賴率一萬五千甲陽騎兵包圍長篠城。',
      '信長與家康率三萬八千聯軍馳援，於設樂原沿連吾川構築三重馬防柵。',
      '織田軍配備三千挺火繩槍（鐵砲），首創「三段擊交替射擊」輪番開火。',
      '武田山縣昌景、內藤昌豐、真田信綱等名將相繼中彈陣亡，武田軍幾近覆沒。'
    ],
    chronicleRight: [
      '長篠之役宣告戰國重騎兵稱霸時代終結，火器步兵成為戰場主宰。',
      '織田信長隨後興建宏偉安土城，確立天下霸權。'
    ]
  },
  {
    id: 'jp_year_1582',
    yearNumber: 1582,
    yearDisplay: '1582 年',
    shortLabel: '山崎之戰',
    headline: '本能寺之變與山崎之戰，秀吉中國大返還',
    subTitle: '明智光秀叛變敵在本能寺 · 羽柴秀吉七日奔馳兩百里 · 天王山山崎天下分界',
    provinceWarlordMap: {
      jp_yamashiro_settsu: { warlord: '羽柴秀吉 (山崎勝者)', color: '#fef08a' },
      jp_omi: { warlord: '明智光秀殘部', color: '#fee2e2' },
      jp_owari_mikawa: { warlord: '織田信雄 / 德川家康', color: '#fed7aa' },
      jp_suruga_totomi: { warlord: '德川家康 (伊賀穿越歸國)', color: '#fed7aa' },
      jp_kai_shinano: { warlord: '德川·北條爭奪中', color: '#fef08a' },
      jp_sagami: { warlord: '後北條氏', color: '#ddd6fe' },
      jp_musashi: { warlord: '後北條氏', color: '#ddd6fe' },
      jp_echigo: { warlord: '上杉景勝', color: '#bae6fd' },
      jp_aki_bingo: { warlord: '毛利輝元 (秀吉講和)', color: '#bbf7d0' },
      jp_nagato_suo: { warlord: '毛利輝元', color: '#bbf7d0' },
      jp_harima_tamba: { warlord: '羽柴秀吉大本營', color: '#fef08a' },
      jp_tosa: { warlord: '長宗我部元親', color: '#a5f3fc' },
      jp_satsuma_osumi: { warlord: '島津義久', color: '#fed7aa' }
    },
    labels: [
      { name: '羽柴秀吉', pos: [352, 468], color: '#ca8a04', size: 28 },
      { name: '明智光秀', pos: [362, 452], color: '#dc2626', size: 20 },
      { name: '德川家康', pos: [442, 470], color: '#c2410c', size: 24 },
      { name: '北 條', pos: [516, 428], color: '#6d28d9', size: 26 },
      { name: '上杉景勝', pos: [462, 368], color: '#0369a1', size: 24 },
      { name: '毛 利', pos: [214, 488], color: '#166534', size: 26 },
      { name: '長宗我部', pos: [270, 545], size: 20, color: '#0e7490' },
      { name: '島 津', pos: [154, 616], color: '#78350f', size: 24 }
    ],
    cities: [
      { name: '京都(本能寺)', pos: [355, 471], isCap: true },
      { name: '安土城', pos: [370, 466] },
      { name: '姬路城', pos: [313, 479] },
      { name: '備中高松城', pos: [260, 484] },
      { name: '小田原城', pos: [488, 462] }
    ],
    battles: [
      { name: '⚔️ 本能寺之變', pos: [355, 471], battleId: 'bat_jp_yamazaki_1582' },
      { name: '⚔️ 山崎之戰', pos: [352, 476], battleId: 'bat_jp_yamazaki_1582' }
    ],
    routes: [
      {
        label: '羽柴秀吉「中國大返還」神速進軍線 (七日奔馳兩百里)',
        color: '#2563eb',
        path: 'M 260,484 Q 286,480 313,479 Q 332,476 352,476'
      },
      {
        label: '明智光秀本能寺叛變與山崎佈陣線',
        color: '#dc2626',
        path: 'M 355,471 Q 353,474 352,476'
      }
    ],
    chronicleLeft: [
      '6月2日拂曉，明智光秀率一萬三千大軍襲擊京都本能寺，織田信長葬身火海。',
      '在備中水攻高松城的羽柴秀吉聞訊，火速與毛利氏議和，展開「中國大返還」。',
      '秀吉軍僅耗時七日強行軍兩百公里抵達攝津，號召信長舊部聚集四萬大軍。',
      '6月13日，雙方於天王山麓山崎決戰，光秀軍潰敗，光秀於逃亡途中殞命。'
    ],
    chronicleRight: [
      '秀吉在清洲會議中力主擁立信長幼孫三法師，迅速取代柴田勝家掌握織田政權。',
      '次年賤岳之戰擊敗柴田勝家，修築大坂城，開啟「太閤天下統一時代」。'
    ]
  },
  {
    id: 'jp_year_1600',
    yearNumber: 1600,
    yearDisplay: '1600 年',
    shortLabel: '關原大決戰',
    headline: '關原之戰，十六萬將士天下分水嶺',
    subTitle: '東軍德川家康東海道進軍 · 西軍石田三成大垣布陣 · 小早川秀秋問鐵砲背叛',
    provinceWarlordMap: {
      jp_musashi: { warlord: '東軍·德川家康天領', color: '#bfdbfe' },
      jp_sagami: { warlord: '東軍·德川家康', color: '#bfdbfe' },
      jp_kanto_north: { warlord: '東軍·結城秀康', color: '#bfdbfe' },
      jp_suruga_totomi: { warlord: '東軍陣營', color: '#bfdbfe' },
      jp_owari_mikawa: { warlord: '東軍·福島正則', color: '#bfdbfe' },
      jp_mino_hida: { warlord: '關原決戰戰場', color: '#fef08a' },
      jp_omi: { warlord: '西軍·石田三成 (佐和山)', color: '#fecaca' },
      jp_yamashiro_settsu: { warlord: '西軍·豐臣秀賴 (大坂城)', color: '#fecaca' },
      jp_yamato_kii: { warlord: '西軍·真田昌幸/幸村', color: '#fecaca' },
      jp_harima_tamba: { warlord: '東軍·池田輝政', color: '#bfdbfe' },
      jp_aki_bingo: { warlord: '西軍·毛利輝元 (總大將)', color: '#fecaca' },
      jp_nagato_suo: { warlord: '西軍·吉川廣家', color: '#fecaca' },
      jp_echigo: { warlord: '東軍·堀秀治', color: '#bfdbfe' },
      jp_mutsu_south: { warlord: '東軍·伊達政宗 / 最上', color: '#bfdbfe' },
      jp_kai_shinano: { warlord: '西軍·真田上田城堅守', color: '#fecaca' },
      jp_echizen_kaga_noto: { warlord: '東軍·前田利長 (百萬石)', color: '#bfdbfe' },
      jp_tosa: { warlord: '西軍·長宗我部盛親', color: '#fecaca' },
      jp_satsuma_osumi: { warlord: '西軍·島津義弘 (敵中突破)', color: '#fecaca' },
      jp_bungo_hyuga: { warlord: '東軍·黑田如水起兵', color: '#bfdbfe' }
    },
    labels: [
      { name: '東軍·德川家康', pos: [516, 428], color: '#1e3a8a', size: 28 },
      { name: '西軍·石田三成', pos: [378, 442], color: '#991b1b', size: 28 },
      { name: '豐臣秀賴 (大坂)', pos: [346, 485], color: '#c2410c', size: 20 },
      { name: '毛 利 輝 元', pos: [214, 488], color: '#166534', size: 24 },
      { name: '伊 達 政 宗', pos: [554, 345], color: '#854d0e', size: 24 },
      { name: '前 田 利 長', pos: [390, 392], color: '#b45309', size: 22 },
      { name: '島 津 義 弘', pos: [154, 616], color: '#78350f', size: 24 }
    ],
    cities: [
      { name: '大坂城(天下中心)', pos: [346, 485], isCap: true },
      { name: '京都(帝都)', pos: [355, 471] },
      { name: '江戶城(德川大營)', pos: [512, 444] },
      { name: '佐和山城', pos: [375, 454] },
      { name: '大垣城', pos: [390, 456] },
      { name: '伏見城', pos: [356, 474] }
    ],
    battles: [
      { name: '⚔️ 關原大決戰', pos: [383, 457], battleId: 'bat_jp_sekigahara_1600' }
    ],
    routes: [
      {
        label: '東軍德川家康東海道進軍線 (七萬五千主力)',
        color: '#1e3a8a',
        path: 'M 512,444 Q 460,468 414,466 Q 398,460 383,457'
      },
      {
        label: '西軍石田三成大垣城轉進關原佈陣線',
        color: '#dc2626',
        path: 'M 390,456 Q 386,456 383,457'
      },
      {
        label: '島津義弘「敵中突破」正面突圍死鬥撤退線',
        color: '#16a34a',
        path: 'M 383,457 Q 380,480 346,485 Q 260,520 150,612'
      }
    ],
    chronicleLeft: [
      '9月15日清晨濃霧散去，東西軍十六萬主力於美濃關原峽谷正面碰撞。',
      '石田三成笹尾山本陣、宇喜多秀家、大谷吉繼激戰東軍福島正則、井伊直政。',
      '松尾山上一萬五千小早川秀秋部隊坐山觀虎鬥，家康怒開鐵砲威嚇（問鐵砲）。',
      '正午小早川軍背叛倒戈衝下山痛擊大谷吉繼，西軍全線瓦解，三成兵敗被俘。'
    ],
    chronicleRight: [
      '島津義弘率千餘薩摩兵上演名垂青史的「敵中突破」，正面殺穿家康本陣撤退。',
      '德川家康論功行賞，大幅削減改易西軍大名，三年後就任征夷大將軍建立江戶幕府。'
    ]
  },
  {
    id: 'jp_year_1615',
    yearNumber: 1615,
    yearDisplay: '1615 年',
    shortLabel: '大坂之陣',
    headline: '大坂夏之陣，真田幸村最後突擊與元和偃武',
    subTitle: '方廣寺鐘銘起釁 · 德川二十萬大軍包圍大坂城 · 日本第一兵孤軍衝鋒 · 豐臣滅亡',
    provinceWarlordMap: {
      jp_musashi: { warlord: '德川幕府天領 (江戶)', color: '#fef08a' },
      jp_sagami: { warlord: '德川幕府天領', color: '#fef08a' },
      jp_kanto_north: { warlord: '德川譜代大名', color: '#fef08a' },
      jp_suruga_totomi: { warlord: '駿府大御所家康', color: '#fef08a' },
      jp_owari_mikawa: { warlord: '尾張德川家 (御三家)', color: '#fef08a' },
      jp_yamato_kii: { warlord: '紀州德川家 (御三家)', color: '#fef08a' },
      jp_yamashiro_settsu: { warlord: '豐臣秀賴 / 大坂城浪人眾', color: '#fecaca' },
      jp_echizen_kaga_noto: { warlord: '加賀前田藩 (百萬石)', color: '#fef08a' },
      jp_aki_bingo: { warlord: '廣島福島氏 / 毛利氏', color: '#bbf7d0' },
      jp_satsuma_osumi: { warlord: '薩摩島津藩', color: '#fed7aa' },
      jp_nagato_suo: { warlord: '長州毛利藩', color: '#bbf7d0' },
      jp_tosa: { warlord: '土佐山內藩', color: '#bae6fd' },
      jp_mutsu_south: { warlord: '仙台伊達藩', color: '#fef08a' }
    },
    labels: [
      { name: '德 川 幕 府 (將軍天領)', pos: [516, 428], color: '#854d0e', size: 30 },
      { name: '豐臣秀賴·真田幸村', pos: [346, 485], color: '#dc2626', size: 24 },
      { name: '前 田 藩 (百萬石)', pos: [390, 392], color: '#d97706', size: 24 },
      { name: '薩 摩 島 津 藩', pos: [154, 616], color: '#c2410c', size: 26 },
      { name: '長 州 毛 利 藩', pos: [184, 498], color: '#15803d', size: 24 },
      { name: '仙 台 伊 達 藩', pos: [554, 345], color: '#b45309', size: 24 }
    ],
    cities: [
      { name: '江戶(將軍府)', pos: [512, 444], isCap: true },
      { name: '京都(帝都)', pos: [355, 471] },
      { name: '大坂城(五層天守)', pos: [346, 485] },
      { name: '駿府城(大御所)', pos: [460, 468] },
      { name: '日光東照宮', pos: [530, 405] }
    ],
    battles: [
      { name: '⚔️ 大坂夏之陣', pos: [346, 485], battleId: 'bat_jp_osaka_natsu_1615' }
    ],
    routes: [
      {
        label: '德川幕府二十萬大軍包圍進攻線 (家康·秀忠)',
        color: '#1e3a8a',
        path: 'M 512,444 Q 460,468 414,466 Q 370,480 346,485'
      },
      {
        label: '真田幸村赤備敢死隊天王寺正面突擊線 (直取家康本陣)',
        color: '#dc2626',
        path: 'M 346,485 Q 350,488 355,486'
      }
    ],
    chronicleLeft: [
      '1614年冬，德川幕府以「國家安康·君臣豐樂」鐘銘字樣發動大坂冬之陣。',
      '真田幸村築「真田丸」出丸，以火繩槍與交叉火力重創德川數萬前鋒。',
      '雙方媾和後德川軍藉機填平大坂城內外護城河，使巨城喪失險阻。',
      '1615年5月夏之陣爆發，真田幸村率赤備三度正面突破家康本陣，幾斬家康。'
    ],
    chronicleRight: [
      '幸村力竭戰死於安居神社，被譽為「日本第一兵」；大坂天守陷落，秀賴自裁。',
      '戰後宣布「元和偃武」，戰國百年大亂平定，開啟二百五十年和平江戶時代。'
    ]
  },
  {
    id: 'jp_year_1868',
    yearNumber: 1868,
    yearDisplay: '1868 年',
    shortLabel: '鳥羽伏見倒幕',
    headline: '鳥羽伏見與戊辰戰爭，薩長倒幕菊花錦旗',
    subTitle: '大政奉還德川慶喜退守 · 薩長官軍迎奉錦旗 · 江戶無血開城 · 蝦夷五稜郭終戰',
    provinceWarlordMap: {
      jp_satsuma_osumi: { warlord: '倒幕雄藩·薩摩藩 (西鄉隆盛)', color: '#fed7aa' },
      jp_nagato_suo: { warlord: '倒幕雄藩·長州藩 (木戶孝允)', color: '#bbf7d0' },
      jp_tosa: { warlord: '倒幕雄藩·土佐藩 (坂本龍馬海援隊)', color: '#bae6fd' },
      jp_yamashiro_settsu: { warlord: '明治新政府官軍大本營', color: '#fed7aa' },
      jp_musashi: { warlord: '德川幕府 (江戶城)', color: '#bfdbfe' },
      jp_mutsu_south: { warlord: '奧羽越列藩同盟·會津藩', color: '#fecaca' },
      jp_hokkaido_south: { warlord: '蝦夷共和國 (榎本武揚·土方歲三)', color: '#ddd6fe' }
    },
    labels: [
      { name: '官軍·薩摩長州', pos: [352, 468], color: '#ea580c', size: 28 },
      { name: '德川幕府 (江戶)', pos: [516, 428], color: '#1e3a8a', size: 28 },
      { name: '會津藩·新選組', pos: [536, 368], color: '#b91c1c', size: 24 },
      { name: '土佐藩·海援隊', pos: [270, 545], size: 24, color: '#0284c7' },
      { name: '五稜郭·土方歲三', pos: [554, 182], size: 20, color: '#6d28d9' }
    ],
    cities: [
      { name: '京都(御所/二條城)', pos: [355, 471], isCap: true },
      { name: '江戶(無血開城)', pos: [512, 444] },
      { name: '會津若松城(白虎隊)', pos: [519, 369] },
      { name: '箱館五稜郭(西洋星堡)', pos: [551, 192] },
      { name: '鹿兒島', pos: [150, 612] },
      { name: '萩(松下村塾)', pos: [184, 496] }
    ],
    battles: [
      { name: '⚔️ 鳥羽伏見之戰', pos: [355, 473], battleId: 'bat_jp_toba_fushimi_1868' },
      { name: '⚔️ 箱館五稜郭之戰', pos: [551, 192], battleId: 'bat_jp_goryokaku_1869' }
    ],
    routes: [
      {
        label: '薩長官軍奉「菊花錦旗」東征進軍線 (東海道進軍江戶)',
        color: '#16a34a',
        path: 'M 355,473 Q 420,465 512,444'
      },
      {
        label: '舊幕府海軍北撤蝦夷建立五稜郭線 (榎本·土方)',
        color: '#dc2626',
        path: 'M 512,444 Q 560,340 551,192'
      }
    ],
    chronicleLeft: [
      '1867年德川慶喜在二條城宣布「大政奉還」，然朝廷密敕討幕引爆危機。',
      '1868年1月鳥羽伏見之戰，五千薩長軍迎奉「菊花錦旗」，幕府一萬五千軍大敗潰退。',
      '西鄉隆盛率官軍兵臨江戶，與幕臣勝海舟密會，達成「江戶無血開城」，救百萬平民。',
      '會津若松城白虎隊少年英勇壯烈自刃殉國，會津籠城戰一個月後降伏。'
    ],
    chronicleRight: [
      '舊幕府海軍總裁榎本武揚率八艘軍艦載土方歲三北上蝦夷，建立五稜郭共和國。',
      '1869年新政府軍陸海圍攻五稜郭，土方歲三中彈戰歿，戊辰戰爭全面結束。'
    ]
  },
  {
    id: 'jp_year_1877',
    yearNumber: 1877,
    yearDisplay: '1877 年',
    shortLabel: '西南戰爭',
    headline: '西南戰爭田原坂，最後武士與明治維新確立',
    subTitle: '西鄉隆盛薩摩士族起義 · 熊本城圍攻 · 田原坂血戰 · 近代徵兵制勝武士道',
    provinceWarlordMap: {
      jp_satsuma_osumi: { warlord: '西鄉隆盛·薩摩私學校軍', color: '#fecaca' },
      jp_higo: { warlord: '田原坂·熊本城激戰區', color: '#fef08a' },
      jp_musashi: { warlord: '大日本帝國新政府 (東京)', color: '#bfdbfe' },
      jp_yamashiro_settsu: { warlord: '明治新政府統治區', color: '#bfdbfe' },
      jp_hokkaido_main: { warlord: '北海道開拓使 (屯田兵)', color: '#bae6fd' }
    },
    labels: [
      { name: '大日本帝國政府', pos: [516, 428], color: '#1d4ed8', size: 30 },
      { name: '薩摩義軍·西鄉隆盛', pos: [154, 616], color: '#dc2626', size: 26 },
      { name: '北海道開拓使', pos: [634, 118], color: '#0284c7', size: 24 }
    ],
    cities: [
      { name: '東京(帝都皇居)', pos: [512, 444], isCap: true },
      { name: '熊本城(鎮台)', pos: [156, 562] },
      { name: '鹿兒島(城山)', pos: [150, 612] },
      { name: '橫濱開港', pos: [514, 452] }
    ],
    battles: [
      { name: '⚔️ 田原坂血戰', pos: [152, 558], battleId: 'bat_jp_tabaruzaka_1877' },
      { name: '⚔️ 對馬海峽海戰', pos: [100, 480], battleId: 'bat_jp_tsushima_1905' }
    ],
    routes: [
      {
        label: '薩摩西鄉軍北上包圍熊本城路線',
        color: '#dc2626',
        path: 'M 150,612 Q 152,580 156,562'
      },
      {
        label: '政府徵兵新軍自博多南下增援田原坂路線',
        color: '#2563eb',
        path: 'M 144,529 Q 148,545 152,558'
      }
    ],
    chronicleLeft: [
      '1877年2月，廢刀令與秩祿處分引爆士族絕望，西鄉隆盛率三萬薩摩軍北上「質問政府」。',
      '谷干城指揮政府軍死守加藤清正建造的熊本巨城，薩摩軍久攻不克。',
      '3月雙方在田原坂展開十七晝夜血戰，雨中白刃肉搏，警視廳「拔刀隊」夜襲戰名震天下。',
      '政府平民徵兵新軍憑藉連發來福槍與充沛彈藥重創武士軍，田原坂失守。'
    ],
    chronicleRight: [
      '9月24日，西鄉隆盛在鹿兒島城山中彈，由別府晉介介錯自盡，「最後武士時代」終結。',
      '西南戰爭奠定近代中央徵兵軍隊地位，明治維新全面推展工業立憲，躍居東亞列強。'
    ]
  }
];
