// Historical Figures of Xia, Shang, and Western Zhou Dynasties (c. 2070 BCE - 771 BCE)
// With complete biographical details, avatars, and inter-figure relational network graphs
export const XIA_SHANG_ZHOU_FIGURES = [
  // --- 夏朝人物 (Xia Dynasty) ---
  {
    id: "yu",
    name: "大禹 (姒文命)",
    pinyin: "Dà Yǔ",
    title: "夏朝開國始祖 · 治水聖王",
    faction: "xia",
    birthYear: -2120,
    deathYear: -2060,
    avatar: "images/figures/fig_yu.jpg",
    bio: "黃帝玄孫、鯀之子。受舜命治理特大水患，居外十三年過家門而不入。導淮疏江、平定九河，定天下為九州。舜崩後受禪天子位，於塗山大會諸侯，收天下青銅鑄九鼎，奠定夏朝建國基石。",
    tags: ["大禹治水", "塗山之會", "鑄九鼎", "夏后始祖"],
    relations: [
      { figureId: "qi_xia", relationType: "family", label: "禹之愛子 · 家天下開拓者" },
      { figureId: "yi", relationType: "colleague", label: "治水功臣 · 禪讓讓位於啟" },
      { figureId: "shaokang", relationType: "family", label: "夏后玄孫 · 少康中興復辟" },
      { figureId: "xia_jie", relationType: "rival", label: "夏室末代 · 暴虐亡國後裔" }
    ],
    participatedEventIds: ["evt_yutushan_2070"]
  },
  {
    id: "qi_xia",
    name: "夏啟",
    pinyin: "Xià Qǐ",
    title: "夏朝第二代天子 · 家天下開拓者",
    faction: "xia",
    birthYear: -2090,
    deathYear: -2030,
    avatar: "images/figures/fig_qi_xia.jpg",
    bio: "大禹之子。禹崩後諸侯去益而朝啟，宣告禪讓制結束，世襲「家天下」開端。有扈氏起兵作亂，啟作《甘誓》誓師，親率王師大敗有扈氏於甘地，奠定了世襲帝王專制統治法度。",
    tags: ["家天下", "甘誓", "世襲制", "甘之戰"],
    relations: [
      { figureId: "yu", relationType: "family", label: "父皇始祖 · 承繼大禹基業" },
      { figureId: "yi", relationType: "rival", label: "諸侯棄益朝啟 · 代禪讓" },
      { figureId: "houyi_dongyi", relationType: "rival", label: "東夷部落 · 篡夏奪權之仇" }
    ],
    participatedEventIds: ["evt_qigan_2050"]
  },
  {
    id: "houyi_dongyi",
    name: "后羿 (有窮氏)",
    pinyin: "Hòu Yì",
    title: "東夷部落首領 · 神射代夏政",
    faction: "tribal",
    birthYear: -2040,
    deathYear: -1980,
    avatar: "images/figures/fig_houyi.jpg",
    bio: "東夷有窮氏酋長，善射。夏王太康荒淫畋獵百日不返，后羿乘虛起兵佔據夏都斟鄩，阻絕太康歸路，代掌夏后氏朝政。後因沉迷畋獵，遭其義子寒浞所殺。",
    tags: ["太康失國", "后羿代夏", "東夷部落", "射藝神勇"],
    relations: [
      { figureId: "qi_xia", relationType: "rival", label: "代夏奪權 · 逐太康於洛水" },
      { figureId: "shaokang", relationType: "rival", label: "寒浞覆滅 · 少康復辟夏室" }
    ],
    participatedEventIds: ["evt_taikang_2000"]
  },
  {
    id: "shaokang",
    name: "少康",
    pinyin: "Shào Kāng",
    title: "夏朝第七代天子 · 少康中興雄主",
    faction: "xia",
    birthYear: -1990,
    deathYear: -1930,
    avatar: "images/figures/fig_shaokang.jpg",
    bio: "相之遺腹子。寄身有仍、有虞氏，有田一成、眾一旅。少康勵精圖治，布德兆謀，聯絡二斟殘餘與忠臣靡，起兵誅滅寒浞，光復夏朝國都斟鄩，史稱「少康中興」。",
    tags: ["少康中興", "一成一旅", "復辟夏室", "滅寒浞"],
    relations: [
      { figureId: "yu", relationType: "family", label: "復興大夏 · 承續大禹社稷" },
      { figureId: "houyi_dongyi", relationType: "rival", label: "一成一旅 · 誅寒浞雪耻" }
    ],
    participatedEventIds: ["evt_shaokang_1950"]
  },
  {
    id: "yi",
    name: "伯益",
    pinyin: "Bó Yì",
    title: "五帝大禹治水功臣 · 東夷首領",
    faction: "xia",
    birthYear: -2130,
    deathYear: -2050,
    avatar: "images/figures/fig_boyi.jpg",
    bio: "皋陶之子，嬴姓始祖。曾佐大禹治水，通禽獸之語言，掌管山林川澤。禹崩後讓天子位於啟，避居箕山之陽。諸侯皆朝拜啟，宣告古老部落禪讓推舉之法正式走入歷史。",
    tags: ["佐禹治水", "伯益讓位", "嬴姓始祖", "鳥獸通語"],
    relations: [
      { figureId: "yu", relationType: "colleague", label: "佐禹治水 · 禹擬傳位於益" },
      { figureId: "qi_xia", relationType: "monarch-subject", label: "讓位於啟 · 諸侯朝夏后" }
    ],
    participatedEventIds: ["evt_yutushan_2070"]
  },
  {
    id: "xia_jie",
    name: "夏桀 (姒履癸)",
    pinyin: "Xià Jié",
    title: "夏朝末代暴君 · 酒池肉林覆夏室",
    faction: "xia",
    birthYear: -1650,
    deathYear: -1590,
    avatar: "images/figures/fig_xiajie.jpg",
    bio: "夏朝最後一位天子。文武兼備，手格猛獸，但為人暴虐荒淫，寵幸妹喜，大興宮室為酒池肉林，民怨沸騰。商湯起兵於鳴條大敗夏師，夏桀流亡南巢而死，夏朝四百年社稷覆亡。",
    tags: ["夏桀暴虐", "鳴條之戰", "妹喜", "夏朝覆亡"],
    relations: [
      { figureId: "shang_tang", relationType: "rival", label: "鳴條大敗 · 成湯革命放南巢" },
      { figureId: "yiyin", relationType: "rival", label: "商湯謀主 · 策動滅夏之相" },
      { figureId: "yu", relationType: "family", label: "夏后末帝 · 葬送大禹四百年江山" }
    ],
    participatedEventIds: ["evt_mingtiao_1600"]
  },

  // --- 商朝人物 (Shang Dynasty) ---
  {
    id: "shang_tang",
    name: "商湯 (成湯/天乙)",
    pinyin: "Shāng Tāng",
    title: "大商開國天子 · 商湯革命除暴君",
    faction: "shang",
    birthYear: -1650,
    deathYear: -1588,
    avatar: "images/figures/fig_shangtang.jpg",
    bio: "子姓，名履，又稱天乙、成湯。商部落首領，任用伊尹、仲虺為相，修德愛民，十一征而天下無敵。鳴條之決戰摧毀夏朝主力，建立商朝，定都於亳。在位遇七年大旱，於桑林祈雨剪髮自代，萬民稱頌。",
    tags: ["商湯立國", "商湯革命", "桑林祈雨", "網開一面"],
    relations: [
      { figureId: "yiyin", relationType: "advisor", label: "三聘阿衡 · 拜為謀主相國" },
      { figureId: "xia_jie", relationType: "rival", label: "鳴條決戰 · 放桀建商" },
      { figureId: "pangen", relationType: "family", label: "殷商後昆 · 遷殷遵湯政" },
      { figureId: "wuding", relationType: "family", label: "高宗盛世 · 振成湯之大業" }
    ],
    participatedEventIds: ["evt_mingtiao_1600"]
  },
  {
    id: "yiyin",
    name: "伊尹 (阿衡)",
    pinyin: "Yī Yǐn",
    title: "商朝元老相國 · 帝師與元聖始祖",
    faction: "shang",
    birthYear: -1648,
    deathYear: -1549,
    avatar: "images/figures/fig_yiyin.jpg",
    bio: "出身奴隸，有大智。以烹飪調和五味之理進諫成湯，拜為右相謀主。佐商湯滅夏桀，又輔太甲。太甲即位暴亂，伊尹放之於桐宮三年思過，待太甲悔過自新迎歸親政，開創天下大治。",
    tags: ["治大國若烹小鮮", "伊尹放太甲", "商朝元老", "元聖阿衡"],
    relations: [
      { figureId: "shang_tang", relationType: "monarch-subject", label: "輔佐成湯 · 定天下鳴條革命" },
      { figureId: "xia_jie", relationType: "rival", label: "深入間諜 · 策劃傾覆夏社" }
    ],
    participatedEventIds: ["evt_mingtiao_1600", "evt_taijia_1550"]
  },
  {
    id: "pangen",
    name: "盤庚",
    pinyin: "Pán Gēng",
    title: "商朝第十九代天子 · 遷都殷墟中興",
    faction: "shang",
    birthYear: -1340,
    deathYear: -1277,
    avatar: "images/figures/fig_pangen.jpg",
    bio: "商王陽甲之弟。商朝自仲丁以來九世之亂、王畿水患無常。盤庚力排王公貴族反對，毅然渡黃河遷都於殷（今河南安陽小屯）。作《盤庚》三篇曉諭臣民，從此商朝不再遷都，開啟燦爛殷商文明。",
    tags: ["盤庚遷殷", "殷墟", "九世之亂", "商朝中興"],
    relations: [
      { figureId: "shang_tang", relationType: "family", label: "恪遵祖訓 · 行成湯之德政" },
      { figureId: "wuding", relationType: "family", label: "姪武丁中興 · 奠安陽殷都之盛" },
      { figureId: "shang_zhouwang", relationType: "family", label: "殷商後嗣 · 紂王鹿台自焚亡殷" }
    ],
    participatedEventIds: ["evt_pangen_1300"]
  },
  {
    id: "wuding",
    name: "武丁 (商高宗)",
    pinyin: "Wǔ Dīng",
    title: "商朝第二十二代天子 · 武丁中興大帝",
    faction: "shang",
    birthYear: -1280,
    deathYear: -1218,
    avatar: "images/figures/fig_wuding.jpg",
    bio: "小乙之子。即位三年不言聽政，於傅岩尋得奴隸傅說拜為相國。任用王后婦好南征北戰，破鬼方、荊楚、巴方，商朝疆域大擴。開創甲骨占卜、青銅鼎盛之極盛盛世，廟號高宗。",
    tags: ["武丁盛世", "得傅說", "四方征伐", "殷墟青銅巔峰"],
    relations: [
      { figureId: "fuhao", relationType: "family", label: "賢妻統帥 · 婦好親征開疆數千里" },
      { figureId: "fuyue", relationType: "advisor", label: "傅岩聖相 · 夢得版築奴隸拜相" },
      { figureId: "pangen", relationType: "family", label: "叔父盤庚 · 承殷都基業創武丁中興" }
    ],
    participatedEventIds: ["evt_wuding_fuhao_1250"]
  },
  {
    id: "fuhao",
    name: "婦好",
    pinyin: "Fù Hǎo",
    title: "商高宗王后 · 華夏首位女統帥祭司",
    faction: "shang",
    birthYear: -1260,
    deathYear: -1210,
    avatar: "images/figures/fig_fuhao.jpg",
    bio: "商王武丁之妻。中國歷史上有確鑿文字記載的第一位傑出女性軍事家與大祭司。親統萬三千大軍討伐鬼方、羌方、巴方，設伏聚殲威震四方。安陽殷墟婦好墓出土大量司母辛鼎等重器。",
    tags: ["女統帥", "司母辛鼎", "平定鬼方", "伏擊巴方"],
    relations: [
      { figureId: "wuding", relationType: "family", label: "商高宗王后 · 統帥征討巴方羌方" },
      { figureId: "fuyue", relationType: "colleague", label: "同心輔政 · 武丁中興內外柱石" }
    ],
    participatedEventIds: ["evt_wuding_fuhao_1250"]
  },
  {
    id: "fuyue",
    name: "傅說",
    pinyin: "Fù Yuè",
    title: "武丁名相 · 版築奴隸拜為三公聖相",
    faction: "shang",
    birthYear: -1275,
    deathYear: -1215,
    avatar: "images/figures/fig_fuyue.jpg",
    bio: "原為傅岩之野築城服苦役之刑徒奴隸。商王武丁夜夢賢相，命圖畫求索四方，於傅岩得說，訪談深服其智，立拜為國相。傅說作《說命》三篇輔佐武丁整肅王綱，推動武丁中興盛世。",
    tags: ["版築拜相", "傅說舉於版築之間", "武丁中興", "說命"],
    relations: [
      { figureId: "wuding", relationType: "monarch-subject", label: "夢遇聖主 · 版築奴隸拜為國相" },
      { figureId: "fuhao", relationType: "colleague", label: "文武協同 · 傅說治政婦好拓土" }
    ],
    participatedEventIds: ["evt_wuding_fuhao_1250"]
  },
  {
    id: "shang_zhouwang",
    name: "帝辛 (商紂王)",
    pinyin: "Dì Xīn",
    title: "商朝末代天子 · 牧野自焚亡國之君",
    faction: "shang",
    birthYear: -1105,
    deathYear: -1046,
    avatar: "images/figures/fig_zhouwang.jpg",
    bio: "帝乙少子，名辛，世稱商紂王。資辨捷疾，才力兼人，手格猛獸。在位開拓江淮東夷，俘獲無算，但窮兵黷武、寵幸妲己、剖比干、囚姬昌、設炮烙，朝歌防務空虛。牧野之役兵潰，登鹿台自焚而亡。",
    tags: ["紂王自焚", "手格猛獸", "征伐東夷", "牧野之敗"],
    relations: [
      { figureId: "bigan", relationType: "family", label: "叔父忠諫 · 殘暴剖比干七竅心" },
      { figureId: "weiziqi", relationType: "family", label: "庶兄勸諫 · 微子抱祭器奔周" },
      { figureId: "zhou_wuwang", relationType: "rival", label: "牧野決戰 · 鹿台自焚身死國亡" },
      { figureId: "jiang_ziya", relationType: "rival", label: "周軍師尚父 · 白旄先登破商軍" },
      { figureId: "baosi", relationType: "rival", label: "後世並稱 · 殷紂周幽亡國之君" }
    ],
    participatedEventIds: ["evt_dixin_dongyi_1070", "evt_muye_1046"]
  },
  {
    id: "baosi",
    name: "褒姒",
    pinyin: "Bāo Sì",
    title: "周幽王王后 · 烽火戲諸侯傾國絕代",
    faction: "other",
    birthYear: -795,
    deathYear: -771,
    avatar: "images/figures/fig_baosi.jpg",
    bio: "褒國進獻之絕色美女。周幽王廢嫡后申后與太子宜臼，專寵褒姒立為后。褒姒生性不喜笑，幽王為博其一笑數次點燃驪山烽火戲弄諸侯。後犬戎破鎬京殺幽王，俘虜褒姒，西周隨之滅亡。",
    tags: ["烽火戲諸侯", "千金一笑", "褒姒", "犬戎破鎬"],
    relations: [
      { figureId: "zhou_youwang", relationType: "family", label: "幽王專寵 · 烽火戲諸侯千金一笑" },
      { figureId: "shenhou", relationType: "rival", label: "廢申后立褒姒 · 申侯引戎破鎬" },
      { figureId: "shang_zhouwang", relationType: "colleague", label: "妲己褒姒 · 後世同列亡國紅顏" }
    ],
    participatedEventIds: ["evt_youwang_qian_771"]
  },
  {
    id: "bigan",
    name: "比干",
    pinyin: "Bǐ Gān",
    title: "商朝宗室太師 · 剖心忠臣始祖",
    faction: "shang",
    birthYear: -1092,
    deathYear: -1047,
    avatar: "images/figures/fig_bigan.jpg",
    bio: "商王帝乙之弟、紂王叔父。官任少師，直言敢諫。見紂王荒淫殘虐，冒死進諫三日不去，紂王怒曰『吾聞聖人心有七竅』，命人剖胸取比干之心，天下震駭諸侯離心。",
    tags: ["比干剖心", "忠諫始祖", "商朝少師", "殷末三仁"],
    relations: [
      { figureId: "shang_zhouwang", relationType: "monarch-subject", label: "姪紂王暴虐 · 死諫被剖七竅心" },
      { figureId: "weiziqi", relationType: "family", label: "同列三仁 · 殷末微子比干箕子" },
      { figureId: "zhou_wuwang", relationType: "colleague", label: "克商表墓 · 武王封比干墓崇忠節" }
    ],
    participatedEventIds: ["evt_dixin_dongyi_1070", "evt_muye_1046"]
  },
  {
    id: "weiziqi",
    name: "微子啟",
    pinyin: "Wēi Zǐ Qǐ",
    title: "商朝宗室賢臣 · 宋國開國始祖",
    faction: "shang",
    birthYear: -1085,
    deathYear: -1025,
    avatar: "images/figures/fig_weiziqi.svg",
    bio: "商紂王庶兄。屢諫紂王無效，抱商朝祭祀宗廟禮器出走歸周。武王克商後封微子啟於商丘建立宋國，續殷商宗祀。孔子讚其為殷末三仁之一。",
    tags: ["殷末三仁", "宋國始祖", "微子抱祭器", "延殷之祀"],
    relations: [
      { figureId: "shang_zhouwang", relationType: "family", label: "同母庶兄 · 諫紂不從抱器出奔" },
      { figureId: "bigan", relationType: "family", label: "同列三仁 · 比干死諫微子存商祀" },
      { figureId: "zhou_wuwang", relationType: "monarch-subject", label: "武王克商 · 封微子於宋以存商祀" },
      { figureId: "zhougong_dan", relationType: "colleague", label: "東征平武庚 · 周公定宋國之封" }
    ],
    participatedEventIds: ["evt_muye_1046", "evt_zhougong_dongzheng_1042"]
  },

  // --- 西周人物 (Western Zhou Dynasty) ---
  {
    id: "zhou_wenwang",
    name: "周文王 (姬昌)",
    pinyin: "Zhōu Wénwáng",
    title: "西周奠基聖王 · 羑里推演周易",
    faction: "zhou",
    birthYear: -1152,
    deathYear: -1056,
    avatar: "images/figures/fig_wenwang.jpg",
    bio: "季歷之子，周武王與周公之父。在位五十年，篤行仁政，敬老慈幼，禮賢下士。被商紂王囚禁於羑里七年，於獄中推演伏羲八卦成六十四卦《周易》。獲釋後渭水訪得姜子牙，三分天下有其二。",
    tags: ["羑里演易", "文王訪賢", "三分天下有其二", "仁政化天下"],
    relations: [
      { figureId: "zhou_wuwang", relationType: "family", label: "次子武王 · 繼文王遺志克商定鼎" },
      { figureId: "zhougong_dan", relationType: "family", label: "四子周公 · 制禮作樂奠西周文華" },
      { figureId: "jiang_ziya", relationType: "advisor", label: "渭水訪賢 · 拜太公望為軍師太師" },
      { figureId: "shang_zhouwang", relationType: "rival", label: "羑里囚演周易 · 三分天下有其二" }
    ],
    participatedEventIds: ["evt_muye_1046"]
  },
  {
    id: "jiang_ziya",
    name: "姜子牙 (太公望/呂尚)",
    pinyin: "Jiāng Zǐyá",
    title: "西周軍師太師 · 齊國始祖兵家鼻祖",
    faction: "zhou",
    birthYear: -1128,
    deathYear: -1015,
    avatar: "images/figures/fig_jiangziya.jpg",
    bio: "姜姓，呂氏，名尚，字子牙。七十歲垂釣於渭水磻溪，周文王出獵得之，大喜曰『吾太公望子久矣』，號太公望。輔武王牧野誓師大敗商紂王，首封於齊國營丘，奠定齊國通工商魚鹽數百年霸業基礎，被尊為兵家鼻祖。",
    tags: ["太公釣魚", "百家宗師", "齊國始祖", "牧野之師"],
    relations: [
      { figureId: "zhou_wenwang", relationType: "monarch-subject", label: "渭水垂釣 · 文王親拉車拜為太師" },
      { figureId: "zhou_wuwang", relationType: "monarch-subject", label: "牧野前鋒 · 持白旄黃鉞破商十七萬" },
      { figureId: "zhougong_dan", relationType: "colleague", label: "同佐武王 · 首封姜尚於齊、周公於魯" },
      { figureId: "shang_zhouwang", relationType: "rival", label: "誓師牧野 · 督軍攻滅商紂鹿台" }
    ],
    participatedEventIds: ["evt_muye_1046", "evt_zhougong_dongzheng_1042"]
  },
  {
    id: "zhou_wuwang",
    name: "周武王 (姬發)",
    pinyin: "Zhōu Wǔwáng",
    title: "西周開國天子 · 牧野之戰克商定鼎",
    faction: "zhou",
    birthYear: -1087,
    deathYear: -1043,
    avatar: "images/figures/fig_wuwang.jpg",
    bio: "周文王次子。繼承文王未竟大業，會八百諸侯於孟津觀兵。前1046年率兵車三百乘直插牧野大敗商軍，紂王鹿台自焚。武王定都宗周鎬京，大封天下功臣宗親，開創八百年大周王朝。",
    tags: ["武王克商", "牧野之戰", "孟津觀兵", "西周立國"],
    relations: [
      { figureId: "zhou_wenwang", relationType: "family", label: "父文王聖德 · 奉九齡之志誓師東伐" },
      { figureId: "jiang_ziya", relationType: "advisor", label: "師尚父統帥 · 牧野決戰大破殷商" },
      { figureId: "zhougong_dan", relationType: "family", label: "親弟輔弼 · 武王崩託孤輔成王" },
      { figureId: "zhaogong_shi", relationType: "colleague", label: "同姓賢臣 · 陝東陝西分陝而治" },
      { figureId: "zhou_chengwang", relationType: "family", label: "成王幼沖 · 託周公召公輔政" },
      { figureId: "shang_zhouwang", relationType: "rival", label: "牧野大克商 · 斬紂梟首定周基" }
    ],
    participatedEventIds: ["evt_muye_1046"]
  },
  {
    id: "zhougong_dan",
    name: "周公旦",
    pinyin: "Zhōugōng Dàn",
    title: "西周攝政聖相 · 制禮作樂元聖始祖",
    faction: "zhou",
    birthYear: -1085,
    deathYear: -1010,
    avatar: "images/figures/fig_zhougong.jpg",
    bio: "武王四弟。武王崩成王幼，周公攝政當國。管蔡武庚作亂，周公親率六師東征三年平定叛亂。營建成周洛邑遷九鼎，大封七十一國，制禮作樂創立周禮宗法制度，孔子一生最崇敬之大聖人。",
    tags: ["周公東征", "營建洛邑", "制禮作樂", "元聖周公"],
    relations: [
      { figureId: "zhou_wuwang", relationType: "family", label: "兄武王克商 · 輔政創周公攝政之制" },
      { figureId: "zhou_chengwang", relationType: "family", label: "成王幼沖 · 攝政七年還政成王" },
      { figureId: "zhaogong_shi", relationType: "colleague", label: "陝東周公 · 陝西召公協同安天下" },
      { figureId: "jiang_ziya", relationType: "colleague", label: "齊魯相望 · 姜太公與周公奠封建大局" },
      { figureId: "boqin", relationType: "family", label: "長子伯禽 · 代父就封曲阜開魯國" },
      { figureId: "shuyu_jin", relationType: "family", label: "姪唐叔虞 · 剪桐封弟於唐（晉）" }
    ],
    participatedEventIds: ["evt_muye_1046", "evt_zhougong_dongzheng_1042", "evt_yingjian_luoyi_1038"]
  },
  {
    id: "zhaogong_shi",
    name: "召公奭",
    pinyin: "Zhào Gōng Shì",
    title: "西周太保 · 北燕始祖甘棠遺愛",
    faction: "zhou",
    birthYear: -1082,
    deathYear: -1005,
    avatar: "images/figures/fig_zhaogong.jpg",
    bio: "周同姓宗室。從武王伐紂，封於北燕（薊城）。與周公分陝而治：陝以東周公主之，陝以西召公主之。決獄於甘棠樹下不勞民，百姓感戴作《甘棠》詩相傳千古。輔成王、康王三代，為西周重臣基石。",
    tags: ["甘棠遺愛", "燕國始祖", "分陝而治", "相宅成周"],
    relations: [
      { figureId: "zhougong_dan", relationType: "colleague", label: "分陝而治 · 周召同心營造成周洛邑" },
      { figureId: "zhou_wuwang", relationType: "monarch-subject", label: "宗室太保 · 首封召公於北燕薊城" },
      { figureId: "zhou_chengwang", relationType: "monarch-subject", label: "三朝元老 · 輔弼成康天下晏然" },
      { figureId: "zhou_kangwang", relationType: "monarch-subject", label: "豐宮之會 · 召公作誥訓諸侯守藩" },
      { figureId: "zhaomugong_hu", relationType: "family", label: "召康公後裔 · 召穆公中興西周" }
    ],
    participatedEventIds: ["evt_zhougong_dongzheng_1042", "evt_yingjian_luoyi_1038", "evt_chengkang_1000"]
  },
  {
    id: "zhou_chengwang",
    name: "周成王 (姬誦)",
    pinyin: "Zhōu Chéngwáng",
    title: "西周第二代天子 · 成康之治守成聖主",
    faction: "zhou",
    birthYear: -1055,
    deathYear: -1021,
    avatar: "images/figures/fig_chengwang.jpg",
    bio: "武王之子。幼年即位，周公攝政輔佐。及長親政，營造成周洛邑，平定東夷叛亂。與其子康王統治期間，四海順服，社會安定，天下四十年刑錯不用，開創「成康之治」黃金時代。",
    tags: ["成康之治", "剪桐封弟", "成周洛邑", "周公歸政"],
    relations: [
      { figureId: "zhougong_dan", relationType: "monarch-subject", label: "周公攝政 · 訓誡成王七年歸政" },
      { figureId: "zhou_wuwang", relationType: "family", label: "武王嫡子 · 繼統宗周基業" },
      { figureId: "shuyu_jin", relationType: "family", label: "同母親弟 · 剪桐封弟於唐建晉基" },
      { figureId: "zhou_kangwang", relationType: "family", label: "成康父子 · 開創四十年刑錯不用盛世" }
    ],
    participatedEventIds: ["evt_zhougong_dongzheng_1042", "evt_yingjian_luoyi_1038", "evt_chengkang_1000"]
  },
  {
    id: "zhou_kangwang",
    name: "周康王 (姬釗)",
    pinyin: "Zhōu Kāngwáng",
    title: "西周第三代天子 · 刑錯不用盛世之主",
    faction: "zhou",
    birthYear: -1040,
    deathYear: -996,
    avatar: "images/figures/fig_kangwang.jpg",
    bio: "成王之子。承成王安寧之業，大會諸侯於豐宮，作《康王之誥》。在位期間海內平定，監獄空虛，天下四十年不用刑罰，西周國力達於全盛。",
    tags: ["成康盛世", "刑錯不用", "豐宮會盟", "宗周鼎盛"],
    relations: [
      { figureId: "zhou_chengwang", relationType: "family", label: "成康之治 · 承父大治天下晏然" },
      { figureId: "zhaogong_shi", relationType: "monarch-subject", label: "太保輔佐 · 豐宮大會諸侯作誥" },
      { figureId: "zhou_zhaowang", relationType: "family", label: "子昭王立 · 宗周由極盛轉衰" }
    ],
    participatedEventIds: ["evt_chengkang_1000"]
  },
  {
    id: "boqin",
    name: "伯禽",
    pinyin: "Bó Qín",
    title: "周公長子 · 魯國開國之君",
    faction: "feudal",
    birthYear: -1050,
    deathYear: -998,
    avatar: "images/figures/fig_boqin.svg",
    bio: "周公旦長子，首任魯公。周公因攝政留朝，命伯禽代周公就封於曲阜。伯禽三年而報政，尊周禮、崇儒化，奠定齊魯大地「禮儀之邦」深厚底蘊。",
    tags: ["魯國開國", "曲阜建邦", "三年報政", "禮儀之邦"],
    relations: [
      { figureId: "zhougong_dan", relationType: "family", label: "周公長子 · 代父赴曲阜就封魯國" },
      { figureId: "zhou_chengwang", relationType: "monarch-subject", label: "堂兄弟君臣 · 魯公三年報政崇周禮" },
      { figureId: "shuyu_jin", relationType: "family", label: "堂兄弟 · 魯晉同為姬姓首重封國" }
    ],
    participatedEventIds: ["evt_zhougong_dongzheng_1042", "evt_yingjian_luoyi_1038"]
  },
  {
    id: "shuyu_jin",
    name: "唐叔虞",
    pinyin: "Táng Shū Yú",
    title: "周成王之弟 · 晉國開國始祖",
    faction: "feudal",
    birthYear: -1052,
    deathYear: -1000,
    avatar: "images/figures/fig_shuyu.svg",
    bio: "周武王子、成王同母弟。幼時成王與之戲，削桐葉為珪封叔虞，史官請行封禮，成王封叔虞於唐地（山西太原一帶）。叔虞立國勤於民政，其子燮父改國號為晉。",
    tags: ["剪桐封弟", "晉國始祖", "唐叔虞", "三晉源起"],
    relations: [
      { figureId: "zhou_chengwang", relationType: "family", label: "成王同母弟 · 剪桐封弟首封於唐" },
      { figureId: "zhougong_dan", relationType: "family", label: "王叔周公 · 指導分封官典法度" },
      { figureId: "boqin", relationType: "family", label: "堂兄弟 · 晉魯同源屏藩宗周" }
    ],
    participatedEventIds: ["evt_yingjian_luoyi_1038", "evt_chengkang_1000"]
  },
  {
    id: "zhou_zhaowang",
    name: "周昭王 (姬瑕)",
    pinyin: "Zhōu Zhāowáng",
    title: "西周第四代天子 · 南征喪師漢水",
    faction: "zhou",
    birthYear: -1015,
    deathYear: -977,
    avatar: "images/figures/fig_zhaowang.jpg",
    bio: "康王之子。好巡行戰伐，親率宗周六師主力大舉南征荊楚。渡漢水時江心船解全軍淹沒，昭王殞命於漢江之濱，西周宗周精銳六師盡喪，王畿自此由盛轉衰。",
    tags: ["昭王南征", "殞命漢水", "喪六師", "國勢衰微"],
    relations: [
      { figureId: "zhou_kangwang", relationType: "family", label: "康王之子 · 好大喜功喪六師漢水" },
      { figureId: "zhou_muwang", relationType: "family", label: "子穆王立 · 馳八駿巡行西征安天下" }
    ],
    participatedEventIds: ["evt_zhaowang_nanzheng_977"]
  },
  {
    id: "zhou_muwang",
    name: "周穆王 (姬滿)",
    pinyin: "Zhōu Mùwáng",
    title: "西周第五代天子 · 巡行萬里穆天子",
    faction: "zhou",
    birthYear: -992,
    deathYear: -922,
    avatar: "images/figures/fig_muwang.jpg",
    bio: "昭王之子。在位五十五年，駕八駿之駟巡行天下西征昆侖瑤池見西王母。平徐偃王東南之亂，作《呂刑》定五刑三千條以正法度，是西周史上極富傳奇色彩之雄主。",
    tags: ["穆天子", "八駿西巡", "西王母", "平徐偃王", "呂刑"],
    relations: [
      { figureId: "zhou_zhaowang", relationType: "family", label: "昭王歿漢水 · 穆王即位力圖振作" },
      { figureId: "zhou_liwang", relationType: "family", label: "後世宗室 · 西周由盛轉弱" }
    ],
    participatedEventIds: ["evt_muwang_xizheng_960"]
  },
  {
    id: "zhou_liwang",
    name: "周厲王 (姬胡)",
    pinyin: "Zhōu Lìwáng",
    title: "西周第十代天子 · 專利失國出奔",
    faction: "zhou",
    birthYear: -878,
    deathYear: -828,
    avatar: "images/figures/fig_liwang.jpg",
    bio: "夷王之子。好專利斂財，任榮夷公專擅山林川澤，任衛巫謗監天下民言，致使路人以目莫敢言。西元前841年鎬京國人暴動破宮，厲王出奔流亡於彘十四年而死。",
    tags: ["專利斂財", "防民之口", "國人暴動", "流放於彘"],
    relations: [
      { figureId: "zhaomugong_hu", relationType: "monarch-subject", label: "召公諫防民之口 · 厲王不聽出奔於彘" },
      { figureId: "zhou_xuanwang", relationType: "family", label: "子宣王中興 · 召穆公以子代死救宣王" },
      { figureId: "zhou_muwang", relationType: "family", label: "穆王後嗣 · 專利斂財國人暴動失位" }
    ],
    participatedEventIds: ["evt_guoren_baodong_841"]
  },
  {
    id: "zhaomugong_hu",
    name: "召穆公 (召伯虎)",
    pinyin: "Zhào Mùgōng",
    title: "西周名相名將 · 共和行政中興柱石",
    faction: "zhou",
    birthYear: -870,
    deathYear: -810,
    avatar: "images/figures/fig_zhaomugong.svg",
    bio: "召康公後裔。國人暴動時以己子代死救周宣王姬靜。厲王奔彘後，與周定公共同主持「共和行政」十四載。宣王即位後領大軍南征淮夷大獲全勝，作《江漢》歌功。",
    tags: ["共和行政", "以子代死", "南征淮夷", "中興柱石"],
    relations: [
      { figureId: "zhou_liwang", relationType: "monarch-subject", label: "苦諫防民之口甚於防川 · 厲王出奔" },
      { figureId: "zhou_xuanwang", relationType: "monarch-subject", label: "以己子代死護宣王 · 共和扶宣王即位" },
      { figureId: "yin_jifu", relationType: "colleague", label: "文武同殿 · 召穆公平淮夷尹吉甫伐獫狁" },
      { figureId: "zhaogong_shi", relationType: "family", label: "召康公後裔 · 承家風輔弼中興" }
    ],
    participatedEventIds: ["evt_guoren_baodong_841", "evt_xuanwang_zhongxing_825"]
  },
  {
    id: "zhou_xuanwang",
    name: "周宣王 (姬靜)",
    pinyin: "Zhōu Xuānwáng",
    title: "西周第十一代天子 · 宣王中興雄主",
    faction: "zhou",
    birthYear: -845,
    deathYear: -782,
    avatar: "images/figures/fig_xuanwang.jpg",
    bio: "厲王之子。共和十四年即位，任用尹吉甫、召穆公等賢相名將，整飭政風，北伐獫狁、南平淮夷，重整宗周天下威望。晚年千畝之戰大敗於姜戎，失南國之師。",
    tags: ["宣王中興", "北伐獫狁", "中興之治", "千畝之戰"],
    relations: [
      { figureId: "zhou_liwang", relationType: "family", label: "父厲王失國 · 宣王中興重振周室威望" },
      { figureId: "zhaomugong_hu", relationType: "advisor", label: "代死救主之恩公 · 宣王中興股肱大臣" },
      { figureId: "yin_jifu", relationType: "advisor", label: "拜為太師 · 率大軍北伐獫狁大捷於焦獲" },
      { figureId: "zhou_youwang", relationType: "family", label: "子幽王昏暴 · 烽火戲諸侯斷送西周" }
    ],
    participatedEventIds: ["evt_guoren_baodong_841", "evt_xuanwang_zhongxing_825"]
  },
  {
    id: "yin_jifu",
    name: "尹吉甫",
    pinyin: "Yǐn Jífǔ",
    title: "周宣王太師 · 文武雙全伐獫狁名將",
    faction: "zhou",
    birthYear: -850,
    deathYear: -790,
    avatar: "images/figures/fig_yinjifu.svg",
    bio: "周宣王大師。文通詩禮、武定邊疆，率宗周大軍北伐獫狁大捷於焦獲，平淮夷。相傳《詩經·大雅·烝民》與《崧高》等篇皆為吉甫所作，主持編採周室詩歌典籍。",
    tags: ["尹吉甫北伐", "文武雙全", "詩經作者", "兮甲盤"],
    relations: [
      { figureId: "zhou_xuanwang", relationType: "monarch-subject", label: "太師大將 · 奉宣王命北伐獫狁作詩經" },
      { figureId: "zhaomugong_hu", relationType: "colleague", label: "宣王中興雙壁 · 南平淮夷北拒獫狁" }
    ],
    participatedEventIds: ["evt_xuanwang_zhongxing_825"]
  },
  {
    id: "zhou_youwang",
    name: "周幽王 (姬宮湦)",
    pinyin: "Zhōu Yōuwáng",
    title: "西周末代天子 · 驪山烽火亡國之君",
    faction: "other",
    birthYear: -795,
    deathYear: -771,
    avatar: "images/figures/fig_youwang.jpg",
    bio: "宣王之子。昏庸暴虐，寵愛褒姒，烽火戲諸侯。廢正妻申后與太子宜臼，改立褒姒子伯服。申侯怒引犬戎攻陷鎬京，幽王死於驪山腳下，西周自此滅亡，平王東遷。",
    tags: ["烽火戲諸侯", "幽王之死", "西周覆滅", "驪山之難"],
    relations: [
      { figureId: "zhou_xuanwang", relationType: "family", label: "宣王之子 · 昏聵無道喪盡中興盛業" },
      { figureId: "baosi", relationType: "family", label: "千金買笑 · 烽火戲諸侯驪山死所" },
      { figureId: "shenhou", relationType: "rival", label: "廢申后太子 · 岳父申侯引犬戎破鎬京" }
    ],
    participatedEventIds: ["evt_youwang_qian_771"]
  },
  {
    id: "shenhou",
    name: "申侯",
    pinyin: "Shēn Hóu",
    title: "申國國君 · 引犬戎滅西周之諸侯",
    faction: "feudal",
    birthYear: -810,
    deathYear: -760,
    avatar: "images/figures/fig_shenhou.svg",
    bio: "姜姓申國之君，周幽王之岳父。因幽王廢申后與太子宜臼立褒姒，申侯大怒聯合繒國與西北犬戎攻破宗周鎬京，弒周幽王。後聯絡晉、鄭、秦諸侯擁立平王東遷洛邑。",
    tags: ["引犬戎破鎬", "申后之父", "立周平王", "平王東遷"],
    relations: [
      { figureId: "zhou_youwang", relationType: "rival", label: "幽王廢嫡立庶 · 引犬戎攻入鎬京殺幽王" },
      { figureId: "baosi", relationType: "rival", label: "幽王專寵褒姒 · 申后見廢起兵報復" },
      { figureId: "zhou_xuanwang", relationType: "monarch-subject", label: "宣王重臣 · 宣王將王妹申后嫁幽王" }
    ],
    participatedEventIds: ["evt_youwang_qian_771"]
  }
];
