// Historical Figures of Wei, Jin, Southern and Northern Dynasties (220 CE - 589 CE)
// With complete biographical details, avatars, and inter-figure relational network graphs
export const WEI_JIN_FIGURES = [
  // --- 兩晉高門與帝王 (Western and Eastern Jin) ---
  {
    id: "sima_yan",
    name: "司馬炎 (晉武帝)",
    pinyin: "Sīmǎ Yán",
    title: "西晉開國皇帝 · 統一天下創太康之治",
    faction: "jin",
    birthYear: 236,
    deathYear: 290,
    avatar: "images/figures/sima_yan.svg",
    bio: "字安世，司馬昭長子，司馬懿之孫。咸熙二年受魏禪登基建立西晉。西元 280 年發動六路大軍順江平滅東吳，徹底結束三國鼎立六十年大分裂，天下一統。在位推行太康之治，開創戶調式與佔田制，人口大舉復興。晚年荒淫怠政，立癡愚子司馬衷為嗣，種下八王之亂禍根。",
    tags: ["晉武帝", "三國歸晉", "太康之治", "西晉開國"],
    relations: [
      { figureId: "sima_zhong", relationType: "family", label: "懦愚儲君 · 何不食肉糜" },
      { figureId: "du_yu", relationType: "advisor", label: "平吳統帥 · 破竹之勢" },
      { figureId: "yang_hu", relationType: "advisor", label: "襄陽都督 · 平吳遺策" },
      { figureId: "wang_jun_jin", relationType: "advisor", label: "造五牙大艦 · 樓船順江直取建業" }
    ],
    participatedEventIds: ["evt_miewu_280", "evt_bawang_291"]
  },
  {
    id: "sima_zhong",
    name: "司馬衷 (晉惠帝)",
    pinyin: "Sīmǎ Zhōng",
    title: "西晉第二代皇帝 · 『何不食肉糜』之悲劇昏君",
    faction: "jin",
    birthYear: 259,
    deathYear: 307,
    avatar: "images/figures/fig_sima_zhong.jpg",
    bio: "字正度，晉武帝次子。天性癡愚，聞天下荒亂百姓餓死，反問『何不食肉糜？』在位期間皇后賈南風弄權專橫，大肆誅戮外戚宗室，引爆宗室十六年八王之亂。司馬衷淪為諸王輾轉挾持之傀儡木偶，終遭東海王司馬越以毒餅毒殺。",
    tags: ["晉惠帝", "何不食肉糜", "賈后亂政", "八王之亂傀儡"],
    relations: [
      { figureId: "sima_yan", relationType: "family", label: "先帝父皇 · 擇嗣不慎" },
      { figureId: "jia_nanfeng", relationType: "family", label: "專權毒后 · 禍亂宮闈" },
      { figureId: "sima_rui", relationType: "family", label: "宗室從弟 · 南渡延續晉祚" }
    ],
    participatedEventIds: ["evt_bawang_291"]
  },
  {
    id: "jia_nanfeng",
    name: "賈南風 (賈后)",
    pinyin: "Jiǎ Nánfēng",
    title: "西晉惠帝皇后 · 悍妒專權引爆八王浩劫",
    faction: "jin",
    birthYear: 257,
    deathYear: 300,
    avatar: "images/figures/fig_jia_nanfeng.jpg",
    bio: "西晉開國元勛賈充之女，晉惠帝司馬衷皇后。為人醜黑短小而性妒多權詐。惠帝登位後，賈南風聯絡楚王司馬瑋誅殺太傅楊駿滅其三族，隨後殺楚王獨攬朝綱九年。元康九年謀害太子司馬遹，引發趙王司馬倫起兵入宮收捕賈后，以金屑酒鴆殺之，十六年八王之亂全面爆發。",
    tags: ["賈皇后", "八王之亂導火索", "專權悍后", "西晉政變"],
    relations: [
      { figureId: "sima_zhong", relationType: "family", label: "愚夫傀儡 · 玩弄朝政於股掌" },
      { figureId: "sima_yan", relationType: "family", label: "先帝公皇 · 誤納悍女為儲妃" }
    ],
    participatedEventIds: ["evt_bawang_291"]
  },
  {
    id: "sima_rui",
    name: "司馬睿 (晉元帝)",
    pinyin: "Sīmǎ Ruì",
    title: "東晉開國皇帝 · 衣冠南渡『王與馬共天下』",
    faction: "jin",
    birthYear: 276,
    deathYear: 323,
    avatar: "images/figures/fig_sima_rui.jpg",
    bio: "字景思，司馬懿曾孫，琅琊武王司馬伷之子。西晉末年受封安東將軍出鎮建鄴。永嘉之亂中原陸沉，司馬睿在琅琊王導運籌帷幄下聯結江南高門顧榮、陸曄與渡江僑姓士族，於建康登基建立東晉，延續華夏正朔百餘年。登基時引王導同坐御榻，史稱『王與馬，共天下』。",
    tags: ["晉元帝", "衣冠南渡", "東晉開國", "王與馬共天下"],
    relations: [
      { figureId: "wang_dao", relationType: "advisor", label: "柱石丞相 · 共坐御榻共定天下" },
      { figureId: "zu_ti", relationType: "colleague", label: "渡江北伐名將 · 中流擊楫" },
      { figureId: "sima_yan", relationType: "family", label: "宗室伯祖 · 西晉開國始祖" }
    ],
    participatedEventIds: ["evt_simarui_317", "evt_zuti_beifa_317"]
  },
  {
    id: "wang_dao",
    name: "王導 (茂弘)",
    pinyin: "Wáng Dǎo",
    title: "東晉開國宰相 · 門閥政治奠基者",
    faction: "jin",
    birthYear: 276,
    deathYear: 339,
    avatar: "images/figures/fig_wang_dao.jpg",
    bio: "字茂弘，琅琊臨沂人。東晉開國元勳與政治導師，輔佐元帝、明帝、成帝三朝。首創『鎮之以靜，群情自安』之治國方針，融洽北方僑姓與南方吳姓世族矛盾，確立『門閥士族與皇權共治』體制，被尊為『江左夷吾』。與堂兄王敦一內一外，奠定琅琊王氏天下第一門閥盛譽。",
    tags: ["江左夷吾", "琅琊王氏", "門閥士族奠基人", "東晉三朝宰相"],
    relations: [
      { figureId: "sima_rui", relationType: "monarch-subject", label: "君臣莫逆 · 共定江左基業" },
      { figureId: "xie_an", relationType: "colleague", label: "後起宰相 · 接續江左相業" },
      { figureId: "wang_xizhi", relationType: "family", label: "琅琊同宗族姪 · 書聖雅集" }
    ],
    participatedEventIds: ["evt_simarui_317"]
  },
  {
    id: "xie_an",
    name: "謝安 (安石)",
    pinyin: "Xiè Ān",
    title: "東晉宰相 · 東山再起 · 淝水之戰統帥",
    faction: "jin",
    birthYear: 320,
    deathYear: 385,
    avatar: "images/figures/fig_xie_an.jpg",
    bio: "字安石，陳郡陽夏人。少有盛名，隱居會稽東山四十載，與王羲之等暢遊山水。年過四十方『東山再起』出仕。升任宰相後處變不驚，從容調度。淝水之戰前夕前秦百萬臨江，謝安派姪謝玄率八萬北府兵出征，自己在後方與客圍棋。得大捷捷報緩步還室，喜極折木屐齒而不自知，名垂青史。",
    tags: ["東山再起", "淝水之戰統帥", "陳郡謝氏", "處變不驚", "小兒輩大破賊"],
    relations: [
      { figureId: "xie_xuan", relationType: "family", label: "族子驍將 · 北府兵前鋒都督" },
      { figureId: "fu_jian", relationType: "rival", label: "前秦宿敵 · 淝水敗前秦百萬軍" },
      { figureId: "wang_xizhi", relationType: "colleague", label: "蘭亭名士契友 · 書法雅集" },
      { figureId: "huan_wen", relationType: "rival", label: "權臣之爭 · 巧妙化解桓氏篡晉" }
    ],
    participatedEventIds: ["evt_lanting_353", "evt_feishui_383"]
  },
  {
    id: "xie_xuan",
    name: "謝玄 (幼度)",
    pinyin: "Xiè Xuán",
    title: "東晉北府兵統帥 · 淝水之戰前鋒都督",
    faction: "jin",
    birthYear: 343,
    deathYear: 388,
    avatar: "images/figures/fig_xie_xuan.jpg",
    bio: "字幼度，謝安之姪。文武兼備，任建武將軍出鎮京口，招募北方流民驍勇之士組建威震中古之『北府兵』。淝水之戰中任前鋒都督，率劉牢之等八萬精銳於洛澗奇襲斬前秦大將梁成，繼而在淝水決戰大破苻堅苻融主力，陣斬苻融，收復河南失地，進封康樂縣公。",
    tags: ["北府兵統帥", "淝水大捷", "謝公神算", "封康樂公"],
    relations: [
      { figureId: "xie_an", relationType: "family", label: "叔父宰相 · 東山運籌謝氏雙壁" },
      { figureId: "fu_jian", relationType: "rival", label: "淝水陣前宿敵 · 破前秦天王百萬師" }
    ],
    participatedEventIds: ["evt_feishui_383"]
  },
  {
    id: "zu_ti",
    name: "祖逖 (士稚)",
    pinyin: "Zǔ Tì",
    title: "東晉名將 · 聞雞起舞 · 中流擊楫誓復中原",
    faction: "jin",
    birthYear: 266,
    deathYear: 321,
    avatar: "images/figures/fig_zu_ti.jpg",
    bio: "字士稚，范陽遒縣人。少孤貧，胸懷大志，與劉琨夜間聞荒雞晨鳴起舞習武。晉室渡江後，祖逖力請北伐，司馬睿僅給兵千人。祖逖渡長江中流擊楫立誓：『不能清中原而復濟者，有如大江！』轉戰淮北數年間撫定塢堡，大敗石勒石虎，收復黃河以南大部疆土，威震華北。",
    tags: ["聞雞起舞", "中流擊楫", "祖逖北伐", "忠烈名將"],
    relations: [
      { figureId: "sima_rui", relationType: "monarch-subject", label: "江南偏安君主 · 疑忌將領" },
      { figureId: "shi_le", relationType: "rival", label: "黃河交鋒宿敵 · 石勒敬畏修祖塋" }
    ],
    participatedEventIds: ["evt_zuti_beifa_317"]
  },
  {
    id: "huan_wen",
    name: "桓溫 (元子)",
    pinyin: "Huán Wēn",
    title: "東晉大司馬 · 三次北伐 · 氣吞江漢之梟雄",
    faction: "jin",
    birthYear: 312,
    deathYear: 373,
    avatar: "images/figures/fig_huan_wen.jpg",
    bio: "字元子，譙國龍亢人。晉明帝駙馬。雄姿英發，西征長江三峽一舉滅成漢收復巴蜀；隨後發動三次北伐，攻克洛陽長安，拜謁漢室諸陵，慨嘆『木猶如此，人何以堪！』第三次北伐於枋頭遭慕容垂伏擊重挫。晚年廢海西公立簡文帝，覬覦帝位，終被謝安、王坦之智退拖延至死。",
    tags: ["桓溫北伐", "滅成漢", "木猶如此", "門閥梟雄"],
    relations: [
      { figureId: "xie_an", relationType: "rival", label: "政治對手 · 謝安從容抗阻桓氏受禪" },
      { figureId: "murong_chui", relationType: "rival", label: "枋頭之役勁敵 · 鮮卑戰神破桓溫" }
    ],
    participatedEventIds: ["evt_huanwen_ba_347", "evt_fangtou_369"]
  },
  {
    id: "wang_xizhi",
    name: "王羲之 (逸少)",
    pinyin: "Wáng Xīzhī",
    title: "千古書聖 · 蘭亭雅集 · 飄若浮雲矯若驚龍",
    faction: "jin",
    birthYear: 303,
    deathYear: 361,
    avatar: "images/figures/fig_wang_xizhi.jpg",
    bio: "字逸少，琅琊臨沂人，王導堂姪。官至右軍將軍、會稽內史，人稱『王右軍』。自幼苦練書法，兼擅諸體，博採眾長，開創飄逸遒媚之新行草書風。西元 353 年會稽蘭亭修禊雅集，揮毫寫就《蘭亭集序》，被尊為古今天下第一行書，被後世奉為『書聖』。",
    tags: ["書聖", "王右軍", "天下第一行書", "蘭亭集序", "入木三分"],
    relations: [
      { figureId: "wang_dao", relationType: "family", label: "堂伯宰相 · 琅琊高門名望" },
      { figureId: "xie_an", relationType: "colleague", label: "蘭亭同席知己 · 魏晉風度代表" }
    ],
    participatedEventIds: ["evt_lanting_353"]
  },
  {
    id: "tao_yuanming",
    name: "陶淵明 (元亮)",
    pinyin: "Táo Yuānmíng",
    title: "田園詩祖 · 靖節先生 · 不為五斗米折腰",
    faction: "jin",
    birthYear: 365,
    deathYear: 427,
    avatar: "images/figures/fig_tao_yuanming.jpg",
    bio: "名潛，字元亮，潯陽柴桑人，東晉大司馬陶侃曾孫。曾任彭澤令，因『不肯為五斗米折腰向鄉里小兒』掛冠歸隱。躬耕田園二十載，作《桃花源記》《歸去來兮辭》《飲酒》二十首，開創中國文學田園詩派，被梁啟超尊為『千古隱逸詩人之宗』。",
    tags: ["田園詩祖", "不為五斗米折腰", "桃花源記", "歸去來兮辭", "五柳先生"],
    relations: [
      { figureId: "liu_yu_song", relationType: "rival", label: "代晉篡奪者 · 陶公恥事劉宋隱逸以終" }
    ],
    participatedEventIds: ["evt_liuyu_song_420"]
  },
  {
    id: "gu_kaizhi",
    name: "顧愷之 (長康)",
    pinyin: "Gù Kǎizhī",
    title: "中國畫祖 · 虎頭三絕 · 洛神賦圖傳世宗師",
    faction: "jin",
    birthYear: 348,
    deathYear: 409,
    avatar: "images/figures/fig_gu_kaizhi.jpg",
    bio: "字長康，小字虎頭，晉陵無錫人。東晉傑出畫家、理論家，官至散騎常侍。時人稱其有『才絕、畫絕、痴絕』三絕。提出『以形寫神』『遷想妙得』繪畫理論。傳世名作《洛神賦圖》《女史箴圖》線條如春蠶吐絲、行雲流水，開創中國古代卷軸人物繪畫之先河。",
    tags: ["畫絕才絕痴絕", "洛神賦圖", "女史箴圖", "以形寫神", "中國畫祖"],
    relations: [
      { figureId: "xie_an", relationType: "colleague", label: "江左雅士知音 · 盛讚虎頭丹青" }
    ],
    participatedEventIds: ["evt_lanting_353"]
  },
  {
    id: "du_yu",
    name: "杜預 (元凱)",
    pinyin: "Dù Yù",
    title: "西晉平吳名將 · 左傳癖 · 文武雙全杜荊州",
    faction: "jin",
    birthYear: 222,
    deathYear: 285,
    avatar: "images/figures/du_yu.svg",
    bio: "字元凱，京兆杜陵人。西晉名將、學者，鎮南大將軍都督荊州諸軍事。嗜好《左傳》自稱有『左傳癖』，作《春秋左氏經傳集解》。平吳之役統率荊襄兵團，克江陵、下西陵，勢如破竹。平吳後興修水利、減免賦稅，被荊州百姓歌頌為『杜父』。為中國歷史上唯一同時配享文廟與武廟之全人。",
    tags: ["平吳統帥", "勢如破竹", "左傳癖", "文武雙全", "配享文武兩廟"],
    relations: [
      { figureId: "sima_yan", relationType: "monarch-subject", label: "晉武帝主君 · 力排眾議堅定平吳" },
      { figureId: "yang_hu", relationType: "colleague", label: "羊公遺志 · 接掌荊州克成平吳大功" },
      { figureId: "wang_jun_jin", relationType: "colleague", label: "平吳戰友 · 水陸合圍石頭城" }
    ],
    participatedEventIds: ["evt_miewu_280"]
  },
  {
    id: "yang_hu",
    name: "羊祜 (叔子)",
    pinyin: "Yáng Hù",
    title: "西晉名相重臣 · 羊公之德 · 墮淚碑千古留芳",
    faction: "jin",
    birthYear: 221,
    deathYear: 278,
    avatar: "images/figures/yang_hu.svg",
    bio: "字叔子，泰山南城人。博學能文，清廉仁厚。晉武帝時都督荊州諸軍事鎮守襄陽近十年，與東吳陸抗對峙，講信修睦互通醫藥，人稱『羊陸之交』。臨終前上書平吳全策，並力薦杜預自代。卒後襄陽百姓望峴山羊公碑莫不墮淚，杜預名其為『墮淚碑』。",
    tags: ["羊陸之交", "墮淚碑", "襄陽羊公", "平吳籌畫者"],
    relations: [
      { figureId: "sima_yan", relationType: "monarch-subject", label: "武帝心腹之臣 · 密陳平吳策" },
      { figureId: "du_yu", relationType: "colleague", label: "推薦名將接替 · 囑託平吳大任" }
    ],
    participatedEventIds: ["evt_miewu_280"]
  },
  {
    id: "wang_jun_jin",
    name: "王濬 (士治)",
    pinyin: "Wáng Jùn",
    title: "西晉龍驤將軍 · 造萬里樓船直搗建業滅東吳",
    faction: "jin",
    birthYear: 206,
    deathYear: 286,
    avatar: "images/figures/wang_jun.svg",
    bio: "字士治，弘農湖縣人。西晉益州刺史、龍驤將軍。奉武帝密令於四川密造巨型樓船五牙大艦數千艘，長百二十步，容二千人，上設飛樓女牆。平吳時統率巴蜀舟師順長江順流而下，以火筏燒斷江底鐵鎖，旌旗蔽日直搗建業石頭城，受孫皓出降，立平吳第一功。",
    tags: ["造樓船破吳", "龍驤將軍", "火燒鐵鎖", "直搗石頭城"],
    relations: [
      { figureId: "sima_yan", relationType: "monarch-subject", label: "晉武帝主君 · 授以水軍統帥重任" },
      { figureId: "du_yu", relationType: "colleague", label: "平吳戰友 · 水陸夾擊破東吳" }
    ],
    participatedEventIds: ["evt_miewu_280"]
  },

  // --- 五胡十六國雄主與名臣 (Sixteen Kingdoms) ---
  {
    id: "liu_yuan",
    name: "劉淵 (元海)",
    pinyin: "Liú Yuān",
    title: "漢趙開國之主 · 匈奴大單于 · 揭開五胡十六國大幕",
    faction: "sixteen",
    birthYear: 251,
    deathYear: 310,
    avatar: "images/figures/fig_liu_yuan.svg",
    bio: "字元海，新興匈奴屠各部人，冒頓單于後裔。博通經史《左傳》《毛詩》，文武兼備。八王之亂之際於并州離石起兵，自以漢高祖以宗女妻單于為由稱漢王，定都平陽。封石勒、王彌為將進擊西晉，為五胡民族入主中原建立國家體系之第一人。",
    tags: ["匈奴大單于", "漢趙開國", "五胡揭幕", "文武兼資"],
    relations: [
      { figureId: "shi_le", relationType: "monarch-subject", label: "帳下羯胡猛將 · 日後自立建後趙" },
      { figureId: "sima_zhong", relationType: "rival", label: "西晉天子 · 奪其江山社稷" }
    ],
    participatedEventIds: ["evt_liuyuan_304", "evt_yongjia_311"]
  },
  {
    id: "shi_le",
    name: "石勒 (世龍)",
    pinyin: "Shí Lè",
    title: "後趙開國皇帝 · 奴隸出身之傳奇帝王 · 兼併北方",
    faction: "sixteen",
    birthYear: 274,
    deathYear: 333,
    avatar: "images/figures/fig_shi_le.jpg",
    bio: "字世龍，上黨武鄉羯族人。早年遭西晉官軍掠賣為奴，輾轉脫逃聚眾十八騎起兵。依附劉淵滅西晉主軍於苦縣，破洛陽俘懷帝。後建立後趙，消滅前趙生擒劉曜，平定青徐幽燕，統一天下北方。好聽儒生讀史，興太學、尊儒術、課農桑，為羯族空前絕後之開國明主。",
    tags: ["奴隸皇帝", "後趙開國", "羯族崛起", "苦縣全殲晉軍"],
    relations: [
      { figureId: "liu_yuan", relationType: "monarch-subject", label: "初從漢趙 · 後自立為趙天王" },
      { figureId: "zu_ti", relationType: "rival", label: "黃河對峙勁敵 · 敬重祖逖互修邊界" },
      { figureId: "ran_min", relationType: "family", label: "後趙養孫 · 冉閔後發殺胡令滅羯趙" }
    ],
    participatedEventIds: ["evt_liuyuan_304", "evt_yongjia_311", "evt_zuti_beifa_317", "evt_shile_319"]
  },
  {
    id: "murong_chui",
    name: "慕容垂 (道明)",
    pinyin: "Mùróng Chuí",
    title: "後燕成武帝 · 鮮卑一代戰神 · 枋頭大破桓溫",
    faction: "sixteen",
    birthYear: 326,
    deathYear: 396,
    avatar: "images/figures/fig_murong_chui.jpg",
    bio: "原名霸，字道明，昌黎棘城鮮卑人，慕容皝之子。善用兵，十三歲隨父征伐無往不勝。枋頭之役力挽狂瀾伏擊大破東晉桓溫數萬北伐軍。後遭太后太傅猜忌投奔前秦苻堅，苻堅視如國士。淝水之戰前秦潰敗，唯垂部三萬全軍退歸，隨即復立後燕稱帝。參合陂戰後聞士卒死難悲憤嘔血病歿。",
    tags: ["鮮卑戰神", "後燕開國", "枋頭大捷", "淝水獨完"],
    relations: [
      { figureId: "huan_wen", relationType: "rival", label: "枋頭戰場宿敵 · 伏擊破東晉北伐大軍" },
      { figureId: "fu_jian", relationType: "monarch-subject", label: "投靠前秦厚遇 · 淝水敗後保全全軍自立" },
      { figureId: "tuoba_gui", relationType: "rival", label: "北魏崛起天敵 · 參合陂之後燕覆亡之仇" }
    ],
    participatedEventIds: ["evt_fangtou_369", "evt_feishui_383", "evt_canhebei_395"]
  },
  {
    id: "fu_jian",
    name: "苻堅 (永固)",
    pinyin: "Fú Jiān",
    title: "前秦宣昭帝 · 投鞭斷流 · 功虧一簣之悲劇雄主",
    faction: "sixteen",
    birthYear: 338,
    deathYear: 385,
    avatar: "images/figures/fig_fu_jian.jpg",
    bio: "字永固，略陽臨渭氐族人。前秦第三代皇帝。雅量瑰姿，重用漢人王猛為相，崇尚儒學法度，修明政治，掃平前燕、前涼、代國，一統北方黃河流域。然而急於求成，不聽王猛遺言大舉南征，淝水之戰遭謝玄八萬北府兵大破，投鞭斷流化為泡影。前秦隨即分崩瓦解，苻堅為部將姚萇縊殺於新平寺。",
    tags: ["前秦天王", "投鞭斷流", "草木皆兵", "風聲鶴唳", "王猛相秦"],
    relations: [
      { figureId: "wang_meng", relationType: "advisor", label: "王佐之才丞相 · 如魚得水之莫逆" },
      { figureId: "xie_an", relationType: "rival", label: "淝水對弈敵手 · 謝安破前秦百萬師" },
      { figureId: "murong_chui", relationType: "monarch-subject", label: "收留後燕鮮卑將領 · 淝水後反噬" }
    ],
    participatedEventIds: ["evt_fujian_wangmeng_376", "evt_feishui_383"]
  },
  {
    id: "wang_meng",
    name: "王猛 (景略)",
    pinyin: "Wáng Měng",
    title: "前秦丞相 · 捫蝨而言 · 功蓋諸葛之管仲再世",
    faction: "sixteen",
    birthYear: 325,
    deathYear: 375,
    avatar: "images/figures/fig_wang_meng.jpg",
    bio: "字景略，北海劇縣人。隱居華陰，桓溫北伐時曾捫蝨傾談天下大勢，謝絕桓溫南下之邀。後遇苻堅一見如故，受命為丞相中書監。王猛剛明清肅，抑制氐族貴族豪強，興辦太學農桑，統兵滅前燕、平西北，使前秦富強盛極一時。臨終力勸苻堅『不可圖晉，鮮卑羌虜為仇』，被譽為『功邁孔明、才兼管樂』。",
    tags: ["捫蝨而談", "前秦第一名相", "管仲子產之才", "功邁諸葛"],
    relations: [
      { figureId: "fu_jian", relationType: "monarch-subject", label: "遇知己天王 · 傾心託付國政十八載" },
      { figureId: "huan_wen", relationType: "colleague", label: "灞上捫蝨暢論天下 · 拒東晉之辟" }
    ],
    participatedEventIds: ["evt_fujian_wangmeng_376"]
  },
  {
    id: "ran_min",
    name: "冉閔 (永曾)",
    pinyin: "Rǎn Mǐn",
    title: "冉魏武悼天王 · 發布殺胡令 · 漢胡衝突極端人物",
    faction: "sixteen",
    birthYear: 322,
    deathYear: 352,
    avatar: "images/figures/fig_ran_min.svg",
    bio: "字永曾，魏郡內黃人。石虎養孫，勇力絕人。後趙石虎死後諸子自相殘殺，冉閔奪取鄴城政權，頒布三次『殺胡令』，號令漢人盡殺胡羯二十餘萬人。西元 350 年建立冉魏稱帝。隨後與鮮卑前燕慕容恪交戰十戰十勝，終因步兵寡不敵眾被慕容恪連環馬合圍所俘，斬於遏陘山，追諡武悼天王。",
    tags: ["武悼天王", "殺胡令", "冉魏開國", "血戰慕容鮮卑"],
    relations: [
      { figureId: "shi_le", relationType: "family", label: "羯趙宗室姻親 · 後覆滅羯趙" }
    ],
    participatedEventIds: ["evt_shile_319"]
  },
  {
    id: "kumarajiva",
    name: "鳩摩羅什 (童壽)",
    pinyin: "Jiūmóluóshí",
    title: "大乘佛學翻譯巨擘 · 四大譯經家之首 · 長安草堂宗師",
    faction: "other",
    birthYear: 344,
    deathYear: 413,
    avatar: "images/figures/fig_kumarajiva.jpg",
    bio: "西域龜茲國人，天竺婆羅門貴族後裔。天資聰穎，七歲出家，博通大乘中觀龍樹之學。前秦苻堅派呂光西征迎之，留涼州十七年。後秦姚興迎入長安居草堂寺。羅什主持譯出《摩訶般若波羅蜜經》《妙法蓮華經》《維摩詰經》《金剛經》《大智度論》等七十四部三百八十四卷，文筆典雅天然，奠定漢傳大乘佛教義學基石。",
    tags: ["四大譯經家", "鳩摩羅什", "草堂寺", "金剛經", "大乘佛學中土化"],
    relations: [
      { figureId: "fu_jian", relationType: "monarch-subject", label: "苻堅命呂光西征專程迎請之國寶" }
    ],
    participatedEventIds: ["evt_kumarajiva_401"]
  },

  // --- 南朝帝王與將相 (Southern Dynasties: Song, Qi, Liang, Chen) ---
  {
    id: "liu_yu_song",
    name: "劉裕 (宋武帝)",
    pinyin: "Liú Yù",
    title: "南朝劉宋開國皇帝 · 金戈鐵馬氣吞萬里如虎 · 南朝第一帝",
    faction: "southern",
    birthYear: 363,
    deathYear: 422,
    avatar: "images/figures/fig_liu_yu_song.jpg",
    bio: "字德輿，小名寄奴，彭城綏輿里人，自稱漢楚元王劉交後裔。出身寒微布衣，自北府兵從軍起家。平孫恩、平桓玄，兩度大舉北伐滅南燕生擒慕容超、滅後秦收復洛陽長安兩京。創『卻月陣』以兩千七百步兵大破北魏三萬鐵騎。西元 420 年受禪代晉建立劉宋，廢除世族門閥壟斷，重用寒人，開啟南朝一百七十年之局。",
    tags: ["氣吞萬里如虎", "劉宋開國", "南朝第一帝", "卻月陣破魏", "寒人掌機要"],
    relations: [
      { figureId: "liu_yilong", relationType: "family", label: "皇三子 · 開創元嘉之治盛期" },
      { figureId: "tao_yuanming", relationType: "colleague", label: "時代同代名士 · 陶公歸隱不仕宋" }
    ],
    participatedEventIds: ["evt_queyuezhen_417", "evt_liuyu_song_420"]
  },
  {
    id: "liu_yilong",
    name: "劉義隆 (宋文帝)",
    pinyin: "Liú Yìlóng",
    title: "南朝宋文帝 · 元嘉之治三十年 · 封狼居胥草草收場",
    faction: "southern",
    birthYear: 407,
    deathYear: 453,
    avatar: "images/figures/fig_liu_yilong.jpg",
    bio: "宋武帝劉裕第三子。即位後整飭吏治、修明法度、輕徭薄賦、興辦儒學，江南戶口蕃衍，社會經濟空前繁榮，史稱『元嘉之治』。然而三次發動大規模北伐均告失利，遭北魏太武帝拓跋燾大軍飲馬長江瓜步山，南朝元氣大傷。辛棄疾詞嘆『元嘉草草，封狼居胥，贏得倉皇北顧』。後為太子劉劭弒逆所害。",
    tags: ["元嘉之治", "宋文帝", "元嘉草草", "江南繁庶"],
    relations: [
      { figureId: "liu_yu_song", relationType: "family", label: "高祖父皇 · 繼承氣吞萬里南朝基業" },
      { figureId: "tuoba_dao", relationType: "rival", label: "南北朝勁敵 · 拓跋太武飲馬長江對峙" }
    ],
    participatedEventIds: ["evt_liuyu_song_420"]
  },
  {
    id: "xiao_daocheng",
    name: "蕭道成 (齊高帝)",
    pinyin: "Xiāo Dàochéng",
    title: "南朝蕭齊開國皇帝 · 平定內亂代宋自立",
    faction: "southern",
    birthYear: 427,
    deathYear: 482,
    avatar: "images/figures/fig_xiao_daocheng.jpg",
    bio: "字紹伯，東海蘭陵人，自稱漢相國蕭何二十四世孫。初為劉宋領軍將軍，鎮壓宗室桂陽王、桂陽反叛。宋後廢帝狂暴嗜殺，道成弒帝立順帝，西元 479 年受禪建立南齊。在位性儉約，嚴禁奢靡，推行檢籍整頓戶籍，曾慨嘆『使我治天下十年，當使黃金與土同價』。",
    tags: ["齊高帝", "南齊開國", "蘭陵蕭氏", "黃金與土同價"],
    relations: [
      { figureId: "xiao_yan", relationType: "family", label: "同族子姪 · 後建立南梁王朝" }
    ],
    participatedEventIds: []
  },
  {
    id: "xiao_yan",
    name: "蕭衍 (梁武帝)",
    pinyin: "Xiāo Yǎn",
    title: "南朝梁武帝 · 四十八年菩薩皇帝 · 晚景淒涼侯景之禍",
    faction: "southern",
    birthYear: 464,
    deathYear: 549,
    avatar: "images/figures/fig_xiao_yan.jpg",
    bio: "字叔達，南蘭陵中都里人。競陵八友之一，文武兼資。西元 502 年代齊建立南梁。在位四十八年，博學多才，精通儒釋道，創立國子學五館；篤信佛教，四度捨身同泰寺為奴由群臣重金贖出，建寺數百處，人稱『菩薩皇帝』。晚年接納東魏降將侯景引狼入室，侯景叛亂圍台城，八十六歲梁武帝遭囚禁淨居殿飢渴而崩。",
    tags: ["菩薩皇帝", "梁武帝", "天監之治", "捨身同泰寺", "侯景之亂被餓死"],
    relations: [
      { figureId: "wei_rui", relationType: "advisor", label: "天監柱石名將 · 鐘離大破北魏軍" },
      { figureId: "hou_jing", relationType: "rival", label: "引狼入室之降將 · 圍困台城叛逆" },
      { figureId: "chen_baxian", relationType: "colleague", label: "嶺南起兵平亂之忠將 · 後代梁建陳" }
    ],
    participatedEventIds: ["evt_zhongli_507", "evt_houjing_548"]
  },
  {
    id: "wei_rui",
    name: "韋睿 (懷文)",
    pinyin: "Wéi Ruì",
    title: "南梁名將 · 韋虎 · 鐘離之戰火攻大破北魏二十萬",
    faction: "southern",
    birthYear: 442,
    deathYear: 520,
    avatar: "images/figures/fig_wei_rui.jpg",
    bio: "字懷文，京兆杜陵人。南朝梁一代儒將。體弱不便騎馬，每臨戰陣常乘板輿，持如意指揮三軍進退。鐘離之戰率援軍順淮水春潮而上，造巨艦火攻焚斷北魏浮橋，斬獲溺死北魏甲士十餘萬，元英、楊大眼大潰奔逃。北魏軍畏之呼為『韋虎』。韋睿為人慈愛廉潔，所得賞賜盡散部曲，深受百姓軍民愛戴。",
    tags: ["白袍韋虎", "鐘離大捷", "儒將典範", "南梁第一名將"],
    relations: [
      { figureId: "xiao_yan", relationType: "monarch-subject", label: "梁武帝主君 · 倚仗重臣托付淮南安危" }
    ],
    participatedEventIds: ["evt_zhongli_507"]
  },
  {
    id: "chen_baxian",
    name: "陳霸先 (陳武帝)",
    pinyin: "Chén Bàxiān",
    title: "南朝陳武帝 · 侯景浩劫後力挽狂瀾 · 南朝最後守護者",
    faction: "southern",
    birthYear: 503,
    deathYear: 559,
    avatar: "images/figures/fig_chen_baxian.jpg",
    bio: "字興國，吳興長城人，漢太丘長陳寔之後。出身寒微，起兵嶺南。侯景之亂爆發江南血海，陳霸先自廣州提孤軍北伐，歷經數年血戰擊破侯景收復建康，隨後大敗北齊十萬鐵騎於金陵幕府山下，力挽狂瀾保全江南漢家衣冠社稷。西元 557 年代梁建立南陳，在位克勤克儉，力保江表百姓安寧。",
    tags: ["陳武帝", "平定侯景", "南陳開國", "力挽狂瀾", "保全江左"],
    relations: [
      { figureId: "hou_jing", relationType: "rival", label: "覆滅亂臣賊子 · 誅侯景復建康" },
      { figureId: "xiao_yan", relationType: "monarch-subject", label: "前朝梁武帝 · 討賊匡復梁室殘局" }
    ],
    participatedEventIds: ["evt_houjing_548"]
  },
  {
    id: "hou_jing",
    name: "侯景 (萬景)",
    pinyin: "Hóu Jǐng",
    title: "羯胡叛將 · 宇宙大將軍 · 毀滅江南門閥之浩劫元凶",
    faction: "southern",
    birthYear: 503,
    deathYear: 552,
    avatar: "images/figures/fig_hou_jing.jpg",
    bio: "字萬景，朔方懷朔鎮羯胡人。瘸腿善騎射，狡詐殘忍。初為爾朱榮部下，後投東魏高歡任司徒擁兵十萬。高歡卒叛降西魏未果轉降南梁。梁武帝納其投誠，侯景旋即起兵叛亂，渡江攻破建康台城，餓死梁武帝，殘酷屠戮屠殺三吳世家大族王謝子弟。自立為漢帝封『宇宙大將軍』，後被陳霸先、王僧辯擊潰身首異處。",
    tags: ["侯景之亂", "宇宙大將軍", "台城之難", "世家終結者"],
    relations: [
      { figureId: "xiao_yan", relationType: "rival", label: "反叛受恩之主 · 圍台城餓死梁武帝" },
      { figureId: "chen_baxian", relationType: "rival", label: "命中剋星宿敵 · 被陳霸先討滅梟首" },
      { figureId: "gao_huan", relationType: "monarch-subject", label: "東魏故主 · 高歡病危囑言侯景必叛" }
    ],
    participatedEventIds: ["evt_dongxiwei_534", "evt_houjing_548"]
  },
  {
    id: "zu_chongzhi",
    name: "祖沖之 (文遠)",
    pinyin: "Zǔ Chōngzhī",
    title: "世界級數學家與天文學家 · 算圓周率領先世界千年",
    faction: "southern",
    birthYear: 429,
    deathYear: 500,
    avatar: "images/figures/fig_zu_chongzhi.jpg",
    bio: "字文遠，范陽遒縣人。南朝宋齊傑出科學家。以割圓術精算圓周率至小數點後第七位（3.1415926 與 3.1415927 之間），並求得密率 355/113，領先歐洲一千一百餘年；編制《大明曆》首次將歲差引入曆法；改造指南車、水碓磨，製造『千里船』，為中古中華科學文明最高峰代表。",
    tags: ["圓周率精算", "大明曆", "割圓術", "指南車", "世界科技巨擘"],
    relations: [
      { figureId: "liu_yilong", relationType: "monarch-subject", label: "宋文帝元嘉盛期太學培養之科學英才" }
    ],
    participatedEventIds: []
  },

  // --- 北朝帝王、將相與名家 (Northern Dynasties: Northern Wei, Eastern/Western Wei, Northern Qi, Northern Zhou, Sui) ---
  {
    id: "tuoba_gui",
    name: "拓跋珪 (北魏道武帝)",
    pinyin: "Tuòbá Guī",
    title: "北魏開國皇帝 · 鮮卑盛樂復國 · 參合陂破燕奠基中原",
    faction: "northern",
    birthYear: 371,
    deathYear: 409,
    avatar: "images/figures/fig_tuoba_gui.jpg",
    bio: "拓跋鮮卑代王拓跋什翼犍之孫。前秦崩潰後，於牛川大會諸部復興代國，改國號為魏。西元 395 年參合陂之戰以兩萬精騎雪夜奔襲大破後燕八萬主力，奪取河北中原平原。西元 398 年遷都平城（大同）正式稱帝，制定官爵律令，引進中原漢家農耕制度，為北魏百年基業奠定宏圖。",
    tags: ["北魏開國", "道武帝", "參合陂大捷", "遷都平城"],
    relations: [
      { figureId: "murong_chui", relationType: "rival", label: "參合陂全殲燕軍 · 致慕容垂嘔血而崩" },
      { figureId: "tuoba_dao", relationType: "family", label: "皇孫 · 繼承北魏雄圖一統北方" }
    ],
    participatedEventIds: ["evt_tuoba_gui_386", "evt_canhebei_395"]
  },
  {
    id: "tuoba_dao",
    name: "拓跋燾 (北魏太武帝)",
    pinyin: "Tuòbá Dào",
    title: "北魏太武帝 · 滅大夏平北涼統一北方 · 飲馬長江",
    faction: "northern",
    birthYear: 408,
    deathYear: 452,
    avatar: "images/figures/fig_tuoba_dao.jpg",
    bio: "字佛貍，道武帝拓跋珪之孫。勇健多謀略，善用騎兵。西征赫連夏克統萬城，北伐柔然大漠千里，西平北燕、滅北涼生擒沮渠牧犍，西元 439 年徹底統一華北北方，結束十六國一百三十餘年混戰割據。西元 450 年南征大破宋文帝北伐，率騎兵直抵長江瓜步山飲馬長江，威震江南。",
    tags: ["太武帝", "統一華北", "滅大夏北涼", "瓜步之戰飲馬長江"],
    relations: [
      { figureId: "tuoba_gui", relationType: "family", label: "祖皇始祖 · 承繼北魏強兵基業" },
      { figureId: "liu_yilong", relationType: "rival", label: "南北朝死敵 · 擊潰元嘉北伐兵臨長江" },
      { figureId: "tuoba_hong", relationType: "family", label: "曾孫 · 後繼太和孝文漢化盛期" }
    ],
    participatedEventIds: ["evt_canhebei_395"]
  },
  {
    id: "tuoba_hong",
    name: "元宏 (北魏孝文帝)",
    pinyin: "Yuán Hóng",
    title: "北魏孝文帝 · 遷都洛陽全盤漢化 · 太和改制民族大融合",
    faction: "northern",
    birthYear: 467,
    deathYear: 499,
    avatar: "images/figures/fig_tuoba_hong.jpg",
    bio: "原名拓跋宏，獻文帝長子。馮太后撫育成人。親政後力排保守鮮卑貴族阻力，西元 493 年借南征遷都洛陽。實行激進徹底漢化政策：禁穿胡服改著漢裝、三十歲以下朝廷斷諸北語、拓跋氏改姓元氏並推行胡漢通婚。頒行『均田制』與『三長制』，極大促進北方農業經濟恢復與中華民族深度大融合，為隋唐盛世奠定歷史制度底蘊。",
    tags: ["太和改制", "孝文帝遷洛", "改姓元氏", "均田制", "民族大融合"],
    relations: [
      { figureId: "feng_taihou", relationType: "family", label: "撫育祖母 · 共同推動均田三長改制" },
      { figureId: "xiao_daocheng", relationType: "rival", label: "南朝蕭齊分峙君主 · 南北相持" }
    ],
    participatedEventIds: ["evt_xiaowen_qianluo_493"]
  },
  {
    id: "feng_taihou",
    name: "馮太后 (文明皇后)",
    pinyin: "Féng Tàihòu",
    title: "北魏文成文明皇后 · 臨朝稱制二十載 · 均田制幕後推手",
    faction: "northern",
    birthYear: 441,
    deathYear: 490,
    avatar: "images/figures/fig_feng_taihou.svg",
    bio: "長樂信都人，北燕皇族後裔。文成帝皇后。聰敏多智，先後臨朝稱制主持北魏朝政二十餘年。大膽破格起用李沖、高閭等漢人士族名臣，主導創立『均田制』『三長制』與『班祿制』，嚴懲貪腐，親自教養指導孝文帝元宏，為北魏孝文帝全面漢化改革打下堅不可摧之政經基礎。",
    tags: ["文明太后", "均田制奠基人", "臨朝稱制", "北魏女政治家"],
    relations: [
      { figureId: "tuoba_hong", relationType: "family", label: "皇孫天子 · 親自撫育教導成就一代明主" }
    ],
    participatedEventIds: ["evt_xiaowen_qianluo_493"]
  },
  {
    id: "yuwen_tai",
    name: "宇文泰 (黑獺)",
    pinyin: "Yǔwén Tài",
    title: "西魏大丞相 · 八柱國之首 · 創立府兵制與關隴貴族集團",
    faction: "northern",
    birthYear: 507,
    deathYear: 556,
    avatar: "images/figures/fig_yuwen_tai.jpg",
    bio: "字黑獺，代郡武川人，匈奴化宇文鮮卑。西魏實際奠基者。六鎮兵變後迎孝武帝入關中定都長安立西魏。沙苑之戰以不足萬人奇襲大破高歡二十萬大軍。政治上依《周禮》改官制，軍事上開創『八柱國、十二大將軍』府兵制，兵農合一。李唐、大隋皇室皆出於其麾下關隴集團，為隋唐大一統帝業真正締造者。",
    tags: ["八柱國之首", "府兵制創立者", "關隴集團奠基人", "沙苑大捷"],
    relations: [
      { figureId: "gao_huan", relationType: "rival", label: "生平最大宿敵 · 東西魏沙苑決戰" },
      { figureId: "yang_jian", relationType: "monarch-subject", label: "麾下八柱國隨國公楊忠之子 · 後代周立隋" }
    ],
    participatedEventIds: ["evt_dongxiwei_534"]
  },
  {
    id: "gao_huan",
    name: "高歡 (賀六渾)",
    pinyin: "Gāo Huān",
    title: "東魏大丞相 · 北齊神武帝 · 梟雄霸府坐鎮鄴城晉陽",
    faction: "northern",
    birthYear: 496,
    deathYear: 547,
    avatar: "images/figures/fig_gao_huan.jpg",
    bio: "字賀六渾，渤海蓨縣人，鮮卑化漢人。出身懷朔邊鎮貧寒，深通鮮卑與漢人心理。信都起兵破爾朱氏，擁立孝靜帝遷都四十萬戶至鄴城建立東魏，軍事霸府設於太原晉陽。善撫士卒，征戰三十年兼併河北中原膏腴，手握百保鮮卑精銳。臨終敕子高澄高洋『侯景狡詐必叛』，其子後建立北齊王朝。",
    tags: ["齊神武帝", "東魏奠基者", "懷朔梟雄", "霸府鄴城"],
    relations: [
      { figureId: "yuwen_tai", relationType: "rival", label: "一生勁敵對手 · 沙苑河橋拉鋸搏殺" },
      { figureId: "hou_jing", relationType: "monarch-subject", label: "帳下桀驁悍將 · 高歡死後引爆江南侯景之亂" }
    ],
    participatedEventIds: ["evt_dongxiwei_534"]
  },
  {
    id: "jia_sixie",
    name: "賈思勰",
    pinyin: "Jiǎ Sīxié",
    title: "北魏傑出農學家 · 中國第一部完整農學巨著《齊民要術》作者",
    faction: "northern",
    birthYear: 480,
    deathYear: 550,
    avatar: "images/figures/fig_jia_sixie.jpg",
    bio: "齊郡益都人。北魏高陽郡太守。任官期間注重農業水土與民生，廣泛搜集古籍農學記載並深入民間採訪老農實踐經驗。撰寫成《齊民要術》十卷九十二篇十一萬字，系統總結黃河流域農作種植、畜牧、獸醫、釀造、食品加工等農牧業技術，被譽為中國古代農業科技之百科全書。",
    tags: ["齊民要術", "中國第一農書", "賈思勰", "農學巨擘"],
    relations: [
      { figureId: "tuoba_hong", relationType: "monarch-subject", label: "北魏均田制繁榮期湧現之農學巨匠" }
    ],
    participatedEventIds: ["evt_xiaowen_qianluo_493"]
  },
  {
    id: "li_daoyuan",
    name: "酈道元 (善長)",
    pinyin: "Lì Dàoyuán",
    title: "北魏著名地理學家與散文家 · 撰寫千古地理巨著《水經注》",
    faction: "northern",
    birthYear: 466,
    deathYear: 527,
    avatar: "images/figures/fig_li_daoyuan.svg",
    bio: "字善長，范陽涿縣人。北魏御史中尉。好學博覽，足跡遍涉黃河長江南北山川城邑。以三國桑欽《水經》為綱，作《水經注》四十卷三十餘萬字，詳細記載一千二百五十二條水道流域之水文地理、歷史古蹟、民俗神話。文筆清麗雄奇，兼具科學地理紀錄與卓越文學審美價值，名垂千古。",
    tags: ["水經注", "千古地理名著", "酈道元", "三峽名篇"],
    relations: [
      { figureId: "tuoba_hong", relationType: "monarch-subject", label: "孝文帝宣武帝兩朝忠介執法重臣" }
    ],
    participatedEventIds: ["evt_xiaowen_qianluo_493"]
  },
  {
    id: "yang_jian",
    name: "楊堅 (隋文帝)",
    pinyin: "Yáng Jiān",
    title: "隋朝開國皇帝 · 滅陳統一天下 · 開皇之治開啟隋唐三百年盛世",
    faction: "sui",
    birthYear: 541,
    deathYear: 604,
    avatar: "images/figures/fig_yang_jian.jpg",
    bio: "字那羅延，弘農華陰人，北周隨國公楊忠之子，西魏八柱國貴族後裔。西元 581 年受禪代北周建立大隋。西元 589 年發兵五十一萬平滅南陳，活捉陳後主，徹底結束魏晉南北朝四百年南北分裂大動盪，中華大地自西晉永嘉之後重歸天下一統。在位開創『開皇之治』，創三省六部、科舉制、開鑿運河前驅，人口達四千六百萬。",
    tags: ["隋文帝", "南北四百年大一統", "開皇之治", "科舉制開端", "三省六部"],
    relations: [
      { figureId: "yuwen_tai", relationType: "colleague", label: "出身宇文泰創立之關隴八柱國軍事貴族" },
      { figureId: "chen_baxian", relationType: "rival", label: "平滅其後繼政權南陳 · 統一中華" }
    ],
    participatedEventIds: ["evt_suipingchen_589"]
  }
];
