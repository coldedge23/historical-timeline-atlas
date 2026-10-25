const fs = require('fs');
const path = require('path');

// Helper to resolve avatar
function getAvatar(fid) {
  if (fs.existsSync(path.join(__dirname, '..', 'images', 'figures', `fig_${fid}.jpg`))) {
    return `images/figures/fig_${fid}.jpg`;
  }
  if (fs.existsSync(path.join(__dirname, '..', 'images', 'figures', `fig_${fid}.png`))) {
    return `images/figures/fig_${fid}.png`;
  }
  return `images/figures/fig_${fid}.svg`;
}

// 53 New Legendary Figures for Sui-Tang & Five Dynasties
const NEW_FIGURES = [
  // --- 1. SUI & LATE SUI HEROES ---
  {
    id: 'han_qinhu',
    name: '韓擒虎 (子通)',
    courtesyName: '子通',
    titles: ['上柱國', '壽光縣公', '大隋開國九老'],
    roles: ['名將', '大都督', '先鋒統帥'],
    faction: 'sui',
    birthDeath: [538, 592],
    birthDeathDisplay: '西元 538 — 592 年',
    avatar: getAvatar('han_qinhu'),
    origin: '河南東垣（今河南新安）',
    bio: '大隋滅陳第一先鋒名將。勇烈過人，膽略蓋世。開皇八年隋滅陳之戰，韓擒虎率五百精騎雪夜直渡長江採石磯天險，襲拔姑孰，以神速直趨建康，自朱雀門直入南陳皇宮，於景陽樓枯井生擒陳後主陳叔寶，立下不世奇功。民間相傳其威名震爍陰陽，歿後為閻羅王。',
    historicalEvaluation: '《隋書》評曰：「勇擒白額，氣蓋千夫；雪夜泛舟，建康底定，真當代虎將也。」',
    achievements: ['雪夜渡採石磯', '一舉生擒陳後主', '終結南北朝分裂'],
    quotes: ['大丈夫生當為國家平定天下，死當為閻羅天子！'],
    relations: [
      { figureId: 'yang_guang', label: '晉王統帥', relationType: 'superior' },
      { figureId: 'heruo_bi', label: '平陳雙峰', relationType: 'colleague' },
      { figureId: 'yang_su', label: '大軍統帥', relationType: 'colleague' },
      { figureId: 'li_jing', label: '親外甥（傳授兵法）', relationType: 'kinship' }
    ]
  },
  {
    id: 'heruo_bi',
    name: '賀若弼 (輔伯)',
    courtesyName: '輔伯',
    titles: ['右領軍大將軍', '宋國公', '上柱國'],
    roles: ['名將', '軍事家', '開國柱石'],
    faction: 'sui',
    birthDeath: [544, 607],
    birthDeathDisplay: '西元 544 — 607 年',
    avatar: getAvatar('heruo_bi'),
    origin: '河南洛陽',
    bio: '大隋開國名將，與韓擒虎齊名。精通兵法，善出奇謀。滅陳前夕，賀若弼常以換防為名屯兵江北，陳人習以為常不再防備；又以老馬多買江南糧草，麻痺敵心。及伐陳，自廣陵大渡長江，於白土岡背水列陣大破陳軍主力蕭摩訶部，攻克金陵鍾山，功冠全軍。',
    historicalEvaluation: '《資治通鑑》：「賀若弼智略兼具，攻城野戰，所向披靡。」',
    achievements: ['廣陵神速渡江', '白土岡陣斬陳軍銳旅', '生擒蕭摩訶'],
    quotes: ['臣在蔣山之下，破其所持之勇，此陳之所以亡也！'],
    relations: [
      { figureId: 'han_qinhu', label: '滅陳雙雄', relationType: 'colleague' },
      { figureId: 'yang_jian', label: '君臣輔佐', relationType: 'superior' },
      { figureId: 'gao_jiong', label: '朝堂摯友', relationType: 'colleague' }
    ]
  },
  {
    id: 'shi_wansui',
    name: '史萬歲',
    courtesyName: '萬歲',
    titles: ['上柱國', '太平縣公', '右領軍將軍'],
    roles: ['名將', '絕代勇將', '擊突厥統帥'],
    faction: 'sui',
    birthDeath: [549, 600],
    birthDeathDisplay: '西元 549 — 600 年',
    avatar: getAvatar('shi_wansui'),
    origin: '京兆杜陵（今陝西西安）',
    bio: '大隋第一猛將，善騎射，敏捷如猿。開皇初南平林邑，北拒突厥。開皇二十年，突厥達頭可汗大舉入塞，史萬歲率軍於白道相遇。突厥問：「隋將何人？」報曰：「史萬歲！」突厥大驚曰：「得非敦煌戍卒乎？」下馬羅拜馳去。萬歲勒石燕然，追奔百餘里，斬首數千級，突厥聞其名皆破膽。後遭楊素構陷，冤死朝堂。',
    historicalEvaluation: '《隋書》：「萬歲長於撫馭，深入虜庭，勇冠三軍，塞北聞風喪膽。」',
    achievements: ['白道一呼驚退達頭可汗', '南征平叛百戰百勝', '平定江南嶺南叛亂'],
    quotes: ['我史萬歲在此，突厥虜寇安敢前一步！'],
    relations: [
      { figureId: 'yang_jian', label: '冤殺名將', relationType: 'superior' },
      { figureId: 'yang_su', label: '政敵陷害', relationType: 'rival' }
    ]
  },
  {
    id: 'li_mi',
    name: '李密 (玄邃)',
    courtesyName: '玄邃',
    titles: ['瓦崗軍魏公', '上柱國', '蒲山郡公'],
    roles: ['諸侯', '農民起義領袖', '軍事家'],
    faction: 'other',
    birthDeath: [582, 619],
    birthDeathDisplay: '西元 582 — 619 年',
    avatar: getAvatar('li_mi'),
    origin: '京兆長安（今陝西西安）',
    bio: '遼東名門西魏八柱國後裔，瓦崗軍首領。早年隨楊玄感起兵反隋失敗逃匿；後入瓦崗寨，策劃破興洛倉、開倉賑飢，招納天下豪傑。大海寺陣斬大隋宿將張須陀，威震中原，號稱魏公。後在邙山為王世充所破，西投李淵，復謀自立，終被唐將盛彥師斬於熊耳山。',
    historicalEvaluation: '《舊唐書》：「密雖英武宏達，而性多猜忌，卒至覆亡。」',
    achievements: ['大海寺陣斬張須陀', '開洛口倉賑濟百萬饑民', '雄霸中原稱魏公'],
    quotes: ['百姓嗷嗷，唯待開倉。公先取滎陽，據興洛倉，大事濟矣！'],
    relations: [
      { figureId: 'zhai_rang', label: '瓦崗盟兄弟（後誅殺）', relationType: 'rival' },
      { figureId: 'dan_xiongxin', label: '瓦崗部將', relationType: 'subordinate' },
      { figureId: 'wang_shichong', label: '中原宿敵', relationType: 'rival' },
      { figureId: 'li_yuan', label: '降唐稱臣', relationType: 'superior' }
    ]
  },
  {
    id: 'dou_jiande',
    name: '竇建德',
    courtesyName: '建德',
    titles: ['夏王', '大夏政權建立者'],
    roles: ['諸侯', '起義領袖', '民望君主'],
    faction: 'other',
    birthDeath: [573, 621],
    birthDeathDisplay: '西元 573 — 621 年',
    avatar: getAvatar('dou_jiande'),
    origin: '貝州漳南（今河北故城）',
    bio: '隋末河北起義軍領袖，大夏政權建立者。性格寬厚仁俠，恭儉愛民，深得河北士民軍心。斬宇文化及，收降隋宗室百官，秋毫無犯。武德四年，李世民圍洛陽王世充，竇建德恐唇亡齒寒，起大軍十餘萬馳援，於成皋虎牢關與李世民大決戰，戰敗被擒，斬於長安。河北百姓為之立祠千載。',
    historicalEvaluation: '《資治通鑑》：「建德性寬容仁愛，居處無華，深得北方民心。」',
    achievements: ['平滅宇文化及為煬帝復仇', '席捲河北建大夏政權', '仁厚治民深受愛戴'],
    quotes: ['吾聞救人於急，猶水火之赴，安可坐視王世充滅亡？'],
    relations: [
      { figureId: 'li_shimin', label: '虎牢關生死對決', relationType: 'rival' },
      { figureId: 'wang_shichong', label: '洛陽同盟援手', relationType: 'ally' },
      { figureId: 'yuwen_huaji', label: '梟首仇敵', relationType: 'rival' }
    ]
  },
  {
    id: 'wang_shichong',
    name: '王世充 (行滿)',
    courtesyName: '行滿',
    titles: ['大鄭皇帝', '太尉', '相國'],
    roles: ['諸侯', '大鄭皇帝', '隋末梟雄'],
    faction: 'other',
    birthDeath: [567, 621],
    birthDeathDisplay: '西元 567 — 621 年',
    avatar: getAvatar('wang_shichong'),
    origin: '新安（祖籍西域胡人）',
    bio: '隋末盤踞東都洛陽之群雄，狡詐多謀，擅長煽動。大業末統江淮勁卒入衛洛陽，擊潰李密瓦崗軍，降單雄信、程咬金、秦瓊等猛將。後廢隋越王楊侗自立為帝，國號大鄭。武德四年，李世民親征包圍洛陽數月，虎牢關竇建德覆滅後，王世充面縛出降，後為獨孤修德所殺。',
    historicalEvaluation: '《隋書》：「世充口辯給，明習吏事，而為性詭詐。」',
    achievements: ['邙山大破李密瓦崗軍', '稱帝洛陽建大鄭政權'],
    quotes: ['我今為天下主，卿等皆開國佐命之臣！'],
    relations: [
      { figureId: 'li_shimin', label: '洛陽對決終戰俘虜', relationType: 'rival' },
      { figureId: 'dou_jiande', label: '唇齒相依盟友', relationType: 'ally' },
      { figureId: 'dan_xiongxin', label: '招納大將（結親）', relationType: 'subordinate' }
    ]
  },
  {
    id: 'dan_xiongxin',
    name: '單雄信',
    courtesyName: '雄信',
    titles: ['瓦崗五虎將', '大鄭大將軍'],
    roles: ['猛將', '瓦崗名將', '重義烈士'],
    faction: 'other',
    birthDeath: [581, 621],
    birthDeathDisplay: '西元 581 — 621 年',
    avatar: getAvatar('dan_xiongxin'),
    origin: '曹州濟陰（今山東菏澤）',
    bio: '隋末著名勇將，善用馬槊，號稱「飛將」。早年入瓦崗寨與翟讓、徐世勣情同手足。瓦崗軍敗後降王世充，任大將軍，對世充盡忠死守。洛陽之戰中單騎持槊直衝李世民大纛，幾刺世民，為尉遲敬德格開。洛陽城破，世民斬單雄信，徐世勣跪哭求免不得，割己股肉奉與雄信曰：「示同生死！」雄信吞之慷慨就義。',
    historicalEvaluation: '《舊唐書》：「雄信驍捷，善用馬槊，名冠諸軍。」',
    achievements: ['橫槊飛將冠絕中原', '單騎直突秦王大陣', '至死不降全忠義'],
    quotes: ['生平重義，今日就義，何足惜哉！'],
    relations: [
      { figureId: 'li_ji', label: '結義生死摯友', relationType: 'colleague' },
      { figureId: 'li_shimin', label: '戰場誓死不降', relationType: 'rival' },
      { figureId: 'wang_shichong', label: '死忠輔佐君王', relationType: 'superior' }
    ]
  },
  {
    id: 'zhai_rang',
    name: '翟讓',
    courtesyName: '讓',
    titles: ['瓦崗軍寨主', '司徒'],
    roles: ['農民起義領袖', '豪俠草莽'],
    faction: 'other',
    birthDeath: [575, 617],
    birthDeathDisplay: '西元 575 — 617 年',
    avatar: getAvatar('zhai_rang'),
    origin: '東郡韋城（今河南滑縣）',
    bio: '瓦崗起義軍奠基人與首任首領。隋大業末為東郡法曹，獲罪亡命瓦崗山聚眾起義，單雄信、徐世勣皆往歸之。後李密來投，翟讓見李密才略過人，推舉密為魏公天下首領。後李密羽翼已成，猜忌翟讓，於酒宴間伏殺翟讓，瓦崗將士自此離心離德，終致潰敗。',
    historicalEvaluation: '《資治通鑑》：「翟讓誠直少智，輕信讓位，以至橫罹屠戮。」',
    achievements: ['首創瓦崗寨起義軍', '招撫天下英豪推翻暴政'],
    quotes: ['僕乃草莽之輩，李公子有天子相，當為天下之主！'],
    relations: [
      { figureId: 'li_mi', label: '讓位卻遭酒宴暗殺', relationType: 'rival' },
      { figureId: 'dan_xiongxin', label: '瓦崗生死弟兄', relationType: 'subordinate' }
    ]
  },
  {
    id: 'yuwen_huaji',
    name: '宇文化及',
    courtesyName: '化及',
    titles: ['右屯衛將軍', '大許皇帝'],
    roles: ['叛軍將領', '弒君梟雄'],
    faction: 'other',
    birthDeath: [568, 619],
    birthDeathDisplay: '西元 568 — 619 年',
    avatar: getAvatar('yuwen_huaji'),
    origin: '京兆長安（今陝西西安）',
    bio: '隋右屯衛將軍、左僕射宇文述之子。大業十四年三月，江都禁衛驍果軍怨心思歸，宇文化及煽動兵變，弒殺隋煬帝楊廣，立秦王楊浩為傀儡。隨後率十萬驍果軍大掠北歸，破魏縣自稱大許皇帝。旋為瓦崗李密、淮南李神通大敗，退守聊城，為竇建德所擒梟首。',
    historicalEvaluation: '《隋書》：「化及狂愎陰鷙，弒逆宗君，大逆不道。」',
    achievements: ['江都兵變弒隋煬帝', '短暫自立大許皇帝'],
    quotes: ['人生固有一死，豈可不一日為帝乎！'],
    relations: [
      { figureId: 'yang_guang', label: '叛變弒主', relationType: 'rival' },
      { figureId: 'dou_jiande', label: '破城梟首滅族', relationType: 'rival' }
    ]
  },

  // --- 2. EARLY TANG & ZHENGUAN GLORY ---
  {
    id: 'zhangsun_wuji',
    name: '長孫無忌 (輔機)',
    courtesyName: '輔機',
    titles: ['太尉', '趙國公', '凌煙閣第一功臣'],
    roles: ['謀臣', '宰相', '開國元勛'],
    faction: 'tang',
    birthDeath: [594, 659],
    birthDeathDisplay: '西元 594 — 659 年',
    avatar: getAvatar('zhangsun_wuji'),
    origin: '河南洛陽',
    bio: '唐太宗文德皇后之兄，凌煙閣二十四功臣之首。少與李世民莫逆相交，太原起義即鼎力相隨。玄武門之變主謀樞紐，力勸太宗先發制人。貞觀年間主持制定《唐律疏議》，為華夏法系巔峰典章。太宗駕崩受遺詔輔幼主李治（唐高宗），力抗武則天立后，後遭許敬宗誣陷謀反，逼令自縊於黔州。',
    historicalEvaluation: '《舊唐書》評曰：「輔機位極台鼎，才標宰佐；社稷安危，係於一髮。」',
    achievements: ['凌煙閣第一功臣', '玄武門之變主要策劃者', '主持制定《唐律疏議》'],
    quotes: ['安危在於決斷，大計已定，事不容息！'],
    relations: [
      { figureId: 'li_shimin', label: '摯友·君臣·內兄', relationType: 'superior' },
      { figureId: 'zhangsun_huanghou', label: '親胞妹', relationType: 'kinship' },
      { figureId: 'fang_xuanling', label: '貞觀宰相拍檔', relationType: 'colleague' },
      { figureId: 'wu_zetian', label: '政敵殊死抗衡', relationType: 'rival' }
    ]
  },
  {
    id: 'li_xiaogong',
    name: '李孝恭',
    courtesyName: '孝恭',
    titles: ['司空', '河間郡王', '凌煙閣第二功臣'],
    roles: ['宗室名將', '大都督', '平江南統帥'],
    faction: 'tang',
    birthDeath: [591, 640],
    birthDeathDisplay: '西元 591 — 640 年',
    avatar: getAvatar('li_xiaogong'),
    origin: '隴西成紀（今甘肅秦安）',
    bio: '唐高祖堂姪，李唐宗室第一名將，凌煙閣位居第二。武德年間受命督巴蜀，招撫嶺南四十九州。引李靖為副帥，造艨艟巨艦順江東下，大破蕭銑、滅輔公祏，平定江南半壁江山，功勳蓋世。其後退隱謙退，歌舞自娛，杜絕嫌疑，以得善終。',
    historicalEvaluation: '《新唐書》：「孝恭用兵識度弘遠，定江南半壁，宗室勳冠。」',
    achievements: ['平定梁王蕭銑', '剿滅輔公祏收復江南', '凌煙閣宗室第一功'],
    quotes: ['大將用兵在於順應天時民心，何必窮兵黷武？'],
    relations: [
      { figureId: 'li_jing', label: '副帥摯交（深信其兵法）', relationType: 'colleague' },
      { figureId: 'li_yuan', label: '堂叔高祖皇帝', relationType: 'superior' },
      { figureId: 'li_shimin', label: '宗室兄弟輔佐', relationType: 'colleague' }
    ]
  },
  {
    id: 'hou_junji',
    name: '侯君集',
    courtesyName: '君集',
    titles: ['吏部尚書', '陳國公', '凌煙閣功臣'],
    roles: ['名將', '拓土名將', '西域遠征軍統帥'],
    faction: 'tang',
    birthDeath: [583, 643],
    birthDeathDisplay: '西元 583 — 643 年',
    avatar: getAvatar('hou_junji'),
    origin: '豳州三水（今陝西旬邑）',
    bio: '凌煙閣功臣，大唐西域拓土名帥。隨李靖討吐谷渾，星夜兼程橫絕荒磧兩千里大獲全勝；貞觀十四年受命為交河道行軍大總管，率大軍跨流沙萬里遠征滅高昌國，唐設西州與安西都護府，威震西域。後因私吞高昌珍寶下獄心生怨望，參與太子李承乾謀反，太宗泣淚親自斬於朝堂。',
    historicalEvaluation: '《舊唐書》：「君集摧殘氐羌，拓境高昌，材武有餘，驕矜速禍。」',
    achievements: ['遠征滅吐谷渾伏允', '橫跨流沙萬里滅高昌', '開創大唐安西都護府'],
    quotes: ['臣萬里越流沙拓土西域，今反獲罪乎！'],
    relations: [
      { figureId: 'li_jing', label: '隨同學習兵法', relationType: 'mentor' },
      { figureId: 'li_shimin', label: '深愛其材泣斬名將', relationType: 'superior' }
    ]
  },
  {
    id: 'chai_shao',
    name: '柴紹 (嗣昌)',
    courtesyName: '嗣昌',
    titles: ['右驍衛大將軍', '霍國公', '凌煙閣功臣'],
    roles: ['名將', '勇將', '開國柱石'],
    faction: 'tang',
    birthDeath: [588, 638],
    birthDeathDisplay: '西元 588 — 638 年',
    avatar: getAvatar('chai_shao'),
    origin: '晉州臨汾（今山西臨汾）',
    bio: '大唐開國名將，平陽昭公主之夫，李淵駙馬。太原起兵後單騎赴陣，臨陣驍勇。武德年間吐谷渾寇邊，柴紹被圍於重谷，虜憑高射之，箭如雨下。柴紹命人彈琵琶，使二美女翩翩起舞，虜疑為奇兵罷射爭相聚觀，柴紹悄引精騎自其背奇襲，斬首五百級，威震西陲。',
    historicalEvaluation: '《舊唐書》：「柴紹勇力絕倫，臨機制勝，兵行奇詭。」',
    achievements: ['琵琶美人舞破吐谷渾奇襲', '隨秦王平薛仁杲、宋金剛、王世充', '平滅梁師都統一天下'],
    quotes: ['兵以奇勝，敵怠我擊，何懼萬敵！'],
    relations: [
      { figureId: 'pingyang_gongzhu', label: '夫妻結髮·並肩作戰', relationType: 'kinship' },
      { figureId: 'li_shimin', label: '內弟親密統帥', relationType: 'superior' }
    ]
  },
  {
    id: 'pingyang_gongzhu',
    name: '平陽昭公主',
    courtesyName: '平陽',
    titles: ['娘子軍統帥', '昭公主', '大唐第一巾幗'],
    roles: ['統帥', '女將', '李唐建國柱石'],
    faction: 'tang',
    birthDeath: [598, 623],
    birthDeathDisplay: '西元 598 — 623 年',
    avatar: getAvatar('pingyang_gongzhu'),
    origin: '隴西成紀（太原起兵）',
    bio: '唐高祖李淵第三女，唐太宗同母姊。李淵太原起兵時，公主身處長安，散盡家產招納關中豪傑，組建七萬人之「娘子軍」，連克鄠縣、武功、始平，軍紀森嚴，秋毫無犯，關中百姓相率來歸。李淵渡黃河，公主引精兵與李世民會師渭北，共定長安。逝世時高祖命軍樂儀仗羽葆鼓吹下葬，史稱「前後國葬，唯公主一人」。',
    historicalEvaluation: '《新唐書》評曰：「軍法嚴明，令行禁止，智略過人，真社稷奇女子也。」',
    achievements: ['組建七萬「娘子軍」克定關中', '會師渭北共克長安', '華夏史上唯一軍禮國葬之公主'],
    quotes: ['我自起兵相應，豈可隨夫自匿！'],
    relations: [
      { figureId: 'li_yuan', label: '父皇開國', relationType: 'kinship' },
      { figureId: 'li_shimin', label: '同母胞弟·會師渭北', relationType: 'kinship' },
      { figureId: 'chai_shao', label: '夫妻相濡以沫', relationType: 'kinship' }
    ]
  },
  {
    id: 'xue_rengui',
    name: '薛仁貴 (禮)',
    courtesyName: '禮',
    titles: ['左領軍衛大將軍', '平陽郡公', '安東都護'],
    roles: ['名將', '三箭定天山', '白衣戰神'],
    faction: 'tang',
    birthDeath: [614, 683],
    birthDeathDisplay: '西元 614 — 683 年',
    avatar: getAvatar('xue_rengui'),
    origin: '絳州龍門（今山西河津）',
    bio: '大唐一代傳奇戰神。早年貧賤，應募從軍。太宗征高句麗安市城之戰，仁貴身著白甲白袍，手握方天畫戟，腰挎雙弓，一人單騎馳斬敵陣，高麗望風披靡，太宗遙見奇之，擢升將軍。乾封元年三箭定天山，鐵勒九姓下馬乞降，軍中傳唱「將軍三箭定天山，壯士長歌入漢關」。後任安東都護，撫綏遼東。',
    historicalEvaluation: '《舊唐書》評曰：「仁貴勇冠三軍，威名播於夷獠；三箭天山，千載猶聞其烈。」',
    achievements: ['白袍破陣安市城', '三箭定天山收服鐵勒', '大破高句麗扶餘城'],
    quotes: ['將軍三箭定天山，壯士長歌入漢關！'],
    relations: [
      { figureId: 'li_shimin', label: '慧眼識英拔擢戰神', relationType: 'superior' },
      { figureId: 'li_ji', label: '平遼副帥', relationType: 'colleague' }
    ]
  },
  {
    id: 'su_dingfang',
    name: '蘇定方 (烈)',
    courtesyName: '烈',
    titles: ['邢國公', '左驍衛大將軍', '安西大都護'],
    roles: ['名將', '前後滅三國名帥', '拓土西域'],
    faction: 'tang',
    birthDeath: [592, 667],
    birthDeathDisplay: '西元 592 — 667 年',
    avatar: getAvatar('su_dingfang'),
    origin: '冀州武邑（今河北武邑）',
    bio: '大唐拓土最廣之一代軍神。前後滅西突厥沙缽羅可汗、生擒蔥嶺百濟王扶餘義慈、平定吐谷渾，前後滅三國皆生擒其國主。貞觀初隨李靖夜襲陰山，率二百鐵騎先登破頡利行帳；顯慶年間大破阿史那賀魯於三彌山，唐疆域直抵中亞鹹海（波斯國界），為華夏歷史擴張極致之大功臣。',
    historicalEvaluation: '《舊唐書》評曰：「定方拓土萬里，前後夷三國，擒其王，功烈炳然。」',
    achievements: ['二百精騎夜襲陰山頡利帳', '三彌山大破西突厥擒賀魯', '水陸跨海渡黃海滅百濟'],
    quotes: ['虜眾我寡，當乘其未整，決一死戰！'],
    relations: [
      { figureId: 'li_jing', label: '傳奇副將領受兵法', relationType: 'subordinate' },
      { figureId: 'li_zhi', label: '高宗朝倚重拓土軍神', relationType: 'superior' }
    ]
  },
  {
    id: 'pei_xingjian',
    name: '裴行儉 (守約)',
    courtesyName: '守約',
    titles: ['禮部尚書', '聞喜縣公', '儒將宗師'],
    roles: ['儒將', '軍事家', '名臣'],
    faction: 'tang',
    birthDeath: [619, 682],
    birthDeathDisplay: '西元 619 — 682 年',
    avatar: getAvatar('pei_xingjian'),
    origin: '絳州聞喜（今山西聞喜）',
    bio: '文武雙全之大唐儒將鼻祖，蘇定方唯一兵法傳人。調露元年，西突厥阿史那匐念反叛，裴行儉不費一兵一卒，偽借送波斯王子俾路斯回國為名，引兵西入西域，設計智擒突厥叛酋，四海驚服。精通陰陽律曆，工草書隸書，深明知人善任之道，天下稱「裴公神算」。',
    historicalEvaluation: '《舊唐書》：「行儉沈深有大略，兼資文武，料敵如神。」',
    achievements: ['假途送波斯王智平西突厥', '不戰而屈突厥十姓兵', '蘇定方真傳天下第一兵家'],
    quotes: ['兵貴謀略，豈徒殺戮為快哉？'],
    relations: [
      { figureId: 'su_dingfang', label: '兵法授業恩師', relationType: 'mentor' },
      { figureId: 'li_zhi', label: '深荷倚重之主', relationType: 'superior' }
    ]
  },
  {
    id: 'qibi_heli',
    name: '契苾何力',
    courtesyName: '何力',
    titles: ['鎮軍大將軍', '郕國公', '忠烈名將'],
    roles: ['歸義名將', '鐵勒可汗', '太宗忠勇死士'],
    faction: 'nomadic',
    birthDeath: [608, 677],
    birthDeathDisplay: '西元 608 — 677 年',
    avatar: getAvatar('qibi_heli'),
    origin: '鐵勒九姓契苾部可汗',
    bio: '鐵勒契苾部世襲大首領，貞觀六年率部眾內附長安。太宗深愛其忠誠驍勇，倚為腹心。貞觀十六年回部落省親遭叛徒劫持逼降薛延陀，何力拔刀自割其耳發誓：「大唐天子待我恩深，願死不負！」太宗聞之泣下，以公主許配薛延陀換歸何力。隨征高句麗、滅西突厥，戰功彪炳。太宗駕崩時，何力悲痛欲以身殉葬，高宗苦勸方止。',
    historicalEvaluation: '《新唐書》：「何力割耳明心，誓死戴唐，胡將之中忠孝第一。」',
    achievements: ['割耳明心不背天子', '平滅薛延陀大定漠北', '高麗烏骨城鏖戰破敵'],
    quotes: ['豈有堂堂大唐勇士，為虜寇屈節者！'],
    relations: [
      { figureId: 'li_shimin', label: '天可汗知遇·誓死同歸', relationType: 'superior' },
      { figureId: 'su_dingfang', label: '西征搭檔大將', relationType: 'colleague' }
    ]
  },
  {
    id: 'ashina_sheer',
    name: '阿史那社爾',
    courtesyName: '社爾',
    titles: ['右衛大將軍', '畢國公', '交河道行軍總管'],
    roles: ['名將', '突厥王子', '西域拓土大將'],
    faction: 'nomadic',
    birthDeath: [604, 655],
    birthDeathDisplay: '西元 604 — 655 年',
    avatar: getAvatar('ashina_sheer'),
    origin: '突厥阿史那宗室（處羅可汗次子）',
    bio: '東突厥處羅可汗之子。突厥亡後率部降唐，尚衡陽長公主。貞觀年間統兵出塞，平龜茲、下焉耆，西域震動。攻破龜茲王都，秋毫無犯，所得珍寶悉散麾下士卒，自身片絲不取，西域諸國敬畏服膺。太宗崩逝，社爾長號痛哭，乞殺身殉葬太宗昭陵，高宗下詔阻之，昭陵賜石像守衛十四國酋長之首。',
    historicalEvaluation: '《舊唐書》：「清廉如玉，勇戰不回，真社稷賢將也。」',
    achievements: ['西征大破焉耆龜茲二國', '廉潔奉公秋毫無犯', '昭陵十四國蕃將之首'],
    quotes: ['天可汗待我如手足骨肉，死不足報萬分之一！'],
    relations: [
      { figureId: 'li_shimin', label: '恩深似海天可汗', relationType: 'superior' },
      { figureId: 'qibi_heli', label: '歸義蕃將齊名名將', relationType: 'colleague' }
    ]
  },
  {
    id: 'gar_dongzan',
    name: '祿東贊 (噶爾·東贊宇松)',
    courtesyName: '東贊',
    titles: ['吐蕃大相', '大論', '絕代外交軍事家'],
    roles: ['吐蕃大相', '外交名家', '軍事統帥'],
    faction: 'nomadic',
    birthDeath: [590, 667],
    birthDeathDisplay: '西元 590 — 667 年',
    avatar: getAvatar('gar_dongzan'),
    origin: '吐蕃雅隆悉補野（今西藏山南）',
    bio: '吐蕃松贊干布朝大相（大論），噶爾家族奠基人。才智卓絕，文武兼備。貞觀十四年受命出使長安為松贊干布求婚，李世民出多道難題（辨馬母子、穿九曲明珠等），祿東贊皆以妙智破解，唐太宗深為歎賞，欲留為右衛大將軍，東贊力辭不就，終迎文成公主入藏。其後統吐蕃滅吐谷渾，奠定吐蕃帝國極盛版圖。',
    historicalEvaluation: '《新唐書·吐蕃傳》：「性明毅嚴重，治國掌兵，算無遺策。」',
    achievements: ['妙解六難迎娶文成公主', '主持制定吐蕃律令', '滅吐谷渾稱霸青藏高原'],
    quotes: ['臣有父母妻室在國，死生不可背其主！'],
    relations: [
      { figureId: 'songtsen_gampo', label: '君臣股肱知己', relationType: 'superior' },
      { figureId: 'wencheng_gongzhu', label: '迎請入藏護送使臣', relationType: 'ally' },
      { figureId: 'li_shimin', label: '驚嘆其才之天可汗', relationType: 'superior' }
    ]
  },

  // --- 3. WU ZHOU & HIGH TANG ---
  {
    id: 'li_zhi',
    name: '李治 (唐高宗)',
    courtesyName: '為善',
    titles: ['天皇大帝', '唐高宗', '永徽之治開創者'],
    roles: ['君主', '皇帝', '大唐版圖極盛君王'],
    faction: 'tang',
    birthDeath: [628, 683],
    birthDeathDisplay: '西元 628 — 683 年',
    avatar: getAvatar('li_zhi'),
    origin: '長安東宮',
    bio: '唐太宗第九子，大唐第三任皇帝。在位三十四年，開創「永徽之治」。在位期間大唐對外用兵極盛：滅西突厥阿史那賀魯、滅百濟、滅高句麗、白江口大敗日本，設安西、安東、安北、安南、單于五大都護府，疆域東起朝鮮、西抵鹹海（阿富汗伊朗）、北及貝加爾湖，版圖達一千二百萬平方公里，為大唐歷史極致。晚年多病，政事委於皇后武則天。',
    historicalEvaluation: '《舊唐書》：「高宗恭己思治，武功赫弈；滅三國，拓萬里，有貞觀之風。」',
    achievements: ['開創永徽之治', '徹底平滅高句麗與西突厥', '大唐帝國歷史疆域之極盛'],
    quotes: ['百姓飢饉，朕當減膳撤樂，豈可縱慾自娛？'],
    relations: [
      { figureId: 'li_shimin', label: '父皇天可汗', relationType: 'kinship' },
      { figureId: 'wu_zetian', label: '夫妻·天后並尊二聖', relationType: 'kinship' },
      { figureId: 'zhangsun_wuji', label: '親母舅兼顧命大臣', relationType: 'colleague' }
    ]
  },
  {
    id: 'lou_shide',
    name: '婁師德 (宗仁)',
    courtesyName: '宗仁',
    titles: ['納言', '右相', '同鳳閣鸞臺平章事'],
    roles: ['宰相', '儒將', '長者典範'],
    faction: 'tang',
    birthDeath: [630, 699],
    birthDeathDisplay: '西元 630 — 699 年',
    avatar: getAvatar('lou_shide'),
    origin: '鄭州原武（今河南原陽）',
    bio: '武周名相、邊防大將，成語「唾面自乾」典故出處。進士出身而文武兼修，鎮守青海抵禦吐蕃三十載，屯田八十餘所，邊儲充盈，人馬飽足。性格極其謙退寬仁，弟任代州刺史，師德誡曰：「人唾汝面，笑而受之拭去可也。」私下力薦狄仁傑為宰相，狄仁傑初不知情尚多排擠師德，武后笑出師德薦表，仁傑大慚曰：「婁公盛德，我遠不及也！」',
    historicalEvaluation: '《新唐書》評曰：「師德寬裕能容，任邊數十年，以身報國，古之長者。」',
    achievements: ['鎮守青海屯田禦吐蕃', '唾面自乾謙厚流芳', '舉薦狄仁傑力保大唐'],
    quotes: ['人唾汝面，不可拭也，拭之則示怒，令其自乾可耳！'],
    relations: [
      { figureId: 'wu_zetian', label: '輔佐明主女皇', relationType: 'superior' },
      { figureId: 'di_renjie', label: '暗中力薦之生死相知', relationType: 'ally' }
    ]
  },
  {
    id: 'taiping_gongzhu',
    name: '太平公主',
    courtesyName: '太平',
    titles: ['鎮國太平公主', '大唐第一權勢公主'],
    roles: ['宗室', '政治家', '權柄極盛'],
    faction: 'tang',
    birthDeath: [665, 713],
    birthDeathDisplay: '西元 665 — 713 年',
    avatar: getAvatar('taiping_gongzhu'),
    origin: '長安大明宮',
    bio: '唐高宗與武則天幼女，性格深肖武后，多謀善斷。神龍元年參與誅張易之兄弟、光復李唐；景雲元年與姪李隆基（唐玄宗）聯手發動唐隆政變，誅滅韋后、安樂公主，迎立睿宗李旦。睿宗朝權傾朝野，「宰相七人五出其門」，天下生殺予奪咸歸其手。先天二年謀圖廢立，為唐玄宗先發制人所敗，賜死家中，終結紅妝弄權之時代。',
    historicalEvaluation: '《舊唐書》：「公主沉敏多謀，深得太后愛幸，幾類其母。」',
    achievements: ['神龍政變誅張易之光復李唐', '唐隆政變誅滅韋后挽救李室'],
    quotes: ['天下大器，豈可拱手聽於鼠輩！'],
    relations: [
      { figureId: 'wu_zetian', label: '至愛親女（性格酷似）', relationType: 'kinship' },
      { figureId: 'li_longji', label: '姑姪聯手除韋后，後政敵死鬥', relationType: 'rival' },
      { figureId: 'shangguan_waner', label: '宮闈政爭盟友', relationType: 'ally' }
    ]
  },
  {
    id: 'li_linfu',
    name: '李林甫 (哥奴)',
    courtesyName: '哥奴',
    titles: ['中書令', '晉國公', '右相'],
    roles: ['宰相', '權相', '口蜜腹劍'],
    faction: 'tang',
    birthDeath: [683, 753],
    birthDeathDisplay: '西元 683 — 753 年',
    avatar: getAvatar('li_linfu'),
    origin: '隴西成紀（唐宗室）',
    bio: '盛唐極盛轉向衰亡之關鍵權相，成語「口蜜腹劍」源自於此。任中書令十九年，專權自恣，杜絕言路。為固相位，極力排斥文臣儒將，奏請玄宗專用胡人為節度使（「文人為將怯懦，不若用蕃將驍勇」），直接促成安祿山、史思明兼領范陽、平盧、河東三鎮重兵，為天寶安史浩劫埋下滅頂禍根。',
    historicalEvaluation: '《資治通鑑》評曰：「李林甫為相，口有蜜而腹有劍；用胡人守邊，終成安史之禍。」',
    achievements: ['掌宰相十九年牢固玄宗晚年', '創制《唐六典》完善行政體系'],
    quotes: ['用蕃將不過一夫之勇，文人為將恐生異心！'],
    relations: [
      { figureId: 'li_longji', label: '迎合寵任之帝王', relationType: 'superior' },
      { figureId: 'an_lushan', label: '奏請重用封疆大將', relationType: 'ally' },
      { figureId: 'zhang_jiuling', label: '排擠罷黜政敵', relationType: 'rival' }
    ]
  },
  {
    id: 'yang_guozhong',
    name: '楊國忠 (釗)',
    courtesyName: '釗',
    titles: ['右相', '魏國公', '劍南節度使'],
    roles: ['權臣', '外戚宰相', '安史引信'],
    faction: 'tang',
    birthDeath: [701, 756],
    birthDeathDisplay: '西元 701 — 756 年',
    avatar: getAvatar('yang_guozhong'),
    origin: '蒲州永樂（今山西芮城）',
    bio: '楊貴妃族兄，盛唐外戚權相。因善度支籌算及貴妃專寵得玄宗幸遇，李林甫死後拜右相，兼領度支、吏部等四十餘職。貪鄙弄權，南征南詔兩次全軍覆沒，死者二十萬人。與安祿山水火不容，屢次向玄宗力陳祿山必反，激怒安祿山起兵叛唐。天寶十五年玄宗避難入蜀，途經馬嵬驛，六軍憤怒，軍士斬國忠肉而食之。',
    historicalEvaluation: '《新唐書》：「國忠以裙帶入相，驕奢敗度，南詔喪師，安史發難，覆大唐者國忠也。」',
    achievements: ['以精算財賦擢升相位', '總攬盛唐財政大權'],
    quotes: ['安祿山狼子野心，不除之必為天下巨患！'],
    relations: [
      { figureId: 'yang_guifei', label: '堂族妹（借寵登極）', relationType: 'kinship' },
      { figureId: 'li_longji', label: '盲信重用之昏君', relationType: 'superior' },
      { figureId: 'an_lushan', label: '死仇誘發叛亂', relationType: 'rival' }
    ]
  },
  {
    id: 'gao_xianzhi',
    name: '高仙芝',
    courtesyName: '仙芝',
    titles: ['安西副大都護', '密雲郡公', '河西節度使'],
    roles: ['名將', '高麗後裔', '怛羅斯之戰統帥'],
    faction: 'tang',
    birthDeath: [700, 756],
    birthDeathDisplay: '西元 700 — 756 年',
    avatar: getAvatar('gao_xianzhi'),
    origin: '高句麗後裔（祖籍平壤）',
    bio: '盛唐帕米爾高原山地戰神，高麗族名將。天寶六載，率一萬步騎越蔥嶺（帕米爾高原），涉雪海萬仞，奇襲小勃律國，俘勃律王及吐蕃公主，威服西域七十二國；天寶十載率蕃漢三萬遠征怛羅斯與大食（阿拉伯帝國）決戰，因葛邏祿叛降兵敗，造紙術自此西傳歐洲。安史之亂退守潼關固守，為監軍宦官邊令誠誣陷冤殺，潼關失守。',
    historicalEvaluation: '《舊唐書》：「仙芝深入西域，踰蔥嶺，絕雪山，威震拂菻，近代名將無及者。」',
    achievements: ['橫跨帕米爾高原奇襲小勃律', '怛羅斯之戰促使造紙術西傳世界', '固守潼關防線阻叛軍'],
    quotes: ['男兒生當立功異域，豈可齷齪老死床笫！'],
    relations: [
      { figureId: 'geshu_han', label: '齊名河隴名將', relationType: 'colleague' },
      { figureId: 'feng_changqing', label: '刎頸交副將（同日冤死）', relationType: 'subordinate' },
      { figureId: 'li_longji', label: '聽信宦官冤殺之昏主', relationType: 'superior' }
    ]
  },
  {
    id: 'geshu_han',
    name: '哥舒翰',
    courtesyName: '翰',
    titles: ['隴右河西節度使', '西平郡王', '太子太保'],
    roles: ['名將', '突騎施名將', '西陲戰神'],
    faction: 'tang',
    birthDeath: [704, 757],
    birthDeathDisplay: '西元 704 — 757 年',
    avatar: getAvatar('geshu_han'),
    origin: '突騎施哥舒部（西域突厥族）',
    bio: '大唐隴右戰神，西域胡人之後。善使重槊，勇武冠絕邊陲。鎮守河西隴右，大破吐蕃於石堡城、苦拔海，吐蕃聞名不敢牧馬青海。民間有詩讚：「北斗七星高，哥舒夜帶刀。至今窺牧馬，不敢過臨洮。」安史之亂中抱病出鎮潼關，楊國忠逼其出關出擊，靈寶之役二十萬唐軍中伏大潰，翰被俘送洛陽，不屈遇害。',
    historicalEvaluation: '《資治通鑑》：「哥舒翰勇烈冠軍，邊境倚為長城；一出潼關，身死名頹，痛哉！」',
    achievements: ['石堡城血戰大破吐蕃', '北斗七星高名垂青史', '固守潼關力拒安祿山'],
    quotes: ['北斗七星高，哥舒夜帶刀！'],
    relations: [
      { figureId: 'gao_xianzhi', label: '邊陲雙璧名將', relationType: 'colleague' },
      { figureId: 'an_lushan', label: '夙仇死敵', relationType: 'rival' },
      { figureId: 'yang_guozhong', label: '逼令出關陷大軍覆亡', relationType: 'rival' }
    ]
  },
  {
    id: 'xu_yuan',
    name: '許遠 (令威)',
    courtesyName: '令威',
    titles: ['睢陽太守', '忠烈名臣'],
    roles: ['名臣', '守城巨擘', '殉國烈士'],
    faction: 'tang',
    birthDeath: [709, 757],
    birthDeathDisplay: '西元 709 — 757 年',
    avatar: getAvatar('xu_yuan'),
    origin: '杭州鹽官（今浙江海寧）',
    bio: '安史之亂著名抗節名臣，許敬宗玄孫。任睢陽太守，安史叛軍尹子奇率十三萬精兵圍攻睢陽。許遠自度兵略不如張巡，主動退位讓賢，令張巡主持軍事指揮，自己專司督促糧草籌辦戰具，二人相得益彰。歷經十月大戰，糧盡彈絕城破被俘，解送洛陽，至偃師不屈被殺。',
    historicalEvaluation: '《舊唐書》評曰：「張巡之勇，許遠之器，二烈相全，死生以之。」',
    achievements: ['讓賢張巡齊心禦虜', '堅守睢陽十月蔽遮江淮', '保障大唐東南半壁賦稅財政'],
    quotes: ['遠駑鈍不習軍旅，願奉張將軍令，專供糧餉軍需！'],
    relations: [
      { figureId: 'zhang_xun', label: '生死同袍·二烈相全', relationType: 'ally' },
      { figureId: 'nan_jiyun', label: '忠勇麾下猛將', relationType: 'subordinate' }
    ]
  },
  {
    id: 'nan_jiyun',
    name: '南霽雲 (八郎)',
    courtesyName: '八郎',
    titles: ['殿中侍御史', '開府儀同三司', '睢陽猛將'],
    roles: ['猛將', '忠烈死士', '神射手'],
    faction: 'tang',
    birthDeath: [712, 757],
    birthDeathDisplay: '西元 712 — 757 年',
    avatar: getAvatar('nan_jiyun'),
    origin: '魏州頓丘（今河南清豐）',
    bio: '張巡麾下第一勇將，善騎射，號「南八」。睢陽被圍危急，張巡遣南霽雲引三十精騎突圍赴臨淮求援於賀蘭進明。進明忌張巡聲望不肯出兵，但愛霽雲勇烈大設盛宴留之。霽雲泣曰：「睢陽積月無食，人相食，我何忍獨食肉！」拔佩刀斷一指以示決絕：「此指留此，以報大夫厚意！」歸城城破被俘，尹子奇勸降，張巡大呼：「南八，男兒死耳，不可屈節！」霽雲笑曰：「本欲有為，今公出此言，敢不死乎！」慷慨就戮。',
    historicalEvaluation: '《新唐書》：「南八勇冠三軍，泣秦庭斷指，死且大笑，千載烈士！」',
    achievements: ['三十單騎血戰突圍', '斷指明志痛斥賀蘭進明', '從容赴死忠貫日月'],
    quotes: ['南八男兒，不可屈節！'],
    relations: [
      { figureId: 'zhang_xun', label: '誓死相隨主帥', relationType: 'superior' },
      { figureId: 'xu_yuan', label: '同守孤城死節', relationType: 'superior' }
    ]
  },
  {
    id: 'li_bi',
    name: '李泌 (長源)',
    courtesyName: '長源',
    titles: ['鄴侯', '中書侍郎', '同平章事', '白衣宰相'],
    roles: ['謀士', '神仙宰相', '四朝國師'],
    faction: 'tang',
    birthDeath: [722, 789],
    birthDeathDisplay: '西元 722 — 789 年',
    avatar: getAvatar('li_bi'),
    origin: '京兆長安（今陝西西安）',
    bio: '大唐傳奇「白衣宰相」，玄宗、肅宗、代宗、德宗四朝國師。少負神童之名，七歲能文，玄宗親試以圍棋。安史之亂中肅宗即位靈武，急召李泌，泌以布衣入行在，參贊帷幄，運籌定策，提出「阻扼叛軍、疲敵奔命」戰略，收復長安、洛陽兩京。事成後歸隱南嶽衡山。代宗、德宗朝數度復出拜相，調和將相，定回紇、聯南詔、困吐蕃，大唐國勢得延百年。',
    historicalEvaluation: '《資治通鑑》：「李泌清虛博通，奇謀秘策，動中事機，神仙宰相也。」',
    achievements: ['運籌兩京收復大計', '四朝天子帷幄國師', '北和回紇南結南詔大定天下'],
    quotes: ['陛下但知用臣之策，天下自然平定，臣何求封侯拜相？'],
    relations: [
      { figureId: 'guo_ziyi', label: '運籌與軍事無間合作', relationType: 'ally' },
      { figureId: 'li_longji', label: '少時面試天子', relationType: 'superior' }
    ]
  },
  {
    id: 'li_siye',
    name: '李嗣業 (嗣業)',
    courtesyName: '嗣業',
    titles: ['虢國公', '衛尉卿', '陌刀將軍'],
    roles: ['名將', '陌刀隊統帥', '香積寺挽狂瀾者'],
    faction: 'tang',
    birthDeath: [705, 759],
    birthDeathDisplay: '西元 705 — 759 年',
    avatar: getAvatar('li_siye'),
    origin: '京兆高陵（今陝西高陵）',
    bio: '大唐第一陌刀戰神。身高七尺，臂力絕倫。善使巨型陌刀，軍中號「神通將軍」。安史之亂至德二年香積寺大決戰，唐軍前軍潰退，叛軍乘勝壓上，大軍危在旦夕。李嗣業赤裸上身，手執長刀立於陣前大呼：「今日不以身殉國，我軍盡矣！」當嗣業刀者，人馬俱碎！率兩千五百陌刀隊如銅牆鐵壁怒吼推進，斬殺千餘騎，硬生生遏止叛軍衝鋒，轉敗為勝克復長安。後圍相州中流矢殉國。',
    historicalEvaluation: '《舊唐書》評曰：「嗣業力當萬夫，每臨危難，身先士卒；香積寺力挽傾頹，忠烈冠世。」',
    achievements: ['香積寺赤膊手斬狂瀾', '率陌刀隊如牆推進大破叛軍', '收復長安第一功臣'],
    quotes: ['今日不以身殉，大唐社稷危矣！'],
    relations: [
      { figureId: 'guo_ziyi', label: '收復長安主帥', relationType: 'superior' },
      { figureId: 'gao_xianzhi', label: '早年西征帳下猛將', relationType: 'colleague' }
    ]
  },

  // --- 4. MID-LATE TANG & CULTURE ---
  {
    id: 'li_chun_xianzong',
    name: '李純 (唐憲宗)',
    courtesyName: '純',
    titles: ['唐憲宗', '元和中興英主'],
    roles: ['君主', '皇帝', '削平藩鎮英主'],
    faction: 'tang',
    birthDeath: [778, 820],
    birthDeathDisplay: '西元 778 — 820 年',
    avatar: getAvatar('li_chun_xianzong'),
    origin: '長安大明宮',
    bio: '唐朝第十一任皇帝，中晚唐第一中興英主。在位十五年間，立志削藩，剛斷果毅。信任名相杜黃裳、裴度，起用李愬、韓弘等大將，討平蜀中劉闢、江南李錡，攻滅淮西吳元濟，迫使幽州、成德、魏博諸藩鎮相繼俯首納貢，天下復歸於唐，史稱「元和中興」。晚年服金丹性情暴怒，為宦官陳弘志所弒。',
    historicalEvaluation: '《舊唐書》：「憲宗剛明果斷，力抗藩鎮，元和之政，庶幾貞觀。」',
    achievements: ['開創元和中興偉業', '任裴度李愬削平淮西叛逆', '使天下藩鎮復歸王化'],
    quotes: ['藩鎮抗命不恭，朕必窮兵討之，誓無寬貸！'],
    relations: [
      { figureId: 'pei_du', label: '命為平淮宰相', relationType: 'superior' },
      { figureId: 'li_su', label: '拔擢雪夜襲蔡州名帥', relationType: 'superior' },
      { figureId: 'han_yu', label: '貶官潮州（諫迎佛骨）', relationType: 'superior' }
    ]
  },
  {
    id: 'li_su',
    name: '李愬 (元直)',
    courtesyName: '元直',
    titles: ['同中書門下平章事', '涼國公', '西平郡王之子'],
    roles: ['名將', '雪夜入蔡州統帥', '軍事奇才'],
    faction: 'tang',
    birthDeath: [773, 821],
    birthDeathDisplay: '西元 773 — 821 年',
    avatar: getAvatar('li_su'),
    origin: '京兆萬年（西平郡王李晟之子）',
    bio: '中唐名將，唐德宗朝收復長安大將李晟第八子。有父風，深謀有遠略。元和十二年冬，任唐隨鄧節度使，平定淮西吳元濟叛亂。於大風大雪之夜，率九千精兵疾馳一百四十里，踏破鵝鴨池掩蓋行軍聲響，直抵蔡州城下。懸梯登城擒守軍於睡夢中，生擒叛酋吳元濟，三十年淮西巨患一夕平定，名垂中國古代軍事史戰略奇蹟。',
    historicalEvaluation: '《資治通鑑》：「雪夜襲蔡州，兵行神速，千古奇謀也。」',
    achievements: ['雪夜襲蔡州活捉吳元濟', '平定淮西三十年藩鎮割據', '鵝鴨放聲掩踏雪千古妙計'],
    quotes: ['兵之勝在於出其不意，天大雪風厲，賊必謂我不能來！'],
    relations: [
      { figureId: 'li_chun_xianzong', label: '授以削藩大權之英主', relationType: 'superior' },
      { figureId: 'pei_du', label: '親赴淮西督師相公', relationType: 'superior' }
    ]
  },
  {
    id: 'pei_du',
    name: '裴度 (中立)',
    courtesyName: '中立',
    titles: ['中書令', '晉國公', '司徒', '元和賢相'],
    roles: ['宰相', '軍事統帥', '中興重臣'],
    faction: 'tang',
    birthDeath: [765, 839],
    birthDeathDisplay: '西元 765 — 839 年',
    avatar: getAvatar('pei_du'),
    origin: '絳州聞喜（今山西聞喜）',
    bio: '中唐傑出政治家、名相，元和中興之柱石。剛正不阿，堅決主張削藩。淮西用兵之際，藩鎮遣刺客刺殺宰相武元衡於長安街頭，度亦被刺重傷裂首。憲宗欲罷兵，裴度力請親自督師淮西，誓滅賊逆。度至淮西，推心待士，專任李愬，遂成雪夜入蔡州之功。後歷仕憲、穆、敬、文四朝，威德隆重，四夷敬仰，朝野重之如泰山北斗。',
    historicalEvaluation: '《舊唐書》評曰：「裴晉公輔相四朝，威名被於殊俗，社稷倚以為重。」',
    achievements: ['中刺客重創力主削藩不屈', '親赴淮西前線督師破賊', '四朝元老泰山北斗'],
    quotes: ['淮西賊寇不除，天下藩鎮何以服！臣請以身督戰！'],
    relations: [
      { figureId: 'li_chun_xianzong', label: '元和君臣魚水', relationType: 'superior' },
      { figureId: 'li_su', label: '專任委以全權之大將', relationType: 'colleague' },
      { figureId: 'han_yu', label: '推心置腹之文壇摯友', relationType: 'ally' }
    ]
  },
  {
    id: 'han_yu',
    name: '韓愈 (退之)',
    courtesyName: '退之',
    titles: ['吏部侍郎', '昌黎伯', '唐宋八大家之首'],
    roles: ['文豪', '思想家', '名臣'],
    faction: 'cultural',
    birthDeath: [768, 824],
    birthDeathDisplay: '西元 768 — 824 年',
    avatar: getAvatar('han_yu'),
    origin: '河南河陽（今河南孟州）',
    bio: '唐代古文運動領袖，唐宋八大家之首，蘇軾讚其「文起八代之衰，而道濟天下之溺」。提倡「文以載道」、「陳言務去」，革新駢文陳腐之風。元和十四年憲宗迎佛骨入宮，韓愈上《諫迎佛骨表》極言其弊，憲宗大怒欲處死，得裴度等力救，貶潮州刺史。至潮州驅鱷興學，潮州山水悉姓韓。又曾單騎入鎮州宣撫叛將王廷湊，不辱國命。',
    historicalEvaluation: '蘇軾《潮州韓文公廟碑》：「文起八代之衰，而道濟天下之溺，忠犯人主之怒，而勇奪三軍之帥。」',
    achievements: ['發起古文運動振興華夏文章', '《師說》《進學解》千古流芳', '單騎化解鎮州兵變危機'],
    quotes: ['文起八代之衰，道濟天下之溺！', '師者，所以傳道受業解惑也。'],
    relations: [
      { figureId: 'liu_zongyuan', label: '韓柳古文雙聖', relationType: 'colleague' },
      { figureId: 'pei_du', label: '從征淮西·相救之恩', relationType: 'ally' }
    ]
  },
  {
    id: 'liu_zongyuan',
    name: '柳宗元 (子厚)',
    courtesyName: '子厚',
    titles: ['柳州刺史', '禮部員外郎', '河東先生'],
    roles: ['文豪', '思想家', '永州八記作者'],
    faction: 'cultural',
    birthDeath: [773, 819],
    birthDeathDisplay: '西元 773 — 819 年',
    avatar: getAvatar('liu_zongyuan'),
    origin: '河東解縣（今山西運城）',
    bio: '唐代傑出文學家、哲學家，「唐宋八大家」之一。早年參與王叔文「永貞革新」，反對藩鎮割據與宦官弄權；革新失敗後被貶為永州司馬十年，寫下《永州八記》、《捕蛇者說》、《江雪》（「孤舟蓑笠翁，獨釣寒江雪」）等傳世名篇。後遷柳州刺史，興學修政，釋放奴婢，深受嶺南百姓愛戴。與韓愈並稱「韓柳」。',
    historicalEvaluation: '《新唐書》：「子厚文思超卓，奇崛宏博，雄放自成一家。」',
    achievements: ['《永州八記》開創山水遊記巔峰', '名篇《江雪》傳誦千古', '主理永貞革新抗藩鎮'],
    quotes: ['千山鳥飛絕，萬徑人蹤滅。孤舟蓑笠翁，獨釣寒江雪。'],
    relations: [
      { figureId: 'han_yu', label: '韓柳古文旗手', relationType: 'colleague' },
      { figureId: 'liu_yuxi', label: '永貞革新生死同袍', relationType: 'ally' }
    ]
  },
  {
    id: 'liu_yuxi',
    name: '劉禹錫 (夢得)',
    courtesyName: '夢得',
    titles: ['太子賓客', '檢校禮部尚書', '詩豪'],
    roles: ['文豪', '詩豪', '名臣'],
    faction: 'cultural',
    birthDeath: [772, 842],
    birthDeathDisplay: '西元 772 — 842 年',
    avatar: getAvatar('liu_yuxi'),
    origin: '河南洛陽',
    bio: '中唐著名文學家、哲學家，白居易讚其為「詩豪」。參與永貞革新失敗後屢遭貶謫，輾轉朗州、連州、和州二十三年，然曠達樂觀、骨鯁不屈。在和州作《陋室銘》（「山不在高，有仙則名；水不在深，有龍則靈」）；重回長安作玄都觀詩「前度劉郎今又來」，名噪京師。其《烏衣巷》（「舊時王謝堂前燕，飛入尋常百姓家」）成千古興亡絕唱。',
    historicalEvaluation: '白居易讚曰：「彭城劉夢得，詩豪者也。其鋒森然，少敢當者。」',
    achievements: ['作《陋室銘》《竹枝詞》《烏衣巷》', '堅忍豁達號稱詩豪', '前度劉郎傲骨抗逆境'],
    quotes: ['舊時王謝堂前燕，飛入尋常百姓家。', '斯是陋室，惟吾德馨。'],
    relations: [
      { figureId: 'liu_zongyuan', label: '劉柳一生摯友', relationType: 'ally' },
      { figureId: 'bai_juyi', label: '劉白齊名詩壇知己', relationType: 'colleague' }
    ]
  },
  {
    id: 'li_shangyin',
    name: '李商隱 (義山)',
    courtesyName: '義山',
    titles: ['弘農尉', '秘書省正字', '玉谿生'],
    roles: ['詩人', '晚唐詩歌大師', '小李杜'],
    faction: 'cultural',
    birthDeath: [813, 858],
    birthDeathDisplay: '西元 813 — 858 年',
    avatar: getAvatar('li_shangyin'),
    origin: '懷州河內（今河南沁陽）',
    bio: '晚唐著名詩人，與杜牧合稱「小李杜」，與溫庭筠並稱「溫李」。深陷晚唐「牛李黨爭」夾縫，一生坎坷潦倒。其詩構思奇巧，風格穠麗精工，尤其《無題》詩（「相見時難別亦難，東風無力百花殘。春蠶到死絲方盡，蠟炬成灰淚始乾」）與《錦瑟》（「此情可待成追憶，只是當時已惘然」）將唐詩之朦朧婉約推向空前絕後之境地。',
    historicalEvaluation: '《新唐書》評曰：「商隱工博麗，寄託深微，為晚唐之冠。」',
    achievements: ['《錦瑟》《無題》傳頌千古', '晚唐詩歌美學集大成者', '小李杜泰斗地位'],
    quotes: ['身無彩鳳雙飛翼，心有靈犀一點通。', '此情可待成追憶，只是當時已惘然。'],
    relations: [
      { figureId: 'du_mu', label: '晚唐小李杜並駕齊驅', relationType: 'colleague' },
      { figureId: 'bai_juyi', label: '深佩白居易願為其身後兒', relationType: 'mentor' }
    ]
  },
  {
    id: 'du_mu',
    name: '杜牧 (牧之)',
    courtesyName: '牧之',
    titles: ['中書舍人', '樊川居士', '小李杜'],
    roles: ['文豪', '詩人', '兵略家'],
    faction: 'cultural',
    birthDeath: [803, 852],
    birthDeathDisplay: '西元 803 — 852 年',
    avatar: getAvatar('du_mu'),
    origin: '京兆萬年（宰相杜佑之孫）',
    bio: '晚唐大詩人、政論家、兵略家，宰相杜佑之孫。性格豪邁倜儻，精研《孫子兵法》並作注。寫作《阿房宮賦》，警策千古（「秦人不暇自哀，而後人哀之；後人哀之而不鑑之，亦使後人而復哀後人也」）。詩風俊爽雄峭，《清明》（「借問酒家何處有，牧童遙指杏花村」）、《赤壁》（「東風不與周郎便，銅雀春深鎖二喬」）、《山行》（「霜葉紅於二月花」）膾炙人口。',
    historicalEvaluation: '《舊唐書》評曰：「牧俊邁多才，文辭秀逸，兼通兵家大略。」',
    achievements: ['名篇《阿房宮賦》警示興亡', '作注《孫子兵法》兼資文武', '小杜名篇百世傳唱'],
    quotes: ['商女不知亡國恨，隔江猶唱後庭花。', '借問酒家何處有？牧童遙指杏花村。'],
    relations: [
      { figureId: 'li_shangyin', label: '晚唐小李杜雙子星', relationType: 'colleague' }
    ]
  },
  {
    id: 'meng_haoran',
    name: '孟浩然',
    courtesyName: '浩然',
    titles: ['襄陽處士', '山水田園詩派宗師'],
    roles: ['詩人', '田園隱士', '高潔君子'],
    faction: 'cultural',
    birthDeath: [689, 740],
    birthDeathDisplay: '西元 689 — 740 年',
    avatar: getAvatar('meng_haoran'),
    origin: '襄州襄陽（今湖北襄陽）',
    bio: '盛唐山水田園詩派宗師，與王維並稱「王孟」。一生不仕，隱居鹿門山。詩風清曠超俗，澹泊而自然天成。其名作《春曉》（「春眠不覺曉，處處聞啼鳥」）、《過故人莊》（「開軒面場圃，把酒話桑麻」）為華夏啟蒙第一名章。李白極其崇仰之，特作《黃鶴樓送孟浩然之廣陵》及名句「吾愛孟夫子，風流天下聞」。',
    historicalEvaluation: '《新唐書》：「浩然骨貌淑清，行己超潔，篇詠風格，自成一家。」',
    achievements: ['開創盛唐山水田園詩派', '《春曉》傳誦百世家喻戶曉', '李白王維推崇備至之摯友'],
    quotes: ['吾愛孟夫子，風流天下聞。', '春眠不覺曉，處處聞啼鳥。夜來風雨聲，花落知多少。'],
    relations: [
      { figureId: 'wang_wei', label: '盛唐王孟山水並稱', relationType: 'colleague' },
      { figureId: 'li_bai', label: '黃鶴樓煙花送別摯友', relationType: 'ally' }
    ]
  },
  {
    id: 'gao_shi',
    name: '高適 (達夫)',
    courtesyName: '達夫',
    titles: ['淮南節度使', '渤海縣侯', '散騎常侍'],
    roles: ['邊塞詩人', '名將', '節度使'],
    faction: 'cultural',
    birthDeath: [704, 765],
    birthDeathDisplay: '西元 704 — 765 年',
    avatar: getAvatar('gao_shi'),
    origin: '滄州attr/渤海（今河北景縣）',
    bio: '盛唐邊塞詩派代表人物，唐代詩人中唯一官至節度使、封侯拜相者。少孤貧浪跡，五十歲後因文武才略始大展宏圖。安史之亂中隨哥舒翰守潼關，城陷突圍投奔玄宗，陳奏破敵大策；後任淮南節度使、劍南西川節度使，平定永王李璘之亂。其邊塞詩悲壯雄渾，名篇《燕歌行》（「戰士軍前半死生，美人帳下猶歌舞」）、《別董大》（「莫愁前路無知己，天下誰人不識君」）氣魄萬千。',
    historicalEvaluation: '《舊唐書》評曰：「高適有尚父之勇，儒林之華，位極方面，近代詩人莫及。」',
    achievements: ['《燕歌行》《別董大》名冠邊塞', '盛唐詩人唯一步入方鎮封侯拜相者', '平定永王李璘割據'],
    quotes: ['莫愁前路無知己，天下誰人不識君！', '戰士軍前半死生，美人帳下猶歌舞。'],
    relations: [
      { figureId: 'li_bai', label: '青年漫遊同遊摯友（後各仕其主）', relationType: 'rival' },
      { figureId: 'du_fu', label: '草堂貧賤送米生死交', relationType: 'ally' }
    ]
  },
  {
    id: 'cen_shen',
    name: '岑參',
    courtesyName: '參',
    titles: ['嘉州刺史', '右補闕', '邊塞詩雄'],
    roles: ['邊塞詩人', '名臣', '西域行軍名士'],
    faction: 'cultural',
    birthDeath: [715, 770],
    birthDeathDisplay: '西元 715 — 770 年',
    avatar: getAvatar('cen_shen'),
    origin: '荊州江陵（今湖北荊州）',
    bio: '盛唐邊塞詩派宗匠，與高適並稱「高岑」。兩度遠赴天山、輪臺、碎葉等西北邊疆從軍，深入西域大漠六載。詩風奇拔慷慨、色彩絢爛，極寫大漠風雪冰川之奇觀與將士報國之豪情。代表作《白雪歌送武判官歸京》（「忽如一夜春風來，千樹萬樹梨花開。輪臺東門送君去，去時雪滿天山路」）將西域雪景繪出千古奇彩。',
    historicalEvaluation: '《新唐書》：「參詩句精深奇逸，描摹荒寒絕域，風骨特高。」',
    achievements: ['兩度遠征西域大漠拓邊塞詩境', '《白雪歌送武判官歸京》千古雪景名篇'],
    quotes: ['忽如一夜春風來，千樹萬樹梨花開。', '輪臺九月風夜吼，一川碎石大如斗，隨風滿地石亂走。'],
    relations: [
      { figureId: 'gao_shi', label: '高岑邊塞雙雄', relationType: 'colleague' },
      { figureId: 'du_fu', label: '長安唱和同僚詩友', relationType: 'ally' }
    ]
  },

  // --- 5. FIVE DYNASTIES & TEN KINGDOMS ---
  {
    id: 'guo_wei',
    name: '郭威 (文仲)',
    courtesyName: '文仲',
    titles: ['後周太祖', '聖神恭肅文武孝皇帝'],
    roles: ['開國君主', '皇帝', '崇儉明主'],
    faction: 'fiveDynasties',
    birthDeath: [904, 954],
    birthDeathDisplay: '西元 904 — 954 年',
    avatar: getAvatar('guo_wei'),
    origin: '邢州堯山（今河北隆堯）',
    bio: '五代後周開國皇帝，周世宗柴榮之養父。幼貧賤從軍，頸刺雀斑號「郭雀兒」。後漢時任樞密使掌禁軍，平定李守貞三叛。漢隱帝猜忌屠滅郭威長安親眷，郭威被逼起兵澶州，將士黃袍加身擁立為帝，建立後周。在位期間深革五代殘暴弊政，嚴禁酷刑，薄賦節儉，死前遺詔瓦棺紙衣薄葬，為柴榮與趙匡胤掃平天下奠定堅實之民政根基。',
    historicalEvaluation: '《舊五代史》評曰：「太祖克寬克仁，節儉薄葬，除虐政，息生靈，五代良主。」',
    achievements: ['澶州黃袍加身創立後周', '躬行節儉遺詔薄葬瓦棺', '養育周世宗柴榮繼統天下'],
    quotes: ['朕起於微賤，歷經多難，何忍以虛華苦民！'],
    relations: [
      { figureId: 'chai_rong', label: '養子·傳位一代英主', relationType: 'kinship' },
      { figureId: 'feng_dao', label: '留任元老宰相', relationType: 'subordinate' }
    ]
  },
  {
    id: 'li_siyuan',
    name: '李嗣源 (唐明宗)',
    courtesyName: '邈佶烈',
    titles: ['後唐明宗', '番名邈佶烈'],
    roles: ['君主', '皇帝', '五代寬仁明君'],
    faction: 'fiveDynasties',
    birthDeath: [867, 933],
    birthDeathDisplay: '西元 867 — 933 年',
    avatar: getAvatar('li_siyuan'),
    origin: '沙陀部人（李克用養子）',
    bio: '後唐第二任皇帝，李克用養子「十三太保」之長。性寡言沉毅，臨陣驍勇。李存勖兵變遇弒後入洛陽即位。在位七年間，目睹五代板蕩兵禍，革除存勖伶人亂政，不興大獄，省刑薄賦，屢有豐年，史稱小康之治。每夕夜焚香祝天曰：「臣胡人，因亂得天子位，願天早生聖人，為生民主！」為五代亂世不可多得之仁善之君。',
    historicalEvaluation: '《舊五代史》：「明宗恭儉寬厚，愛民惜兵，亂世之長者。」',
    achievements: ['平定伶人亂政整肅朝綱', '夜焚香祝天願生聖人安天下', '在位七年五代難得小康'],
    quotes: ['願天早生聖人，以安蒼生！'],
    relations: [
      { figureId: 'li_keyong', label: '義父沙陀武帝', relationType: 'kinship' },
      { figureId: 'li_cunxu', label: '義弟·兵變後入繼大統', relationType: 'colleague' },
      { figureId: 'shi_jingtang', label: '女婿（後叛晉借契丹）', relationType: 'kinship' }
    ]
  },
  {
    id: 'liu_zhiyuan',
    name: '劉知遠 (後漢高祖)',
    courtesyName: '知遠',
    titles: ['後漢高祖', '睿文聖武昭肅孝皇帝'],
    roles: ['君主', '皇帝', '沙陀名將'],
    faction: 'fiveDynasties',
    birthDeath: [895, 948],
    birthDeathDisplay: '西元 895 — 948 年',
    avatar: getAvatar('liu_zhiyuan'),
    origin: '沙陀部（太原晉陽）',
    bio: '五代後漢開國皇帝，沙陀族名將。早年隨石敬瑭轉戰，曾兩度捨命救石敬瑭於重圍。石敬瑭稱「兒皇帝」割燕雲十六州引契丹滅後唐，知遠切諫不可，敬瑭不聽。後晉被遼滅後，中原群龍無首，知遠於太原晉陽起兵稱帝建立後漢，揮軍南下驅逐契丹殘部，收復開封、洛陽，使中原免於異族長期踐踏。',
    historicalEvaluation: '《舊五代史》：「高祖勇沉有謀，驅契丹，復兩京，威震中原。」',
    achievements: ['晉陽起兵驅逐契丹大軍', '收復兩京建立後漢政權'],
    quotes: ['稱臣可矣，稱兒不可；割地示弱，後患無窮！'],
    relations: [
      { figureId: 'shi_jingtang', label: '救命舊主（切諫其引契丹）', relationType: 'colleague' },
      { figureId: 'guo_wei', label: '重用樞密使大將', relationType: 'subordinate' }
    ]
  },
  {
    id: 'qian_liu',
    name: '錢鏐 (具美)',
    courtesyName: '具美',
    titles: ['吳越武肅王', '鎮海鎮東節度使', '吳越國開國之主'],
    roles: ['君主', '十國賢王', '海塘守護者'],
    faction: 'cultural',
    birthDeath: [852, 932],
    birthDeathDisplay: '西元 852 — 932 年',
    avatar: getAvatar('qian_liu'),
    origin: '杭州臨安（今浙江杭州臨安區）',
    bio: '五代十國吳越國開國國王。唐末天下大亂，錢鏐據兩浙十三州，奉行「保境安民」國策，不興征戰。修築捍海塘抵抗錢塘潮，疏浚西湖，引水灌田，使兩浙「家有餘糧，沃野千里」，江南繁華賴其得全。其給王妃之書信「陌上花開，可緩緩歸矣」情深意長，千古傳誦。臨終遺訓子孫：「倘遇真主，宜納土歸順，萬勿以百姓為孤注！」促成日後錢氏和平納土歸宋。',
    historicalEvaluation: '蘇軾《表忠觀碑》讚曰：「吳越之民至今安居樂業，受其賜者三百年矣。」',
    achievements: ['築捍海塘保全杭州江南繁華', '保境安民三十載未起烽火', '遺訓納土歸宋千秋佳話'],
    quotes: ['陌上花開，可緩緩歸矣。', '子孫善事中原真主，無以吾故勞民傷財！'],
    relations: [
      { figureId: 'zhao_kuangyin', label: '遺訓子孫歸順之宋帝', relationType: 'ally' },
      { figureId: 'yang_xingmi', label: '相鄰吳國爭雄抗衡', relationType: 'rival' }
    ]
  },
  {
    id: 'yang_xingmi',
    name: '楊行密 (化源)',
    courtesyName: '化源',
    titles: ['吳王', '南吳太祖', '十國第一人'],
    roles: ['君主', '十國奠基者', '江淮霸主'],
    faction: 'fiveDynasties',
    birthDeath: [852, 905],
    birthDeathDisplay: '西元 852 — 905 年',
    avatar: getAvatar('yang_xingmi'),
    origin: '廬州合肥（今安徽合肥）',
    bio: '五代十國南吳開國之主，史稱「十國第一人」。身材高大，能手碎石，力敵萬人。唐末大亂中崛起江淮，破孫儒、逐楊復恭，盡有江淮、江西之地。清淮嶺之戰大破朱溫大軍，徹底遏止後梁南侵野心，使江南免遭梁軍屠戮。寬簡愛民，獎勵農桑，招納流亡，為五代十國南方最富庶強大之政權奠基。',
    historicalEvaluation: '《十國春秋》評曰：「行密寬弘容眾，撫綏淮甸，遂霸東南。」',
    achievements: ['清淮嶺大破朱溫後梁大軍', '稱霸江淮開創南吳政權', '保全江南生聚免遭中原浩劫'],
    quotes: ['安撫江淮生民，吾之素願也！'],
    relations: [
      { figureId: 'zhu_wen', label: '江淮死敵（清淮嶺阻其南下）', relationType: 'rival' },
      { figureId: 'qian_liu', label: '江南並峙鄰邦', relationType: 'rival' }
    ]
  },
  {
    id: 'yelv_deguang',
    name: '耶律德光 (堯骨)',
    courtesyName: '德光',
    titles: ['遼太宗', '契丹天皇帝'],
    roles: ['君主', '契丹皇帝', '燕雲十六州受領者'],
    faction: 'nomadic',
    birthDeath: [902, 947],
    birthDeathDisplay: '西元 902 — 947 年',
    avatar: getAvatar('yelv_deguang'),
    origin: '契丹迭剌部（阿保機次子）',
    bio: '遼國第二代皇帝，耶律阿保機次子。天顯十一年，後晉石敬瑭起兵求援，尊德光為「兒皇帝」，德光率五萬精騎南下破張敬達，扶植石敬瑭滅後唐，受割燕雲十六州。開運三年，因後晉出帝石重貴不肯稱臣，德光再次南征滅後晉，親入汴京稱帝，改國號為「大遼」。因放任部眾「打草穀」大掠中原激起全民反抗，北撤途中病死於欒城殺胡林。',
    historicalEvaluation: '《遼史》：「太宗長於用兵，入汴稱大遼，割燕雲基業百年。」',
    achievements: ['受割燕雲十六州確立南北對峙', '大軍南下滅後晉定國號為遼', '推行因俗而治之南北面官制'],
    quotes: ['我今為天下主，改國號曰大遼！'],
    relations: [
      { figureId: 'yelv_abaoji', label: '父皇開國太祖', relationType: 'kinship' },
      { figureId: 'shi_jingtang', label: '受其割燕雲之兒皇帝', relationType: 'subordinate' },
      { figureId: 'liu_zhiyuan', label: '中原義軍痛擊抗擊者', relationType: 'rival' }
    ]
  }
];

