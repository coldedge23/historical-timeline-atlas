// One-off: split the Meiji era at 1912, add the 大正至昭和戰前 and 昭和戰後 eras,
// and add events, battles and figures from 1879 to 1989 in three batches.
// Usage: node scripts/add_japan_meiji_to_showa.mjs <meiji|prewar|postwar>
// Sources list only Wikisource pages whose text was fetched and keyword-checked.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'src/data/japan');
const batch = process.argv[2];

const ws = (title, page) => ({ title, url: `https://ja.wikisource.org/wiki/${page}` });
const TOKYO = [139.75, 35.68];

const ERA_TAISHO = {
  id: 'jp_taisho_prewar',
  name: '大正民主·昭和戰爭',
  dateRangeDisplay: '西元 1912 - 1945 年',
  shortEra: '大正至昭和戰前與戰爭時期',
  tagline: '政黨政治·軍部抬頭·太平洋戰爭',
  description: '明治天皇駕崩，改元大正。大正年間政黨內閣與男子普通選舉成形，同時制定《治安維持法》。昭和初年九一八事變後軍部勢力抬頭，五一五、二二六事件相繼發生；1937 年中日全面開戰，1941 年太平洋戰爭爆發，1945 年經東京大轟炸與廣島、長崎原子彈轟炸後接受《波茨坦宣言》投降。',
  keyEvents: [],
  highlightFigures: [],
};
const ERA_POSTWAR = {
  id: 'jp_showa_postwar',
  name: '戰後復興·昭和經濟成長',
  dateRangeDisplay: '西元 1945 - 1989 年',
  shortEra: '盟軍佔領至昭和結束',
  tagline: '和平憲法·高度成長·經濟大國',
  description: '盟軍總司令部（GHQ）佔領期間推動民主化改革，1947 年施行《日本國憲法》。1952 年《舊金山和約》生效恢復主權，此後歷經安保鬥爭與高度經濟成長，舉辦東京奧運與大阪萬博，1972 年沖繩返還。1989 年昭和天皇駕崩，昭和時代結束。',
  keyEvents: [],
  highlightFigures: [],
};

// ---------- Batch 1: Meiji gaps (1879-1911) ----------
const MEIJI_EVENTS = [
  {
    id: 'evt_jp_ryukyu_disposition_1879', year: 1879, yearDisplay: '西元 1879 年 (明治十二年)',
    title: '琉球處分：廢琉球藩設置沖繩縣',
    summary: '明治政府派員率軍警進入首里，廢除琉球藩改設沖繩縣，琉球國併入日本。',
    detail: '1872 年明治政府將琉球國改為琉球藩，以國王尚泰為藩王。1879 年處分官松田道之率軍警進入首里，命尚泰交出首里城並移居東京，隨即廢藩設置沖繩縣。清朝對此提出抗議，交涉未有結果。',
    locationNameAncient: '琉球國首里', locationNameModern: '沖繩縣那霸市首里', coordinates: [127.72, 26.22],
    tags: ['琉球處分', '沖繩縣', '尚泰', '廢藩置縣'],
  },
  {
    id: 'evt_jp_rescript_education_1890', year: 1890, yearDisplay: '西元 1890 年 (明治二十三年)',
    title: '頒布《教育敕語》',
    summary: '明治天皇頒布《教育ニ關スル勅語》，以忠君愛國與儒家德目作為學校教育的根本。',
    detail: '由井上毅、元田永孚起草，1890 年 10 月 30 日頒布。各地學校奉讀敕語，成為戰前修身教育的核心。1948 年眾議院與參議院分別決議排除及確認其失效。',
    locationNameAncient: '東京府東京市', locationNameModern: '東京都千代田區', coordinates: TOKYO,
    tags: ['教育敕語', '明治天皇', '修身教育'],
  },
  {
    id: 'evt_jp_anglo_japanese_alliance_1902', year: 1902, yearDisplay: '西元 1902 年 (明治三十五年)',
    title: '締結日英同盟',
    summary: '日本與英國在倫敦簽訂同盟協約，共同牽制俄國在東亞的擴張。',
    detail: '1902 年 1 月 30 日，駐英公使林董與英國外相蘭斯當侯爵在倫敦簽署。協約約定締約一方與他國交戰時另一方守中立，若有第三國加入對締約方作戰，另一方須參戰協助。同盟其後兩度修訂，1923 年隨《四國公約》生效而終止。',
    locationNameAncient: '英國倫敦', locationNameModern: '英國倫敦（地圖範圍外）',
    tags: ['日英同盟', '林董', '日俄戰爭'],
  },
  {
    id: 'evt_jp_russo_japanese_war_1904', year: 1904, yearDisplay: '西元 1904 年 (明治三十七年)',
    title: '日俄戰爭爆發',
    summary: '日俄兩國為爭奪朝鮮半島與中國東北的勢力範圍開戰。',
    detail: '1904 年 2 月 8 日，日本聯合艦隊夜襲旅順港的俄國艦隊，陸軍同時在仁川登陸，2 月 10 日兩國互相宣戰。戰場主要在中國東北與朝鮮半島：日軍攻下旅順、在奉天會戰擊退俄軍，1905 年 5 月在對馬海戰擊潰波羅的海艦隊。',
    locationNameAncient: '旅順港、仁川', locationNameModern: '中國遼寧省大連市旅順口區、韓國仁川（地圖範圍外）',
    tags: ['日俄戰爭', '旅順攻圍戰', '奉天會戰', '東鄉平八郎'],
  },
  {
    id: 'evt_jp_portsmouth_hibiya_1905', year: 1905, yearDisplay: '西元 1905 年 (明治三十八年)',
    title: '簽訂《樸資茅斯條約》與日比谷燒打事件',
    summary: '日俄在美國調停下議和，日本未獲賠款，東京民眾不滿而引發暴動。',
    detail: '1905 年 9 月 5 日，全權代表小村壽太郎與俄方維特在美國樸資茅斯簽約：俄國承認日本在韓國的優越地位，將旅順、大連租借權與長春以南鐵路讓與日本，並割讓庫頁島北緯 50 度以南。條約沒有賠款，同日東京日比谷公園的反對講和集會演變為暴動，焚燒派出所等設施，政府於翌日對東京實施戒嚴。',
    locationNameAncient: '東京府東京市日比谷公園', locationNameModern: '東京都千代田區日比谷公園', coordinates: [139.756, 35.674],
    tags: ['樸資茅斯條約', '小村壽太郎', '日比谷燒打事件', '日俄戰爭'],
  },
  {
    id: 'evt_jp_korea_annexation_1910', year: 1910, yearDisplay: '西元 1910 年 (明治四十三年)',
    title: '日本併吞韓國',
    summary: '日本與大韓帝國簽訂併合條約，朝鮮半島成為日本殖民地，直到 1945 年。',
    detail: '1905 年第二次日韓協約後，日本在漢城設置統監府並掌握大韓帝國外交權；1909 年前統監伊藤博文在哈爾濱遇刺。1910 年 8 月 22 日，統監寺內正毅與韓國總理大臣李完用簽署併合條約，8 月 29 日公布施行，改設朝鮮總督府，寺內正毅出任首任朝鮮總督。',
    locationNameAncient: '大韓帝國漢城', locationNameModern: '韓國首爾（地圖範圍外）',
    tags: ['韓國併合', '伊藤博文', '寺內正毅', '朝鮮總督府'],
  },
  {
    id: 'evt_jp_tariff_autonomy_1911', year: 1911, yearDisplay: '西元 1911 年 (明治四十四年)',
    title: '收回關稅自主權，完成條約改正',
    summary: '日本與美國簽訂新通商航海條約，收回關稅自主權，幕末以來的不平等條約全部改正。',
    detail: '幕末《安政五國條約》規定外國領事裁判權與協定關稅。1894 年外務大臣陸奧宗光與英國簽訂新通商航海條約，撤廢領事裁判權（1899 年施行）。1911 年外務大臣小村壽太郎主導交涉，2 月 21 日由駐美大使內田康哉在華盛頓簽訂新《日美通商航海條約》，隨後與各國陸續換約，日本取得完整的關稅自主權。',
    locationNameAncient: '美國華盛頓', locationNameModern: '美國華盛頓（地圖範圍外）',
    tags: ['條約改正', '小村壽太郎', '陸奧宗光', '關稅自主權'],
  },
];

const battle = (b) => ({
  ...b,
  period: 'japanAtlas',
  parties: {
    invader: `${b.attacker.factionName} (${b.attacker.forcesEstimate})`,
    defender: `${b.defender.factionName} (${b.defender.forcesEstimate})`,
  },
  keyStrategies: b.tactics,
});

