// Japan Historical GIS GeoData: Provinces, Regions, Castles & Map Projections
// Calibrated for 820 x 720 Japanese Antique Ink-Wash Scroll Viewport (Mercator-Arc Projection)

export function projectLngLatToJapanMap(lng, lat) {
  // Diagonal arc projection covering Kyushu (128.5°E, 30.2°N) through Tohoku & Hokkaido (145.8°E, 45.2°N)
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

// Authentic Contiguous Feudal Provinces & Regional GIS SVG Paths
export const JAPAN_PROVINCE_PATHS = {
  // --- KYUSHU (九州島) ---
  jp_satsuma_osumi: {
    name: "薩摩·大隅 (島津氏領國)",
    kanji: "薩摩",
    capitalName: "鹿兒島 (鶴丸城)",
    centerCoords: [154, 616],
    d: "M 134,596 C 130,608 128,622 135,634 C 142,646 148,652 154,650 C 158,642 153,626 149,614 C 153,607 157,614 160,626 C 164,638 170,646 178,642 C 182,634 182,620 178,606 C 176,594 172,590 166,590 C 158,588 146,592 134,596 Z"
  },
  jp_higo: {
    name: "肥後 (加藤清正·細川氏)",
    kanji: "肥後",
    capitalName: "熊本 (熊本城)",
    centerCoords: [152, 566],
    d: "M 134,596 C 131,582 134,570 142,560 C 138,552 142,548 148,546 C 158,542 166,544 170,545 C 173,558 171,572 166,590 C 158,588 146,592 134,596 Z"
  },
  jp_chikuzen_hizen: {
    name: "筑前·肥前 (博多灣·長崎出島·鍋島氏)",
    kanji: "筑前",
    capitalName: "博多 / 長崎出島",
    centerCoords: [142, 532],
    d: "M 148,546 C 142,548 138,552 142,560 C 134,562 126,554 118,564 C 114,554 122,544 120,534 C 124,528 132,525 138,522 C 146,524 156,518 166,515 C 170,520 172,532 170,545 C 166,544 158,542 148,546 Z"
  },
  jp_bungo_hyuga: {
    name: "豐後·日向 (大友宗麟·高千穗)",
    kanji: "豐後",
    capitalName: "府內 (大分)",
    centerCoords: [185, 558],
    d: "M 166,515 C 175,518 184,524 192,530 C 188,540 195,550 200,568 C 196,585 188,600 178,606 C 172,590 166,590 170,545 C 172,532 170,520 166,515 Z"
  },

  // --- SHIKOKU (四國島) ---
  jp_tosa: {
    name: "土佐 (長宗我部元親·坂本龍馬故鄉)",
    kanji: "土佐",
    capitalName: "高知 (浦戶城)",
    centerCoords: [270, 545],
    d: "M 238,565 C 248,560 262,548 275,542 C 288,548 298,556 304,550 C 296,536 284,528 270,526 C 256,532 246,545 238,565 Z"
  },
  jp_iyo_sanuki_awa: {
    name: "伊予·讚岐·阿波 (瀨戶內海三國)",
    kanji: "伊予",
    capitalName: "松山 / 德島",
    centerCoords: [272, 514],
    d: "M 224,535 C 234,526 244,518 254,512 C 266,508 278,504 294,502 C 306,506 312,514 308,528 C 304,550 296,536 284,528 C 270,526 256,532 246,545 C 236,554 224,535 224,535 Z"
  },

  // --- CHUGOKU (中國地方·山陽山陰) ---
  jp_nagato_suo: {
    name: "長門·周防 (長州藩毛利氏·幕末維新雄藩)",
    kanji: "長門",
    capitalName: "萩 / 山口",
    centerCoords: [184, 498],
    d: "M 166,515 C 163,505 170,494 182,488 C 192,482 198,480 204,498 C 196,506 186,512 176,516 C 170,516 166,515 166,515 Z"
  },
  jp_aki_bingo: {
    name: "安芸·備後 (毛利元就本領·嚴島神社)",
    kanji: "安芸",
    capitalName: "廣島 (吉田郡山城)",
    centerCoords: [224, 482],
    d: "M 204,498 C 198,480 212,472 230,466 C 246,462 248,474 250,488 C 240,492 228,496 216,500 C 208,500 204,498 204,498 Z"
  },
  jp_izumo_inaba: {
    name: "出雲·伯耆·因幡 (尼子氏·神話之鄉)",
    kanji: "出雲",
    capitalName: "出雲 / 鳥取",
    centerCoords: [250, 452],
    d: "M 182,488 C 206,470 226,456 242,446 C 256,440 268,442 284,438 C 296,436 302,438 300,448 C 292,458 274,460 258,462 C 246,462 230,466 212,472 C 198,480 182,488 182,488 Z"
  },
  jp_bizen_mimasaka: {
    name: "備前·備中·美作 (宇喜多秀家)",
    kanji: "備前",
    capitalName: "岡山",
    centerCoords: [272, 472],
    d: "M 250,488 C 248,474 246,462 258,462 C 274,460 292,458 288,468 C 294,480 282,482 266,484 C 256,486 250,488 250,488 Z"
  },

  // --- KINKI / KANSAI (近畿·京都·大阪) ---
  jp_harima_tamba: {
    name: "播磨·丹波·但馬 (黑田官兵衛·姬路城)",
    kanji: "播磨",
    capitalName: "姬路 (白鷺城)",
    centerCoords: [316, 456],
    d: "M 288,468 C 292,458 300,448 300,438 C 314,432 328,428 336,434 C 338,448 342,462 340,474 C 330,478 314,480 294,480 C 288,468 288,468 288,468 Z"
  },
  jp_yamashiro_settsu: {
    name: "山城·攝津·河內 (京都皇都·大坂王城)",
    kanji: "山城",
    capitalName: "京都御所 / 大坂城",
    centerCoords: [352, 466],
    d: "M 340,474 C 342,462 338,448 336,434 C 346,438 358,445 364,455 C 362,468 360,482 355,492 C 346,490 338,485 340,474 Z"
  },
  jp_omi: {
    name: "近江 (安土城·石田三成·琵琶湖)",
    kanji: "近江",
    capitalName: "近江八幡 / 彥根",
    centerCoords: [378, 442],
    d: "M 364,435 C 374,428 382,434 382,434 C 386,446 384,458 384,458 C 376,466 368,470 368,470 C 362,468 364,455 364,455 C 358,445 364,435 364,435 Z"
  },
  jp_yamato_kii: {
    name: "大和·紀伊 (奈良大佛·高野山·德川御三家)",
    kanji: "紀伊",
    capitalName: "奈良 / 和歌山",
    centerCoords: [366, 508],
    d: "M 355,492 C 360,482 368,470 384,458 C 392,465 396,480 390,500 C 382,518 372,532 360,538 C 350,534 344,522 342,508 C 348,496 355,492 355,492 Z"
  },

  // --- CHUBU (中部·東海·甲信越) ---
  jp_echizen_kaga_noto: {
    name: "越前·加賀·能登 (前田利家加賀百萬石)",
    kanji: "加賀",
    capitalName: "金澤 / 福井 (北之莊)",
    centerCoords: [390, 392],
    d: "M 336,434 C 352,430 364,418 374,408 C 384,392 396,372 408,358 C 416,364 412,380 404,395 C 398,410 390,422 382,434 C 374,428 364,435 336,434 Z"
  },
  jp_mino_hida: {
    name: "美濃·飛驒 (齋藤道三·岐阜城·關原)",
    kanji: "美濃",
    capitalName: "岐阜 (稻葉山城)",
    centerCoords: [406, 432],
    d: "M 382,434 C 390,422 402,412 415,404 C 428,418 432,434 426,450 C 414,452 402,456 392,460 C 384,458 386,446 382,434 Z"
  },
  jp_owari_mikawa: {
    name: "尾張·三河 (信長·家康·秀吉三英傑搖籃)",
    kanji: "尾張",
    capitalName: "名古屋 (那古野/岡崎)",
    centerCoords: [414, 466],
    d: "M 392,460 C 402,456 414,452 426,450 C 436,458 440,472 440,472 C 432,482 418,480 408,474 C 398,468 392,465 392,460 Z"
  },
  jp_echigo: {
    name: "越後·越中 (上杉謙信毘沙門天春日山)",
    kanji: "越後",
    capitalName: "春日山城 (上越)",
    centerCoords: [462, 368],
    d: "M 404,395 C 416,396 430,388 448,375 C 468,360 488,346 510,336 C 504,350 496,362 484,374 C 476,386 460,392 444,398 C 430,404 415,404 404,395 Z"
  },
  jp_kai_shinano: {
    name: "甲斐·信濃 (武田信玄風林火山·川中島)",
    kanji: "甲斐",
    capitalName: "甲府 (躑躅崎館) / 上田",
    centerCoords: [454, 424],
    d: "M 415,404 C 430,404 444,398 460,392 C 476,402 488,418 492,434 C 486,448 472,455 458,450 C 442,454 426,450 432,434 C 428,418 415,404 415,404 Z"
  },
  jp_suruga_totomi: {
    name: "駿河·遠江·伊豆 (富士山下·今川與家康駿府)",
    kanji: "駿河",
    capitalName: "靜岡 (駿府城) / 濱松",
    centerCoords: [464, 470],
    d: "M 426,450 C 442,454 458,450 472,455 C 482,460 490,472 494,488 C 486,494 478,482 468,472 C 454,476 440,472 436,458 C 426,450 426,450 426,450 Z"
  },

  // --- KANTO (關東平原) ---
  jp_sagami: {
    name: "相模 (後北條氏·小田原城·鎌倉幕府)",
    kanji: "相模",
    capitalName: "小田原 / 鎌倉",
    centerCoords: [496, 452],
    d: "M 472,455 C 486,448 492,434 502,442 C 510,450 514,460 508,465 C 498,468 490,472 482,460 C 472,455 472,455 472,455 Z"
  },
  jp_musashi: {
    name: "武藏 (江戶城·德川幕府大本營·今東京)",
    kanji: "武藏",
    capitalName: "江戶 (皇居/千代田)",
    centerCoords: [512, 428],
    d: "M 492,434 C 488,418 496,416 506,410 C 520,412 532,420 528,432 C 520,442 514,444 510,450 C 502,442 492,434 492,434 Z"
  },
  jp_kanto_north: {
    name: "上野·下野·常陸 (關東七國·日光東照宮)",
    kanji: "上野",
    capitalName: "宇都宮 / 水戶",
    centerCoords: [536, 400],
    d: "M 496,416 C 516,394 532,385 548,378 C 564,374 562,392 558,410 C 552,430 546,446 542,462 C 534,470 526,456 520,442 C 528,432 532,420 520,412 C 506,410 496,416 496,416 Z"
  },

  // --- TOHOKU (東北·奧羽) ---
  jp_mutsu_south: {
    name: "陸奧南部 (伊達政宗獨眼龍·仙台藩)",
    kanji: "陸奧",
    capitalName: "仙台 (青葉城) / 米澤",
    centerCoords: [554, 345],
    d: "M 516,394 C 526,364 538,348 548,332 C 560,320 574,318 586,316 C 578,328 572,342 568,358 C 564,374 548,378 532,385 C 516,394 516,394 516,394 Z"
  },
  jp_dewa: {
    name: "出羽 (最上義光·庄內平原)",
    kanji: "出羽",
    capitalName: "山形 / 秋田",
    centerCoords: [536, 298],
    d: "M 510,336 C 518,318 524,298 528,276 C 522,266 532,254 544,260 C 556,275 560,296 560,320 C 548,332 538,348 526,364 C 510,336 510,336 510,336 Z"
  },
  jp_mutsu_north: {
    name: "奧州北部 (南部氏·津輕氏·陸奧灣)",
    kanji: "奧州",
    capitalName: "盛岡 / 弘前",
    centerCoords: [574, 258],
    d: "M 560,320 C 560,296 556,275 544,260 C 532,254 538,248 546,238 C 552,224 564,218 572,234 C 584,228 586,215 596,212 C 604,220 606,238 604,258 C 600,278 594,298 586,316 C 574,318 560,320 560,320 Z"
  },

  // --- HOKKAIDO (北海道·蝦夷地) ---
  jp_hokkaido_south: {
    name: "渡島·箱館 (松前藩·五稜郭星形要塞)",
    kanji: "渡島",
    capitalName: "函館 (五稜郭)",
    centerCoords: [554, 182],
    d: "M 534,204 C 542,192 554,188 564,186 C 568,172 562,160 550,166 C 540,178 532,194 534,204 Z"
  },
  jp_hokkaido_main: {
    name: "蝦夷本島 (石狩平原·開拓使·札幌)",
    kanji: "蝦夷",
    capitalName: "札幌 / 旭川",
    centerCoords: [634, 118],
    d: "M 550,166 C 552,148 562,136 574,128 C 582,104 594,76 608,52 C 616,60 626,82 648,88 C 678,82 708,76 718,84 C 702,96 718,110 722,125 C 704,136 682,145 664,162 C 652,182 644,172 626,160 C 604,154 582,156 562,160 C 550,166 550,166 550,166 Z"
  },

  // --- FAMOUS HISTORICAL ISLANDS ---
  jp_tsushima: {
    name: "對馬島 (海門天險·日韓咽喉)",
    kanji: "對馬",
    capitalName: "嚴原",
    centerCoords: [103, 474],
    d: "M 98,472 C 100,464 104,460 108,466 C 110,474 108,482 104,488 C 100,488 97,480 98,472 Z"
  },
  jp_sado: {
    name: "佐渡島 (佐渡金山·越後門戶)",
    kanji: "佐渡",
    capitalName: "相川",
    centerCoords: [460, 348],
    d: "M 452,348 C 454,340 462,336 468,342 C 470,350 465,356 458,358 C 454,358 450,354 452,348 Z"
  },
  jp_awaji: {
    name: "淡路島 (國生神話·瀨戶門戶)",
    kanji: "淡路",
    capitalName: "洲本",
    centerCoords: [327, 494],
    d: "M 324,492 C 326,486 332,485 334,490 C 336,498 332,504 326,504 C 322,500 322,496 324,492 Z"
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
