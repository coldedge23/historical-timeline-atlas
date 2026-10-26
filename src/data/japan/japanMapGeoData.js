// Japan Historical GIS GeoData: Provinces, Regions, Castles & Map Projections
// Calibrated for 820 x 720 Japanese Antique Ink-Wash Scroll Viewport

export function projectLngLatToJapanMap(lng, lat) {
  // Diagonal arc projection covering Kyushu (129°E, 31°N) through Tohoku & Hokkaido (146°E, 45°N)
  const x = ((lng - 128.5) / (145.8 - 128.5)) * 680 + 70;
  const y = 720 - (((lat - 30.2) / (45.2 - 30.2)) * 620 + 50);
  return [Math.round(x), Math.round(y)];
}

// Famous Japanese Historical Castles & Strongholds
export const JAPAN_HISTORICAL_CASTLES = [
  { id: "cst_edo", name: "江戶城 (德川幕府天領·今皇居)", lng: 139.75, lat: 35.68, importance: "capital" },
  { id: "cst_kyoto", name: "京都御所 (千年帝都·山城國)", lng: 135.76, lat: 35.02, importance: "imperial" },
  { id: "cst_osaka", name: "大坂城 (秀吉天下第一巨城)", lng: 135.53, lat: 34.69, importance: "major" },
  { id: "cst_azuchi", name: "安土城 (織田信長天下布武七層天守)", lng: 136.14, lat: 35.15, importance: "major" },
  { id: "cst_gifu", name: "岐阜城 (稻葉山城·道三與信長雄城)", lng: 136.78, lat: 35.43, importance: "major" },
  { id: "cst_kiyosu", name: "清洲城 (信長桶狹間出征城)", lng: 136.84, lat: 35.22, importance: "major" },
  { id: "cst_odawara", name: "小田原城 (北條氏難攻不落天下第一要塞)", lng: 139.15, lat: 35.25, importance: "major" },
  { id: "cst_tsutsujigasaki", name: "躑躅崎館 (武田信玄甲斐大本營)", lng: 138.57, lat: 35.69, importance: "major" },
  { id: "cst_kasugayama", name: "春日山城 (上杉謙信越後毘沙門天要塞)", lng: 138.22, lat: 37.14, importance: "major" },
  { id: "cst_aoba_sendai", name: "仙台青葉城 (伊達政宗奧羽名城)", lng: 140.86, lat: 38.25, importance: "major" },
  { id: "cst_himeji", name: "姬路城 (白鷺城·西國門戶第一名城)", lng: 134.69, lat: 34.84, importance: "major" },
  { id: "cst_aizu", name: "會津若松城 (鶴之城·保科會津九層巨城)", lng: 139.93, lat: 37.49, importance: "major" },
  { id: "cst_kumamoto", name: "熊本城 (加藤清正武者返銀杏城)", lng: 130.71, lat: 32.81, importance: "major" },
  { id: "cst_kagoshima", name: "鹿兒島城 (鶴丸城·薩摩島津本城)", lng: 130.55, lat: 31.60, importance: "major" },
  { id: "cst_goryokaku", name: "箱館五稜郭 (西洋星形要塞·榎本土方決戰地)", lng: 140.75, lat: 41.79, importance: "major" }
];