const MEIJI_BATTLES = [
  battle({
    id: 'bat_jp_port_arthur_1904', name: '旅順攻圍戰 (第三軍圍攻俄國旅順要塞)', year: 1904,
    locationAncient: '清國盛京省旅順口（俄國租借地）', locationModern: '中國遼寧省大連市旅順口區（地圖範圍外）',
    summary: '日俄戰爭中，乃木希典率第三軍圍攻俄國旅順要塞，經多次總攻擊，俄軍於 1905 年 1 月初開城投降。',
    attacker: {
      factionName: '大日本帝國陸軍第三軍', faction: 'meiji_modern',
      commanders: [{ name: '乃木希典', title: '第三軍司令官' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認（傷亡慘重，各方統計不一）',
    },
    defender: {
      factionName: '俄羅斯帝國旅順守軍', faction: 'russia',
      commanders: [{ name: '斯特塞爾', title: '旅順守軍指揮官' }, { name: '康德拉堅科', title: '陸上防禦指揮官，1904 年 12 月陣亡' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認',
    },
    victor: 'attacker',
    victorStatement: '日軍攻占二〇三高地後砲擊港內艦隊，俄軍於 1905 年 1 月初投降',
    tactics: [
      '日軍：對要塞正面多次總攻擊，傷亡慘重後改以坑道作業與二十八公分榴彈砲推進',
      '日軍：1904 年 12 月攻占二〇三高地，觀測並砲擊港內俄國艦隊',
      '俄軍：依託永久堡壘、機槍與鐵絲網防守',
    ],
    strategicOutcome: '俄國太平洋艦隊在港內覆滅，第三軍北上投入奉天會戰。',
    significance: '顯示近代要塞戰中機槍與砲火造成的巨大傷亡；乃木希典的指揮在當時與後世評價分歧。',
    eraId: 'jp_meiji_modern',
  }),
  battle({
    id: 'bat_jp_mukden_1905', name: '奉天會戰 (日俄戰爭最後的大規模陸戰)', year: 1905,
    locationAncient: '清國盛京省奉天', locationModern: '中國遼寧省瀋陽市（地圖範圍外）',
    summary: '1905 年 2 月下旬至 3 月 10 日，日本滿洲軍與俄軍在奉天一帶會戰，日軍占領奉天，俄軍向北撤退。',
    attacker: {
      factionName: '大日本帝國滿洲軍', faction: 'meiji_modern',
      commanders: [{ name: '大山巖', title: '滿洲軍總司令官' }, { name: '兒玉源太郎', title: '滿洲軍總參謀長' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認',
    },
    defender: {
      factionName: '俄羅斯帝國滿洲軍', faction: 'russia',
      commanders: [{ name: '庫羅帕特金', title: '總司令官' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認',
    },
    victor: 'attacker',
    victorStatement: '日軍於 3 月 10 日占領奉天，但未能殲滅北撤的俄軍主力',
    tactics: [
      '日軍：以第三軍自西側迂迴，威脅俄軍右翼與後方',
      '俄軍：判斷側背受威脅後放棄奉天向北撤退',
    ],
    strategicOutcome: '日軍兵力與彈藥已近極限，無力繼續追擊，日本轉而尋求議和。',
    significance: '日本此後以 3 月 10 日為陸軍紀念日；戰爭最終由對馬海戰與美國調停促成講和。',
    eraId: 'jp_meiji_modern',
  }),
];

const fig = (f) => ({ avatar: `./images/figures/${f.id}.svg`, ...f });

const MEIJI_FIGURES = [
  fig({
    id: 'fig_jp_meiji_emperor', name: '明治天皇', courtesyName: '睦仁', lifeSpan: '1852 - 1912', faction: 'meiji_modern',
    clanTag: '皇室', emblemChar: '明', mainColor: '#eab308', bgColor: '#422006',
    role: '第 122 代天皇', roleType: 'ruler', importance: 5, hometown: '山城國京都 (今京都府京都市)',
    shortBio: '孝明天皇之子。1867 年踐祚，翌年頒布《五條御誓文》並改元明治，移居東京。在位期間經歷廢藩置縣、《大日本帝國憲法》頒布、甲午戰爭與日俄戰爭。1912 年 7 月 30 日崩，乃木希典於大喪當日殉死。',
    historicalSignificance: '在位期間日本由幕藩體制轉為近代立憲國家。',
  }),
  fig({
    id: 'fig_jp_nogi_maresuke', name: '乃木希典', lifeSpan: '1849 - 1912', faction: 'meiji_modern',
    clanTag: '帝國陸軍', emblemChar: '乃', mainColor: '#94a3b8', bgColor: '#0f172a',
    role: '陸軍大將 / 日俄戰爭第三軍司令官', roleType: 'general', importance: 4, hometown: '江戶長州藩邸 (今東京都港區)',
    shortBio: '長州藩士出身。西南戰爭時所屬聯隊的軍旗被薩摩軍奪走，引以為終身之恥。甲午戰爭後曾任第三任臺灣總督。日俄戰爭任第三軍司令官圍攻旅順，兩個兒子皆戰死。戰後任學習院院長，1912 年明治天皇大喪當日與妻子靜子一同自盡。',
    historicalSignificance: '旅順攻圍戰的指揮在當時與後世評價分歧；其殉死在大正初年引起廣泛討論。',
  }),
  fig({
    id: 'fig_jp_katsura_taro', name: '桂太郎', lifeSpan: '1848 - 1913', faction: 'meiji_modern',
    clanTag: '長州閥', emblemChar: '桂', mainColor: '#38bdf8', bgColor: '#082f49',
    role: '內閣總理大臣（三度組閣）', roleType: 'ruler', importance: 4, hometown: '長門國萩 (今山口縣萩市)',
    shortBio: '長州藩士出身，留學德國研究兵制，曾任第二任臺灣總督。1901 年起三度出任首相，任內締結日英同盟、進行日俄戰爭並併吞韓國，與西園寺公望交替執政，史稱「桂園時代」。1913 年第三次內閣在護憲運動中約兩個月即總辭，同年病逝。',
    historicalSignificance: '明治後期長州閥與官僚勢力的代表人物，累計在任時間長期為歷任首相之最。',
  }),
  fig({
    id: 'fig_jp_mori_ogai', name: '森鷗外', courtesyName: '本名森林太郎', lifeSpan: '1862 - 1922', faction: 'meiji_modern',
    clanTag: '明治文壇', emblemChar: '鷗', mainColor: '#c084fc', bgColor: '#2e1065',
    role: '小說家、翻譯家 / 陸軍軍醫總監', roleType: 'cultural', importance: 3, hometown: '石見國津和野 (今島根縣津和野町)',
    shortBio: '津和野藩醫之子，東京大學醫學部畢業後任陸軍軍醫，留學德國四年。發表《舞姬》等小說，並翻譯歌德《浮士德》，官至陸軍軍醫總監。晚年轉寫《阿部一族》等歷史小說與史傳。',
    historicalSignificance: '與夏目漱石並稱明治文壇兩大家。',
  }),
  fig({
    id: 'fig_jp_kitasato_shibasaburo', name: '北里柴三郎', lifeSpan: '1853 - 1931', faction: 'meiji_modern',
    clanTag: '近代醫學', emblemChar: '醫', mainColor: '#34d399', bgColor: '#022c22',
    role: '細菌學家 / 北里研究所創立者', roleType: 'scholar', importance: 3, hometown: '肥後國小國鄉 (今熊本縣小國町)',
    shortBio: '留學德國師事科赫，1889 年成功純粹培養破傷風菌，翌年與貝林發表破傷風與白喉的血清療法。回國後在福澤諭吉協助下設立傳染病研究所。1894 年在香港調查鼠疫時發現鼠疫桿菌。1914 年創立北里研究所。',
    historicalSignificance: '日本近代醫學與傳染病研究的奠基者之一。',
  }),
  fig({
    id: 'fig_jp_tsuda_umeko', name: '津田梅子', lifeSpan: '1864 - 1929', faction: 'meiji_modern',
    clanTag: '女子教育', emblemChar: '梅', mainColor: '#f472b6', bgColor: '#500724',
    role: '教育家 / 女子英學塾創立者', roleType: 'scholar', importance: 3, hometown: '江戶牛込 (今東京都新宿區)',
    shortBio: '1871 年以六歲之齡隨岩倉使節團赴美留學，是日本最早的女子留學生之一，1882 年回國。後再度赴美就讀布林茅爾學院。1900 年在東京創立女子英學塾（今津田塾大學）。',
    historicalSignificance: '日本女子高等教育的先驅。',
  }),
  fig({
    id: 'fig_jp_natsume_soseki', name: '夏目漱石', courtesyName: '本名夏目金之助', lifeSpan: '1867 - 1916', faction: 'meiji_modern',
    clanTag: '明治文壇', emblemChar: '漱', mainColor: '#a78bfa', bgColor: '#2e1065',
    role: '小說家', roleType: 'cultural', importance: 4, hometown: '江戶牛込 (今東京都新宿區)',
    shortBio: '東京帝國大學英文科畢業，1900 年赴英國留學。1905 年發表《我是貓》成名，1907 年辭去大學教職進入朝日新聞社專職寫作，著有《少爺》《三四郎》《心》等。1916 年病逝。',
    historicalSignificance: '日本近代文學的代表作家。',
  }),
];

// ---------- Batch 2: 大正至昭和戰前 (1912-1945) ----------
const PREWAR_EVENTS = [
  {
    id: 'evt_jp_taisho_begins_1912', year: 1912, yearDisplay: '西元 1912 年 (明治四十五年／大正元年)',
    title: '明治天皇駕崩，改元大正',
    summary: '明治天皇於 7 月 30 日駕崩，皇太子嘉仁即位，改元大正。',
    detail: '明治天皇崩後，皇太子嘉仁踐祚，同日改元大正。9 月 13 日大喪當日，陸軍大將乃木希典與妻子靜子自盡殉死。同年底第二次西園寺內閣因陸軍大臣辭職而倒台，第三次桂內閣成立，引發第一次護憲運動。',
    locationNameAncient: '東京府東京市', locationNameModern: '東京都千代田區', coordinates: TOKYO,
    tags: ['明治天皇', '大正天皇', '乃木希典', '桂太郎'],
  },
  {
    id: 'evt_jp_wwi_entry_1914', year: 1914, yearDisplay: '西元 1914 年 (大正三年)',
    title: '對德宣戰，參加第一次世界大戰',
    summary: '日本以日英同盟為由對德國宣戰，攻占德國在中國山東的租借地青島與南洋群島。',
    detail: '1914 年 8 月 23 日，大隈重信內閣對德國宣戰。日軍同年 11 月攻陷青島，並占領赤道以北的德屬南洋群島。大戰期間歐洲商品退出亞洲市場，日本出口與工業快速成長，形成「大戰景氣」。',
    locationNameAncient: '東京府東京市', locationNameModern: '東京都千代田區', coordinates: TOKYO,
    tags: ['第一次世界大戰', '大隈重信', '日英同盟', '青島'],
  },
  {
    id: 'evt_jp_twenty_one_demands_1915', year: 1915, yearDisplay: '西元 1915 年 (大正四年)',
    title: '向中華民國提出二十一條要求',
    summary: '大隈內閣向袁世凱政府提出二十一條要求，以最後通牒迫使中方接受大部分條款。',
    detail: '1915 年 1 月 18 日，駐華公使日置益向袁世凱提出要求，內容包括繼承德國在山東的權益、延長旅順大連租借期限等。5 月 7 日日本發出最後通牒，5 月 9 日中方接受修正後的大部分條款，中國各地掀起抵制日貨運動。',
    locationNameAncient: '中華民國北京', locationNameModern: '中國北京市（地圖範圍外）',
    tags: ['二十一條要求', '大隈重信', '袁世凱'],
  },
  {
    id: 'evt_jp_rice_riots_hara_1918', year: 1918, yearDisplay: '西元 1918 年 (大正七年)',
    title: '米騷動與原敬政黨內閣成立',
    summary: '米價暴漲引發全國性的米騷動，寺內內閣倒台，原敬組成日本首個正式的政黨內閣。',
    detail: '1918 年因出兵西伯利亞的預期與囤積，米價急漲。7 月富山縣漁村婦女反對米穀外運，風潮迅速擴及全國，政府出動軍隊鎮壓。寺內正毅內閣於 9 月總辭，立憲政友會總裁原敬組閣，除陸、海軍大臣與外務大臣外，閣員均為政友會員。',
    locationNameAncient: '富山縣下新川郡', locationNameModern: '富山縣魚津市一帶', coordinates: [137.41, 36.83],
    tags: ['米騷動', '原敬', '政黨內閣', '大正民主'],
  },
  {
    id: 'evt_jp_great_kanto_earthquake_1923', year: 1923, yearDisplay: '西元 1923 年 (大正十二年)',
    title: '關東大地震',
    summary: '9 月 1 日正午前，相模灣一帶發生大地震，東京與橫濱因火災嚴重受創。',
    detail: '地震發生在午餐炊事時間，東京、橫濱多處同時起火並延燒數日，死者與失蹤者超過十萬人。震災後的混亂中流言四起，大量朝鮮人與部分中國人遭軍警與自警團殺害；無政府主義者大杉榮等人亦被憲兵殺害（甘粕事件）。',
    locationNameAncient: '東京府東京市、神奈川縣橫濱市', locationNameModern: '東京都、神奈川縣橫濱市', coordinates: [139.77, 35.69],
    tags: ['關東大地震', '帝都復興', '甘粕事件'],
  },
  {
    id: 'evt_jp_universal_suffrage_1925', year: 1925, yearDisplay: '西元 1925 年 (大正十四年)',
    title: '男子普通選舉法與《治安維持法》',
    summary: '加藤高明內閣廢除選舉權的納稅限制，同年制定取締否定國體與私有財產制結社的《治安維持法》。',
    detail: '1925 年 4 月公布《治安維持法》，5 月公布修正《眾議院議員選舉法》，年滿 25 歲男子不論納稅額均有選舉權。1928 年第一次普通選舉舉行，同年《治安維持法》最高刑改為死刑，並大規模檢舉共產黨人（三一五事件）。',
    locationNameAncient: '東京府東京市', locationNameModern: '東京都千代田區', coordinates: TOKYO,
    tags: ['普通選舉', '治安維持法', '加藤高明', '大正民主'],
  },
  {
    id: 'evt_jp_showa_begins_1926', year: 1926, yearDisplay: '西元 1926 年 (大正十五年／昭和元年)',
    title: '大正天皇駕崩，改元昭和',
    summary: '大正天皇於 12 月 25 日在葉山御用邸駕崩，攝政裕仁即位，改元昭和。',
    detail: '大正天皇自幼體弱，1921 年起由皇太子裕仁擔任攝政。1926 年 12 月 25 日大正天皇崩，裕仁即位並改元昭和。翌年發生昭和金融恐慌，1929 年世界經濟大恐慌波及日本。',
    locationNameAncient: '神奈川縣三浦郡葉山', locationNameModern: '神奈川縣葉山町', coordinates: [139.58, 35.27],
    tags: ['大正天皇', '昭和天皇', '昭和金融恐慌'],
  },
  {
    id: 'evt_jp_mukden_incident_1931', year: 1931, yearDisplay: '西元 1931 年 (昭和六年)',
    title: '九一八事變（滿洲事變）',
    summary: '關東軍炸毀奉天郊外柳條湖的南滿鐵路，嫁禍中國軍隊並出兵佔領中國東北。',
    detail: '1931 年 9 月 18 日夜，關東軍參謀石原莞爾、板垣征四郎等人策劃炸毀柳條湖附近鐵路，以此為由攻擊北大營與奉天城。若槻禮次郎內閣宣布不擴大方針，但關東軍持續推進，數月內佔領東北主要地區。',
    locationNameAncient: '中華民國奉天柳條湖', locationNameModern: '中國遼寧省瀋陽市（地圖範圍外）',
    tags: ['九一八事變', '石原莞爾', '關東軍', '滿洲國'],
  },
  {
    id: 'evt_jp_manchukuo_515_1932', year: 1932, yearDisplay: '西元 1932 年 (昭和七年)',
    title: '滿洲國成立與五一五事件',
    summary: '3 月關東軍扶植滿洲國成立；5 月 15 日海軍青年軍官闖入首相官邸槍殺首相犬養毅。',
    detail: '1932 年 3 月 1 日滿洲國宣布成立，以清朝末代皇帝溥儀為執政。5 月 15 日，海軍青年軍官與陸軍士官候補生襲擊首相官邸等處，犬養毅遇害。事件後由海軍大將齋藤實組成舉國一致內閣，政黨內閣時代就此結束；同年 9 月日本承認滿洲國。',
    locationNameAncient: '東京府東京市麴町區首相官邸', locationNameModern: '東京都千代田區永田町', coordinates: [139.743, 35.673],
    tags: ['五一五事件', '犬養毅', '滿洲國', '溥儀'],
  },
  {
    id: 'evt_jp_league_withdrawal_1933', year: 1933, yearDisplay: '西元 1933 年 (昭和八年)',
    title: '退出國際聯盟',
    summary: '國際聯盟大會通過不承認滿洲國的報告，日本代表松岡洋右退席，日本隨後通告退出。',
    detail: '國際聯盟依李頓調查團報告，於 1933 年 2 月 24 日以 42 票對 1 票通過勸告書，認定日本在東北的軍事行動不屬自衛。首席代表松岡洋右當場退席，3 月 27 日日本正式通告退出國際聯盟，並發布退出詔書。',
    locationNameAncient: '東京府東京市', locationNameModern: '東京都千代田區', coordinates: TOKYO,
    tags: ['國際聯盟', '松岡洋右', '李頓調查團', '滿洲國'],
  },
  {
    id: 'evt_jp_february_26_incident_1936', year: 1936, yearDisplay: '西元 1936 年 (昭和十一年)',
    title: '二二六事件',
    summary: '陸軍皇道派青年軍官率約一千四百名士兵起事，殺害大藏大臣高橋是清等人，佔領東京中樞。',
    detail: '2 月 26 日清晨，起事部隊襲擊首相官邸與多位重臣住宅，內大臣齋藤實、大藏大臣高橋是清、教育總監渡邊錠太郎遇害，首相岡田啟介倖免。昭和天皇嚴令鎮壓，起事部隊於 29 日歸順，主謀軍官多被判處死刑。事件後陸軍統制派主導軍部，軍方對政治的影響力進一步擴大。',
    locationNameAncient: '東京府東京市麴町區永田町', locationNameModern: '東京都千代田區永田町', coordinates: [139.743, 35.673],
    tags: ['二二六事件', '高橋是清', '昭和天皇', '皇道派'],
  },
  {
    id: 'evt_jp_second_sino_japanese_war_1937', year: 1937, yearDisplay: '西元 1937 年 (昭和十二年)',
    title: '盧溝橋事變，中日全面開戰',
    summary: '7 月 7 日北平郊外盧溝橋發生衝突，戰事擴大為中日全面戰爭。',
    detail: '第一次近衛文麿內閣先宣布不擴大方針，隨後增派兵力；8 月戰火延燒至上海。日軍於 12 月攻陷國民政府首都南京，佔領期間發生大量殺害俘虜與平民的南京大屠殺，死亡人數各方說法差距很大。1938 年 1 月近衛內閣發表「不以國民政府為對手」聲明，戰爭轉為長期化。',
    locationNameAncient: '中華民國北平盧溝橋', locationNameModern: '中國北京市豐臺區（地圖範圍外）',
    tags: ['盧溝橋事變', '近衛文麿', '南京大屠殺', '中日戰爭'],
  },
  {
    id: 'evt_jp_national_mobilization_1938', year: 1938, yearDisplay: '西元 1938 年 (昭和十三年)',
    title: '公布《國家總動員法》',
    summary: '近衛內閣制定國家總動員法，政府可不經議會以敕令統制人力、物資與經濟活動。',
    detail: '1938 年 4 月 1 日公布，5 月施行。依此法陸續發布國民徵用令、價格統制令等敕令，國民生活與產業全面納入戰時統制。1940 年各政黨解散並組成大政翼贊會。',
    locationNameAncient: '東京府東京市', locationNameModern: '東京都千代田區', coordinates: TOKYO,
    tags: ['國家總動員法', '近衛文麿', '大政翼贊會'],
  },
  {
    id: 'evt_jp_tripartite_pact_1940', year: 1940, yearDisplay: '西元 1940 年 (昭和十五年)',
    title: '簽訂德義日三國同盟',
    summary: '日本與德國、義大利在柏林簽訂三國條約，與英美的對立加深。',
    detail: '1940 年 9 月 27 日，第二次近衛內閣外務大臣松岡洋右主導，由駐德大使來栖三郎在柏林簽署。同月日軍進駐法屬印度支那北部，美國隨後擴大對日禁運。',
    locationNameAncient: '德國柏林', locationNameModern: '德國柏林（地圖範圍外）',
    tags: ['三國同盟', '近衛文麿', '松岡洋右'],
  },
  {
    id: 'evt_jp_pacific_war_1941', year: 1941, yearDisplay: '西元 1941 年 (昭和十六年)',
    title: '偷襲珍珠港，太平洋戰爭爆發',
    summary: '12 月 8 日（日本時間）日本海軍空襲夏威夷珍珠港，陸軍同時登陸馬來半島，日本對美英宣戰。',
    detail: '日美交涉因美方要求日軍撤出中國與印度支那而破局。東條英機內閣於 12 月 1 日御前會議決定開戰。12 月 8 日，聯合艦隊機動部隊空襲珍珠港，陸軍登陸馬來半島，同日發布對美英宣戰詔書。',
    locationNameAncient: '夏威夷歐胡島珍珠港', locationNameModern: '美國夏威夷州（地圖範圍外）',
    tags: ['太平洋戰爭', '珍珠港', '東條英機', '山本五十六'],
  },
  {
    id: 'evt_jp_fall_of_singapore_1942', year: 1942, yearDisplay: '西元 1942 年 (昭和十七年)',
    title: '新加坡陷落',
    summary: '日軍攻陷英國在東南亞的據點新加坡，英軍投降。',
    detail: '第二十五軍司令官山下奉文率軍沿馬來半島南下，1942 年 2 月 15 日英軍司令白思華投降，新加坡改稱昭南島。日軍隨後在當地對華人進行肅清屠殺。開戰半年內日本佔領東南亞與西太平洋廣大地區，至 6 月中途島海戰後攻勢受挫。',
    locationNameAncient: '英屬海峽殖民地新加坡', locationNameModern: '新加坡（地圖範圍外）',
    tags: ['新加坡', '山下奉文', '太平洋戰爭', '中途島'],
  },
  {
    id: 'evt_jp_saipan_tojo_resigns_1944', year: 1944, yearDisplay: '西元 1944 年 (昭和十九年)',
    title: '塞班島失守，東條內閣總辭',
    summary: '美軍攻佔塞班島，日本本土進入 B-29 轟炸機的航程範圍，東條英機內閣隨即總辭。',
    detail: '1944 年 6 月美軍登陸塞班島，日本守軍於 7 月上旬覆滅，大量日本平民亦在島上死亡。同時期的馬里亞納海戰中日本海軍航空戰力大幅折損。7 月 18 日東條內閣總辭，由小磯國昭繼任。美軍隨後以馬里亞納群島為基地轟炸日本本土。',
    locationNameAncient: '東京府東京市', locationNameModern: '東京都千代田區', coordinates: TOKYO,
    tags: ['塞班島', '東條英機', '馬里亞納海戰'],
  },
  {
    id: 'evt_jp_first_kamikaze_1944', year: 1944, yearDisplay: '西元 1944 年 (昭和十九年)',
    title: '神風特別攻擊隊首次出擊',
    summary: '雷伊泰灣海戰期間，海軍神風特別攻擊隊首次以戰機衝撞美軍艦艇。',
    detail: '1944 年 10 月，第一航空艦隊司令長官大西瀧治郎在菲律賓編組特別攻擊隊。10 月 25 日關行男率領的敷島隊衝撞美軍護航航艦，此後特攻成為日軍常用戰法，至戰爭結束有數千人戰死。',
    locationNameAncient: '菲律賓雷伊泰灣外海', locationNameModern: '菲律賓雷伊泰灣（地圖範圍外）',
    tags: ['神風特攻', '雷伊泰灣海戰', '大西瀧治郎'],
  },
  {
    id: 'evt_jp_tokyo_air_raid_1945', year: 1945, yearDisplay: '西元 1945 年 (昭和二十年)',
    title: '東京大轟炸',
    summary: '3 月 10 日凌晨，美軍 B-29 轟炸機對東京下町進行低空夜間燃燒彈轟炸，約十萬人罹難。',
    detail: '1945 年 3 月 9 日深夜至 10 日凌晨，約三百架 B-29 對本所、深川、淺草等木造住宅密集地區投下燃燒彈，強風助長大火，一夜之間約十萬人死亡。此後美軍對名古屋、大阪等大城市及地方都市展開一連串燃燒彈轟炸。',
    locationNameAncient: '東京都本所區、深川區、淺草區', locationNameModern: '東京都墨田區、江東區、台東區', coordinates: [139.8, 35.7],
    tags: ['東京大轟炸', 'B-29', '太平洋戰爭'],
  },
  {
    id: 'evt_jp_hiroshima_1945', year: 1945, yearDisplay: '西元 1945 年 (昭和二十年)',
    title: '廣島原子彈轟炸',
    summary: '8 月 6 日上午 8 時 15 分，美軍在廣島市上空投下原子彈，這是人類首次在戰爭中使用核武。',
    detail: '原子彈在市中心上空爆炸，爆風、熱線與大火摧毀市區大部分建築，至 1945 年底死亡人數估計約十四萬人，倖存者此後長期受輻射傷害之苦。爆心附近的廣島縣產業獎勵館殘骸保存至今，稱為原爆圓頂館。',
    locationNameAncient: '廣島縣廣島市', locationNameModern: '廣島縣廣島市中區', coordinates: [132.45, 34.39],
    tags: ['廣島原子彈', '原爆圓頂館', '太平洋戰爭'],
  },
  {
    id: 'evt_jp_nagasaki_soviet_1945', year: 1945, yearDisplay: '西元 1945 年 (昭和二十年)',
    title: '長崎原子彈轟炸與蘇聯對日參戰',
    summary: '8 月 9 日美軍在長崎投下第二顆原子彈；同日蘇聯依前一日的宣戰攻入滿洲。',
    detail: '8 月 9 日上午 11 時 2 分，原子彈在長崎市浦上地區上空爆炸，至 1945 年底死亡人數估計約七萬人。蘇聯於 8 月 8 日對日宣戰，9 日凌晨出兵滿洲、朝鮮北部與庫頁島南部。當晚至 10 日凌晨的御前會議上，昭和天皇表示接受《波茨坦宣言》。',
    locationNameAncient: '長崎縣長崎市浦上', locationNameModern: '長崎縣長崎市', coordinates: [129.87, 32.77],
    tags: ['長崎原子彈', '蘇聯對日宣戰', '昭和天皇', '波茨坦宣言'],
  },
  {
    id: 'evt_jp_gyokuon_broadcast_1945', year: 1945, yearDisplay: '西元 1945 年 (昭和二十年)',
    title: '玉音放送：昭和天皇宣布接受《波茨坦宣言》',
    summary: '8 月 15 日正午，廣播播出昭和天皇宣讀終戰詔書的錄音，日本國民得知戰敗。',
    detail: '8 月 14 日御前會議決定接受《波茨坦宣言》並通知同盟國，天皇當晚錄製終戰詔書。陸軍部分青年軍官企圖奪取錄音盤以阻止廣播（宮城事件），未能成功。15 日正午播出後，鈴木貫太郎內閣總辭。',
    locationNameAncient: '東京都麴町區宮城', locationNameModern: '東京都千代田區皇居', coordinates: [139.7528, 35.6852],
    tags: ['玉音放送', '終戰詔書', '昭和天皇', '波茨坦宣言'],
  },
  {
    id: 'evt_jp_surrender_missouri_1945', year: 1945, yearDisplay: '西元 1945 年 (昭和二十年)',
    title: '密蘇里號上簽署降書',
    summary: '9 月 2 日日本代表在東京灣美艦密蘇里號上簽署降伏文書，第二次世界大戰結束。',
    detail: '日本政府代表外務大臣重光葵、大本營代表參謀總長梅津美治郎簽署降伏文書，同盟國由最高司令官麥克阿瑟及各國代表簽署。日本自此進入同盟國佔領時期。',
    locationNameAncient: '東京灣', locationNameModern: '東京灣（橫須賀外海）', coordinates: [139.75, 35.35],
    tags: ['降伏文書', '密蘇里號', '麥克阿瑟', '重光葵'],
  },
];

const PREWAR_BATTLES = [
  battle({
    id: 'bat_jp_pearl_harbor_1941', name: '珍珠港事件 (聯合艦隊空襲美國太平洋艦隊)', year: 1941,
    locationAncient: '夏威夷歐胡島珍珠港', locationModern: '美國夏威夷州（地圖範圍外）',
    summary: '1941 年 12 月 7 日（夏威夷時間），日本海軍機動部隊以航艦艦載機空襲珍珠港，美國隨即對日宣戰。',
    attacker: {
      factionName: '大日本帝國海軍機動部隊', faction: 'taisho_prewar',
      commanders: [{ name: '山本五十六', title: '聯合艦隊司令長官（作戰立案）' }, { name: '南雲忠一', title: '第一航空艦隊司令長官' }],
      forcesEstimate: '航艦 6 艘', casualtiesEstimate: '待確認',
    },
    defender: {
      factionName: '美國太平洋艦隊', faction: 'usa',
      commanders: [{ name: '金梅爾', title: '太平洋艦隊司令' }],
      forcesEstimate: '待確認', casualtiesEstimate: '美方死亡約 2,400 人，多艘戰艦沉沒或受損',
    },
    victor: 'attacker',
    victorStatement: '美國戰艦部隊遭重創，但航艦當日不在港內',
    tactics: [
      '日軍：機動部隊由千島群島擇捉島單冠灣出發，經北太平洋接近夏威夷',
      '日軍：分兩波以魚雷機、俯衝轟炸機與水平轟炸機攻擊港內艦艇與機場',
    ],
    strategicOutcome: '美國對日宣戰，德義隨後對美宣戰，太平洋戰爭全面展開。',
    significance: '攻擊未能擊中美軍航艦與港口設施，美國輿論轉為一致支持參戰。',
    eraId: 'jp_taisho_prewar',
  }),
  battle({
    id: 'bat_jp_midway_1942', name: '中途島海戰 (日本海軍航艦部隊重挫)', year: 1942,
    locationAncient: '中途島海域', locationModern: '北太平洋中途島（地圖範圍外）',
    summary: '1942 年 6 月，日本海軍企圖攻佔中途島並誘出美軍航艦，反遭美軍艦載機擊沉四艘航艦。',
    attacker: {
      factionName: '大日本帝國海軍聯合艦隊', faction: 'taisho_prewar',
      commanders: [{ name: '山本五十六', title: '聯合艦隊司令長官' }, { name: '南雲忠一', title: '第一航空艦隊司令長官' }],
      forcesEstimate: '待確認', casualtiesEstimate: '航艦赤城、加賀、蒼龍、飛龍沉沒',
    },
    defender: {
      factionName: '美國太平洋艦隊', faction: 'usa',
      commanders: [{ name: '尼米茲', title: '太平洋艦隊司令' }, { name: '史普魯恩斯', title: '第十六特遣艦隊司令' }, { name: '弗萊徹', title: '第十七特遣艦隊司令' }],
      forcesEstimate: '待確認', casualtiesEstimate: '航艦約克鎮號沉沒',
    },
    victor: 'defender',
    victorStatement: '美軍事先破譯日軍通訊，以艦載機擊沉日方四艘主力航艦',
    tactics: [
      '美軍：破譯日軍密碼，預先在中途島東北海域布署航艦',
      '日軍：攻擊中途島後換裝武器期間遭美軍俯衝轟炸機襲擊',
    ],
    strategicOutcome: '日本海軍喪失主力航艦與大批熟練飛行員，太平洋戰場主動權轉向美軍。',
    significance: '太平洋戰爭的轉捩點之一。',
    eraId: 'jp_taisho_prewar',
  }),
  battle({
    id: 'bat_jp_guadalcanal_1942', name: '瓜達康納爾島戰役 (南太平洋的消耗戰)', year: 1942,
    locationAncient: '英屬所羅門群島瓜達康納爾島', locationModern: '索羅門群島瓜達康納爾島（地圖範圍外）',
    summary: '1942 年 8 月美軍登陸瓜達康納爾島奪取日軍興建中的機場，雙方反覆爭奪半年，日軍於 1943 年 2 月撤出。',
    attacker: {
      factionName: '美國陸海軍與海軍陸戰隊', faction: 'usa',
      commanders: [{ name: '范德格里夫特', title: '第一陸戰師師長' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認',
    },
    defender: {
      factionName: '大日本帝國陸海軍', faction: 'taisho_prewar',
      commanders: [{ name: '百武晴吉', title: '第十七軍司令官' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認（大量官兵死於飢餓與疾病）',
    },
    victor: 'attacker',
    victorStatement: '日軍多次奪回機場的總攻擊失敗，1943 年 2 月撤離',
    tactics: [
      '日軍：以驅逐艦夜間運輸兵員與物資（「鼠輸送」），逐次投入兵力',
      '美軍：以島上機場的航空兵力掌握周邊制空權',
    ],
    strategicOutcome: '日軍在南太平洋轉入守勢，船艦與航空兵力持續消耗。',
    significance: '日軍首次在陸上大規模攻防中失利，大批官兵因補給斷絕而死於飢病。',
    eraId: 'jp_taisho_prewar',
  }),
  battle({
    id: 'bat_jp_leyte_gulf_1944', name: '雷伊泰灣海戰 (聯合艦隊最後的大規模出擊)', year: 1944,
    locationAncient: '菲律賓雷伊泰灣及周邊海域', locationModern: '菲律賓（地圖範圍外）',
    summary: '1944 年 10 月美軍登陸雷伊泰島，日本海軍出動殘存主力企圖突入雷伊泰灣，作戰失敗並損失大量艦艇。',
    attacker: {
      factionName: '大日本帝國海軍聯合艦隊', faction: 'taisho_prewar',
      commanders: [{ name: '栗田健男', title: '第二艦隊司令長官' }, { name: '小澤治三郎', title: '第三艦隊司令長官（誘敵部隊）' }, { name: '西村祥治', title: '第一游擊部隊第三部隊指揮官' }],
      forcesEstimate: '待確認', casualtiesEstimate: '戰艦武藏等多艘艦艇沉沒',
    },
    defender: {
      factionName: '美國第三艦隊、第七艦隊', faction: 'usa',
      commanders: [{ name: '海爾賽', title: '第三艦隊司令' }, { name: '金凱德', title: '第七艦隊司令' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認',
    },
    victor: 'defender',
    victorStatement: '日方以航艦部隊誘開美軍主力，但栗田艦隊在接近雷伊泰灣時反轉撤退',
    tactics: [
      '日軍：小澤艦隊以航艦為誘餌北上，吸引海爾賽第三艦隊',
      '日軍：栗田、西村艦隊分由南北兩路突入雷伊泰灣',
      '日軍：海軍首次出動神風特別攻擊隊',
    ],
    strategicOutcome: '日本海軍作為艦隊的作戰能力實質瓦解，美軍確保菲律賓。',
    significance: '史上規模最大的海戰之一；特攻戰法自此開始。',
    eraId: 'jp_taisho_prewar',
  }),
  battle({
    id: 'bat_jp_iwo_jima_1945', name: '硫磺島戰役 (守軍以坑道持久抵抗)', year: 1945,
    locationAncient: '東京府小笠原支廳硫黃島', locationModern: '東京都小笠原村硫黃島（地圖範圍外）',
    summary: '1945 年 2 月 19 日美軍登陸硫磺島，日本守軍依託坑道陣地抵抗一個多月，3 月下旬幾乎全滅。',
    attacker: {
      factionName: '美國海軍陸戰隊', faction: 'usa',
      commanders: [{ name: '霍蘭·史密斯', title: '遠征部隊指揮官' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認',
    },
    defender: {
      factionName: '大日本帝國小笠原兵團', faction: 'taisho_prewar',
      commanders: [{ name: '栗林忠道', title: '小笠原兵團長' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認（守軍幾乎全員戰死）',
    },
    victor: 'attacker',
    victorStatement: '美軍佔領硫磺島，作為 B-29 的緊急降落與護航戰鬥機基地',
    tactics: [
      '日軍：放棄水際防禦，構築地下坑道網進行持久戰',
      '美軍：以艦砲與航空轟炸支援逐步掃蕩洞窟陣地',
    ],
    strategicOutcome: '美軍取得轟炸日本本土的中繼基地。',
    significance: '美軍在太平洋戰場傷亡人數超過日軍的少數戰役之一。',
    eraId: 'jp_taisho_prewar',
  }),
  battle({
    id: 'bat_jp_okinawa_1945', name: '沖繩戰役 (美軍登陸沖繩本島的大規模地面戰)', year: 1945,
    locationAncient: '沖繩縣沖繩本島', locationModern: '沖繩縣沖繩本島', coordinates: [127.75, 26.3],
    summary: '1945 年 4 月 1 日美軍登陸沖繩本島，激戰近三個月，第三十二軍司令官牛島滿於 6 月下旬自盡，組織性抵抗結束。',
    attacker: {
      factionName: '美國第十軍', faction: 'usa',
      commanders: [{ name: '巴克納', title: '第十軍司令官，6 月 18 日陣亡' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認',
    },
    defender: {
      factionName: '大日本帝國第三十二軍', faction: 'taisho_prewar',
      commanders: [{ name: '牛島滿', title: '第三十二軍司令官' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認（含大量沖繩平民犧牲）',
    },
    victor: 'attacker',
    victorStatement: '美軍佔領沖繩，6 月 23 日被沖繩縣定為慰靈之日',
    tactics: [
      '日軍：以首里為中心構築坑道陣地持久抵抗，拖延美軍進攻本土',
      '日軍：同時以特攻機與戰艦大和號出擊攻擊美軍艦隊',
    ],
    strategicOutcome: '沖繩由美軍統治，直到 1972 年才返還日本。',
    significance: '大批沖繩居民在戰火中喪生，其中包括被迫「集團自決」者，戰爭記憶至今深刻影響沖繩社會。',
    eraId: 'jp_taisho_prewar',
  }),
];

const PREWAR_FIGURES = [
  fig({
    id: 'fig_jp_taisho_emperor', name: '大正天皇', courtesyName: '嘉仁', lifeSpan: '1879 - 1926', faction: 'taisho_prewar',
    clanTag: '皇室', emblemChar: '大', mainColor: '#eab308', bgColor: '#422006',
    role: '第 123 代天皇', roleType: 'ruler', importance: 3, hometown: '東京府東京 (今東京都)',
    shortBio: '明治天皇之子。1912 年即位，改元大正。自幼體弱，1921 年起由皇太子裕仁攝政。1926 年 12 月 25 日崩於葉山御用邸。',
    historicalSignificance: '在位期間政黨政治與都市大眾文化興起，常被稱為「大正民主」時期。',
  }),
  fig({
    id: 'fig_jp_showa_emperor', name: '昭和天皇', courtesyName: '裕仁', lifeSpan: '1901 - 1989', faction: 'taisho_prewar',
    clanTag: '皇室', emblemChar: '昭', mainColor: '#eab308', bgColor: '#422006',
    role: '第 124 代天皇', roleType: 'ruler', importance: 5, hometown: '東京府東京 (今東京都)',
    shortBio: '大正天皇長子，1921 年起攝政，1926 年即位並改元昭和。在位期間經歷九一八事變、中日戰爭與太平洋戰爭，1945 年 8 月 15 日以錄音廣播宣讀終戰詔書。戰後未被列為東京審判被告，1946 年元旦發布詔書否定天皇的神格，依《日本國憲法》成為國家與國民統合的象徵。1989 年 1 月 7 日崩。',
    historicalSignificance: '有確切紀錄以來在位最久的天皇；其戰爭責任至今仍有爭論。',
  }),
  fig({
    id: 'fig_jp_hara_takashi', name: '原敬', lifeSpan: '1856 - 1921', faction: 'taisho_prewar',
    clanTag: '立憲政友會', emblemChar: '原', mainColor: '#60a5fa', bgColor: '#172554',
    role: '內閣總理大臣 / 首個正式政黨內閣', roleType: 'ruler', importance: 4, hometown: '陸奧國盛岡 (今岩手縣盛岡市)',
    shortBio: '盛岡藩家老之孫，曾任新聞記者與外交官，後加入立憲政友會並任總裁。1918 年米騷動後組閣，除陸、海軍大臣與外務大臣外閣員均為政友會員，被視為日本第一個正式的政黨內閣；因未受爵位而被稱為「平民宰相」。1921 年在東京車站遇刺身亡。',
    historicalSignificance: '開啟大正至昭和初年的政黨內閣時代。',
  }),
  fig({
    id: 'fig_jp_inukai_tsuyoshi', name: '犬養毅', courtesyName: '號木堂', lifeSpan: '1855 - 1932', faction: 'taisho_prewar',
    clanTag: '護憲運動', emblemChar: '犬', mainColor: '#22d3ee', bgColor: '#083344',
    role: '內閣總理大臣 / 五一五事件中遇害', roleType: 'ruler', importance: 3, hometown: '備中國庭瀨 (今岡山縣岡山市)',
    shortBio: '慶應義塾出身，曾任新聞記者，1890 年第一屆眾議院選舉當選。大正初年與尾崎行雄同為第一次護憲運動的領袖，並稱「憲政之神」。1931 年組閣，1932 年 5 月 15 日在首相官邸遭海軍青年軍官槍殺。',
    historicalSignificance: '其遇害標誌戰前政黨內閣時代的結束。',
  }),
  fig({
    id: 'fig_jp_takahashi_korekiyo', name: '高橋是清', lifeSpan: '1854 - 1936', faction: 'taisho_prewar',
    clanTag: '財政家', emblemChar: '財', mainColor: '#facc15', bgColor: '#422006',
    role: '內閣總理大臣 / 多次出任大藏大臣', roleType: 'ruler', importance: 3, hometown: '江戶芝 (今東京都港區)',
    shortBio: '日俄戰爭期間赴歐美募集外債。1921 年原敬遇刺後繼任首相。多次出任大藏大臣，1927 年處理昭和金融恐慌；1931 年底再度禁止黃金出口並擴大財政支出，使日本較早脫離經濟大恐慌。後因壓縮軍費招致軍部不滿，1936 年在二二六事件中遇害。',
    historicalSignificance: '戰前日本最具代表性的財政家之一。',
  }),
  fig({
    id: 'fig_jp_noguchi_hideyo', name: '野口英世', lifeSpan: '1876 - 1928', faction: 'taisho_prewar',
    clanTag: '細菌學', emblemChar: '研', mainColor: '#34d399', bgColor: '#022c22',
    role: '細菌學家', roleType: 'scholar', importance: 3, hometown: '福島縣耶麻郡 (今福島縣豬苗代町)',
    shortBio: '幼時左手嚴重燒傷，經手術後立志學醫。曾在北里柴三郎主持的傳染病研究所任職，1900 年赴美，長年任職洛克斐勒醫學研究所，研究梅毒螺旋體等病原。1928 年在英屬黃金海岸（今迦納）研究黃熱病時染病身亡。',
    historicalSignificance: '近代日本知名的醫學研究者，部分研究成果後來被證實有誤。',
  }),
  fig({
    id: 'fig_jp_yosano_akiko', name: '與謝野晶子', lifeSpan: '1878 - 1942', faction: 'taisho_prewar',
    clanTag: '明星派', emblemChar: '歌', mainColor: '#f472b6', bgColor: '#500724',
    role: '歌人、作家', roleType: 'cultural', importance: 3, hometown: '大阪府堺 (今大阪府堺市)',
    shortBio: '1901 年出版歌集《亂髮》。1904 年日俄戰爭期間為從軍的弟弟發表長詩〈君死にたまふことなかれ〉。另以現代語翻譯《源氏物語》，參與創辦文化學院，關注女性教育與女性參政。',
    historicalSignificance: '明治至昭和初年的代表性女性文學家。',
  }),
  fig({
    id: 'fig_jp_konoe_fumimaro', name: '近衛文麿', lifeSpan: '1891 - 1945', faction: 'taisho_prewar',
    clanTag: '五攝家近衛家', emblemChar: '近', mainColor: '#a78bfa', bgColor: '#2e1065',
    role: '內閣總理大臣（三度組閣）', roleType: 'ruler', importance: 4, hometown: '東京府東京 (今東京都)',
    shortBio: '五攝家筆頭近衛家當主，曾任貴族院議長。1937 年 6 月首次組閣，一個月後盧溝橋事變爆發；翌年發表「不以國民政府為對手」聲明並制定《國家總動員法》。1940 年第二次組閣後推動大政翼贊會並締結三國同盟，1941 年 10 月總辭。戰後被列為戰犯嫌疑人，1945 年 12 月在出頭前服毒自盡。',
    historicalSignificance: '中日戰爭擴大與日本走向對美開戰時期的主要政治領導人。',
  }),
  fig({
    id: 'fig_jp_tojo_hideki', name: '東條英機', lifeSpan: '1884 - 1948', faction: 'taisho_prewar',
    clanTag: '帝國陸軍', emblemChar: '東', mainColor: '#94a3b8', bgColor: '#0f172a',
    role: '陸軍大將 / 太平洋戰爭開戰時的內閣總理大臣', roleType: 'ruler', importance: 4, hometown: '東京府東京 (今東京都)',
    shortBio: '曾任關東軍參謀長、陸軍大臣。1941 年 10 月組閣並兼任陸軍大臣，同年 12 月對美英開戰。1944 年 7 月塞班島失守後總辭。戰敗後自殺未遂，經遠東國際軍事法庭判處死刑，1948 年 12 月 23 日執行。',
    historicalSignificance: '太平洋戰爭開戰的決策者之一，東京審判的主要被告。',
  }),
  fig({
    id: 'fig_jp_yamamoto_isoroku', name: '山本五十六', lifeSpan: '1884 - 1943', faction: 'taisho_prewar',
    clanTag: '帝國海軍', emblemChar: '山', mainColor: '#38bdf8', bgColor: '#082f49',
    role: '聯合艦隊司令長官', roleType: 'general', importance: 4, hometown: '新潟縣古志郡長岡 (今新潟縣長岡市)',
    shortBio: '曾留學哈佛大學並任駐美武官。擔任海軍次官時反對締結三國同盟。1939 年出任聯合艦隊司令長官，主導偷襲珍珠港與中途島作戰。1943 年 4 月 18 日在所羅門群島布干維爾島上空，座機遭美軍戰機擊落身亡。',
    historicalSignificance: '推動以航艦航空兵力為中心的海軍作戰。',
  }),
  fig({
    id: 'fig_jp_ishiwara_kanji', name: '石原莞爾', lifeSpan: '1889 - 1949', faction: 'taisho_prewar',
    clanTag: '關東軍', emblemChar: '石', mainColor: '#94a3b8', bgColor: '#0f172a',
    role: '陸軍中將 / 九一八事變策劃者', roleType: 'general', importance: 3, hometown: '山形縣鶴岡 (今山形縣鶴岡市)',
    shortBio: '任關東軍作戰主任參謀時，與板垣征四郎策劃 1931 年九一八事變並佔領中國東北。後任參謀本部作戰部長，盧溝橋事變後主張不擴大戰線，與主戰派對立而被調離，1941 年編入預備役。戰後未被起訴。',
    historicalSignificance: '九一八事變的主要策劃者。',
  }),
];

// ---------- Batch 3: 昭和戰後 (1945-1989) ----------
const POSTWAR_EVENTS = [
  {
    id: 'evt_jp_allied_occupation_1945', year: 1945, yearDisplay: '西元 1945 年 (昭和二十年)',
    title: '盟軍佔領與民主化改革',
    summary: '聯合國軍最高司令官總司令部（GHQ）進駐東京，透過日本政府實施間接統治，佔領持續到 1952 年。',
    detail: '最高司令官麥克阿瑟於 1945 年 8 月 30 日抵達厚木，GHQ 設於東京日比谷的第一生命館。佔領期間推動解散財閥、農地改革、承認勞工權利、女性參政與教育改革，並解散軍隊、整肅戰爭協力者。',
    locationNameAncient: '東京都麴町區第一生命館', locationNameModern: '東京都千代田區有樂町', coordinates: [139.761, 35.676],
    tags: ['GHQ', '麥克阿瑟', '農地改革', '財閥解體'],
  },
  {
    id: 'evt_jp_tokyo_trial_1946', year: 1946, yearDisplay: '西元 1946 年 (昭和二十一年)',
    title: '遠東國際軍事法庭（東京審判）',
    summary: '同盟國在東京審判戰爭指導者，1948 年宣判東條英機等七人死刑。',
    detail: '1946 年 5 月 3 日開庭，設於市谷的原陸軍省廳舍，起訴甲級戰犯嫌疑人 28 名。1948 年 11 月 12 日宣判，25 名被告有罪，其中東條英機、廣田弘毅等 7 人處絞刑，同年 12 月 23 日執行。昭和天皇未被起訴。',
    locationNameAncient: '東京都牛込區市谷', locationNameModern: '東京都新宿區市谷', coordinates: [139.728, 35.692],
    tags: ['東京審判', '東條英機', '甲級戰犯'],
  },
  {
    id: 'evt_jp_constitution_1946', year: 1946, yearDisplay: '西元 1946 年 (昭和二十一年)',
    title: '公布《日本國憲法》',
    summary: '新憲法以國民主權、尊重基本人權與和平主義為原則，1947 年 5 月 3 日施行。',
    detail: '以 GHQ 提出的草案為基礎，經帝國議會修正通過，1946 年 11 月 3 日公布。天皇成為國家與國民統合的象徵，第九條規定放棄戰爭、不保持戰力。同年元旦昭和天皇已發布詔書否定天皇的神格。',
    locationNameAncient: '東京都麴町區', locationNameModern: '東京都千代田區', coordinates: TOKYO,
    tags: ['日本國憲法', '第九條', '昭和天皇', '吉田茂'],
  },
  {
    id: 'evt_jp_san_francisco_1951', year: 1951, yearDisplay: '西元 1951 年 (昭和二十六年)',
    title: '簽訂《舊金山和約》與《日美安保條約》',
    summary: '吉田茂在舊金山與 48 國簽訂和約，同日簽訂安保條約，美軍在日本繼續駐留。',
    detail: '1951 年 9 月 8 日簽署，蘇聯等國未簽字，中華民國與中華人民共和國均未受邀。和約於 1952 年 4 月 28 日生效，日本恢復主權；沖繩、奄美與小笠原群島仍由美國統治。',
    locationNameAncient: '美國舊金山', locationNameModern: '美國加州舊金山（地圖範圍外）',
    tags: ['舊金山和約', '日美安保條約', '吉田茂'],
  },
  {
    id: 'evt_jp_un_membership_1956', year: 1956, yearDisplay: '西元 1956 年 (昭和三十一年)',
    title: '《日蘇共同宣言》與加入聯合國',
    summary: '鳩山一郎赴莫斯科簽署共同宣言恢復日蘇邦交，蘇聯不再反對，日本於同年 12 月加入聯合國。',
    detail: '1956 年 10 月 19 日在莫斯科簽署，宣言結束兩國戰爭狀態，並約定締結和約後蘇聯將齒舞群島與色丹島交給日本，和約至今未締結。12 月 18 日聯合國大會通過日本入會。前一年自由黨與日本民主黨合併為自由民主黨，形成長期執政的「五五年體制」。',
    locationNameAncient: '蘇聯莫斯科', locationNameModern: '俄羅斯莫斯科（地圖範圍外）',
    tags: ['日蘇共同宣言', '鳩山一郎', '聯合國', '五五年體制'],
  },
  {
    id: 'evt_jp_anpo_protests_1960', year: 1960, yearDisplay: '西元 1960 年 (昭和三十五年)',
    title: '安保鬥爭與所得倍增計畫',
    summary: '岸信介內閣強行通過新安保條約引發大規模抗議，岸內閣總辭後池田勇人提出所得倍增計畫。',
    detail: '1960 年 1 月簽署新《日美安保條約》，5 月眾議院強行表決後，抗議群眾連日包圍國會，6 月 15 日東京大學學生樺美智子在衝突中死亡。條約於 6 月自然承認並生效，岸內閣隨後總辭。繼任的池田勇人以經濟成長為施政重心，12 月決定「國民所得倍增計畫」。',
    locationNameAncient: '東京都千代田區國會議事堂', locationNameModern: '東京都千代田區永田町', coordinates: [139.745, 35.676],
    tags: ['安保鬥爭', '岸信介', '池田勇人', '所得倍增計畫'],
  },
  {
    id: 'evt_jp_tokyo_olympics_1964', year: 1964, yearDisplay: '西元 1964 年 (昭和三十九年)',
    title: '東海道新幹線通車與東京奧運',
    summary: '10 月 1 日東海道新幹線通車，10 月 10 日東京奧運開幕，是亞洲首次舉辦的奧運。',
    detail: '新幹線連接東京與新大阪，為世界最早的高速鐵路。奧運籌備期間東京興建首都高速道路、單軌電車與多座競技場館。這段時期日本經濟年成長率長期維持在高水準，史稱「高度經濟成長」。',
    locationNameAncient: '東京都', locationNameModern: '東京都新宿區（國立競技場）', coordinates: [139.715, 35.678],
    tags: ['東京奧運', '新幹線', '高度經濟成長', '池田勇人'],
  },
  {
    id: 'evt_jp_expo70_1970', year: 1970, yearDisplay: '西元 1970 年 (昭和四十五年)',
    title: '大阪萬國博覽會',
    summary: '以「人類的進步與和諧」為主題，在大阪府吹田市千里丘陵舉行，是亞洲首次舉辦的世界博覽會。',
    detail: '會期自 3 月 15 日至 9 月 13 日，入場人數超過六千萬人次。會場的象徵「太陽之塔」由藝術家岡本太郎設計，保留至今。',
    locationNameAncient: '大阪府吹田市千里丘陵', locationNameModern: '大阪府吹田市萬博紀念公園', coordinates: [135.53, 34.81],
    tags: ['大阪萬博', '太陽之塔', '高度經濟成長'],
  },
  {
    id: 'evt_jp_okinawa_reversion_1972', year: 1972, yearDisplay: '西元 1972 年 (昭和四十七年)',
    title: '沖繩返還與中日建交',
    summary: '5 月 15 日沖繩施政權由美國返還日本；9 月田中角榮訪問北京，日本與中華人民共和國建交。',
    detail: '佐藤榮作內閣與美國談判，沖繩於 5 月 15 日回歸，但大部分美軍基地仍留在沖繩。9 月 29 日田中角榮與周恩來簽署《中日聯合聲明》，兩國建立外交關係，日本同時與中華民國斷交。',
    locationNameAncient: '沖繩縣那霸市', locationNameModern: '沖繩縣那霸市', coordinates: [127.68, 26.21],
    tags: ['沖繩返還', '佐藤榮作', '田中角榮', '中日聯合聲明'],
  },
  {
    id: 'evt_jp_oil_shock_1973', year: 1973, yearDisplay: '西元 1973 年 (昭和四十八年)',
    title: '第一次石油危機',
    summary: '第四次中東戰爭爆發後原油價格急漲，日本物價飆升，高度經濟成長期結束。',
    detail: '1973 年 10 月阿拉伯產油國實施減產並調漲原油價格。日本能源高度依賴進口石油，國內出現搶購衛生紙等民生用品的風潮，物價急漲被稱為「狂亂物價」。1974 年日本經濟出現戰後首次負成長，此後轉為穩定成長，並推動節約能源。',
    locationNameAncient: '東京都', locationNameModern: '東京都千代田區', coordinates: TOKYO,
    tags: ['石油危機', '田中角榮', '狂亂物價'],
  },
  {
    id: 'evt_jp_china_peace_treaty_1978', year: 1978, yearDisplay: '西元 1978 年 (昭和五十三年)',
    title: '簽訂《中日和平友好條約》',
    summary: '福田赳夫內閣與中華人民共和國簽訂和平友好條約，同年 10 月鄧小平訪日交換批准書。',
    detail: '1978 年 8 月 12 日由外務大臣園田直與中國外交部長黃華在北京簽署。條約確認以和平手段解決爭端，並寫入反對霸權的條款。',
    locationNameAncient: '中華人民共和國北京', locationNameModern: '中國北京市（地圖範圍外）',
    tags: ['中日和平友好條約', '福田赳夫', '鄧小平'],
  },
  {
    id: 'evt_jp_plaza_accord_1985', year: 1985, yearDisplay: '西元 1985 年 (昭和六十年)',
    title: '廣場協議與日圓升值',
    summary: '五國財長在紐約廣場飯店同意聯手促使美元貶值，日圓快速升值。',
    detail: '1985 年 9 月 22 日，美、日、西德、英、法五國財政部長與央行總裁達成協議。此後日圓大幅升值，日本銀行為因應升值造成的景氣衰退而降低利率，資金流入股市與不動產，形成泡沫經濟。',
    locationNameAncient: '美國紐約', locationNameModern: '美國紐約（地圖範圍外）',
    tags: ['廣場協議', '日圓升值', '泡沫經濟'],
  },
  {
    id: 'evt_jp_showa_ends_1989', year: 1989, yearDisplay: '西元 1989 年 (昭和六十四年／平成元年)',
    title: '昭和天皇駕崩，昭和時代結束',
    summary: '1 月 7 日昭和天皇駕崩，皇太子明仁即位，翌日改元平成。',
    detail: '昭和天皇在位六十二年餘，為有確切紀錄以來在位最久的天皇。官房長官小渕惠三於 1 月 7 日公布新年號「平成」，1 月 8 日起施行。',
    locationNameAncient: '東京都千代田區吹上御所', locationNameModern: '東京都千代田區皇居', coordinates: [139.7528, 35.6852],
    tags: ['昭和天皇', '平成', '改元'],
  },
];

const POSTWAR_FIGURES = [
  fig({
    id: 'fig_jp_yoshida_shigeru', name: '吉田茂', lifeSpan: '1878 - 1967', faction: 'showa_postwar',
    clanTag: '自由黨', emblemChar: '吉', mainColor: '#2dd4bf', bgColor: '#042f2e',
    role: '內閣總理大臣（五度組閣）', roleType: 'ruler', importance: 5, hometown: '東京府東京 (今東京都)',
    shortBio: '外交官出身，曾任駐英大使。戰爭末期因參與尋求和平的活動遭憲兵拘捕。1946 年至 1954 年間五度組閣，在佔領期間施行新憲法，1951 年簽署《舊金山和約》與《日美安保條約》，採取輕軍備、重經濟的路線。',
    historicalSignificance: '戰後日本外交與經濟優先路線的奠定者。',
  }),
  fig({
    id: 'fig_jp_hatoyama_ichiro', name: '鳩山一郎', lifeSpan: '1883 - 1959', faction: 'showa_postwar',
    clanTag: '日本民主黨', emblemChar: '鳩', mainColor: '#22d3ee', bgColor: '#083344',
    role: '內閣總理大臣 / 自由民主黨首任總裁', roleType: 'ruler', importance: 3, hometown: '東京府東京 (今東京都)',
    shortBio: '戰後組織日本自由黨，1946 年即將組閣時遭 GHQ 整肅。解除整肅後於 1954 年組閣，1955 年自由黨與日本民主黨合併成立自由民主黨。1956 年赴莫斯科簽署《日蘇共同宣言》，恢復日蘇邦交，同年日本加入聯合國。',
    historicalSignificance: '「五五年體制」成立時的首相。',
  }),
  fig({
    id: 'fig_jp_kishi_nobusuke', name: '岸信介', lifeSpan: '1896 - 1987', faction: 'showa_postwar',
    clanTag: '自由民主黨', emblemChar: '岸', mainColor: '#94a3b8', bgColor: '#0f172a',
    role: '內閣總理大臣 / 新安保條約簽署者', roleType: 'ruler', importance: 3, hometown: '山口縣 (今山口縣)',
    shortBio: '商工省官僚出身，曾參與滿洲國產業開發，東條內閣時任商工大臣。戰後以甲級戰犯嫌疑被拘禁，未被起訴而獲釋。1957 年組閣，1960 年簽署新《日美安保條約》，在大規模抗議中通過國會批准，條約生效後總辭。其弟佐藤榮作亦曾任首相。',
    historicalSignificance: '戰前官僚與戰後保守政治延續的代表人物。',
  }),
  fig({
    id: 'fig_jp_ikeda_hayato', name: '池田勇人', lifeSpan: '1899 - 1965', faction: 'showa_postwar',
    clanTag: '自由民主黨', emblemChar: '池', mainColor: '#4ade80', bgColor: '#052e16',
    role: '內閣總理大臣 / 所得倍增計畫', roleType: 'ruler', importance: 3, hometown: '廣島縣吉名村 (今廣島縣竹原市)',
    shortBio: '大藏省官僚出身，吉田茂內閣時任大藏大臣。1960 年安保鬥爭後組閣，提出十年內國民所得倍增的「所得倍增計畫」，以經濟成長取代政治對立作為施政重心。1964 年東京奧運閉幕後因病辭職，翌年病逝。',
    historicalSignificance: '高度經濟成長時期的代表性首相。',
  }),
  fig({
    id: 'fig_jp_sato_eisaku', name: '佐藤榮作', lifeSpan: '1901 - 1975', faction: 'showa_postwar',
    clanTag: '自由民主黨', emblemChar: '佐', mainColor: '#60a5fa', bgColor: '#172554',
    role: '內閣總理大臣 / 沖繩返還', roleType: 'ruler', importance: 3, hometown: '山口縣田布施 (今山口縣田布施町)',
    shortBio: '岸信介胞弟。1964 年至 1972 年連續執政七年八個月，任內簽訂《日韓基本條約》、提出「非核三原則」，並與美國談判，1972 年 5 月實現沖繩返還。1974 年獲諾貝爾和平獎。',
    historicalSignificance: '戰後連續在任時間最長的首相之一。',
  }),
  fig({
    id: 'fig_jp_tanaka_kakuei', name: '田中角榮', lifeSpan: '1918 - 1993', faction: 'showa_postwar',
    clanTag: '自由民主黨', emblemChar: '田', mainColor: '#fb923c', bgColor: '#431407',
    role: '內閣總理大臣 / 中日建交', roleType: 'ruler', importance: 3, hometown: '新潟縣刈羽郡二田村 (今新潟縣柏崎市)',
    shortBio: '高等小學校畢業後經營土木建設公司，1947 年當選眾議員。1972 年組閣，提出「日本列島改造論」，同年 9 月訪問北京簽署《中日聯合聲明》，與中華人民共和國建交。1974 年因政治資金問題下台，1976 年因洛克希德事件被捕，一、二審判決有罪，上訴期間病逝。',
    historicalSignificance: '戰後派閥政治與地方建設政治的代表人物。',
  }),
  fig({
    id: 'fig_jp_yukawa_hideki', name: '湯川秀樹', lifeSpan: '1907 - 1981', faction: 'showa_postwar',
    clanTag: '理論物理', emblemChar: '湯', mainColor: '#38bdf8', bgColor: '#082f49',
    role: '理論物理學家', roleType: 'scholar', importance: 3, hometown: '東京府東京 (今東京都)',
    shortBio: '京都帝國大學畢業，1935 年發表介子理論，預言傳遞核力的介子存在。1949 年獲諾貝爾物理學獎，是第一位獲得諾貝爾獎的日本人。晚年參與《羅素—愛因斯坦宣言》，投入廢除核武的和平運動。',
    historicalSignificance: '戰後初期鼓舞日本社會的科學家。',
  }),
  fig({
    id: 'fig_jp_kawabata_yasunari', name: '川端康成', lifeSpan: '1899 - 1972', faction: 'showa_postwar',
    clanTag: '昭和文壇', emblemChar: '川', mainColor: '#c084fc', bgColor: '#2e1065',
    role: '小說家', roleType: 'cultural', importance: 3, hometown: '大阪府大阪市 (今大阪府大阪市)',
    shortBio: '早年與橫光利一等人發起新感覺派，著有《伊豆的舞孃》《雪國》《古都》等。1968 年獲諾貝爾文學獎，是第一位獲得此獎的日本作家。1972 年在逗子的工作室身亡，一般認為是自殺。',
    historicalSignificance: '日本文學走向國際的代表作家。',
  }),
  fig({
    id: 'fig_jp_tezuka_osamu', name: '手塚治虫', lifeSpan: '1928 - 1989', faction: 'showa_postwar',
    clanTag: '漫畫動畫', emblemChar: '漫', mainColor: '#fb7185', bgColor: '#4c0519',
    role: '漫畫家、動畫製作人', roleType: 'cultural', importance: 3, hometown: '大阪府豐能郡 (今大阪府豐中市)',
    shortBio: '大阪帝國大學附屬醫學專門部畢業並取得醫師資格。1947 年《新寶島》受到注目，其後創作《原子小金剛》《森林大帝》《火鳥》《怪醫黑傑克》等。1963 年起製作電視動畫《原子小金剛》，開創每週播出的國產電視動畫系列。1989 年 2 月病逝。',
    historicalSignificance: '戰後日本漫畫與動畫產業的奠基者。',
  }),
  fig({
    id: 'fig_jp_kurosawa_akira', name: '黑澤明', lifeSpan: '1910 - 1998', faction: 'showa_postwar',
    clanTag: '電影', emblemChar: '影', mainColor: '#cbd5e1', bgColor: '#0f172a',
    role: '電影導演', roleType: 'cultural', importance: 3, hometown: '東京府荏原郡 (今東京都品川區)',
    shortBio: '1943 年以《姿三四郎》首次執導。1951 年《羅生門》獲威尼斯影展金獅獎，使日本電影受到國際注目。代表作有《生之慾》《七武士》《亂》等，1990 年獲奧斯卡終身成就獎。',
    historicalSignificance: '對世界電影影響深遠的日本導演。',
  }),
  fig({
    id: 'fig_jp_matsushita_konosuke', name: '松下幸之助', lifeSpan: '1894 - 1989', faction: 'showa_postwar',
    clanTag: '實業家', emblemChar: '松', mainColor: '#fbbf24', bgColor: '#451a03',
    role: '松下電器（今 Panasonic）創辦人', roleType: 'cultural', importance: 3, hometown: '和歌山縣海草郡 (今和歌山縣和歌山市)',
    shortBio: '九歲到大阪當學徒，1918 年創立松下電氣器具製作所，以電燈插座與自行車燈起家，戰後發展為大型家電企業。1946 年創立 PHP 研究所，1979 年設立松下政經塾。1989 年 4 月病逝。',
    historicalSignificance: '戰後日本代表性的企業經營者。',
  }),
  fig({
    id: 'fig_jp_honda_soichiro', name: '本田宗一郎', lifeSpan: '1906 - 1991', faction: 'showa_postwar',
    clanTag: '實業家', emblemChar: '本', mainColor: '#f87171', bgColor: '#450a0a',
    role: '本田技研工業創辦人', roleType: 'cultural', importance: 3, hometown: '靜岡縣磐田郡光明村 (今靜岡縣濱松市)',
    shortBio: '汽車修理廠學徒出身。1948 年創立本田技研工業生產機車，1959 年起參加曼島 TT 機車賽並於 1961 年奪冠，1960 年代進入汽車與一級方程式賽車領域。1973 年退休，1991 年病逝。',
    historicalSignificance: '戰後日本製造業走向國際的代表人物。',
  }),
];

// Sources: only pages fetched from ja.wikisource on 2026-10-31 whose text contains
// the signatory, date or clause the record relies on. The 1940 三國條約 page has
// no treaty text, so the Tripartite Pact event carries no source.
const S = {
  ryukyu: ws('《琉球藩ヲ廢シ沖繩縣ヲ置ク》（明治十二年太政官布告第十四號）', '琉球藩ヲ廢シ沖繩縣ヲ置ク'),
  education: ws('《教育ニ関スル勅語》', '教育ニ関スル勅語'),
  angloJapanese: ws('《第一次日英同盟協約》', '第一次日英同盟協約'),
  portsmouth: ws('《日露講和條約》', '日露講和條約'),
  annexation: ws('《韓國倂合ニ關スル條約》', '韓國倂合ニ關スル條約'),
  usTreaty1911: ws('《日米通商航海条約》（1911 年）', '日米通商航海条約_(1911年)'),
  warOnGermany: ws('《独逸国ニ対スル宣戦ノ詔書》', '独逸国ニ対スル宣戦ノ詔書'),
  peaceLaw: ws('《治安維持法》（大正十四年法律第四十六號）', '治安維持法_(大正14年法律第46号)'),
  mobilization: ws('《國家總動員法》', '國家總動員法'),
  leagueExit: ws('《國際聯盟脱退ノ詔書》', '國際聯盟脱退ノ詔書'),
  warOnUsUk: ws('《米國及英國ニ對スル宣戰ノ詔書》', '米國及英國ニ對スル宣戰ノ詔書'),
  endOfWar: ws('《大東亞戰爭終結ノ詔書》（終戰詔書）', '大東亞戰爭終結ノ詔書'),
  potsdam: ws('《ポツダム宣言》', 'ポツダム宣言'),
  surrender: ws('《日本の降伏文書》', '日本の降伏文書'),
  constitution: ws('《日本國憲法》', '日本國憲法'),
  sanFrancisco: ws('《日本国との平和条約》', '日本国との平和条約'),
  security1951: ws('《日本国とアメリカ合衆国との間の安全保障条約》', '日本国とアメリカ合衆国との間の安全保障条約'),
  security1960: ws('《日本国とアメリカ合衆国との間の相互協力及び安全保障条約》', '日本国とアメリカ合衆国との間の相互協力及び安全保障条約'),
  sovietDeclaration: ws('《日本国とソヴィエト社会主義共和国連邦との共同宣言》', '日本国とソヴィエト社会主義共和国連邦との共同宣言'),
  chinaStatement: ws('《日本国政府と中華人民共和国政府の共同声明》', '日本国政府と中華人民共和国政府の共同声明'),
  chinaTreaty: ws('《日本国と中華人民共和国との間の平和友好条約》', '日本国と中華人民共和国との間の平和友好条約'),
};
const SOURCES = {
  evt_jp_ryukyu_disposition_1879: [S.ryukyu],
  evt_jp_rescript_education_1890: [S.education],
  evt_jp_anglo_japanese_alliance_1902: [S.angloJapanese],
  evt_jp_portsmouth_hibiya_1905: [S.portsmouth],
  evt_jp_korea_annexation_1910: [S.annexation],
  evt_jp_tariff_autonomy_1911: [S.usTreaty1911],
  evt_jp_wwi_entry_1914: [S.warOnGermany],
  evt_jp_universal_suffrage_1925: [S.peaceLaw],
  evt_jp_national_mobilization_1938: [S.mobilization],
  evt_jp_league_withdrawal_1933: [S.leagueExit],
  evt_jp_pacific_war_1941: [S.warOnUsUk],
  evt_jp_gyokuon_broadcast_1945: [S.endOfWar, S.potsdam],
  evt_jp_surrender_missouri_1945: [S.surrender],
  evt_jp_constitution_1946: [S.constitution],
  evt_jp_san_francisco_1951: [S.sanFrancisco, S.security1951],
  evt_jp_anpo_protests_1960: [S.security1960],
  evt_jp_un_membership_1956: [S.sovietDeclaration],
  evt_jp_okinawa_reversion_1972: [S.chinaStatement],
  evt_jp_china_peace_treaty_1978: [S.chinaTreaty],
  // Figures: only documents that name the person as signatory or countersigner.
  fig_jp_konoe_fumimaro: [S.mobilization],
  fig_jp_tojo_hideki: [S.warOnUsUk],
  fig_jp_yoshida_shigeru: [S.sanFrancisco, S.security1951],
  fig_jp_kishi_nobusuke: [S.security1960],
  fig_jp_hatoyama_ichiro: [S.sovietDeclaration],
  fig_jp_tanaka_kakuei: [S.chinaStatement],
};

const withSources = (r) => (SOURCES[r.id] ? { ...r, sources: SOURCES[r.id] } : r);

// ---------- File I/O ----------
const load = async (file, name) => (await import(`file://${path.join(dataDir, file)}?t=${Date.now()}`))[name];
const save = (file, name, header, data) =>
  fs.writeFileSync(path.join(dataDir, file), `${header}\nexport const ${name} = ${JSON.stringify(data, null, 2)};\n`);

const eras = await load('japanEras.js', 'JAPAN_ERAS');
const figures = await load('japanFigures.js', 'JAPAN_FIGURES');
const battles = await load('japanBattles.js', 'JAPAN_BATTLES');

const assertNew = (list, items) => {
  const ids = new Set(list.map((x) => x.id));
  for (const it of items) if (ids.has(it.id)) throw new Error(`already exists: ${it.id}`);
};
const eraById = (id) => {
  const era = eras.find((e) => e.id === id);
  if (!era) throw new Error(`missing era ${id}`);
  return era;
};
// Events without a named figure would otherwise fall back to the generic 東瀛名士 badge.
const ERA_FACTION = { jp_meiji_modern: 'meiji_modern', jp_taisho_prewar: 'taisho_prewar', jp_showa_postwar: 'showa_postwar' };
const addBatch = (eraId, evts, bats, figs) => {
  const era = eraById(eraId);
  assertNew(era.keyEvents, evts);
  assertNew(battles, bats);
  assertNew(figures, figs);
  era.keyEvents.push(...evts.map((e) => withSources({ ...e, faction: ERA_FACTION[eraId] })));
  era.keyEvents.sort((a, b) => a.year - b.year);
  era.highlightFigures.push(...figs.map((f) => f.id));
  battles.push(...bats.map(withSources));
  figures.push(...figs.map(withSources));
  return bats.map((b) => b.id);
};

// Each new era is added together with its own records so no era is ever empty.
const addEra = (era) => { if (!eras.some((e) => e.id === era.id)) eras.push(era); };
const battleIdsToAdd = {};
if (batch === 'meiji') {
  eraById('jp_meiji_modern').dateRangeDisplay = '西元 1868 - 1912 年';
  battleIdsToAdd.jp_meiji_modern = addBatch('jp_meiji_modern', MEIJI_EVENTS, MEIJI_BATTLES, MEIJI_FIGURES);
} else if (batch === 'prewar') {
  // The meiji batch shipped before ERA_FACTION existed.
  const meijiIds = new Set(MEIJI_EVENTS.map((e) => e.id));
  for (const e of eraById('jp_meiji_modern').keyEvents) if (meijiIds.has(e.id) && !e.faction) e.faction = 'meiji_modern';
  addEra(ERA_TAISHO);
  battleIdsToAdd.jp_taisho_prewar = addBatch('jp_taisho_prewar', PREWAR_EVENTS, PREWAR_BATTLES, PREWAR_FIGURES);
} else if (batch === 'postwar') {
  addEra(ERA_POSTWAR);
  addBatch('jp_showa_postwar', POSTWAR_EVENTS, [], POSTWAR_FIGURES);
  eraById('jp_showa_postwar').highlightFigures.unshift('fig_jp_showa_emperor');
} else {
  throw new Error('usage: meiji|prewar|postwar');
}

const eventCount = eras.reduce((n, e) => n + e.keyEvents.length, 0);
save('japanEras.js', 'JAPAN_ERAS', `// Japanese Historical Atlas Eras Dataset (${eras.length} Master Historical Eras with ${eventCount} Detailed Events)`, eras);
save('japanFigures.js', 'JAPAN_FIGURES', `// Japanese Historical Atlas Figures Dataset (${figures.length} Authoritative Figures)`, figures);
save('japanBattles.js', 'JAPAN_BATTLES', `// Japanese Historical Atlas Battles Dataset (${battles.length} Authoritative Epic Battles with Full Military Intelligence)`, battles);

// Battle-to-era mapping lives in index.js as a literal object.
const indexPath = path.join(dataDir, 'index.js');
const raw = fs.readFileSync(indexPath, 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
let index = raw.replace(/\r\n/g, '\n');
for (const [eraId, ids] of Object.entries(battleIdsToAdd)) {
  if (!ids.length) continue;
  const lines = ids.map((id) => `    "${id}"`).join(',\n');
  const re = new RegExp(`(  ${eraId}: \\[\\n)([\\s\\S]*?)(\\n  \\])`);
  if (re.test(index)) index = index.replace(re, (_, a, body, c) => `${a}${body},\n${lines}${c}`);
  else index = index.replace(/\n};\n\n\/\/ Flatten/, `,\n  ${eraId}: [\n${lines}\n  ]\n};\n\n// Flatten`);
}
fs.writeFileSync(indexPath, index.replace(/\n/g, eol));
console.log(`batch ${batch}: eras ${eras.length}, events ${eventCount}, figures ${figures.length}, battles ${battles.length}`);
