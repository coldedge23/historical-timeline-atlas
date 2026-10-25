// Legendary Historical Figures of Qin-Han Empire (206 BCE - 184 CE)
export const QIN_HAN_FIGURES = [
  {
    id: 'liu_bang',
    name: '劉邦',
    courtesyName: '季',
    posthumousName: '漢太祖高皇帝',
    birthDeathDisplay: '前256年 - 前195年',
    birthYear: -256,
    deathYear: -195,
    nativePlaceAncient: '泗水郡 沛縣豐邑中陽里',
    nativePlaceModern: '江蘇省徐州市豐縣',
    faction: 'han',
    roles: ['西漢開國皇帝', '政治家', '戰略家'],
    avatar: './images/figures/liu_bang.jpg',
    bio: '大漢王朝開國皇帝，廟號太祖，諡號高皇帝。出身農家，初任沛縣泗水亭長。陳勝起義後起兵反秦，稱沛公。約法三章先入咸陽，受封漢王就國漢中。拜韓信為大將軍，明修棧道暗度陳倉平定三秦。經四年楚漢相爭滅項羽，於前202年登基稱帝，建立大漢王朝。推行黃老治術、休養生息，奠定漢室四百年基業。',
    keyAchievements: [
      '先入咸陽廢除秦苛法並「約法三章」深收民心',
      '知人善任，聚蕭何、張良、韓信「漢初三傑」逐鹿天下',
      '擊滅西楚霸王項羽，開創四百年大漢帝國'
    ],
    famousQuotes: [
      '大風起兮雲飛揚，威加海內兮歸故鄉，安得猛士兮守四方！',
      '夫運籌帷幄之中，決勝千里之外，吾不如子房；鎮國家，撫百姓，吾不如蕭何；連百萬之軍，戰必勝，攻必取，吾不如韓信。此三者，皆人傑也，吾能用之，此吾所以取天下也。'
    ],
    relations: [
      { figureId: 'zhang_liang', relationType: 'advisor', label: '運籌帷幄之謀臣' },
      { figureId: 'xiao_he', relationType: 'colleague', label: '鎮國撫民之後盾' },
      { figureId: 'han_xin', relationType: 'monarch-subject', label: '拜壇拜將之統帥' },
      { figureId: 'xiang_yu', relationType: 'rival', label: '楚漢相爭之宿敵' },
      { figureId: 'lv_zhi', relationType: 'family', label: '結髮患難之后妃' }
    ],
    participatedEventIds: ['evt_liubang_guanzhong_206', 'evt_chencang_206', 'evt_pengcheng_205', 'evt_gaixia_202', 'evt_baideng_200']
  },
  {
    id: 'xiang_yu',
    name: '項羽',
    courtesyName: '籍',
    posthumousName: '西楚霸王',
    birthDeathDisplay: '前232年 - 前202年',
    birthYear: -232,
    deathYear: -202,
    nativePlaceAncient: '楚國 下相',
    nativePlaceModern: '江蘇省宿遷市宿城區',
    faction: 'other',
    roles: ['西楚霸王', '統帥', '軍事家'],
    avatar: './images/figures/xiang_yu.jpg',
    bio: '楚國名將項燕之孫，中國歷史上最具傳奇色彩的軍事家、統帥，號稱「西楚霸王」。力能扛鼎，才氣過人。鉅鹿之戰破釜沉舟，以三萬楚軍全殲秦軍主力，威震海內。入關分封天下十八諸侯。在楚漢相爭中彭城之戰以三萬騎破劉邦五十六萬，後遭韓信十面埋伏合圍於垓下，突圍至烏江拔劍自刎，留下了霸王別姬之千古悲歌。',
    keyAchievements: [
      '鉅鹿之戰破釜沉舟，以一當十全殲秦軍主力長城軍團',
      '彭城之戰三萬精騎疾馳大破劉邦五十六萬諸侯聯軍',
      '勇武冠絕古今，司馬遷特立於《史記·項羽本紀》'
    ],
    famousQuotes: [
      '力拔山兮氣蓋世，時不利兮騅不逝。騅不逝兮可奈何，虞兮虞兮奈若何！',
      '彼可取而代也。',
      '今日引決，天亡我，非用兵之罪也！'
    ],
    relations: [
      { figureId: 'yu_ji', relationType: 'family', label: '生死相隨之摯愛' },
      { figureId: 'fan_zeng', relationType: 'advisor', label: '尊奉為亞父之謀臣' },
      { figureId: 'liu_bang', relationType: 'rival', label: '定鼎天下之宿敵' },
      { figureId: 'han_xin', relationType: 'rival', label: '垓下決戰之勁敵' }
    ],
    participatedEventIds: ['evt_julu_207', 'evt_liubang_guanzhong_206', 'evt_pengcheng_205', 'evt_gaixia_202']
  },
  {
    id: 'han_xin',
    name: '韓信',
    courtesyName: '無字',
    posthumousName: '淮陰侯',
    birthDeathDisplay: '前231年 - 前196年',
    birthYear: -231,
    deathYear: -196,
    nativePlaceAncient: '淮陰縣',
    nativePlaceModern: '江蘇省淮安市淮陰區',
    faction: 'han',
    roles: ['漢大將軍', '齊王', '楚王', '淮陰侯', '兵仙'],
    avatar: './images/figures/han_xin.jpg',
    bio: '西漢開國第一名將，中國軍事思想集大成者，被後世尊為「兵仙」、「神帥」。早年貧賤忍胯下之辱，投楚不得重用，歸漢經蕭何月下追韓信力薦被劉邦登壇拜為大將軍。提出「漢中對」，暗度陳倉平定三秦，隨後虜魏、破代、井陘背水一戰滅趙降燕，濰水斬龍且平齊，垓下十面埋伏滅項羽，功冠群臣「國士無雙」。',
    keyAchievements: [
      '明修棧道暗度陳倉，神速平定關中三秦大地',
      '井陘之戰「背水一戰，拔旗易幟」，以數萬破趙二十萬',
      '垓下之戰設十面埋伏、四面楚歌，徹底覆滅西楚霸王'
    ],
    famousQuotes: [
      '狡兔死，良狗烹；高鳥盡，良弓藏；敵國破，謀臣亡。',
      '信聞之：智者千慮，必有一失；愚者千慮，必有一得。'
    ],
    relations: [
      { figureId: 'liu_bang', relationType: 'monarch-subject', label: '登壇拜將之君主' },
      { figureId: 'xiao_he', relationType: 'colleague', label: '月下追薦之伯樂' },
      { figureId: 'xiang_yu', relationType: 'rival', label: '垓下合圍之敵手' },
      { figureId: 'li_zuoche', relationType: 'advisor', label: '尊為軍師之奇士' }
    ],
    participatedEventIds: ['evt_chencang_206', 'evt_beishui_204', 'evt_gaixia_202']
  },
  {
    id: 'zhang_liang',
    name: '張良',
    courtesyName: '子房',
    posthumousName: '留文成侯',
    birthDeathDisplay: '前250年 - 前186年',
    birthYear: -250,
    deathYear: -186,
    nativePlaceAncient: '潁川郡 城父',
    nativePlaceModern: '河南省平頂山市寶豐縣',
    faction: 'han',
    roles: ['漢謀聖', '留侯', '戰略家'],
    avatar: './images/figures/zhang_liang.jpg',
    bio: '漢初三傑之一，後世尊為「謀聖」。韓國貴族出身，博浪沙刺秦未遂，圯橋受太公兵書於黃石公。輔佐劉邦起義，鴻門宴智救劉邦脫險；力勸劉邦受封漢中燒絕棧道以麻痺項羽；楚漢相爭中畫「下邑之謀」，促成劉邦聯結韓信、彭越、英布合圍項羽。漢朝建立後功成身退，隨赤松子遊仙道，得享天年。',
    keyAchievements: [
      '圯橋受《太公兵法》，精通天下韜略',
      '鴻門宴臨危應變，保護劉邦安然脫險',
      '策劃「下邑之謀」，促成垓下會師全殲項羽'
    ],
    famousQuotes: [
      '運籌策帷帳之中，決勝於千里之外。',
      '家世相韓，及韓滅，不愛萬金之資，為韓報仇強秦，天下震動。今以三寸舌為帝者師，封萬戶，位列侯，此布衣之極，於良足矣。'
    ],
    relations: [
      { figureId: 'liu_bang', relationType: 'advisor', label: '言聽計從之帝師' },
      { figureId: 'han_xin', relationType: 'colleague', label: '下邑大謀之策劃' },
      { figureId: 'xiao_he', relationType: 'colleague', label: '漢初三傑之同僚' }
    ],
    participatedEventIds: ['evt_liubang_guanzhong_206', 'evt_chencang_206', 'evt_gaixia_202']
  },
  {
    id: 'xiao_he',
    name: '蕭何',
    courtesyName: '無字',
    posthumousName: '酇文終侯',
    birthDeathDisplay: '前257年 - 前193年',
    birthYear: -257,
    deathYear: -193,
    nativePlaceAncient: '泗水郡 沛縣',
    nativePlaceModern: '江蘇省徐州市沛縣',
    faction: 'han',
    roles: ['漢丞相', '酇侯', '政治家'],
    avatar: './images/figures/xiao_he.jpg',
    bio: '漢初三傑之一，大漢開國首任丞相。沛縣功曹出身，早年全力資助劉邦。劉邦入咸陽，諸將爭搶金帛，蕭何獨入丞相御史府收秦律令圖書，使劉邦洞悉天下山川險要戶口。楚漢相爭留守關中，轉漕運糧給軍，源源不斷輸送兵員，使劉邦數蹶復振。制定《九章律》，確立漢朝典章制度，「蕭規曹隨」傳為美談。',
    keyAchievements: [
      '收存秦相府律令圖籍，奠定漢朝天下地理戶口之基',
      '月下追韓信力保國士，促成韓信登壇拜將',
      '楚漢戰爭經營關中，確保漢軍糧道兵源無窮竭'
    ],
    famousQuotes: [
      '諸將易得耳。至如信者，國士無雙。',
      '後世賢，師吾儉；不賢，毋為勢家所奪。'
    ],
    relations: [
      { figureId: 'liu_bang', relationType: 'monarch-subject', label: '推心置腹之股肱' },
      { figureId: 'han_xin', relationType: 'advisor', label: '月下追薦之恩師' },
      { figureId: 'cao_can', relationType: 'colleague', label: '蕭規曹隨之繼任者' }
    ],
    participatedEventIds: ['evt_liubang_guanzhong_206', 'evt_chencang_206']
  },
  {
    id: 'fan_kuai',
    name: '樊噲',
    courtesyName: '無字',
    posthumousName: '舞陽武侯',
    birthDeathDisplay: '前242年 - 前189年',
    birthYear: -242,
    deathYear: -189,
    nativePlaceAncient: '泗水郡 沛縣',
    nativePlaceModern: '江蘇省徐州市沛縣',
    faction: 'han',
    roles: ['漢左丞相', '大將軍', '舞陽侯'],
    avatar: './images/figures/fan_kuai.jpg',
    bio: '大漢開國猛將，初以屠狗為業，隨劉邦起兵。鴻門宴上見形勢危急，持盾拔劍直撞入帳，瞋目視項羽，怒斥其聽讒殺沛公，義正詞嚴，項羽賜酒彘肩稱之為壯士，劉邦得免於難。平定三秦、破項羽、討韓王信、陳豨、盧綰，戰功赫赫，封舞陽侯。娶呂后之妹呂嬃為妻。',
    keyAchievements: [
      '鴻門宴持盾闖帳怒斥項羽，捨命力保劉邦脫險',
      '攻城野戰身先士卒，斬首俘虜無數，封舞陽侯'
    ],
    famousQuotes: [
      '臣死且不避，卮酒安足辭！夫秦王有虎狼之心，殺人如不能舉，刑人如恐不勝，天下皆叛之。'
    ],
    relations: [
      { figureId: 'liu_bang', relationType: 'monarch-subject', label: '生死與共之連襟猛將' },
      { figureId: 'lv_zhi', relationType: 'family', label: '妹夫戚屬' },
      { figureId: 'xiang_yu', relationType: 'rival', label: '鴻門宴直斥對峙' }
    ],
    participatedEventIds: ['evt_liubang_guanzhong_206', 'evt_chencang_206', 'evt_baideng_200']
  },
  {
    id: 'fan_zeng',
    name: '范增',
    courtesyName: '無字',
    posthumousName: '亞父',
    birthDeathDisplay: '前277年 - 前204年',
    birthYear: -277,
    deathYear: -204,
    nativePlaceAncient: '居巢',
    nativePlaceModern: '安徽省巢湖市居巢區',
    faction: 'other',
    roles: ['西楚軍師', '亞父'],
    avatar: './images/figures/fan_zeng.jpg',
    bio: '項羽主要謀士，年七十善計謀。項梁起兵時勸其立楚後以從民望。項羽尊稱其為「亞父」。鴻門宴上數目項羽舉所佩玉玦示意殺劉邦，又命項莊拔劍起舞刺沛公，惜項羽猶豫不決而未果。楚漢相爭中陳平施反間計，項羽疑范增與漢有私，削其權，范增憤而請骸骨歸鄉，途中疽發背而死。',
    keyAchievements: [
      '勸項梁立楚懷王之孫熊心以合民心',
      '鴻門宴洞察劉邦帝王之志，力主誅滅沛公'
    ],
    famousQuotes: [
      '唉！豎子不足與謀！奪項王天下者必沛公也。吾屬今為之虜矣！'
    ],
    relations: [
      { figureId: 'xiang_yu', relationType: 'advisor', label: '尊奉亞父後被反間猜忌' },
      { figureId: 'chen_ping', relationType: 'rival', label: '中陳平反間計負氣出走' }
    ],
    participatedEventIds: ['evt_julu_207', 'evt_liubang_guanzhong_206', 'evt_pengcheng_205']
  },
  {
    id: 'ying_bu',
    name: '英布',
    courtesyName: '無字',
    posthumousName: '淮南王 / 黥布',
    birthDeathDisplay: '前220年 - 前196年',
    birthYear: -220,
    deathYear: -196,
    nativePlaceAncient: '六縣',
    nativePlaceModern: '安徽省六安市裕安區',
    faction: 'other',
    roles: ['九江王', '淮南王', '異姓諸侯'],
    avatar: './images/figures/ying_bu.jpg',
    bio: '楚漢著名猛將，因少年犯法受黥刑，自號黥布。鉅鹿之戰率前鋒切斷秦軍甬道戰功冠諸侯，項羽封為九江王。楚漢相爭時劉邦遣隨何策反英布歸漢。垓下之戰會合劉邦韓信合圍項羽，封淮南王。韓信、彭越相繼被誅，英布恐禍及己，於前196年舉兵反漢，被劉邦親征擊潰，逃亡被殺。',
    keyAchievements: [
      '鉅鹿之戰率敢死精銳勇斬甬道秦軍',
      '倒戈歸漢參與垓下合圍徹底破楚'
    ],
    famousQuotes: [
      '欲為帝耳！'
    ],
    relations: [
      { figureId: 'xiang_yu', relationType: 'colleague', label: '昔日楚將受封九江王' },
      { figureId: 'liu_bang', relationType: 'rival', label: '歸附封淮南王後起兵反叛' }
    ],
    participatedEventIds: ['evt_julu_207', 'evt_gaixia_202']
  },
  {
    id: 'peng_yue',
    name: '彭越',
    courtesyName: '仲',
    posthumousName: '梁王',
    birthDeathDisplay: '前240年 - 前196年',
    birthYear: -240,
    deathYear: -196,
    nativePlaceAncient: '碭郡 昌邑',
    nativePlaceModern: '山東省巨野縣昌邑鎮',
    faction: 'han',
    roles: ['梁王', '開國功臣', '游擊戰鼻祖'],
    avatar: './images/figures/peng_yue.jpg',
    bio: '漢初異姓諸侯王，中國游擊戰戰術先驅。漁夫出身，聚眾起兵巨野澤。楚漢相爭常出沒於項羽後方梁地，斷楚糧道燒其輜重，令項羽疲於奔命。垓下之戰率部合圍楚軍，封梁王。後被誣謀反流放蜀地，途中向呂后哭訴，呂后勸劉邦斬草除根，被誅殺並誅滅三族，肉醬賜諸侯。',
    keyAchievements: [
      '開創古代敵後游擊戰破楚後方糧道',
      '會師垓下合力消滅西楚霸王項羽'
    ],
    famousQuotes: [
      '項王方急，奈何受命？今日會，後期者斬！'
    ],
    relations: [
      { figureId: 'liu_bang', relationType: 'monarch-subject', label: '封梁王後遭誅殺' },
      { figureId: 'lv_zhi', relationType: 'rival', label: '被呂后密勸高祖夷三族' }
    ],
    participatedEventIds: ['evt_gaixia_202']
  },
  {
    id: 'chen_ping',
    name: '陳平',
    courtesyName: '無字',
    posthumousName: '戶牖獻侯 / 漢右丞相',
    birthDeathDisplay: '前230年 - 前178年',
    birthYear: -230,
    deathYear: -178,
    nativePlaceAncient: '陽武 戶牖鄉',
    nativePlaceModern: '河南省新鄉市原陽縣陽阿鄉',
    faction: 'han',
    roles: ['漢丞相', '謀士', '戰略家'],
    avatar: './images/figures/chen_ping.jpg',
    bio: '大漢傳奇名相，深通黃老與奇計陰謀。少好讀書善宰肉分肉，初事魏咎、項羽，後歸劉邦拜護軍中尉。楚漢相爭出六出奇計：金屑反間楚君臣疏離范增、滎陽婦女夜出金蟬脫殼、白登之圍使閼氏解圍等。呂后崩後，與太尉周勃密謀發動北軍政變誅除諸呂，迎立漢文帝，使漢室江山長治久安。',
    keyAchievements: [
      '施反間計離間項羽與范增，瓦解楚軍智囊',
      '白登之圍獻奇計走夫人路線解高祖之困',
      '呂后死後與周勃同心協力誅平諸呂迎立文帝'
    ],
    famousQuotes: [
      '使平得宰天下，亦如是肉矣！',
      '我多陰謀，是道家之所禁。吾世即廢，亦已矣，終不能復起，以吾多陰禍也。'
    ],
    relations: [
      { figureId: 'liu_bang', relationType: 'advisor', label: '屢獻奇策之帝謀' },
      { figureId: 'zhou_bo', relationType: 'colleague', label: '合謀平定諸呂之文武盟友' },
      { figureId: 'fan_zeng', relationType: 'rival', label: '反間計逐走范增' }
    ],
    participatedEventIds: ['evt_baideng_200', 'evt_lvhou_180']
  },
  {
    id: 'zhou_bo',
    name: '周勃',
    courtesyName: '無字',
    posthumousName: '絳武侯 / 漢太尉丞相',
    birthDeathDisplay: '前240年 - 前169年',
    birthYear: -240,
    deathYear: -169,
    nativePlaceAncient: '泗水郡 沛縣',
    nativePlaceModern: '江蘇省徐州市沛縣',
    faction: 'han',
    roles: ['漢太尉', '右丞相', '絳侯'],
    avatar: './images/figures/zhou_bo.jpg',
    bio: '漢初名將，周亞夫之父。質樸剛勇，初以織薄曲、吹簫給喪事為生，隨劉邦起兵轉戰天下，定三秦、破項羽、平反叛，攻城拔寨屢建奇功。劉邦臨終預言「安劉氏者必勃也」。呂后崩後諸呂欲謀篡位，周勃持節詐入北軍軍營，振臂高呼「為呂氏右袒，為劉氏左袒」，全軍左袒擁劉，一舉誅殺呂產呂祿，迎代王劉恆登基。',
    keyAchievements: [
      '隨劉邦平定天下，被劉邦譽為「可託付大事之安劉重臣」',
      '入北軍振臂一呼「左袒」，徹底誅滅諸呂迎立漢文帝'
    ],
    famousQuotes: [
      '為呂氏右袒，為劉氏左袒！',
      '吾嘗將百萬軍，然安知獄吏之貴也！'
    ],
    relations: [
      { figureId: 'chen_ping', relationType: 'colleague', label: '密謀左袒誅呂之股肱盟友' },
      { figureId: 'liu_heng', relationType: 'monarch-subject', label: '扶保迎立之漢文帝' },
      { figureId: 'zhou_yafu', relationType: 'family', label: '名將長子' }
    ],
    participatedEventIds: ['evt_baideng_200', 'evt_lvhou_180']
  },
  {
    id: 'yu_ji',
    name: '虞姬',
    courtesyName: '無字',
    posthumousName: '美人虞氏',
    birthDeathDisplay: '約前230年 - 前202年',
    birthYear: -230,
    deathYear: -202,
    nativePlaceAncient: '吳地 / 紹興',
    nativePlaceModern: '江蘇省宿遷市或常沭一帶',
    faction: 'other',
    roles: ['項羽愛妾', '烈女'],
    avatar: './images/figures/yu_ji.jpg',
    bio: '西楚霸王項羽愛妾，容貌傾城，才藝過人，常伴隨項羽征戰沙場。垓下之戰楚軍被韓信四十萬聯軍重重合圍，夜聞四面楚歌，項羽帳中悲歌《垓下歌》，虞姬拔劍起舞和歌：「漢兵已略地，四方楚歌聲；大王意氣盡，賤妾何聊生！」為使項羽決心突圍無牽掛，拔劍自刎殉情，譜寫霸王別姬千古絕唱。',
    keyAchievements: [
      '矢志不渝隨項羽征戰天下',
      '垓下自刎殉情，成為中國文學最高悲劇形象之一'
    ],
    famousQuotes: [
      '漢兵已略地，四方楚歌聲；大王意氣盡，賤妾何聊生！'
    ],
    relations: [
      { figureId: 'xiang_yu', relationType: 'family', label: '同生共死之霸王摯愛' }
    ],
    participatedEventIds: ['evt_gaixia_202']
  },
  {
    id: 'lv_zhi',
    name: '呂雉',
    courtesyName: '娥姁',
    posthumousName: '漢高后',
    birthDeathDisplay: '前241年 - 前180年',
    birthYear: -241,
    deathYear: -180,
    nativePlaceAncient: '單父',
    nativePlaceModern: '山東省菏澤市單縣',
    faction: 'han',
    roles: ['漢高皇后', '臨朝稱制皇太后', '女政治家'],
    avatar: './images/figures/lv_zhi.jpg',
    bio: '漢高祖劉邦結髮皇后，中國歷史上第一位臨朝稱制的皇后與女性統治者。早年隨劉邦起義飽受磨難，楚漢戰爭曾被項羽囚禁兩年。劉邦稱帝後助其除韓信、彭越等異姓王。高祖崩後先後立惠帝、少帝，臨朝稱制十六載。政治上延續黃老「無為而治」，休養生息、廢除殘酷苛法，民得安堵，為文景之治奠立深厚基礎。',
    keyAchievements: [
      '臨朝稱制十六年，推行無為而治、輕徭薄賦',
      '廢除挾書律與連坐法，促進文化復興與農業繁榮',
      '司馬遷將其與帝王同列，著《史記·呂太后本紀》'
    ],
    famousQuotes: [
      '政不出房戶，天下晏然。刑罰罕用，罪人是希。民務稼穡，衣食滋殖。'
    ],
    relations: [
      { figureId: 'liu_bang', relationType: 'family', label: '結髮帝王' },
      { figureId: 'zhou_bo', relationType: 'rival', label: '崩逝後呂氏遭其清除' },
      { figureId: 'liu_heng', relationType: 'family', label: '代王後繼' }
    ],
    participatedEventIds: ['evt_lvhou_180']
  },
  {
    id: 'modun_chanyu',
    name: '冒頓單于',
    courtesyName: '無字',
    posthumousName: '大匈奴單于',
    birthDeathDisplay: '前234年 - 前174年',
    birthYear: -234,
    deathYear: -174,
    nativePlaceAncient: '北方大草原',
    nativePlaceModern: '蒙古高原及內蒙古境內',
    faction: 'other',
    roles: ['匈奴大單于', '草原霸主'],
    avatar: './images/figures/modun_chanyu.jpg',
    bio: '匈奴歷史上最傑出的單于與軍事征服者。發明「鳴鏑」（響箭）訓練死士射殺其父頭曼單于自立。隨後東滅東胡、西走月氏、南併樓煩白羊，一統蒙古高原三十萬鐵騎。前200年引四十萬精騎將漢高祖合圍於白登山七日，迫使漢廷開啟和親政策。使匈奴進入全盛期，建立橫跨歐亞的北方大遊牧帝國。',
    keyAchievements: [
      '發明鳴鏑軍事紀律，統一北方各部建立強盛匈奴帝國',
      '白登之圍四十萬騎困漢高祖，迫使漢朝推行和親政策'
    ],
    famousQuotes: [
      '鳴鏑所射而不悉射者，斬之！',
      '土地者，國之本也，奈何予之！'
    ],
    relations: [
      { figureId: 'liu_bang', relationType: 'rival', label: '白登山對峙宿敵' }
    ],
    participatedEventIds: ['evt_baideng_200']
  },
  {
    id: 'zhang_han',
    name: '章邯',
    courtesyName: '無字',
    posthumousName: '雍王',
    birthDeathDisplay: '約前240年 - 前205年',
    birthYear: -240,
    deathYear: -205,
    nativePlaceAncient: '關中',
    nativePlaceModern: '陝西省境內',
    faction: 'other',
    roles: ['秦少府名將', '雍王'],
    avatar: './images/figures/zhang_han.jpg',
    bio: '大秦帝國最後的柱石名將。陳勝吳廣起義周章逼近咸陽，章邯臨危受命釋放驪山修陵刑徒奴產數十萬人編為大軍，連破周文、陳勝、吳廣、魏咎、田儋、項梁，挽狂瀾於既倒。後在鉅鹿之戰遭項羽擊潰，因趙高嫉妒猜忌率部降楚，被項羽封為雍王分守關中。韓信暗度陳倉襲破陳倉，章邯堅守廢丘一年，城破拔劍自盡。',
    keyAchievements: [
      '以驪山刑徒軍連破陳勝、項梁，數月平定六國義軍',
      '鉅鹿被破後降楚封雍王，死守廢丘戰至最後一刻'
    ],
    famousQuotes: [
      '趙高專權，內欺天子，外逼良將，今戰死亦死，降楚亦死！'
    ],
    relations: [
      { figureId: 'xiang_yu', relationType: 'rival', label: '鉅鹿交鋒後降楚' },
      { figureId: 'han_xin', relationType: 'rival', label: '陳倉失守死戰廢丘' }
    ],
    participatedEventIds: ['evt_julu_207', 'evt_chencang_206']
  },
  {
    id: 'liu_heng',
    name: '劉恆',
    courtesyName: '無字',
    posthumousName: '漢太宗孝文皇帝',
    birthDeathDisplay: '前203年 - 前157年',
    birthYear: -203,
    deathYear: -157,
    nativePlaceAncient: '泗水郡 沛縣',
    nativePlaceModern: '江蘇省徐州市沛縣',
    faction: 'han',
    roles: ['漢文帝', '一代仁君'],
    avatar: './images/figures/liu_heng.jpg',
    bio: '漢高祖劉邦第四子，西漢第五位皇帝，廟號太宗，諡號孝文皇帝。初封代王，為人寬厚仁孝、清心寡欲。呂后崩諸呂被誅，周勃陳平迎立其為皇帝。在位二十三年，奉行黃老「與民休息」，屢免天下租賦、廢除肉刑、倡導厲行節儉、不建陵寢奢飾，海內殷富、路不拾遺，開闢中國歷史上著名「文景之治」黃金盛世。',
    keyAchievements: [
      '廢除肉刑與誹謗妖言之法，開創寬仁刑罰制度',
      '連續十三年免除全國田租，奠定天下大治基石',
      '恭儉愛民，修建霸陵皆以瓦器，不治墳'
    ],
    famousQuotes: [
      '農，天下之本，務莫大焉。',
      '厚葬以破業，重服以傷生，吾甚不取。'
    ],
    relations: [
      { figureId: 'zhou_bo', relationType: 'monarch-subject', label: '入京奉迎之元勳' },
      { figureId: 'liu_qi', relationType: 'family', label: '父子同創文景盛世' },
      { figureId: 'zhou_yafu', relationType: 'monarch-subject', label: '視察細柳營讚為真將軍' }
    ],
    participatedEventIds: ['evt_lvhou_180']
  },
  {
    id: 'liu_qi',
    name: '劉啟',
    courtesyName: '無字',
    posthumousName: '漢孝景皇帝',
    birthDeathDisplay: '前188年 - 前141年',
    birthYear: -188,
    deathYear: -141,
    nativePlaceAncient: '代國中都',
    nativePlaceModern: '山西省平遙縣',
    faction: 'han',
    roles: ['漢景帝', '中央集權奠基人'],
    avatar: './images/figures/liu_qi.jpg',
    bio: '漢文帝劉恆長子，西漢第六位皇帝。在位十六年，繼承文帝清靜恭儉政策，推動深層政治改革。採御史大夫晁錯之議推行《削藩策》，果斷起用周亞夫於三個月內平定吳楚七國之亂，徹底收回諸侯王軍政司法特權，使中央集權空前加強。為漢武帝的盛世文治武功積累了無與倫比的雄厚國力。',
    keyAchievements: [
      '堅定推行削藩，平定吳楚七國之亂，加強中央集權',
      '與漢文帝合稱「文景之治」，使京師錢累巨萬、太倉之粟陳陳相因'
    ],
    famousQuotes: [
      '漢家庶事草創，加四海初定，寬刑罰，與民休息。'
    ],
    relations: [
      { figureId: 'liu_heng', relationType: 'family', label: '父子相承之仁君' },
      { figureId: 'zhou_yafu', relationType: 'monarch-subject', label: '平定七國重臣後生猜忌' },
      { figureId: 'chao_cuo', relationType: 'monarch-subject', label: '採其削藩策後痛斬之' },
      { figureId: 'liu_che', relationType: 'family', label: '造就雄才大略之子漢武帝' }
    ],
    participatedEventIds: ['evt_qiguo_154']
  },
  {
    id: 'zhou_yafu',
    name: '周亞夫',
    courtesyName: '無字',
    posthumousName: '條侯 / 漢丞相',
    birthDeathDisplay: '前199年 - 前143年',
    birthYear: -199,
    deathYear: -143,
    nativePlaceAncient: '泗水郡 沛縣',
    nativePlaceModern: '江蘇省徐州市沛縣',
    faction: 'han',
    roles: ['漢太尉', '丞相', '軍事家'],
    avatar: './images/figures/zhou_yafu.jpg',
    bio: '西漢名將，太尉周勃之子。治軍嚴謹如鐵，駐軍細柳營時漢文帝親至勞軍，軍門都尉言「軍中聞將軍令，不聞天子之詔」，文帝讚曰「此真將軍矣！」七國之亂爆發拜太尉，深溝高壘屯兵昌邑，遣輕騎斷敵糧道，三個月一舉平息吳楚五十萬叛軍。後拜丞相，因耿直敢諫反對廢栗太子及封匈奴降將，遭景帝猜忌下獄絕食而亡。',
    keyAchievements: [
      '細柳營治軍秋毫無犯，被漢文帝譽為「真將軍」',
      '統兵三月平定七國之亂，挽救西漢王朝分裂危機'
    ],
    famousQuotes: [
      '軍中聞將軍令，不聞天子之詔。',
      '臣死不入獄！'
    ],
    relations: [
      { figureId: 'zhou_bo', relationType: 'family', label: '將門虎子' },
      { figureId: 'liu_heng', relationType: 'monarch-subject', label: '器重托孤之文帝' },
      { figureId: 'liu_qi', relationType: 'monarch-subject', label: '任為太尉平叛後見猜' }
    ],
    participatedEventIds: ['evt_qiguo_154']
  },
  {
    id: 'chao_cuo',
    name: '晁錯',
    courtesyName: '無字',
    posthumousName: '御史大夫',
    birthDeathDisplay: '前200年 - 前154年',
    birthYear: -200,
    deathYear: -154,
    nativePlaceAncient: '潁川',
    nativePlaceModern: '河南省禹州市',
    faction: 'han',
    roles: ['御史大夫', '政治家', '法家思想家'],
    avatar: './images/figures/chao_cuo.jpg',
    bio: '西漢著名政治家、法家智囊。文帝時任太子家令，辯才無礙號稱「智囊」。景帝即位拜御史大夫，上《削藩策》指出「今削之亦反，不削亦反。削之，其反疾，禍小；不削之，其反遲，禍大」。七國引兵反叛號稱「請誅晁錯，以清君側」。景帝為平息叛亂聽信袁盎讒言，將晁錯衣朝衣腰斬於長安東市，後景帝深悔之。',
    keyAchievements: [
      '撰寫《論貴粟疏》，提倡重農重粟國策',
      '上《削藩策》，奠定消除封國割據強本弱末戰略'
    ],
    famousQuotes: [
      '今削之亦反，不削亦反。削之，其反疾，禍小；不削之，其反遲，禍大。'
    ],
    relations: [
      { figureId: 'liu_qi', relationType: 'monarch-subject', label: '傾心倚重終遭犧牲之君臣' },
      { figureId: 'liu_bi', relationType: 'rival', label: '以清君側誅晁錯起兵反叛' }
    ],
    participatedEventIds: ['evt_qiguo_154']
  },
  {
    id: 'liu_bi',
    name: '劉濞',
    courtesyName: '無字',
    posthumousName: '吳王',
    birthDeathDisplay: '前216年 - 前154年',
    birthYear: -216,
    deathYear: -154,
    nativePlaceAncient: '沛縣',
    nativePlaceModern: '江蘇省徐州市沛縣',
    faction: 'other',
    roles: ['吳王', '七國之亂發起者'],
    avatar: './images/figures/liu_bi.jpg',
    bio: '漢高祖劉邦之侄，劉仲之子。高祖時因驍勇封吳王，統轄三郡五十三城。在封國煮海水為鹽、開銅山鑄錢，富可敵國，招攬天下亡命遊俠。其子劉賢在長安與皇太子劉啟博弈因爭道被六博局砸死，劉濞懷恨在心三十年不朝。景帝削藩之際聯合六國起兵五十萬反叛，戰敗逃往東越被刺殺，身死國除。',
    keyAchievements: [
      '經營吳越煮海鑄錢，奠定東南富庶商業基石',
      '聯合七國起兵五十萬，發動西漢最大諸侯叛亂'
    ],
    famousQuotes: [
      '我為帝，亦何不可！'
    ],
    relations: [
      { figureId: 'liu_qi', relationType: 'rival', label: '博弈結怨起兵反漢' },
      { figureId: 'zhou_yafu', relationType: 'rival', label: '昌邑被其斷糧徹底擊滅' }
    ],
    participatedEventIds: ['evt_qiguo_154']
  },
  {
    id: 'liu_che',
    name: '漢武帝',
    courtesyName: '通',
    posthumousName: '世宗孝武皇帝',
    birthDeathDisplay: '前156年 - 前87年',
    birthYear: -156,
    deathYear: -87,
    nativePlaceAncient: '長安未央宮',
    nativePlaceModern: '陝西省西安市',
    faction: 'han',
    roles: ['西漢全盛皇帝', '雄才大略', '千古一帝'],
    avatar: './images/figures/liu_che.jpg',
    bio: '大漢第七位皇帝，廟號世宗，諡號孝武皇帝。十六歲登基，在位五十四載，雄才大略、威加海內。對內頒推恩令徹底瓦解諸侯割據，罷黜百家、獨尊儒術，設中朝、刺史制度；對外任用衛青、霍去病數破匈奴，「封狼居胥，列河西四郡」，遣張騫出使西域鑿空絲綢之路，開西南夷、平南越。開創大漢帝國最強盛之黃金極盛頂峰。',
    keyAchievements: [
      '頒行推恩令徹底解構地方王國，獨尊儒術定千年正統',
      '北破強匈奴拓土千里，設河西四郡奠定大西北版圖',
      '遣張騫鑿空西域，開啟東西方萬里絲綢之路'
    ],
    famousQuotes: [
      '寇可往，我亦可往！',
      '漢家庶事草創，加四海初定，蓋有非常之功，必待非常之人！'
    ],
    relations: [
      { figureId: 'wei_qing', relationType: 'monarch-subject', label: '拜為大將軍開疆拓土' },
      { figureId: 'huo_qubing', relationType: 'monarch-subject', label: '悉心栽培之愛將戰神' },
      { figureId: 'zhang_qian', relationType: 'monarch-subject', label: '遣其鑿空西域開絲綢之路' },
      { figureId: 'sima_qian', relationType: 'monarch-subject', label: '下蠶室受宮刑撰史記' }
    ],
    participatedEventIds: ['evt_zhangqian_139', 'evt_hexi_121', 'evt_mobei_119', 'evt_simagian_104', 'evt_suwu_100']
  },
  {
    id: 'wei_qing',
    name: '衛青',
    courtesyName: '仲卿',
    posthumousName: '長平烈侯 / 漢大將軍',
    birthDeathDisplay: '約前155年 - 前106年',
    birthYear: -155,
    deathYear: -106,
    nativePlaceAncient: '河東郡 平陽',
    nativePlaceModern: '山西省臨汾市境內',
    faction: 'han',
    roles: ['漢大司馬大將軍', '長平侯', '戰神統帥'],
    avatar: './images/figures/wei_qing.jpg',
    bio: '西漢名將，武衛天下之第一大將軍。騎奴出身，皇后衛子夫之弟。元光六年奇襲匈奴祭天聖地龍城，首開漢軍擊破匈奴先河；收復河南地，解除了匈奴對長安的威脅；漠南戰役大破右賢王；漠北之戰深入大漠千里結武剛車陣，擊潰伊稚斜單于主力。七戰七捷未嘗一敗，官至大司馬大將軍，為人謙和仁讓、不立私威，深受將士愛戴。',
    keyAchievements: [
      '龍城奇襲打破匈奴不可戰勝之神話',
      '收復河南地築朔方城，徹底解除長安門戶邊患',
      '漠北決戰結武剛車陣擊潰單于主力，七戰七捷全勝'
    ],
    famousQuotes: [
      '大將軍立名，但以全軍破敵，何用自樹朋黨！'
    ],
    relations: [
      { figureId: 'liu_che', relationType: 'monarch-subject', label: '君臣相得之大將軍' },
      { figureId: 'huo_qubing', relationType: 'family', label: '親外甥雙壁並立' },
      { figureId: 'li_guang', relationType: 'colleague', label: '漠北之役共擊單于' }
    ],
    participatedEventIds: ['evt_mobei_119']
  },
  {
    id: 'huo_qubing',
    name: '霍去病',
    courtesyName: '無字',
    posthumousName: '冠軍景桓侯 / 大司馬驃騎將軍',
    birthDeathDisplay: '前140年 - 前117年',
    birthYear: -140,
    deathYear: -117,
    nativePlaceAncient: '河東郡 平陽',
    nativePlaceModern: '山西省臨汾市境內',
    faction: 'han',
    roles: ['大司馬驃騎將軍', '冠軍侯', '封狼居胥天降奇才'],
    avatar: './images/figures/huo_qubing.jpg',
    bio: '大漢最具傳奇色彩的天才青年戰神，衛青外甥。十七歲初次出征率八百輕騎深入大漠斬獲二千餘人，封冠軍侯。十九歲拜驃騎將軍，兩度橫掃河西走廊，過焉支山破祁連山，俘降渾邪王四萬人，漢置河西四郡。二十二歲漠北決戰，率精騎奔襲兩千餘里斬獲七萬餘人，「封狼居胥，禪於姑衍，登臨瀚海」。二十四歲英年早逝，武帝痛惜不已調玄甲鐵騎列陣送葬。',
    keyAchievements: [
      '兩次河西之役全勝，打通西域咽喉設立河西四郡',
      '二十二歲漠北之戰「封狼居胥」，樹立武將立功最高峰'
    ],
    famousQuotes: [
      '匈奴未滅，何以家為！',
      '顧方略何如耳，不至學古兵法。'
    ],
    relations: [
      { figureId: 'liu_che', relationType: 'monarch-subject', label: '武帝至愛倚重之天子寵將' },
      { figureId: 'wei_qing', relationType: 'family', label: '帝國雙璧舅甥齊名' }
    ],
    participatedEventIds: ['evt_hexi_121', 'evt_mobei_119']
  },
  {
    id: 'li_guang',
    name: '李廣',
    courtesyName: '無字',
    posthumousName: '前將軍 / 飛將軍',
    birthDeathDisplay: '約前184年 - 前119年',
    birthYear: -184,
    deathYear: -119,
    nativePlaceAncient: '隴西郡 成紀',
    nativePlaceModern: '甘肅省天水市秦安縣',
    faction: 'han',
    roles: ['漢前將軍', '飛將軍', '神射手'],
    avatar: './images/figures/li_guang.jpg',
    bio: '西漢名將，秦將李信之後，勇武過人號稱「飛將軍」。善騎射，嘗夜射沒羽於虎石。歷事文、景、武帝三朝，與匈奴大小七十餘戰，勇猛名震塞北。然而仕途坎坷，終生未得封侯，「李廣難封」成千古之憾。漠北之戰六十餘歲強請為前鋒，因迷失道路未能與單于會戰，回營引刀自刎，滿軍將士百姓皆痛哭。',
    keyAchievements: [
      '神射沒石飲羽，匈奴聞風喪膽號為「飛將軍」',
      '大小七十餘戰力戰匈奴，士卒皆甘為其死'
    ],
    famousQuotes: [
      '廣結髮與匈奴大小七十餘戰，今幸從大將軍出接單于兵，而大將軍徙廣部行回遠，又迷失道，豈非天哉！且廣年六十餘矣，終不能復對刀筆吏！'
    ],
    relations: [
      { figureId: 'wei_qing', relationType: 'colleague', label: '漠北統帥引導移軍' },
      { figureId: 'liu_che', relationType: 'monarch-subject', label: '三朝宿將未得封侯' }
    ],
    participatedEventIds: ['evt_mobei_119']
  },
  {
    id: 'zhang_qian',
    name: '張騫',
    courtesyName: '子文',
    posthumousName: '博望侯',
    birthDeathDisplay: '前164年 - 前114年',
    birthYear: -164,
    deathYear: -114,
    nativePlaceAncient: '漢中郡 成固',
    nativePlaceModern: '陝西省漢中市城固縣',
    faction: 'han',
    roles: ['中郎將', '博望侯', '絲綢之路開拓者'],
    avatar: './images/figures/zhang_qian.jpg',
    bio: '中國古代偉大的外交家、探險家，首開萬里絲綢之路之「鑿空者」。武帝建元二年應募出使西域聯絡大月氏。兩度被匈奴扣留長達十餘年「持漢節不失」，跋涉大宛、康居、大月氏、大夏，十三年後攜西域地理人文翔實地圖返長安。後再度率三百人使團出使烏孫，開闢了連接歐亞大陸的繁華絲綢之路，促進東西方文明深度交融。',
    keyAchievements: [
      '歷經十三年磨難不失漢節，完成「鑿空」西域之壯舉',
      '開闢絲綢之路，引入葡萄、石榴、胡桃、汗血寶馬'
    ],
    famousQuotes: [
      '塞外風沙漫漫，唯持大漢符節在手，心無所懼。'
    ],
    relations: [
      { figureId: 'liu_che', relationType: 'monarch-subject', label: '欽點出使開疆拓土之武帝' }
    ],
    participatedEventIds: ['evt_zhangqian_139']
  },
  {
    id: 'sima_qian',
    name: '司馬遷',
    courtesyName: '子長',
    posthumousName: '太史公',
    birthDeathDisplay: '前145年 - 約前90年',
    birthYear: -145,
    deathYear: -90,
    nativePlaceAncient: '左馮翊 夏陽',
    nativePlaceModern: '陝西省渭南市韓城市芝川鎮',
    faction: 'han',
    roles: ['太史令', '中書令', '史學之父'],
    avatar: './images/figures/sima_qian.jpg',
    bio: '西漢偉大的史學家、文學家，中國紀傳體通史鼻祖。繼任太史令，因替降匈奴的李陵仗義執言觸怒漢武帝，獲罪下蠶室受宮刑。司馬遷忍辱含垢發憤著書，歷十四載寫成五十二萬字不朽巨著《史記》（原名《太史公書》）。縱貫黃帝至漢武帝三千年歷史，被魯迅譽為「史家之絕唱，無韻之離騷」，奠定中國兩千年史學傳統。',
    keyAchievements: [
      '創立本紀、世家、列傳、書、表五體紀傳體史書體系',
      '撰成首部通史巨著《史記》，成中華民族史學最高巔峰'
    ],
    famousQuotes: [
      '人固有一死，或重於泰山，或輕於鴻毛，用之所趨異也。',
      '究天人之際，通古今之變，成一家之言。'
    ],
    relations: [
      { figureId: 'liu_che', relationType: 'monarch-subject', label: '直諫受刑發憤著史' }
    ],
    participatedEventIds: ['evt_simagian_104']
  },
  {
    id: 'su_wu',
    name: '蘇武',
    courtesyName: '子卿',
    posthumousName: '典屬國 / 關內侯',
    birthDeathDisplay: '前140年 - 前60年',
    birthYear: -140,
    deathYear: -60,
    nativePlaceAncient: '右扶風 杜陵',
    nativePlaceModern: '陝西省西安市雁塔區',
    faction: 'han',
    roles: ['中郎將', '典屬國', '大節忠臣'],
    avatar: './images/figures/su_wu.jpg',
    bio: '大漢氣節忠貞之至高化身。天漢元年以中郎將持節出使匈奴，遇虞常謀刺案被扣。單于幽禁於窖中渴飲雪吞氈，衛律李陵誘降皆嚴辭痛斥。單于遷之至北海（貝加爾湖）荒無人煙之地牧羊，言「羝乳乃得歸」。蘇武十九年「臥起操持節，節毛盡落」。昭帝時匈奴與漢和親始獲放歸，滿頭白髮持節還朝，天下莫不垂涕。',
    keyAchievements: [
      '扣留北海十九年牧羊持節不屈，樹立中華民族忠貞至節典範',
      '雁足傳書終歸漢室，受封典屬國、關內侯'
    ],
    famousQuotes: [
      '臣事君，猶子事父也。屈節辱命，雖生何面目以歸漢！',
      '生為漢人，死為漢鬼！'
    ],
    relations: [
      { figureId: 'liu_che', relationType: 'monarch-subject', label: '派遣出使之漢武帝' }
    ],
    participatedEventIds: ['evt_suwu_100']
  },
  {
    id: 'liu_bingyi',
    name: '漢宣帝',
    courtesyName: '次卿',
    posthumousName: '中宗孝宣皇帝 / 劉詢',
    birthDeathDisplay: '前91年 - 前48年',
    birthYear: -91,
    deathYear: -48,
    nativePlaceAncient: '長安',
    nativePlaceModern: '陝西省西安市',
    faction: 'han',
    roles: ['漢宣帝', '中興之主', '昭宣中興'],
    avatar: './images/figures/liu_bingyi.jpg',
    bio: '西漢第八位皇帝，廟號中宗，諡號孝宣皇帝。戾太子劉據之孫，生於巫蠱之禍襁褓中繫長安獄，長於民間深知民間疾苦。霍光迎立登基，韜光養晦終誅霍禹霍氏外戚收回皇權。在位期間整飭吏治、信賞必罰，設西域都護府將新疆天山南北納入中國版圖，使匈奴呼韓邪單于稱臣入朝，開創西漢國力極盛之「孝宣中興」。',
    keyAchievements: [
      '整飭吏治考核精實，締造「昭宣中興」大漢極盛國力',
      '設立「西域都護府」，天山南北新疆自此正式納入中央王朝版圖',
      '促成匈奴呼韓邪單于稽首稱臣親自入長安朝見'
    ],
    famousQuotes: [
      '漢家自有制度，本以霸王道雜之，奈何純任德教，用周政乎！',
      '故人故劍情深，南園遺愛長留。'
    ],
    relations: [
      { figureId: 'zheng_ji', relationType: 'monarch-subject', label: '封為首任西域都護之明君' }
    ],
    participatedEventIds: ['evt_xiyu_60']
  },
  {
    id: 'zheng_ji',
    name: '鄭吉',
    courtesyName: '無字',
    posthumousName: '安遠侯 / 第一任西域都護',
    birthDeathDisplay: '約前100年 - 前49年',
    birthYear: -100,
    deathYear: -49,
    nativePlaceAncient: '會稽',
    nativePlaceModern: '浙江省紹興市',
    faction: 'han',
    roles: ['首任西域都護', '安遠侯', '軍事家'],
    avatar: './images/figures/zheng_ji.jpg',
    bio: '大漢首任「西域都護」，開闢新疆納入中央管轄版圖之奠基功臣。以卒伍從軍數出西域，為侍郎率免刑罪人屯田渠犁，大破車師。神爵二年匈奴日逐王先賢撣歸附大漢，鄭吉發諸國精兵五萬人迎降。宣帝拜鄭吉為首任西域都護，佩金印紫綬治烏壘城，統率塔里木盆地天山南北三十六國，「漢之號令通行西域自吉始」。',
    keyAchievements: [
      '屯田渠犁破車師，成功收編匈奴日逐王部眾萬餘人',
      '出任歷史上首位西域都護，使西域三十六國全面歸順漢朝'
    ],
    famousQuotes: [
      '天子命我撫定西域，凡順漢威者賞，背漢叛逆者誅！'
    ],
    relations: [
      { figureId: 'liu_bingyi', relationType: 'monarch-subject', label: '拜為都護封安遠侯之宣帝' }
    ],
    participatedEventIds: ['evt_xiyu_60']
  },
  {
    id: 'chen_tang',
    name: '陳湯',
    courtesyName: '子公',
    posthumousName: '破胡侯 / 關內侯',
    birthDeathDisplay: '約前75年 - 前6年',
    birthYear: -75,
    deathYear: -6,
    nativePlaceAncient: '山陽 瑕丘',
    nativePlaceModern: '山東省濟寧市兗州區',
    faction: 'han',
    roles: ['西域副校尉', '關內侯', '萬里遠征名將'],
    avatar: './images/figures/chen_tang.jpg',
    bio: '西漢名將，以豪氣干雲著稱。少沉毅有大略，任西域副校尉。見北匈奴郅支單于稱霸康居殺漢使，陳湯斷言若請旨必被朝中文吏推諉貽誤戰機，斷然矯制假託朝命發西域十五國四萬聯軍，翻越蔥嶺深入康居圍攻郅支城，斬殺郅支單于。奏報漢元帝留下流傳千古之豪邁名疏：「明犯強漢者，雖遠必誅！」',
    keyAchievements: [
      '矯制興師遠征三千餘里，破木城陣斬郅支單于',
      '上疏「宜懸頭槀街蠻夷邸間，以示萬里，明犯強漢者，雖遠必誅」'
    ],
    famousQuotes: [
      '宜懸頭槀街蠻夷邸間，以示萬里，明犯強漢者，雖遠必誅！'
    ],
    relations: [
      { figureId: 'zheng_ji', relationType: 'colleague', label: '西域都護前賢' }
    ],
    participatedEventIds: ['evt_chentang_36']
  },
  {
    id: 'wang_zhaojun',
    name: '王昭君',
    courtesyName: '嬙',
    posthumousName: '寧胡閼氏',
    birthDeathDisplay: '約前52年 - 約前15年',
    birthYear: -52,
    deathYear: -15,
    nativePlaceAncient: '南郡 秭歸',
    nativePlaceModern: '湖北省宜昌市興山縣',
    faction: 'han',
    roles: ['漢宮宮女', '匈奴寧胡閼氏', '和平使者'],
    avatar: './images/figures/wang_zhaojun.jpg',
    bio: '中國古代四大美人之一（「落雁」）。漢元帝時入宮為待詔宮女，因自持美貌不肯賄賂宮廷畫師毛延壽，久不見幸。竟寧元年匈奴呼韓邪單于入朝求和親，昭君自請慨然出塞。昭君深明大義，在漠北傳播中原農桑蠶織與禮儀文化，勸單于睦鄰休戰，實現長城邊疆六十年「邊城晏閉，牛馬布野」的和平成就。',
    keyAchievements: [
      '自請慷慨出塞和親，締造漢匈六十年無戰火之盛世和平',
      '傳播中原農耕手工業文明於大漠，促成各民族大融合'
    ],
    famousQuotes: [
      '邊城晏閉，牛馬布野，三世無犬吠之警，黎庶忘干戈之役。'
    ],
    relations: [
      { figureId: 'liu_che', relationType: 'other', label: '漢家天子遠慕' }
    ],
    participatedEventIds: ['evt_zhaojun_33']
  },
  {
    id: 'wang_mang',
    name: '王莽',
    courtesyName: '巨君',
    posthumousName: '新朝皇帝',
    birthDeathDisplay: '前45年 - 西元23年',
    birthYear: -45,
    deathYear: 23,
    nativePlaceAncient: '魏郡 元城',
    nativePlaceModern: '河北省邯鄲市大名縣',
    faction: 'other',
    roles: ['新朝開國皇帝', '托古改制者'],
    avatar: './images/figures/wang_mang.jpg',
    bio: '西漢外戚權臣，新朝皇帝。西漢孝元皇后王政君之侄。少年折節恭儉，勤奮博學，博得謙恭尊賢海內讚譽。步步升至大司馬安漢公，居攝假皇帝。西元9年偽造符命禪讓篡漢，建立新朝。全面推行脫離實際之「托古改制」：王田制、廢奴婢、頻繁改幣改官名、邊疆貶號引發戰亂。加之黃河決口大旱，綠林赤眉蜂起，昆陽大敗後長安被攻破斬首。',
    keyAchievements: [
      '以偽託德行一步步獲取全朝廷推崇篡漢自立',
      '托古改制失敗導致天下鼎沸，引爆全國大起義'
    ],
    famousQuotes: [
      '予受天明命，居位建新，定天下之號曰新。'
    ],
    relations: [
      { figureId: 'liu_xiu', relationType: 'rival', label: '昆陽大捷將其統治徹底埋葬' }
    ],
    participatedEventIds: ['evt_wangmang_9', 'evt_kunyang_23']
  },
  {
    id: 'liu_xiu',
    name: '光武帝',
    courtesyName: '文叔',
    posthumousName: '世祖光武皇帝 / 劉秀',
    birthDeathDisplay: '前5年 - 西元57年',
    birthYear: -5,
    deathYear: 57,
    nativePlaceAncient: '南陽郡 蔡陽',
    nativePlaceModern: '湖北省襄陽市棗陽市',
    faction: 'han',
    roles: ['東漢開國皇帝', '光武中興', '軍事統帥'],
    avatar: './images/figures/liu_xiu.jpg',
    bio: '大漢中興之主，東漢開國皇帝，廟號世祖。漢景帝長沙定王劉發之後。綠林起義隨兄劉縯起兵，昆陽之戰親統三千死士大破王莽四十二萬大軍，名震天下。單車招撫河北，推赤心置人腹中收銅馬數十萬義軍號「銅馬帝」。西元25年鄗南登基稱帝定都洛陽，經十二年「得隴望蜀」平定隗囂、公孫述統一全國。退功臣進文吏，輕徭薄賦，開創「光武中興」。',
    keyAchievements: [
      '昆陽之戰三千敢死破四十二萬莽軍，創造軍事神話',
      '於河北重整乾坤即皇帝位，再造大漢近二百年國祚',
      '十二年征戰平定天下海內一統，開創光武中興盛世'
    ],
    famousQuotes: [
      '仕宦當作執金吾，娶妻當得陰麗華。',
      '人心叵測，我以推赤心置人腹中，安得不感化！',
      '得隴望蜀，人不自足。'
    ],
    relations: [
      { figureId: 'deng_yu', relationType: 'advisor', label: '雲台二十八將首功名相' },
      { figureId: 'feng_yi', relationType: 'monarch-subject', label: '推誠相照之大樹將軍' },
      { figureId: 'geng_yan', relationType: 'monarch-subject', label: '韓信之功好畤侯' },
      { figureId: 'wu_han', relationType: 'monarch-subject', label: '平蜀滅成家之大司馬' },
      { figureId: 'ma_yuan', relationType: 'monarch-subject', label: '聚米指畫隴蜀之伏波將軍' },
      { figureId: 'liu_zhuang_mingdi', relationType: 'family', label: '傳承治世之明帝' }
    ],
    participatedEventIds: ['evt_kunyang_23', 'evt_guangwu_found_25', 'evt_guangwu_unify_36', 'evt_mayuan_42']
  },
  {
    id: 'deng_yu',
    name: '鄧禹',
    courtesyName: '仲華',
    posthumousName: '高密元侯 / 雲台二十八將之首',
    birthDeathDisplay: '2年 - 58年',
    birthYear: 2,
    deathYear: 58,
    nativePlaceAncient: '南陽郡 新野',
    nativePlaceModern: '河南省南陽市新野縣',
    faction: 'han',
    roles: ['大司徒', '太傅', '高密侯', '元勳首輔'],
    avatar: './images/figures/deng_yu.jpg',
    bio: '東漢開國名臣，雲台二十八將第一位。十三歲能誦詩書，遊長安與劉秀結納。王莽覆滅之際，鄧禹策馬追奔千里見劉秀於鄴城，進言「圖天下之大計，非為一郡一州」，勸其「延攬英雄，務悅民心，立高祖之業，救萬民之命」，此即東漢版「隆中對」。拜大司徒隨後進軍關中，為劉秀籌劃開國定策第一功臣。',
    keyAchievements: [
      '獻「鄴中對」確立劉秀平定天下、再造漢室之戰略總體綱領',
      '位居雲台二十八將之首，出將入相功名始終'
    ],
    famousQuotes: [
      '願明公威德加於四海，禹得完名駿足於天下，功成退身，豈不快哉！'
    ],
    relations: [
      { figureId: 'liu_xiu', relationType: 'monarch-subject', label: '君臣相知首功賢相' }
    ],
    participatedEventIds: ['evt_guangwu_found_25']
  },
  {
    id: 'feng_yi',
    name: '馮異',
    courtesyName: '公孫',
    posthumousName: '陽夏節侯 / 大樹將軍',
    birthDeathDisplay: '約前5年 - 西元34年',
    birthYear: -5,
    deathYear: 34,
    nativePlaceAncient: '潁川郡 父城',
    nativePlaceModern: '河南省寶豐縣東',
    faction: 'han',
    roles: ['征西大將軍', '陽夏侯', '雲台二十八將'],
    avatar: './images/figures/feng_yi.jpg',
    bio: '東漢開國著名大將，雲台名將「大樹將軍」。歸順劉秀後忠心不二。劉秀在河北困頓時，馮異進豆粥、麥飯救急。諸將論功坐論喧譁，馮異獨自退立大樹之下，軍中稱「大樹將軍」。後拜征西大將軍鎮守關中，大破赤眉八萬降卒平定三輔。光武帝稱其「披荊斬棘，克定關中」。病逝於軍中。',
    keyAchievements: [
      '河北危難之際進豆粥麥飯忠貞事主',
      '平定關中三輔，破赤眉降二十萬眾',
      '謙遜退讓「退避大樹下」，成千古美談'
    ],
    famousQuotes: [
      '始雖垂翅回溪，終能奮翼黽池，可謂失之東隅，收之桑榆！'
    ],
    relations: [
      { figureId: 'liu_xiu', relationType: 'monarch-subject', label: '披荊斬棘之結髮功臣' }
    ],
    participatedEventIds: ['evt_guangwu_found_25']
  },
  {
    id: 'geng_yan',
    name: '耿弇',
    courtesyName: '伯昭',
    posthumousName: '好畤愍侯 / 雲台二十八將',
    birthDeathDisplay: '3年 - 58年',
    birthYear: 3,
    deathYear: 58,
    nativePlaceAncient: '扶風 茂陵',
    nativePlaceModern: '陝西省興平市東北',
    faction: 'han',
    roles: ['建威大將軍', '好畤侯', '名將統帥'],
    avatar: './images/figures/geng_yan.jpg',
    bio: '東漢開國傑出名將，雲台名將第四位。少好兵法，幽州豪傑投奔劉秀，耿弇力主發幽州突騎南下定河北。率軍討張步平定齊地，臨淄之戰大腿中箭引佩刀自截其箭肉戰不退，光武帝臨勞軍讚其「將軍前在南陽建此大策，常以為落落難合，有志者事竟成也！將軍功比韓信，更有過之！」一生平四十六郡，屠城三百，未嘗挫敗。',
    keyAchievements: [
      '率幽州突騎掃平河北各路強敵',
      '平定齊地張步，光武帝賜讚「有志者事竟成」'
    ],
    famousQuotes: [
      '有志者事竟成！',
      '昔韓信破歷下以開基，今將軍壞祝阿以發跡，此皆齊之西界，功足相方。'
    ],
    relations: [
      { figureId: 'liu_xiu', relationType: 'monarch-subject', label: '比之淮陰之大統帥' }
    ],
    participatedEventIds: ['evt_guangwu_found_25']
  },
  {
    id: 'wu_han',
    name: '吳漢',
    courtesyName: '子顏',
    posthumousName: '廣平忠侯 / 漢大司馬',
    birthDeathDisplay: '約前10年 - 西元44年',
    birthYear: -10,
    deathYear: 44,
    nativePlaceAncient: '南陽郡 宛縣',
    nativePlaceModern: '河南省南陽市',
    faction: 'han',
    roles: ['大司馬', '廣平侯', '雲台二十八將第二位'],
    avatar: './images/figures/wu_han.jpg',
    bio: '東漢大司馬，雲台二十八將位列第二。為人質厚少言、敢戰重威，每次戰敗歸營諸將沮喪，吳漢必整頓兵器厲兵秣馬誓雪前恥，光武常謂「吳公差強人意」。率漢軍掃滅漁陽彭寵、討平江漢諸豪，長驅入蜀在成都城外伏擊公孫述，滅成家政權完成統一天下之最後一戰。治軍威猛善決機，出征無虛日。',
    keyAchievements: [
      '破成都斬公孫述，完成光武帝統一天下最後決戰',
      '沉勇剛毅「差強人意」，身為大司馬統軍二十載'
    ],
    famousQuotes: [
      '軍敗何足傷，整軍再戰耳！'
    ],
    relations: [
      { figureId: 'liu_xiu', relationType: 'monarch-subject', label: '征戰四方之大司馬' },
      { figureId: 'gongsun_shu', relationType: 'rival', label: '成都決戰擊殺公孫述' }
    ],
    participatedEventIds: ['evt_guangwu_found_25', 'evt_guangwu_unify_36']
  },
  {
    id: 'ma_yuan',
    name: '馬援',
    courtesyName: '文淵',
    posthumousName: '伏波將軍 / 新息忠成侯',
    birthDeathDisplay: '前14年 - 西元49年',
    birthYear: -14,
    deathYear: 49,
    nativePlaceAncient: '右扶風 茂陵',
    nativePlaceModern: '陝西省興平市東北',
    faction: 'han',
    roles: ['伏波將軍', '新息侯', '戰略家'],
    avatar: './images/figures/ma_yuan.jpg',
    bio: '東漢著名軍事家，馬氏始祖，伏波將軍。初依附隗囂，察天下形勢斷定劉秀「有高帝之大度」，遂決策歸漢。御前「聚米為山谷，指畫形勢」引漢軍拔隴西。六十二歲受命南征嶺南交趾，披荊斬棘深入熱瘴之地平定徵氏姐妹叛亂，立象林銅柱標界。六十四歲抱病征五溪蠻，豪言「男兒要當死於邊野，以馬革裹屍還葬耳！」病逝於軍中。',
    keyAchievements: [
      '御前聚米成山谷，開創立體沙盤戰略指畫之先河',
      '遠征交趾平定二徵，嶺南立伏波銅柱穩固南疆',
      '留下「老當益壯」、「馬革裹屍」千古男兒豪情'
    ],
    famousQuotes: [
      '男兒要當死於邊野，以馬革裹屍還葬耳，何能臥床上在兒女手中邪！',
      '丈夫為志，窮當益堅，老當益壯。'
    ],
    relations: [
      { figureId: 'liu_xiu', relationType: 'monarch-subject', label: '聚米畫山指畫隴蜀' }
    ],
    participatedEventIds: ['evt_guangwu_unify_36', 'evt_mayuan_42']
  },
  {
    id: 'gongsun_shu',
    name: '公孫述',
    courtesyName: '子陽',
    posthumousName: '成家白帝',
    birthDeathDisplay: '約前15年 - 西元36年',
    birthYear: -15,
    deathYear: 36,
    nativePlaceAncient: '扶風 茂陵',
    nativePlaceModern: '陝西省興平市東北',
    faction: 'other',
    roles: ['成家皇帝', '巴蜀割據霸主'],
    avatar: './images/figures/gongsun_shu.jpg',
    bio: '東漢初年巴蜀割據政權「成家」皇帝。初任王莽導江卒正，新莽崩潰之際割據益州沃土，自立為蜀王。西元25年稱帝於成都，國號「成家」，建元龍興，割據蜀地長達十二年。兵精糧足、閉關自守，自詡有白龍出殿天命號「白帝」。建武十二年吳漢岑彭水陸大軍合圍成都，公孫述親自披甲出擊，中槊重傷當夜氣絕，成家政權隨之覆滅。',
    keyAchievements: [
      '割據天府之國巴蜀十二載，抗衡東漢中原朝廷',
      '修築白帝城天險防線阻遏長江水道'
    ],
    famousQuotes: [
      '朝聞道，夕死可矣。豈有降天子乎！'
    ],
    relations: [
      { figureId: 'liu_xiu', relationType: 'rival', label: '得隴望蜀最後平定之對手' },
      { figureId: 'wu_han', relationType: 'rival', label: '成都城外決戰陣亡' }
    ],
    participatedEventIds: ['evt_guangwu_unify_36']
  },
  {
    id: 'liu_zhuang_mingdi',
    name: '漢明帝',
    courtesyName: '陽',
    posthumousName: '顯宗孝明皇帝 / 劉莊',
    birthDeathDisplay: '28年 - 75年',
    birthYear: 28,
    deathYear: 75,
    nativePlaceAncient: '洛陽',
    nativePlaceModern: '河南省洛陽市',
    faction: 'han',
    roles: ['東漢第二位皇帝', '明章之治', '白馬寺創建者'],
    avatar: './images/figures/liu_zhuang_mingdi.jpg',
    bio: '東漢第二位皇帝，光武帝第四子，母光烈皇后陰麗華。在位十八年，遵奉建武制度，整肅外戚官僚、考核百官精明深刻。命竇固大出北匈奴收復伊吾，遣班超投筆從戎三十六人出使經營西域。夜夢丈六金人頂放神光，遣郎中蔡愔等出使天竺尋佛法，迎攝摩騰、竺法蘭以白馬馱經還洛陽，敕建天下第一名剎白馬寺，使佛教正式傳入中國。',
    keyAchievements: [
      '整飭法度嚴制外戚，開啟「明章之治」盛世',
      '派班超出使西域撫定天山南北五十國',
      '白馬馱經建洛陽白馬寺，正式開啟佛教東傳歷史'
    ],
    famousQuotes: [
      '金人長丈六，項佩日輪，飛行殿前，西方有神名曰佛。'
    ],
    relations: [
      { figureId: 'liu_xiu', relationType: 'family', label: '繼承光武帝中興之基' },
      { figureId: 'ban_chao', relationType: 'monarch-subject', label: '遣定遠侯深入西域' }
    ],
    participatedEventIds: ['evt_mingzhang_57', 'evt_banchao_73']
  },
  {
    id: 'liu_da_zhangdi',
    name: '漢章帝',
    courtesyName: '無字',
    posthumousName: '肅宗孝章皇帝 / 劉炟',
    birthDeathDisplay: '57年 - 88年',
    birthYear: 57,
    deathYear: 88,
    nativePlaceAncient: '洛陽',
    nativePlaceModern: '河南省洛陽市',
    faction: 'han',
    roles: ['東漢第三位皇帝', '明章之治', '書法章草奠基人'],
    avatar: './images/figures/liu_da_zhangdi.jpg',
    bio: '東漢第三位皇帝，漢明帝第五子。在位十三年，為人寬厚仁慈、推崇儒術，改行寬政，改明帝之嚴苛，召開著名的「白虎觀會議」統一經學思想，撰《白虎通義》。重用名將班超堅持經營西域不予放棄，力主邊防。章帝精通書法草書，後世譽為「章草」。與其父漢明帝共同締造政簡刑清、天下安居樂業的「明章之治」。',
    keyAchievements: [
      '主持白虎觀會議確立儒學正統，開創章草書法流派',
      '繼承寬政與民休息，使東漢達到國力鼎盛之明章之治'
    ],
    famousQuotes: [
      '政寬則民安，法肅則國清。'
    ],
    relations: [
      { figureId: 'liu_zhuang_mingdi', relationType: 'family', label: '明章盛世之父子相承' },
      { figureId: 'ban_chao', relationType: 'monarch-subject', label: '力排眾議支援其經略西域' }
    ],
    participatedEventIds: ['evt_mingzhang_57', 'evt_banchao_73']
  },
  {
    id: 'ban_chao',
    name: '班超',
    courtesyName: '仲升',
    posthumousName: '定遠侯 / 西域都護',
    birthDeathDisplay: '32年 - 102年',
    birthYear: 32,
    deathYear: 102,
    nativePlaceAncient: '扶風 安陵',
    nativePlaceModern: '陝西省咸陽市秦都區',
    faction: 'han',
    roles: ['定遠侯', '西域都護', '外交英雄', '投筆從戎傳奇'],
    avatar: './images/figures/ban_chao.jpg',
    bio: '東漢著名軍事家、外交家，史家班彪之子、班固之弟。早年在洛陽為官府抄書維持生計，慨然擲筆長嘆「大丈夫無它志略，猶當效傅介子、張騫立功異域，以取封侯，安能久事筆研間乎！」投筆從戎。率三十六勇士出使西域，夜縱火焚殺匈奴使節，智平鄯善、于闐、疏勒，以非凡膽識「以夷制夷」撫定西域五十餘國長達三十一年，封定遠侯。',
    keyAchievements: [
      '投筆從戎，率三十六人深入西域萬里建立不朽功業',
      '夜襲鄯善「不入虎穴，焉得虎子」，收復西域全境'
    ],
    famousQuotes: [
      '大丈夫無它志略，猶當效張騫立功異域，以取封侯，安能久事筆硯間乎！',
      '不入虎穴，不得虎子！'
    ],
    relations: [
      { figureId: 'ban_gu', relationType: 'family', label: '同胞長兄投筆從戎' },
      { figureId: 'gan_ying', relationType: 'advisor', label: '派遣其遠出西海尋羅馬帝國' }
    ],
    participatedEventIds: ['evt_banchao_73', 'evt_ganying_97']
  },
  {
    id: 'ban_gu',
    name: '班固',
    courtesyName: '孟堅',
    posthumousName: '中護軍 / 史學家',
    birthDeathDisplay: '32年 - 92年',
    birthYear: 32,
    deathYear: 92,
    nativePlaceAncient: '扶風 安陵',
    nativePlaceModern: '陝西省咸陽市秦都區',
    faction: 'han',
    roles: ['中護軍', '史學家', '文學家', '《漢書》作者'],
    avatar: './images/figures/ban_gu.jpg',
    bio: '東漢著名史學家、文學家，班超長兄。歷二十餘載撰寫中國第一部紀傳體斷代史《漢書》，詳細記載西漢二百三十年歷史，文字嚴謹典雅，與《史記》並稱「史漢」。永元元年以中護軍隨車騎將軍竇憲北伐匈奴，於稽落山大捷後登燕然山，撰寫千古傳誦之摩崖石刻《封燕然山銘》，締造「燕然勒石」千古軍事文化神話。',
    keyAchievements: [
      '撰成中國首部紀傳體斷代史巨著《漢書》',
      '撰寫《封燕然山銘》摩崖刻石，樹立邊功最高丰碑'
    ],
    famousQuotes: [
      '登翼鄣，陟連岡。躡天衢，登燕然。勒石銘勳，垂休後代。'
    ],
    relations: [
      { figureId: 'ban_chao', relationType: 'family', label: '同胞弟兄一文一武齊名天下' },
      { figureId: 'dou_xian', relationType: 'colleague', label: '隨其北伐大破匈奴作銘燕然' }
    ],
    participatedEventIds: ['evt_yanran_89']
  },
  {
    id: 'dou_xian',
    name: '竇憲',
    courtesyName: '伯度',
    posthumousName: '大將軍 / 車騎將軍',
    birthDeathDisplay: '約50年 - 92年',
    birthYear: 50,
    deathYear: 92,
    nativePlaceAncient: '扶風 平陵',
    nativePlaceModern: '陝西省咸陽市西北',
    faction: 'han',
    roles: ['大將軍', '車騎將軍', '北伐統帥'],
    avatar: './images/figures/dou_xian.jpg',
    bio: '東漢著名統帥、外戚權臣，章德竇皇后之兄。因擅殺都鄉侯劉暢恐獲罪，自請北伐匈奴以贖死罪。拜車騎將軍率八萬精騎出朔方塞三千餘里，於稽落山大破北匈奴單于主力，俘獲降服二十餘萬眾。登燕然山命班固作銘刻石勒功。隨後拜大將軍權傾朝野，居功自傲欲謀叛逆，被年少的漢和帝聯手宦官鄭眾發動宮廷政變收奪印綬，被迫自殺。',
    keyAchievements: [
      '稽落山大破北匈奴主力，出塞三千餘里登燕然山刻石勒功',
      '徹底終結北匈奴在蒙古高原三百年統治'
    ],
    famousQuotes: [
      '大破單于，斬首萬級，勒石燕然山，以紀大漢之威！'
    ],
    relations: [
      { figureId: 'ban_gu', relationType: 'colleague', label: '令其刻銘燕然石壁' }
    ],
    participatedEventIds: ['evt_yanran_89']
  },
  {
    id: 'gan_ying',
    name: '甘英',
    courtesyName: '無字',
    posthumousName: '大秦使臣 / 西域掾屬',
    birthDeathDisplay: '約50年 - 110年',
    birthYear: 50,
    deathYear: 110,
    nativePlaceAncient: '西域',
    nativePlaceModern: '漢代西北邊陲一帶',
    faction: 'han',
    roles: ['西域使者', '大秦探險家'],
    avatar: './images/figures/gan_ying.jpg',
    bio: '東漢傑出的外交家與探險家，班超幕下掾屬。西元97年奉西域都護班超之命，出使大秦（羅馬帝國），開闢中西直接交通。甘英翻越蔥嶺，經阿富汗、伊朗高原穿行整個安息帝國（波斯），抵達波斯灣海岸（條支西海）。雖受安息水手恐嚇未能橫渡地中海抵達羅馬，但他帶回了西亞、波斯灣、地中海與羅馬帝國的第一手珍貴地理人文資料。',
    keyAchievements: [
      '中國古代正史記載抵達最西波斯灣西海之官方使節',
      '首度將古羅馬帝國制度與波斯灣地理詳盡引入中國文獻'
    ],
    famousQuotes: [
      '海水廣大，涉海者善得思土之疾，此行雖止於西海，大漢之威已聞於大秦。'
    ],
    relations: [
      { figureId: 'ban_chao', relationType: 'advisor', label: '受命出使羅馬帝國' }
    ],
    participatedEventIds: ['evt_ganying_97']
  },
  {
    id: 'li_ying',
    name: '李膺',
    courtesyName: '元禮',
    posthumousName: '司隸校尉 / 黨錮領袖',
    birthDeathDisplay: '110年 - 169年',
    birthYear: 110,
    deathYear: 169,
    nativePlaceAncient: '潁川 襄城',
    nativePlaceModern: '河南省許昌市襄城縣',
    faction: 'han',
    roles: ['司隸校尉', '黨錮之禍名士', '天下模楷'],
    avatar: './images/figures/li_ying.jpg',
    bio: '東漢末年著名士大夫領袖，司隸校尉。生性高亢簡嚴，以天下風教是非為己任。任司隸校尉時嚴懲宦官爪牙張朔，京師震悚，宦官皆抱頭鼠竄不敢出入禁門。太學生三萬人尊其為「天下模楷李元禮」，士人若得其接見稱之為「登龍門」。第一次黨錮之禍遭貶；第二次黨錮之禍毅然拒絕逃亡主動投案受審，慘死洛陽詔獄中，引爆士大夫悲憤。',
    keyAchievements: [
      '剛正不阿嚴懲宦官惡戚，被全天下士人奉為「天下模楷」',
      '開創「登龍門」美譽，捨生取義引頸受戮抗爭宦官專權'
    ],
    famousQuotes: [
      '事不辭難，罪不逃刑，臣之節也。吾年已六十，死何所恨！'
    ],
    relations: [
      { figureId: 'fan_pang', relationType: 'colleague', label: '同罹黨錮之禍的清流楷模' }
    ],
    participatedEventIds: ['evt_danggu_166']
  },
  {
    id: 'fan_pang',
    name: '范滂',
    courtesyName: '孟博',
    posthumousName: '汝南功曹 / 黨錮名士',
    birthDeathDisplay: '137年 - 169年',
    birthYear: 137,
    deathYear: 169,
    nativePlaceAncient: '汝南 征羌',
    nativePlaceModern: '河南省漯河市郾城區',
    faction: 'han',
    roles: ['汝南功曹', '清流名士', '八俊之一'],
    avatar: './images/figures/fan_pang.jpg',
    bio: '東漢末年著名抗暴清流名士，「八俊」之一。少有澄清天下之志，任光祿四行巡按冀州，使者攬轡登車慷慨有澄清天下之志，貪官污吏望風解印而去。黨錮之禍爆發，縣令欲棄官與之俱逃，范滂言「滂死則禍銷，何敢以己罪累及於明府！」主動投案。臨刑前辭別老母，母曰「汝得與李杜齊名，死何恨！」范滂從容受戮，年僅三十三歲。',
    keyAchievements: [
      '攬轡登車澄清天下，貪墨濁官望風逃竄',
      '捨生取義全名以謝老母，東漢士人浩然正氣之絕唱'
    ],
    famousQuotes: [
      '使滂得全名而死，何恨之有！'
    ],
    relations: [
      { figureId: 'li_ying', relationType: 'colleague', label: '天下模楷與登龍同道' }
    ],
    participatedEventIds: ['evt_danggu_166']
  }
];
