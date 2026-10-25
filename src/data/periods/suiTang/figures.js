// Figures Database for Sui, Tang and Five Dynasties (581 CE - 960 CE)
// Comprehensive coverage across Sui, Zhenguan, High Tang, An-Shi, Late Tang, and Five Dynasties

export const SUI_TANG_FIGURES = [
  // --- 1. 大隋帝國 ---
  {
    id: 'yang_jian',
    name: '楊堅 (隋文帝)',
    courtesyName: '那羅延',
    posthumousName: '文皇帝',
    birthDeathDisplay: '541年 - 604年',
    birthYear: 541,
    deathYear: 604,
    nativePlaceAncient: '弘農 華陰',
    nativePlaceModern: '陝西省渭南市華陰市',
    faction: 'sui',
    roles: ['大隋開國皇帝', '開皇之治締造者', '改革家'],
    avatar: 'images/figures/fig_yang_jian.jpg',
    bio: '北周外戚，隋朝開國皇帝。受北周靜帝禪讓建立大隋，西元589年發兵滅陳，終結華夏自西晉永嘉以來近三百年之南北分裂，重歸一統。在位期間推行開皇新政，廢除九品中正制首創三省六部與科舉體制，頒行《開皇律》，實施均田制、大索貌閱與輸籍定樣，設廣通渠與常平倉。在位二十四年天下大治，社會富庶，史稱「開皇之治」，被突厥尊為「聖人莫緣可汗」。',
    keyAchievements: [
      '滅陳統一南北，終結四百年分裂割據',
      '開創科舉取士制度與三省六部國家體制',
      '大索貌閱整飭戶籍，倉儲豐足天下殷實'
    ],
    famousQuotes: [
      '天下之重，非一人所能獨理。',
      '生我者父母，知我者叔德。'
    ],
    relations: [
      { figureId: 'yang_guang', relationType: 'family', label: '皇子 / 繼位者' },
      { figureId: 'dugu_qieluo', relationType: 'family', label: '結髮同心·開皇二聖' },
      { figureId: 'gao_jiong', relationType: 'monarch-subject', label: '開皇股肱賢相' },
      { figureId: 'yang_su', relationType: 'monarch-subject', label: '平陳開國元勳' }
    ]
  },
  {
    id: 'yang_guang',
    name: '楊廣 (隋煬帝)',
    courtesyName: '阿𡡉',
    posthumousName: '煬皇帝 / 明皇帝',
    birthDeathDisplay: '569年 - 618年',
    birthYear: 569,
    deathYear: 618,
    nativePlaceAncient: '弘農 華陰',
    nativePlaceModern: '陝西省渭南市華陰市',
    faction: 'sui',
    roles: ['隋朝第二代皇帝', '大運河開鑿者', '軍事家'],
    avatar: 'images/figures/fig_yang_guang.jpg',
    bio: '隋文帝次子。統軍南下滅陳有大功，即位後營建東都洛陽，下令開鑿貫通南北之大運河（通濟渠、永濟渠、江南運河），溝通五大水系，為後世千載南北經濟動脈奠定基礎；西巡張掖開拓絲綢之路，設西域三郡；正式確立進士科開創科舉制。然因三征高句麗勞民傷財，驕奢無度引發全國農民大起義與群雄割據，最終於江都兵變中為宇文化及所弒。',
    keyAchievements: [
      '開鑿大運河，貫通南北大動脈功在千秋',
      '營建東都洛陽與創設進士科科舉體制',
      '西巡張掖開拓西域，平定吐谷渾'
    ],
    famousQuotes: [
      '我性不喜人諫，若有名位欲諫以求名者，我必殺之！',
      '好頭顱，誰當斫之？'
    ],
    relations: [
      { figureId: 'yang_jian', relationType: 'family', label: '父皇' },
      { figureId: 'li_yuan', relationType: 'rival', label: '表親 / 叛反自立' },
      { figureId: 'yang_su', relationType: 'monarch-subject', label: '登基奪嫡謀臣' }
    ]
  },
  {
    id: 'yang_su',
    name: '楊素 (處道)',
    courtesyName: '處道',
    posthumousName: '楚景武公',
    birthDeathDisplay: '544年 - 606年',
    birthYear: 544,
    deathYear: 606,
    nativePlaceAncient: '弘農 華陰',
    nativePlaceModern: '陝西省渭南市華陰市',
    faction: 'sui',
    roles: ['隋朝尚書左僕射', '大將軍', '楚國公'],
    avatar: 'images/figures/fig_yang_su.svg',
    bio: '北周至隋代傑出軍事家、政治家。隋滅陳之戰任行軍元帥，督造五牙戰艦大破陳水軍於長江；平定江南叛亂、大破突厥達頭可汗於塞北。才兼文武，善作詩賦，然為人深險，協助楊廣奪嫡即位，官至司徒。',
    keyAchievements: [
      '督造五牙樓船水陸並進滅陳一統',
      '塞北大破達頭可汗揚威大漠'
    ],
    famousQuotes: ['破陣殺敵，顧盼生風！'],
    relations: [
      { figureId: 'yang_jian', relationType: 'monarch-subject', label: '開國君臣' },
      { figureId: 'yang_guang', relationType: 'monarch-subject', label: '翼贊登基' }
    ]
  },
  {
    id: 'gao_jiong',
    name: '高熲 (昭玄)',
    courtesyName: '昭玄',
    posthumousName: '齊國公',
    birthDeathDisplay: '541年 - 607年',
    birthYear: 541,
    deathYear: 607,
    nativePlaceAncient: '渤海 蓨縣',
    nativePlaceModern: '河北省衡水市景縣',
    faction: 'sui',
    roles: ['隋朝尚書左僕射', '宰相', '齊國公'],
    avatar: 'images/figures/fig_gao_jiong.svg',
    bio: '隋朝開皇盛世首要功臣。執政近二十年，主持制定《開皇律》，推行輸籍法，深悉朝政軍務，平定陳朝籌劃悉出其手。為官清慎，深得士民愛戴，後因反對廢太子楊勇被隋文帝疏遠，大業年間因諫煬帝見誅。',
    keyAchievements: [
      '主持制定《開皇律》，奠定隋唐法制基石',
      '總理平陳方略，維持開皇盛世二十年太平'
    ],
    famousQuotes: ['長江天然之阻，今雖有備，以我之眾，豈不能濟！'],
    relations: [
      { figureId: 'yang_jian', relationType: 'monarch-subject', label: '開皇柱石' }
    ]
  },
  {
    id: 'dugu_qieluo',
    name: '獨孤伽羅 (文獻皇后)',
    courtesyName: '伽羅',
    posthumousName: '文獻皇后',
    birthDeathDisplay: '544年 - 602年',
    birthYear: 544,
    deathYear: 602,
    nativePlaceAncient: '河南 洛陽',
    nativePlaceModern: '河南省洛陽市',
    faction: 'sui',
    roles: ['隋文帝皇后', '開皇二聖', '政治決策者'],
    avatar: 'images/figures/fig_dugu_qieluo.svg',
    bio: '北周大司馬獨孤信第七女。十四歲嫁楊堅，雅好讀書，識達今古，具非凡政治遠見。在楊堅代周建隋過程中力贊其斷行大計。文帝對其敬畏有加，宮中尊為「二聖」。一生提倡節儉、抑制外戚，是開皇之治不可或缺之靈魂人物。',
    keyAchievements: [
      '佐助楊堅代周立隋，開創三百年帝業',
      '整飭后宮風氣，倡導節儉政治'
    ],
    famousQuotes: ['大事已然，騎虎之勢，必不得下，勉之！'],
    relations: [
      { figureId: 'yang_jian', relationType: 'family', label: '帝后情深 / 開皇二聖' },
      { figureId: 'yang_guang', relationType: 'family', label: '次子' }
    ]
  },

  // --- 2. 初唐開國與貞觀君臣 ---
  {
    id: 'li_yuan',
    name: '李淵 (唐高祖)',
    courtesyName: '叔德',
    posthumousName: '神堯大聖大光孝皇帝',
    birthDeathDisplay: '566年 - 635年',
    birthYear: 566,
    deathYear: 635,
    nativePlaceAncient: '隴西 成紀',
    nativePlaceModern: '甘肅省天水市秦安縣',
    faction: 'tang',
    roles: ['大唐開國皇帝', '唐高祖'],
    avatar: 'images/figures/fig_li_yuan.jpg',
    bio: '關隴貴族隴西李氏，西涼武昭王李暠後裔。隋大業末年任太原留守，見天下大亂，與次子李世民於晉陽起兵，破霍邑、入長安，立楊侑為帝。西元618年受禪登基，建立大唐帝國。命世民等人南征北戰，消滅薛仁杲、劉武周、王世充、竇建德、蕭銑等割據群雄，奠定大唐一統宏圖。玄武門之變後退位為太上皇。',
    keyAchievements: [
      '太原晉陽起兵，建立大唐三百年皇朝',
      '掃平群雄割據，奠定天下大一統版圖'
    ],
    famousQuotes: ['彰明法度，與民約法十二條。'],
    relations: [
      { figureId: 'li_shimin', relationType: 'family', label: '次子 / 功高繼位' },
      { figureId: 'pei_ji', relationType: 'colleague', label: '晉陽密謀佐臣' }
    ]
  },
  {
    id: 'li_shimin',
    name: '李世民 (唐太宗)',
    courtesyName: '世民',
    posthumousName: '文武大聖大廣孝皇帝',
    birthDeathDisplay: '598年 - 649年',
    birthYear: 598,
    deathYear: 649,
    nativePlaceAncient: '隴西 成紀',
    nativePlaceModern: '甘肅省天水市秦安縣',
    faction: 'tang',
    roles: ['唐朝第二代皇帝', '天可汗', '千古一帝', '天策上將'],
    avatar: 'images/figures/fig_li_shimin.jpg',
    bio: '唐高祖次子。隋末隨父起兵，封秦王兼天策上將。於柏壁大破宋金剛、虎牢關一役陣擒竇建德兼降王世充，武功震古爍今。西元626年發動玄武門之變即位，年號「貞觀」。在位期間知人善任、從諫如流，行均田租庸調法，精簡府兵，大破東突厥生俘頡利可汗，平吐谷渾、高昌，被西北各族首領尊稱為「天可汗」。開創輝煌之「貞觀之治」，為盛唐文明之巔峰立下萬世根基。',
    keyAchievements: [
      '虎牢一戰破雙雄，克定天下乾坤',
      '開創貞觀之治，廣開言路從諫如流',
      '滅東突厥定西域，萬邦朝拜尊為「天可汗」'
    ],
    famousQuotes: [
      '以銅為鏡，可以正衣冠；以古為鏡，可以知興替；以人為鏡，可以明得失。',
      '水能載舟，亦能覆舟。'
    ],
    relations: [
      { figureId: 'li_yuan', relationType: 'family', label: '父皇' },
      { figureId: 'wei_zheng', relationType: 'monarch-subject', label: '如鏡相照之諍臣' },
      { figureId: 'fang_xuanling', relationType: 'monarch-subject', label: '房謀之宰輔' },
      { figureId: 'du_ruhui', relationType: 'monarch-subject', label: '杜斷之樞紐' },
      { figureId: 'li_jing', relationType: 'monarch-subject', label: '定襄滅突厥軍神' },
      { figureId: 'yuchi_gong', relationType: 'monarch-subject', label: '白刃救駕勇將' },
      { figureId: 'zhangsun_huanghou', relationType: 'family', label: '文德內助賢后' }
    ]
  },
  {
    id: 'zhangsun_huanghou',
    name: '長孫皇后 (文德皇后)',
    courtesyName: '觀音婢',
    posthumousName: '文德順聖皇后',
    birthDeathDisplay: '601年 - 636年',
    birthYear: 601,
    deathYear: 636,
    nativePlaceAncient: '河南 洛陽',
    nativePlaceModern: '河南省洛陽市',
    faction: 'tang',
    roles: ['唐太宗皇后', '千古賢后之冠'],
    avatar: 'images/figures/fig_zhangsun_huanghou.svg',
    bio: '隋右驍衛將軍長孫晟之女。十三歲嫁李世民，輔佐太宗度過奪嫡艱難歲月。玄武門之變親勉將士，即位後居后位深居簡出，性情寬簡，常以古事婉諫太宗保全魏徵等大臣。著有《女則》十篇，臨終叮囑薄葬、勿重用外戚，被唐太宗譽為「嘉偶良佐」。',
    keyAchievements: [
      '婉言化解君臣隔閡，保全魏徵等諍臣性命',
      '抑制長孫外戚專權，撰《女則》樹立典範'
    ],
    famousQuotes: ['妾生無益於人，死不可厚葬以費天下之財。'],
    relations: [
      { figureId: 'li_shimin', relationType: 'family', label: '帝后同心 / 嘉偶良佐' },
      { figureId: 'wei_zheng', relationType: 'colleague', label: '暗中力保之直臣' }
    ]
  },
  {
    id: 'wei_zheng',
    name: '魏徵 (玄成)',
    courtesyName: '玄成',
    posthumousName: '文貞公',
    birthDeathDisplay: '580年 - 643年',
    birthYear: 580,
    deathYear: 643,
    nativePlaceAncient: '魏州 曲城',
    nativePlaceModern: '河北省邢台市巨鹿縣',
    faction: 'tang',
    roles: ['諫議大夫', '左光祿大夫', '鄭國公', '千古人鏡'],
    avatar: 'images/figures/fig_wei_zheng.jpg',
    bio: '初唐最著名之直臣諍相。早年參李密瓦崗軍，後為隱太子李建成洗馬。玄武門之變後，唐太宗賞識其才能器度，拜為諫議大夫。魏徵犯顏直諫二百餘次，言辭鯁直，知無不言，力勸太宗居安思危、愛民節制。太宗臨朝每見其容止必斂容敬聽。病逝後太宗哀慟罷朝，親立碑文，嘆其為不可替代之「人鏡」。',
    keyAchievements: [
      '犯顏直諫二百餘次，力塑貞觀政治風骨',
      '主編《隋書》，總結歷代治亂興衰'
    ],
    famousQuotes: [
      '兼聽則明，偏信則暗。',
      '居安思危，戒奢以儉。'
    ],
    relations: [
      { figureId: 'li_shimin', relationType: 'monarch-subject', label: '照見得失之千古人鏡' }
    ]
  },
  {
    id: 'fang_xuanling',
    name: '房玄齡 (喬)',
    courtesyName: '玄齡',
    posthumousName: '梁文昭公',
    birthDeathDisplay: '579年 - 648年',
    birthYear: 579,
    deathYear: 648,
    nativePlaceAncient: '齊州 臨淄',
    nativePlaceModern: '山東省淄博市臨淄區',
    faction: 'tang',
    roles: ['尚書左僕射', '梁國公', '貞觀首輔', '房謀杜斷'],
    avatar: 'images/figures/fig_fang_xuanling.jpg',
    bio: '初唐名相。十八歲舉進士，投身李世民幕府二十餘年。為太宗網羅天下英才，秦王府文治之首。貞觀即位後任尚書左僕射掌中樞政事十五年，總理朝綱、制定律令制度、監修國史，善於謀劃大局，與杜如晦同心輔政，史稱「房謀杜斷」，列凌煙閣二十四功臣第五。',
    keyAchievements: [
      '任相十五年總攬綱紀，開創貞觀繁榮基石',
      '主持制定《貞觀律》與修撰五代正史'
    ],
    famousQuotes: ['量才授職，務在得人，無求備於一人。'],
    relations: [
      { figureId: 'li_shimin', relationType: 'monarch-subject', label: '君臣相得' },
      { figureId: 'du_ruhui', relationType: 'colleague', label: '房謀杜斷·黃金搭檔' }
    ]
  },
  {
    id: 'du_ruhui',
    name: '杜如晦 (克明)',
    courtesyName: '克明',
    posthumousName: '萊成公',
    birthDeathDisplay: '585年 - 630年',
    birthYear: 585,
    deathYear: 630,
    nativePlaceAncient: '京兆 杜陵',
    nativePlaceModern: '陝西省西安市雁塔區',
    faction: 'tang',
    roles: ['尚書右僕射', '兵部尚書', '萊國公', '房謀杜斷'],
    avatar: 'images/figures/fig_du_ruhui.jpg',
    bio: '初唐名相。出身京兆杜氏望族。入秦王府為文臣骨幹，軍旅征戰無不參謀帷幄。玄武門之變主要策劃者之一。貞觀年間任右僕射，臨事果決，善斷大事，凡房玄齡所議策畫，如晦一錘定音，配合無間。早逝時唐太宗為之慟哭廢食，列凌煙閣第三。',
    keyAchievements: [
      '運籌帷幄決勝虎牢與玄武門政變',
      '參掌中樞軍政，斷大事無遺算'
    ],
    famousQuotes: ['天下之事，至精至微，斷不可以疑生惑。'],
    relations: [
      { figureId: 'li_shimin', relationType: 'monarch-subject', label: '帷幄心腹' },
      { figureId: 'fang_xuanling', relationType: 'colleague', label: '房謀杜斷·同心匡弼' }
    ]
  },
  {
    id: 'li_jing',
    name: '李靖 (藥師)',
    courtesyName: '藥師',
    posthumousName: '衛景武公',
    birthDeathDisplay: '571年 - 649年',
    birthYear: 571,
    deathYear: 649,
    nativePlaceAncient: '雍州 三原',
    nativePlaceModern: '陝西省咸陽市三原縣',
    faction: 'tang',
    roles: ['兵部尚書', '尚書右僕射', '衛國公', '大唐軍神'],
    avatar: 'images/figures/fig_li_jing.jpg',
    bio: '大唐第一名將，文武全才。隋末隨秦瓊等歸唐，南平蕭銑、輔公祏底定江淮；貞觀三年任定襄道行軍大總管，率三千精騎雪夜襲破定襄，再於陰山奇襲大破突厥大軍，生俘頡利可汗，徹底降服東突厥；六十四歲拜西海道大總管遠征吐谷渾，涉積石山千里肅清西陲。著有兵書多卷，後人奉為兵家武聖，凌煙閣二十四功臣第八。',
    keyAchievements: [
      '雪夜奇襲定襄、陰山滅東突厥生俘頡利可汗',
      '平定蕭銑一統長江，遠征萬里破吐谷渾'
    ],
    famousQuotes: [
      '用兵之妙，在於審機，出其不意，攻其不備。',
      '功成名遂，身退思過，方保令名。'
    ],
    relations: [
      { figureId: 'li_shimin', relationType: 'monarch-subject', label: '天策軍神 / 拓土干城' },
      { figureId: 'li_ji', relationType: 'colleague', label: '雙璧名將' }
    ]
  },
  {
    id: 'li_ji',
    name: '李勣 (徐世勣/徐茂公)',
    courtesyName: '懋功',
    posthumousName: '英國貞武公',
    birthDeathDisplay: '594年 - 669年',
    birthYear: 594,
    deathYear: 669,
    nativePlaceAncient: '曹州 離狐',
    nativePlaceModern: '山東省菏澤市東明縣',
    faction: 'tang',
    roles: ['司空', '同中書門下三品', '英國公', '三朝柱石'],
    avatar: 'images/figures/fig_li_ji.jpg',
    bio: '原名徐世勣，字懋功，獲賜國姓李氏。早年參加瓦崗軍，歸唐後平王世充、竇建德、劉黑闥。貞觀年間副李靖破東突厥，大破薛延陀；高宗時任總管領軍跨海遠征高句麗，攻破平壤城俘其王，徹底平定朝鮮半島。歷事高祖、太宗、高宗三朝，出將入相近半個世紀，深謀遠慮，善全其身，列凌煙閣第二十三。',
    keyAchievements: [
      '攻破平壤滅高句麗，完成隋唐兩代數十年夙願',
      '北滅薛延陀，克平突厥'
    ],
    famousQuotes: ['身受厚恩，誓以骨肉報國！'],
    relations: [
      { figureId: 'li_shimin', relationType: 'monarch-subject', label: '倚重元老' },
      { figureId: 'li_jing', relationType: 'colleague', label: '出將入相雙璧' }
    ]
  },
  {
    id: 'yuchi_gong',
    name: '尉遲敬德 (恭)',
    courtesyName: '敬德',
    posthumousName: '鄂忠武公',
    birthDeathDisplay: '585年 - 658年',
    birthYear: 585,
    deathYear: 658,
    nativePlaceAncient: '朔州 善陽',
    nativePlaceModern: '山西省朔州市朔城區',
    faction: 'tang',
    roles: ['右武候大將軍', '鄂國公', '門神'],
    avatar: 'images/figures/fig_yuchi_gong.jpg',
    bio: '初唐勇將。原為劉武周偏將，戰敗歸唐。李世民不疑用之，於介休破王世充陣中奪槊救太宗脫險。征戰四方勇冠三軍。玄武門之變射殺李元吉，持槊入宮衛戍高祖保全大局。晚年謝絕人事，篤信道教。因忠勇赤誠，與秦瓊一同成為華夏民間傳頌千古之「門神」，列凌煙閣第七。',
    keyAchievements: [
      '陣前單騎奪槊，數度捨命救太宗於危難',
      '玄武門之變決斷定乾坤'
    ],
    famousQuotes: ['國家有難，死生以之！'],
    relations: [
      { figureId: 'li_shimin', relationType: 'monarch-subject', label: '救駕心腹虎將' },
      { figureId: 'qin_qiong', relationType: 'colleague', label: '雙門神齊名天下' }
    ]
  },
  {
    id: 'qin_qiong',
    name: '秦瓊 (叔寶)',
    courtesyName: '叔寶',
    posthumousName: '胡壯憲公',
    birthDeathDisplay: '586年 - 638年',
    birthYear: 586,
    deathYear: 638,
    nativePlaceAncient: '齊州 歷城',
    nativePlaceModern: '山東省濟南市歷城區',
    faction: 'tang',
    roles: ['左武衛大將軍', '胡國公', '門神'],
    avatar: 'images/figures/fig_qin_qiong.jpg',
    bio: '初唐傳奇名將。少勇悍，隋末歷仕來護兒、張須陀、李密、王世充，因惡世充為人，陣前率程咬金等投唐。李世民任為馬軍總管，每臨大敵，必命叔寶躍馬挺槍直衝敵陣，於萬眾中取敵驍將首級，威名震懾天下。身經二百餘戰，創傷甚多，晚年常病。逝後陪葬昭陵，民間奉為守護家宅之右門神，列凌煙閣第二十四。',
    keyAchievements: [
      '萬軍之中單騎馳突斬將搴旗，天下無敵',
      '輔佐太宗平定四海，化為民間千古門神'
    ],
    famousQuotes: ['吾少長戎馬間，歷二百餘戰，身被重創無算，安得不病！'],
    relations: [
      { figureId: 'li_shimin', relationType: 'monarch-subject', label: '天策先鋒驍將' },
      { figureId: 'yuchi_gong', relationType: 'colleague', label: '千古雙門神' },
      { figureId: 'cheng_yaojin', relationType: 'colleague', label: '同生共死瓦崗袍澤' }
    ]
  },
  {
    id: 'cheng_yaojin',
    name: '程咬金 (程知節)',
    courtesyName: '知節',
    posthumousName: '盧襄公',
    birthDeathDisplay: '589年 - 665年',
    birthYear: 589,
    deathYear: 665,
    nativePlaceAncient: '濟州 東阿',
    nativePlaceModern: '山東省菏澤市鄆城縣',
    faction: 'tang',
    roles: ['左領軍大將軍', '盧國公', '猛將'],
    avatar: 'images/figures/fig_cheng_yaojin.jpg',
    bio: '隋末唐初猛將。善用馬槊，勇武過人。與秦瓊同出瓦崗，後歸秦王府。參與破宋金剛、王世充、竇建德諸役，玄武門之變立大功。高宗顯慶年間任蔥山道行軍大總管征西突厥。為人豪爽善自全，歷事三朝備受禮遇，列凌煙閣第十九。民間演義中為性格福將。',
    keyAchievements: [
      '馳突沙場戰功赫赫，平天下之棟樑',
      '率軍遠征蔥嶺西突厥'
    ],
    famousQuotes: ['男子漢大丈夫，行事當光明磊落！'],
    relations: [
      { figureId: 'li_shimin', relationType: 'monarch-subject', label: '秦王府猛將' },
      { figureId: 'qin_qiong', relationType: 'colleague', label: '結義兄弟般至交' }
    ]
  },
  {
    id: 'liu_rengui',
    name: '劉仁軌 (正則)',
    courtesyName: '正則',
    posthumousName: '臨淮文獻公',
    birthDeathDisplay: '601年 - 685年',
    birthYear: 601,
    deathYear: 685,
    nativePlaceAncient: '汴州 尉氏',
    nativePlaceModern: '河南省開封市尉氏縣',
    faction: 'tang',
    roles: ['左僕射', '同中書門下三品', '白江口水軍統帥', '臨淮郡公'],
    avatar: 'images/figures/fig_liu_rengui.jpg',
    bio: '唐代傑出軍事家、外交家、政治家。農民出身，恭謹勤學。龍朔三年（663年）在朝鮮半島白江口指揮大唐水軍迎擊倭國援助百濟之龐大艦隊。仁軌四戰皆捷，焚倭船四百艘，海水為之丹赤，取得「白江口之戰」完全勝利，奠定東北亞千百年秩序。後平定百濟、新羅，治理民生深受愛戴，歷事太宗、高宗、武后三朝。',
    keyAchievements: [
      '指揮白江口之戰大破日本水軍，焚船四百摧毀倭國企圖',
      '安撫百濟新羅，經營朝鮮半島邊疆'
    ],
    famousQuotes: ['國家有急，苟利社稷，死生以之。'],
    relations: [
      { figureId: 'li_shimin', relationType: 'monarch-subject', label: '太宗識拔' },
      { figureId: 'wu_zetian', relationType: 'monarch-subject', label: '武后深加禮遇' }
    ]
  },
  {
    id: 'wencheng_gongzhu',
    name: '文成公主',
    courtesyName: '文成',
    posthumousName: '文成公主',
    birthDeathDisplay: '625年 - 680年',
    birthYear: 625,
    deathYear: 680,
    nativePlaceAncient: '京兆 長安',
    nativePlaceModern: '陝西省西安市',
    faction: 'tang',
    roles: ['大唐宗室公主', '吐蕃贊蒙 (王后)', '漢藏文明使者'],
    avatar: 'images/figures/fig_wencheng_gongzhu.jpg',
    bio: '唐朝宗室之女。貞觀十五年（641年），唐太宗命江夏王李道宗持節送文成公主入吐蕃，與吐蕃贊普松贊干布和親。公主入藏帶來大批釋迦牟尼十二歲等身佛像、經書、農具、蔬菜種子、歷算、醫藥、紡織與造紙工藝，建大昭寺、小昭寺。在藏四十載，深受藏族人民愛戴，尊為「白度母」化身，開創漢藏民族和合之千古佳話。',
    keyAchievements: [
      '出塞和親促成唐蕃四十年和平友善',
      '將中原農業、醫藥、天文與佛教經典傳入青藏高原'
    ],
    famousQuotes: ['願漢藏和睦，永息干戈。'],
    relations: [
      { figureId: 'li_shimin', relationType: 'family', label: '皇室指婚之伯叔' },
      { figureId: 'songtsen_gampo', relationType: 'family', label: '相濡以沫之吐蕃夫婿' }
    ]
  },
  {
    id: 'songtsen_gampo',
    name: '松贊干布 (棄宗弄贊)',
    courtesyName: '松贊干布',
    posthumousName: '吐蕃贊普',
    birthDeathDisplay: '617年 - 650年',
    birthYear: 617,
    deathYear: 650,
    nativePlaceAncient: '雅礱河谷',
    nativePlaceModern: '西藏自治區山南市乃東區',
    faction: 'nomadic',
    roles: ['吐蕃帝國創建者', '法王贊普'],
    avatar: 'images/figures/fig_songtsen_gampo.jpg',
    bio: '西藏古代歷史上最傑出之政治家與軍事家。遷都邏些（拉薩），統一西藏高原各部落，建立強大的吐蕃王朝。創立藏文字母，頒行法律，推行軍政體制。向大唐請婚，迎娶文成公主與泥婆羅赤尊公主，廣泛吸收中原、印度先進文明，興建布達拉宮雛形與大昭寺，開啟西藏文明發展黃金時代。',
    keyAchievements: [
      '統一青藏高原，建立吐蕃帝國',
      '創制藏文與法典，迎娶文成公主融匯漢藏'
    ],
    famousQuotes: ['自古未有貴女入吐蕃者，我今得文成公主，誠為大慶！'],
    relations: [
      { figureId: 'wencheng_gongzhu', relationType: 'family', label: '大唐和親贊蒙' },
      { figureId: 'li_shimin', relationType: 'monarch-subject', label: '甥舅之好' }
    ]
  },

  // --- 3. 武周革命與盛唐開元天寶 ---
  {
    id: 'wu_zetian',
    name: '武則天 (武曌)',
    courtesyName: '武曌',
    posthumousName: '則天大聖皇后',
    birthDeathDisplay: '624年 - 705年',
    birthYear: 624,
    deathYear: 705,
    nativePlaceAncient: '并州 文水',
    nativePlaceModern: '山西省呂梁市文水縣',
    faction: 'wuZhou',
    roles: ['華夏唯一正統女皇帝', '武周建立者', '政治改革家'],
    avatar: 'images/figures/fig_wu_zetian.jpg',
    bio: '荊州都督武士彠之女。初為唐太宗才人，後為唐高宗皇后。參決朝政與高宗並稱「二聖」。高宗逝後廢中宗、立睿宗，西元690年正式自立為帝，改國號為「周」，定都神都洛陽，成為華夏歷史上唯一被正史承認之女皇帝。在位期間不拘一格廣開殿試、武舉拔擢寒門庶族，嚴厲打擊關隴世族；重用狄仁傑、姚崇等名相；發展農業，穩定邊疆，國力持續上升。晚年神龍政變退位歸唐，留「無字碑」任後人評說，史稱「政啟開元，治宏貞觀」。',
    keyAchievements: [
      '建立武周王朝，打破千年性別與世族藩籬',
      '首創殿試、武舉，使科舉制度真正成為拔擢寒門柱石',
      '政啟開元治宏貞觀，為唐玄宗盛世奠定人才與經濟基礎'
    ],
    famousQuotes: [
      '建天授地，日月當空，唯我自立！',
      '死後立無字碑，功過是非任後世評說。'
    ],
    relations: [
      { figureId: 'di_renjie', relationType: 'monarch-subject', label: '倚為國老 / 復辟唐祚' },
      { figureId: 'shangguan_waner', relationType: 'monarch-subject', label: '機要內相' },
      { figureId: 'li_longji', relationType: 'family', label: '皇孫 / 盛唐開創者' },
      { figureId: 'li_shimin', relationType: 'monarch-subject', label: '初入宮掖才人' }
    ]
  },
  {
    id: 'di_renjie',
    name: '狄仁傑 (懷英)',
    courtesyName: '懷英',
    posthumousName: '梁文惠公',
    birthDeathDisplay: '630年 - 700年',
    birthYear: 630,
    deathYear: 700,
    nativePlaceAncient: '并州 太原',
    nativePlaceModern: '山西省太原市陽曲縣',
    faction: 'wuZhou',
    roles: ['同鳳閣鸞臺平章事', '大理寺丞', '梁國公', '國老'],
    avatar: 'images/figures/fig_di_renjie.jpg',
    bio: '武周時期著名政治家。早年任大理寺丞，一年內斷滯獄一萬七千人，無一人怨枉，被譽為神斷法官。後任宰相，為人剛正不阿，敢於犯顏直諫。在武則天晚年深獲信賴，尊稱「國老」而不名。仁傑巧妙進言勸武后迎還廬陵王李顯，阻止武承嗣奪嫡，並薦拔張柬之、姚崇、宋璟、敬暉等數十位賢臣，世稱「天下桃李，悉在公門」，為興復李唐社稷立下第一大功。',
    keyAchievements: [
      '神斷天下冤案，主持大理寺法度昭彰',
      '勸阻武后傳位武氏，迎立廬陵王興復李唐正統',
      '桃李滿天下，薦引姚崇、張柬之等開元社稷柱石'
    ],
    famousQuotes: [
      '朝堂之上，唯法與天道不可私曲！',
      '陛下姑姪與母子孰親？傳位子孫，百代配饗太廟；傳位侄子，未聞姪登大寶而祔姑於廟者也。'
    ],
    relations: [
      { figureId: 'wu_zetian', relationType: 'monarch-subject', label: '朝夕倚仗之國老' },
      { figureId: 'yao_chong', relationType: 'colleague', label: '門下門生 / 盛唐宰相' }
    ]
  },
  {
    id: 'shangguan_waner',
    name: '上官婉兒',
    courtesyName: '婉兒',
    posthumousName: '昭容',
    birthDeathDisplay: '664年 - 710年',
    birthYear: 664,
    deathYear: 710,
    nativePlaceAncient: '陝州 陝縣',
    nativePlaceModern: '河南省三門峽市陝州區',
    faction: 'wuZhou',
    roles: ['武周內舍人', '巾幗宰相', '唐中宗昭容', '文壇盟主'],
    avatar: 'images/figures/fig_shangguan_waner.jpg',
    bio: '上官儀之孫女。因家族獲罪沒入掖庭，天資敏慧，博涉群書。十四歲因絕世文才獲武則天賞識免罪，掌管宮廷制誥二十餘年，群臣奏摺悉歸其裁決，有「巾幗宰相」之譽。中宗朝拜為昭容，大倡文學，評定天下詩才，推動盛唐詩風發展。唐隆政變中為李隆基所斬。',
    keyAchievements: [
      '執掌宮闈機要樞紐二十餘年，才冠群芳',
      '評點天下詩賦，引領盛唐詩歌繁榮'
    ],
    famousQuotes: ['葉下洞庭初，思君萬里餘。'],
    relations: [
      { figureId: 'wu_zetian', relationType: 'monarch-subject', label: '識拔信任之樞密內相' },
      { figureId: 'li_longji', relationType: 'rival', label: '政變反對派' }
    ]
  },
  {
    id: 'li_longji',
    name: '李隆基 (唐玄宗/唐明皇)',
    courtesyName: '隆基',
    posthumousName: '至道大聖大明孝皇帝',
    birthDeathDisplay: '685年 - 762年',
    birthYear: 685,
    deathYear: 762,
    nativePlaceAncient: '相州 湯陰',
    nativePlaceModern: '河南省安陽市湯陰縣',
    faction: 'tang',
    roles: ['唐朝第七代皇帝', '開元盛世開創者', '梨園始祖'],
    avatar: 'images/figures/fig_li_longji.jpg',
    bio: '唐睿宗李旦第三子。英武果斷，通曉音律。發動唐隆政變與先天政變誅韋后、太平公主，即位後勵精圖治，任用姚崇、宋璟、張九齡為相，裁汰冗官、抑制佛教豪強、整飭財政，開創大唐極盛之「開元盛世」，天下大治，戶口破五千萬，絲路繁盛。然而晚年倦政，溺愛楊貴妃，罷斥賢相，寵信李林甫、楊國忠，重用胡將安祿山委以三鎮節度使，引爆長達八年之「安史之亂」，避蜀退位為太上皇，大唐盛世驟然跌入低谷。',
    keyAchievements: [
      '開創開元盛世，華夏封建經濟文化極致巔峰',
      '設十道節度使鞏固邊防，創梨園倡導樂舞藝術'
    ],
    famousQuotes: [
      '天寶承平，海內殷富。',
      '長恨歌傳千載淚，馬嵬坡下斷腸時。'
    ],
    relations: [
      { figureId: 'yang_guifei', relationType: 'family', label: '深愛貴妃 / 馬嵬恩斷' },
      { figureId: 'yao_chong', relationType: 'monarch-subject', label: '開元首任賢相' },
      { figureId: 'an_lushan', relationType: 'rival', label: '信任養癰 / 引爆叛亂' },
      { figureId: 'guo_ziyi', relationType: 'monarch-subject', label: '平叛再造社稷功臣' },
      { figureId: 'li_bai', relationType: 'monarch-subject', label: '賜金放還之翰林詩仙' }
    ]
  },
  {
    id: 'yang_guifei',
    name: '楊玉環 (楊貴妃)',
    courtesyName: '玉環',
    posthumousName: '貴妃',
    birthDeathDisplay: '719年 - 756年',
    birthYear: 719,
    deathYear: 756,
    nativePlaceAncient: '蒲州 永樂',
    nativePlaceModern: '山西省運城市芮城縣',
    faction: 'tang',
    roles: ['唐玄宗貴妃', '古代四大美女之一 (羞花)'],
    avatar: 'images/figures/fig_yang_guifei.jpg',
    bio: '中國古代四大美女之一。姿質豐艷，通曉音律，尤擅胡旋舞與霓裳羽衣曲。天寶年間獲玄宗極度寵愛，冊為貴妃，「後宮佳麗三千人，三千寵愛在一身」。其兄楊國忠因而竊據相位專權誤國。天寶十五載安史叛軍破潼關，玄宗逃蜀途經馬嵬坡，禁軍將士兵變誅殺楊國忠，逼迫玄宗賜死楊貴妃於佛堂，年僅三十八歲。其悲劇愛情成為白居易《長恨歌》千古詠唱主題。',
    keyAchievements: [
      '精通琵琶與霓裳羽衣舞，代表盛唐宮廷藝術巔峰',
      '古代四大美人之「羞花」象徵'
    ],
    famousQuotes: ['在天願作比翼鳥，在地願為連理枝。天長地久有時盡，此恨綿綿無絕期。'],
    relations: [
      { figureId: 'li_longji', relationType: 'family', label: '長恨千載之深情眷侶' }
    ]
  },
  {
    id: 'guo_ziyi',
    name: '郭子儀 (尚父)',
    courtesyName: '子儀',
    posthumousName: '汾陽忠武王',
    birthDeathDisplay: '697年 - 781年',
    birthYear: 697,
    deathYear: 781,
    nativePlaceAncient: '華州 鄭縣',
    nativePlaceModern: '陝西省渭南市華州區',
    faction: 'tang',
    roles: ['中書令', '天下兵馬副元帥', '汾陽郡王', '尚父', '再造唐室功臣'],
    avatar: 'images/figures/fig_guo_ziyi.jpg',
    bio: '盛唐軍事統帥，武舉出身。安史之亂爆發，受任朔方節度使，聯合同僚李光弼收復河北；天寶末年指揮香積寺之戰與陜州大戰，率軍光復長安、洛陽兩京；代宗時吐蕃攻陷長安，子儀收集散兵傳烽鼓譟巧退吐蕃；大歷四年回紇進犯，子儀單騎入回紇軍營以忠誠感化藥葛羅可汗化敵為友。勇冠三軍、進退有節，事玄宗、肅宗、代宗、德宗四朝，「再造唐室而天下不猜，功蓋一代而人主不疑」，富貴壽考俱全，卒年八十五歲，尊為「尚父」。',
    keyAchievements: [
      '安史之亂指揮收復兩京（長安、洛陽），力挽狂瀾再造大唐',
      '單騎退回紇大軍，退吐蕃保全關中社稷',
      '功蓋天下而主不疑，大智若愚全福全壽'
    ],
    famousQuotes: [
      '臣受國家厚恩，誓以身殉社稷，生死何足顧！',
      '單騎赴敵營，惟仗赤心與忠信。'
    ],
    relations: [
      { figureId: 'li_longji', relationType: 'monarch-subject', label: '再造大唐乾坤' },
      { figureId: 'li_guangbi', relationType: 'colleague', label: '安史平叛雙壁' },
      { figureId: 'an_lushan', relationType: 'rival', label: '死戰平定之國賊' }
    ]
  },
  {
    id: 'li_guangbi',
    name: '李光弼',
    courtesyName: '光弼',
    posthumousName: '臨淮武穆王',
    birthDeathDisplay: '708年 - 764年',
    birthYear: 708,
    deathYear: 764,
    nativePlaceAncient: '營州 柳城',
    nativePlaceModern: '遼寧省朝陽市',
    faction: 'tang',
    roles: ['太尉', '中書令', '臨淮郡王', '安史戰神'],
    avatar: 'images/figures/fig_li_guangbi.jpg',
    bio: '契丹族名將後裔。治軍嚴整，謀略超群。安史之亂由郭子儀薦為河東節度使，以弱抵強堅守太原，大破史思明十萬精銳，史稱「太原保衛戰」；後移師河陽，三城死守破敵。戰功卓絕，為中興名將之首，時人評其「中興戰功第一推光弼」。',
    keyAchievements: [
      '指揮太原保衛戰以少勝多擊潰史思明主力',
      '河陽三城大捷打破安史叛軍渡江企圖'
    ],
    famousQuotes: ['戰士陣前死，大將何必求生！'],
    relations: [
      { figureId: 'guo_ziyi', relationType: 'colleague', label: '郭李齊名之平叛巨頭' },
      { figureId: 'shi_siming', relationType: 'rival', label: '太原陣前死敵' }
    ]
  },
  {
    id: 'zhang_xun',
    name: '張巡',
    courtesyName: '巡',
    posthumousName: '忠烈公',
    birthDeathDisplay: '709年 - 757年',
    birthYear: 709,
    deathYear: 757,
    nativePlaceAncient: '蒲州 河東',
    nativePlaceModern: '山西省運城市永濟市',
    faction: 'tang',
    roles: ['河南節度副使', '睢陽守將', '千古忠烈'],
    avatar: 'images/figures/fig_zhang_xun.jpg',
    bio: '真源縣令，博通群書。安史之亂中原陷落，張巡起兵堅守雍丘，後與許遠合兵堅守江淮門戶睢陽城。以數千將士抗擊尹子奇十三萬叛軍圍攻長達數月，經歷大小四百餘戰，斬叛將二百餘人。糧盡矢絕城破殉難。因其死守，叛軍無法南下渡江，保全江淮富庶糧道賦稅，大唐半壁得以不墜。',
    keyAchievements: [
      '血戰睢陽以三千拒敵十三萬，保全大唐江南半壁江山',
      '智設草人借箭、地道破敵，千古孤臣忠義楷模'
    ],
    famousQuotes: ['臣智勇俱竭，不能保全城池，生受國恩，死為厲鬼殺賊！'],
    relations: [
      { figureId: 'guo_ziyi', relationType: 'colleague', label: '江淮後方柱石' }
    ]
  },
  {
    id: 'yan_zhenqing',
    name: '顏真卿 (清臣)',
    courtesyName: '清臣',
    posthumousName: '魯文忠公',
    birthDeathDisplay: '709年 - 785年',
    birthYear: 709,
    deathYear: 785,
    nativePlaceAncient: '京兆 萬年',
    nativePlaceModern: '陝西省西安市',
    faction: 'tang',
    roles: ['吏部尚書', '魯郡公', '楷書四大家之一', '天下第二行書作者'],
    avatar: 'images/figures/fig_yan_zhenqing.jpg',
    bio: '顏師古五代孫。大唐著名書法家與重臣。安史之亂時任平原太守，河北十七郡皆降，真卿獨起義兵扼其要衝，與從兄顏杲卿連兵抗敵。大歷年間創「顏體」楷書，氣度雄渾剛正。從姪季明遇害後揮淚撰就「天下第二行書」《祭姪文稿》。晚年奉命勸諭藩鎮李希烈，大義凜然，抗節不屈被縊殺，年七十六。',
    keyAchievements: [
      '開創雄健端正之「顏體」書法，撰《祭姪文稿》千古名作',
      '平原誓師抗安祿山，晚年孤身使叛將慷慨就義'
    ],
    famousQuotes: ['天下之事，大義存焉，生死度外！'],
    relations: [
      { figureId: 'li_longji', relationType: 'monarch-subject', label: '河北孤忠守將' }
    ]
  },

  // --- 4. 盛唐文人宗師、佛法與高士 ---
  {
    id: 'li_bai',
    name: '李白 (太白)',
    courtesyName: '太白',
    posthumousName: '青蓮居士 / 詩仙',
    birthDeathDisplay: '701年 - 762年',
    birthYear: 701,
    deathYear: 762,
    nativePlaceAncient: '綿州 昌隆',
    nativePlaceModern: '四川省江油市',
    faction: 'cultural',
    roles: ['翰林供奉', '詩仙', '青蓮居士', '盛唐浪漫詩歌之巔'],
    avatar: 'images/figures/fig_li_bai.jpg',
    bio: '字太白，號青蓮居士，祖籍隴西成紀。華夏歷史上最富浪漫主義色彩之詩仙。天資超凡，喜劍術，好游四方。天寶初年獲唐玄宗召入長安任翰林供奉，狂放不羈，「天子呼來不上船，自稱臣是酒中仙」。其詩飄逸灑脫、豪邁奔放、氣吞山河，如天風海雨不可羈勒。與杜甫並稱「李杜」，為盛唐黃金時代文化精神之象徵。',
    keyAchievements: [
      '詩作雄奇豪邁空前絕後，獲尊為千古「詩仙」',
      '《將進酒》《蜀道難》《夢遊天姥吟留別》開創詩歌巔峰'
    ],
    famousQuotes: [
      '君不見黃河之水天上來，奔流到海不復回！',
      '天生我材必有用，千金散盡還復來。',
      '安能摧眉折腰事權貴，使我不得開心顏！'
    ],
    relations: [
      { figureId: 'du_fu', relationType: 'colleague', label: '雙星輝映·天各一方之至交' },
      { figureId: 'li_longji', relationType: 'monarch-subject', label: '金鑾殿賜金放還之君臣' }
    ]
  },
  {
    id: 'du_fu',
    name: '杜甫 (子美)',
    courtesyName: '子美',
    posthumousName: '杜少陵 / 詩聖',
    birthDeathDisplay: '712年 - 770年',
    birthYear: 712,
    deathYear: 770,
    nativePlaceAncient: '襄陽 / 河南 鞏縣',
    nativePlaceModern: '河南省鄭州市鞏義市',
    faction: 'cultural',
    roles: ['左拾遺', '工部員外郎', '詩聖', '詩史作家'],
    avatar: 'images/figures/fig_du_fu.jpg',
    bio: '晉當陽侯杜預十三世孫。華夏歷史上最崇高之現實主義詩聖。目睹安史之亂生靈塗炭與盛衰巨變，流亡秦隴，寓居成都草堂與夔州。詩風沉鬱頓挫，悲憫眾生，以詩記史，被譽為「詩史」。「三吏三別」真實記錄民間疾苦，憂國憂民情懷流芳百世，與李白並稱「李杜」。',
    keyAchievements: [
      '以詩記錄安史之亂民生巨變，獲尊為「詩史」與「詩聖」',
      '《三吏》《三別》《登高》《春望》達格律詩造詣頂峰'
    ],
    famousQuotes: [
      '安得廣廈千萬間，大庇天下寒士俱歡顏！風雨不動安如山。',
      '國破山河在，城春草木深。感時花濺淚，恨別鳥驚心。',
      '無邊落木蕭蕭下，不盡長江滾滾來。'
    ],
    relations: [
      { figureId: 'li_bai', relationType: 'colleague', label: '仰慕傾心之詩道摯友' }
    ]
  },
  {
    id: 'bai_juyi',
    name: '白居易 (樂天)',
    courtesyName: '樂天',
    posthumousName: '香山居士 / 詩魔',
    birthDeathDisplay: '772年 - 846年',
    birthYear: 772,
    deathYear: 846,
    nativePlaceAncient: '太原 / 河南 新鄭',
    nativePlaceModern: '河南省鄭州市新鄭市',
    faction: 'cultural',
    roles: ['左拾遺', '杭州刺史', '蘇州刺史', '刑部尚書', '香山居士'],
    avatar: 'images/figures/fig_bai_juyi.jpg',
    bio: '中唐傑出詩人。倡導「新樂府運動」，主張「文章合為時而著，歌詩合為事而作」。語言平易通俗，老嫗能解。創作名篇《長恨歌》描繪玄宗貴妃生死戀情，《琵琶行》抒發同是天涯淪落人之慨。任杭州刺史修白堤，政績卓著，名揚日本、新羅東亞各國。晚年隱居洛陽香山。',
    keyAchievements: [
      '倡導新樂府運動，使詩歌回歸針砭時弊與百姓呼聲',
      '《長恨歌》《琵琶行》傳播四海千古傳唱'
    ],
    famousQuotes: [
      '同是天涯淪落人，相逢何必曾相識！',
      '回眸一笑百媚生，六宮粉黛無顏色。',
      '野火燒不盡，春風吹又生。'
    ],
    relations: [
      { figureId: 'li_longji', relationType: 'other', label: '長恨歌詠讚其盛衰' }
    ]
  },
  {
    id: 'wang_wei',
    name: '王維 (摩詰)',
    courtesyName: '摩詰',
    posthumousName: '尚書右丞 / 詩佛',
    birthDeathDisplay: '701年 - 761年',
    birthYear: 701,
    deathYear: 761,
    nativePlaceAncient: '蒲州 猗氏',
    nativePlaceModern: '山西省運城市臨猗縣',
    faction: 'cultural',
    roles: ['尚書右丞', '山水田園詩派宗師', '詩佛', '畫聖'],
    avatar: 'images/figures/fig_wang_wei.jpg',
    bio: '盛唐山水田園派代表詩人與畫家。官至尚書右丞。精通佛理、音樂與繪畫，蘇軾讚其「味摩詰之詩，詩中有畫；觀摩詰之畫，畫中有詩」。安史之亂為叛軍所俘，迫受偽職，後以《凝碧詩》表心跡得免罪。晚年隱居輞川莊，詩境空靈恬淡，超凡脫俗，尊為「詩佛」。',
    keyAchievements: [
      '開闢山水田園詩畫合一境界，文人畫鼻祖',
      '詩境融匯禪意佛理，尊為「詩佛」'
    ],
    famousQuotes: [
      '行到水窮處，坐看雲起時。',
      '大漠孤煙直，長河落日圓。',
      '紅豆生南國，春來發幾枝。願君多采擷，此物最相思。'
    ],
    relations: [
      { figureId: 'zhang_jiuling', relationType: 'colleague', label: '知遇知己' }
    ]
  },
  {
    id: 'xuanzang',
    name: '玄奘大師 (三藏法師)',
    courtesyName: '三藏',
    posthumousName: '大遍覺 / 玄奘法師',
    birthDeathDisplay: '602年 - 664年',
    birthYear: 602,
    deathYear: 664,
    nativePlaceAncient: '洛州 緱氏',
    nativePlaceModern: '河南省洛陽市偃師區',
    faction: 'cultural',
    roles: ['唯識宗創始人', '佛經翻譯家', '旅行家', '大唐西域記作者'],
    avatar: 'images/figures/fig_xuanzang.jpg',
    bio: '唐代高僧，法相唯識宗祖師。貞觀三年（629年）冒禁自長安孤身西行求法，歷時十七載，行五萬里，穿越八百里流沙、蔥嶺險阻抵達天竺（印度），於那爛陀寺鑽研佛法，於曲女城無遮大會辯伏五印群僧。貞觀十九年攜六百五十七部梵文經典載譽歸長安，唐太宗命於大慈恩寺譯經。二十年間翻譯佛經七十五部、一千三百餘卷，並口述完成地理名著《大唐西域記》，被尊為四大譯經家之一。神魔小說《西遊記》唐僧之歷史原型。',
    keyAchievements: [
      '歷經十七載五萬里西行取經，確立中印文化交流里程碑',
      '翻譯梵文佛經一千三百餘卷，撰《大唐西域記》載百餘國地理風俗'
    ],
    famousQuotes: [
      '寧可西行一步死，絕不東歸半步生！',
      '乘危遠邁，策杖孤征。'
    ],
    relations: [
      { figureId: 'li_shimin', relationType: 'monarch-subject', label: '詔令譯經·親製大唐三藏聖教序' }
    ]
  },
  {
    id: 'jianzhen',
    name: '鑒真大師',
    courtesyName: '鑒真',
    posthumousName: '過海大師 / 傳燈大法師',
    birthDeathDisplay: '688年 - 763年',
    birthYear: 688,
    deathYear: 763,
    nativePlaceAncient: '揚州 江陽',
    nativePlaceModern: '江蘇省揚州市',
    faction: 'cultural',
    roles: ['律宗高僧', '中日文化交流先驅', '日本律宗始祖'],
    avatar: 'images/figures/fig_jianzhen.jpg',
    bio: '唐代揚州大明寺高僧。應日本留學僧榮睿、普照之請，決定東渡日本傳授戒律。自天寶二年（743年）起，五次東渡皆因風浪、海盜、官府阻攔而告失敗，弟子死傷，鑒真雙目失明。天寶十二載（753年），年逾六旬之盲僧第六次東渡終獲成功，抵達日本奈良。建立唐招提寺，傳播佛學戒律、醫藥、建築、雕塑與書法，被日本朝野尊為律宗開山祖師，日本醫藥與豆腐技術之神。',
    keyAchievements: [
      '六次東渡歷經艱險抵達日本奈良弘揚律宗',
      '建造唐招提寺，將大唐建築、醫藥與書法全面傳播東瀛'
    ],
    famousQuotes: [
      '山川異域，風月同天。寄諸佛子，共結來緣。',
      '為是法事也，何惜生命！'
    ],
    relations: [
      { figureId: 'li_longji', relationType: 'other', label: '天寶年間東渡大師' }
    ]
  },
  {
    id: 'sun_simiao',
    name: '孫思邈 (藥王)',
    courtesyName: '思邈',
    posthumousName: '藥王 / 孫真人',
    birthDeathDisplay: '581年 - 682年',
    birthYear: 581,
    deathYear: 682,
    nativePlaceAncient: '京兆 華原',
    nativePlaceModern: '陝西省銅川市耀州區',
    faction: 'cultural',
    roles: ['醫學家', '道士', '藥王', '大醫精誠倡導者'],
    avatar: 'images/figures/fig_sun_simiao.jpg',
    bio: '隋唐傑出醫學家，道教名士。自幼聰穎，通老莊百家。隱居太白山研習醫道，隋文帝、唐太宗、唐高宗多次徵拜不就。親嘗百草，濟世活人，倡導醫者仁心，著成《千金要方》《千金翼方》，總結唐以前數千年醫學臨床精粹，創立「大醫精誠」醫德規範，首創複方與婦幼專科，享年百餘歲，後世尊為「藥王」。',
    keyAchievements: [
      '撰《千金要方》《千金翼方》，集華夏中古醫學之大成',
      '樹立「大醫精誠」崇高醫德標準，為萬世醫宗'
    ],
    famousQuotes: [
      '人命至重，有貴千金，一方濟之，德逾於此。',
      '凡大醫治病，必當安神定志，無欲無求，先發大慈惻隱之心。'
    ],
    relations: [
      { figureId: 'li_shimin', relationType: 'other', label: '辭官隱居之方外高士' }
    ]
  },

  // --- 5. 安史之亂與農民起義 ---
  {
    id: 'an_lushan',
    name: '安祿山 (軋犖山)',
    courtesyName: '祿山',
    posthumousName: '大燕雄武皇帝',
    birthDeathDisplay: '703年 - 757年',
    birthYear: 703,
    deathYear: 757,
    nativePlaceAncient: '營州 柳城',
    nativePlaceModern: '遼寧省朝陽市',
    faction: 'fanzhen',
    roles: ['范陽平盧河東三鎮節度使', '大燕皇帝', '安史之亂引爆者'],
    avatar: 'images/figures/fig_an_lushan.svg',
    bio: '粟特與突厥混血將領。巧言善媚，善胡旋舞，深得唐玄宗與楊貴妃寵信，拜為義子，兼領平盧、范陽、河東三鎮節度使，坐擁北方精兵二十萬。天寶十四載（755年）以「討楊國忠」為名於范陽起兵反唐，長驅南下攻陷東都洛陽稱帝，國號大燕。次年攻破潼關逼陷長安。引發長達八年之浩劫，導致盛唐轉衰。最終因眼疾暴虐，為其子安慶緒所弒。',
    keyAchievements: [
      '坐擁三鎮精兵引發「安史之亂」，攻破洛陽長安兩京'
    ],
    famousQuotes: ['臣胡兒，心無他，唯知有陛下！'],
    relations: [
      { figureId: 'li_longji', relationType: 'rival', label: '背叛恩寵之叛臣' },
      { figureId: 'yang_guifei', relationType: 'other', label: '認作乾娘之義子' },
      { figureId: 'shi_siming', relationType: 'colleague', label: '安史叛軍盟首' },
      { figureId: 'guo_ziyi', relationType: 'rival', label: '收復兩京之死敵' }
    ]
  },
  {
    id: 'shi_siming',
    name: '史思明',
    courtesyName: '思明',
    posthumousName: '大燕昭武皇帝',
    birthDeathDisplay: '703年 - 761年',
    birthYear: 703,
    deathYear: 761,
    nativePlaceAncient: '營州 柳城',
    nativePlaceModern: '遼寧省朝陽市',
    faction: 'fanzhen',
    roles: ['平盧節度副使', '大燕應天皇帝', '安史梟雄'],
    avatar: 'images/figures/fig_shi_siming.svg',
    bio: '突厥族將領，與安祿山同鄉。勇悍善戰，狡詐殘忍。安祿山死後，殺安慶緒奪其位，於范陽稱帝。率軍再度攻陷東都洛陽，多次擊敗唐軍。後為其子史朝義所殺。安史二氏反叛禍延八年，華夏中原幾成廢墟。',
    keyAchievements: [
      '相州解圍擊潰六十萬唐軍主力',
      '二度攻陷洛陽，禍亂中原'
    ],
    famousQuotes: ['兵者兇器，非殘忍不可得天下！'],
    relations: [
      { figureId: 'an_lushan', relationType: 'colleague', label: '安史之亂同盟' },
      { figureId: 'li_guangbi', relationType: 'rival', label: '太原河陽宿敵' }
    ]
  },
  {
    id: 'huang_chao',
    name: '黃巢',
    courtesyName: '黃巢',
    posthumousName: '大齊承天應運啟聖皇帝',
    birthDeathDisplay: '820年 - 884年',
    birthYear: 820,
    deathYear: 884,
    nativePlaceAncient: '曹州 冤句',
    nativePlaceModern: '山東省菏澤市牡丹區',
    faction: 'other',
    roles: ['農民起義領袖', '大齊皇帝', '晚唐終結者'],
    avatar: 'images/figures/fig_huang_chao.jpg',
    bio: '曹州鹽商出身，多次應進士舉不第。乾符二年響應王仙芝起義，後任起義軍總領，號「沖天大將軍」。轉戰中原、江淮、嶺南（攻破廣州），廣明元年（880年）大軍攻破潼關入長安，唐僖宗逃蜀。黃巢即皇帝位於含元殿，國號「大齊」。後因部將朱溫叛變歸唐，沙陀李克用率騎兵進攻，起義軍糧盡退守陳州，最終於狼虎谷兵敗自刎。徹底敲響大唐帝國覆亡之喪鐘。',
    keyAchievements: [
      '橫掃大半天下，攻破長安建立大齊政權',
      '徹底摧毀唐朝關隴門閥與中央集權，拉開五代序幕'
    ],
    famousQuotes: [
      '待到秋來九月八，我花開後百花殺。沖天香陣透長安，滿城盡帶黃金甲！',
      '颯颯西風滿院栽，蕊寒香冷蝶難來。他年我若為青帝，報與桃花一處開。'
    ],
    relations: [
      { figureId: 'zhu_wen', relationType: 'rival', label: '叛變之大齊降唐部將' },
      { figureId: 'li_keyong', relationType: 'rival', label: '鎮壓起義之沙陀死敵' }
    ]
  },

  // --- 6. 晚唐落幕與五代十國 ---
  {
    id: 'zhu_wen',
    name: '朱溫 (朱全忠/後梁太祖)',
    courtesyName: '第三',
    posthumousName: '太祖神武元聖孝皇帝',
    birthDeathDisplay: '852年 - 912年',
    birthYear: 852,
    deathYear: 912,
    nativePlaceAncient: '宋州 碭山',
    nativePlaceModern: '安徽省宿州市碭山縣',
    faction: 'fiveDynasties',
    roles: ['後梁開國皇帝', '宣武軍節度使', '五代第一人'],
    avatar: 'images/figures/fig_zhu_wen.jpg',
    bio: '後梁開國皇帝。早年投黃巢起義軍任同州防禦使，後叛齊降唐，唐僖宗賜名「全忠」。任宣武節度使坐鎮開封汴州，兼併各路藩鎮。西元904年遷都洛陽並弒唐昭宗；907年逼唐哀帝禪位，建立後梁，定都開封，唐朝正式覆亡，開啟五代十國五十年亂局。為人兇悍善戰然性情殘忍，晚年內訌為次子朱友珪所弒。',
    keyAchievements: [
      '篡唐建梁建立五代之首「後梁」，遷都開封',
      '開闢五代十國各方逐鹿中原之大亂局'
    ],
    famousQuotes: ['天道難知，英雄乘時自當問鼎中原！'],
    relations: [
      { figureId: 'huang_chao', relationType: 'rival', label: '背叛之昔日舊主' },
      { figureId: 'li_keyong', relationType: 'rival', label: '上源驛結怨·終生宿敵' }
    ]
  },
  {
    id: 'li_keyong',
    name: '李克用 (獨眼龍)',
    courtesyName: '翼聖',
    posthumousName: '後唐太祖武皇帝',
    birthDeathDisplay: '856年 - 908年',
    birthYear: 856,
    deathYear: 908,
    nativePlaceAncient: '神武川新城',
    nativePlaceModern: '山西省朔州市朔城區',
    faction: 'fiveDynasties',
    roles: ['河東節度使', '晉王', '沙陀猛將', '十三太保之父'],
    avatar: 'images/figures/fig_li_keyong.jpg',
    bio: '沙陀突厥名將，祖上賜姓李。一目失明，號「獨眼龍」，軍中又號「飛虎子」。其部隊皆著黑衣，名震天下之「鴉軍」。率沙陀鐵騎南下平定黃巢起義收復長安，封晉王、河東節度使，坐鎮太原。與朱溫在上源驛遇刺結怨，半生征戰不休。臨終交予長子李存勖「三支箭」，囑咐消滅後梁、幽州劉仁恭與契丹，存勖果全其志。',
    keyAchievements: [
      '率沙陀鴉軍平定黃巢長安之亂',
      '奠定河東晉國基業，臨終授三矢成全後唐代梁'
    ],
    famousQuotes: ['此三矢，一矢討劉仁恭，一矢擊契丹，一矢滅朱溫！'],
    relations: [
      { figureId: 'zhu_wen', relationType: 'rival', label: '上源驛死敵 / 梁晉爭霸' },
      { figureId: 'li_cunxu', relationType: 'family', label: '長子 / 後唐開國莊宗' }
    ]
  },
  {
    id: 'li_cunxu',
    name: '李存勖 (後唐莊宗)',
    courtesyName: '亞子',
    posthumousName: '光聖神閔孝皇帝',
    birthDeathDisplay: '885年 - 926年',
    birthYear: 885,
    deathYear: 926,
    nativePlaceAncient: '代州 雁門',
    nativePlaceModern: '山西省忻州市代縣',
    faction: 'fiveDynasties',
    roles: ['後唐開國皇帝', '五代戰神', '伶官皇帝'],
    avatar: 'images/figures/fig_li_cunxu.jpg',
    bio: '晉王李克用長子。勇毅絕人，精通音律與兵法。遵父命三矢之志，柏鄉之戰破後梁大軍，滅幽州劉守光，夾河血戰十年，西元923年稱帝建立「後唐」，直搗開封滅後梁，收復河北中原與前蜀，武功赫赫冠絕五代。然即位後自號「李天下」，沉湎伶人戲曲，信用宦官寵妃，殺戮良將，終致兵變殞命。',
    keyAchievements: [
      '柏鄉大捷克梁軍精銳，滅後梁統一天下中原',
      '攻滅前蜀，武功威震天下'
    ],
    famousQuotes: ['生子當如李亞子，克用為不亡矣！'],
    relations: [
      { figureId: 'li_keyong', relationType: 'family', label: '父王 / 繼承三矢之志' },
      { figureId: 'zhu_wen', relationType: 'rival', label: '滅梁宿敵' }
    ]
  },
  {
    id: 'shi_jingtang',
    name: '石敬瑭 (後晉高祖)',
    courtesyName: '敬瑭',
    posthumousName: '聖文章武明德孝皇帝',
    birthDeathDisplay: '892年 - 942年',
    birthYear: 892,
    deathYear: 942,
    nativePlaceAncient: '太原',
    nativePlaceModern: '山西省太原市',
    faction: 'fiveDynasties',
    roles: ['後晉開國皇帝', '河東節度使', '兒皇帝'],
    avatar: 'images/figures/fig_shi_jingtang.jpg',
    bio: '沙陀人，後唐明宗李嗣源之婿。任河東節度使坐鎮太原。與後唐末帝不睦反叛，為求自保，向北面契丹遼太祖耶律德光求援，甘稱「兒皇帝」，並割讓幽雲十六州（含北京、大同等北方門戶），歲貢帛三十萬匹。借契丹兵滅後唐，建立後晉。割讓幽雲致使中原農耕文明失去長城屏障四百餘年，歷來受歷史深切撻伐。',
    keyAchievements: [
      '借契丹騎兵建立後晉，定都開封',
      '割讓燕雲十六州，深刻改變中原與草原四百年攻守格局'
    ],
    famousQuotes: ['請稱兒皇帝，以幽薊十六州為謝！'],
    relations: [
      { figureId: 'yelv_abaoji', relationType: 'other', label: '奉契丹為父國' }
    ]
  },
  {
    id: 'chai_rong',
    name: '柴榮 (郭榮/周世宗)',
    courtesyName: '榮',
    posthumousName: '世宗睿武孝文皇帝',
    birthDeathDisplay: '921年 - 959年',
    birthYear: 921,
    deathYear: 959,
    nativePlaceAncient: '邢州 堯山',
    nativePlaceModern: '河北省邢台市隆堯縣',
    faction: 'fiveDynasties',
    roles: ['後周第二代皇帝', '周世宗', '五代第一名君'],
    avatar: 'images/figures/fig_chai_rong.jpg',
    bio: '後周太祖郭威內侄兼養子。五代十國最具雄才大略之英明君主。即位之初面臨北漢與契丹聯軍大兵壓境，於「高平之戰」親冒矢石衝鋒大破強敵；隨後改革禁軍、整飭吏治、興修水利、減免賦稅、嚴禁私鑄私度僧尼（世宗滅佛）。先後西敗後蜀取秦鳳四州、南征南唐三戰全勝盡奪江北十四州、北伐契丹收復莫瀛三州關南之地。英年早逝，年僅三十九歲，為趙匡胤陳橋兵變建立大宋一統格局打下最堅實之根基。',
    keyAchievements: [
      '高平之戰破強敵，大刀闊斧整飭後周禁軍',
      '南征南唐奪江北、西取後蜀、北伐契丹收復關南',
      '廓清五代亂世乾坤，為宋代大一統奠定最關鍵基石'
    ],
    famousQuotes: [
      '朕當以十年開拓天下，十年養百姓，十年致太平足矣！',
      '身先士卒，何懼矢石！'
    ],
    relations: [
      { figureId: 'zhao_kuangyin_young', relationType: 'monarch-subject', label: '殿前都點檢 / 軍中股肱' },
      { figureId: 'feng_dao', relationType: 'monarch-subject', label: '直臣良佐' }
    ]
  },
  {
    id: 'feng_dao',
    name: '馮道 (可道)',
    courtesyName: '可道',
    posthumousName: '文懿公 / 長樂老',
    birthDeathDisplay: '882年 - 954年',
    birthYear: 882,
    deathYear: 954,
    nativePlaceAncient: '瀛州 景城',
    nativePlaceModern: '河北省滄州市泊頭市',
    faction: 'fiveDynasties',
    roles: ['宰相', '中書令', '太師', '長樂老', '雕版九經印製者'],
    avatar: 'images/figures/fig_feng_dao.jpg',
    bio: '五代著名傳奇宰相。歷仕後唐、後晉、後契丹、後漢、後周五朝，侍奉十一位君主，拜相二十餘年，自號「長樂老」。在殘暴戰亂之五代亂世，馮道庇護黎庶百姓，勸阻契丹耶律德光濫殺中原無辜，主持官方首次以木板大規模雕版刻印「儒家九經」，使華夏經典得以在亂世完整保存流傳。宋代歐陽修斥其不事一姓，然明清以降多肯定其護國安民之功。',
    keyAchievements: [
      '主持官方首次雕版印刷《九經》，使華夏文脈於五代兵燹得以不滅',
      '於五代十帝更迭中化解暴政，庇護中原億萬生民'
    ],
    famousQuotes: [
      '莫為危時便沮喪，浮生長恨歡娛少。',
      '契丹問何以救中原百姓，道曰：此時佛出亦救不得，惟皇帝救得！'
    ],
    relations: [
      { figureId: 'chai_rong', relationType: 'monarch-subject', label: '後周三朝太師' }
    ]
  },
  {
    id: 'li_yu_nanTang',
    name: '李煜 (重光/南唐後主)',
    courtesyName: '重光',
    posthumousName: '南唐後主 / 詞中之帝',
    birthDeathDisplay: '937年 - 978年',
    birthYear: 937,
    deathYear: 978,
    nativePlaceAncient: '徐州 彭城',
    nativePlaceModern: '江蘇省徐州市',
    faction: 'fiveDynasties',
    roles: ['南唐最後一位國君', '詞中之帝', '文學宗師'],
    avatar: 'images/figures/fig_li_yu_nanTang.jpg',
    bio: '南唐中主李璟第六子。性情溫仁，博學多藝，精通書法繪畫與音律。西元961年即位於金陵，臣服宋朝以保境息民。開寶八年（975年）宋軍渡江破金陵，李煜肉袒出降被俘入汴京，封「違命侯」。亡國入宋後，詞風由宮廷綺麗急轉為血淚浸染之亡國悲歌，以帝王身寫千古情愁，將詞之藝術境界推向空前絕後之巔峰，被尊為「詞中之帝」。最終為宋太宗賜牽機藥毒殺。',
    keyAchievements: [
      '詞中之帝，將五代婉約詞提升至博大深沉之生命悲歌境界',
      '《虞美人》《浪淘沙》《相見歡》千古絕唱'
    ],
    famousQuotes: [
      '問君能有幾多愁？恰似一江春水向東流。',
      '剪不斷，理還亂，是離愁，別是一般滋味在心頭。',
      '流水落花春去也，天上人間。'
    ],
    relations: [
      { figureId: 'chai_rong', relationType: 'rival', label: '南唐北敵' },
      { figureId: 'zhao_kuangyin_young', relationType: 'rival', label: '北宋滅南唐俘虜其人' }
    ]
  },
  {
    id: 'zhao_kuangyin_young',
    name: '趙匡胤 (後周殿前都點檢)',
    courtesyName: '元朗',
    posthumousName: '宋太祖',
    birthDeathDisplay: '927年 - 976年',
    birthYear: 927,
    deathYear: 976,
    nativePlaceAncient: '涿郡 / 洛陽 夾馬營',
    nativePlaceModern: '河南省洛陽市瀍河區',
    faction: 'fiveDynasties',
    roles: ['後周殿前都點檢', '歸德軍節度使', '宋朝開國皇帝'],
    avatar: 'images/figures/fig_zhao_kuangyin_young.jpg',
    bio: '生於洛陽夾馬營。早年投奔郭威，高平之戰身先士卒斬將奪旗，深受周世宗柴榮器重，擢升殿前都點檢，執掌後周中央禁軍宿衛精銳。隨柴榮南征北討屢建奇功。顯慶五年（960年）世宗幼子即位，匡胤率軍北上禦敵，於陳橋驛發動黃袍加身兵變，建立大宋王朝，拉開宋代統一天下大幕。',
    keyAchievements: [
      '高平之戰勇救周世宗立下奇功，執掌殿前禁軍',
      '陳橋兵變建立大宋，終結五代十國半世紀大分裂'
    ],
    famousQuotes: ['臥榻之側，豈容他人鼾睡！'],
    relations: [
      { figureId: 'chai_rong', relationType: 'monarch-subject', label: '世宗愛將 / 託孤重臣' }
    ]
  },
  {
    id: 'yelv_abaoji',
    name: '耶律阿保機 (天皇帝/遼太祖)',
    courtesyName: '阿保機',
    posthumousName: '大聖大明神烈天皇帝',
    birthDeathDisplay: '872年 - 926年',
    birthYear: 872,
    deathYear: 926,
    nativePlaceAncient: '契丹 迭剌部',
    nativePlaceModern: '內蒙古自治區赤峰市阿魯科爾沁旗',
    faction: 'nomadic',
    roles: ['大契丹國開國皇帝', '遼太祖', '草原雄主'],
    avatar: 'images/figures/fig_yelv_abaoji.jpg',
    bio: '契丹迭剌部首領。西元907年被選為可汗，憑藉雄才大略統一契丹八部，消滅奚、阻卜等北方諸部。916年建大契丹國，建元神冊，稱天皇帝。創制契丹大字與小字，設「因俗而治」南北兩面官制度（北面官管契丹部族，南面官治漢地漢民）。出兵東滅渤海國改為東丹國。奠定遼帝國二百餘年基業。',
    keyAchievements: [
      '統一契丹八部建立大契丹國，創立契丹文字',
      '開創「以漢制治漢人，以國制治契丹」之南北面官二元制度',
      '消滅東北渤海國，拓土萬里'
    ],
    famousQuotes: ['天生英雄，當撫萬民而有天下！'],
    relations: [
      { figureId: 'shi_jingtang', relationType: 'other', label: '契丹立兒皇帝之後援' }
    ]
  }
];