// Read current figures.js
const figuresPath = path.resolve(__dirname, '..', 'src', 'data', 'periods', 'suiTang', 'figures.js');
let currentFigures = [];
try {
  const mod = require(figuresPath);
  currentFigures = mod.SUI_TANG_FIGURES || [];
} catch (e) {
  // ESM loader via eval
  const content = fs.readFileSync(figuresPath, 'utf8');
  const jsonStr = content.replace(/^[\s\S]*?export const SUI_TANG_FIGURES = /, '').replace(/;[\s\n]*$/, '');
  currentFigures = eval(jsonStr);
}

console.log('Current figures count:', currentFigures.length);

// Merge without duplicates
const existingIds = new Set(currentFigures.map(f => f.id));
let added = 0;
for (const nf of NEW_FIGURES) {
  if (!existingIds.has(nf.id)) {
    currentFigures.push(nf);
    existingIds.add(nf.id);
    added++;
  }
}

console.log(`Added ${added} new figures! Total figures now: ${currentFigures.length}`);

// Write back to figures.js
const outputCode = '// Comprehensive Historical Figures for Sui, Tang and Five Dynasties (581 - 960 CE)\nexport const SUI_TANG_FIGURES = ' +
  JSON.stringify(currentFigures, null, 2) + ';\n';

fs.writeFileSync(figuresPath, outputCode, 'utf8');
console.log('figures.js updated successfully!');
