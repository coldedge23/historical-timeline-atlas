// Japan Feudal Warlord Periods & Tactical Campaigns GeoData
// Mapped to 47 Real Official GIS Prefectures (Rotated Horizontal Atlas Viewport)

export const JAPAN_WARLORD_PERIOD_CONFIGS = [
  {
    id: 'jp_year_1560',
    yearNumber: 1560,
    yearDisplay: '1560 年',
    shortLabel: '桶狹間之戰',
    headline: '桶狹間奇襲，織田信長天下布武之發端',
    subTitle: '今川義元兩萬五千西上上洛 · 信長三千精兵清洲疾馳 · 田樂窪雨夜大逆轉',
    clashCard: {
      eraTitle: '公元 1560 年 (永祿三年)',
      conflicts: [
        { attacker: '織田氏', arrow: '→', defender: '今川氏', note: '桶狹間之戰 · 斬殺義元' },
        { attacker: '武田氏', arrow: '↔', defender: '上杉氏', note: '川中島合戰 · 龍虎相搏' },
        { attacker: '毛利氏', arrow: '→', defender: '尼子氏', note: '嚴島合戰後西國爭雄' },
        { attacker: '大友氏', arrow: '↔', defender: '龍造寺氏', note: '北九州霸權逐鹿' }
      ]
    },
    prefectureWarlords: {
      aichi: { warlord: '織田信長', color: '#fca5a5' },
      shizuoka: { warlord: '今川義元', color: '#fbcfe8' },
      yamanashi: { warlord: '武田信玄', color: '#fecaca' },
      nagano: { warlord: '武田信玄', color: '#fecaca' },
      niigata: { warlord: '上杉謙信', color: '#bae6fd' },
      toyama: { warlord: '上杉謙信', color: '#bae6fd' },
      kanagawa: { warlord: '後北條氏', color: '#ddd6fe' },
      tokyo: { warlord: '後北條氏', color: '#ddd6fe' },
      saitama: { warlord: '後北條氏', color: '#ddd6fe' },
      chiba: { warlord: '後北條氏 / 里見氏', color: '#ddd6fe' },
      gunma: { warlord: '上杉氏 / 長野業正', color: '#bae6fd' },
      tochigi: { warlord: '宇都宮氏', color: '#e2e8f0' },
      ibaraki: { warlord: '佐竹義昭', color: '#e2e8f0' },
      gifu: { warlord: '齋藤道三·義龍', color: '#fef08a' },
      mie: { warlord: '北畠具教', color: '#e2e8f0' },
      shiga: { warlord: '淺井長政 / 六角義賢', color: '#fed7aa' },
      kyoto: { warlord: '足利將軍 / 三好長慶', color: '#ccfbf1' },
      osaka: { warlord: '三好長慶', color: '#ccfbf1' },
      hyogo: { warlord: '赤松氏 / 別所氏', color: '#e2e8f0' },
      nara: { warlord: '松永久秀', color: '#fef08a' },
      wakayama: { warlord: '根來眾 / 雜賀眾', color: '#e2e8f0' },
      okayama: { warlord: '浦上宗景 / 宇喜多氏', color: '#fef08a' },
      hiroshima: { warlord: '毛利元就', color: '#bbf7d0' },
      yamaguchi: { warlord: '毛利元就', color: '#bbf7d0' },
      shimane: { warlord: '尼子義久', color: '#bfdbfe' },
      tottori: { warlord: '山名氏', color: '#e2e8f0' },
      kagawa: { warlord: '三好氏', color: '#ccfbf1' },
      tokushima: { warlord: '三好氏', color: '#ccfbf1' },
      ehime: { warlord: '河野氏', color: '#e2e8f0' },
      kochi: { warlord: '長宗我部元親', color: '#a5f3fc' },
      fukuoka: { warlord: '大友氏 / 少貳氏', color: '#fed7aa' },
      saga: { warlord: '龍造寺隆信', color: '#fef08a' },
      nagasaki: { warlord: '大村純忠 / 松浦氏', color: '#fef08a' },
      oita: { warlord: '大友宗麟', color: '#fed7aa' },
      kumamoto: { warlord: '相良氏 / 阿蘇氏', color: '#e2e8f0' },
      miyazaki: { warlord: '伊東義祐', color: '#e2e8f0' },
      kagoshima: { warlord: '島津貴久', color: '#fed7aa' },
      fukushima: { warlord: '蘆名盛氏', color: '#fef08a' },
      miyagi: { warlord: '伊達晴宗', color: '#fef08a' },
      yamagata: { warlord: '最上義守', color: '#e2e8f0' },
      akita: { warlord: '安東愛季', color: '#e2e8f0' },
      iwate: { warlord: '南部晴政', color: '#e2e8f0' },
      aomori: { warlord: '南部晴政', color: '#e2e8f0' },
      hokkaido: { warlord: '蠣崎季廣 (松前)', color: '#cbd5e1' },
      okinawa: { warlord: '琉球王國 (尚元王)', color: '#e2e8f0' },
      fukui: { warlord: '朝倉義景', color: '#fed7aa' },
      ishikawa: { warlord: '一向一揆', color: '#fed7aa' }
    },
    labels: [
      { name: '織 田', pos: [530, 518], color: '#991b1b', size: 19 },
      { name: '今 川', pos: [595, 550], color: '#be123c', size: 19 },
      { name: '武 田', pos: [623, 495], color: '#7f1d1d', size: 20 },
      { name: '上 杉', pos: [665, 400], color: '#0369a1', size: 20 },
      { name: '北 條', pos: [675, 525], color: '#6d28d9', size: 20 },
      { name: '齋 藤', pos: [535, 480], color: '#b45309', size: 17 },
      { name: '毛 利', pos: [275, 485], color: '#166534', size: 20 },
      { name: '島 津', pos: [140, 635], color: '#78350f', size: 19 },
      { name: '大 友', pos: [220, 555], color: '#9a3412', size: 18 },
      { name: '長宗我部', pos: [325, 570], color: '#0e7490', size: 17 },
      { name: '伊 達', pos: [800, 375], color: '#854d0e', size: 19 },
      { name: '朝 倉', pos: [495, 465], color: '#334155', size: 17 },
      { name: '松前·蠣崎', pos: [120, 195], color: '#475569', size: 14 }
    ],
    cities: [
      { name: '京都(帝都)', pos: [468, 509], isCap: true },
      { name: '清洲城', pos: [527, 513] },
      { name: '駿府城', pos: [600, 552] },
      { name: '岡崎城', pos: [545, 535] },
      { name: '躑躅崎館', pos: [623, 510] },
      { name: '春日山城', pos: [633, 413] },
      { name: '小田原城', pos: [645, 546] },
      { name: '稻葉山城', pos: [527, 499] },
      { name: '廣島城', pos: [289, 496] },
      { name: '鹿兒島', pos: [140, 641] }
    ],
    battles: [
      { name: '⚔️ 桶狹間之戰', pos: [530, 525], battleId: 'bat_jp_okehazama_1560' },
      { name: '⚔️ 川中島決戰', pos: [622, 447], battleId: 'bat_jp_kawanakajima_1561' }
    ],
    routes: [
      {
        label: '今川義元兩萬五千西上進軍線',
        color: '#dc2626',
        path: 'M 600,552 Q 565,558 545,535 Q 538,530 530,525'
      },
      {
        label: '織田信長雨夜奇襲疾馳線 (清洲出擊)',
        color: '#2563eb',
        path: 'M 527,513 Q 528,519 530,525'
      }
    ],
    chronicleLeft: [
      '5月12日，今川義元自駿府起兵兩萬五千西進，踏平尾張意圖上洛稱霸。',
      '5月19日晨，今川前鋒松平元康（德川家康）攻破織田方丸根要塞。',
      '信長於清洲城跳起《敦盛》「人生五十年」，率部疾馳熱田神宮祈勝。',
      '午後驟雨狂降，信長率三千精兵自後山迂迴，直搗今川本陣田樂窪斬殺義元。'
    ],
    chronicleRight: [
      '戰後德川家康脫離今川氏獨立，與織田信長結成牢不可破的「清洲同盟」。',
      '信長威名震懾東瀛，攻克稻葉山城更名岐阜，展開「天下布武」統一大業。'
    ]
  },
  {
    id: 'jp_year_1575',
    yearNumber: 1575,
    yearDisplay: '1575 年',
    shortLabel: '長篠之戰',
    headline: '長篠設樂原合戰，三段擊火繩槍陣大破赤備',
    subTitle: '織田信長德川家康聯軍 · 武田勝賴騎兵衝鋒 · 戰國軍事科技劃時代轉折',
    clashCard: {
      eraTitle: '公元 1575 年 (天正三年)',
      conflicts: [
        { attacker: '織田·德川聯軍', arrow: '→', defender: '武田勝賴', note: '設樂原三段擊 · 大破赤備' },
        { attacker: '織田信長', arrow: '↔', defender: '石山本願寺', note: '石山合戰 · 信長包圍網' },
        { attacker: '長宗我部', arrow: '→', defender: '四國諸豪', note: '土佐統一 · 經略四國' },
        { attacker: '毛利輝元', arrow: '↔', defender: '織田水軍', note: '支援本願寺兵糧' }
      ]
    },
    prefectureWarlords: {
      aichi: { warlord: '織田·德川聯軍', color: '#fca5a5' },
      gifu: { warlord: '織田信長', color: '#fca5a5' },
      shiga: { warlord: '織田信長 (安土城)', color: '#fca5a5' },
      kyoto: { warlord: '織田信長 (天下中心)', color: '#fca5a5' },
      osaka: { warlord: '石山本願寺 / 織田包圍', color: '#fef08a' },
      shizuoka: { warlord: '德川家康 (濱松城)', color: '#fed7aa' },
      yamanashi: { warlord: '武田勝賴', color: '#fecaca' },
      nagano: { warlord: '武田勝賴', color: '#fecaca' },
      niigata: { warlord: '上杉謙信 (毘沙門天)', color: '#bae6fd' },
      toyama: { warlord: '上杉謙信', color: '#bae6fd' },
      kanagawa: { warlord: '後北條氏', color: '#ddd6fe' },
      tokyo: { warlord: '後北條氏', color: '#ddd6fe' },
      saitama: { warlord: '後北條氏', color: '#ddd6fe' },
      hiroshima: { warlord: '毛利輝元', color: '#bbf7d0' },
      yamaguchi: { warlord: '毛利輝元', color: '#bbf7d0' },
      kochi: { warlord: '長宗我部元親', color: '#a5f3fc' },
      kagoshima: { warlord: '島津義久', color: '#fed7aa' }
    },
    labels: [
      { name: '織 田', pos: [515, 485], color: '#991b1b', size: 22 },
      { name: '德 川', pos: [565, 545], color: '#c2410c', size: 19 },
      { name: '武 田', pos: [620, 490], color: '#7f1d1d', size: 20 },
      { name: '上 杉', pos: [655, 400], color: '#0369a1', size: 20 },
      { name: '北 條', pos: [675, 525], color: '#6d28d9', size: 20 },
      { name: '毛 利', pos: [275, 485], color: '#166534', size: 20 },
      { name: '長宗我部', pos: [325, 570], color: '#0e7490', size: 17 },
      { name: '島 津', pos: [140, 635], color: '#78350f', size: 19 }
    ],
    cities: [
      { name: '京都(帝都)', pos: [468, 509], isCap: true },
      { name: '岐阜城', pos: [527, 499] },
      { name: '濱松城', pos: [562, 558] },
      { name: '春日山城', pos: [633, 413] },
      { name: '小田原城', pos: [645, 546] }
    ],
    battles: [
      { name: '⚔️ 長篠之戰', pos: [555, 535], battleId: 'bat_jp_nagashino_1575' },
      { name: '⚔️ 三方原之戰', pos: [565, 555], battleId: 'bat_jp_mikata_1573' }
    ],
    routes: [
      {
        label: '織田·德川三萬八千聯軍設樂原設防線 (三段擊火繩槍)',
        color: '#2563eb',
        path: 'M 527,499 Q 535,520 555,535'
      },
      {
        label: '武田勝賴一萬五千赤備騎兵突擊線',
        color: '#dc2626',
        path: 'M 623,510 Q 585,525 555,535'
      }
    ],
    chronicleLeft: [
      '5月，武田勝賴率一萬五千甲陽赤備軍包圍德川要塞長篠城。',
      '信長與家康率三萬八千聯軍馳援，於設樂原沿連吾川構築三重馬防柵。',
      '織田軍集結三千挺火繩槍（鐵砲），首創「三段擊交替射擊」輪番射擊。',
      '武田軍山縣昌景、內藤昌豐等名將相繼中彈陣亡，甲陽騎兵全軍覆沒。'
    ],
    chronicleRight: [
      '長篠之戰宣告重騎兵稱霸時代終結，火器步兵成為戰場主宰。',
      '信長隨後在琵琶湖畔興建七層天守安土城，確立霸業。'
    ]
  },
  {
    id: 'jp_year_1582',
    yearNumber: 1582,
    yearDisplay: '1582 年',
    shortLabel: '山崎之戰',
    headline: '本能寺之變與山崎之戰，秀吉中國大返還',
    subTitle: '明智光秀叛變敵在本能寺 · 羽柴秀吉七日奔馳兩百里 · 天王山合戰奠定太閤霸業',
    clashCard: {
      eraTitle: '公元 1582 年 (天正十年)',
      conflicts: [
        { attacker: '明智光秀', arrow: '→', defender: '織田信長', note: '京都本能寺之變 · 信長殞命' },
        { attacker: '羽柴秀吉', arrow: '→', defender: '明智光秀', note: '中國大返還 · 山崎天王山大捷' },
        { attacker: '德川家康', arrow: '→', defender: '三河返還', note: '伊賀險道穿越 · 脫險歸國' },
        { attacker: '北條氏', arrow: '↔', defender: '上杉景勝', note: '天正壬午之亂 · 爭奪信濃' }
      ]
    },
    prefectureWarlords: {
      kyoto: { warlord: '羽柴秀吉 (山崎勝者)', color: '#fef08a' },
      osaka: { warlord: '羽柴秀吉', color: '#fef08a' },
      hyogo: { warlord: '羽柴秀吉大本營', color: '#fef08a' },
      shiga: { warlord: '明智光秀殘部', color: '#fee2e2' },
      aichi: { warlord: '織田信雄 / 德川家康', color: '#fed7aa' },
      shizuoka: { warlord: '德川家康 (伊賀歸國)', color: '#fed7aa' },
      kanagawa: { warlord: '後北條氏', color: '#ddd6fe' },
      tokyo: { warlord: '後北條氏', color: '#ddd6fe' },
      niigata: { warlord: '上杉景勝', color: '#bae6fd' },
      hiroshima: { warlord: '毛利輝元 (秀吉和議)', color: '#bbf7d0' },
      yamaguchi: { warlord: '毛利輝元', color: '#bbf7d0' },
      kochi: { warlord: '長宗我部元親', color: '#a5f3fc' },
      kagoshima: { warlord: '島津義久', color: '#fed7aa' }
    },
    labels: [
      { name: '秀 吉', pos: [445, 510], color: '#ca8a04', size: 21 },
      { name: '光 秀', pos: [465, 475], color: '#dc2626', size: 17 },
      { name: '德 川', pos: [585, 545], color: '#c2410c', size: 19 },
      { name: '北 條', pos: [675, 525], color: '#6d28d9', size: 20 },
      { name: '上 杉', pos: [655, 400], color: '#0369a1', size: 20 },
      { name: '毛 利', pos: [275, 485], color: '#166534', size: 20 },
      { name: '長宗我部', pos: [325, 570], color: '#0e7490', size: 17 },
      { name: '島 津', pos: [140, 635], color: '#78350f', size: 19 }
    ],
    cities: [
      { name: '京都(本能寺)', pos: [468, 509], isCap: true },
      { name: '安土城', pos: [490, 506] },
      { name: '姬路城', pos: [420, 498] },
      { name: '備中高松城', pos: [365, 495] },
      { name: '小田原城', pos: [645, 546] }
    ],
    battles: [
      { name: '⚔️ 本能寺之變', pos: [468, 509], battleId: 'bat_jp_yamazaki_1582' },
      { name: '⚔️ 山崎之戰', pos: [458, 515], battleId: 'bat_jp_yamazaki_1582' }
    ],
    routes: [
      {
        label: '羽柴秀吉「中國大返還」神速進軍線 (七日奔馳兩百里)',
        color: '#2563eb',
        path: 'M 365,495 Q 400,498 420,498 Q 440,510 458,515'
      },
      {
        label: '明智光秀本能寺叛變與天王山佈陣線',
        color: '#dc2626',
        path: 'M 450,485 L 468,509 L 458,515'
      }
    ],
    chronicleLeft: [
      '6月2日拂曉，明智光秀叛變突襲京都本能寺，織田信長葬身火海。',
      '備中水攻高松城的羽柴秀吉聞訊，火速與毛利氏議和，展開「中國大返還」。',
      '秀吉軍僅七日強行軍兩百公里抵達攝津，號召信長舊部集結四萬大軍。',
      '6月13日雙方於天王山麓山崎決戰，光秀軍崩潰，光秀逃亡途中殞命。'
    ],
    chronicleRight: [
      '清洲會議秀吉力主擁立信長幼孫三法師，迅速擊敗柴田勝家掌握政權。',
      '次年築大阪城，降服四國九州，展開太閤天下統一大業。'
    ]
  },
  {
    id: 'jp_year_1600',
    yearNumber: 1600,
    yearDisplay: '1600 年',
    shortLabel: '關原大決戰',
    headline: '關原之戰，十六萬將士天下分水嶺',
    subTitle: '東軍德川家康東海道進軍 · 西軍石田三成大垣布陣 · 小早川秀秋問鐵砲背叛',
    clashCard: {
      eraTitle: '公元 1600 年 (慶長五年)',
      conflicts: [
        { attacker: '東軍 (德川家康)', arrow: '↔', defender: '西軍 (石田三成)', note: '關原大決戰 · 十六萬將士爭天下' },
        { attacker: '西軍 (上杉景勝)', arrow: '↔', defender: '東軍 (最上·伊達)', note: '奧羽合戰 · 長谷堂城退卻' },
        { attacker: '島津義弘', arrow: '→', defender: '東軍本陣', note: '敵中突破 · 正面穿透突圍' },
        { attacker: '東軍 (加藤·黑田)', arrow: '→', defender: '西軍諸城', note: '九州掃討戰' }
      ]
    },
    prefectureWarlords: {
      tokyo: { warlord: '東軍·德川家康天領', color: '#bfdbfe' },
      kanagawa: { warlord: '東軍·德川家康', color: '#bfdbfe' },
      saitama: { warlord: '東軍·德川家康', color: '#bfdbfe' },
      chiba: { warlord: '東軍·德川家康', color: '#bfdbfe' },
      ibaraki: { warlord: '佐竹義宣 (觀望中立)', color: '#e2e8f0' },
      tochigi: { warlord: '東軍·結城秀康', color: '#bfdbfe' },
      gunma: { warlord: '東軍·井伊直政', color: '#bfdbfe' },
      shizuoka: { warlord: '東軍陣營', color: '#bfdbfe' },
      aichi: { warlord: '東軍·福島正則', color: '#bfdbfe' },
      gifu: { warlord: '關原決戰戰場', color: '#fef08a' },
      shiga: { warlord: '西軍·石田三成 (佐和山)', color: '#fecaca' },
      kyoto: { warlord: '西軍勢力圈', color: '#fecaca' },
      osaka: { warlord: '西軍·豐臣秀賴 (大坂城)', color: '#fecaca' },
      nara: { warlord: '西軍·真田昌幸/幸村', color: '#fecaca' },
      hyogo: { warlord: '東軍·池田輝政', color: '#bfdbfe' },
      hiroshima: { warlord: '西軍·毛利輝元 (總大將)', color: '#fecaca' },
      yamaguchi: { warlord: '西軍·吉川廣家', color: '#fecaca' },
      fukushima: { warlord: '西軍·上杉景勝 (會津)', color: '#fecaca' },
      miyagi: { warlord: '東軍·伊達政宗', color: '#bfdbfe' },
      ishikawa: { warlord: '東軍·前田利長 (百萬石)', color: '#bfdbfe' },
      toyama: { warlord: '東軍·前田利長', color: '#bfdbfe' },
      kochi: { warlord: '西軍·長宗我部盛親', color: '#fecaca' },
      kagoshima: { warlord: '西軍·島津義弘 (敵中突破)', color: '#fecaca' }
    },
    labels: [
      { name: '德 川', pos: [680, 515], color: '#1e3a8a', size: 21 },
      { name: '石 田', pos: [495, 485], color: '#991b1b', size: 19 },
      { name: '豐 臣', pos: [440, 525], color: '#c2410c', size: 18 },
      { name: '毛 利', pos: [275, 485], color: '#166534', size: 20 },
      { name: '前 田', pos: [560, 410], color: '#d97706', size: 18 },
      { name: '上 杉', pos: [730, 420], color: '#0284c7', size: 18 },
      { name: '伊 達', pos: [800, 375], color: '#b45309', size: 20 },
      { name: '島 津', pos: [140, 635], color: '#78350f', size: 18 },
      { name: '長宗我部', pos: [325, 570], color: '#0284c7', size: 16 }
    ],
    cities: [
      { name: '大坂城(天下中心)', pos: [449, 525], isCap: true },
      { name: '京都(帝都)', pos: [468, 509] },
      { name: '江戶城(德川本營)', pos: [680, 528] },
      { name: '佐和山城', pos: [495, 498] },
      { name: '大垣城', pos: [525, 499] }
    ],
    battles: [
      { name: '⚔️ 關原大決戰', pos: [510, 498], battleId: 'bat_jp_sekigahara_1600' }
    ],
    routes: [
      {
        label: '東軍德川家康東海道進軍線 (七萬五千主力)',
        color: '#1e3a8a',
        path: 'M 680,528 Q 600,552 550,530 Q 525,510 510,498'
      },
      {
        label: '西軍石田三成大垣城轉進關原佈陣線',
        color: '#dc2626',
        path: 'M 525,499 L 510,498'
      },
      {
        label: '島津義弘「敵中突破」正面突圍死鬥撤退線',
        color: '#16a34a',
        path: 'M 510,498 Q 475,540 430,570 Q 280,550 140,641'
      }
    ],
    chronicleLeft: [
      '9月15日清晨濃霧散去，東西軍十六萬主力於美濃關原峽谷正面碰撞。',
      '石田三成笹尾山本陣、宇喜多秀家激戰東軍福島正則、井伊直政。',
      '松尾山上小早川秀秋部隊觀望，家康開鐵砲威嚇（問鐵砲）。',
      '正午小早川軍倒戈痛擊大谷吉繼，西軍瓦解，三成兵敗被俘。'
    ],
    chronicleRight: [
      '島津義弘率千餘薩摩兵上演「敵中突破」，正面殺穿家康本陣突圍。',
      '德川家康大幅改易西軍大名，三年後就任征夷大將軍建立江戶幕府。'
    ]
  },
  {
    id: 'jp_year_1615',
    yearNumber: 1615,
    yearDisplay: '1615 年',
    shortLabel: '大坂之陣',
    headline: '大坂夏之陣，真田幸村最後突擊與元和偃武',
    subTitle: '方廣寺鐘銘起釁 · 德川二十萬大軍包圍大坂城 · 日本第一兵孤軍衝鋒 · 豐臣滅亡',
    clashCard: {
      eraTitle: '公元 1615 年 (慶長二十年 / 元和元年)',
      conflicts: [
        { attacker: '德川幕府 (二十萬)', arrow: '→', defender: '豐臣秀賴 (大坂城)', note: '大坂夏之陣 · 天守閣陷落' },
        { attacker: '真田幸村', arrow: '→', defender: '德川家康本陣', note: '日本第一兵 · 赤備決死突擊' },
        { attacker: '德川幕府', arrow: '→', defender: '元和偃武', note: '戰國大亂平定 · 二百五十年承平' }
      ]
    },
    prefectureWarlords: {
      tokyo: { warlord: '德川幕府天領 (江戶)', color: '#fef08a' },
      kanagawa: { warlord: '德川幕府天領', color: '#fef08a' },
      shizuoka: { warlord: '駿府大御所家康', color: '#fef08a' },
      aichi: { warlord: '尾張德川家 (御三家)', color: '#fef08a' },
      wakayama: { warlord: '紀州德川家 (御三家)', color: '#fef08a' },
      ibaraki: { warlord: '水戶德川家 (御三家)', color: '#fef08a' },
      osaka: { warlord: '豐臣秀賴 / 大坂城浪人眾', color: '#fecaca' },
      ishikawa: { warlord: '加賀前田藩 (百萬石)', color: '#fef08a' },
      yamaguchi: { warlord: '長州毛利藩', color: '#bbf7d0' },
      kagoshima: { warlord: '薩摩島津藩', color: '#fed7aa' },
      miyagi: { warlord: '仙台伊達藩', color: '#fef08a' }
    },
    labels: [
      { name: '德 川 幕 府', pos: [675, 515], color: '#854d0e', size: 24 },
      { name: '豐臣·真田', pos: [440, 525], color: '#dc2626', size: 19 },
      { name: '前 田 藩', pos: [560, 410], color: '#d97706', size: 19 },
      { name: '島 津 藩', pos: [140, 635], color: '#c2410c', size: 19 },
      { name: '毛 利 藩', pos: [240, 495], color: '#15803d', size: 19 },
      { name: '伊 達 藩', pos: [800, 375], color: '#b45309', size: 19 }
    ],
    cities: [
      { name: '江戶(將軍府)', pos: [680, 528], isCap: true },
      { name: '京都(帝都)', pos: [468, 509] },
      { name: '大坂城(五層天守)', pos: [449, 525] },
      { name: '駿府城(大御所)', pos: [600, 552] },
      { name: '日光東照宮', pos: [704, 468] }
    ],
    battles: [
      { name: '⚔️ 大坂夏之陣', pos: [449, 525], battleId: 'bat_jp_osaka_natsu_1615' }
    ],
    routes: [
      {
        label: '德川幕府二十萬大軍包圍進攻線 (家康·秀忠)',
        color: '#1e3a8a',
        path: 'M 680,528 Q 580,545 490,506 Q 465,515 449,525'
      },
      {
        label: '真田幸村赤備敢死隊天王寺正面突擊線 (直取家康本陣)',
        color: '#dc2626',
        path: 'M 449,525 Q 456,530 460,526'
      }
    ],
    chronicleLeft: [
      '1614年冬，德川幕府以「國家安康·君臣豐樂」鐘銘發動大坂冬之陣。',
      '真田幸村築「真田丸」出丸，以鐵砲交叉火力重創德川數萬前鋒。',
      '雙方媾和後德川軍填平大坂城內外護城河，使巨城喪失天然天險。',
      '1615年5月夏之陣爆發，真田幸村率赤備三度正面突破家康本陣。'
    ],
    chronicleRight: [
      '幸村力竭陣亡於安居神社，被譽為「日本第一兵」；大坂城陷落，豐臣滅亡。',
      '戰後宣布「元和偃武」，開啟長達二百五十年的和平江戶時代。'
    ]
  },
  {
    id: 'jp_year_1868',
    yearNumber: 1868,
    yearDisplay: '1868 年',
    shortLabel: '鳥羽伏見倒幕',
    headline: '鳥羽伏見與戊辰戰爭，薩長倒幕菊花錦旗',
    subTitle: '大政奉還德川慶喜退守 · 薩長官軍迎奉錦旗 · 江戶無血開城 · 蝦夷五稜郭終戰',
    clashCard: {
      eraTitle: '公元 1868 年 (慶應四年 / 明治元年)',
      conflicts: [
        { attacker: '官軍 (薩長土)', arrow: '→', defender: '舊幕府軍', note: '鳥羽伏見之戰 · 迎奉菊花錦旗' },
        { attacker: '官軍 (西鄉隆盛)', arrow: '↔', defender: '勝海舟 (幕府)', note: '江戶無血開城 · 救百萬平民' },
        { attacker: '新政府軍', arrow: '→', defender: '會津若松城', note: '奧羽越列藩同盟 · 白虎隊殉國' },
        { attacker: '榎本武揚·土方歲三', arrow: '→', defender: '蝦夷共和國', note: '北撤五稜郭 · 戊辰終戰' }
      ]
    },
    prefectureWarlords: {
      kagoshima: { warlord: '倒幕雄藩·薩摩藩 (西鄉隆盛)', color: '#fed7aa' },
      yamaguchi: { warlord: '倒幕雄藩·長州藩 (木戶孝允)', color: '#bbf7d0' },
      kochi: { warlord: '倒幕雄藩·土佐藩 (坂本龍馬海援隊)', color: '#bae6fd' },
      kyoto: { warlord: '明治新政府官軍大本營', color: '#fed7aa' },
      osaka: { warlord: '新政府管轄區', color: '#fed7aa' },
      tokyo: { warlord: '德川幕府 (江戶城)', color: '#bfdbfe' },
      kanagawa: { warlord: '德川幕府', color: '#bfdbfe' },
      fukushima: { warlord: '奧羽越列藩同盟·會津藩', color: '#fecaca' },
      hokkaido: { warlord: '蝦夷共和國 (榎本武揚·土方歲三)', color: '#ddd6fe' }
    },
    labels: [
      { name: '官 軍·薩長', pos: [460, 495], color: '#ea580c', size: 21 },
      { name: '德川幕府', pos: [675, 515], color: '#1e3a8a', size: 22 },
      { name: '會津藩·新選組', pos: [730, 420], color: '#b91c1c', size: 18 },
      { name: '土佐·海援隊', pos: [325, 570], color: '#0284c7', size: 17 },
      { name: '五稜郭·土方', pos: [115, 195], color: '#6d28d9', size: 15 }
    ],
    cities: [
      { name: '京都(御所)', pos: [468, 509], isCap: true },
      { name: '江戶(無血開城)', pos: [680, 528] },
      { name: '會津若松城', pos: [727, 419] },
      { name: '箱館五稜郭', pos: [106, 198] },
      { name: '鹿兒島', pos: [140, 641] },
      { name: '萩(松下村塾)', pos: [236, 478] }
    ],
    battles: [
      { name: '⚔️ 鳥羽伏見之戰', pos: [465, 512], battleId: 'bat_jp_toba_fushimi_1868' },
      { name: '⚔️ 箱館五稜郭之戰', pos: [106, 198], battleId: 'bat_jp_goryokaku_1869' }
    ],
    routes: [
      {
        label: '薩長官軍奉「菊花錦旗」東征進軍線 (進軍江戶)',
        color: '#16a34a',
        path: 'M 468,509 Q 560,545 680,528'
      },
      {
        label: '舊幕府海軍北撤蝦夷建立五稜郭線 (榎本·土方)',
        color: '#dc2626',
        path: 'M 680,528 Q 780,450 780,350 Q 750,220 106,198'
      }
    ],
    chronicleLeft: [
      '1867年德川慶喜在二條城宣布「大政奉還」，朝廷密敕討幕引爆局勢。',
      '1868年1月鳥羽伏見之戰，五千薩長軍迎奉「菊花錦旗」，幕府軍大敗。',
      '西鄉隆盛率官軍兵臨城下，勝海舟密會達成「江戶無血開城」，救百萬平民。',
      '會津若松城白虎隊少年英勇自刃殉國，會津籠城戰一個月後降伏。'
    ],
    chronicleRight: [
      '舊幕府海軍總裁榎本武揚率艦載土方歲三北上蝦夷，建立五稜郭共和國。',
      '1869年新政府軍陸海圍攻五稜郭，土方歲三戰歿，戊辰戰爭全面結束。'
    ]
  },
  {
    id: 'jp_year_1877',
    yearNumber: 1877,
    yearDisplay: '1877 年',
    shortLabel: '西南戰爭',
    headline: '西南戰爭田原坂，最後武士與明治維新確立',
    subTitle: '西鄉隆盛薩摩士族起義 · 熊本城圍攻 · 田原坂血戰 · 近代徵兵制勝武士道',
    clashCard: {
      eraTitle: '公元 1877 年 (明治十年)',
      conflicts: [
        { attacker: '薩摩士族軍 (西鄉)', arrow: '→', defender: '熊本鎮台 (谷干城)', note: '熊本城包圍 · 死守加藤清正巨城' },
        { attacker: '明治政府軍', arrow: '↔', defender: '薩摩拔刀隊', note: '田原坂十七晝夜雨中肉搏' },
        { attacker: '大日本帝國政府', arrow: '→', defender: '富國強兵', note: '最後武士終結 · 近代徵兵制確立' }
      ]
    },
    prefectureWarlords: {
      kagoshima: { warlord: '西鄉隆盛·薩摩私學校軍', color: '#fecaca' },
      kumamoto: { warlord: '田原坂·熊本城激戰區', color: '#fef08a' },
      tokyo: { warlord: '大日本帝國新政府 (東京)', color: '#bfdbfe' },
      kanagawa: { warlord: '明治新政府', color: '#bfdbfe' },
      kyoto: { warlord: '明治新政府', color: '#bfdbfe' },
      osaka: { warlord: '明治新政府', color: '#bfdbfe' },
      hokkaido: { warlord: '北海道開拓使 (屯田兵)', color: '#bae6fd' }
    },
    labels: [
      { name: '大日本帝國政府', pos: [675, 515], color: '#1d4ed8', size: 22 },
      { name: '薩摩義軍·西鄉', pos: [140, 625], color: '#dc2626', size: 19 },
      { name: '北海道開拓使', pos: [185, 130], color: '#0284c7', size: 16 }
    ],
    cities: [
      { name: '東京(帝都皇居)', pos: [680, 528], isCap: true },
      { name: '熊本城(鎮台)', pos: [170, 568] },
      { name: '鹿兒島(城山)', pos: [140, 641] },
      { name: '橫濱開港', pos: [670, 540] }
    ],
    battles: [
      { name: '⚔️ 田原坂血戰', pos: [171, 561], battleId: 'bat_jp_tabaruzaka_1877' }
    ],
    routes: [
      {
        label: '薩摩西鄉軍北上包圍熊本城路線',
        color: '#dc2626',
        path: 'M 140,641 Q 155,600 170,568 L 171,561'
      },
      {
        label: '政府徵兵新軍自博多南下增援田原坂路線',
        color: '#2563eb',
        path: 'M 181,516 Q 178,540 171,561'
      }
    ],
    chronicleLeft: [
      '1877年2月，廢刀令與秩祿處分引爆士族絕望，西鄉隆盛率三萬軍北上。',
      '谷干城指揮政府軍死守加藤清正建造的熊本巨城，薩摩軍久攻不克。',
      '3月雙方在田原坂展開十七晝夜血戰，雨中肉搏，警視廳「拔刀隊」名震天下。',
      '政府平民新軍憑藉連發來福槍與充沛彈藥重創武士軍，田原坂失守。'
    ],
    chronicleRight: [
      '9月24日，西鄉隆盛在鹿兒島城山中彈自盡，「最後武士時代」終結。',
      '西南戰爭奠定近代徵兵制度，明治維新全面推展工業立憲，躍居列強。'
    ]
  }
];
