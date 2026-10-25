const fs = require('fs');
const path = require('path');

function getAvatar(fid) {
  if (fs.existsSync(path.join(__dirname, '..', 'images', 'figures', `fig_${fid}.jpg`))) {
    return `images/figures/fig_${fid}.jpg`;
  }
  if (fs.existsSync(path.join(__dirname, '..', 'images', 'figures', `fig_${fid}.png`))) {
    return `images/figures/fig_${fid}.png`;
  }
  return `images/figures/fig_${fid}.svg`;
}

const FIGURES = [
  // --- NORTHERN SONG EMPERORS & STATESMEN ---
  {
    id: 'zhao_kuangyin',
    name: '趙匡胤 (宋太祖)',
    courtesyName: '元朗',
    titles: ['宋太祖', '大宋開國皇帝', '英武聖文神德皇帝'],
    roles: ['君主', '皇帝', '大宋開國皇帝'],
    faction: 'song',
    birthDeath: [927, 976],
    birthDeathDisplay: '西元 927 — 976 年',
    avatar: getAvatar('zhao_kuangyin'),
    origin: '洛陽夾馬營（祖籍涿郡）',
    bio: '大宋王朝開國皇帝。後周時任殿前都點檢，後周顯德七年（960年）陳橋兵變，諸軍黃袍加身擁立為帝，建立宋朝，定都東京開封。採納趙普「先南後北、先易後難」策略，平定荊南、武平、後蜀、南漢、南唐，基本終結五代十國分裂割據；行「杯酒釋兵權」，收天下精兵歸禁軍，崇文抑武，奠定兩宋三百年文治輝煌基石。',
    historicalEvaluation: '《宋史》評曰：「太祖神武雄略，以智定天下；杯酒釋兵權，化干戈為玉帛，真仁君也。」',
    achievements: ['陳橋兵變建立大宋', '杯酒釋兵權革除藩鎮之禍', '平定南方諸國奠定一統版圖'],
    quotes: ['臥榻之側，豈容他人鼾睡！', '天下自唐季以來數十年，帝王凡易八姓，戰鬥不息，生民塗地，吾欲息天下之兵，為國家建長久計。'],
    relations: [
      { figureId: 'zhao_guangyi', label: '胞弟·太宗（燭影斧聲）', relationType: 'kinship' },
      { figureId: 'zhao_pu', label: '開國謀主宰相', relationType: 'colleague' }
    ]
  },
  {
    id: 'zhao_guangyi',
    name: '趙光義 (宋太宗)',
    courtesyName: '廷宜',
    titles: ['宋太宗', '晉王', '滅北漢統一天下'],
    roles: ['君主', '皇帝', '結束五代十國君主'],
    faction: 'song',
    birthDeath: [939, 997],
    birthDeathDisplay: '西元 939 — 997 年',
    avatar: getAvatar('zhao_guangyi'),
    origin: '洛陽夾馬營',
    bio: '宋太祖趙匡胤胞弟，大宋第二任皇帝。太平興國四年親征滅北漢，正式終結五代十國分裂局面。旋乘勝北伐幽薊，高梁河之戰遭遼軍名將耶律休哥夾擊大敗，太宗乘驢車南遁；雍熙三年再次發動「雍熙北伐」三路攻遼，再遭慘敗，名將楊業力戰殉國。從此轉攻為守，大力推行崇文抑武，擴大科舉取士，大興儒學。',
    historicalEvaluation: '《宋史》：「帝性喜讀書，開館延才；平定北漢，天下混一，功業盛矣。」',
    achievements: ['親征滅北漢終結五代分裂', '擴大科舉取士確立士大夫政治', '組織編纂《太平御覽》《文苑英華》'],
    quotes: ['開卷有益，朕不以為勞也。'],
    relations: [
      { figureId: 'zhao_kuangyin', label: '兄長太祖', relationType: 'kinship' },
      { figureId: 'zhao_heng', label: '皇子（宋真宗）', relationType: 'kinship' },
      { figureId: 'yang_ye', label: '北伐忠烈將領', relationType: 'subordinate' },
      { figureId: 'yelv_xiuge', label: '高梁河強勁宿敵', relationType: 'rival' }
    ]
  },
  {
    id: 'zhao_heng',
    name: '趙恆 (宋真宗)',
    courtesyName: '元侃',
    titles: ['宋真宗', '澶淵之盟締結者'],
    roles: ['君主', '皇帝', '澶淵之盟君王'],
    faction: 'song',
    birthDeath: [968, 1022],
    birthDeathDisplay: '西元 968 — 1022 年',
    avatar: getAvatar('zhao_heng'),
    origin: '東京開封府',
    bio: '大宋第三任皇帝。景德元年（1004年），遼聖宗與蕭太后率二十萬鐵騎南侵直抵澶州（今河南濮陽），朝野震恐，陳堯叟主張遷都成都，王欽若主遷金陵。宰相寇準力排眾議，促真宗親征進駐澶州北城。宋軍士氣大振，床子弩射殺遼軍統帥蕭撻凜。真宗與遼締結「澶淵之盟」，宋遼結為兄弟之邦，維持了北方長達一百二十年和平。作《勸學詩》「書中自有黃金屋，書中自有顏如玉」廣為流傳。',
    historicalEvaluation: '《宋史》：「真宗踐祚，澶淵弭兵，天下無事，海內繁庶。」',
    achievements: ['親征澶州堅守國門', '締結澶淵之盟換取百年和平', '作《勸學詩》推動全民讀書風氣'],
    quotes: ['富家不用買良田，書中自有千鍾粟。安居不用架高樓，書中自有黃金屋。'],
    relations: [
      { figureId: 'kou_zhun', label: '力勸親征之名相', relationType: 'subordinate' },
      { figureId: 'xiao_chuo', label: '澶淵結盟蕭太后', relationType: 'rival' },
      { figureId: 'zhao_zhen', label: '皇子（宋仁宗）', relationType: 'kinship' }
    ]
  },
  {
    id: 'zhao_zhen',
    name: '趙禎 (宋仁宗)',
    courtesyName: '德基',
    titles: ['宋仁宗', '仁祖', '仁宗盛治開創者'],
    roles: ['君主', '皇帝', '仁愛盛治帝王'],
    faction: 'song',
    birthDeath: [1010, 1063],
    birthDeathDisplay: '西元 1010 — 1063 年',
    avatar: getAvatar('zhao_zhen'),
    origin: '東京開封府',
    bio: '宋真宗第六子，大宋第四任皇帝，在位四十二年，為宋代在位最久之天子。性格恭儉仁愛，慎用刑罰，虛懷納諫。在位期間名臣輩出，文星璀璨：范仲淹、歐陽修、富弼、韓琦、包拯、狄仁傑之後狄青、三蘇、司馬光、王安石皆匯聚朝堂；支持范仲淹推行「慶曆新政」；北宋經濟文化達於極盛，四大發明中的活字印刷、指南針皆成熟於此時。駕崩之日，京師罷市巷哭，甚至遼道宗耶律洪基亦泣曰：「四十二年不識兵革矣！」為之建衣冠冢。',
    historicalEvaluation: '《宋史》評曰：「仁宗在位四十二年，恭儉仁恕，天下昇平，堪稱千古仁君之極則。」',
    achievements: ['開創仁宗盛治四十二年', '包容百官寬厚納諫', '慶曆新政支持名臣整肅朝綱'],
    quotes: ['朕豈可因一己口腹之欲，而開深夜濫費之端！'],
    relations: [
      { figureId: 'fan_zhongyan', label: '慶曆新政託付名相', relationType: 'subordinate' },
      { figureId: 'bao_zheng', label: '信任重用鐵面清官', relationType: 'subordinate' },
      { figureId: 'ouyang_xiu', label: '文壇伯樂重臣', relationType: 'subordinate' },
      { figureId: 'di_qing', label: '破格拔擢樞密使名將', relationType: 'subordinate' }
    ]
  },
  {
    id: 'zhao_xu',
    name: '趙頊 (宋神宗)',
    courtesyName: '頊',
    titles: ['宋神宗', '熙寧變法君王'],
    roles: ['君主', '皇帝', '求治變法英主'],
    faction: 'song',
    birthDeath: [1048, 1085],
    birthDeathDisplay: '西元 1048 — 1085 年',
    avatar: getAvatar('zhao_xu'),
    origin: '東京開封府',
    bio: '大宋第六任皇帝。即位時面對宋朝「積貧積弱」之冗官、冗兵、冗費三冗危機，銳意圖強，不甘苟安。熙寧二年（1069年）力排朝野舊臣重阻，拜王安石為參知政事兼宰相，全面實施「熙寧變法」（青苗法、市易法、免役法、保甲法）；軍事上命王韶收復河湟熙河六州，拓地二千里，使西夏震恐。後五路伐夏因永樂城之戰慘敗，神宗徹夜慟哭，抑鬱成疾崩逝。',
    historicalEvaluation: '《宋史》：「神宗厲精圖治，將大有為；變法開邊，志不可謂不廣。」',
    achievements: ['鼎力支持王安石熙寧變法', '熙河開邊拓地二千里', '革除冗弊增闢朝廷國庫財政'],
    quotes: ['天下弊事至多，安可因循不改！'],
    relations: [
      { figureId: 'wang_an_shi', label: '熙寧變法君臣莫逆', relationType: 'colleague' },
      { figureId: 'sima_guang', label: '敬重其德行之反對派領袖', relationType: 'colleague' },
      { figureId: 'wang_shao', label: '主持熙河開邊名將', relationType: 'subordinate' }
    ]
  },
  {
    id: 'zhao_ji',
    name: '趙佶 (宋徽宗)',
    courtesyName: '佶',
    titles: ['宋徽宗', '端王', '瘦金體開創宗師'],
    roles: ['君主', '藝術大師', '靖康亡國之君'],
    faction: 'song',
    birthDeath: [1082, 1135],
    birthDeathDisplay: '西元 1082 — 1135 年',
    avatar: getAvatar('zhao_ji'),
    origin: '東京開封府',
    bio: '宋神宗第十一子，大宋第八任皇帝。藝術天賦極高，工工筆花鳥，自創風骨傲霜之「瘦金體」，親自主持翰林圖畫院，催生張擇端《清明上河圖》與王希孟《千里江山圖》，為古代藝術造詣最高之帝王。然而政治極其荒唐昏庸，寵信蔡京、童貫「六賊」，大興花石綱修建艮嶽，窮奢極欲民怨沸騰。對外結金滅遼策動海上之盟，引狼入室。靖康二年金軍攻陷汴京，徽欽二帝被俘五國城受辱，客死異域。',
    historicalEvaluation: '《宋史》評曰：「徽宗諸事皆能，獨不能為君耳！身辱國破，可不痛哉。」',
    achievements: ['開創絕世書法「瘦金體」', '主持畫院催生《清明上河圖》《千里江山圖》', '建立天下首屈一指之翰林藝術體制'],
    quotes: ['徹夜西風撼破扉，蕭條孤館一燈微。家山回首三千里，目斷山南無雁飛。'],
    relations: [
      { figureId: 'zhao_gou', label: '第九子（宋高宗）', relationType: 'kinship' },
      { figureId: 'wanyan_aguda', label: '海上之盟引狼入室之金太祖', relationType: 'rival' },
      { figureId: 'li_gang', label: '起用抗金後又罷黜之忠臣', relationType: 'subordinate' }
    ]
  },
  {
    id: 'zhao_pu',
    name: '趙普 (則平)',
    courtesyName: '則平',
    titles: ['宰相', '韓王', '大宋開國第一謀臣'],
    roles: ['謀臣', '宰相', '開國元勛'],
    faction: 'song',
    birthDeath: [922, 992],
    birthDeathDisplay: '西元 922 — 992 年',
    avatar: getAvatar('zhao_pu'),
    origin: '幽州薊縣（今北京西南）',
    bio: '北宋開國宰相與首席謀士。輔佐宋太祖策劃陳橋兵變；針對五代武人專橫亂政之禍根，向太祖提出「稍奪其權，制其錢穀，收其精兵」之千古名策，主導「杯酒釋兵權」，確立北宋中央集權文官體制。相太祖、太宗兩朝，果斷敢言，常閉門讀《論語》，自謂「半部論語治天下」。',
    historicalEvaluation: '《宋史》評曰：「趙普佐太祖定天下，運籌帷幄，制治保邦，真名相也。」',
    achievements: ['策劃陳橋兵變立宋', '提出削奪方鎮兵權國策', '「半部論語治天下」千古名相'],
    quotes: ['臣有《論語》一部，以半部佐太祖定天下，以半部佐陛下致太平。'],
    relations: [
      { figureId: 'zhao_kuangyin', label: '君臣莫逆定天下', relationType: 'superior' },
      { figureId: 'zhao_guangyi', label: '輔佐太宗傳奇金匱之盟', relationType: 'superior' }
    ]
  },
  {
    id: 'kou_zhun',
    name: '寇準 (平仲)',
    courtesyName: '平仲',
    titles: ['宰相', '萊國公', '澶淵砥柱'],
    roles: ['宰相', '孤忠重臣', '力主親征名相'],
    faction: 'song',
    birthDeath: [961, 1023],
    birthDeathDisplay: '西元 961 — 1023 年',
    avatar: getAvatar('kou_zhun'),
    origin: '華州下邽（今陝西渭南）',
    bio: '北宋前期一代賢相。進士出身，性剛正果決，不避權貴。景德元年遼軍二十萬深入中原進逼澶州，舉朝驚慌欲南逃，寇準力斥群臣：「誰為陛下畫此策者，罪可斬也！」力勸宋真宗親征，親自坐鎮澶州北城督戰，談笑弈棋以安人心。射殺遼統帥蕭撻凜後促成澶淵之盟，保全社稷。晚年遭奸相王欽若、丁謂讒害，貶死雷州，天下士民深痛之。',
    historicalEvaluation: '《宋史》評曰：「寇準臨危制變，挽狂瀾於既倒，功在社稷。」',
    achievements: ['力排眾議促真宗親征澶州', '締結澶淵之盟大定天下', '剛正不阿百折不撓'],
    quotes: ['陛下不過澶州，敵氣益盛，若出親征，敵必驚散！'],
    relations: [
      { figureId: 'zhao_heng', label: '力勸親征之天子', relationType: 'superior' },
      { figureId: 'xiao_chuo', label: '戰場對峙締約蕭太后', relationType: 'rival' }
    ]
  },
  {
    id: 'fan_zhongyan',
    name: '范仲淹 (希文)',
    courtesyName: '希文',
    titles: ['參知政事', '文正公', '慶曆新政主持者'],
    roles: ['名臣', '文學家', '儒將', '慶曆變法名相'],
    faction: 'song',
    birthDeath: [989, 1052],
    birthDeathDisplay: '西元 989 — 1052 年',
    avatar: getAvatar('fan_zhongyan'),
    origin: '蘇州吳縣（今江蘇蘇州）',
    bio: '北宋傑出政治家、文學家、軍事家。少孤貧苦讀，「斷齏塊粥」堅忍立志。康定年間西夏李元昊反叛，范仲淹受命經略陝西，修築青澗城、大順城，改革軍制，西夏人相戒曰：「軍中有一范，西賊聞之驚破膽！」慶曆三年任參知政事，主持「慶曆新政」，澄清吏治、擇長官、均公田。作《岳陽樓記》名句「先天下之憂而憂，後天下之樂而樂」，立宋代理想士大夫最高精神坐標。',
    historicalEvaluation: '王安石讚曰：「一世之師，由初迄終，名節無疵！」朱熹譽為「天地間第一流人物」。',
    achievements: ['作《岳陽樓記》樹立士人風骨', '經略西北修築城堡禦西夏', '發動慶曆新政開創改革風氣'],
    quotes: ['先天下之憂而憂，後天下之樂而樂！', '塞下秋來風景異，衡陽雁去無留意。濁酒一杯家萬里，燕然未勒歸無計。'],
    relations: [
      { figureId: 'zhao_zhen', label: '仁宗天子重用之相', relationType: 'superior' },
      { figureId: 'han_qi', label: '韓范齊名經略西北', relationType: 'colleague' },
      { figureId: 'ouyang_xiu', label: '慶曆新政生死同盟', relationType: 'ally' },
      { figureId: 'di_qing', label: '授以《左氏春秋》提拔為名將', relationType: 'mentor' }
    ]
  },
  {
    id: 'han_qi',
    name: '韓琦 (稚圭)',
    courtesyName: '稚圭',
    titles: ['宰相', '魏國公', '忠獻公', '三朝元老'],
    roles: ['宰相', '重臣', '三朝砥柱'],
    faction: 'song',
    birthDeath: [1008, 1075],
    birthDeathDisplay: '西元 1008 — 1075 年',
    avatar: getAvatar('han_qi'),
    origin: '相州安陽（今河南安陽）',
    bio: '北宋仁宗、英宗、神宗三朝元老重臣，與范仲淹齊名，天下稱「韓范」。早年與范仲淹共同經略陝西抵禦西夏；好水川之戰宋軍失利，韓琦痛定思痛撫恤死難，安輯邊疆。仁宗晚年定策立英宗，英宗時安定宗室，定策立神宗，出處進退端重如山。神宗初年直言諫阻王安石青苗法之弊，天下重其德望。',
    historicalEvaluation: '《宋史》評曰：「韓琦相三朝，立二帝，臨大事，決大議，色不變，真定策大臣也。」',
    achievements: ['經略西北抵禦西夏', '定策立英宗神宗兩代天子', '三朝砥柱德望蓋天下'],
    quotes: ['事有大利大害，當計其全局，安可操切為之！'],
    relations: [
      { figureId: 'fan_zhongyan', label: '韓范經略西北摯交', relationType: 'colleague' },
      { figureId: 'fu_bi', label: '富韓齊名名相', relationType: 'colleague' },
      { figureId: 'zhao_zhen', label: '仁宗朝推心倚重', relationType: 'superior' }
    ]
  },
  {
    id: 'fu_bi',
    name: '富弼 (彥國)',
    courtesyName: '彥國',
    titles: ['宰相', '文忠公', '鄭國公'],
    roles: ['宰相', '外交家', '慶曆名臣'],
    faction: 'song',
    birthDeath: [1004, 1083],
    birthDeathDisplay: '西元 1004 — 1083 年',
    avatar: getAvatar('fu_bi'),
    origin: '河南洛陽',
    bio: '北宋慶曆名相、傑出外交家。慶曆二年契丹聚兵十萬於邊境趁火打劫，要求宋朝割地。富弼受命單騎出使大遼，面對遼興宗咄咄逼人之勢，富弼據理力爭，陳說「契丹與大宋和則兩利，戰則兩傷，獲宋歲幣利歸君主，若興兵動眾獲利者乃下臣」之利害，遼主為之動容罷割地之議，以增歲幣二十萬兩定約，兵不血刃消弭大戰危機。',
    historicalEvaluation: '《宋史》：「富弼通敏有智略，善辭令，出使敵國，社稷安危所繫。」',
    achievements: ['單騎出使遼國化解割地之危', '推行青州賑濟災民救活五十萬人', '慶曆新政骨幹大臣'],
    quotes: ['北朝與宋和則兩利，戰則兩傷，陛下熟思之！'],
    relations: [
      { figureId: 'fan_zhongyan', label: '慶曆同列執政', relationType: 'colleague' },
      { figureId: 'han_qi', label: '富韓齊名名相', relationType: 'colleague' }
    ]
  },
  {
    id: 'bao_zheng',
    name: '包拯 (希仁)',
    courtesyName: '希仁',
    titles: ['樞密副使', '龍圖閣直學士', '開封府尹', '包青天'],
    roles: ['名臣', '清官典範', '執法如山'],
    faction: 'song',
    birthDeath: [999, 1062],
    birthDeathDisplay: '西元 999 — 1062 年',
    avatar: getAvatar('bao_zheng'),
    origin: '廬州合肥（今安徽合肥）',
    bio: '華夏歷史上最著名之清官典範「包青天」。任開封府尹時，革除舊制打開正門，使民間疾苦直達堂前；執法嚴明，鐵面無私，不避權貴，彈劾外戚張堯佐、打擊贓官污吏，京師號曰：「關節不到，有閻羅包老。」晚年立家訓：「後代子孫仕宦，有犯贓濫者，不得放歸本家；亡歿之後，不得葬於大墓。」後世戲曲演繹鍘美案、狸貓換太子等故事流芳萬世。',
    historicalEvaluation: '《宋史》評曰：「包拯性剛嚴，惡吏苛刻，務敦厚；不苟笑，以廉潔著稱於世。」',
    achievements: ['開封府尹執法如山肅清吏治', '彈劾不法皇親國戚毫無畏懼', '千古清官象徵流芳百世'],
    quotes: ['清心為治本，直道是身謀。秀幹終成棟，精鋼不作鉤。'],
    relations: [
      { figureId: 'zhao_zhen', label: '仁宗皇帝庇護與深信', relationType: 'superior' },
      { figureId: 'fan_zhongyan', label: '同朝敬重之清名士大夫', relationType: 'colleague' }
    ]
  },
  {
    id: 'wang_an_shi',
    name: '王安石 (介甫)',
    courtesyName: '介甫',
    titles: ['宰相', '荊國公', '半山老人', '熙寧變法領袖'],
    roles: ['改革家', '宰相', '思想家', '唐宋八大家'],
    faction: 'song',
    birthDeath: [1021, 1086],
    birthDeathDisplay: '西元 1021 — 1086 年',
    avatar: getAvatar('wang_an_shi'),
    origin: '撫州臨川（今江西撫州）',
    bio: '北宋最著名政治改革家、思想家、文學家，「唐宋八大家」之一。神宗熙寧年間任宰相，立「天變不足畏，祖宗不足法，人言不足恤」三不足精神，全面推行「熙寧變法」：推行青苗法借貸貧民、募役法以錢代役、方田均稅法打擊兼併、市易法平抑物價，使大宋國庫大為充盈。然因執行官吏操切貪功及舊黨劇烈反撲，兩度罷相退隱金陵半山。其詩文雄健峻峭，《泊船瓜洲》（「春風又綠江南岸，明月何時照我還」）膾炙人口。',
    historicalEvaluation: '列寧讚為「中國十一世紀的改革家」；《宋史》：「安石學博文富，志在強國富民，勇於敢為。」',
    achievements: ['發動規模宏大之熙寧變法', '增闢國庫歲入扭轉積貧局勢', '列名唐宋八大家詩文巨匠'],
    quotes: ['天變不足畏，祖宗不足法，人言不足恤！', '不畏浮雲遮望眼，自緣身在最高層。'],
    relations: [
      { figureId: 'zhao_xu', label: '神宗皇帝力挺變法', relationType: 'superior' },
      { figureId: 'sima_guang', label: '政見水火情誼猶存之宿敵', relationType: 'rival' },
      { figureId: 'su_shi', label: '晚年金陵一笑泯恩仇之文友', relationType: 'ally' }
    ]
  },
  {
    id: 'sima_guang',
    name: '司馬光 (君實)',
    courtesyName: '君實',
    titles: ['宰相', '溫國公', '《資治通鑑》主編者'],
    roles: ['史學家', '宰相', '保守派領袖'],
    faction: 'song',
    birthDeath: [1019, 1086],
    birthDeathDisplay: '西元 1019 — 1086 年',
    avatar: getAvatar('sima_guang'),
    origin: '陝州夏縣（今山西夏縣）',
    bio: '北宋傑出史學家、政治家，歷仕仁宗、英宗、神宗、哲宗四朝。幼年「司馬光砸缸」救同伴智勇過人。反對王安石激進變法，認為祖宗成法不可輕動，退居洛陽十五年，閉門修史，歷時十九年主持編纂編成華夏第一部編年體編年史巨著《資治通鑑》（涵蓋十六朝1362年歷史），宋神宗賜序「鑑於往事，有資於治道」。哲宗即位拜相，盡廢王安石新法，史稱「元祐更化」。',
    historicalEvaluation: '朱熹評曰：「公忠亮天出，議論醇正，一代完人，史學冠古今。」',
    achievements: ['主持編纂294卷編年史巨著《資治通鑑》', '堅守道義德高望重', '主持元祐更化安撫百姓'],
    quotes: ['鑑於往事，有資於治道。', '由儉入奢易，由奢入儉難。'],
    relations: [
      { figureId: 'wang_an_shi', label: '君子之爭政見死敵', relationType: 'rival' },
      { figureId: 'zhao_zhen', label: '仁宗盛治直言敢諫名臣', relationType: 'superior' },
      { figureId: 'su_shi', label: '元祐同黨提攜文豪', relationType: 'ally' }
    ]
  },
  {
    id: 'di_qing',
    name: '狄青 (漢臣)',
    courtesyName: '漢臣',
    titles: ['樞密使', '面涅將軍', '武襄公'],
    roles: ['名將', '大宋第一戰神', '西夏剋星'],
    faction: 'song',
    birthDeath: [1008, 1057],
    birthDeathDisplay: '西元 1008 — 1057 年',
    avatar: getAvatar('di_qing'),
    origin: '汾州西河（今山西汾陽）',
    bio: '北宋傳奇名將，行伍出身，面刺金字。每臨大敵披頭散髮、戴青銅面具，手持長槍單騎馳入敵陣，西夏兵望之披靡稱為「面涅將軍」。范仲淹授以《左氏春秋》勉曰：「將不知古今，匹夫之勇耳！」狄青折節讀書，通曉兵法，平生二十五戰全勝。皇祐年間廣西儂智高叛亂席捲嶺南，狄青夜渡崑崙關，大破儂智高於歸仁鋪，平定廣西。官至樞密使（最高軍事長官），為文官集團猜忌，憂懼發病卒。',
    historicalEvaluation: '《宋史》評曰：「狄青奮行伍，拔英奇，平西夏，平儂智高，威震四裔，宋之良將！」',
    achievements: ['面具突陣大破西夏二十五戰全勝', '上元夜奪崑崙關平定儂智高', '行伍出身官拜樞密使傳奇'],
    quotes: ['陛下不以臣出身卑賤而用之，臣願以死報國家！'],
    relations: [
      { figureId: 'fan_zhongyan', label: '兵法授業恩師', relationType: 'mentor' },
      { figureId: 'zhao_zhen', label: '力排眾議破格拔擢之仁君', relationType: 'superior' }
    ]
  },
  {
    id: 'shen_kuo',
    name: '沈括 (存中)',
    courtesyName: '存中',
    titles: ['翰林學士', '司天監', '夢溪丈人'],
    roles: ['科學家', '博學宗師', '兵略家'],
    faction: 'cultural',
    birthDeath: [1031, 1095],
    birthDeathDisplay: '西元 1031 — 1095 年',
    avatar: getAvatar('shen_kuo'),
    origin: '杭州錢塘（今浙江杭州）',
    bio: '北宋全才科學家、政治家、軍事家。參與王安石變法，任司天監改革曆法；出使遼國據理力爭白溝河邊界，折服遼主。晚年隱居潤州（今江蘇鎮江）夢溪園，撰寫劃時代科學巨著《夢溪筆談》，詳盡記載畢昇活字印刷術、指南針地磁偏角（世界最早記錄）、石油命名與開採、地質學流水侵蝕理論等，被英國學者李約瑟譽為「中國科學史上的坐標」。',
    historicalEvaluation: '李約瑟讚曰：「沈括是中國整部科學史上最卓越的人物之一，《夢溪筆談》為中國科學史坐標。」',
    achievements: ['撰寫世界科學名著《夢溪筆談》', '首創「石油」之名並預言其大行天下', '記載畢昇活字印刷與指南針磁偏角'],
    quotes: ['石油至多，生於地中無窮，此物後必大行於世！'],
    relations: [
      { figureId: 'wang_an_shi', label: '新黨變法同僚', relationType: 'colleague' },
      { figureId: 'zhao_xu', label: '神宗朝委以重任', relationType: 'superior' }
    ]
  },
  {
    id: 'yang_ye',
    name: '楊業 (繼業)',
    courtesyName: '繼業',
    titles: ['右領軍衛大將軍', '代州刺史', '楊無敵'],
    roles: ['名將', '楊家將始祖', '滿門忠烈'],
    faction: 'song',
    birthDeath: [932, 986],
    birthDeathDisplay: '西元 932 — 986 年',
    avatar: getAvatar('yang_ye'),
    origin: '并州太原（今山西太原）',
    bio: '北宋抗遼名將，「楊家將」之始祖。原為北漢大將，勇冠三軍號「無敵」。歸宋後守代州雁門關，太平興國五年，遼軍十萬侵雁門，楊業以數百奇騎自代州北出雁門山，繞至遼軍背後突襲，斬遼大將蕭咄李，威名震遼。雍熙三年太宗北伐，監軍王侁進逼楊業出戰，業明知必死泣曰：「業非避死，今時不利必致覆敗！」於陳家谷力戰自日昳至暮，部下殆盡，重傷被俘，絕食三日壯烈殉國。',
    historicalEvaluation: '《宋史》評曰：「業以勇略冠諸軍，身經百戰，力竭殉國，大節昭然！」',
    achievements: ['雁門關出奇兵大破十萬遼軍', '陳家谷力戰殉國氣貫長虹', '開創傳誦千載之楊家將忠烈滿門'],
    quotes: ['業受主厚恩，誓以許國。今至此，願以一死報陛下！'],
    relations: [
      { figureId: 'zhao_guangyi', label: '太宗皇帝命其北伐', relationType: 'superior' },
      { figureId: 'yelv_xiezhen', label: '陳家谷合圍伏擊敵帥', relationType: 'rival' }
    ]
  },
  {
    id: 'li_gang',
    name: '李綱 (伯紀)',
    courtesyName: '伯紀',
    titles: ['尚書右僕射', '汴京留守', '抗金第一忠臣'],
    roles: ['名臣', '抗金主帥', '民族英雄'],
    faction: 'song',
    birthDeath: [1083, 1140],
    birthDeathDisplay: '西元 1083 — 1140 年',
    avatar: getAvatar('li_gang'),
    origin: '邵武（今福建邵武）',
    bio: '北宋末靖康抗金核心主戰領袖。宣和七年金軍大舉南下圍攻汴京，朝廷驚慌欲南逃，李綱冒死泣諫欽宗留守，親自登城指揮東京保衛戰，造霹靂砲、強弩擊退金帥完顏宗望數十次強攻，力保汴京不失。後遭投降派陷害罷職，致使汴京陷落爆發靖康之恥。南宋初高宗即位召為宰相，李綱力主抗金整頓軍馬，在相僅七十五日復遭黃潛善、汪伯彥排擠，天下士民仰天痛哭。',
    historicalEvaluation: '《宋史》評曰：「李綱孤忠挺出，力抗大虜，危城獨全；惜天不用，國祚遂傾。」',
    achievements: ['主持第一次東京保衛戰擊退金軍', '建立軍政規劃整飭南宋防線'],
    quotes: ['今日之事，義當與社稷同死生，不可退一步！'],
    relations: [
      { figureId: 'zong_ze', label: '抗金同仇志友', relationType: 'ally' },
      { figureId: 'zhao_gou', label: '拜相七十五日之主', relationType: 'superior' }
    ]
  },
  {
    id: 'zong_ze',
    name: '宗澤 (汝霖)',
    courtesyName: '汝霖',
    titles: ['東京留守', '同知樞密院事', '宗爺爺'],
    roles: ['名將', '抗金老帥', '渡河英雄'],
    faction: 'song',
    birthDeath: [1059, 1128],
    birthDeathDisplay: '西元 1059 — 1128 年',
    avatar: getAvatar('zong_ze'),
    origin: '婺州義烏（今浙江義烏）',
    bio: '北宋末南宋初抗金老元帥，岳飛之伯樂。金兵圍汴京，宗澤孤軍抗戰連勝金兵，靖康後受命為東京留守，聯絡河北太行忠義民兵百萬，威名震動金國，金人畏稱「宗爺爺」。力拔岳飛於微賤，授以陣法勉以精忠。一心光復中原迎回二帝，前後二十四次上疏高宗請還都開封，皆為秦檜、黃潛善等主和派所阻。憂憤成疾，臨終大呼三聲「過河！過河！過河！」氣絕殉國。',
    historicalEvaluation: '《宋史》：「澤剛毅有大略，連和義旅，心懸兩宮，三呼過河，烈士同悲！」',
    achievements: ['留守開封聯結百萬太行山義軍', '慧眼識英雄拔擢岳飛', '臨終三呼過河氣吞山河'],
    quotes: ['過河！過河！過河！'],
    relations: [
      { figureId: 'yue_fei', label: '授業拔擢第一伯樂恩帥', relationType: 'mentor' },
      { figureId: 'li_gang', label: '同心抗金國士', relationType: 'ally' },
      { figureId: 'zhao_gou', label: '二十四上奏求還都之天子', relationType: 'superior' }
    ]
  },

  // --- SOUTHERN SONG HEROES (YUE ARMY & JIN CONFLICT) ---
  {
    id: 'zhao_gou',
    name: '趙構 (宋高宗)',
    courtesyName: '德基',
    titles: ['宋高宗', '康王', '南宋開國皇帝'],
    roles: ['君主', '皇帝', '南宋偏安開國皇帝'],
    faction: 'song',
    birthDeath: [1107, 1187],
    birthDeathDisplay: '西元 1107 — 1187 年',
    avatar: getAvatar('zhao_gou'),
    origin: '東京開封府',
    bio: '宋徽宗第九子，南宋開國皇帝。靖康之變徽欽二帝被俘，趙構於南京應天府即位重建趙宋。金兵搜山檢海追襲，高宗航海避難於溫州舟山。後任用岳飛、韓世忠、張浚等收復荊楚中原。紹興十年岳家軍大捷之際，因恐二帝歸還皇位難保及武人勢大，十二道金牌班師回朝，夥同秦檜殺害岳飛，與金締結紹興和議劃淮為界，奠定南宋百餘年偏安東南半壁江山。',
    historicalEvaluation: '《宋史》：「高宗遭離亂，奠定東南；任賢克難，中道猜忌，殺戮良將，千秋公論自定。」',
    achievements: ['建炎南渡重建宋朝社稷', '立臨安為都保全江南文華', '促成紹興和議兩朝休兵'],
    quotes: ['自古帝王苟無天下之福，雖勇若項羽亦歸於敗，朕唯務安民足矣。'],
    relations: [
      { figureId: 'yue_fei', label: '十二道金牌屈殺之忠帥', relationType: 'subordinate' },
      { figureId: 'qin_hui', label: '主和相公密謀殺岳飛', relationType: 'colleague' },
      { figureId: 'han_shizhong', label: '黃天蕩禦敵重臣', relationType: 'subordinate' },
      { figureId: 'zhao_shen', label: '禪位賢義養子（宋孝宗）', relationType: 'kinship' }
    ]
  },
  {
    id: 'yue_fei',
    name: '岳飛 (鵬舉)',
    courtesyName: '鵬舉',
    titles: ['太尉', '鄂王', '武穆公', '抗金第一民族英雄'],
    roles: ['名將', '民族英雄', '岳家軍統帥'],
    faction: 'song',
    birthDeath: [1103, 1142],
    birthDeathDisplay: '西元 1103 — 1142 年',
    avatar: getAvatar('yue_fei'),
    origin: '相州湯陰（今河南湯陰）',
    bio: '華夏歷史上最崇高之民族英雄、軍事家。少懷大志，母刺「精忠報國」於背。靖康之變起兵抗金，宗澤識其才。組建紀律嚴明之「岳家軍」（「凍死不拆屋，餓死不擄掠」），金軍號曰「撼山易，撼岳家軍難」。紹興十年大舉北伐，郾城、潁昌大捷破金兀朮拐子馬與重裝鐵浮屠，進抵朱仙鎮，中原收復在即。宋高宗與秦檜一日下十二道金牌逼令班師，以「莫須有」罪名誣殺於杭州風波亭，年僅三十九歲。詞作《滿江紅·怒髮衝冠》萬古傳唱。',
    historicalEvaluation: '《宋史》評曰：「西漢而下，若飛者，求之古人，少其倫比；忠烈浩氣，長存天地！」',
    achievements: ['組建戰無不勝之岳家軍', '郾城潁昌大捷大破金兀朮鐵浮屠', '千古悲壯《滿江紅》愛國詞宗'],
    quotes: ['靖康恥，猶未雪；臣子恨，何時滅！駕長車，踏破賀蘭山缺。壯志飢餐胡虜肉，笑談渴飲匈奴血。待從頭、收拾舊山河，朝天闕！', '文臣不愛錢，武臣不惜死，天下太平矣！'],
    relations: [
      { figureId: 'zong_ze', label: '恩師宗爺爺', relationType: 'mentor' },
      { figureId: 'yue_yun', label: '長子·背嵬軍統帥（同殉難）', relationType: 'kinship' },
      { figureId: 'zhang_xian', label: '副帥大將（同殉風波亭）', relationType: 'subordinate' },
      { figureId: 'wanyan_zongbi', label: '一生血戰交鋒之金兀朮', relationType: 'rival' },
      { figureId: 'qin_hui', label: '風波亭陷害千古仇敵', relationType: 'rival' },
      { figureId: 'zhao_gou', label: '金牌連催扼殺北伐之帝', relationType: 'superior' }
    ]
  },
  {
    id: 'yue_yun',
    name: '岳雲 (應祥)',
    courtesyName: '應祥',
    titles: ['忠銳軍統領', '繼忠侯', '背嵬軍先鋒'],
    roles: ['少將軍', '鐵錘雙絕', '殉國勇將'],
    faction: 'song',
    birthDeath: [1119, 1142],
    birthDeathDisplay: '西元 1119 — 1142 年',
    avatar: getAvatar('yue_yun'),
    origin: '相州湯陰',
    bio: '岳飛長子，十二歲隨父從軍。手持一對重八十斤雙鐵錐，臨陣每先登破敵，軍中號「贏官人」。穎昌之戰中，率八千背嵬騎突入數萬金兀朮精銳中，血戰數十合身受百餘創，金人潰散。紹興十一年隨父岳飛入獄，大義凜然，同被秦檜斬於風波亭，年僅二十三歲。',
    historicalEvaluation: '《宋史》：「雲勇冠三軍，每戰必先登；孝勇兼備，惜乎早殞！」',
    achievements: ['手持雙錘勇冠背嵬軍', '穎昌大捷血戰破金軍拐子馬', '二十三歲壯烈從父就義'],
    quotes: ['父親何言？雲死亦從容報國！'],
    relations: [
      { figureId: 'yue_fei', label: '父親·誓死追隨', relationType: 'kinship' },
      { figureId: 'zhang_xian', label: '同袍叔輩同遇害', relationType: 'colleague' }
    ]
  },
  {
    id: 'han_shizhong',
    name: '韓世忠 (良臣)',
    courtesyName: '良臣',
    titles: ['太保', '樞密使', '蘄王', '中興四將'],
    roles: ['名將', '南宋中興四將', '黃天蕩統帥'],
    faction: 'song',
    birthDeath: [1089, 1151],
    birthDeathDisplay: '西元 1089 — 1151 年',
    avatar: getAvatar('han_shizhong'),
    origin: '延安（今陝西綏德）',
    bio: '南宋中興四將之一。身材魁梧勇力絕倫。苗劉兵變中首引大軍勤王護駕。建炎四年金兀朮十萬大軍深入江浙大肆掠奪北撤，韓世忠與夫人梁紅玉引八千水師截斷長江退路，梁紅玉金山親自擊鼓，困金兀朮於黃天蕩四十八天，以少勝多重創金軍主力。岳飛下獄時，舉朝默不敢言，韓世忠一人直奔相府怒責秦檜：「莫須有三字，何以服天下！」罷官閉門謝客，騎驢西湖終老。',
    historicalEvaluation: '《宋史》評曰：「世忠忠勇，知岳飛之冤，抗言廷諍，義形於色，天下稱其長者。」',
    achievements: ['平定苗劉兵變克復大統', '黃天蕩八千水師困十萬金兵', '直斥秦檜莫須有三字何以服天下'],
    quotes: ['莫須有三字，何以服天下！'],
    relations: [
      { figureId: 'liang_hongyu', label: '夫妻·金山擊鼓同袍', relationType: 'kinship' },
      { figureId: 'yue_fei', label: '同心抗金抗言為其申冤', relationType: 'ally' },
      { figureId: 'qin_hui', label: '斥責投降陷害名相', relationType: 'rival' }
    ]
  },
  {
    id: 'liang_hongyu',
    name: '梁紅玉',
    courtesyName: '紅玉',
    titles: ['安國夫人', '楊國夫人', '巾幗名將'],
    roles: ['女將', '擊鼓退金兵', '巾幗英雄'],
    faction: 'song',
    birthDeath: [1102, 1135],
    birthDeathDisplay: '西元 1102 — 1135 年',
    avatar: getAvatar('liang_hongyu'),
    origin: '楚州（今江蘇淮安）',
    bio: '南宋抗金傳奇女英雄，韓世忠之妻。精通騎射與戰術。建炎四年黃天蕩之戰，金兀朮十萬精兵突圍長江，梁紅玉身先士卒立於江心海船之巔，親自擂響金山戰鼓，鼓聲如雷震天動地，宋軍水師士氣大奮，以海船巨拍擊沉無數金軍小舟，大破十萬金軍。後鎮守楚州十餘年，與韓世忠披荊斬棘，深受三軍與百姓敬仰。',
    historicalEvaluation: '《建炎以來朝野雜記》讚曰：「梁夫人英烈過人，桴鼓助陣，古今巾幗罕見。」',
    achievements: ['金山親自擂鼓大破金兀朮', '披堅執銳鎮守楚州長江門戶'],
    quotes: ['敵眾雖盛，我長江天險樓船在此，鼓聲不息，死戰不退！'],
    relations: [
      { figureId: 'han_shizhong', label: '夫妻同心擊鼓抗金', relationType: 'kinship' },
      { figureId: 'wanyan_zongbi', label: '長江黃天蕩圍困敵帥', relationType: 'rival' }
    ]
  },
  {
    id: 'yu_yunwen',
    name: '虞允文 (彬甫)',
    courtesyName: '彬甫',
    titles: ['右丞相', '雍國公', '采石之戰統帥'],
    roles: ['名臣', '書生統帥', '采石大捷民族英雄'],
    faction: 'song',
    birthDeath: [1110, 1174],
    birthDeathDisplay: '西元 1110 — 1174 年',
    avatar: getAvatar('yu_yunwen'),
    origin: '隆州仁壽（今四川仁壽）',
    bio: '南宋抗金傳奇儒將。紹興三十一年，金海陵王完顏亮發動六十萬水陸大軍南侵，狂言「提兵百萬西湖上，立馬吳山第一峰」，宋主帥李顯忠畏怯逃避，江防危在旦夕。文弱書生虞允文受命督師采石磯，見宋軍萬八千人散亂無主，毅然挺身誓師激勵三軍：「國家養汝輩，正為今日，豈可望風退避！」親駕海船突入金江中艦隊，投擲霹靂砲火焚敵舟，六十萬金兵大敗潰散。完顏亮敗退瓜洲遭部下兵變弒殺，南宋社稷轉危為安。毛澤東批注「偉哉虞公，千古一人」。',
    historicalEvaluation: '《宋史》評曰：「允文慷慨抗言，采石一役，力挽傾頹，微公社稷其殆矣。」',
    achievements: ['書生督師采石磯大捷', '以一萬八破完顏亮六十萬南侵', '力挽南宋半壁江山狂瀾'],
    quotes: ['國家養汝輩數十年，正為今日，大丈夫豈可退死田舍！'],
    relations: [
      { figureId: 'wanyan_liang', label: '采石江面痛擊粉碎侵宋野心', relationType: 'rival' },
      { figureId: 'zhao_shen', label: '孝宗朝拜相倚重北伐', relationType: 'superior' }
    ]
  },
  {
    id: 'meng_gong',
    name: '孟珙 (璞玉)',
    courtesyName: '璞玉',
    titles: ['樞密副使', '吉國公', '機動防禦大師'],
    roles: ['軍事家', '名將', '大宋擎天柱石'],
    faction: 'song',
    birthDeath: [1195, 1246],
    birthDeathDisplay: '西元 1195 — 1246 年',
    avatar: getAvatar('meng_gong'),
    origin: '隨州棗陽（祖籍絳州）',
    bio: '南宋抗金抗蒙第一軍神，被西方軍事史家譽為「十三世紀最偉大的機動防禦大師」。端平元年統率宋軍聯蒙滅金，攻破蔡州，金哀宗自縊，分得金哀宗遺骸歸祭臨安太廟，雪百年靖康之恥。隨後擔綱長江防禦統帥，兼領荊湘、川蜀兩大戰區，創立「一體化山城防禦體系」（重慶合川釣魚城即其規劃），以一人之力抗擊不可一世之蒙古鐵騎十年，未嘗一敗。逝世後蒙古始得深入長江。',
    historicalEvaluation: '《宋史》評曰：「孟珙忠勇威毅，百戰百勝，蔽遮江淮，大宋擎天之柱！」',
    achievements: ['聯蒙滅金攻破蔡州雪靖康恥', '建立釣魚城山城大防禦體系', '獨力抵禦蒙古鐵騎十年保全東南'],
    quotes: ['山城險要，順流阻逆，虜騎雖勁，何能插翅過江！'],
    relations: [
      { figureId: 'temujin', label: '抗衡蒙古鐵騎帝國', relationType: 'rival' }
    ]
  },
  {
    id: 'wen_tianxiang',
    name: '文天祥 (履善)',
    courtesyName: '履善 / 宋瑞',
    titles: ['右丞相', '信國公', '狀元及第', '狀元宰相'],
    roles: ['丞相', '狀元', '抗元烈士', '民族英雄'],
    faction: 'song',
    birthDeath: [1236, 1283],
    birthDeathDisplay: '西元 1236 — 1283 年',
    avatar: getAvatar('wen_tianxiang'),
    origin: '吉州廬陵（今江西吉安）',
    bio: '南宋末期狀元丞相，中華民族最高氣節之化身。德祐元年元軍逼臨安，文天祥散盡家資召募萬人勤王。臨安淪陷後受命赴元營談判遭拘，智脫抵福州、溫州，繼續擁立幼帝苦戰贛粵。祥興元年於海豐五坡嶺兵敗被俘，元將張弘範逼其寫信招降崖山陸秀夫，天祥書《過零丁洋》示之：「人生自古誰無死，留取丹心照汗青！」押解大都（北京）幽囚土牢四年，威逼利誘不屈，作《正氣歌》浩然千古。至元十九年從容就義於柴市，年四十七歲。',
    historicalEvaluation: '《宋史》讚曰：「文天祥體質剛清，名垂竹帛；丹心正氣，千秋萬世仰其風烈！」',
    achievements: ['散盡家資募兵救國', '寫下《過零丁洋》《正氣歌》千古絕唱', '臨難不屈忠烈照亮青史'],
    quotes: ['人生自古誰無死？留取丹心照汗青！', '天地有正氣，雜然賦流形。下則為河嶽，上則為日星。'],
    relations: [
      { figureId: 'lu_xiufu', label: '崖山共赴國難之丞相', relationType: 'ally' },
      { figureId: 'zhang_shijie', label: '抗元軍事統帥', relationType: 'ally' },
      { figureId: 'kublai', label: '大都獄中力勸降而不屈之元世祖', relationType: 'rival' }
    ]
  },
  {
    id: 'lu_xiufu',
    name: '陸秀夫 (君實)',
    courtesyName: '君實',
    titles: ['左丞相', '平章軍國重事', '崖山殉國名相'],
    roles: ['丞相', '忠烈名臣', '負帝投海英雄'],
    faction: 'song',
    birthDeath: [1236, 1279],
    birthDeathDisplay: '西元 1236 — 1279 年',
    avatar: getAvatar('lu_xiufu'),
    origin: '楚州鹽城（今江蘇建湖）',
    bio: '南宋最後一位左丞相。沉靜寡言，端嚴剛毅。臨安陷落後與文天祥、張世傑共扶幼帝南下入海。崖山之役二十萬宋朝軍民在廣東新會崖門海面與元水軍決戰，宋軍大敗。祥興二年二月初六，元軍逼近龍舟，陸秀夫先驅妻子投海，隨後端正衣冠拜少帝趙昺曰：「國事至此，陛下當為國死，德祐皇帝受辱已甚，陛下不可再受辱！」負八歲幼帝趙昺跳入萬頃波濤殉國，十萬軍民相隨投海，大宋三百年江山悲壯落幕。',
    historicalEvaluation: '《宋史》評曰：「君實負帝投海，不苟全性命，大節凜然，萬古悲壯！」',
    achievements: ['崖山最後血戰主持南宋中樞', '負帝蹈海殉國全大宋風骨'],
    quotes: ['國事至此，陛下當為社稷死，不可受虜辱！'],
    relations: [
      { figureId: 'wen_tianxiang', label: '宋末三傑同道', relationType: 'ally' },
      { figureId: 'zhang_shijie', label: '崖山水軍指揮同袍', relationType: 'ally' }
    ]
  },
  {
    id: 'zhang_shijie',
    name: '張世傑',
    courtesyName: '世傑',
    titles: ['越國公', '樞密使', '太傅', '崖山水軍主帥'],
    roles: ['名將', '水軍統帥', '忠烈名臣'],
    faction: 'song',
    birthDeath: [1230, 1279],
    birthDeathDisplay: '西元 1230 — 1279 年',
    avatar: getAvatar('zhang_shijie'),
    origin: '范陽（今河北定興）',
    bio: '「宋末三傑」之一，南宋最後的水軍總統帥。早年從軍於孟珙麾下，轉戰淮揚百戰不屈。臨安陷後率艦隊奉二王南走，在崖山集結千艘巨型戰船連環成水寨，中置行宮死守。崖山海戰遭張弘範四面火攻水戰突襲，戰線潰崩，世見幼帝已投海，引十六艘大船殺出重圍欲尋趙氏遺孤再圖中興。行至陽江海陵島遇狂風暴雨，世傑焚香仰天大呼：「我為趙氏盡力矣，若天亡趙氏，則覆我舟！」暴風碎舟，溺水殉國。',
    historicalEvaluation: '《宋史》：「世傑轉戰海嶠，終始全忠，無愧大將之名。」',
    achievements: ['千艘巨艦崖山布陣死守', '突圍再圖中興海陵島怒禱天命'],
    quotes: ['我為趙氏亦已至矣，一木難支大廈，天若亡趙，使舟覆我死！'],
    relations: [
      { figureId: 'lu_xiufu', label: '崖山共掌軍政', relationType: 'ally' },
      { figureId: 'wen_tianxiang', label: '宋末三傑並稱', relationType: 'ally' }
    ]
  },
  {
    id: 'qin_hui',
    name: '秦檜 (會之)',
    courtesyName: '會之',
    titles: ['右相', '申王', '太師', '千古佞臣'],
    roles: ['奸臣', '主和宰相', '殺岳飛罪首'],
    faction: 'other',
    birthDeath: [1090, 1155],
    birthDeathDisplay: '西元 1090 — 1155 年',
    avatar: getAvatar('qin_hui'),
    origin: '江寧（今江蘇南京）',
    bio: '南宋初權相，千古奸佞代表。靖康時隨二帝被俘金國，後離奇南返自稱殺金人監者奪舟逃歸，力主「南人歸南，北人歸北」。得高宗信任再入相位，專權十九年，排斥抗金將領，以「莫須有」謀反罪名屈殺岳飛父子，與金朝簽訂喪權辱國之《紹興和議》，稱臣納貢割讓唐鄧。後世於杭州西湖岳王廟鑄其鐵像跪於岳飛墓前，萬世唾棄。',
    historicalEvaluation: '《宋史》評曰：「秦檜倡和誤國，陷害忠良，檜之罪滔天，萬世不容！」',
    achievements: ['紹興和議促成宋金南北休兵'],
    quotes: ['縛虎容易縱虎難！', '雖無明證，其事莫須有！'],
    relations: [
      { figureId: 'zhao_gou', label: '迎合偏安心思之帝王', relationType: 'superior' },
      { figureId: 'yue_fei', label: '風波亭殺害大仇', relationType: 'rival' },
      { figureId: 'han_shizhong', label: '怒斥其「莫須有」之將領', relationType: 'rival' }
    ]
  },

  // --- CULTURAL & PHILOSOPHICAL LUMINARIES ---
  {
    id: 'ouyang_xiu',
    name: '歐陽修 (永叔)',
    courtesyName: '永叔',
    titles: ['參知政事', '文忠公', '六一居士', '北宋文壇領袖'],
    roles: ['文豪', '名臣', '史學家', '唐宋八大家'],
    faction: 'cultural',
    birthDeath: [1007, 1072],
    birthDeathDisplay: '西元 1007 — 1072 年',
    avatar: getAvatar('ouyang_xiu'),
    origin: '吉州廬陵（今江西吉安）',
    bio: '北宋卓越政治家、文學家、史學家，北宋中葉文壇泰斗，「唐宋八大家」之一。幼貧「畫荻學書」，仁宗朝力挺范仲淹慶曆新政。任滁州刺史寫下名篇《醉翁亭記》（「醉翁之意不在酒，在乎山水之間也」）。嘉祐二年主持進士科舉，力拔蘇軾、蘇轍、曾鞏、程顥、張載，使天下文風一掃雕琢駢儷，大興古文。主修《新唐書》、撰《新五代史》，文學史學皆為一代宗師。',
    historicalEvaluation: '蘇軾譽曰：「論大道似韓愈，論事似陸贄，記實事似司馬遷，詩賦似李白。」',
    achievements: ['領導北宋詩文革新運動', '主持嘉祐二年科舉開創一代文運', '撰《新五代史》《新唐書》《醉翁亭記》'],
    quotes: ['醉翁之意不在酒，在乎山水之間也。山水之樂，得之心而寓之酒也。'],
    relations: [
      { figureId: 'fan_zhongyan', label: '慶曆新政摯友', relationType: 'ally' },
      { figureId: 'su_shi', label: '嘉祐主考識得一代文豪', relationType: 'mentor' }
    ]
  },
  {
    id: 'su_shi',
    name: '蘇軾 (子瞻)',
    courtesyName: '子瞻',
    titles: ['端明殿學士', '禮部尚書', '東坡居士', '千古全才文豪'],
    roles: ['文豪', '詞人', '書法家', '美食家', '唐宋八大家'],
    faction: 'cultural',
    birthDeath: [1037, 1101],
    birthDeathDisplay: '西元 1037 — 1101 年',
    avatar: getAvatar('su_shi'),
    origin: '眉州眉山（今四川眉山）',
    bio: '中國文化史上最受人愛戴之全才文化巨匠，宋詞豪放派開山鼻祖。嘉祐二年進士，歐陽修驚嘆曰：「吾當避此人出一頭地！」詩、詞、散文、書法（宋四家之首）、繪畫無一不登峰造極。因反對新法急躁遭烏臺詩案下獄，幾罹死罪；貶黃州寫下千古絕唱《念奴嬌·赤壁懷古》（「大江東去，浪淘盡」）與前後《赤壁賦》。歷仕密州、徐州、杭州、惠州，直至海南儋州，處逆境而曠達樂觀，築蘇堤、創東坡肉，潤澤百世生靈。',
    historicalEvaluation: '《宋史》評曰：「軾器識宏深，風度飄然，落筆千言，如水湧山出，古今所無！」',
    achievements: ['開拓宋詞豪放美學新天地', '《赤壁賦》《水調歌頭》千古傳誦', '杭州築蘇堤疏西湖惠澤萬民'],
    quotes: ['大江東去，浪淘盡，千古風流人物。', '但願人長久，千里共嬋娟。', '竹杖芒鞋輕勝馬，誰怕？一蓑煙雨任平生。'],
    relations: [
      { figureId: 'ouyang_xiu', label: '知遇伯樂座師', relationType: 'mentor' },
      { figureId: 'su_che', label: '手足情深胞弟', relationType: 'kinship' },
      { figureId: 'wang_an_shi', label: '金陵重逢一笑泯恩仇', relationType: 'ally' },
      { figureId: 'xin_qiji', label: '蘇辛豪放詞宗並稱', relationType: 'colleague' }
    ]
  },
  {
    id: 'li_qingzhao',
    name: '李清照 (易安)',
    courtesyName: '易安居士',
    titles: ['婉約詞宗', '千古第一才女'],
    roles: ['詞人', '金石學家', '一代詞宗'],
    faction: 'cultural',
    birthDeath: [1084, 1155],
    birthDeathDisplay: '西元 1084 — 1155 年',
    avatar: getAvatar('li_qingzhao'),
    origin: '齊州濟南（今山東濟南）',
    bio: '華夏五千年歷史最著名之女詞人，宋詞「婉約派」宗師。出身書香名門，夫趙明誠為金石學名家，夫妻合著《金石錄》。前期詞作優美清新，《如夢令》（「爭渡，爭渡，驚起一灘鷗鷺」）、《一剪梅》（「才下眉頭，卻上心頭」）。靖康之變避亂南渡，趙明誠病逝，半生珍藏古董金石毀於戰火，晚年飄零浙東，詞風悲愴淒咽，《聲聲慢》（「尋尋覓覓，冷冷清清，淒淒慘慘戚戚」）登峰造極。更具俠骨，《夏日絕句》「生當作人傑，死亦為鬼雄」諷刺南宋苟安，巾幗傲骨貫古今。',
    historicalEvaluation: '沈曾植讚曰：「易安倜儻，氣度不下於男子，詞家一大正宗也。」',
    achievements: ['撰《聲聲慢》《醉花陰》《如夢令》千古詞章', '合撰金石學名著《金石錄》', '千古第一女詞人地位'],
    quotes: ['生當作人傑，死亦為鬼雄。至今思項羽，不肯過江東！', '尋尋覓覓，冷冷清清，淒淒慘慘戚戚。'],
    relations: [
      { figureId: 'su_shi', label: '父親師事蘇軾（文統淵源）', relationType: 'mentor' },
      { figureId: 'xin_qiji', label: '濟南二安齊名詞壇', relationType: 'colleague' }
    ]
  },
  {
    id: 'xin_qiji',
    name: '辛棄疾 (幼安)',
    courtesyName: '幼安',
    titles: ['稼軒居士', '樞密都承旨', '詞中之龍', '豪放派詞壇盟主'],
    roles: ['詞人', '將領', '抗金英雄', '愛國志士'],
    faction: 'cultural',
    birthDeath: [1140, 1207],
    birthDeathDisplay: '西元 1140 — 1207 年',
    avatar: getAvatar('xin_qiji'),
    origin: '齊州歷城（今山東濟南）',
    bio: '南宋豪放詞派集大成者，文武全才之一代詞中之龍。生於淪陷區北方，二十二歲率兩千抗金義軍，親率五十騎夜襲金營五萬之眾，生擒叛徒張安國南渡歸宋，名動天下。一生力主收復中原，建飛虎軍，上《美芹十策》《九議》，然為南宋朝廷猜忌，半生閒居江西信州帶湖二十載。將滿腔愛國豪情與沙場壯志傾注於宋詞，詞風沉鬱頓挫、氣拔山河，與蘇軾合稱「蘇辛」。',
    historicalEvaluation: '劉克莊讚曰：「公所作大聲鞺鞳，小聲鏗鍧，橫絕六合，詞中之龍也！」',
    achievements: ['五十騎飛馬突襲五萬金營擒賊', '撰《美芹十策》精闢論抗金戰略', '與蘇軾並列豪放詞派巔峰宗師'],
    quotes: ['醉裏挑燈看劍，夢回吹角連營。八百里分麾下炙，五十弦翻塞外聲，沙場秋點兵。', '想當年，金戈鐵馬，氣吞萬里如虎！', '千古興亡多少事？悠悠。不盡長江滾滾流。'],
    relations: [
      { figureId: 'su_shi', label: '蘇辛豪放並稱', relationType: 'colleague' },
      { figureId: 'chen_liang', label: '鵝湖之會知己盟友', relationType: 'ally' },
      { figureId: 'lu_you', label: '同懷北伐之志文壇知己', relationType: 'ally' }
    ]
  },
  {
    id: 'lu_you',
    name: '陸游 (務觀)',
    courtesyName: '務觀',
    titles: ['放翁', '寶章閣待制', '南宋第一高產愛國詩人'],
    roles: ['詩人', '名臣', '愛國詩宗'],
    faction: 'cultural',
    birthDeath: [1125, 1210],
    birthDeathDisplay: '西元 1125 — 1210 年',
    avatar: getAvatar('lu_you'),
    origin: '越州山陰（今浙江紹興）',
    bio: '南宋傑出愛國詩人，一生留傳九千三百餘首詩作，為中國古代詩歌數量之最。曾入蜀中宣撫使王炎幕府投筆從戎於南鄭（漢中），親臨抗金前線「鐵馬冰河入夢來」。堅持北伐光復中原，為秦檜及主和派所抑。與表妹唐琬之沈園《釵頭鳳》愛情悲劇千古同情。嘉定二年（1210年）八十五歲臨終之際，寫下絕筆《示兒》：「死去元知萬事空，但悲不見九州同。王師北定中原日，家祭無忘告乃翁！」氣貫古今。',
    historicalEvaluation: '朱熹讚曰：「放翁詩才超逸，感時念亂之意，真天下之公。」',
    achievements: ['留存九千三百餘首詩作名垂青史', '《示兒》《游山西村》千古絕唱', '投身南鄭前線抗金抱負終身不渝'],
    quotes: ['死去元知萬事空，但悲不見九州同。王師北定中原日，家祭無忘告乃翁！', '山重水複疑無路，柳暗花明又一村。'],
    relations: [
      { figureId: 'xin_qiji', label: '抗金詞詩雙璧', relationType: 'ally' }
    ]
  },
  {
    id: 'zhu_xi',
    name: '朱熹 (元晦)',
    courtesyName: '元晦',
    titles: ['考亭先生', '紫陽先生', '徽國公', '理學集大成者'],
    roles: ['思想家', '哲學家', '教育家', '理學宗師'],
    faction: 'cultural',
    birthDeath: [1130, 1200],
    birthDeathDisplay: '西元 1130 — 1200 年',
    avatar: getAvatar('zhu_xi'),
    origin: '徽州婺源（生於福建尤溪）',
    bio: '宋代理學之集大成者，孔子、孟子之後影響東亞儒家文化最深遠之大儒，世尊「朱子」。承繼周敦頤、二程學說，建立龐大嚴密之「理氣論」哲學體系，提出「存天理，滅人欲」、「格物致知」。著《四書章句集注》（《大學》《中庸》《論語》《孟子》），自元朝延祐復科舉起，定為全國科舉必考正統官方教科書，深刻塑造元、明、清三朝七百年中國社會文化與東亞文明思想結構。創辦白鹿洞書院、嶽麓書院講學。',
    historicalEvaluation: '清康熙帝讚曰：「集大成而緒千百年絕傳之學，開愚蒙而立億萬世一定之規。」',
    achievements: ['撰《四書章句集注》成為七百年科舉正統', '集宋代理學之大成創立閩學體系', '復興白鹿洞書院樹立書院學規模範'],
    quotes: ['問渠那得清如許？為有源頭活水來。', '無事袖手談心性，臨危一死報君王。'],
    relations: [
      { figureId: 'zhou_dunyi', label: '理學道統宗師', relationType: 'mentor' }
    ]
  },

  // --- LIAO DYNASTY (契丹大遼) ---
  {
    id: 'xiao_chuo',
    name: '蕭綽 (蕭太后)',
    courtesyName: '燕燕',
    titles: ['睿智皇后', '承天皇太后', '大遼攝政太后'],
    roles: ['女統帥', '攝政太后', '大遼全盛執政者'],
    faction: 'liao',
    birthDeath: [953, 1009],
    birthDeathDisplay: '西元 953 — 1009 年',
    avatar: getAvatar('xiao_chuo'),
    origin: '遼北府契丹拔思母蕭氏',
    bio: '遼景宗皇后、遼聖宗生母，華夏歷史上最傑出之少數民族女性統治者與軍事統帥。景宗病弱，蕭綽二十四歲即主持遼國國政；聖宗即位年幼，蕭太后正式臨朝稱制二十七載。重用漢臣韓德讓，厲行漢化改制、整肅軍政。統和四年（986年）宋發動雍熙北伐，蕭太后親披戎裝抱幼帝督戰，重創宋軍三路大軍，於陳家谷俘殺名將楊業；統和二十二年親統二十萬大軍南下直逼澶州，與宋真宗訂立「澶淵之盟」，開創宋遼百年和平，締造大遼帝國極盛時代。',
    historicalEvaluation: '《遼史》評曰：「后明達治道，聞善必從；將士用命，親御戎車，拓土興邦，功冠有遼！」',
    achievements: ['擊潰宋朝雍熙北伐三路大軍', '親征南下訂立澶淵之盟開創百年和平', '任用韓德讓推行遼國漢化政制繁盛'],
    quotes: ['大遼兒郎，豈畏宋人之兵！朕親御戎車，與諸君共爭天下！'],
    relations: [
      { figureId: 'yelv_longxu', label: '兒子（遼聖宗）', relationType: 'kinship' },
      { figureId: 'zhao_heng', label: '澶淵之盟結為兄弟之真宗', relationType: 'rival' },
      { figureId: 'kou_zhun', label: '澶州對壘之宋相', relationType: 'rival' },
      { figureId: 'yang_ye', label: '陳家谷俘殺深敬之楊老令公', relationType: 'rival' }
    ]
  },
  {
    id: 'yelv_xiuge',
    name: '耶律休哥 (遜寧)',
    courtesyName: '遜寧',
    titles: ['于越', '大遼南院大王', '宋軍第一剋星'],
    roles: ['名將', '大遼第一戰神', '統帥'],
    faction: 'liao',
    birthDeath: [930, 998],
    birthDeathDisplay: '西元 930 — 998 年',
    avatar: getAvatar('yelv_xiuge'),
    origin: '遼契丹惕剌部（髓氏皇族）',
    bio: '大遼第一名將、軍神。智勇雙全，臨陣善料敵。太平興國四年宋太宗滅北漢後移師幽州，遼軍頻退；耶律休哥率大軍於高梁河夜襲宋軍背後，每人持兩炬狂呼衝擊，宋軍驚潰，宋太宗身中兩箭乘驢車狂奔逃脫。雍熙三年宋三路北伐，休哥在歧溝關大破曹彬十萬主力，追奔至拒馬河溺死者不可勝計。宋邊境小兒夜啼，聞「于越來矣」立不敢哭，遼封為最高官階「于越」。',
    historicalEvaluation: '《遼史》評曰：「休哥算無遺策，高梁河之捷，力全燕薊，宋人聞其名望風皆遁。」',
    achievements: ['高梁河之戰大破宋太宗主力', '岐溝關徹底粉碎雍熙北伐', '鎮守南疆十餘年宋軍不敢北窺'],
    quotes: ['宋兵涉遠已疲，天夜掩其後，一鼓可擒也！'],
    relations: [
      { figureId: 'zhao_guangyi', label: '高梁河擊敗之宋太宗', relationType: 'rival' },
      { figureId: 'xiao_chuo', label: '蕭太后最倚重柱石軍神', relationType: 'superior' }
    ]
  },
  {
    id: 'yelv_dashi',
    name: '耶律大石 (德宗)',
    courtesyName: '重德',
    titles: ['西遼德宗', '菊兒汗 (Gurkhan)', '契丹中亞再造者'],
    roles: ['開國君主', '軍事家', '轉戰中亞'],
    faction: 'liao',
    birthDeath: [1087, 1143],
    birthDeathDisplay: '西元 1087 — 1143 年',
    avatar: getAvatar('yelv_dashi'),
    origin: '遼上京臨潢府（阿保機八世孫）',
    bio: '西遼（喀喇契丹）開國皇帝。大遼進士出身，文武全才。女真金國滅遼前夕，大石率二百鐵騎夜遁西北可敦城，號召蒙古草原諸部集結萬餘兵馬。隨後向西千里大遠征，越天山、征服中亞七河流域。1141年卡特萬之戰（卡特萬大草原），耶律大石以少勝多擊潰塞爾柱塞爾柱突厥帝國十萬聯軍，震撼西方基督教世界（引發「祭司王約翰」東方基督教救世主傳說），建立疆域東起阿爾泰山、西達鹹海之西遼帝國，延續契丹國祚近百年。',
    historicalEvaluation: '《遼史》：「大石深沈有遠略，萬里西行，肇造西域，功烈巍巍！」',
    achievements: ['二百騎突圍開創西遼帝國', '卡特萬之戰大破中東塞爾柱聯軍', '推行漢文化統治中亞近百年'],
    quotes: ['我祖宗開拓邊疆，創業維艱；今金人殘暴，大遼不可絕滅！'],
    relations: [
      { figureId: 'wanyan_aguda', label: '滅北遼之強勁金軍', relationType: 'rival' }
    ]
  },

  // --- JIN DYNASTY (女真大金) ---
  {
    id: 'wanyan_aguda',
    name: '完顏阿骨打 (金太祖)',
    courtesyName: '旻',
    titles: ['金太祖', '大金開國皇帝', '應乾興運昭德定功睿神莊憲孝皇帝'],
    roles: ['君主', '皇帝', '女真大金建立者'],
    faction: 'jin',
    birthDeath: [1068, 1123],
    birthDeathDisplay: '西元 1068 — 1123 年',
    avatar: getAvatar('wanyan_aguda'),
    origin: '按出虎水（今黑龍江阿城哈爾濱）',
    bio: '女真族偉大領袖，大金帝國開國皇帝。面對遼天祚帝之殘暴奴役，於頭堝宴拒絕為遼主跳舞。收國元年（1115年）於會寧府稱帝建國，國號大金。創立「猛安謀克制度」全民皆兵，以「女真不滿萬，滿萬不可敵」之威名，於護步達岡之戰以兩萬步騎大破遼天祚帝七十萬大軍，連克遼上京、東京、中京，基本奠定平滅大遼帝國之基業。',
    historicalEvaluation: '《金史》評曰：「太祖用兵如神，初起數千，破大國數十萬眾，開拓帝業，千古梟雄！」',
    achievements: ['建立大金帝國創制猛安謀克制', '護步達岡之戰以二萬破七十萬遼軍', '平滅二百年大遼帝國奠基'],
    quotes: ['遼以鑌鐵為號，取其堅也。鑌鐵雖堅，終亦變壞，唯金不變不壞，故國號大金！'],
    relations: [
      { figureId: 'wanyan_zongbi', label: '第四子（金兀朮）', relationType: 'kinship' },
      { figureId: 'zhao_ji', label: '海上之盟結盟後伐宋之徽宗', relationType: 'rival' }
    ]
  },
  {
    id: 'wanyan_zongbi',
    name: '完顏宗弼 (金兀朮)',
    courtesyName: '兀朮',
    titles: ['都元帥', '太保', '領三省事', '梁王'],
    roles: ['名將', '金軍統帥', '南宋大剋星'],
    faction: 'jin',
    birthDeath: [1098, 1148],
    birthDeathDisplay: '西元 1098 — 1148 年',
    avatar: getAvatar('wanyan_zongbi'),
    origin: '按出虎水（金太祖第四子）',
    bio: '金太祖第四子，女真名兀朮，金朝最著名統帥。靖康之變圍攻汴京破宋；建炎年間統十萬鐵騎「搜山檢海捉趙構」，橫掃江淮，一度攻破臨安、明州（寧波）。其麾下「鐵浮屠」（重裝具裝甲騎）與「拐子馬」（左右翼輕騎突擊）縱橫中原所向披靡。後於黃天蕩遭韓世忠水軍阻截，富平之戰擊潰張浚四十萬川陝軍；紹興十年與岳家軍在郾城、潁昌鏖戰慘敗。促成宋高宗秦檜殺害岳飛，簽訂《紹興和議》，為金朝爭取淮河以北半壁江山。',
    historicalEvaluation: '《金史》評曰：「宗弼奔衝辟地，有勇有謀，拓地淮南，金之名將莫過於兀朮。」',
    achievements: ['搜山檢海千里追襲宋高宗', '打造無敵鐵浮屠與拐子馬騎兵', '推動紹興和議劃淮為界稱雄中原'],
    quotes: ['必殺岳飛，然後和可成也！'],
    relations: [
      { figureId: 'wanyan_aguda', label: '父皇金太祖', relationType: 'kinship' },
      { figureId: 'yue_fei', label: '一生死敵郾城受挫', relationType: 'rival' },
      { figureId: 'han_shizhong', label: '長江黃天蕩交鋒受困', relationType: 'rival' },
      { figureId: 'qin_hui', label: '要求殺岳飛方許和約之宋相', relationType: 'colleague' }
    ]
  },

  // --- WESTERN XIA & MONGOL EMPIRE ---
  {
    id: 'li_yuanhao',
    name: '李元昊 (夏景宗)',
    courtesyName: '嵬名曩霄',
    titles: ['夏景宗', '大夏皇帝', '兀卒 (天子)'],
    roles: ['君主', '皇帝', '西夏開國皇帝'],
    faction: 'xia',
    birthDeath: [1003, 1048],
    birthDeathDisplay: '西元 1003 — 1048 年',
    avatar: getAvatar('li_yuanhao'),
    origin: '夏州（今陝西靖邊東北）',
    bio: '黨項羌族一代雄主，西夏開國皇帝。性沉鷙勇鷙，深通漢蕃文字與兵法。命大臣野利仁榮創制西夏文；削髮留辮令國人遵行；創立重裝騎兵「鐵鷂子」、步兵「步跋子」。宋寶元元年（1038年）正式稱帝，國號大夏，脫離宋朝藩屬。在三川口之戰、好水川之戰、定川寨之戰中連續擊潰大宋重臣韓琦、任福十數萬大軍，又大破遼興宗十萬親征大軍，迫宋遼皆承認西夏地位，形成宋、遼、西夏三國鼎立長達二百年。',
    historicalEvaluation: '《西夏書事》：「元昊英略蓋世，起自西陲，抗衡宋遼兩大國，一代之雄桀也。」',
    achievements: ['稱帝建立大夏國開創西夏二百年', '好水川三川口三戰大破大宋精銳', '開創西夏文建立獨立國家法典'],
    quotes: ['英雄之生，當王霸天下，何能俯首臣伏於宋人！'],
    relations: [
      { figureId: 'fan_zhongyan', label: '西北相持敬畏之名臣', relationType: 'rival' },
      { figureId: 'han_qi', label: '好水川擊潰之宋將', relationType: 'rival' }
    ]
  },
  {
    id: 'temujin',
    name: '孛兒只斤·鐵木真 (成吉思汗)',
    courtesyName: '鐵木真',
    titles: ['成吉思汗', '大蒙古國開國大汗', '元太祖'],
    roles: ['征服者', '君主', '蒙古大汗', '世界帝國締造者'],
    faction: 'mongol',
    birthDeath: [1162, 1227],
    birthDeathDisplay: '西元 1162 — 1227 年',
    avatar: getAvatar('temujin'),
    origin: '斡難河斡兒朵（今蒙古肯特省）',
    bio: '世界史上最偉大之軍事征服者與統帥，大蒙古國開國大汗。早年部落破散歷經苦難，憑藉驚人意志與戰略眼光統一蒙古草原諸部。1206年斡難河畔建立大蒙古國，受尊號「成吉思汗」。創立怯薛軍與千戶制，頒布大扎撒律令。隨後發動空前之世界征服浪潮：三度伐西夏、親征大破金軍於野狐嶺摧毀金主力、發動第一次蒙古西征滅花剌子模帝國席捲中亞伊朗，軍威直抵伏爾加河。1227年滅西夏前夕病逝於六盤山，立下假道宋境滅金之遺策。',
    historicalEvaluation: '《元史》評曰：「帝深沈有大略，用兵如神，乘時崛起，橫絕歐亞，古今未嘗有也。」',
    achievements: ['統一蒙古各部建立大蒙古國', '野狐嶺大潰金朝三十萬精銳', '橫跨歐亞征服中亞建立空前世界帝國'],
    quotes: ['人生最大的快慰，在於戰勝敵人，追逐他們，奪取他們的財產，聽他們的親人哭泣！'],
    relations: [
      { figureId: 'subutai', label: '蒙古四勇核心先鋒統帥', relationType: 'subordinate' },
      { figureId: 'kublai', label: '孫兒建立大元帝國之忽必烈', relationType: 'kinship' }
    ]
  },
  {
    id: 'kublai',
    name: '孛兒只斤·忽必烈 (元世祖)',
    courtesyName: '薛禪汗',
    titles: ['元世祖', '大元開國皇帝', '薛禪皇帝'],
    roles: ['君主', '皇帝', '大元帝國締造者'],
    faction: 'mongol',
    birthDeath: [1215, 1294],
    birthDeathDisplay: '西元 1215 — 1294 年',
    avatar: getAvatar('kublai'),
    origin: '蒙古漠南察哈爾',
    bio: '成吉思汗之孫，拖雷第四子，大元帝國開國皇帝。早年受命掌漠南漢地，廣招中原儒士（劉秉忠、姚樞、許衡），採納漢法治國。1260年即位稱汗，1271年建國號為「大元」，定都大都（北京），為外族入主中原建立大一統王朝之首例。發動長達數十年的滅宋戰爭，築回回砲破襄陽樊城，伯顏統大軍破臨安，1279年崖山海戰徹底滅南宋，結束自唐末安史之亂五百年來中國境內多政權割據分裂狀態，天下重歸大一統。',
    historicalEvaluation: '《元史》評曰：「世祖度量弘廣，知人善任，立綱陳紀，一統海內，大哉乾元！」',
    achievements: ['取《易經》「大哉乾元」定國號為大元', '滅南宋徹底終結五百年南北割據分裂', '建大都定為全國首都（今日北京基石）'],
    quotes: ['天下大器，非仁義不可得而守也。'],
    relations: [
      { figureId: 'temujin', label: '祖父成吉思汗', relationType: 'kinship' },
      { figureId: 'wen_tianxiang', label: '感嘆其忠義而含淚處死之南宋狀元丞相', relationType: 'rival' },
      { figureId: 'lu_xiufu', label: '崖山對決之南宋末帝丞相', relationType: 'rival' }
    ]
  }
];

const outputPath = path.resolve(__dirname, '..', 'src', 'data', 'periods', 'songLiao', 'figures.js');
const code = '// Comprehensive Historical Figures for Song, Liao, Jin, Western Xia, and Mongol (960 - 1279 CE)\nexport const SONG_LIAO_FIGURES = ' +
  JSON.stringify(FIGURES, null, 2) + ';\n';

fs.writeFileSync(outputPath, code, 'utf8');
console.log(`Successfully generated ${FIGURES.length} Song-Liao-Jin figures!`);
