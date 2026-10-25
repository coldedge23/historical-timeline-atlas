// Historical Events of Xia, Shang, and Western Zhou Dynasties (c. 2070 BCE - 771 BCE)
// With SVG Geographic Marching Routes, Coordinates & Cross-linking
export const XIA_SHANG_ZHOU_EVENTS = [
  {
    id: "evt_yutushan_2070",
    title: "大禹塗山大會諸侯：治水定九州，夏朝立國肇基",
    year: -2070,
    yearDisplay: "約前 2070 年",
    eraName: "夏 禹元年",
    faction: "xia",
    category: "political",
    svgPos: [520, 375],
    summary: "大禹繼承父鯀之業，勞身焦思十三年過家門而不入，導淮疏九河平息華夏特大水患。禹大會天下諸侯於塗山，執玉帛者萬國。隨後定貢賦、鑄九鼎象徵九州，奠定夏朝天下共主基業。",
    detail: "大禹治水成功後，舜賜禹玄圭宣告水患平定。禹登天子位後，於塗山（今安徽蚌埠懷遠境內淮河之濱）大會諸侯，各邦執玉帛受封。禹又收天下之金鑄為九鼎，將各州神靈怪異之物繪製於鼎上，開創夏朝世襲共主政治之先聲。",
    locationNameAncient: "塗山 / 陽城",
    locationNameModern: "安徽省蚌埠市塗山 / 河南省登封市告成鎮",
    coordinates: [32.93, 117.38],
    figureIds: ["yu", "yi"],
    tags: ["大禹治水", "塗山之會", "劃定九州", "夏朝肇基"],
    routes: [
      {
        from: "陽城（河南登封）",
        to: "塗山（安徽蚌埠）",
        label: "大禹巡幸淮水大會諸侯",
        color: "#d97706",
        dashed: false,
        path: "M 488,335 Q 505,355 520,375"
      }
    ]
  },
  {
    id: "evt_qigan_2050",
    title: "夏啟甘之戰滅有扈氏：破除禪讓，開創四千年「家天下」世襲制",
    year: -2050,
    yearDisplay: "約前 2050 年",
    eraName: "夏 啟元年",
    faction: "xia",
    category: "military",
    svgPos: [465, 335],
    summary: "大禹崩，益讓位於啟，諸侯皆朝拜夏啟。有扈氏不服，認為啟背叛五帝禪讓古制而叛。夏啟誓師作《甘誓》，親率六軍與有扈氏大戰於甘，一舉滅有扈氏，世襲「家天下」自此確立。",
    detail: "《史記·夏本紀》載：啟即天子位，有扈氏不服，啟伐之，大戰於甘。將戰，啟作《甘誓》，訓令六軍將士『威侮五行，怠棄三正，天用剿絕其命』。夏王師大敗有扈氏，將其族眾籍沒為牧奴。從此宗法世襲完全取代禪讓制，成為華夏正統法度。",
    locationNameAncient: "甘地（關中戶縣）",
    locationNameModern: "陝西省西安市鄠邑區（戶縣）",
    coordinates: [34.11, 108.62],
    figureIds: ["qi_xia"],
    tags: ["甘之戰", "甘誓", "家天下", "世襲制確立"],
    battleId: "battle_gan_2050",
    routes: [
      {
        from: "夏邑（洛陽盆地）",
        to: "甘地（戶縣）",
        label: "夏啟六軍西征討伐有扈氏",
        color: "#dc2626",
        dashed: false,
        path: "M 488,332 Q 475,334 465,335"
      }
    ]
  },
  {
    id: "evt_taikang_2000",
    title: "太康失國與后羿代夏：有窮氏入斟鄩，夏后氏王室中衰",
    year: -2000,
    yearDisplay: "約前 2000 年",
    eraName: "夏 太康三年",
    faction: "tribal",
    category: "political",
    svgPos: [495, 328],
    summary: "夏啟崩，子太康繼位，荒淫無度，離宮前往洛水以南畋獵百日不歸。東夷有窮氏首領后羿善射，乘國人怨恨起兵奪取國都斟鄩，阻斷太康歸路。太康流亡洛北，后羿攝掌夏政。",
    detail: "太康畋獵百日不返，有窮后羿因民弗忍，距於河。太康五位弟姪作《五子之歌》述大禹訓誡，哀怨而泣。后羿立太康弟仲康為傀儡，隨後寒浞殺后羿自立，夏王室顛沛流離近百年。",
    locationNameAncient: "斟鄩（洛水南）",
    locationNameModern: "河南省洛陽市偃師二里頭遺址",
    coordinates: [34.70, 112.69],
    figureIds: ["houyi_dongyi"],
    tags: ["太康失國", "后羿代夏", "東夷入主", "二里頭"],
    routes: [
      {
        from: "有窮氏（山東德州）",
        to: "斟鄩（河南偃師）",
        label: "后羿西襲夏都斟鄩",
        color: "#9333ea",
        dashed: true,
        path: "M 535,285 Q 515,310 495,328"
      }
    ]
  },
  {
    id: "evt_shaokang_1950",
    title: "少康中興克復夏室：有虞有仍聚眾雪恥，誅寒浞復辟大夏",
    year: -1950,
    yearDisplay: "約前 1950 年",
    eraName: "夏 少康元年",
    faction: "xia",
    category: "military",
    svgPos: [500, 330],
    summary: "相之遺腹子少康寄身有仍氏為牧正，又奔有虞氏得綸邑田一成、眾一旅。少康勵精圖治，聯絡靡大臣與斟尋舊部，起兵誅殺寒浞及其二子過、戈，復辟夏后氏江山，史稱「少康中興」。",
    detail: "《左傳》哀公元年伍子胥論少康中興：少康有田一成（十里平方）、有眾一旅（五百人），能布其德而兆其謀，以收夏眾，撫其官職。靡自鬲收二斟之燼以伐浞滅之，立少康。夏朝自此轉危為安，延續數百年宗脈。",
    locationNameAncient: "綸邑至斟鄩",
    locationNameModern: "河南省商丘市虞城縣至洛陽偃師",
    coordinates: [34.42, 115.86],
    figureIds: ["shaokang"],
    tags: ["少康中興", "復辟夏室", "滅寒浞", "一成一旅"],
    routes: [
      {
        from: "綸邑（商丘虞城）",
        to: "斟鄩（洛陽偃師）",
        label: "少康中興克復夏都進軍路線",
        color: "#d97706",
        dashed: false,
        path: "M 525,338 Q 512,333 495,328"
      }
    ]
  },
  {
    id: "evt_mingtiao_1600",
    title: "商湯鳴條之戰滅夏：伊尹仲虺輔天子，殷商革命天下歸一",
    year: -1600,
    yearDisplay: "約前 1600 年",
    eraName: "商 湯元年",
    faction: "shang",
    category: "military",
    svgPos: [475, 342],
    summary: "夏桀暴虐荒淫、民不堪命，商部落首領湯任用賢相伊尹、仲虺，十一征而無敵於天下。商軍與夏桀主力大決戰於鳴條，夏軍潰敗，桀奔南巢而死。商湯建都於亳，建立大商帝國。",
    detail: "商湯出兵前作《湯誓》誓師：『格爾眾庶，悉聽朕言，非台小子敢行稱亂，有夏多罪，天命殛之！』兩軍在鳴條（今山西運城安邑一帶）展開大會戰，夏軍雷雨中潰散，商湯追擒夏桀於南巢，結束夏朝四百餘年統治，史稱『商湯革命』。",
    locationNameAncient: "鳴條至亳都",
    locationNameModern: "山西省運城市夏縣 / 河南省商丘或鄭州商城",
    coordinates: [35.14, 111.22],
    figureIds: ["shang_tang", "yiyin", "xia_jie"],
    tags: ["鳴條之戰", "商湯革命", "伊尹拜相", "商朝建立"],
    battleId: "battle_mingtiao_1600",
    routes: [
      {
        from: "亳都（商丘/鄭州）",
        to: "鳴條（山西運城）",
        label: "商湯伐夏大軍進擊動線",
        color: "#dc2626",
        dashed: false,
        path: "M 515,340 Q 495,338 475,342"
      }
    ]
  },
  {
    id: "evt_taijia_1550",
    title: "伊尹放太甲於桐宮：阿衡訓王悔過反善，華夏首開王道監察制",
    year: -1550,
    yearDisplay: "約前 1550 年",
    eraName: "商 太甲三年",
    faction: "shang",
    category: "political",
    svgPos: [502, 335],
    summary: "成湯崩，太甲即位，暴虐不法，敗亂成湯之法度。元老阿衡伊尹諫之不聽，毅然將太甲放逐於成湯墓地桐宮思過。太甲在桐宮三年悔過自新，伊尹率百官迎太甲歸亳親授國政，四海昇平。",
    detail: "《尚書·太甲》三篇記載太甲居桐宮三年，習湯之訓典，知過修德。伊尹親戴冕弁，奉成湯冠劍以迎太甲。太甲稽首謝罪曰：『天作孽，猶可違；自作孽，不可逭。』太甲自此勤政愛民，諸侯賓服，商朝天下大安。",
    locationNameAncient: "桐宮（偃師商丘一帶）",
    locationNameModern: "河南省洛陽市偃師區城關鎮",
    coordinates: [34.68, 112.79],
    figureIds: ["yiyin"],
    tags: ["伊尹放太甲", "桐宮悔過", "阿衡攝政", "修德安民"],
    routes: [
      {
        from: "國都亳（鄭州）",
        to: "桐宮（偃師）",
        label: "太甲居桐宮思過三年歸位",
        color: "#eab308",
        dashed: true,
        path: "M 505,338 Q 498,335 492,332"
      }
    ]
  },
  {
    id: "evt_pangen_1300",
    title: "盤庚力排眾議遷都於殷：渡黃河定基業，安陽殷墟燦爛青銅文明開端",
    year: -1300,
    yearDisplay: "約前 1300 年",
    eraName: "商 盤庚十四年",
    faction: "shang",
    category: "political",
    svgPos: [508, 305],
    summary: "自仲丁以來商室九世之亂、王畿水患連年。商王盤庚為擺脫宗室紛爭與災變，力排王公貴族阻撓，毅然率全體臣民北渡黃河遷都於殷（今河南安陽小屯）。自此商朝不再遷都，殷墟成為華夏青銅巔峰聖地。",
    detail: "盤庚作《尚書·盤庚》三篇，告誡百官百姓：『若火之燎於原，不可向邇，其猶可撲滅？今爾不敬，罔知吉凶。』遷殷後，商王室行湯之政，四方咸服，商朝進入穩定昌盛的後半期，世稱『殷商』。",
    locationNameAncient: "奄都至殷邑",
    locationNameModern: "山東省曲阜市至河南省安陽市殷墟",
    coordinates: [36.12, 114.32],
    figureIds: ["pangen"],
    tags: ["盤庚遷殷", "殷墟", "青銅全盛", "定都安陽"],
    routes: [
      {
        from: "奄都（山東曲阜）",
        to: "殷墟（河南安陽）",
        label: "盤庚率軍民北渡黃河遷殷",
        color: "#d97706",
        dashed: false,
        path: "M 545,322 Q 525,310 508,305"
      }
    ]
  },
  {
    id: "evt_wuding_fuhao_1250",
    title: "高宗武丁得賢相傅說、王后婦好四方征伐：武丁中興威震八荒",
    year: -1250,
    yearDisplay: "約前 1250 年",
    eraName: "商 武丁二十年",
    faction: "shang",
    category: "military",
    svgPos: [508, 305],
    summary: "商高宗武丁三年不言聽政，於傅岩之野得奴隸聖相傅說，拜為相國。武丁與王后婦好勵精圖治，婦好親率萬三千精兵平定巴方、羌方、鬼方，俘獲無算，商朝版圖大舉擴張，達到殷商極盛時期。",
    detail: "安陽殷墟婦好墓出土大量青銅鉞、禮器與玉器。甲骨文卜辭數百條記載婦好征戰：『辛巳卜，登婦好三千，登旅萬，共萬三千人伐羌。』婦好是華夏有文字記載以來首位集統帥、祭司、政治家於一身的偉大女性。",
    locationNameAncient: "殷墟至西北羌方/南方巴方",
    locationNameModern: "河南省安陽市殷墟遺址",
    coordinates: [36.12, 114.32],
    figureIds: ["wuding", "fuhao", "fuyue"],
    tags: ["武丁中興", "婦好征伐", "傅說拜相", "殷墟甲骨"],
    battleId: "battle_fuhao_bafang_1250",
    routes: [
      {
        from: "殷墟（安陽）",
        to: "羌方/鬼方（山西/陝西北部）",
        label: "婦好統帥萬三千大軍北征鬼方",
        color: "#dc2626",
        dashed: false,
        path: "M 508,305 Q 480,270 455,260"
      },
      {
        from: "殷墟（安陽）",
        to: "巴方（漢水流域）",
        label: "武丁婦好設伏夾擊巴方部隊",
        color: "#2563eb",
        dashed: true,
        path: "M 508,305 Q 495,355 480,380"
      }
    ]
  },
  {
    id: "evt_dixin_dongyi_1070",
    title: "商紂帝辛東征百克、大平淮夷：中原空虛引發西周反噬",
    year: -1070,
    yearDisplay: "約前 1070 年",
    eraName: "商 帝辛三十年",
    faction: "shang",
    category: "military",
    svgPos: [515, 312],
    summary: "商王帝辛（紂王）資質兼人，手格猛獸。帝辛傾全國精銳主力南征江淮東夷、人方，百戰皆捷，俘獲億兆玉帛象齒，但也致使殷畿宿衛極度空虛，為西方周部族起兵提供了千載難逢之良機。",
    detail: "《左傳》昭公四年載：『紂克東夷而隕其身。』帝辛傾國力於東南方征討，東南雖服，但商軍主力久戍江淮難以北歸。此時西岐姬發聯絡西南庸、蜀、羌、髳、微、盧、彭、濮八國，乘虛東進發動滅商決戰。",
    locationNameAncient: "朝歌至淮水人方",
    locationNameModern: "河南省淇縣朝歌 / 淮河中下游",
    coordinates: [35.61, 114.20],
    figureIds: ["shang_zhouwang"],
    tags: ["帝辛伐東夷", "朝歌空虛", "商周交替", "牧野前夕"],
    routes: [
      {
        from: "朝歌（河南淇縣）",
        to: "江淮東夷（安徽江蘇）",
        label: "商紂王精銳主力南征東夷動線",
        color: "#9333ea",
        dashed: false,
        path: "M 515,312 Q 535,360 550,390"
      }
    ]
  },
  {
    id: "evt_muye_1046",
    title: "周武王牧野之戰克商：八百諸侯孟津會，紂王鹿台自焚西周立國",
    year: -1046,
    yearDisplay: "前 1046 年",
    eraName: "周 武王元年",
    faction: "zhou",
    category: "military",
    svgPos: [510, 318],
    summary: "周武王率戰車三百乘、虎賁三千人、甲士四萬五千人，聯絡西南諸國大軍東出孟津。兩軍決戰於朝歌近郊牧野，商軍奴隸前鋒倒戈，商軍崩潰。紂王退保鹿台自焚而死，西周正式取代殷商入主中原。",
    detail: "拂曉時分，姜子牙手持白旄黃鉞領兵衝鋒，武王作《牧誓》誓師：『稱爾戈，比爾干，立爾矛，予其誓！』商軍十七萬臨陣倒戈引導周軍攻入朝歌。武王入朝歌斬紂王梟首，封微子啟以存商祀，定都鎬京，分封天下。",
    locationNameAncient: "孟津至牧野（新鄉朝歌間）",
    locationNameModern: "河南省新鄉市牧野區至淇縣朝歌",
    coordinates: [35.30, 113.88],
    figureIds: ["zhou_wuwang", "jiang_ziya", "shang_zhouwang"],
    tags: ["牧野之戰", "武王克商", "孟津之盟", "西周立國"],
    battleId: "battle_muye_1046",
    routes: [
      {
        from: "鎬京（西安）",
        to: "孟津渡口（洛陽孟津）",
        label: "武王伐紂大軍東出潼關渡黃河",
        color: "#d97706",
        dashed: false,
        path: "M 465,335 Q 480,332 492,328"
      },
      {
        from: "孟津渡口（河南孟津）",
        to: "牧野戰場（河南新鄉）",
        label: "周軍與八國聯軍疾馳牧野決戰",
        color: "#dc2626",
        dashed: false,
        path: "M 492,328 Q 502,322 510,318"
      }
    ]
  },
  {
    id: "evt_zhougong_dongzheng_1042",
    title: "周公旦踐奄攝政平三監之亂：三年東征滅武庚，奠定周天子萬世基業",
    year: -1042,
    yearDisplay: "前 1042 年",
    eraName: "周 成王二年 / 周公攝政",
    faction: "zhou",
    category: "military",
    svgPos: [520, 320],
    summary: "武王崩，成王年幼，周公旦代行天子攝政。管叔、蔡叔嫉恨周公，勾結紂王子武庚及東夷淮夷發動大叛亂。周公率宗周大軍東征歷時三年，誅武庚殺管叔流蔡叔，滅奄國淮夷，使天下大定。",
    detail: "周公作《大誥》動員大軍：『天降割于我家，弗克敉寧。』東征徹底清剿商朝殘餘勢力，平定山東半島東夷各部，收伏九夷。隨後周公於中原大分封姬姓與功臣子弟，建立成周洛邑監視東方，從根本上鞏固了西周大一統統治。",
    locationNameAncient: "宗周鎬京至奄邑、東夷",
    locationNameModern: "陝西西安至山東曲阜、河南商丘",
    coordinates: [35.58, 116.98],
    figureIds: ["zhougong_dan", "zhou_chengwang", "zhaogong_shi"],
    tags: ["三監之亂", "周公東征", "誅武庚", "平定奄國"],
    battleId: "battle_sanjian_1042",
    routes: [
      {
        from: "鎬京（西安）",
        to: "東夷奄國（山東曲阜）",
        label: "周公率宗周六師三年東征動線",
        color: "#2563eb",
        dashed: false,
        path: "M 465,335 Q 495,330 545,322"
      }
    ]
  },
  {
    id: "evt_yingjian_luoyi_1038",
    title: "周公召公營建東都成周洛邑：遷九鼎天下之中，制禮作樂分封天下",
    year: -1038,
    yearDisplay: "前 1038 年",
    eraName: "周 成王六年",
    faction: "zhou",
    category: "political",
    svgPos: [488, 332],
    summary: "周公與召公於洛水北岸卜築營造『成周洛邑』，遷九鼎於此，建明堂太廟，形成鎬京宗周與洛邑成周之東西雙都體系。周公進一步制定井田制、宗法嫡長子繼承制與吉凶賓軍嘉五禮，奠定三千年中華文明禮儀規範。",
    detail: "《尚書·洛誥》載召公相宅、周公復營。洛邑地處『天下之中，四方入貢道里均』，駐紮八師殷民精兵。周公制禮作樂，以郁郁乎文哉之周禮確立長幼尊卑、君臣父子倫理秩序，孔子嘆曰：『周監於二代，郁郁乎文哉！吾從周。』",
    locationNameAncient: "成周洛邑（王城與成周）",
    locationNameModern: "河南省洛陽市老城區 / 瀍河兩岸",
    coordinates: [34.62, 112.45],
    figureIds: ["zhougong_dan", "zhaogong_shi", "boqin"],
    tags: ["營建洛邑", "天下之中", "制禮作樂", "周禮"],
    routes: [
      {
        from: "宗周鎬京（西安）",
        to: "成周洛邑（洛陽）",
        label: "周公自鎬京遷九鼎定洛邑",
        color: "#d97706",
        dashed: false,
        path: "M 465,335 Q 476,333 488,332"
      }
    ]
  },
  {
    id: "evt_chengkang_1000",
    title: "成康之治天下晏然：四十年刑錯不用，西周宗法封建達於極盛",
    year: -1000,
    yearDisplay: "前 1000 年",
    eraName: "周 康王十二年",
    faction: "zhou",
    category: "political",
    svgPos: [465, 335],
    summary: "周成王即位臨政，周公歸政於成王。成王與其子周康王在位四十餘年，百姓和睦，諸侯順服，天下大治，刑錯四十餘年不用。西周禮樂文明、井田宗法封建制達於歷史頂峰，四海蠻夷莫不來朝。",
    detail: "《史記·周本紀》載：『成康之際，天下安寧，刑錯四十餘年不用。』康王曾於豐宮大會諸侯作《康王之誥》，召公、畢公輔弼天子，天下晏然。諸侯世守其土，屏藩周室，為後世儒家心目中之黃金時代。",
    locationNameAncient: "宗周鎬京與成周洛邑",
    locationNameModern: "陝西省西安市長安區 / 河南省洛陽市",
    coordinates: [34.25, 108.75],
    figureIds: ["zhou_chengwang", "zhou_kangwang", "zhaogong_shi"],
    tags: ["成康之治", "刑錯不用", "禮樂鼎盛", "天下晏然"],
    routes: [
      {
        from: "齊/魯/燕/晉諸侯國",
        to: "宗周鎬京（西安）",
        label: "天下諸侯朝覲宗周天子",
        color: "#16a34a",
        dashed: true,
        path: "M 545,310 Q 500,320 465,335"
      }
    ]
  },
  {
    id: "evt_zhaowang_nanzheng_977",
    title: "周昭王南征不復殞命漢水：宗周六師覆滅，西周國勢自此轉衰",
    year: -977,
    yearDisplay: "前 977 年",
    eraName: "周 昭王十九年",
    faction: "zhou",
    category: "military",
    svgPos: [480, 395],
    summary: "周昭王德衰，不修政德而好大喜功，親率宗周六師精銳大軍南征荊楚。昭王涉漢水，漢水流域蠻夷作膠船渡王師，船行江心解體，昭王溺死於漢水之中，宗周六師全軍覆滅，西周威望一蹶不振。",
    detail: "《竹書紀年》載：昭王十九年天大曀，雉兔皆震，喪六師於漢，王陟。昭王南征全軍覆沒，是西周立國以來最沉重軍事慘敗。自此楚國自帝遠漸不服周天子，西周對南方控制力急劇削弱，國勢走向下坡路。",
    locationNameAncient: "漢水之濱（湖北襄陽/宜城）",
    locationNameModern: "湖北省襄陽市 / 宜城市漢江流域",
    coordinates: [31.95, 112.15],
    figureIds: ["zhou_zhaowang"],
    tags: ["昭王南征", "殞命漢水", "喪六師", "西周轉衰"],
    battleId: "battle_zhaowang_chu_977",
    routes: [
      {
        from: "成周洛邑（洛陽）",
        to: "漢江之濱（湖北襄陽）",
        label: "周昭王宗周六師南征動線",
        color: "#dc2626",
        dashed: false,
        path: "M 488,332 Q 485,365 480,395"
      }
    ]
  },
  {
    id: "evt_muwang_xizheng_960",
    title: "周穆王巡行天下見西王母：西征犬戎東破徐偃王，作呂刑定五刑",
    year: -960,
    yearDisplay: "前 960 年",
    eraName: "周 穆王十七年",
    faction: "zhou",
    category: "diplomatic",
    svgPos: [350, 290],
    summary: "昭王崩，子穆王立，春秋五十五年。穆王好巡遊天下，駕八駿之駟西征萬里至昆侖之丘，會見西王母宴飲瑤池。東南徐偃王反，穆王一日千里命造父駕車還師，合楚平定徐國，又作《呂刑》定五刑三千條。",
    detail: "《穆天子傳》詳細記述穆王駕赤驥、盜驪、白義等八駿，造父為御，西征至西王母之邦，西王母作歌：『白雲在天，山陵自出，道里悠遠，山川間之。』穆王巡行極大拓展華夏與西北歐亞草原貿易通道，為絲綢之路最早先河。",
    locationNameAncient: "鎬京至昆侖瑤池 / 東南徐國",
    locationNameModern: "陝西西安至青海祁連/新疆天山 / 江蘇徐州",
    coordinates: [37.20, 101.50],
    figureIds: ["zhou_muwang"],
    tags: ["穆王西巡", "西王母", "造父御車", "平徐偃王", "呂刑"],
    routes: [
      {
        from: "宗周鎬京（西安）",
        to: "西域西王母之邦（青海/新疆）",
        label: "周穆王八駿西巡萬里動線",
        color: "#06b6d4",
        dashed: false,
        path: "M 465,335 Q 400,310 350,290"
      }
    ]
  },
  {
    id: "evt_guoren_baodong_841",
    title: "國人暴動圍攻宗周鎬京：逐周厲王出奔，召周二公「共和行政」始開中國確切紀年",
    year: -841,
    yearDisplay: "前 841 年",
    eraName: "周 共和元年",
    faction: "zhou",
    category: "political",
    svgPos: [465, 335],
    summary: "周厲王在位暴虐貪利，起用榮夷公推行「專利」霸佔山林川澤，任用衛巫監視平民，言者誅之，致使國人莫敢言道路以目。鎬京國人憤起暴動攻入王宮，厲王逃奔於彘。召穆公、周定公共同主持「共和行政」，此年為中國歷史確切紀年之起點。",
    detail: "召公諫厲王曰：『防民之口，甚於防川。川壅而潰，傷人必多，民亦如之。』厲王不聽，終遭國人暴動推翻。暴動中太子姬靜藏於召穆公宅，召公以己子代死救太子。召公與周公後裔協同執掌天子之柄十四年，號稱『共和』。司馬遷《史記·十二諸侯年表》從共和元年（西元前841年）起有連續精確年表記載。",
    locationNameAncient: "宗周鎬京與彘邑",
    locationNameModern: "陝西省西安市戶縣長安一帶 / 山西省霍州市",
    coordinates: [34.25, 108.75],
    figureIds: ["zhou_liwang", "zhaomugong_hu", "zhou_xuanwang"],
    tags: ["國人暴動", "防民之口", "共和行政", "確切紀年開端", "前841年"],
    battleId: "battle_guoren_841",
    routes: [
      {
        from: "宗周鎬京（西安）",
        to: "彘邑（山西霍州）",
        label: "周厲王遭國人逐逃奔彘邑",
        color: "#9333ea",
        dashed: true,
        path: "M 465,335 Q 475,300 482,280"
      }
    ]
  },
  {
    id: "evt_xuanwang_zhongxing_825",
    title: "周宣王任賢任能中興宗周：尹吉甫北伐獫狁，召穆公平淮夷四方咸服",
    year: -825,
    yearDisplay: "前 825 年",
    eraName: "周 宣王三年",
    faction: "zhou",
    category: "military",
    svgPos: [465, 335],
    summary: "共和十四年厲王死於彘，召公、周公擁立太子姬靜即位，是為周宣王。宣王勵精圖治，任用尹吉甫、召伯虎、方叔、仲山甫等賢良名將，整飭軍備北伐獫狁、南平淮夷，收復王畿失地，諸侯復尊天子，史稱「宣王中興」。",
    detail: "《詩經·小雅·出車》歌頌尹吉甫伐獫狁：『王命南仲，往城于方。出車彭彭，旂旐央央。』《江漢》歌頌召穆公伐淮夷南征。宣王時代宗周軍事實力再度崛起，諸侯咸來朝宗，成為西周王朝最後一次迴光返照的中興盛世。",
    locationNameAncient: "宗周鎬京至北疆焦獲 / 南疆淮漢",
    locationNameModern: "陝西西安至陝北/山西北部 / 江淮流域",
    coordinates: [34.25, 108.75],
    figureIds: ["zhou_xuanwang", "yin_jifu", "zhaomugong_hu"],
    tags: ["宣王中興", "尹吉甫北伐", "平淮夷", "詩經六月"],
    battleId: "battle_xianyun_823",
    routes: [
      {
        from: "宗周鎬京（西安）",
        to: "北疆焦獲（陝西北部）",
        label: "尹吉甫統率宗周大軍北伐獫狁",
        color: "#dc2626",
        dashed: false,
        path: "M 465,335 Q 460,285 455,255"
      },
      {
        from: "宗周鎬京（西安）",
        to: "江漢淮夷（安徽河南交界）",
        label: "召穆公南征淮夷大獲全勝",
        color: "#2563eb",
        dashed: false,
        path: "M 465,335 Q 495,360 520,375"
      }
    ]
  },
  {
    id: "evt_youwang_qian_771",
    title: "周幽王烽火戲諸侯，犬戎攻陷鎬京：幽王死驪山下，西周覆亡春秋大啟",
    year: -771,
    yearDisplay: "前 771 年",
    eraName: "周 幽王十一年",
    faction: "other",
    category: "military",
    svgPos: [470, 336],
    summary: "周幽王荒淫沉湎，寵幸褒姒，為博其一笑數次點燃驪山烽火戲弄諸侯。幽王廢正后申后與太子宜臼，改立褒姒子伯服。申侯大怒引犬戎與繒國攻破鎬京，幽王烽火無一諸侯來救，幽王弒於驪山下，西周滅亡。",
    detail: "《史記·周本紀》載：幽王烽火戲諸侯，諸侯悉至而無寇，褒姒乃大笑。幽王數數點燃，諸侯自是不信。及犬戎兵至，幽王擊鼓舉燧，諸侯兵皆不至。犬戎殺幽王於驪山之下，虜褒姒，盡取周室重器珍寶。晉文侯、鄭武公、秦襄公引兵擊退犬戎，立宜臼東遷洛邑，是為平王，西周王朝二百七十五年天下覆滅，春秋亂世大幕開啟。",
    locationNameAncient: "宗周鎬京與驪山",
    locationNameModern: "陝西省西安市臨潼區驪山 / 雁塔區長安一帶",
    coordinates: [34.36, 109.21],
    figureIds: ["zhou_youwang", "baosi", "shenhou"],
    tags: ["烽火戲諸侯", "犬戎陷鎬京", "幽王之死", "西周覆滅"],
    battleId: "battle_haojing_771",
    routes: [
      {
        from: "西北犬戎部落（甘肅慶陽/隴東）",
        to: "宗周鎬京（西安）",
        label: "犬戎與申侯引狼入室奔襲鎬京",
        color: "#dc2626",
        dashed: false,
        path: "M 430,295 Q 448,315 465,335"
      },
      {
        from: "宗周鎬京（西安）",
        to: "驪山山腳（臨潼驪山）",
        label: "周幽王奔逃驪山遭犬戎斬殺",
        color: "#9333ea",
        dashed: true,
        path: "M 465,335 Q 468,335 470,336"
      }
    ]
  }
];
