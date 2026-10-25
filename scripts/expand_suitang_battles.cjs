const fs = require('fs');
const path = require('path');

const battlesPath = path.resolve(__dirname, '..', 'src', 'data', 'periods', 'suiTang', 'battles.js');
let currentBattles = [];
try {
  const content = fs.readFileSync(battlesPath, 'utf8');
  const jsonStr = content.replace(/^[\s\S]*?export const SUI_TANG_BATTLES = /, '').replace(/;[\s\n]*$/, '');
  currentBattles = eval(jsonStr);
} catch (e) {
  console.error('Error reading battles.js:', e);
}

console.log('Current battles count:', currentBattles.length);

const NEW_BATTLES = [
  {
    id: 'bat_baidao_599',
    name: '白道之戰 (史萬歲大破突厥)',
    year: 599,
    yearDisplay: '西元 599 年',
    eraName: '隋 開皇十九年',
    eraDisplay: '隋 開皇十九年',
    shortDescription: '突厥達頭可汗大舉入塞，大隋猛將史萬歲威名震敵，追奔百里大破虜眾',
    locationAncient: '白道（今內蒙古呼和浩特西北）',
    locationName: '白道（今內蒙古呼和浩特西北）',
    locationModern: '內蒙古自治區呼和浩特市托克托縣白道嶺',
    coords: [40.85, 111.65],
    importance: 'major',
    winner: 'sui',
    victorStatement: '★ 大隋名將史萬歲以威名破虜，追奔百里大破突厥主力',
    attacker: {
      factionName: '突厥達頭可汗鐵騎主力',
      name: '突厥達頭可汗鐵騎主力',
      faction: 'nomadic',
      commanders: [{ name: '達頭可汗' }],
      forcesEstimate: '突厥鐵騎十萬餘眾',
      troops: '突厥鐵騎十萬餘眾',
      casualtiesEstimate: '死傷數千人，達頭可汗倉皇北遁'
    },
    defender: {
      factionName: '大隋塞北行軍長城軍團',
      name: '大隋塞北行軍長城軍團',
      faction: 'sui',
      commanders: [
        { name: '史萬歲 (行軍總管)', figureId: 'shi_wansui' },
        { name: '楊素 (並州總管)', figureId: 'yang_su' }
      ],
      forcesEstimate: '隋軍步騎約三萬人',
      troops: '隋軍步騎約三萬人',
      casualtiesEstimate: '傷亡數百人'
    },
    summary: '開皇十九年，突厥達頭可汗糾合部眾大舉犯塞，侵逼陰山。晉王楊廣命史萬歲出塞拒之。軍次白道與突厥相遇。虜侯騎問曰：「隋將何人？」隋軍大呼曰：「史萬歲！」達頭可汗駭曰：「得非敦煌戍卒史萬歲乎？」遣使馳驗，萬歲勒馬馳前馳射，虜相視大駭羅拜引退。萬歲揮精騎乘勢掩殺，追奔百餘里，斬首數千級，虜眾土崩瓦解，史萬歲威震朔漠。',
    strategicSignificance: '徹底粉碎突厥企圖乘隋滅陳後內虛南侵之野心，保全大隋北方長城邊塞二十年太平。',
    tactics: ['以名將個人威望實施強烈心理震懾', '騎兵乘敵引退之際迅猛掩殺追擊百里'],
    svgRoute: 'M 430,205 L 435,215'
  },
  {
    id: 'bat_salsu_612',
    name: '薩水之戰 (隋軍遠征高句麗覆滅)',
    year: 612,
    yearDisplay: '西元 612 年',
    eraName: '隋 大業八年',
    eraDisplay: '隋 大業八年',
    shortDescription: '隋煬帝百萬大軍伐高句麗，宇文述九軍三十萬渡鴨綠江，於薩水遭乙支文德半渡而擊慘敗',
    locationAncient: '薩水（今朝鮮清川江）',
    locationName: '薩水（今朝鮮清川江）',
    locationModern: '朝鮮平安南道清川江流域',
    coords: [39.75, 125.75],
    importance: 'epic',
    winner: 'nomadic',
    victorStatement: '★ 高句麗名將乙支文德大獲全勝，大隋三十萬大軍幾近全軍覆沒',
    attacker: {
      factionName: '大隋大業第一次征高句麗遠征九軍',
      name: '大隋大業第一次征高句麗遠征九軍',
      faction: 'sui',
      commanders: [
        { name: '宇文述 (左翊衛大將軍)' },
        { name: '於仲文 (右翊衛大將軍)' },
        { name: '麥鐵杖 (右屯衛大將軍，戰死)' }
      ],
      forcesEstimate: '跨鴨綠江主力精銳三十萬五千人',
      troops: '跨鴨綠江主力精銳三十萬五千人',
      casualtiesEstimate: '三十萬大軍僅二千七百人逃還遼東，輜重軍械散失殆盡'
    },
    defender: {
      factionName: '高句麗王國大軍',
      name: '高句麗王國大軍',
      faction: 'other',
      commanders: [
        { name: '乙支文德 (高句麗國相·一代軍神)' },
        { name: '嬰陽王高元' }
      ],
      forcesEstimate: '高句麗城防與野戰軍約十萬人',
      troops: '高句麗城防與野戰軍約十萬人',
      casualtiesEstimate: '傷亡數千人'
    },
    summary: '大業八年隋煬帝徵調百萬大軍親征高句麗。遼東城久攻不下，煬帝命宇文述、於仲文等率九軍三十萬五千人渡鴨綠江直搗平壤。高句麗名將乙支文德誘敵深入，隋軍糧盡疲敝至平壤城下被迫撤退。撤至薩水（清川江）半渡之際，乙支文德決壩放水並伏兵齊發，隋軍陣腳大亂，薛世雄、辛世禮潰滅，一晝夜狂奔四百五十里，三十萬五千大軍僅兩千七百人倖還，為大隋帝國由盛轉衰之致命轉折點。',
    strategicSignificance: '大隋三十萬精銳毀於一旦，天下元氣大傷，激化山東河北農民起義，直接敲響隋王朝滅亡喪鐘。',
    tactics: ['誘敵深入疲敵糧道', '半渡而擊決江水淹', '千里窮追斬將奪旗'],
    svgRoute: 'M 590,230 L 610,250'
  },
  {
    id: 'bat_dahaisi_616',
    name: '大海寺之戰 (瓦崗軍陣斬張須陀)',
    year: 616,
    yearDisplay: '西元 616 年',
    eraName: '隋 大業十二年',
    eraDisplay: '隋 大業十二年',
    shortDescription: '李密於滎陽大海寺設十面埋伏，瓦崗軍大破隋軍，陣斬隋末第一剿賊名將張須陀',
    locationAncient: '滎陽大海寺（今河南鄭州滎陽）',
    locationName: '滎陽大海寺（今河南鄭州滎陽）',
    locationModern: '河南省鄭州市滎陽市大海寺遺址',
    coords: [34.78, 113.35],
    importance: 'major',
    winner: 'other',
    victorStatement: '★ 瓦崗軍李密大獲全勝，陣斬隋朝宿將張須陀，威震天下',
    attacker: {
      factionName: '大隋河南討捕軍團',
      name: '大隋河南討捕軍團',
      faction: 'sui',
      commanders: [
        { name: '張須陀 (河南道討捕大使，戰死)' },
        { name: '羅士信 (隋軍勇將)' }
      ],
      forcesEstimate: '隋軍精甲兩萬餘人',
      troops: '隋軍精甲兩萬餘人',
      casualtiesEstimate: '張須陀戰死，隋軍全軍覆沒'
    },
    defender: {
      factionName: '瓦崗起義軍伏兵',
      name: '瓦崗起義軍伏兵',
      faction: 'other',
      commanders: [
        { name: '李密 (策劃伏兵)', figureId: 'li_mi' },
        { name: '翟讓 (引誘敵軍)', figureId: 'zhai_rang' },
        { name: '單雄信 (伏兵猛將)', figureId: 'dan_xiongxin' },
        { name: '徐世勣 (伏兵猛將)', figureId: 'li_ji' }
      ],
      forcesEstimate: '瓦崗精銳約三萬人',
      troops: '瓦崗精銳約三萬人',
      casualtiesEstimate: '傷亡千餘人'
    },
    summary: '隋末大亂，齊郡通守張須陀勇武絕倫，剿滅王薄、孫軒、左孝友等多路義軍，號稱隋廷定海神針。大業十二年冬，張須陀進逼滎陽討伐瓦崗軍。李密料定張須陀勇而輕敵，令翟讓正面迎戰佯敗北走，誘須陀軍入滎陽大海寺密林狹道。李密伏兵暴起截斷歸路，單雄信、徐世勣引鐵騎衝殺。張須陀力戰突圍，見部將陷圍復馳入相救，數次往返力竭戰死，隋軍大潰。瓦崗軍自此雄震中原。',
    strategicSignificance: '隋廷在中原唯一能戰之主力宿將身死軍滅，瓦崗軍聲勢達到頂峰，直趨洛口倉招納百萬之眾。',
    tactics: ['示弱詐敗引敵入甕', '密林設伏四面夾擊', '圍點打援斬殺敵首'],
    svgRoute: 'M 470,305 L 468,312'
  },
  {
    id: 'bat_huoyi_617',
    name: '霍邑之戰 (李唐太原起兵奠基之戰)',
    year: 617,
    yearDisplay: '西元 617 年',
    eraName: '隋 大業十三年',
    eraDisplay: '隋 大業十三年',
    shortDescription: '李淵李世民率太原三萬義兵南下，霍邑斬殺隋虎牙郎將宋老生，打開關中大門',
    locationAncient: '霍邑（今山西霍州）',
    locationName: '霍邑（今山西霍州）',
    locationModern: '山西省臨汾市霍州市城東',
    coords: [36.57, 111.72],
    importance: 'major',
    winner: 'tang',
    victorStatement: '★ 李唐義軍取得決定性大捷，陣斬宋老生，順利挺進長安',
    attacker: {
      factionName: '大唐太原起兵南征義軍',
      name: '大唐太原起兵南征義軍',
      faction: 'tang',
      commanders: [
        { name: '李淵 (唐國公·大將軍)', figureId: 'li_yuan' },
        { name: '李世民 (敦煌公·右領軍大都督)', figureId: 'li_shimin' },
        { name: '李建成 (隴西公·左領軍大都督)' },
        { name: '柴紹 (馬軍統帥)', figureId: 'chai_shao' }
      ],
      forcesEstimate: '太原義兵步騎三萬人',
      troops: '太原義兵步騎三萬人',
      casualtiesEstimate: '傷亡千餘人'
    },
    defender: {
      factionName: '大隋霍邑守軍',
      name: '大隋霍邑守軍',
      faction: 'sui',
      commanders: [
        { name: '宋老生 (大隋虎牙郎將，戰死)' }
      ],
      forcesEstimate: '隋朝精兵兩萬餘人',
      troops: '隋朝精兵兩萬餘人',
      casualtiesEstimate: '宋老生陣亡，守軍覆沒'
    },
    summary: '大業十三年七月，李淵太原起兵誓師南下，大雨連綿二十日，軍中糧盡且傳劉武周欲襲太原，諸將多欲北還。李世民哭諫李淵，指出一退則眾心離散，唯有一鼓作氣直取關中方能成帝業。雨停進至霍邑，隋名將宋老生閉城固守。世民以數百騎誘宋老生出城列陣，建成自左、世民自右斷其歸路，世民引雙刀單騎馳破隋軍大陣，斬關而入。宋老生戰敗欲奔回城，城門已閉，斬於城壕。李唐大軍長驅直入長安。',
    strategicSignificance: '李唐起兵南下生死存亡第一戰，掃清南下黃河阻礙，奠定李唐進佔關中開創帝業之基石。',
    tactics: ['冒雨堅定進軍瓦解退兵論', '奇兵迂迴切斷敵城門歸路', '秦王單騎斬陣破壞敵心理'],
    svgRoute: 'M 445,260 L 442,285'
  },
  {
    id: 'bat_mingshui_622',
    name: '洺水之戰 (李世民大破劉黑闥)',
    year: 622,
    yearDisplay: '西元 622 年',
    eraName: '唐 武德五年',
    eraDisplay: '唐 武德五年',
    shortDescription: '竇建德舊將劉黑闥反唐席捲河北，李世民築堰堰斷洺水，水淹大破十萬叛軍',
    locationAncient: '洺水（今河北曲周與威縣）',
    locationName: '洺水（今河北曲周與威縣）',
    locationModern: '河北省邯鄲市曲周縣洺河故道',
    coords: [36.78, 114.98],
    importance: 'major',
    winner: 'tang',
    victorStatement: '★ 秦王李世民智勇兼備決水破敵，徹底平定河北大叛亂',
    attacker: {
      factionName: '大唐秦王討逆大軍',
      name: '大唐秦王討逆大軍',
      faction: 'tang',
      commanders: [
        { name: '李世民 (秦王·天策上將)', figureId: 'li_shimin' },
        { name: '李勣 (徐世勣)', figureId: 'li_ji' },
        { name: '程知節 (程咬金)', figureId: 'cheng_yaojin' },
        { name: '羅士信 (死守洺水殉國)' }
      ],
      forcesEstimate: '唐軍精兵約五萬人',
      troops: '唐軍精兵約五萬人',
      casualtiesEstimate: '羅士信部八百人殉國，全軍傷亡數千'
    },
    defender: {
      factionName: '漢東王劉黑闥主力叛軍',
      name: '漢東王劉黑闥主力叛軍',
      faction: 'other',
      commanders: [
        { name: '劉黑闥 (自稱漢東王)' },
        { name: '范願' }
      ],
      forcesEstimate: '河北義軍精銳約十萬人',
      troops: '河北義軍精銳約十萬人',
      casualtiesEstimate: '降卒及被淹死者數萬人，黑闥率百餘騎北逃突厥'
    },
    summary: '武德四年竇建德被斬，河北舊將推劉黑闥起兵，旬月間盡復竇建德故地，唐淮安王李神通、徐世勣相繼敗績。武德五年，李世民親率大軍進駐洺水與劉黑闥隔水相持六十餘日。世民密遣人在洺水上游築堰蓄水，故意誘劉黑闥率全軍渡水來戰。戰至激戰正酣之時，世民命決開上游堰水，洺水波濤洶湧奔流而至，劉黑闥大軍陣腳大亂溺死萬餘，唐軍精騎四面衝擊，十萬河北叛軍徹底瓦解。',
    strategicSignificance: '徹底消除隋唐鼎革之際北方最大之割據叛亂，河北徹底納入大唐版圖。',
    tactics: ['堅壁不戰疲蔽敵軍銳氣', '上游築堰蓄水待機放水', '以水代兵與精騎夾擊'],
    svgRoute: 'M 465,270 L 468,272'
  },
  {
    id: 'bat_xuanwumen_626',
    name: '玄武門之變 (大唐盛世起點之戰)',
    year: 626,
    yearDisplay: '西元 626 年',
    eraName: '唐 武德九年',
    eraDisplay: '唐 武德九年',
    shortDescription: '秦王李世民於長安太極宮玄武門設伏，射殺太子建成、齊王元吉，開創貞觀之治',
    locationAncient: '長安太極宮玄武門',
    locationName: '長安太極宮玄武門',
    locationModern: '陝西省西安市新城區自強西路太極宮玄武門遺址',
    coords: [34.28, 108.93],
    importance: 'epic',
    winner: 'tang',
    victorStatement: '★ 秦王李世民成功扭轉生死危局，即位天子開啟大唐貞觀盛世',
    attacker: {
      factionName: '秦王府死士與天策府將士',
      name: '秦王府死士與天策府將士',
      faction: 'tang',
      commanders: [
        { name: '李世民 (秦王)', figureId: 'li_shimin' },
        { name: '長孫無忌 (謀主)', figureId: 'zhangsun_wuji' },
        { name: '尉遲敬德 (陣前護駕)', figureId: 'yuchi_gong' },
        { name: '侯君集 (突襲將領)', figureId: 'hou_junji' },
        { name: '房玄齡 / 杜如晦 (策劃)' }
      ],
      forcesEstimate: '秦王府精銳死士數百人',
      troops: '秦王府精銳死士數百人',
      casualtiesEstimate: '傷亡數十人'
    },
    defender: {
      factionName: '東宮與齊王府護衛軍',
      name: '東宮與齊王府護衛軍',
      faction: 'tang',
      commanders: [
        { name: '李建成 (皇太子，中箭身亡)' },
        { name: '李元吉 (齊王，被殺)' },
        { name: '馮立 / 薛萬徹 (東宮率更令)' }
      ],
      forcesEstimate: '太子齊王親信衛隊及東宮長林兵兩千餘人',
      troops: '太子齊王親信衛隊及東宮長林兵兩千餘人',
      casualtiesEstimate: '建成、元吉被殺，東宮衛士散亡數百'
    },
    summary: '高祖武德九年六月初四，皇儲爭奪白熱化。李建成、李元吉謀欲藉突厥犯塞調走秦王兵將置世民於死地。世民得告密，密奏高祖建成淫亂後宮，高祖命明早對質。世民與長孫無忌、尉遲敬德率勇士數百人預伏於太極宮玄武門內。建成、元吉入宮覺有異欲勒馬回走，世民飛騎呼之，元吉引弓三射不發，世民一箭射殺建成。元吉欲刺世民，尉遲敬德手斬元吉。敬德披甲執矛直入海池保護高祖，立息兩宮兵禍。李世民立為皇太子，旋即位為太宗。',
    strategicSignificance: '改變大唐乃至整個東亞歷史走向之關鍵政變，結束李唐奪儲內訌，開啟輝煌燦爛之「貞觀之治」。',
    tactics: ['知己知彼搶佔宮門制高點', '神箭手一箭定乾坤除首惡', '披甲入宮迅速控制最高統治者'],
    svgRoute: 'M 432,318 L 433,319'
  },
  {
    id: 'bat_tuyuhun_635',
    name: '吐谷渾之戰 (李靖侯君集絕漠奔襲)',
    year: 635,
    yearDisplay: '西元 635 年',
    eraName: '唐 貞觀九年',
    eraDisplay: '唐 貞觀九年',
    shortDescription: '大唐軍神李靖統六道大軍遠征，絕瀚海跨積石山兩千里，徹底降服吐谷渾',
    locationAncient: '伏俟城與青海湖柏海',
    locationName: '伏俟城與青海湖柏海',
    locationModern: '青海省海南藏族自治州共和縣鐵卜卡古城',
    coords: [36.65, 100.45],
    importance: 'major',
    winner: 'tang',
    victorStatement: '★ 大唐遠征軍克服嚴寒瀚海絕境全殲敵軍，吐谷渾國主自縊降唐',
    attacker: {
      factionName: '大唐西海道遠征六路大軍',
      name: '大唐西海道遠征六路大軍',
      faction: 'tang',
      commanders: [
        { name: '李靖 (西海道行軍大總管)', figureId: 'li_jing' },
        { name: '侯君集 (積石道行軍總管)', figureId: 'hou_junji' },
        { name: '李道宗 (大同道行軍總管)' },
        { name: '契苾何力 (先鋒蕃將)', figureId: 'qibi_heli' }
      ],
      forcesEstimate: '唐軍步騎精銳十萬人',
      troops: '唐軍步騎精銳十萬人',
      casualtiesEstimate: '傷亡數千人，克服糧草嚴寒絕境'
    },
    defender: {
      factionName: '吐谷渾汗國主力',
      name: '吐谷渾汗國主力',
      faction: 'nomadic',
      commanders: [
        { name: '慕容伏允 (吐谷渾可汗，兵敗自縊)' },
        { name: '天柱王 (主戰名相，被誅)' }
      ],
      forcesEstimate: '吐谷渾騎兵十餘萬人',
      troops: '吐谷渾騎兵十餘萬人',
      casualtiesEstimate: '伏允自縊，斬首數萬，降其部眾二十餘萬'
    },
    summary: '貞觀八年吐谷渾屢寇涼州邊境。太宗命六十四歲軍神李靖為大總管出征。吐谷渾退保絕漠，焚燒荒草欲困死唐軍。侯君集力主不可引退，進言：「虜計在燒草疲我，乘其膽破，直搗積石山！」李靖納其策，兵分兩路深涉無人絕漠。士卒嚼冰咽雪，刺馬飲血，涉流沙兩千里，斬天柱王於烏海，追擊伏允至且末。伏允走投無路自縊於荒野，其子慕容順率國人出降，吐谷渾成為大唐藩屬。',
    strategicSignificance: '徹底打通絲綢之路青海咽喉通道，震懾吐蕃與西域諸邦，大唐天可汗威名覆蓋青藏高原北緣。',
    tactics: ['不顧燒草絕境堅決千里縱深突進', '大縱深分進合擊包抄窮追', '刺馬血咽冰雪克服惡劣極端天候'],
    svgRoute: 'M 400,310 L 350,330'
  },
  {
    id: 'bat_songzhou_638',
    name: '松州之戰 (唐蕃首戰與文成公主和親)',
    year: 638,
    yearDisplay: '西元 638 年',
    eraName: '唐 貞觀十二年',
    eraDisplay: '唐 貞觀十二年',
    shortDescription: '松贊干布率二十萬吐蕃軍攻松州求婚，侯君集夜襲大破吐蕃先鋒，奠定唐蕃和親',
    locationAncient: '松州城下（今四川松潘）',
    locationName: '松州城下（今四川松潘）',
    locationModern: '四川省阿壩藏族羌族自治州松潘縣',
    coords: [32.64, 103.59],
    importance: 'major',
    winner: 'tang',
    victorStatement: '★ 侯君集夜襲斬首千餘級破吐蕃，松贊干布遣使謝罪求通和親',
    attacker: {
      factionName: '吐蕃帝國擴張大軍',
      name: '吐蕃帝國擴張大軍',
      faction: 'nomadic',
      commanders: [
        { name: '松贊干布 (吐蕃贊普)', figureId: 'songtsen_gampo' },
        { name: '祿東贊 (大相)', figureId: 'gar_dongzan' }
      ],
      forcesEstimate: '吐蕃步騎聲稱二十萬人',
      troops: '吐蕃步騎聲稱二十萬人',
      casualtiesEstimate: '先鋒營寨被屠斬千餘級，吐蕃退兵'
    },
    defender: {
      factionName: '大唐松州防禦大軍',
      name: '大唐松州防禦大軍',
      faction: 'tang',
      commanders: [
        { name: '侯君集 (當彌道行軍大總管)', figureId: 'hou_junji' },
        { name: '牛進達 (先鋒大將)' }
      ],
      forcesEstimate: '唐軍精兵五萬餘人',
      troops: '唐軍精兵五萬餘人',
      casualtiesEstimate: '傷亡數百人'
    },
    summary: '貞觀十二年，吐蕃贊普松贊干布統一青藏高原，遣使長安請婚未許，遂起兵二十萬大舉侵逼川西，圍困松州。唐太宗任吏部尚書侯君集為大總管，率步騎五萬進援。先鋒牛進達率精甲夜襲吐蕃營寨，趁其無備斬千餘級。松贊干布深畏唐軍威猛，知難以武力脅迫天朝，遂主動引兵退回高原，遣大相祿東贊攜黃金五千兩赴長安謝罪，再次恭謹請婚。太宗深感其誠，許以文成公主出降。',
    strategicSignificance: '唐蕃歷史首次軍事接觸，確立大唐強勢地位，促成千古傳頌之文成公主入藏與漢藏融合。',
    tactics: ['夜暗無備突襲敵軍前哨營壘', '以戰促和確立大國尊嚴威儀'],
    svgRoute: 'M 410,345 L 395,355'
  },
  {
    id: 'bat_gaochang_640',
    name: '唐滅高昌之戰 (西域設安西都護府)',
    year: 640,
    yearDisplay: '西元 640 年',
    eraName: '唐 貞觀十四年',
    eraDisplay: '唐 貞觀十四年',
    shortDescription: '高昌王阻斷絲路勾結西突厥，侯君集率大軍跨流沙七千里克王城，設安西都護府',
    locationAncient: '高昌王城（今新疆吐魯番高昌故城）',
    locationName: '高昌王城（今新疆吐魯番高昌故城）',
    locationModern: '新疆維吾爾自治區吐魯番市高昌區三堡鎮',
    coords: [42.85, 89.52],
    importance: 'major',
    winner: 'tang',
    victorStatement: '★ 大唐遠征軍翻越天山克復高昌，大唐正式設安西都護府經略西域',
    attacker: {
      factionName: '大唐交河道行軍遠征大軍',
      name: '大唐交河道行軍遠征大軍',
      faction: 'tang',
      commanders: [
        { name: '侯君集 (交河道行軍大總管)', figureId: 'hou_junji' },
        { name: '薛萬均 (副總管)' },
        { name: '契苾何力 (突騎將軍)', figureId: 'qibi_heli' }
      ],
      forcesEstimate: '唐軍與屬國騎兵約五萬人',
      troops: '唐軍與屬國騎兵約五萬人',
      casualtiesEstimate: '傷亡千餘人，克服缺水酷熱沙漠'
    },
    defender: {
      factionName: '高昌王國守軍與西突厥援軍',
      name: '高昌王國守軍與西突厥援軍',
      faction: 'other',
      commanders: [
        { name: '麴文泰 (高昌王，聞唐軍至驚懼暴死)' },
        { name: '麴智盛 (繼位幼主，出降)' }
      ],
      forcesEstimate: '高昌軍民及突厥援兵約四萬人',
      troops: '高昌軍民及突厥援兵約四萬人',
      casualtiesEstimate: '麴文泰驚死，麴智盛面縛出降，俘男女七千人'
    },
    summary: '絲路咽喉高昌王麴文泰依附西突厥，阻斷西域各國朝貢商路。太宗遣使諭責，麴文泰反言：「鷹飛於天，雉伏於蒿，各適其性，何必相朝！」太宗震怒，拜侯君集為大總管，率大軍發敦煌跨沙漠七千里遠征。麴文泰原料唐軍絕沙漠必不至，及聞唐軍鐵騎抵柳谷，文泰驚懼發疾暴死。君集架飛樓、造撞車圍高昌王城，石如雨下，西突厥援軍望風奔遁。其子麴智盛開門面縛出降。大唐置西州及安西都護府，絲綢之路暢通無阻。',
    strategicSignificance: '大唐勢力歷史性全面跨入西域天山南北兩路，奠定安西都護府與安西四鎮兩百年基業。',
    tactics: ['神速越過死亡沙漠出其不意', '大型雲梯拋石機猛烈攻堅破城', '瓦解西突厥外援心理防線'],
    svgRoute: 'M 350,300 L 260,250'
  },
  {
    id: 'bat_zhubishan_645',
    name: '駐蹕山之戰 (薛仁貴白袍揚名立萬)',
    year: 645,
    yearDisplay: '西元 645 年',
    eraName: '唐 貞觀十九年',
    eraDisplay: '唐 貞觀十九年',
    shortDescription: '唐太宗親征高句麗於駐蹕山大破高延壽十五萬軍，小將薛仁貴白袍單騎陷陣威震海內',
    locationAncient: '駐蹕山（今遼寧遼陽西南首山）',
    locationName: '駐蹕山（今遼寧遼陽西南首山）',
    locationModern: '遼寧省遼陽市白塔區首山一帶',
    coords: [41.22, 123.12],
    importance: 'major',
    winner: 'tang',
    victorStatement: '★ 唐太宗運籌帷幄大破十五萬高麗軍，斬首兩萬，薛仁貴橫空出世',
    attacker: {
      factionName: '大唐太宗皇帝六軍親征主力',
      name: '大唐太宗皇帝六軍親征主力',
      faction: 'tang',
      commanders: [
        { name: '李世民 (大唐太宗皇帝)', figureId: 'li_shimin' },
        { name: '李勣 (英國公·先鋒行軍總管)', figureId: 'li_ji' },
        { name: '長孫無忌 (奇兵迂迴)', figureId: 'zhangsun_wuji' },
        { name: '薛仁貴 (白袍猛將·一戰揚名)', figureId: 'xue_rengui' }
      ],
      forcesEstimate: '唐軍步騎約三萬人',
      troops: '唐軍步騎約三萬人',
      casualtiesEstimate: '傷亡千餘人'
    },
    defender: {
      factionName: '高句麗援救安市城主力大軍',
      name: '高句麗援救安市城主力大軍',
      faction: 'other',
      commanders: [
        { name: '高延壽 (高句麗北部耨薩，降唐)' },
        { name: '高惠真 (高句麗南部耨薩，降唐)' }
      ],
      forcesEstimate: '高句麗與靺鞨精兵十五萬人',
      troops: '高句麗與靺鞨精兵十五萬人',
      casualtiesEstimate: '斬首兩萬級，高延壽、高惠真率三萬六千八百人降唐'
    },
    summary: '貞觀十九年唐太宗親征高句麗圍安市城。高句麗遣大將高延壽、高惠真統高句麗、靺鞨精兵十五萬來援，漫山遍野綿延四十里。太宗登高望敵，設奇謀：命李勣引萬五千人列陣於西嶺誘敵；長孫無忌引萬一千精兵繞出山後夾擊；太宗自統四千步騎居中策應。交戰中，軍士薛仁貴自恃勇略，獨身披白甲白袍，手持方天畫戟，腰挎雙弓，一人單騎馳入十五萬敵陣，所向披靡殺死數百人，高麗軍望風披靡大潰。太宗大悅，召薛仁貴賜馬二匹、絹四十匹，擢升將軍。',
    strategicSignificance: '一役摧毀高句麗全國主力野戰精銳，名將薛仁貴橫空出世，為日後唐滅高句麗奠定軍事心理優勢。',
    tactics: ['正兵誘敵長孫無忌迂迴夾擊', '白袍勇將單騎破陣產生劇烈衝擊', '雷鼓震天多點包抄圍殲'],
    svgRoute: 'M 540,240 L 565,245'
  },
  {
    id: 'bat_pyongyang_668',
    name: '平壤之戰 (大唐徹底覆滅高句麗)',
    year: 668,
    yearDisplay: '西元 668 年',
    eraName: '唐 總章元年',
    eraDisplay: '唐 總章元年',
    shortDescription: '李勣統唐軍圍攻平壤城一月，開城破敵擒高藏王，終結自隋以來七十年遼東戰事',
    locationAncient: '平壤城（高句麗王都）',
    locationName: '平壤城（高句麗王都）',
    locationModern: '朝鮮平壤直轄市大同江畔牡丹峰故城',
    coords: [39.02, 125.75],
    importance: 'epic',
    winner: 'tang',
    victorStatement: '★ 大唐名將李勣平定平壤覆滅高句麗，唐設安東都護府統轄遼東朝鮮',
    attacker: {
      factionName: '大唐遼東道征高麗大軍',
      name: '大唐遼東道征高麗大軍',
      faction: 'tang',
      commanders: [
        { name: '李勣 (司空·遼東道行軍大總管)', figureId: 'li_ji' },
        { name: '薛仁貴 (右威衛大將軍)', figureId: 'xue_rengui' },
        { name: '契苾何力 (涼國公)', figureId: 'qibi_heli' },
        { name: '賈言忠 (軍機參謀)' }
      ],
      forcesEstimate: '唐軍水陸精銳約十萬人',
      troops: '唐軍水陸精銳約十萬人',
      casualtiesEstimate: '傷亡數千人'
    },
    defender: {
      factionName: '高句麗最後保衛軍隊',
      name: '高句麗最後保衛軍隊',
      faction: 'other',
      commanders: [
        { name: '高藏王 (高句麗國王，被俘出降)' },
        { name: '泉男建 (莫離支·主戰抗唐，自刺未死)' }
      ],
      forcesEstimate: '平壤守軍與殘部約五萬人',
      troops: '平壤守軍與殘部約五萬人',
      casualtiesEstimate: '高麗國亡，降其城一百七十六座，戶六十九萬'
    },
    summary: '乾封二年，高句麗權臣淵蓋蘇文死，其子內訌，長子泉男生降唐。唐高宗命老將李勣為大總管，薛仁貴、契苾何力為副統水陸大軍四面合圍平壤。總章元年九月，唐軍破平壤外城，李勣架飛樓巨砲晝夜轟擊。高句麗僧信誠開城門迎唐軍，薛仁貴、契苾何力引鐵騎湧入，高藏王面縛出降，淵男生之弟泉男建自刺重傷被俘。自隋文帝開皇以來，歷隋煬帝、唐太宗、高宗四朝七十年之高句麗大患徹底終結，唐設安東都護府統轄其地。',
    strategicSignificance: '徹底征服華夏歷代帝王夢寐以求之遼東朝鮮半島，大唐東北邊陲獲得永久安定，版圖達至極盛。',
    tactics: ['利用敵國內訌招降納叛', '水陸協同徹底切斷糧道', '掘地道架投石機連續強攻攻破天下堅城'],
    svgRoute: 'M 580,240 L 610,265'
  },
  {
    id: 'bat_dafeichuan_670',
    name: '大非川之戰 (吐蕃論欽陵重創十萬唐軍)',
    year: 670,
    yearDisplay: '西元 670 年',
    eraName: '唐 咸亨元年',
    eraDisplay: '唐 咸亨元年',
    shortDescription: '薛仁貴護送吐谷渾復國，於青海大非川遭吐蕃名將論欽陵四十萬軍伏擊，全軍覆滅',
    locationAncient: '大非川（今青海共和縣西南切吉平原）',
    locationName: '大非川（今青海共和縣西南切吉平原）',
    locationModern: '青海省海南藏族自治州共和縣切吉鄉一帶',
    coords: [36.05, 99.85],
    importance: 'epic',
    winner: 'nomadic',
    victorStatement: '★ 吐蕃大論論欽陵大獲全勝，薛仁貴大軍潰滅，唐蕃青藏爭霸受重挫',
    attacker: {
      factionName: '大唐邏娑道行軍護送吐谷渾大軍',
      name: '大唐邏娑道行軍護送吐谷渾大軍',
      faction: 'tang',
      commanders: [
        { name: '薛仁貴 (邏娑道行軍大總管)', figureId: 'xue_rengui' },
        { name: '郭待封 (副總管·違節貪功)' },
        { name: '阿史那道真 (副總管)' }
      ],
      forcesEstimate: '唐軍精兵十萬人',
      troops: '唐軍精兵十萬人',
      casualtiesEstimate: '輜重盡失，十萬大軍死傷殆盡，薛仁貴等以重金講和脫免'
    },
    defender: {
      factionName: '吐蕃帝國大軍',
      name: '吐蕃帝國大軍',
      faction: 'nomadic',
      commanders: [
        { name: '論欽陵 (噶爾·欽陵沙布，吐蕃一代戰神)' }
      ],
      forcesEstimate: '吐蕃步騎四十萬眾',
      troops: '吐蕃步騎四十萬眾',
      casualtiesEstimate: '傷亡數千人'
    },
    summary: '咸亨元年，吐蕃滅吐谷渾侵逼西域十八州，唐高宗命薛仁貴統十萬大軍送吐谷渾王復國。薛仁貴定策：烏海地險，當以輕騎出其不意，命副將郭待封引輜重萬人留守大非川築柵自固。郭待封恥居仁貴之下，違命私引輜重糧草尾隨前進。吐蕃名帥論欽陵聞訊引二十萬騎突襲烏海，盡焚郭待封輜重糧草。薛仁貴引前軍回援大非川，論欽陵集結四十萬大軍從四面合圍，唐軍無糧又缺水源，苦戰三日全軍潰滅，薛仁貴被迫與論欽陵盟誓求和歸國，貶為庶人。',
    strategicSignificance: '大唐立國五十年對外最慘烈之軍事慘敗，吐蕃徹底吞併青海吐谷渾故地，確立百餘年唐蕃拉鋸格局。',
    tactics: ['吐蕃大縱深圍點打援切斷糧草輜重', '利用唐軍將領不睦各個擊破', '居高臨下四十萬騎層層包圍'],
    svgRoute: 'M 380,325 L 360,335'
  },
  {
    id: 'bat_tongguan_756',
    name: '潼關之戰 (哥舒翰出關大潰長安失陷)',
    year: 756,
    yearDisplay: '西元 756 年',
    eraName: '唐 天寶十五載',
    eraDisplay: '唐 天寶十五載',
    shortDescription: '楊國忠逼抱病老將哥舒翰引二十萬大軍出潼關決戰，中崔乾祐伏兵慘敗，長安淪陷',
    locationAncient: '潼關與靈寶西原',
    locationName: '潼關與靈寶西原',
    locationModern: '陝西省渭南市潼關縣與河南省靈寶市',
    coords: [34.55, 110.25],
    importance: 'epic',
    winner: 'fanzhen',
    victorStatement: '★ 安史叛軍伏擊大破二十萬唐軍奪取潼關，唐玄宗倉皇逃奔蜀中',
    attacker: {
      factionName: '大唐守護關中主力二十萬精甲',
      name: '大唐守護關中主力二十萬精甲',
      faction: 'tang',
      commanders: [
        { name: '哥舒翰 (河隴節度使·兵敗被俘)', figureId: 'geshu_han' },
        { name: '高適 (掌書記·奮戰突圍)', figureId: 'gao_shi' }
      ],
      forcesEstimate: '河西、隴右、朔方精銳二十萬人',
      troops: '河西、隴右、朔方精銳二十萬人',
      casualtiesEstimate: '二十萬大軍死傷墮黃河溺死者十餘萬，哥舒翰被俘'
    },
    defender: {
      factionName: '安史燕軍崔乾祐伏兵精騎',
      name: '安史燕軍崔乾祐伏兵精騎',
      faction: 'fanzhen',
      commanders: [
        { name: '崔乾祐 (安祿山麾下名將)' },
        { name: '安祿山 (大燕皇帝)', figureId: 'an_lushan' }
      ],
      forcesEstimate: '叛軍精騎約四萬人',
      troops: '叛軍精騎約四萬人',
      casualtiesEstimate: '傷亡千餘人'
    },
    summary: '天寶十五載，安祿山陷洛陽，大唐老將哥舒翰引二十萬大軍深溝高壘固守潼關天險，叛軍屢攻不下。丞相楊國忠疑哥舒翰欲回師除己，日遣中使逼翰出關決戰。哥舒翰撫膺痛哭出關。六月初四至靈寶西原狹道，崔乾祐示弱佯逃，引唐軍入隘口。兩山伏兵萬弩齊發，滾木擂石如雨，唐軍大亂踩踏，墜黃河溺死者數萬人，黃河為之不流。二十萬大軍土崩瓦解，哥舒翰被部將火拔歸仁綁送洛陽。潼關失守，唐玄宗攜貴妃倉皇西逃馬嵬驛。',
    strategicSignificance: '盛唐門戶徹底洞開，天寶盛世一夕灰飛煙滅，釀成玄宗幸蜀、馬嵬驛兵變之大唐國運分水嶺。',
    tactics: ['隘道設伏示弱誘敵深入', '火攻滾石與強弩封鎖退路', '朝廷內部政爭自毀長城逼出關要'],
    svgRoute: 'M 445,315 L 438,318'
  },
  {
    id: 'bat_yezhou_759',
    name: '相州鄴城之戰 (六十萬唐軍潰退)',
    year: 759,
    yearDisplay: '西元 759 年',
    eraName: '唐 乾元二年',
    eraDisplay: '唐 乾元二年',
    shortDescription: '郭子儀李光弼九節度使六十萬大軍圍相州，史思明大軍突至引發大風暴沙，唐軍潰敗',
    locationAncient: '相州鄴城（今河南安陽）',
    locationName: '相州鄴城（今河南安陽）',
    locationModern: '河南省安陽市北漳河一帶鄴城遺址',
    coords: [36.10, 114.38],
    importance: 'epic',
    winner: 'fanzhen',
    victorStatement: '★ 史思明趁狂風沙暴大破六十萬唐軍，安史叛軍死灰復燃再陷洛陽',
    attacker: {
      factionName: '大唐九節度使六十萬大軍',
      name: '大唐九節度使六十萬大軍',
      faction: 'tang',
      commanders: [
        { name: '郭子儀 (朔方節度使)', figureId: 'guo_ziyi' },
        { name: '李光弼 (河東節度使)', figureId: 'li_guangbi' },
        { name: '魯炅 / 許叔冀 / 李嗣業 (陌刀將軍·重傷殉國)', figureId: 'li_siye' },
        { name: '魚朝恩 (監軍中官·無軍事才略)' }
      ],
      forcesEstimate: '九節度使步騎大軍六十萬人',
      troops: '九節度使步騎大軍六十萬人',
      casualtiesEstimate: '李嗣業戰死，唐軍各回本鎮，輜重軍資丟失殆盡'
    },
    defender: {
      factionName: '史思明范陽幽州叛軍精銳',
      name: '史思明范陽幽州叛軍精銳',
      faction: 'fanzhen',
      commanders: [
        { name: '史思明 (自稱大聖燕王)', figureId: 'shi_siming' },
        { name: '安慶緒 (困守相州，後為史思明所殺)' }
      ],
      forcesEstimate: '史思明援軍與安慶緒殘部十三萬人',
      troops: '史思明援軍與安慶緒殘部十三萬人',
      casualtiesEstimate: '死傷萬餘人'
    },
    summary: '乾元元年冬，郭子儀、李光弼等九節度使統大軍六十萬圍安慶緒於相州，引漳水灌城數月，城中人相食。肅宗因疑忌將帥不設主帥，命宦官魚朝恩為觀軍容宣慰處置使。乾元二年三月，史思明引范陽精騎十三萬馳援。兩軍列陣決戰，天地忽颳狂風烈日無光，沙礫飛揚拔木折旗，咫尺不見人馬。唐軍互不相統大驚自潰，各回本鎮。史思明乘風掩殺，斬殺安慶緒奪其兵馬，叛軍再陷東都洛陽，安史之亂再度延宕。',
    strategicSignificance: '唐廷因猜忌不立主帥任用宦官統兵之致命教訓，致使唾手可得之平叛良機白白喪失。',
    tactics: ['宦官專權多頭指揮號令不一', '利用突發沙塵暴實施狂風掩殺'],
    svgRoute: 'M 475,295 L 472,298'
  },
  {
    id: 'bat_luoyang_762',
    name: '橫水大捷 (借回紇收復東都洛陽滅史朝義)',
    year: 762,
    yearDisplay: '西元 762 年',
    eraName: '唐 寶應元年',
    eraDisplay: '唐 寶應元年',
    shortDescription: '僕固懷恩聯結回紇登里可汗鐵騎，於橫水大破史朝義叛軍主力，徹底光復洛陽',
    locationAncient: '洛陽陝州與橫水（今河南陝縣）',
    locationName: '洛陽陝州與橫水（今河南陝縣）',
    locationModern: '河南省三門峽市陝州區橫水鎮',
    coords: [34.72, 111.35],
    importance: 'epic',
    winner: 'tang',
    victorStatement: '★ 大唐回紇聯軍橫水斬首六萬光復洛陽，史朝義自縊安史之亂徹底平定',
    attacker: {
      factionName: '大唐僕固懷恩軍團與回紇登里可汗精騎',
      name: '大唐僕固懷恩軍團與回紇登里可汗精騎',
      faction: 'tang',
      commanders: [
        { name: '僕固懷恩 (天下兵馬副元帥)' },
        { name: '登里可汗 (回紇牟羽可汗)' },
        { name: '郭英乂 (陝州節度使)' }
      ],
      forcesEstimate: '唐軍步騎十萬、回紇鐵騎兩萬人',
      troops: '唐軍步騎十萬、回紇鐵騎兩萬人',
      casualtiesEstimate: '傷亡數千人'
    },
    defender: {
      factionName: '史朝義燕軍主力精銳',
      name: '史朝義燕軍主力精銳',
      faction: 'fanzhen',
      commanders: [
        { name: '史朝義 (史思明之子·大燕末帝)' },
        { name: '阿史那承慶' }
      ],
      forcesEstimate: '燕軍主力精銳八萬餘人',
      troops: '燕軍主力精銳八萬餘人',
      casualtiesEstimate: '斬首六萬級，俘兩萬人，史朝義北逃自殺'
    },
    summary: '寶應元年史朝義殺父史思明自立，引兵再逼潼關。代宗即位，命僕固懷恩為副元帥，許以重賞請得回紇登里可汗大軍相助。兩軍於洛陽西北橫水決戰。史朝義倚險列陣，唐將僕固懷恩命回紇精騎由南山迂迴擊燕軍之背，唐軍步騎正面強攻。兩軍肉搏喋血，回紇驍騎如旋風突入敵心，燕軍大崩，斬首六萬級，積屍塞河。史朝義單騎北奔范陽，部將相繼降唐，朝義投繯自縊於林中。歷時七年零二個月之「安史之亂」至此徹底平定。',
    strategicSignificance: '徹底宣告安史之亂終結，收復兩京，大唐江山得以保全，但亦開啟河北三鎮長期割據之藩鎮格局。',
    tactics: ['引入北方回紇精騎實施大縱深背後包抄', '正面步兵如牆與側翼胡騎旋風衝擊'],
    svgRoute: 'M 450,312 L 465,310'
  },
  {
    id: 'bat_caizhou_817',
    name: '雪夜入蔡州 (李愬神兵奇襲平淮西)',
    year: 817,
    yearDisplay: '西元 817 年',
    eraName: '唐 元和十二年',
    eraDisplay: '唐 元和十二年',
    shortDescription: '大風雪之夜李愬率九千突擊隊奔馳一百四十里，破鵝鴨池掩聲直搗蔡州生擒吳元濟',
    locationAncient: '蔡州城（今河南汝南）',
    locationName: '蔡州城（今河南汝南）',
    locationModern: '河南省駐馬店市汝南縣汝寧鎮故城',
    coords: [33.01, 114.36],
    importance: 'epic',
    winner: 'tang',
    victorStatement: '★ 李愬雪夜奇襲創造古代軍事史登峰造極之神蹟，平定淮西藩鎮',
    attacker: {
      factionName: '大唐隨鄧行軍雪夜突擊軍團',
      name: '大唐隨鄧行軍雪夜突擊軍團',
      faction: 'tang',
      commanders: [
        { name: '李愬 (唐隨鄧節度使·奇襲名帥)', figureId: 'li_su' },
        { name: '李祐 (降將·敢死先鋒)' },
        { name: '史孝德 (中軍統帥)' }
      ],
      forcesEstimate: '敢死精銳步騎九千人',
      troops: '敢死精銳步騎九千人',
      casualtiesEstimate: '幾乎零傷亡神速破城'
    },
    defender: {
      factionName: '淮西節度使割據守軍',
      name: '淮西節度使割據守軍',
      faction: 'fanzhen',
      commanders: [
        { name: '吳元濟 (淮西彰義節度留後，生擒)' },
        { name: '董重質 (精銳大將，屯兵洄曲)' }
      ],
      forcesEstimate: '蔡州城守軍約一萬人（主力在洄曲外線）',
      troops: '蔡州城守軍約一萬人（主力在洄曲外線）',
      casualtiesEstimate: '吳元濟被俘解送長安斬首，淮西降'
    },
    summary: '淮西割據三十年拒不朝覲。元和十二年冬十月，李愬探知吳元濟精銳皆屯於洄曲防禦裴度大軍，蔡州內城空虛。十月十五日夜，天降大風雪，旌旗裂凍，人馬凍死者甚眾。李愬引九千精銳夜出文城，令行禁止，奔馳一百四十里直抵蔡州。路過鵝鴨池，李愬命擊鵝鴨亂鳴以掩踏雪鎧甲聲。四鼓至蔡州城下，李祐引死士懸梯登城，斬熟睡守卒，啟大門迎大軍。吳元濟猶在牙帳內沉睡，忽聞外軍大呼：「常侍出迎唐天子大軍！」牙城破，生擒吳元濟解送長安。三十年淮西平定。',
    strategicSignificance: '中國軍事史上「出其不意、攻其不備」之最高典範，直接促成成德、魏博諸藩鎮納土歸順，成就「元和中興」。',
    tactics: ['雪夜狂風借極端氣候麻痺敵軍', '放鵝鴨以禽鳴掩蓋萬人行軍足音', '調虎離山避實擊虛長驅直入'],
    svgRoute: 'M 480,340 L 485,348'
  },
  {
    id: 'bat_changan_883',
    name: '長安收復之戰 (李克用沙陀鴉軍大破黃巢)',
    year: 883,
    yearDisplay: '西元 883 年',
    eraName: '唐 中和三年',
    eraDisplay: '唐 中和三年',
    shortDescription: '沙陀李克用率四萬黑衣黑甲「鴉兒軍」良田坡大破黃巢大齊軍，長安光復',
    locationAncient: '良田坡與長安城內',
    locationName: '良田坡與長安城內',
    locationModern: '陝西省西安市灞橋區良田村與大明宮遺址',
    coords: [34.30, 109.05],
    importance: 'major',
    winner: 'tang',
    victorStatement: '★ 李克用沙陀鴉軍大破黃巢主力收復長安，黃巢敗走狼虎谷覆滅',
    attacker: {
      factionName: '大唐勤王軍團與沙陀黑鴉鐵騎',
      name: '大唐勤王軍團與沙陀黑鴉鐵騎',
      faction: 'tang',
      commanders: [
        { name: '李克用 (雁門節度使·沙陀飛虎子)', figureId: 'li_keyong' },
        { name: '王重榮 (河中節度使)' },
        { name: '楊復光 (天下兵馬都監)' }
      ],
      forcesEstimate: '沙陀及諸道唐軍約十萬人',
      troops: '沙陀及諸道唐軍約十萬人',
      casualtiesEstimate: '傷亡數千人'
    },
    defender: {
      factionName: '黃巢大齊農民起義軍',
      name: '黃巢大齊農民起義軍',
      faction: 'other',
      commanders: [
        { name: '黃巢 (大齊皇帝)', figureId: 'huang_chao' },
        { name: '黃揆 / 尚讓' }
      ],
      forcesEstimate: '大齊守京主力十五萬人',
      troops: '大齊守京主力十五萬人',
      casualtiesEstimate: '大齊軍戰死數萬人，黃巢率殘部東走河南'
    },
    summary: '中和元年黃巢攻陷長安稱帝，唐僖宗避難成都。中和三年，唐廷起用代北沙陀首領李克用為雁門節度使勤王。李克用年二十八，一眼眇目號「獨眼龍」，麾下四萬精騎皆著黑衣黑甲，號稱「鴉兒軍」，驍勇無匹。四月，李克用大軍逼近長安，黃巢出城十五萬陳於良田坡。李克用親冒矢石橫槊衝陣，沙陀黑騎如狂濤決堤，大齊軍大崩，斬首兩萬級。李克用自光泰門直入長安，黃巢焚宮闕倉皇東遁，大唐收復京師長安。',
    strategicSignificance: '推翻黃巢大齊政權，大唐朝廷得以還都長安；但李克用與朱溫兩大梟雄自此並起，拉開五代梁晉爭霸帷幕。',
    tactics: ['沙陀具裝重騎兵正面穿透衝擊', '黑甲心理震懾產生潰退骨牌效應'],
    svgRoute: 'M 438,318 L 433,319'
  },
  {
    id: 'bat_baixiang_911',
    name: '柏鄉之戰 (李存勗晉軍全殲後梁禁軍)',
    year: 911,
    yearDisplay: '西元 911 年',
    eraName: '後梁 開平五年 / 晉 天祐八年',
    eraDisplay: '後梁 開平五年 / 晉 天祐八年',
    shortDescription: '李存勗統沙陀鐵騎於野河大破朱溫龍驤神捷禁軍主力，斬首三萬，奠定代梁基業',
    locationAncient: '柏鄉野河（今河北邢台柏鄉）',
    locationName: '柏鄉野河（今河北邢台柏鄉）',
    locationModern: '河北省邢台市柏鄉縣野河兩岸',
    coords: [37.48, 114.72],
    importance: 'major',
    winner: 'fiveDynasties',
    victorStatement: '★ 晉王李存勗以弱勝強全殲朱溫五十州禁軍主力，梁晉攻守易勢',
    attacker: {
      factionName: '後梁朱溫南伐保鑾禁軍主力',
      name: '後梁朱溫南伐保鑾禁軍主力',
      faction: 'fiveDynasties',
      commanders: [
        { name: '王景仁 (後梁北面招討使)' },
        { name: '韓勍 (先鋒將領)' }
      ],
      forcesEstimate: '後梁精銳禁軍步騎約十萬人',
      troops: '後梁精銳禁軍步騎約十萬人',
      casualtiesEstimate: '斬首兩萬餘級，凍餒溺死萬餘人，龍驤神捷禁軍盡滅'
    },
    defender: {
      factionName: '晉王李存勗沙陀幽并聯軍',
      name: '晉王李存勗沙陀幽并聯軍',
      faction: 'fiveDynasties',
      commanders: [
        { name: '李存勗 (晉王·年二十六)', figureId: 'li_cunxu' },
        { name: '周德威 (行營馬步都總管·一代智將)' },
        { name: '李嗣源 (沙陀猛將)', figureId: 'li_siyuan' }
      ],
      forcesEstimate: '晉軍與趙軍步騎約三萬五千人',
      troops: '晉軍與趙軍步騎約三萬五千人',
      casualtiesEstimate: '傷亡千餘人'
    },
    summary: '後梁開平四年，朱溫遣王景仁統神捷、龍驤等禁軍精甲近十萬大舉北伐欲吞併趙國。二十六歲晉王李存勗馳援趙王王鎔。宿將周德威定策：「梁軍披重鎧涉遠而來，兵眾氣盛，不可速戰，當疲之。」晉軍誘梁軍至柏鄉野河列陣，自清晨相持至日昳，梁軍飢渴疲憊解甲飲水。存勗見機大呼：「梁軍倦矣，破敵此時！」引沙陀鐵騎橫貫梁軍中軍，周德威自側翼夾擊，梁軍大潰奔逃三十里，丟盔棄甲死者枕藉，後梁中原禁軍精華折損殆盡。',
    strategicSignificance: '五代十國前期最關鍵之戰役，徹底扭轉梁強晉弱態勢，朱溫聞敗發病慟哭：「我生諸子皆豚犬，李克用有兒如此，我無死所矣！」',
    tactics: ['避其銳氣持久消耗重裝步兵', '待其飢渴鬆懈發動毀滅性騎兵衝鋒'],
    svgRoute: 'M 465,265 L 467,270'
  },
  {
    id: 'bat_huliupo_918',
    name: '胡柳坡大決戰 (梁晉大決戰李存勗力挽狂瀾)',
    year: 918,
    yearDisplay: '西元 918 年',
    eraName: '後梁 貞明四年 / 晉 天祐十五年',
    eraDisplay: '後梁 貞明四年 / 晉 天祐十五年',
    shortDescription: '梁晉百萬大軍黃河血戰，老將周德威父子陣亡，李存勗登高督戰逆轉狂瀾斬梁軍三萬',
    locationAncient: '胡柳坡（今山東菏澤鄄城西南）',
    locationName: '胡柳坡（今山東菏澤鄄城西南）',
    locationModern: '山東省菏澤市鄄城縣胡柳坡一帶',
    coords: [35.58, 115.48],
    importance: 'epic',
    winner: 'fiveDynasties',
    victorStatement: '★ 李存勗登土山拔劍督戰死中求生，大破賀瑰梁軍主力',
    attacker: {
      factionName: '後梁北伐主力軍團',
      name: '後梁北伐主力軍團',
      faction: 'fiveDynasties',
      commanders: [
        { name: '賀瑰 (後梁招討使)' },
        { name: '謝彥珂 (騎將)' }
      ],
      forcesEstimate: '後梁大軍近十萬人',
      troops: '後梁大軍近十萬人',
      casualtiesEstimate: '戰死三萬人，後梁喪失北方野戰精銳'
    },
    defender: {
      factionName: '晉王李存勗主力軍團',
      name: '晉王李存勗主力軍團',
      faction: 'fiveDynasties',
      commanders: [
        { name: '李存勗 (晉王)', figureId: 'li_cunxu' },
        { name: '周德威 (前軍統帥，父子陣亡)' },
        { name: '李嗣源 (橫刀救主)', figureId: 'li_siyuan' }
      ],
      forcesEstimate: '晉軍步騎約七萬人',
      troops: '晉軍步騎約七萬人',
      casualtiesEstimate: '名將周德威父子陣亡，前軍損折兩萬人'
    },
    summary: '晉軍越黃河南進直逼汴梁。梁將賀瑰阻截於胡柳坡。交戰之初，晉輜重兵自驚潰亂，前鋒名將周德威父子陷入敵騎重圍力竭陣亡，晉軍前鋒大潰，流言晉王已死，全軍震駭。危急存亡之秋，李存勗引親兵登胡柳土山，據高臨下見賀瑰陣伍不整，拔劍厲聲大呼：「得坡者勝！今日不拚死破敵，吾儕骨肉盡喂梁狗矣！」引萬騎自高坡呼嘯俯衝，李嗣源引背水軍斷後衝殺，梁軍反為所懾大崩，斬梁軍三萬級，死傷遍野。',
    strategicSignificance: '五代史上最慘烈之血肉鏖戰，晉軍雖折大將周德威，但重創後梁國本，為五年後奔襲滅梁奠定勝局。',
    tactics: ['搶佔胡柳坡制高點重振軍心', '騎兵高坡俯衝衝擊敵紊亂中軍', '背水死戰以死求生逆轉敗局'],
    svgRoute: 'M 490,295 L 488,300'
  },
  {
    id: 'bat_shouchun_956',
    name: '壽春之戰 (周世宗柴榮親征下淮南十四州)',
    year: 956,
    yearDisplay: '西元 956 年',
    eraName: '後周 顯德三年',
    eraDisplay: '後周 顯德三年',
    shortDescription: '周世宗柴榮親征三攻壽州，水陸並進拔南唐淮南重鎮，奪取江北十四州六十縣',
    locationAncient: '壽州壽春（今安徽壽縣）',
    locationName: '壽州壽春（今安徽壽縣）',
    locationModern: '安徽省淮南市壽縣壽春鎮故城',
    coords: [32.58, 116.78],
    importance: 'epic',
    winner: 'fiveDynasties',
    victorStatement: '★ 後周世宗親征智克江淮第一堅城，南唐主李璟割淮南十四州稱臣',
    attacker: {
      factionName: '大周世宗皇帝親征水陸大軍',
      name: '大周世宗皇帝親征水陸大軍',
      faction: 'fiveDynasties',
      commanders: [
        { name: '柴榮 (周世宗·親自督戰)', figureId: 'chai_rong' },
        { name: '趙匡胤 (殿前都點檢·壽春先登)', figureId: 'zhao_kuangyin_young' },
        { name: '李重進 (淮南招討使)' }
      ],
      forcesEstimate: '後周步騎水軍十萬人',
      troops: '後周步騎水軍十萬人',
      casualtiesEstimate: '傷亡數千人，打造巨艦戰船百艘'
    },
    defender: {
      factionName: '南唐江淮保衛大軍',
      name: '南唐江淮保衛大軍',
      faction: 'cultural',
      commanders: [
        { name: '劉仁贍 (南唐節度使·死守不屈殉國)' },
        { name: '皇甫暉 (南唐神武統帥，被斬)' },
        { name: '李璟 (南唐中主，割地稱臣)' }
      ],
      forcesEstimate: '南唐水陸守軍約十五萬人',
      troops: '南唐水陸守軍約十五萬人',
      casualtiesEstimate: '劉仁贍病死，南唐精銳全滅，割淮南十四州納貢'
    },
    summary: '顯德三年春，周世宗柴榮為統一天下南征南唐。壽州地控淮淝，城堅濠深，南唐名將劉仁贍死守拒降。世民造浮橋鎖淮水，趙匡胤渦口斬南唐將何延錫，滁州生擒皇甫暉。柴榮三度親赴壽春前線督戰，引淮水環濠，巨砲晝夜轟擊。圍城年餘，城中食盡，劉仁贍臥病不起猶誓死不降，其副使開門迎降。柴榮深敬劉仁贍之忠烈，撫柩痛哭賜厚葬。南唐主李璟驚懼，盡割江北淮南十四州六十縣地，去帝號稱臣。',
    strategicSignificance: '徹底粉碎南唐跨江北進之企圖，大周盡得江淮魚米與鹽鐵之利，為北宋結束五代十國分裂奠定決定性版圖。',
    tactics: ['封鎖淮水航道隔絕南唐水師援軍', '造長圍巨壕長年困城', '天子親冒矢石極大振奮三軍士氣'],
    svgRoute: 'M 495,335 L 500,345'
  }
];

// Merge into battles
const existingBattleIds = new Set(currentBattles.map(b => b.id));
let added = 0;
for (const nb of NEW_BATTLES) {
  if (!existingBattleIds.has(nb.id)) {
    currentBattles.push(nb);
    existingBattleIds.add(nb.id);
    added++;
  }
}

// Sort by year
currentBattles.sort((a, b) => a.year - b.year);

console.log(`Added ${added} new battles! Total battles now: ${currentBattles.length}`);

// Write back to battles.js
const outputCode = '// Major Epic Battles for Sui, Tang and Five Dynasties (581 CE - 960 CE)\nexport const SUI_TANG_BATTLES = ' +
  JSON.stringify(currentBattles, null, 2) + ';\n';

fs.writeFileSync(battlesPath, outputCode, 'utf8');
console.log('battles.js updated successfully!');