// Authentic Feudal Provinces & Regional GIS SVG Paths (Covering Mainland Japan)
export const JAPAN_PROVINCE_PATHS = {
  // --- KYUSHU (九州島) ---
  jp_satsuma_osumi: {
    name: "薩摩·大隅 (島津氏領國)",
    kanji: "薩摩",
    capitalName: "鹿兒島 (鶴丸城)",
    centerCoords: [150, 610],
    d: "M 130,590 L 165,580 L 180,610 L 175,640 L 140,650 L 125,620 Z"
  },
  jp_higo: {
    name: "肥後 (加藤清正·細川氏)",
    kanji: "肥後",
    capitalName: "熊本 (熊本城)",
    centerCoords: [155, 560],
    d: "M 135,550 L 175,540 L 185,570 L 165,580 L 135,570 Z"
  },
  jp_chikuzen_hizen: {
    name: "筑前·肥前 (博多灣·長崎出島·鍋島氏)",
    kanji: "筑前",
    capitalName: "博多 / 長崎出島",
    centerCoords: [135, 520],
    d: "M 115,505 L 155,495 L 170,525 L 155,540 L 125,545 L 110,520 Z"
  },
  jp_bungo_hyuga: {
    name: "豐後·日向 (大友宗麟·高千穗)",
    kanji: "豐後",
    capitalName: "府內 (大分)",
    centerCoords: [195, 545],
    d: "M 175,510 L 210,520 L 220,565 L 185,580 L 175,540 Z"
  },

  // --- SHIKOKU (四國島) ---
  jp_tosa: {
    name: "土佐 (長宗我部元親·坂本龍馬故鄉)",
    kanji: "土佐",
    capitalName: "高知 (浦戶城)",
    centerCoords: [255, 555],
    d: "M 230,540 L 275,530 L 285,565 L 245,580 L 225,560 Z"
  },
  jp_iyo_sanuki_awa: {
    name: "伊予·讚岐·阿波 (瀨戶內海三國)",
    kanji: "伊予",
    capitalName: "松山 / 德島",
    centerCoords: [265, 515],
    d: "M 225,505 L 285,485 L 305,515 L 275,530 L 230,540 Z"
  },

  // --- CHUGOKU (中國地方·山陽山陰) ---
  jp_nagato_suo: {
    name: "長門·周防 (長州藩毛利氏·幕末維新雄藩)",
    kanji: "長門",
    capitalName: "萩 / 山口",
    centerCoords: [175, 475],
    d: "M 155,485 L 195,460 L 210,480 L 180,505 L 160,500 Z"
  },
  jp_aki_bingo: {
    name: "安芸·備後 (毛利元就本領·嚴島神社)",
    kanji: "安芸",
    capitalName: "廣島 (吉田郡山城)",
    centerCoords: [225, 465],
    d: "M 195,460 L 245,445 L 255,475 L 210,485 Z"
  },
  jp_izumo_inaba: {
    name: "出雲·伯耆·因幡 (尼子氏·神話之鄉)",
    kanji: "出雲",
    capitalName: "出雲 / 鳥取",
    centerCoords: [240, 430],
    d: "M 205,435 L 265,415 L 275,440 L 230,455 L 200,450 Z"
  },
  jp_bizen_mimasaka: {
    name: "備前·備中·美作 (宇喜多秀家)",
    kanji: "備前",
    capitalName: "岡山",
    centerCoords: [275, 460],
    d: "M 245,445 L 295,440 L 300,470 L 255,475 Z"
  },

  // --- KINKI / KANSAI (近畿·京都·大阪) ---
  jp_harima_tamba: {
    name: "播磨·丹波·但馬 (黑田官兵衛·姬路城)",
    kanji: "播磨",
    capitalName: "姬路 (白鷺城)",
    centerCoords: [315, 445],
    d: "M 295,440 L 340,430 L 345,465 L 300,470 Z"
  },
  jp_yamashiro_settsu: {
    name: "山城·攝津·河內 (京都皇都·大坂王城)",
    kanji: "山城",
    capitalName: "京都御所 / 大坂城",
    centerCoords: [355, 465],
    d: "M 340,430 L 375,435 L 380,480 L 345,485 L 335,460 Z"
  },
  jp_omi: {
    name: "近江 (安土城·石田三成·琵琶湖)",
    kanji: "近江",
    capitalName: "近江八幡 / 彥根",
    centerCoords: [385, 435],
    d: "M 365,410 L 400,410 L 405,450 L 370,450 Z"
  },
  jp_yamato_kii: {
    name: "大和·紀伊 (奈良大佛·高野山·德川御三家)",
    kanji: "紀伊",
    capitalName: "奈良 / 和歌山",
    centerCoords: [365, 520],
    d: "M 345,485 L 390,475 L 400,535 L 350,545 Z"
  },

  // --- CHUBU (中部·東海·甲信越) ---
  jp_mino_hida: {
    name: "美濃·飛驒 (齋藤道三·岐阜城·關原)",
    kanji: "美濃",
    capitalName: "岐阜 (稻葉山城)",
    centerCoords: [415, 420],
    d: "M 395,395 L 435,390 L 440,435 L 400,440 Z"
  },
  jp_owari_mikawa: {
    name: "尾張·三河 (信長·家康·秀吉三英傑搖籃)",
    kanji: "尾張",
    capitalName: "名古屋 (那古野/岡崎)",
    centerCoords: [425, 465],
    d: "M 405,445 L 450,440 L 455,485 L 415,485 Z"
  },
  jp_echizen_kaga_noto: {
    name: "越前·加賀·能登 (前田利家加賀百萬石)",
    kanji: "加賀",
    capitalName: "金澤 / 福井 (北之莊)",
    centerCoords: [405, 360],
    d: "M 375,375 L 420,330 L 435,365 L 410,405 L 380,405 Z"
  },
  jp_kai_shinano: {
    name: "甲斐·信濃 (武田信玄風林火山·川中島)",
    kanji: "甲斐",
    capitalName: "甲府 (躑躅崎館) / 上田",
    centerCoords: [475, 415],
    d: "M 435,385 L 495,375 L 505,430 L 445,435 Z"
  },
  jp_echigo: {
    name: "越後·越中 (上杉謙信毘沙門天春日山)",
    kanji: "越後",
    capitalName: "春日山城 (上越)",
    centerCoords: [485, 340],
    d: "M 445,340 L 515,310 L 530,355 L 475,375 L 440,360 Z"
  },
  jp_suruga_totomi: {
    name: "駿河·遠江·伊豆 (富士山下·今川與家康駿府)",
    kanji: "駿河",
    capitalName: "靜岡 (駿府城) / 濱松",
    centerCoords: [475, 470],
    d: "M 450,445 L 510,440 L 520,480 L 460,490 Z"
  },

  // --- KANTO (關東平原) ---
  jp_sagami: {
    name: "相模 (後北條氏·小田原城·鎌倉幕府)",
    kanji: "相模",
    capitalName: "小田原 / 鎌倉",
    centerCoords: [520, 460],
    d: "M 505,445 L 540,440 L 545,475 L 515,480 Z"
  },
  jp_musashi: {
    name: "武藏 (江戶城·德川幕府大本營·今東京)",
    kanji: "武藏",
    capitalName: "江戶 (皇居/千代田)",
    centerCoords: [535, 425],
    d: "M 510,410 L 560,405 L 565,445 L 520,445 Z"
  },
  jp_kanto_north: {
    name: "上野·下野·常陸 (關東七國·日光東照宮)",
    kanji: "上野",
    capitalName: "宇都宮 / 水戶",
    centerCoords: [555, 385],
    d: "M 525,370 L 585,360 L 590,410 L 540,415 Z"
  },

  // --- TOHOKU (東北·奧羽) ---
  jp_mutsu_south: {
    name: "陸奧南部 (伊達政宗獨眼龍·仙台藩)",
    kanji: "陸奧",
    capitalName: "仙台 (青葉城) / 米澤",
    centerCoords: [570, 325],
    d: "M 535,320 L 600,305 L 610,355 L 555,365 Z"
  },
  jp_dewa: {
    name: "出羽 (最上義光·庄內平原)",
    kanji: "出羽",
    capitalName: "山形 / 秋田",
    centerCoords: [545, 280],
    d: "M 530,270 L 575,260 L 585,320 L 540,320 Z"
  },
  jp_mutsu_north: {
    name: "奧州北部 (南部氏·津輕氏·陸奧灣)",
    kanji: "奧州",
    capitalName: "盛岡 / 弘前",
    centerCoords: [595, 240],
    d: "M 565,220 L 620,210 L 630,290 L 575,295 Z"
  },

  // --- HOKKAIDO (北海道·蝦夷地) ---
  jp_hokkaido_south: {
    name: "渡島·箱館 (松前藩·五稜郭星形要塞)",
    kanji: "渡島",
    capitalName: "函館 (五稜郭)",
    centerCoords: [585, 175],
    d: "M 555,160 L 615,150 L 625,190 L 570,205 Z"
  },
  jp_hokkaido_main: {
    name: "蝦夷本島 (石狩平原·開拓使·札幌)",
    kanji: "蝦夷",
    capitalName: "札幌 / 旭川",
    centerCoords: [640, 110],
    d: "M 605,70 L 690,60 L 730,120 L 650,150 L 595,130 Z"
  }
};

