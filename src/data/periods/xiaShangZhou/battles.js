// Historic Battles of Xia, Shang, and Western Zhou Dynasties (c. 2070 BCE - 771 BCE)
export const XIA_SHANG_ZHOU_BATTLES = [
  {
    id: "battle_gan_2050",
    eventId: "evt_qigan_2050",
    name: "甘之戰（破除禪讓，確立四千年家天下之戰）",
    year: -2050,
    yearDisplay: "約前 2050 年",
    eraName: "夏 啟元年",
    locationAncient: "甘地（關中鄠邑）",
    locationModern: "陝西省西安市鄠邑區（戶縣）",
    coordinates: [34.11, 108.62],
    factions: ["xia", "tribal"],
    attacker: {
      factionName: "夏后氏大軍（夏啟王師六軍）",
      faction: "xia",
      commanders: [
        {
          name: "夏啟",
          title: "夏朝第二代天子（作《甘誓》親統六軍）",
          figureId: "qi_xia"
        },
        {
          name: "六卿諸臣",
          title: "夏王室六軍統帥將領"
        }
      ],
      forcesEstimate: "夏王師六軍約萬餘人",
      casualtiesEstimate: "傷亡約千餘人"
    },
    defender: {
      factionName: "有扈氏部落同盟",
      faction: "tribal",
      commanders: [
        {
          name: "有扈氏首領",
          title: "有扈氏部落酋長（持守禪讓古制反對世襲）"
        }
      ],
      forcesEstimate: "有扈氏部族武士數千人",
      casualtiesEstimate: "主力全軍覆沒，族眾被俘籍沒為牧奴"
    },
    tactics: [
      "夏啟作《甘誓》誓師整肅軍紀：『左不攻于左，汝不恭命；右不攻于右，汝不恭命』，嚴格約束戰陣協同",
      "以天命討罪激發全軍鬥志，夏王師六軍集中優勢力量正面猛攻，徹底擊潰有扈氏部落防線"
    ],
    victorStatement: "夏啟大破有扈氏，有扈氏國滅族俘。世襲「家天下」制度自此跨越禪讓古制，成為華夏正統法度。",
    strategicOutcome: "徹底粉碎了反對夏王世襲的宗族政治勢力，鞏固了夏王朝的中央政權，萬國諸侯莫不臣服於夏后氏。",
    summary: "大禹崩，啟踐帝位，有扈氏不服其廢除禪讓古制而起兵。夏啟親率六軍與有扈氏決戰於甘地。戰前啟作《甘誓》整飭軍紀，嚴令『左不攻于左，汝不恭命；右不攻于右，汝不恭命』。夏軍英勇破敵，有扈氏被滅，族眾籍沒為奴。",
    significance: "甘之戰是華夏有文獻記載的最早大會戰，標誌著原始社會禪讓制徹底退出歷史舞台，父死子繼的世襲王權「家天下」制度自此統治華夏四千年。"
  },
  {
    id: "battle_mingtiao_1600",
    eventId: "evt_mingtiao_1600",
    name: "鳴條之戰（成湯革命滅夏桀，八百年殷商建國之決戰）",
    year: -1600,
    yearDisplay: "約前 1600 年",
    eraName: "商 湯元年",
    locationAncient: "鳴條之野（中條山西麓）",
    locationModern: "山西省運城市夏縣 / 安邑一帶",
    coordinates: [35.14, 111.22],
    factions: ["shang", "xia"],
    attacker: {
      factionName: "大商與反夏諸侯盟軍",
      faction: "shang",
      commanders: [
        {
          name: "商湯 (成湯)",
          title: "商朝開國天子（誓師滅桀，行仁義王道）",
          figureId: "shang_tang"
        },
        {
          name: "伊尹",
          title: "商朝聖相謀主（運籌十一征無敵天下）",
          figureId: "yiyin"
        },
        {
          name: "仲虺",
          title: "商朝左相（作《仲虺之誥》動員天下）"
        }
      ],
      forcesEstimate: "商軍良車七十乘、敢死士六千、諸侯聯軍數萬",
      casualtiesEstimate: "傷亡約數千人"
    },
    defender: {
      factionName: "夏桀王朝主力及九夷部屬",
      faction: "xia",
      commanders: [
        {
          name: "夏桀",
          title: "夏朝末代暴君（手格猛獸，荒淫殘暴）",
          figureId: "xia_jie"
        }
      ],
      forcesEstimate: "夏朝主力及九夷部屬十餘萬人",
      casualtiesEstimate: "陣亡數萬人，餘部雷雨中全面崩潰潰散"
    },
    tactics: [
      "商湯戰前作《湯誓》誓師：『格爾眾庶，悉聽朕言，非台小子敢行稱亂，有夏多罪，天命殛之！』徹底鼓舞士氣",
      "利用夏桀民心盡失、軍心動搖之際，商軍車步協同迎頭痛擊；逢天降特大暴風雷雨，成湯乘夏軍震恐全線衝鋒，一舉擊破夏軍主力"
    ],
    victorStatement: "商湯大獲全勝，夏朝四百年江山徹底覆滅，商湯於亳都登基天子，建立大商帝國。",
    strategicOutcome: "商軍乘勝追擊，俘獲夏桀放逐於南巢（今安徽巢湖），天下三千諸侯大會於亳，尊商湯為天下共主。",
    summary: "夏桀暴虐荒淫、天怒民怨。商湯以伊尹為謀主、仲虺為左相，十一征而天下無敵。兩軍決戰於鳴條，商湯作《湯誓》激勵軍心。戰時突發狂風暴雨雷電交加，夏軍大亂崩潰。成湯揮軍追擊，俘獲夏桀放逐於南巢，夏朝四百年社稷覆亡。",
    significance: "華夏歷史上第一次以武力推翻腐朽暴虐舊王朝的「革命」典範，被儒家尊為『湯武革命，順乎天而應乎人』。"
  },
  {
    id: "battle_fuhao_bafang_1250",
    eventId: "evt_wuding_fuhao_1250",
    name: "婦好巴方之戰（甲骨文最早伏擊包圍戰，商代極盛）",
    year: -1250,
    yearDisplay: "約前 1250 年",
    eraName: "商 武丁二十年",
    locationAncient: "巴方境內（漢水流域）",
    locationModern: "湖北省襄陽至西北漢江一帶",
    coordinates: [32.20, 111.80],
    factions: ["shang", "tribal"],
    attacker: {
      factionName: "商朝王師精銳與婦好軍團",
      faction: "shang",
      commanders: [
        {
          name: "婦好",
          title: "商王后兼統帥（親統萬三千大軍設伏聚殲）",
          figureId: "fuhao"
        },
        {
          name: "武丁 (商高宗)",
          title: "大商天子（親率主力正面誘敵出擊）",
          figureId: "wuding"
        }
      ],
      forcesEstimate: "商朝王室精銳部隊約萬三千人",
      casualtiesEstimate: "傷亡約數百人"
    },
    defender: {
      factionName: "巴方部落聯盟",
      faction: "tribal",
      commanders: [
        {
          name: "巴方酋長",
          title: "巴方部族大酋長"
        }
      ],
      forcesEstimate: "巴方部族精銳數千人",
      casualtiesEstimate: "主力全軍覆滅，被俘數千人"
    },
    tactics: [
      "商王武丁自率一部從東南正面進攻，誘使巴方主力部隊全軍追擊出擊",
      "婦好預先率精銳於西面山隘谷地設伏，待巴方部隊越過伏擊線時斷其退路，兩面夾擊全殲巴方"
    ],
    victorStatement: "商軍伏擊全勝，巴方主力覆滅，巴方首領向殷商稱臣納貢，殷商南方邊疆大定。",
    strategicOutcome: "徹底解除了漢江流域巴方對商朝南土的侵擾威脅，將商朝青銅文明與宗主權力深度拓展至長江水系。",
    summary: "安陽殷墟甲骨卜辭詳盡記載：武丁自率一部從東南正面進攻，誘使巴方主力出擊；婦好則預先率精銳於西面山隘設下伏兵。巴方不知有伏，全力迎戰武丁之師，婦好伏兵突起截斷歸路，商軍合圍全殲巴方主力，平定西南疆土。",
    significance: "華夏文字記載最早之伏擊包圍殲滅戰，也是王后婦好卓越軍事謀略之代表戰例。"
  },
  {
    id: "battle_muye_1046",
    eventId: "evt_muye_1046",
    name: "牧野之戰（八百諸侯孟津會，紂王自焚西周代商）",
    year: -1046,
    yearDisplay: "前 1046 年",
    eraName: "周 武王元年",
    locationAncient: "牧野之野（新鄉朝歌間）",
    locationModern: "河南省新鄉市牧野區至鶴壁淇縣",
    coordinates: [35.30, 113.88],
    factions: ["zhou", "shang"],
    attacker: {
      factionName: "周武王諸侯聯軍（庸、蜀、羌、髳八國盟軍）",
      faction: "zhou",
      commanders: [
        {
          name: "周武王 (姬發)",
          title: "西周開國天子（親率虎賁勇士誓師孟津）",
          figureId: "zhou_wuwang"
        },
        {
          name: "姜子牙 (呂尚)",
          title: "周軍統帥師尚父（持白旄黃鉞衝鋒先登）",
          figureId: "jiang_ziya"
        },
        {
          name: "周公旦",
          title: "周室柱石謀主（輔武王定周室基業）",
          figureId: "zhougong_dan"
        }
      ],
      forcesEstimate: "兵車三百乘、虎賁三千、甲士四萬五千人",
      casualtiesEstimate: "傷亡約數千人"
    },
    defender: {
      factionName: "殷商王朝守衛部隊及武裝奴隸",
      faction: "shang",
      commanders: [
        {
          name: "商紂王 (帝辛)",
          title: "殷商末代帝王（主力遠征東夷，倉促武裝奴隸）",
          figureId: "shang_zhouwang"
        }
      ],
      forcesEstimate: "商朝奴隸守軍、宿衛軍十七萬人",
      casualtiesEstimate: "前鋒陣前倒戈，全軍崩潰潰散，死傷無算"
    },
    tactics: [
      "乘商紂王主力遠征江淮東夷、朝歌京畿空虛之千載難逢良機，疾馳千里閃擊牧野",
      "姜子牙率敢死虎賁持白旄先登衝鋒，商軍陣中倒戈，周軍以車兵步卒穿插聚殲，一戰瓦解十七萬商軍"
    ],
    victorStatement: "周軍大獲全勝，紂王登鹿台自焚而死，殷商六百年江山覆亡，西周正式定鼎天下。",
    strategicOutcome: "周武王入朝歌撫綏殷民，分封微子啟存商祀，定都鎬京，分封天下開創八百年周室基業。",
    summary: "周武王率兵會八百諸侯於孟津，乘紂王主力遠征東夷未返之機直插朝歌。甲子日黎明，兩軍決戰於牧野。姜尚率前鋒勇猛衝殺，武王親執黃鉞督陣，商軍前鋒陣前倒戈反戈相向，商軍全線潰敗血流漂杵。紂王逃回朝歌，登鹿台自焚而死，殷商滅亡。",
    significance: "華夏上古歷史上具有劃時代意義之史詩決戰，結束殷商六百年統治，開啟西周禮樂分封文明新紀元。"
  },
  {
    id: "battle_sanjian_1042",
    eventId: "evt_zhougong_dongzheng_1042",
    name: "周公東征平三監之戰（三年東征踐奄，周禮分封天下大定）",
    year: -1042,
    yearDisplay: "前 1042 年",
    eraName: "周 成王二年 / 周公攝政",
    locationAncient: "商都故墟至東夷奄國（曲阜一帶）",
    locationModern: "河南省商丘至山東省濟寧曲阜市",
    coordinates: [35.58, 116.98],
    factions: ["zhou", "shang"],
    attacker: {
      factionName: "宗周平叛王師六師",
      faction: "zhou",
      commanders: [
        {
          name: "周公旦",
          title: "西周攝政聖王（親統宗周六師東征三年）",
          figureId: "zhougong_dan"
        },
        {
          name: "召公奭",
          title: "西周太保（出兵南路相宅成周）",
          figureId: "zhaogong_shi"
        },
        {
          name: "伯禽",
          title: "周公長子（首任魯公，進兵平定東夷奄國）",
          figureId: "boqin"
        }
      ],
      forcesEstimate: "宗周六師精銳及陳鄭聯軍約五萬人",
      casualtiesEstimate: "傷亡約數千人"
    },
    defender: {
      factionName: "武庚商朝叛軍、三監及淮夷奄國同盟",
      faction: "shang",
      commanders: [
        {
          name: "武庚",
          title: "商紂王之子（起兵叛亂企圖復辟大商）"
        },
        {
          name: "管叔鮮",
          title: "武王三弟（監商作亂，覬覦王位）"
        },
        {
          name: "蔡叔度",
          title: "武王五弟（附逆叛亂）"
        }
      ],
      forcesEstimate: "商朝叛軍、三監封邑軍及淮夷奄國部隊數萬人",
      casualtiesEstimate: "武庚被誅，管叔伏誅，奄國國滅"
    },
    tactics: [
      "周公作《大誥》團結王室將士，採取「先平三監、再攻武庚、後破奄國」分步瓦解戰略",
      "宗周六師穩扎穩打，長驅東進三年，逐一掃蕩黃河淮海間叛亂據點，徹底蕩平東夷九部"
    ],
    victorStatement: "周公三年東征全勝，誅武庚殺管叔流蔡叔，收復奄國平服九夷，商室復辟野心徹底破滅。",
    strategicOutcome: "西周營造東都成周洛邑監控東方，實施七十一國大分封，制禮作樂，奠定西周長治久安基石。",
    summary: "周武王崩成王幼，周公攝政。管叔、蔡叔散佈流言，勾結武庚與淮夷、奄國發動大叛亂。周公作《大誥》團結王室，親帥大軍東征整整三年，克商都誅武庚，殺管叔流蔡叔降霍叔，平定奄國，徹底根除商朝復辟勢力，隨後營造東都成周洛邑。",
    significance: "西周立國初期的生死存亡之戰。周公東征勝利奠定了周王朝對廣大東方諸侯與夷狄的統治基礎，開啟周公大分封與制禮作樂之局。"
  },
  {
    id: "battle_zhaowang_chu_977",
    eventId: "evt_zhaowang_nanzheng_977",
    name: "昭王伐楚漢水之役（好大喜功喪六師，西周由盛轉衰之轉折點）",
    year: -977,
    yearDisplay: "前 977 年",
    eraName: "周 昭王十九年",
    locationAncient: "漢水之濱（漢江流域）",
    locationModern: "湖北省襄陽市 / 宜城市漢江中游",
    coordinates: [31.95, 112.15],
    factions: ["zhou", "tribal"],
    attacker: {
      factionName: "周天子親征宗周大軍（周昭王王師）",
      faction: "zhou",
      commanders: [
        {
          name: "周昭王 (姬瑕)",
          title: "西周第四代天子（親統六師南征，死於漢水）",
          figureId: "zhou_zhaowang"
        }
      ],
      forcesEstimate: "宗周六師精銳主力約三萬人",
      casualtiesEstimate: "船沉江心，六師全軍覆沒，周天子淹死"
    },
    defender: {
      factionName: "荊楚部落聯盟及漢濱蠻夷",
      faction: "tribal",
      commanders: [
        {
          name: "楚人酋長",
          title: "荊楚部族大酋首"
        }
      ],
      forcesEstimate: "荊楚及漢陽蠻夷數萬人",
      casualtiesEstimate: "傷亡甚微"
    },
    tactics: [
      "漢濱蠻夷假意歸順，以樹膠黏合木板造船獻給周王師渡江",
      "船行至漢水江心深處膠融木解，周軍戰士甲重難泅，昭王與六師精銳盡沉江底"
    ],
    victorStatement: "荊楚蛮夷大獲全勝，西周宗周精銳六師主力全軍覆滅，周昭王屍身僅由辛餘靡夜潛撈出。",
    strategicOutcome: "周天子失去壓制南方諸侯的絕對軍事实力，楚國趁機『辟在荊山』日益強盛自主，不再尊崇周王室。",
    summary: "周昭王好大喜功，不尊德義，大舉起六師南征荊楚。昭王涉漢水，漢水蠻夷以膠黏船誘周軍渡江，船至江心膠溶解體，昭王與六師將士盡溺於漢水之中，辛餘靡僅救得昭王屍身北返。宗周最強主力喪失殆盡。",
    significance: "西周由盛轉衰之最大軍事轉折點。宗周六師覆滅使周天子失去壓制四方諸侯之絕對軍事威懾力，南方楚國自此『辟在荊山，篳路藍縷』日益自主崛起。"
  },
  {
    id: "battle_xuyanwang_960",
    eventId: "evt_muwang_xizheng_960",
    name: "周穆王伐徐平徐偃王之戰（造父日行千里，重整東南王綱）",
    year: -960,
    yearDisplay: "前 960 年",
    eraName: "周 穆王十七年",
    locationAncient: "徐國都邑至彭城（淮泗流域）",
    locationModern: "江蘇省徐州市至宿遷市泗洪縣",
    coordinates: [34.26, 117.18],
    factions: ["zhou", "tribal"],
    attacker: {
      factionName: "周天子與楚國勤王聯軍",
      faction: "zhou",
      commanders: [
        {
          name: "周穆王 (姬滿)",
          title: "西周傳奇天子（造父御車馳援還師）",
          figureId: "zhou_muwang"
        }
      ],
      forcesEstimate: "周王師車乘與楚軍步卒約三萬人",
      casualtiesEstimate: "傷亡約千餘人"
    },
    defender: {
      factionName: "徐偃王東南方國同盟",
      faction: "tribal",
      commanders: [
        {
          name: "徐偃王",
          title: "徐國國君（行仁義僭號稱王，朝服三十六國）"
        }
      ],
      forcesEstimate: "徐國部隊及三十六方國之眾數萬人",
      casualtiesEstimate: "偃王走死彭城武原山，方國瓦解"
    },
    tactics: [
      "穆王聞徐偃王僭號稱王，命造父駕八駿之乘一日千里急馳歸京，發兵討伐",
      "聯合南方日益崛起之楚國形成南北夾擊之勢，直搗徐國核心淮泗盆地"
    ],
    victorStatement: "周楚聯軍擊潰徐國，徐偃王不忍黎民罹難棄城出逃，東南淮夷各國重新臣服於周天子。",
    strategicOutcome: "維護了西周對江淮東南方國的宗主威望，同時使助周平徐的楚國獲得南荒封賞而進一步壯大。",
    summary: "徐偃王在淮泗行仁義之政，東南三十六國朝拜徐國，偃王遂僭越稱王。周穆王西巡瑤池得悉變故，命造父駕八駿之乘，日行千里急馳鎬京發兵，並聯絡楚國夾擊徐國。徐偃王仁愛不忍使黎民罹戰禍，棄城敗走彭城武原山。周穆王遂平定淮泗，重整東南王綱。",
    significance: "周穆王平定淮夷與徐夷叛亂之關鍵大捷，維護了西周對東南方國的宗主威望，同時使楚國因助周伐徐獲封賞而進一步坐大。"
  },
  {
    id: "battle_guoren_841",
    eventId: "evt_guoren_baodong_841",
    name: "鎬京國人暴動圍攻王宮之役（防民之口甚於防川，共和行政開確切紀年）",
    year: -841,
    yearDisplay: "前 841 年",
    eraName: "周 厲王三十七年",
    locationAncient: "宗周鎬京王宮（關中）",
    locationModern: "陝西省西安市戶縣長安一帶",
    coordinates: [34.25, 108.75],
    factions: ["zhou", "other"],
    attacker: {
      factionName: "鎬京國人起事陣營（平民、手工業者及中小貴族）",
      faction: "other",
      commanders: [
        {
          name: "國人起事首領",
          title: "鎬京國人代表（聚眾討伐專利暴政）"
        }
      ],
      forcesEstimate: "鎬京國人群起數萬人",
      casualtiesEstimate: "傷亡數百人"
    },
    defender: {
      factionName: "周厲王宮廷衛隊及榮夷公私兵",
      faction: "zhou",
      commanders: [
        {
          name: "周厲王 (姬胡)",
          title: "西周天子（行專利之政防民之口，倉皇出奔）",
          figureId: "zhou_liwang"
        }
      ],
      forcesEstimate: "宮廷衛隊千餘人",
      casualtiesEstimate: "衛隊潰散，榮夷公被殺，厲王流亡彘邑"
    },
    tactics: [
      "國人不堪衛巫監視道路以目之暴政，持兵杖木挺突然發難，合圍宗周鎬京王宮",
      "召穆公以己子代死護佑太子姬靜逃出生天，周定公與召穆公順應民意共同執政"
    ],
    victorStatement: "國人成功推翻周厲王專利統治，厲王流亡彘邑十四年而終，宗周開創「共和行政」十四載。",
    strategicOutcome: "司馬遷《史記》由此年（西元前841年，共和元年）開啟連續確切年表紀年，中國歷史正式邁入精確紀年時代。",
    summary: "周厲王實施專利政策，霸佔王畿山川池澤，並派巫祝監視國人言論，言者輒誅，防民之口甚於防川。前841年，鎬京國人憤起手持兵杖圍攻王宮。厲王倉皇出逃奔彘邑。召穆公保護太子姬靜，以自己之子代死。國人平息後推舉周定公、召穆公共同執政，史稱「共和行政」。",
    significance: "華夏史上最早之市民與平民武裝反抗暴君起義，宣告周天子專制王權不可凌駕民意之上。共和元年（前841年）亦為中國古代歷史確切紀年之起點。"
  },
  {
    id: "battle_xianyun_823",
    eventId: "evt_xuanwang_zhongxing_825",
    name: "尹吉甫北伐獫狁之戰（宣王中興車攻之勝，詩經六月名篇）",
    year: -823,
    yearDisplay: "前 823 年",
    eraName: "周 宣王五年",
    locationAncient: "焦獲至太原（陝北至山西北部）",
    locationModern: "陝西省北部至山西省太原市一帶",
    coordinates: [36.50, 109.40],
    factions: ["zhou", "tribal"],
    attacker: {
      factionName: "周宣王中興王師大軍",
      faction: "zhou",
      commanders: [
        {
          name: "尹吉甫",
          title: "周宣王大師（文武雙全統率六師北伐）",
          figureId: "yin_jifu"
        },
        {
          name: "周宣王 (姬靜)",
          title: "西周中興雄主（命將出征收復王畿失地）",
          figureId: "zhou_xuanwang"
        }
      ],
      forcesEstimate: "王師精銳戰車千乘、甲士三萬人",
      casualtiesEstimate: "傷亡約千餘人"
    },
    defender: {
      factionName: "西北遊牧民族獫狁部落聯盟",
      faction: "tribal",
      commanders: [
        {
          name: "獫狁首領",
          title: "獫狁部族大首領"
        }
      ],
      forcesEstimate: "獫狁騎射精銳數萬人",
      casualtiesEstimate: "主力慘敗，被斬首數千，逐出王畿邊境"
    },
    tactics: [
      "大師尹吉甫率六師戰車大隊堂堂結陣，戰車彭彭、旂旐央央，正面摧毀獫狁騎射陣形",
      "名將南仲出朔方築城戍守，斷敵水源糧道，兩軍合擊追殲獫狁至太原邊陲"
    ],
    victorStatement: "周王師大獲全勝，徹底粉碎獫狁對涇陽鎬京的致命軍事威脅，西周北疆邊陲全面收復。",
    strategicOutcome: "重振宗周王權對四方諸侯的號召力，天下諸侯復來朝見天子，史稱『宣王中興』。",
    summary: "獫狁侵暴西周北疆，兵鋒直指涇陽。周宣王即位命大師尹吉甫率六師出征，將領南仲築城於朔方。周軍戰車彭彭、旌旗蔽日，於焦獲大敗獫狁，追擊至太原，徹底解除了西北遊牧民族對宗周鎬京之軍事威脅。《詩經·六月》銘刻此役之赫赫戰功。",
    significance: "宣王中興最強盛之軍事勝利，重振西周天子王權北疆防線，為春秋前夕中原農耕文明抵禦草原侵襲之典範戰例。"
  },
  {
    id: "battle_haojing_771",
    eventId: "evt_youwang_qian_771",
    name: "驪山之難與鎬京陷落（幽王被殺褒姒被俘，西周二百七十五年覆亡）",
    year: -771,
    yearDisplay: "前 771 年",
    eraName: "周 幽王十一年",
    locationAncient: "宗周鎬京與驪山山麓（臨潼）",
    locationModern: "陝西省西安市長安區至臨潼區驪山",
    coordinates: [34.36, 109.21],
    factions: ["other", "tribal"],
    attacker: {
      factionName: "犬戎部族與申侯、繒國叛軍聯軍",
      faction: "tribal",
      commanders: [
        {
          name: "申侯",
          title: "申國國君（怨幽王廢后廢太子，引狼入室）",
          figureId: "shenhou"
        },
        {
          name: "犬戎大酋長",
          title: "西北犬戎剽悍部族統帥"
        }
      ],
      forcesEstimate: "犬戎剽悍騎兵及申國部隊數萬人",
      casualtiesEstimate: "傷亡約數百人"
    },
    defender: {
      factionName: "周幽王宗周宮廷宿衛部隊",
      faction: "other",
      commanders: [
        {
          name: "周幽王 (姬宮湦)",
          title: "西周末代昏君（烽火戲諸侯，弒於驪山下）",
          figureId: "zhou_youwang"
        }
      ],
      forcesEstimate: "鎬京殘破宿衛數千人（諸侯莫應烽火）",
      casualtiesEstimate: "宿衛全軍覆滅，幽王被斬，褒姒被俘"
    },
    tactics: [
      "申侯勾結犬戎長驅奔襲宗周鎬京，趁幽王宿衛空虛發動閃電圍城",
      "幽王倉促點燃驪山烽火求援，諸侯皆因先前數次受騙無一來救，犬戎直搗王宮破城"
    ],
    victorStatement: "犬戎攻陷宗周鎬京，掠盡寶藏，殺幽王於驪山山麓，俘虜褒姒，西周王朝二百七十五年江山覆滅。",
    strategicOutcome: "晉文侯、鄭武公、秦襄公引兵逐犬戎，擁立宜臼東遷洛邑（平王東遷），王室衰微，春秋亂世兼併大幕全面拉開。",
    summary: "周幽王昏聵暴虐，烽火戲諸侯使王命盡失威信。幽王廢申后與太子宜臼，立褒姒與伯服。申侯憤怒引犬戎攻打鎬京。幽王舉烽火召兵，諸侯以為又詐皆不至。犬戎攻破鎬京掠奪財寶，幽王攜褒姒南逃至驪山，遭犬戎追兵斬殺於山麓下。西周二百七十五年江山自此滅亡。",
    significance: "西周王朝覆滅之終局決戰。平王繼位東遷洛邑，宗周王室淪為二流諸侯，天子失威，諸侯霸興，正式拉開春秋戰國五百年亂世兼併序幕。"
  }
];
