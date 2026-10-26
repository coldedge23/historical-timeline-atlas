// Japan Feudal Warlord Periods & Tactical Campaigns GeoData
// Mapped to 47 Real Official GIS Prefectures (820 x 720 Viewport)

export const JAPAN_WARLORD_PERIOD_CONFIGS = [
  {
    id: 'jp_year_1560',
    yearNumber: 1560,
    yearDisplay: '1560 年',
    shortLabel: '桶狹間之戰',
    headline: '桶狹間奇襲，織田信長天下布武之發端',
    subTitle: '今川義元兩萬五千西上上洛 · 信長三千精兵清洲疾馳 · 田樂窪雨夜大逆轉',
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
      { name: '織 田', pos: [398, 460], color: '#991b1b', size: 19 },
      { name: '今 川', pos: [445, 465], color: '#be123c', size: 19 },
      { name: '武 田', pos: [435, 430], color: '#7f1d1d', size: 20 },
      { name: '上 杉', pos: [448, 368], color: '#0369a1', size: 20 },
      { name: '北 條', pos: [475, 435], color: '#6d28d9', size: 20 },
      { name: '齋 藤', pos: [396, 435], color: '#b45309', size: 17 },
      { name: '毛 利', pos: [255, 485], color: '#166534', size: 20 },
      { name: '島 津', pos: [205, 575], color: '#78350f', size: 19 },
      { name: '大 友', pos: [236, 530], color: '#9a3412', size: 18 },
      { name: '長宗我部', pos: [285, 525], color: '#0e7490', size: 17 },
      { name: '伊 達', pos: [515, 335], color: '#854d0e', size: 19 },
      { name: '足利朝廷', pos: [350, 452], color: '#334155', size: 16 }
    ],
    cities: [
      { name: '京都(帝都)', pos: [358, 458], isCap: true },
      { name: '清洲城', pos: [390, 455] },
      { name: '駿府城', pos: [445, 465] },
      { name: '岡崎城', pos: [402, 468] },
      { name: '躑躅崎館', pos: [442, 435] },
      { name: '春日山城', pos: [431, 385] },
      { name: '小田原城', pos: [459, 450] },
      { name: '稻葉山城', pos: [388, 444] },
      { name: '廣島城', pos: [260, 480] },
      { name: '鹿兒島', pos: [203, 574] }
    ],
    battles: [
      { name: '⚔️ 桶狹間之戰', pos: [396, 460], battleId: 'bat_jp_okehazama_1560' },
      { name: '⚔️ 川中島決戰', pos: [427, 412], battleId: 'bat_jp_kawanakajima_1561' }
    ],
    routes: [
      {
        label: '今川義元兩萬五千西上進軍線',
        color: '#dc2626',
        path: 'M 445,465 Q 418,466 402,468 Q 398,464 396,460'
      },
      {
        label: '織田信長雨夜奇襲疾馳線 (清洲出擊)',
        color: '#2563eb',
        path: 'M 390,455 Q 393,458 396,460'
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
      { name: '織 田', pos: [375, 452], color: '#991b1b', size: 22 },
      { name: '德 川', pos: [435, 465], color: '#c2410c', size: 19 },
      { name: '武 田', pos: [435, 430], color: '#7f1d1d', size: 20 },
      { name: '上 杉', pos: [448, 368], color: '#0369a1', size: 20 },
      { name: '北 條', pos: [475, 435], color: '#6d28d9', size: 20 },
      { name: '毛 利', pos: [255, 485], color: '#166534', size: 20 },
      { name: '長宗我部', pos: [285, 525], color: '#0e7490', size: 17 },
      { name: '島 津', pos: [205, 575], color: '#78350f', size: 19 }
    ],
    cities: [
      { name: '京都(帝都)', pos: [358, 458], isCap: true },
      { name: '岐阜城', pos: [388, 444] },
      { name: '濱松城', pos: [435, 468] },
      { name: '春日山城', pos: [431, 385] },
      { name: '小田原城', pos: [459, 450] }
    ],
    battles: [
      { name: '⚔️ 長篠之戰', pos: [412, 460], battleId: 'bat_jp_nagashino_1575' },
      { name: '⚔️ 三方原之戰', pos: [435, 468], battleId: 'bat_jp_mikata_1573' }
    ],
    routes: [
      {
        label: '織田·德川三萬八千聯軍設樂原設防線 (三段擊火繩槍)',
        color: '#2563eb',
        path: 'M 388,444 Q 402,455 412,460'
      },
      {
        label: '武田勝賴一萬五千赤備騎兵突擊線',
        color: '#dc2626',
        path: 'M 435,430 Q 425,448 412,460'
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
      { name: '秀 吉', pos: [348, 465], color: '#ca8a04', size: 21 },
      { name: '光 秀', pos: [362, 448], color: '#dc2626', size: 17 },
      { name: '德 川', pos: [435, 465], color: '#c2410c', size: 19 },
      { name: '北 條', pos: [475, 435], color: '#6d28d9', size: 20 },
      { name: '上 杉', pos: [448, 368], color: '#0369a1', size: 20 },
      { name: '毛 利', pos: [255, 485], color: '#166534', size: 20 },
      { name: '長宗我部', pos: [285, 525], color: '#0e7490', size: 17 },
      { name: '島 津', pos: [205, 575], color: '#78350f', size: 19 }
    ],
    cities: [
      { name: '京都(本能寺)', pos: [358, 458], isCap: true },
      { name: '安土城', pos: [368, 450] },
      { name: '姬路城', pos: [330, 465] },
      { name: '備中高松城', pos: [300, 472] },
      { name: '小田原城', pos: [459, 450] }
    ],
    battles: [
      { name: '⚔️ 本能寺之變', pos: [358, 458], battleId: 'bat_jp_yamazaki_1582' },
      { name: '⚔️ 山崎之戰', pos: [354, 462], battleId: 'bat_jp_yamazaki_1582' }
    ],
    routes: [
      {
        label: '羽柴秀吉「中國大返還」神速進軍線 (七日奔馳兩百里)',
        color: '#2563eb',
        path: 'M 300,472 Q 315,468 330,465 Q 345,462 354,462'
      },
      {
        label: '明智光秀本能寺叛變與天王山佈陣線',
        color: '#dc2626',
        path: 'M 358,458 Q 356,460 354,462'
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
      { name: '德 川', pos: [485, 430], color: '#1e3a8a', size: 21 },
      { name: '石 田', pos: [368, 440], color: '#991b1b', size: 19 },
      { name: '豐 臣', pos: [340, 475], color: '#c2410c', size: 17 },
      { name: '毛 利', pos: [255, 480], color: '#166534', size: 20 },
      { name: '前 田', pos: [390, 395], color: '#d97706', size: 18 },
      { name: '上 杉', pos: [485, 365], color: '#0284c7', size: 18 },
      { name: '伊 達', pos: [515, 335], color: '#b45309', size: 20 },
      { name: '島 津', pos: [200, 580], color: '#78350f', size: 18 },
      { name: '長宗我部', pos: [285, 520], color: '#0284c7', size: 16 }
    ],
    cities: [
      { name: '大坂城(天下中心)', pos: [348, 472], isCap: true },
      { name: '京都(帝都)', pos: [358, 458] },
      { name: '江戶城(德川本營)', pos: [477, 435] },
      { name: '佐和山城', pos: [369, 454] },
      { name: '大垣城', pos: [388, 446] }
    ],
    battles: [
      { name: '⚔️ 關原大決戰', pos: [379, 446], battleId: 'bat_jp_sekigahara_1600' }
    ],
    routes: [
      {
        label: '東軍德川家康東海道進軍線 (七萬五千主力)',
        color: '#1e3a8a',
        path: 'M 477,435 Q 440,460 390,451 Q 382,448 379,446'
      },
      {
        label: '西軍石田三成大垣城轉進關原佈陣線',
        color: '#dc2626',
        path: 'M 388,446 Q 383,446 379,446'
      },
      {
        label: '島津義弘「敵中突破」正面突圍死鬥撤退線',
        color: '#16a34a',
        path: 'M 379,446 Q 360,470 330,480 Q 250,510 203,574'
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
      { name: '德 川 幕 府', pos: [480, 430], color: '#854d0e', size: 24 },
      { name: '真田幸村·豐臣', pos: [338, 475], color: '#dc2626', size: 17 },
      { name: '前 田 藩', pos: [390, 395], color: '#d97706', size: 19 },
      { name: '島 津 藩', pos: [200, 580], color: '#c2410c', size: 19 },
      { name: '毛 利 藩', pos: [237, 494], color: '#15803d', size: 19 },
      { name: '伊 達 藩', pos: [515, 335], color: '#b45309', size: 19 }
    ],
    cities: [
      { name: '江戶(將軍府)', pos: [477, 435], isCap: true },
      { name: '京都(帝都)', pos: [358, 458] },
      { name: '大坂城(五層天守)', pos: [348, 472] },
      { name: '駿府城(大御所)', pos: [445, 465] },
      { name: '日光東照宮', pos: [478, 402] }
    ],
    battles: [
      { name: '⚔️ 大坂夏之陣', pos: [348, 472], battleId: 'bat_jp_osaka_natsu_1615' }
    ],
    routes: [
      {
        label: '德川幕府二十萬大軍包圍進攻線 (家康·秀忠)',
        color: '#1e3a8a',
        path: 'M 477,435 Q 430,460 390,451 Q 365,465 348,472'
      },
      {
        label: '真田幸村赤備敢死隊天王寺正面突擊線 (直取家康本陣)',
        color: '#dc2626',
        path: 'M 348,472 Q 352,475 356,473'
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
      { name: '官 軍·薩長', pos: [350, 460], color: '#ea580c', size: 21 },
      { name: '德川幕府', pos: [480, 430], color: '#1e3a8a', size: 22 },
      { name: '會津藩·新選組', pos: [485, 370], color: '#b91c1c', size: 18 },
      { name: '土佐·海援隊', pos: [285, 525], color: '#0284c7', size: 17 },
      { name: '五稜郭·土方', pos: [506, 219], color: '#6d28d9', size: 17 }
    ],
    cities: [
      { name: '京都(御所)', pos: [358, 458], isCap: true },
      { name: '江戶(無血開城)', pos: [477, 435] },
      { name: '會津若松城', pos: [482, 371] },
      { name: '箱館五稜郭', pos: [506, 219] },
      { name: '鹿兒島', pos: [203, 574] },
      { name: '萩(松下村塾)', pos: [229, 479] }
    ],
    battles: [
      { name: '⚔️ 鳥羽伏見之戰', pos: [358, 460], battleId: 'bat_jp_toba_fushimi_1868' },
      { name: '⚔️ 箱館五稜郭之戰', pos: [506, 219], battleId: 'bat_jp_goryokaku_1869' }
    ],
    routes: [
      {
        label: '薩長官軍奉「菊花錦旗」東征進軍線 (進軍江戶)',
        color: '#16a34a',
        path: 'M 358,460 Q 420,455 477,435'
      },
      {
        label: '舊幕府海軍北撤蝦夷建立五稜郭線 (榎本·土方)',
        color: '#dc2626',
        path: 'M 477,435 Q 520,320 506,219'
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
      { name: '大日本帝國政府', pos: [480, 430], color: '#1d4ed8', size: 22 },
      { name: '薩摩義軍·西鄉', pos: [200, 580], color: '#dc2626', size: 19 },
      { name: '北海道開拓使', pos: [599, 131], color: '#0284c7', size: 18 }
    ],
    cities: [
      { name: '東京(帝都皇居)', pos: [477, 435], isCap: true },
      { name: '熊本城(鎮台)', pos: [208, 534] },
      { name: '鹿兒島(城山)', pos: [203, 574] },
      { name: '橫濱開港', pos: [469, 449] }
    ],
    battles: [
      { name: '⚔️ 田原坂血戰', pos: [206, 530], battleId: 'bat_jp_tabaruzaka_1877' },
      { name: '⚔️ 對馬海峽海戰', pos: [187, 480], battleId: 'bat_jp_tsushima_1905' }
    ],
    routes: [
      {
        label: '薩摩西鄉軍北上包圍熊本城路線',
        color: '#dc2626',
        path: 'M 203,574 Q 206,550 208,534'
      },
      {
        label: '政府徵兵新軍自博多南下增援田原坂路線',
        color: '#2563eb',
        path: 'M 205,513 Q 206,522 206,530'
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