// Historical Clan / Era Color Schemes for Japan Map
export const JAPAN_ERA_PROVINCE_SCHEMES = {
  jp_ancient_medieval: {
    name: "古代與中世發端 (538 - 1467)",
    themeBadge: "律令京邑·鎌倉幕府",
    themeColor: "#0284c7",
    provinceColors: {
      jp_yamashiro_settsu: "#0284c7", // 平安京/皇居
      jp_omi: "#0369a1",
      jp_yamato_kii: "#0369a1", // 南都六宗
      jp_sagami: "#f59e0b", // 鎌倉幕府
      jp_chikuzen_hizen: "#dc2626", // 元寇防壘
      jp_mutsu_south: "#64748b"
    },
    historicalNames: {
      jp_yamashiro_settsu: "平安京大內裏 (京都)",
      jp_sagami: "鎌倉殿大本營 (源賴朝)",
      jp_chikuzen_hizen: "博多灣元寇防壘 (北條時宗)",
      jp_yamato_kii: "大和國奈良法隆寺 (聖德太子)"
    }
  },
  jp_sengoku: {
    name: "戰國亂世·群雄逐鹿 (1467 - 1582)",
    themeBadge: "下剋上·風林火山",
    themeColor: "#dc2626",
    provinceColors: {
      jp_owari_mikawa: "#b91c1c", // 織田信長 (織田紅黑)
      jp_kai_shinano: "#dc2626", // 武田信玄 (武田赤備)
      jp_echigo: "#0284c7", // 上杉謙信 (越後雪白天青)
      jp_sagami: "#a855f7", // 後北條氏 (相模紫)
      jp_mino_hida: "#b91c1c", // 織田岐阜城
      jp_suruga_totomi: "#ec4899", // 今川義元
      jp_aki_bingo: "#15803d", // 毛利元就
      jp_satsuma_osumi: "#f97316", // 薩摩島津
      jp_mutsu_south: "#eab308" // 伊達氏
    },
    historicalNames: {
      jp_owari_mikawa: "尾張清洲城 (織田信長)",
      jp_kai_shinano: "甲斐躑躅崎館 (武田信玄)",
      jp_echigo: "越後春日山城 (上杉謙信)",
      jp_sagami: "相模小田原城 (北條氏康)",
      jp_mino_hida: "美濃岐阜城 (天下布武)",
      jp_aki_bingo: "安芸吉田郡山城 (毛利元就)"
    }
  },
  jp_azuchi_momoyama: {
    name: "安土桃山·天下統一 (1582 - 1603)",
    themeBadge: "太閤天下·關原分水嶺",
    themeColor: "#f59e0b",
    provinceColors: {
      jp_yamashiro_settsu: "#f59e0b", // 豐臣秀吉大坂城
      jp_omi: "#ca8a04", // 安土城/石田三成佐和山
      jp_musashi: "#1e3a8a", // 德川家康江戶移封
      jp_sagami: "#f59e0b", // 小田原征伐後平定
      jp_mino_hida: "#dc2626", // 關原主戰場
      jp_mutsu_south: "#eab308", // 伊達政宗仙台
      jp_satsuma_osumi: "#f97316" // 島津義弘
    },
    historicalNames: {
      jp_yamashiro_settsu: "攝津大坂城 (太閤秀吉)",
      jp_musashi: "武藏江戶城 (德川家康)",
      jp_mino_hida: "美濃關原 (東西軍十六萬決戰)",
      jp_omi: "近江佐和山城 (石田三成)",
      jp_mutsu_south: "陸奧仙台城 (獨眼龍政宗)"
    }
  },
  jp_edo: {
    name: "江戶幕府·鎖國治世 (1603 - 1853)",
    themeBadge: "大將軍·參勤交代·鎖國",
    themeColor: "#ca8a04",
    provinceColors: {
      jp_musashi: "#ca8a04", // 幕府將軍大本營江戶
      jp_suruga_totomi: "#eab308", // 駿府大御所
      jp_yamashiro_settsu: "#b45309", // 京都所司代/大坂城代
      jp_chikuzen_hizen: "#059669", // 長崎出島出海口
      jp_satsuma_osumi: "#f97316", // 薩摩藩外樣雄藩
      jp_nagato_suo: "#15803d", // 長州藩外樣雄藩
      jp_tosa: "#38bdf8", // 土佐藩山內氏
      jp_kanto_north: "#ca8a04" // 日光東照宮
    },
    historicalNames: {
      jp_musashi: "將軍天領江戶城 (大奧/參勤交代)",
      jp_chikuzen_hizen: "長崎出島荷蘭館 (鎖國唯一門戶)",
      jp_yamashiro_settsu: "京都所司代與天王寺",
      jp_kanto_north: "下野日光東照宮 (東照大權現)"
    }
  },
  jp_bakumatsu: {
    name: "幕末風雲·倒幕維新 (1853 - 1868)",
    themeBadge: "尊王攘夷·薩長同盟",
    themeColor: "#0284c7",
    provinceColors: {
      jp_satsuma_osumi: "#f97316", // 薩摩藩西鄉隆盛
      jp_nagato_suo: "#10b981", // 長州藩木戶/高杉奇兵隊
      jp_tosa: "#38bdf8", // 土佐坂本龍馬海援隊
      jp_musashi: "#1e3a8a", // 幕府江戶無血開城
      jp_yamashiro_settsu: "#0284c7", // 鳥羽伏見戰場/新選組
      jp_kanto_north: "#b91c1c", // 會津若松白虎隊
      jp_hokkaido_south: "#06b6d4" // 箱館五稜郭土方歲三
    },
    historicalNames: {
      jp_satsuma_osumi: "薩摩鹿兒島 (西鄉隆盛/大久保利通)",
      jp_nagato_suo: "長州萩城下 (吉田松陰/高杉晉作)",
      jp_tosa: "土佐高知 (坂本龍馬海援隊)",
      jp_yamashiro_settsu: "京都二條城 (大政奉還) / 鳥羽伏見",
      jp_musashi: "江戶城 (勝海舟無血開城)",
      jp_hokkaido_south: "蝦夷箱館五稜郭 (土方歲三最後決戰)"
    }
  },
  jp_meiji_modern: {
    name: "明治維新·近代崛起 (1868 - 1945+)",
    themeBadge: "富國強兵·立憲列強",
    themeColor: "#3b82f6",
    provinceColors: {
      jp_musashi: "#1d4ed8", // 東京首都帝國議會
      jp_yamashiro_settsu: "#3b82f6", // 京阪神工業重鎮
      jp_satsuma_osumi: "#f97316", // 西南戰爭田原坂
      jp_hokkaido_main: "#0284c7", // 北海道開拓使
      jp_chikuzen_hizen: "#0ea5e9" // 八幡製鐵所
    },
    historicalNames: {
      jp_musashi: "帝都東京皇居 / 帝國議會 (伊藤博文)",
      jp_satsuma_osumi: "薩摩城山 (西鄉隆盛西南戰爭終焉)",
      jp_chikuzen_hizen: "對馬海峽 (東鄉平八郎海戰大捷)"
    }
  }
};
