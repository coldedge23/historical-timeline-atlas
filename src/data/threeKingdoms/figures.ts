import { HistoricalPerson } from '../../types/history';

export const THREE_KINGDOMS_FIGURES: HistoricalPerson[] = [
  {
    id: 'cao_cao',
    name: '曹操',
    courtesyName: '孟德',
    artName: '吉利 / 小字阿瞞',
    posthumousName: '魏武帝',
    birthDeathDisplay: '155年 - 220年',
    birthYear: 155,
    deathYear: 220,
    nativePlaceAncient: '豫州 沛國譙縣',
    nativePlaceModern: '安徽省亳州市譙城區',
    faction: 'wei',
    roles: ['曹魏奠基者', '丞相', '魏王', '軍事家', '文學家（建安風骨）'],
    avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&auto=format&fit=crop&q=80',
    bio: '東漢末年傑出的政治家、軍事家、文學家與書法家，三國時代曹魏政權的實際締造者。青年時被許劭評為「治世之能臣，亂世之奸雄」。在董卓亂政後起兵討董，迎奉漢獻帝遷都許昌，「挾天子以令諸侯」。透過實施屯田制、唯才是舉，平定官渡之戰擊敗袁紹，基本統一了中國北方。雖在赤壁之戰受挫，但穩固了北方基業。',
    keyAchievements: [
      '推行「屯田制」，解決軍糧短缺並穩定北方流民',
      '提倡「唯才是舉」，三下求賢令，打破士族世襲門第',
      '官渡之戰以弱勝強，奠定統一黃河流域基礎',
      '建安文學領袖，代表作《短歌行》、《觀滄海》、《龜雖壽》'
    ],
    famousQuotes: [
      '周公吐哺，天下歸心。',
      '老驥伏櫪，志在千里；烈士暮年，壯心不已。',
      '寧我負人，毋人負我。（語出《三國志》裴注《孫盛異同雜記》）'
    ],
    relations: [
      { figureId: 'liu_bei', relationType: 'rival', label: '煮酒論英雄之宿敵' },
      { figureId: 'sun_quan', relationType: 'rival', label: '生子當如孫仲謀之對手' },
      { figureId: 'guo_jia', relationType: 'advisor', label: '倚重深謀之首席軍師' },
      { figureId: 'sima_yi', relationType: 'monarch-subject', label: '察其鷹視狼顧之重臣' }
    ],
    participatedEventIds: ['evt_yellow_turban_184', 'evt_luoyang_burned_189', 'evt_xuchang_capital_196', 'evt_guandu_200', 'evt_chibi_208', 'evt_weiking_216', 'evt_caocao_death_220']
  },
  {
    id: 'liu_bei',
    name: '劉備',
    courtesyName: '玄德',
    posthumousName: '漢昭烈帝 / 先主',
    birthDeathDisplay: '161年 - 223年',
    birthYear: 161,
    deathYear: 223,
    nativePlaceAncient: '幽州 涿郡涿縣',
    nativePlaceModern: '河北省保定市涿州市',
    faction: 'shu',
    roles: ['蜀漢開國皇帝', '政治家', '軍事家'],
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    bio: '漢景帝之子中山靖王劉勝後裔，蜀漢的開國君主。早年家貧，與母織蓆販履為業。黃巾之亂中與關羽、張飛結為兄弟起兵。一生歷經多次顛沛流離，先後投靠公孫瓚、陶謙、曹操、袁紹與劉表。屯兵新野時三顧茅廬請出諸葛亮，採納「隆中對」，聯合孫權取得赤壁之戰勝利，奪取荊州與益州，建立蜀漢政權。夷陵戰敗後崩於白帝城。',
    keyAchievements: [
      '以「仁德」聚攬天下英才，深獲百姓軍民愛戴',
      '三顧茅廬得諸葛亮，奠定跨有荊益的三足鼎立構想',
      '奪取益州與漢中，自立漢中王並稱帝延續漢室正統'
    ],
    famousQuotes: [
      '勿以惡小而為之，勿以善小而不為。惟賢惟德，能服於人。',
      '孤之有孔明，猶魚之有水也。'
    ],
    relations: [
      { figureId: 'zhuge_liang', relationType: 'monarch-subject', label: '如魚得水之君臣' },
      { figureId: 'guan_yu', relationType: 'family', label: '恩若兄弟之結義大將' },
      { figureId: 'cao_cao', relationType: 'rival', label: '天下英雄唯使君與操耳' },
      { figureId: 'sun_quan', relationType: 'ally', label: '孫劉聯盟（後破裂）' }
    ],
    participatedEventIds: ['evt_yellow_turban_184', 'evt_longzhong_207', 'evt_chibi_208', 'evt_take_yizhou_214', 'evt_hanzhong_219', 'evt_shu_found_221', 'evt_yiling_222', 'evt_liubei_death_223']
  },
  {
    id: 'sun_quan',
    name: '孫權',
    courtesyName: '仲謀',
    posthumousName: '吳大帝',
    birthDeathDisplay: '182年 - 252年',
    birthYear: 182,
    deathYear: 252,
    nativePlaceAncient: '揚州 吳郡富春縣',
    nativePlaceModern: '浙江省杭州市富陽區',
    faction: 'wu',
    roles: ['東吳開國皇帝', '戰略家', '軍事家'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: '三國時代東吳的建立者，孫堅次子，孫策之弟。十九歲接掌江東基業，孫策臨終稱其「舉賢任能，使各盡力以保江東，我不如卿」。重用周瑜、魯肅、呂蒙、陸遜等傑出將相。赤壁之戰果斷抗曹，擊潰曹操大軍；後襲取荊州，在夷陵之戰中大破劉備蜀軍，成功鼎立江東。黃龍二年（229年）稱帝，曾遣衛溫、諸葛直率萬人艦隊航行至「夷洲」（今台灣），是中國文獻中官方抵台的最早紀錄之一。',
    keyAchievements: [
      '穩固江東六郡，開闢山越，大力開發南方經濟',
      '任用周瑜大破曹操於赤壁，任用陸遜破劉備於夷陵',
      '派遣船隊遠航夷洲（今台灣）與亶洲，拓展海洋經略',
      '正式建國建都建業（今南京），奠定南方六朝古都之基'
    ],
    famousQuotes: [
      '能用眾力，則無敵於天下矣；能用眾智，則無畏於聖人矣。'
    ],
    relations: [
      { figureId: 'zhou_yu', relationType: 'monarch-subject', label: '託付生死之軍政都督' },
      { figureId: 'lu_xun', relationType: 'monarch-subject', label: '夷陵破敵之棟樑之臣' },
      { figureId: 'liu_bei', relationType: 'ally', label: '郎舅之盟與荊州之爭' },
      { figureId: 'cao_cao', relationType: 'rival', label: '江東拒曹六十年' }
    ],
    participatedEventIds: ['evt_chibi_208', 'evt_jingzhou_lost_219', 'evt_yiling_222', 'evt_wu_found_229', 'evt_taiwan_expedition_230']
  },
  {
    id: 'zhuge_liang',
    name: '諸葛亮',
    courtesyName: '孔明',
    artName: '臥龍先生',
    posthumousName: '忠武侯',
    birthDeathDisplay: '181年 - 234年',
    birthYear: 181,
    deathYear: 234,
    nativePlaceAncient: '徐州 琅邪郡陽都縣',
    nativePlaceModern: '山東省臨沂市沂南縣',
    faction: 'shu',
    roles: ['蜀漢丞相', '傑出政治家', '軍事家', '發明家'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: '三國時期蜀漢丞相，被譽為中國古代智慧的化身與忠臣楷模。隱居襄陽隆中時，提出著名的「隆中對」戰略構想。輔佐劉備聯孫抗曹，建立蜀漢。劉備逝世後受託孤之重，輔佐後主劉禪。對內平定南中叛亂，實行「攻心為上」安撫南蠻；對外五次北伐中原，鞠躬盡瘁，最終病逝於五丈原軍中。發明木牛流馬、諸葛連弩，推演八陣圖。',
    keyAchievements: [
      '提出戰略綱領「隆中對」，擘劃三足鼎立藍圖',
      '七擒孟獲平定南中，使西南各民族融入國家治理',
      '撰寫傳世名篇《出師表》，展現「鞠躬盡力，死而後已」精神',
      '改進弩機、研發木牛流馬，軍事工程與律法制度卓越'
    ],
    famousQuotes: [
      '鞠躬盡力，死而後已。',
      '非淡泊無以明志，非寧靜無以致遠。',
      '親賢臣，遠小人，此先漢所以興隆也。'
    ],
    relations: [
      { figureId: 'liu_bei', relationType: 'monarch-subject', label: '三顧茅廬託孤忠臣' },
      { figureId: 'sima_yi', relationType: 'rival', label: '五丈原之智力對決' },
      { figureId: 'guan_yu', relationType: 'ally', label: '蜀漢內政軍事兩大支柱' }
    ],
    participatedEventIds: ['evt_longzhong_207', 'evt_chibi_208', 'evt_take_yizhou_214', 'evt_shu_found_221', 'evt_nanman_225', 'evt_northern_expedition_228', 'evt_wuzhang_234']
  },
  {
    id: 'guan_yu',
    name: '關羽',
    courtesyName: '雲長',
    artName: '美髯公',
    posthumousName: '壯繆侯 / 武聖',
    birthDeathDisplay: '160年 - 220年',
    birthYear: 160,
    deathYear: 220,
    nativePlaceAncient: '司隸 河東郡解縣',
    nativePlaceModern: '山西省運城市鹽湖區解州鎮',
    faction: 'shu',
    roles: ['蜀漢五虎上將之首', '前將軍', '漢壽亭侯'],
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
    bio: '蜀漢開國名將，與劉備、張飛情同手足。曾斬顏良解白馬之圍，被曹操封為漢壽亭侯，後過關斬將重返劉備身邊。長年坐鎮戰略要地荊州。建安二十四年（219年）發動襄樊之戰，水淹曹魏七軍，生擒于禁，斬殺龐德，威震華夏，逼得曹操一度考慮遷都。後遭東吳呂蒙白衣渡江偷襲後方，失掉荊州，敗走麥城遇害。後世尊為「武聖」。',
    keyAchievements: [
      '白馬斬顏良，解白馬之圍',
      '襄樊之戰水淹七軍，威震華夏',
      '忠義勇武兼備，成為華人文化圈重要的忠義信仰神祇'
    ],
    famousQuotes: [
      '玉可碎而不可改其白，竹可焚而不可毀其節。'
    ],
    relations: [
      { figureId: 'liu_bei', relationType: 'family', label: '恩若兄弟之主公' },
      { figureId: 'cao_cao', relationType: 'rival', label: '厚待而終不相負之對手' },
      { figureId: 'zhuge_liang', relationType: 'advisor', label: '隆中戰略的荊州防守者' }
    ],
    participatedEventIds: ['evt_yellow_turban_184', 'evt_guandu_200', 'evt_chibi_208', 'evt_fancheng_219', 'evt_jingzhou_lost_219']
  },
  {
    id: 'zhou_yu',
    name: '周瑜',
    courtesyName: '公瑾',
    artName: '周郎',
    posthumousName: '吳大都督',
    birthDeathDisplay: '175年 - 210年',
    birthYear: 175,
    deathYear: 210,
    nativePlaceAncient: '揚州 廬江郡舒縣',
    nativePlaceModern: '安徽省合肥市廬江縣',
    faction: 'wu',
    roles: ['東吳大都督', '軍事家', '音樂家（曲有誤周郎顧）'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: '東吳傑出的軍事統帥與政治家。出身江東大族，容貌俊美，精通音律，人稱「美周郎」。青年時期與孫策交好，二人總角之好，共同開闢江東。孫策遇刺後全力輔佐孫權。建安十三年曹操率數十萬大軍南侵，周瑜力主抗曹，任前線大都督，在赤壁以火攻大破曹軍，一舉奠定天下三分之雛形。隨後攻克南郡，策劃取蜀之際英年早逝，年僅三十六歲。',
    keyAchievements: [
      '赤壁之戰運籌帷幄，指揮孫劉聯軍以數萬破曹軍二十餘萬',
      '力主攻取南郡與巴蜀，提出早期的「天下二分」戰略',
      '性情度量宏大，深得將領推崇，程普稱「與周公瑾交，若飲醇醪」'
    ],
    famousQuotes: [
      '此天以卿二人贊孤也！（孫權評周瑜與魯肅）'
    ],
    relations: [
      { figureId: 'sun_quan', relationType: 'monarch-subject', label: '江東柱石與大都督' },
      { figureId: 'cao_cao', relationType: 'rival', label: '赤壁烈火之擊退者' },
      { figureId: 'zhuge_liang', relationType: 'rival', label: '同盟抗曹之智囊博弈' }
    ],
    participatedEventIds: ['evt_chibi_208']
  },
  {
    id: 'sima_yi',
    name: '司馬懿',
    courtesyName: '仲達',
    posthumousName: '晉宣帝 / 高祖',
    birthDeathDisplay: '179年 - 251年',
    birthYear: 179,
    deathYear: 251,
    nativePlaceAncient: '司隸 河內郡溫縣',
    nativePlaceModern: '河南省焦作市溫縣',
    faction: 'wei',
    roles: ['曹魏太傅', '大都督', '西晉王朝奠基者'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    bio: '三國時期曹魏傑出的軍事家、政治家，西晉實質奠基人。出身名門河內司馬氏。早年隱忍不仕，後入曹操幕府。曹丕即位後受重用，任撫軍大將軍。曹叡時期多次抵禦諸葛亮北伐，在五丈原採取堅壁清野策略耗竭蜀軍。晚年在高平陵之變中誅殺大將軍曹爽，掌控曹魏朝政大權，為其孫司馬炎代魏建晉奠定基礎。',
    keyAchievements: [
      '成功抵禦蜀漢諸葛亮、姜維多次北伐，力保中原腹地不失',
      '平定遼東公孫淵叛亂，遠征襄平穩定東北邊陲',
      '發動「高平陵之變」，徹底改變三國走向與中原政局'
    ],
    famousQuotes: [
      '夫將兵者，不戰而屈人之兵，善之善者也。',
      '亮平生謹慎，未敢造次。（司馬懿評諸葛亮）'
    ],
    relations: [
      { figureId: 'cao_cao', relationType: 'monarch-subject', label: '顧忌其狼顧相之初代主公' },
      { figureId: 'zhuge_liang', relationType: 'rival', label: '一生最敬畏之兵法勁敵' }
    ],
    participatedEventIds: ['evt_wuzhang_234', 'evt_gaopingling_249']
  },
  {
    id: 'lu_xun',
    name: '陸遜',
    courtesyName: '伯言',
    posthumousName: '昭侯',
    birthDeathDisplay: '183年 - 245年',
    birthYear: 183,
    deathYear: 245,
    nativePlaceAncient: '揚州 吳郡吳縣',
    nativePlaceModern: '江蘇省蘇州市',
    faction: 'wu',
    roles: ['東吳丞相', '大都督', '軍事家'],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    bio: '東吳著名軍事統帥與政治家。出身吳中四大家族之陸氏。建安二十四年協助呂蒙襲取荊州，設計示弱麻痺關羽。章武二年（222年）夷陵之戰中任大都督，面對劉備親率蜀軍主力，採取堅守不戰耗其銳氣，最終於盛夏利用火攻「火燒連營七百里」，大破蜀漢精銳。後官至丞相，晚年因捲入孫權「南魯黨爭」憂憤而終。',
    keyAchievements: [
      '設計誘騙關羽，助力呂蒙白衣渡江奪取荊州',
      '夷陵之戰火燒連營七百里，化解東吳亡國危機',
      '石亭之戰大破魏軍曹休，鞏固東吳北方防線'
    ],
    famousQuotes: [
      '備是猾虜，更嘗事多，其軍始集，思慮精專，未可干也。'
    ],
    relations: [
      { figureId: 'sun_quan', relationType: 'monarch-subject', label: '臨危受命之社稷之臣' },
      { figureId: 'liu_bei', relationType: 'rival', label: '夷陵對陣擊潰昭烈帝' }
    ],
    participatedEventIds: ['evt_jingzhou_lost_219', 'evt_yiling_222', 'evt_wu_found_229']
  }
];
