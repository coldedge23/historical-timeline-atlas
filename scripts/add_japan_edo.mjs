// One-off: fill the Edo era (1603-1853) in two batches.
// Usage: node scripts/add_japan_edo.mjs <early|late>
//   early: 1603-1786, late: 1787-1853
// Sources list only Wikisource pages whose text was fetched and keyword-checked.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'src/data/japan');
const batch = process.argv[2];

const ws = (title, page) => ({ title, url: `https://ja.wikisource.org/wiki/${page}` });
const EDO = [139.75, 35.68];
const NAGASAKI = [129.87, 32.75];

// ---------- Batch 1: 1603-1786 ----------
const EARLY_EVENTS = [
  {
    id: 'evt_jp_satsuma_ryukyu_1609', year: 1609, yearDisplay: '西元 1609 年 (慶長十四年)',
    title: '薩摩藩出兵琉球',
    summary: '經德川家康許可，薩摩藩島津氏出兵攻佔首里，琉球王國此後受薩摩藩控制。',
    detail: '薩摩軍攻下首里城，琉球國王尚寧被帶往駿府、江戶謁見德川家康與德川秀忠，1611 年才獲准歸國。奄美群島改由薩摩藩直轄，琉球則在名義上維持對明朝的朝貢關係，形成同時從屬中日兩方的體制。',
    locationNameAncient: '琉球國首里', locationNameModern: '沖繩縣那霸市首里', coordinates: [127.72, 26.22],
    tags: ['琉球侵攻', '島津氏', '尚寧', '德川家康'],
  },
  {
    id: 'evt_jp_kiyu_treaty_1609', year: 1609, yearDisplay: '西元 1609 年 (慶長十四年)',
    title: '對馬藩與朝鮮訂立己酉約條',
    summary: '豐臣秀吉出兵朝鮮後中斷的日朝關係恢復，貿易由對馬藩宗氏經釜山倭館進行。',
    detail: '1607 年朝鮮使節來到江戶，兩國恢復邦交。1609 年對馬藩與朝鮮訂立己酉約條，規定每年歲遣船數等貿易條件，此後日朝外交與貿易由對馬藩居中辦理。朝鮮通信使在江戶時代共來日十二次。',
    locationNameAncient: '對馬國府中', locationNameModern: '長崎縣對馬市嚴原', coordinates: [129.29, 34.2],
    tags: ['己酉約條', '朝鮮通信使', '對馬藩'],
  },
  {
    id: 'evt_jp_keicho_embassy_1613', year: 1613, yearDisplay: '西元 1613 年 (慶長十八年)',
    title: '支倉常長出使歐洲（慶長遣歐使節）',
    summary: '仙台藩主伊達政宗派家臣支倉常長出使西班牙與羅馬，尋求與新西班牙直接通商。',
    detail: '使節團乘坐仙台藩建造的西洋式帆船，自月浦出航，經墨西哥橫渡大西洋抵達西班牙，謁見國王腓力三世，1615 年在羅馬謁見教宗保祿五世。通商交涉沒有成果，1620 年支倉常長回國時日本已全面禁教。',
    locationNameAncient: '陸奧國牡鹿郡月浦', locationNameModern: '宮城縣石卷市月浦', coordinates: [141.4, 38.38],
    tags: ['慶長遣歐使節', '支倉常長', '伊達政宗'],
  },
  {
    id: 'evt_jp_christian_ban_1614', year: 1614, yearDisplay: '西元 1614 年 1 月 (慶長十八年十二月)',
    title: '幕府頒布全國禁教令',
    summary: '幕府以《伴天連追放之文》宣布全國禁止天主教，傳教士與信徒領袖被驅逐出境。',
    detail: '1612 年幕府先在直轄領地禁教，慶長十八年十二月（西曆 1614 年 1 月）頒布由以心崇傳起草的禁教文書，禁令擴及全國。同年高山右近等信徒被流放至馬尼拉，各地教堂被拆毀，此後對信徒的取締日趨嚴厲。',
    locationNameAncient: '武藏國江戶', locationNameModern: '東京都千代田區', coordinates: EDO,
    tags: ['禁教令', '伴天連追放之文', '高山右近', '德川秀忠'],
  },
  {
    id: 'evt_jp_dejima_dutch_1641', year: 1641, yearDisplay: '西元 1641 年 (寬永十八年)',
    title: '荷蘭商館遷至長崎出島',
    summary: '幕府將平戶的荷蘭商館遷往長崎出島，此後兩百多年歐洲人只有荷蘭人能在此通商。',
    detail: '出島原為收容葡萄牙人而建的扇形人工島。1639 年葡萄牙船被禁止來航後，幕府於 1641 年命荷蘭商館遷入。荷蘭商館長須定期赴江戶參府，並提交「荷蘭風說書」報告海外情勢，成為幕府了解外國消息的主要管道。',
    locationNameAncient: '肥前國長崎出島', locationNameModern: '長崎縣長崎市出島町', coordinates: [129.85, 32.744],
    tags: ['出島', '荷蘭商館', '鎖國', '荷蘭風說書'],
  },
  {
    id: 'evt_jp_keian_incident_1651', year: 1651, yearDisplay: '西元 1651 年 (慶安四年)',
    title: '慶安事件與文治政治的轉向',
    summary: '三代將軍德川家光死後，兵學者由井正雪等浪人密謀起事，事洩後由井正雪自盡。',
    detail: '大名改易造成大量浪人生計無著。1651 年由井正雪與丸橋忠彌等人計畫在江戶、駿府等地起事，因同夥告密失敗，由井正雪在駿府自盡。事件後幕府在保科正之等人輔佐年幼的四代將軍德川家綱下，放寬「末期養子」禁令以減少改易，施政由武力威壓轉向重視禮儀教化的文治政治。',
    locationNameAncient: '駿河國駿府', locationNameModern: '靜岡縣靜岡市', coordinates: [138.38, 34.98],
    tags: ['慶安事件', '由井正雪', '保科正之', '文治政治'],
  },
  {
    id: 'evt_jp_genroku_recoinage_1695', year: 1695, yearDisplay: '西元 1695 年 (元祿八年)',
    title: '元祿改鑄',
    summary: '幕府降低金銀幣的成色重新鑄造，以改鑄差額彌補財政，但造成物價上漲。',
    detail: '五代將軍德川綱吉在位期間，金銀礦產量減少而支出增加。勘定吟味役荻原重秀主導改鑄，發行成色較低的元祿金銀，幕府取得大量差益，但貨幣貶值導致物價上漲。新井白石日後批評此政策，並在正德年間恢復貨幣成色。',
    locationNameAncient: '武藏國江戶', locationNameModern: '東京都', coordinates: EDO,
    tags: ['元祿改鑄', '荻原重秀', '德川綱吉', '元祿文化'],
  },
  {
    id: 'evt_jp_hoei_eruption_1707', year: 1707, yearDisplay: '西元 1707 年 (寶永四年)',
    title: '寶永地震與富士山寶永大噴發',
    summary: '10 月東海至南海一帶發生大地震，49 天後富士山東南山腰噴發，火山灰降至江戶。',
    detail: '寶永地震在東海道、紀伊半島、四國沿岸造成嚴重災情與海嘯。同年 12 月富士山噴發，形成寶永火口，周邊村落被火山砂掩埋，江戶也降下火山灰。這是富士山至今最後一次噴發。',
    locationNameAncient: '駿河國富士山', locationNameModern: '靜岡縣富士山寶永火口', coordinates: [138.71, 35.35],
    tags: ['寶永地震', '富士山', '寶永大噴發'],
  },
  {
    id: 'evt_jp_shotoku_rule_1709', year: 1709, yearDisplay: '西元 1709 年 (寶永六年)',
    title: '新井白石主導正德之治',
    summary: '德川綱吉死後，六代將軍德川家宣起用新井白石，廢除生類憐憫令並整頓貨幣與長崎貿易。',
    detail: '新井白石與側用人間部詮房輔佐家宣、家繼兩代將軍。廢止生類憐憫令；1714 年恢復金銀幣成色；1715 年頒布海舶互市新例（正德新例），限制每年來航長崎的中國船與荷蘭船數量，以減少金銀外流。1716 年德川吉宗繼任後，白石失勢。',
    locationNameAncient: '武藏國江戶', locationNameModern: '東京都千代田區', coordinates: EDO,
    tags: ['正德之治', '新井白石', '海舶互市新例'],
  },
  {
    id: 'evt_jp_kyoho_famine_1732', year: 1732, yearDisplay: '西元 1732 年 (享保十七年)',
    title: '享保大飢荒',
    summary: '西日本發生嚴重蟲害，稻作歉收，引發大飢荒；翌年江戶發生首次大規模「打毀」。',
    detail: '1732 年夏天，西日本各地稻田遭飛蝨等害蟲侵襲，收成大減，各地出現大量餓死者。米價飆升，1733 年江戶市民襲擊被認為囤積抬價的米商，為江戶第一次大規模打毀事件。此後幕府獎勵栽種甘藷等救荒作物。',
    locationNameAncient: '西日本各地、武藏國江戶', locationNameModern: '西日本各地、東京都', coordinates: EDO,
    tags: ['享保大飢荒', '打毀', '德川吉宗'],
  },
  {
    id: 'evt_jp_kujikata_osadamegaki_1742', year: 1742, yearDisplay: '西元 1742 年 (寬保二年)',
    title: '制定《公事方御定書》',
    summary: '八代將軍德川吉宗命大岡忠相等人整理判例，編成幕府的審判與刑罰基準。',
    detail: '上卷收錄與司法相關的法令，下卷通稱「御定書百箇條」，整理歷來判例作為量刑標準，供評定所與各奉行審判使用。法典原則上不公開，僅供審判官員參照。',
    locationNameAncient: '武藏國江戶', locationNameModern: '東京都千代田區', coordinates: EDO,
    tags: ['公事方御定書', '德川吉宗', '大岡忠相', '享保改革'],
  },
  {
    id: 'evt_jp_tanuma_era_1772', year: 1772, yearDisplay: '西元 1772 年 (明和九年／安永元年)',
    title: '田沼意次就任老中',
    summary: '側用人田沼意次升任老中，推行重視商業與貿易的財政政策，史稱「田沼時代」。',
    detail: '田沼意次承認並向株仲間（商人同業組合）課稅，擴大長崎俵物（海產乾貨）出口，嘗試開發印旛沼，並派人調查蝦夷地。但賄賂盛行的批評不斷，又逢天明飢荒，1784 年其子田沼意知在江戶城內遇刺，1786 年十代將軍德川家治死後田沼失勢。',
    locationNameAncient: '武藏國江戶', locationNameModern: '東京都千代田區', coordinates: EDO,
    tags: ['田沼意次', '株仲間', '田沼時代'],
  },
  {
    id: 'evt_jp_asama_tenmei_1783', year: 1783, yearDisplay: '西元 1783 年 (天明三年)',
    title: '淺間山大噴發與天明大飢荒',
    summary: '淺間山噴發造成鎌原村等地被土石流掩埋，加上連年天候異常，東北地方爆發大飢荒。',
    detail: '天明大飢荒約自 1782 年持續至 1787 年，以東北地方受害最重，出現大量餓死者與流民。各地農民一揆與都市打毀頻發，1787 年江戶、大坂等地同時發生大規模打毀，成為松平定信推行寬政改革的背景。',
    locationNameAncient: '上野國、信濃國淺間山', locationNameModern: '群馬縣、長野縣淺間山', coordinates: [138.52, 36.41],
    tags: ['淺間山', '天明大飢荒', '打毀'],
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

const EARLY_BATTLES = [
  battle({
    id: 'bat_jp_ryukyu_invasion_1609', name: '琉球侵攻 (薩摩藩島津軍攻佔首里)', year: 1609,
    locationAncient: '琉球國首里', locationModern: '沖繩縣那霸市首里', coordinates: [127.72, 26.22],
    summary: '1609 年薩摩藩軍自鹿兒島南下，經奄美諸島登陸沖繩本島，攻佔首里城，國王尚寧投降。',
    attacker: {
      factionName: '薩摩藩島津軍', faction: 'edo',
      commanders: [{ name: '樺山久高', title: '總大將' }, { name: '平田增宗', title: '副將' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認',
    },
    defender: {
      factionName: '琉球王國', faction: 'ryukyu',
      commanders: [{ name: '尚寧', title: '琉球國王' }, { name: '謝名親方（鄭迵）', title: '三司官' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認',
    },
    victor: 'attacker',
    victorStatement: '薩摩軍攻佔首里城，尚寧王開城投降',
    tactics: [
      '薩摩軍：沿奄美大島、德之島等島嶼逐次南下',
      '薩摩軍：登陸沖繩本島北部後經陸路進逼首里',
    ],
    strategicOutcome: '尚寧王被帶往駿府、江戶，1611 年歸國；奄美群島劃歸薩摩直轄，琉球受薩摩藩控制。謝名親方因拒絕向薩摩宣誓效忠而被處死。',
    significance: '琉球此後同時向中國朝貢、受薩摩藩支配，這種體制延續到 1879 年琉球處分。',
    eraId: 'jp_edo',
  }),
  battle({
    id: 'bat_jp_shakushain_1669', name: '沙牟奢允之戰 (愛努族起事反抗松前藩)', year: 1669,
    locationAncient: '蝦夷地東部靜內', locationModern: '北海道日高郡新冠町、新日高町一帶', coordinates: [142.37, 42.33],
    summary: '1669 年愛努族首領沙牟奢允號召各地愛努人起事，反抗松前藩壟斷交易與不利的交換條件，最終在議和宴席上遇害。',
    attacker: {
      factionName: '愛努族各集團', faction: 'ainu',
      commanders: [{ name: '沙牟奢允', title: '愛努族首領' }],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認',
    },
    defender: {
      factionName: '松前藩及幕府動員的援軍', faction: 'edo',
      commanders: [],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認',
    },
    victor: 'defender',
    victorStatement: '松前藩以議和為名誘殺沙牟奢允，起事瓦解',
    tactics: [
      '愛努方：各地同時襲擊和人商船與鷹匠等',
      '松前藩：以鐵砲裝備的部隊應戰，並以議和宴席誘殺首領',
    ],
    strategicOutcome: '松前藩加強對愛努人的控制，交易條件更不利於愛努人。',
    significance: '江戶時代規模最大的愛努族反抗之一。',
    eraId: 'jp_edo',
  }),
];

const fig = (f) => ({ avatar: `./images/figures/${f.id}.svg`, faction: 'edo', ...f });

const EARLY_FIGURES = [
  fig({
    id: 'fig_jp_hayashi_razan', name: '林羅山', lifeSpan: '1583 - 1657', clanTag: '朱子學', emblemChar: '儒', mainColor: '#94a3b8', bgColor: '#1e293b',
    role: '儒學者 / 幕府儒官', roleType: 'scholar', importance: 3, hometown: '山城國京都 (今京都府京都市)',
    shortBio: '師事藤原惺窩，1605 年起仕於德川家康，歷侍家康至家綱四代將軍，參與起草法令與外交文書。在江戶上野忍岡開設私塾，後來發展為幕府的昌平坂學問所。',
    historicalSignificance: '使朱子學成為江戶幕府的官方學問。',
  }),
  fig({
    id: 'fig_jp_hasekura_tsunenaga', name: '支倉常長', lifeSpan: '1571 - 1622', clanTag: '仙台藩', emblemChar: '支', mainColor: '#38bdf8', bgColor: '#082f49',
    role: '仙台藩士 / 慶長遣歐使節', roleType: 'advisor', importance: 3, hometown: '陸奧國 (今宮城縣)',
    shortBio: '伊達政宗家臣。1613 年率使節團出航，經墨西哥抵達西班牙，受洗為天主教徒，1615 年在羅馬謁見教宗保祿五世。通商交涉未果，1620 年回國時日本已全面禁教，兩年後去世。',
    historicalSignificance: '江戶初期出使歐洲的日本使節。',
  }),
  fig({
    id: 'fig_jp_kasuga_no_tsubone', name: '春日局', courtesyName: '本名齋藤福', lifeSpan: '1579 - 1643', clanTag: '大奧', emblemChar: '春', mainColor: '#f472b6', bgColor: '#500724',
    role: '三代將軍德川家光乳母 / 大奧總管', roleType: 'advisor', importance: 3, hometown: '美濃國 (今岐阜縣)',
    shortBio: '明智光秀重臣齋藤利三之女。成為德川家光的乳母，家光繼任將軍後主掌江戶城大奧，建立大奧的制度。1629 年受朝廷賜號「春日局」。',
    historicalSignificance: '江戶城大奧制度的奠定者。',
  }),
  fig({
    id: 'fig_jp_nakae_toju', name: '中江藤樹', lifeSpan: '1608 - 1648', clanTag: '陽明學', emblemChar: '藤', mainColor: '#4ade80', bgColor: '#052e16',
    role: '儒學者 / 日本陽明學之祖', roleType: 'scholar', importance: 3, hometown: '近江國小川村 (今滋賀縣高島市)',
    shortBio: '曾仕於伊予大洲藩，為奉養母親辭官返鄉，在故鄉開設私塾講學。初學朱子學，後轉向陽明學，重視「知行合一」與孝道，著有《翁問答》。鄉人尊稱為「近江聖人」。',
    historicalSignificance: '被視為日本陽明學的開創者。',
  }),
  fig({
    id: 'fig_jp_yui_shosetsu', name: '由井正雪', lifeSpan: '1605 - 1651', clanTag: '軍學者', emblemChar: '雪', mainColor: '#94a3b8', bgColor: '#0f172a',
    role: '兵學者 / 慶安事件主謀', roleType: 'advisor', importance: 2, hometown: '駿河國 (今靜岡縣)',
    shortBio: '在江戶開設兵學塾，門下聚集許多浪人。1651 年德川家光死後，與丸橋忠彌等人密謀起事推翻幕府，事洩後在駿府自盡。',
    historicalSignificance: '其事件促使幕府調整改易政策，轉向文治政治。',
  }),
  fig({
    id: 'fig_jp_yamaga_soko', name: '山鹿素行', lifeSpan: '1622 - 1685', clanTag: '山鹿流兵學', emblemChar: '鹿', mainColor: '#fb923c', bgColor: '#431407',
    role: '兵學者、儒學者', roleType: 'scholar', importance: 3, hometown: '陸奧國會津若松 (今福島縣會津若松市)',
    shortBio: '學習儒學與兵學，創立山鹿流兵學。因著《聖教要錄》批判朱子學，1666 年被幕府流放至赤穗藩，在當地講學約十年，並著《中朝事實》。',
    historicalSignificance: '其武士道論與在赤穗的講學，常被與赤穗浪士事件相連結。',
  }),
  fig({
    id: 'fig_jp_ihara_saikaku', name: '井原西鶴', lifeSpan: '1642 - 1693', clanTag: '元祿文學', emblemChar: '鶴', mainColor: '#c084fc', bgColor: '#2e1065',
    role: '浮世草子作家、俳諧師', roleType: 'cultural', importance: 3, hometown: '攝津國大坂 (今大阪府大阪市)',
    shortBio: '大坂町人出身，以快速連吟的俳諧聞名。1682 年發表《好色一代男》，開創描寫町人生活的「浮世草子」，著有《好色五人女》《日本永代藏》《世間胸算用》等。',
    historicalSignificance: '元祿文化的代表作家之一。',
  }),
  fig({
    id: 'fig_jp_oishi_kuranosuke', name: '大石內藏助', courtesyName: '名良雄', lifeSpan: '1659 - 1703', clanTag: '赤穗藩', emblemChar: '忠', mainColor: '#f87171', bgColor: '#450a0a',
    role: '赤穗藩家老 / 赤穗浪士首領', roleType: 'advisor', importance: 4, hometown: '播磨國赤穗 (今兵庫縣赤穗市)',
    shortBio: '赤穗藩筆頭家老。1701 年藩主淺野長矩在江戶城內刃傷吉良義央被命切腹、赤穗藩遭改易。大石率舊藩士於 1702 年 12 月夜襲吉良宅邸，取吉良首級，翌年 2 月奉幕府之命與同志一同切腹。',
    historicalSignificance: '赤穗事件被改編為《假名手本忠臣藏》等作品，流傳至今。',
  }),
  fig({
    id: 'fig_jp_kira_yoshinaka', name: '吉良義央', courtesyName: '通稱上野介', lifeSpan: '1641 - 1703', clanTag: '高家', emblemChar: '吉', mainColor: '#94a3b8', bgColor: '#1e293b',
    role: '幕府高家（掌管朝廷禮儀的旗本）', roleType: 'advisor', importance: 2, hometown: '武藏國江戶 (今東京都)',
    shortBio: '擔任高家，負責幕府與朝廷之間的儀禮。1701 年在江戶城松之廊下遭赤穗藩主淺野長矩砍傷，淺野被命切腹而吉良未受處分。1702 年 12 月赤穗浪士夜襲其本所宅邸，吉良遇害。',
    historicalSignificance: '赤穗事件的另一方當事人；在領地三河國吉良（今愛知縣西尾市）則留有治水等事蹟的傳說。',
  }),
  fig({
    id: 'fig_jp_ogyu_sorai', name: '荻生徂徠', lifeSpan: '1666 - 1728', clanTag: '古文辭學', emblemChar: '徂', mainColor: '#94a3b8', bgColor: '#1e293b',
    role: '儒學者 / 古文辭學派創始者', roleType: 'scholar', importance: 3, hometown: '武藏國江戶 (今東京都)',
    shortBio: '曾仕於柳澤吉保。主張直接研讀先秦古典原文以理解聖人之道，開創古文辭學（蘐園學派）。晚年應八代將軍德川吉宗諮詢，著《政談》提出政治改革意見。',
    historicalSignificance: '江戶中期影響最大的儒學者之一。',
  }),
  fig({
    id: 'fig_jp_kaibara_ekiken', name: '貝原益軒', lifeSpan: '1630 - 1714', clanTag: '本草學', emblemChar: '益', mainColor: '#4ade80', bgColor: '#052e16',
    role: '儒學者、本草學者', roleType: 'scholar', importance: 3, hometown: '筑前國福岡 (今福岡縣福岡市)',
    shortBio: '福岡藩儒醫。著有日本本草學代表作《大和本草》，以及以平易文字寫成的《養生訓》等教訓書，廣為一般民眾閱讀。',
    historicalSignificance: '推動本草學與通俗教育的學者。',
  }),
  fig({
    id: 'fig_jp_hiraga_gennai', name: '平賀源內', lifeSpan: '1728 - 1780', clanTag: '蘭學・戲作', emblemChar: '源', mainColor: '#facc15', bgColor: '#422006',
    role: '本草學者、發明家、作家', roleType: 'scholar', importance: 3, hometown: '讚岐國志度 (今香川縣讚岐市)',
    shortBio: '高松藩出身，赴長崎、江戶學習本草學與蘭學，主辦物產展覽會，並從事礦山開發。1776 年修復荷蘭製摩擦起電機「エレキテル」。也以戲作、淨瑠璃作者身分活躍。1779 年因殺傷他人入獄，翌年死於獄中。',
    historicalSignificance: '田沼時代多方面活躍的代表人物。',
  }),
  fig({
    id: 'fig_jp_uesugi_yozan', name: '上杉鷹山', courtesyName: '名治憲', lifeSpan: '1751 - 1822', clanTag: '米澤藩', emblemChar: '鷹', mainColor: '#60a5fa', bgColor: '#172554',
    role: '米澤藩第九代藩主', roleType: 'ruler', importance: 3, hometown: '日向國高鍋藩江戶藩邸 (今東京都)',
    shortBio: '自高鍋藩秋月家入繼上杉家，1767 年繼任財政瀕臨破產的米澤藩藩主。推行節儉、開墾、獎勵養蠶等殖產興業，並重建藩校興讓館。留有「為せば成る」（有心去做就能成事）的名言。',
    historicalSignificance: '江戶時代藩政改革的代表人物。',
  }),
  fig({
    id: 'fig_jp_shakushain', name: '沙牟奢允', lifeSpan: '未知 - 1669', clanTag: '愛努族', emblemChar: '沙', mainColor: '#2dd4bf', bgColor: '#042f2e',
    role: '愛努族首領 / 沙牟奢允之戰領袖', roleType: 'general', importance: 3, hometown: '蝦夷地靜內 (今北海道日高地方)',
    shortBio: '蝦夷地東部靜內一帶的愛努族首領。1669 年號召各地愛努人起事，反抗松前藩壟斷交易與苛刻的交換條件，同年在議和宴席上遭松前藩殺害。',
    historicalSignificance: '江戶時代愛努族反抗和人支配的代表人物。',
  }),
];

// ---------- Batch 2: 1787-1853 ----------
const LATE_EVENTS = [
  {
    id: 'evt_jp_kansei_reforms_1787', year: 1787, yearDisplay: '西元 1787 年 (天明七年)',
    title: '松平定信推行寬政改革',
    summary: '天明打毀後，松平定信出任老中首座，推行緊縮財政、儲糧備荒與思想統制。',
    detail: '寬政改革實施圍米儲糧、棄捐令（免除旗本與御家人對札差的部分借款）、在江戶設置人足寄場收容無宿者。1790 年頒布「寬政異學之禁」，昌平坂學問所只准講授朱子學；並嚴格管制出版，林子平因著《海國兵談》受罰。1793 年松平定信辭去老中。',
    locationNameAncient: '武藏國江戶', locationNameModern: '東京都千代田區', coordinates: EDO,
    tags: ['寬政改革', '松平定信', '寬政異學之禁', '棄捐令'],
  },
  {
    id: 'evt_jp_laxman_1792', year: 1792, yearDisplay: '西元 1792 年 (寬政四年)',
    title: '俄國使節拉克斯曼來航根室',
    summary: '俄國使節拉克斯曼護送漂流民大黑屋光太夫抵達根室，要求通商。',
    detail: '幕府拒絕在根室交涉，翌年在松前會見，發給可入長崎港的「信牌」作為答覆，並未同意通商。此後幕府開始重視北方防備，派人調查蝦夷地與千島。',
    locationNameAncient: '蝦夷地根室', locationNameModern: '北海道根室市', coordinates: [145.58, 43.33],
    tags: ['拉克斯曼', '大黑屋光太夫', '根室', '北方防備'],
  },
  {
    id: 'evt_jp_kojikiden_1798', year: 1798, yearDisplay: '西元 1798 年 (寬政十年)',
    title: '本居宣長完成《古事記傳》',
    summary: '國學者本居宣長歷時約三十五年，完成《古事記》注釋書《古事記傳》。',
    detail: '本居宣長自 1764 年前後開始撰寫，全書四十四卷，逐句考證《古事記》的訓讀與內容，至 1822 年才全部刊行完畢。宣長主張排除儒佛影響、探求日本古代的思想，對後來的國學與幕末尊王思想影響深遠。',
    locationNameAncient: '伊勢國松坂', locationNameModern: '三重縣松阪市', coordinates: [136.53, 34.58],
    tags: ['古事記傳', '本居宣長', '國學'],
  },
  {
    id: 'evt_jp_ino_survey_1800', year: 1800, yearDisplay: '西元 1800 年 (寬政十二年)',
    title: '伊能忠敬開始測量全國',
    summary: '伊能忠敬自蝦夷地開始實地測量，此後十七年間走遍全國海岸線。',
    detail: '伊能忠敬五十歲退隱後到江戶學習天文曆學。1800 年經幕府許可測量蝦夷地南岸，其後測量範圍擴及全國，至 1816 年完成。他去世後，弟子於 1821 年完成《大日本沿海輿地全圖》。',
    locationNameAncient: '武藏國江戶深川', locationNameModern: '東京都江東區', coordinates: [139.8, 35.68],
    tags: ['伊能忠敬', '大日本沿海輿地全圖', '測量'],
  },
  {
    id: 'evt_jp_rezanov_1804', year: 1804, yearDisplay: '西元 1804 年 (文化元年)',
    title: '俄國使節雷沙諾夫來航長崎',
    summary: '雷沙諾夫持拉克斯曼取得的信牌來到長崎要求通商，幕府等待半年後拒絕。',
    detail: '雷沙諾夫在長崎停留約半年，1805 年遭幕府拒絕。此後其部下在 1806 至 1807 年間襲擊樺太與擇捉島的日本據點（文化露寇），幕府隨即將蝦夷地全域收為直轄，加強北方警備。',
    locationNameAncient: '肥前國長崎', locationNameModern: '長崎縣長崎市', coordinates: NAGASAKI,
    tags: ['雷沙諾夫', '文化露寇', '北方防備'],
  },
  {
    id: 'evt_jp_phaeton_1808', year: 1808, yearDisplay: '西元 1808 年 (文化五年)',
    title: '費頓號事件',
    summary: '英國軍艦費頓號懸掛荷蘭國旗闖入長崎港，扣押荷蘭商館員並強索補給。',
    detail: '拿破崙戰爭期間荷蘭受法國控制，英艦為搜捕荷蘭船而進入長崎。長崎奉行所無力應對，只得提供薪水糧食，費頓號隨即離去。長崎奉行松平康英引咎切腹。事件促使幕府加強沿岸警備與英語學習。',
    locationNameAncient: '肥前國長崎', locationNameModern: '長崎縣長崎市', coordinates: NAGASAKI,
    tags: ['費頓號事件', '長崎', '松平康英'],
  },
  {
    id: 'evt_jp_gaikokusen_uchiharai_1825', year: 1825, yearDisplay: '西元 1825 年 (文政八年)',
    title: '頒布異國船打拂令',
    summary: '幕府下令各地對接近海岸的外國船隻一律砲擊驅離。',
    detail: '十九世紀初英國捕鯨船等頻繁出現在日本近海，1824 年發生英國船員登陸常陸大津濱與薩摩寶島的事件。幕府因而頒布此令，命令沿岸大名不問理由驅逐外國船，荷蘭與中國船除外。1842 年改為較緩和的薪水給與令。',
    locationNameAncient: '武藏國江戶', locationNameModern: '東京都千代田區', coordinates: EDO,
    tags: ['異國船打拂令', '海防', '鎖國'],
  },
  {
    id: 'evt_jp_siebold_incident_1828', year: 1828, yearDisplay: '西元 1828 年 (文政十一年)',
    title: '西博爾德事件',
    summary: '荷蘭商館醫師西博爾德離日前，被查出持有禁止攜出國外的日本地圖。',
    detail: '西博爾德在長崎開設鳴瀧塾傳授西洋醫學。1828 年歸國前，其行李中被發現幕府天文方高橋景保贈送的伊能忠敬系統地圖抄本等禁品。西博爾德於翌年被驅逐出境，高橋景保下獄死於獄中，多名相關人士受罰。',
    locationNameAncient: '肥前國長崎', locationNameModern: '長崎縣長崎市', coordinates: NAGASAKI,
    tags: ['西博爾德', '高橋景保', '伊能忠敬', '鳴瀧塾'],
  },
  {
    id: 'evt_jp_oshio_rebellion_1837', year: 1837, yearDisplay: '西元 1837 年 (天保八年)',
    title: '大鹽平八郎之亂',
    summary: '天保飢荒中，前大坂町奉行所與力大鹽平八郎為救濟貧民在大坂起兵，半日即被鎮壓。',
    detail: '大鹽平八郎是陽明學者，曾任大坂東町奉行所與力。他不滿奉行所在飢荒中仍將米運往江戶、富商囤積米糧，變賣藏書救濟貧民後，於 1837 年 2 月率門人與民眾起事，火燒大坂市街約五分之一。起事當天即被鎮壓，大鹽潛逃約四十天後自盡。前幕臣在幕府重鎮起兵，震動各地。',
    locationNameAncient: '攝津國大坂', locationNameModern: '大阪府大阪市', coordinates: [135.51, 34.69],
    tags: ['大鹽平八郎之亂', '大鹽平八郎', '天保大飢荒', '陽明學'],
  },
  {
    id: 'evt_jp_bansha_no_goku_1839', year: 1839, yearDisplay: '西元 1839 年 (天保十年)',
    title: '莫里森號事件與蠻社之獄',
    summary: '幕府依異國船打拂令砲擊來航的美國商船莫里森號，批評此事的蘭學者渡邊崋山、高野長英被捕。',
    detail: '1837 年莫里森號為送還日本漂流民並要求通商駛入浦賀與鹿兒島灣，均遭砲擊驅離。翌年得知實情後，渡邊崋山寫《慎機論》、高野長英寫《戊戌夢物語》批評幕府的對外政策。1839 年兩人被捕，崋山被命在故鄉田原蟄居，1841 年自盡；長英被判永牢，1844 年越獄逃亡，1850 年被捕時身亡。',
    locationNameAncient: '武藏國江戶', locationNameModern: '東京都', coordinates: EDO,
    tags: ['莫里森號事件', '蠻社之獄', '渡邊崋山', '高野長英'],
  },
  {
    id: 'evt_jp_tenpo_reforms_1841', year: 1841, yearDisplay: '西元 1841 年 (天保十二年)',
    title: '水野忠邦推行天保改革',
    summary: '老中水野忠邦推行嚴格節儉、解散株仲間等改革；得知鴉片戰爭消息後放寬對外國船的處置。',
    detail: '改革內容包括禁止奢侈、整頓風俗、解散株仲間以平抑物價、以人返令要求流入江戶的農民返鄉。1842 年得知清朝在鴉片戰爭中戰敗，改頒薪水給與令，准許供給漂流到日本的外國船燃料與食水。1843 年欲將江戶、大坂周邊土地收為幕府直轄的上知令遭到反對，水野隨即失勢，改革以失敗告終。',
    locationNameAncient: '武藏國江戶', locationNameModern: '東京都千代田區', coordinates: EDO,
    tags: ['天保改革', '水野忠邦', '薪水給與令', '上知令'],
  },
];

const LATE_BATTLES = [
  battle({
    id: 'bat_jp_menashi_1789', name: '國後目梨之戰 (愛努族起事)', year: 1789,
    locationAncient: '蝦夷地國後島、目梨', locationModern: '北海道目梨郡羅臼町、標津町一帶及國後島', coordinates: [145.13, 43.66],
    summary: '1789 年國後島與對岸目梨地方的愛努人，不滿和人商人在漁場的苛刻役使而起事，襲殺商人與船員，遭松前藩鎮壓。',
    attacker: {
      factionName: '國後、目梨的愛努人', faction: 'ainu',
      commanders: [],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認',
    },
    defender: {
      factionName: '松前藩', faction: 'edo',
      commanders: [],
      forcesEstimate: '待確認', casualtiesEstimate: '待確認（和人遇害人數各說不一）',
    },
    victor: 'defender',
    victorStatement: '松前藩派兵鎮壓，處決起事者',
    tactics: [
      '愛努方：在國後島與目梨各地同時襲擊漁場的和人',
      '松前藩：派兵至根室地方，透過愛努族首領交出起事者',
    ],
    strategicOutcome: '幕府注意到蝦夷地的統治問題與俄國南下的威脅，此後加強對東蝦夷地的調查與管理。',
    significance: '江戶時代最後一次大規模的愛努族武裝反抗。',
    eraId: 'jp_edo',
  }),
];

const LATE_FIGURES = [
  fig({
    id: 'fig_jp_kobayashi_issa', name: '小林一茶', lifeSpan: '1763 - 1828', clanTag: '俳諧', emblemChar: '茶', mainColor: '#4ade80', bgColor: '#052e16',
    role: '俳人', roleType: 'cultural', importance: 3, hometown: '信濃國柏原 (今長野縣信濃町)',
    shortBio: '農家出身，十五歲到江戶當學徒並學習俳諧。長年漂泊各地，晚年回到故鄉，與繼母、異母弟之間有遺產糾紛。作品多以平易語言描寫小動物與庶民生活，著有《我春集》（おらが春）等。',
    historicalSignificance: '與松尾芭蕉、與謝蕪村並稱江戶三大俳人。',
  }),
  fig({
    id: 'fig_jp_kyokutei_bakin', name: '曲亭馬琴', courtesyName: '本名瀧澤興邦', lifeSpan: '1767 - 1848', clanTag: '讀本', emblemChar: '琴', mainColor: '#c084fc', bgColor: '#2e1065',
    role: '讀本作家', roleType: 'cultural', importance: 3, hometown: '武藏國江戶 (今東京都)',
    shortBio: '旗本家臣之子，師事山東京傳。代表作《南總里見八犬傳》自 1814 年起刊行，歷時二十八年完成，晚年雙目失明後由媳婦代筆。',
    historicalSignificance: '江戶後期讀本文學的代表作家，被視為最早以稿費維生的日本職業作家之一。',
  }),
  fig({
    id: 'fig_jp_ninomiya_sontoku', name: '二宮尊德', courtesyName: '通稱金次郎', lifeSpan: '1787 - 1856', clanTag: '報德仕法', emblemChar: '德', mainColor: '#facc15', bgColor: '#422006',
    role: '農政家', roleType: 'advisor', importance: 3, hometown: '相模國足柄上郡栢山村 (今神奈川縣小田原市)',
    shortBio: '少年時父母雙亡，靠自力重建家業。後受小田原藩等委託，以勤勞、節儉、推讓為原則，重建各地荒廢的農村，其方法稱為「報德仕法」。晚年受幕府任用。',
    historicalSignificance: '近代日本以勤勉自修的典範廣為人知，各地學校曾普遍設置其負薪讀書像。',
  }),
  fig({
    id: 'fig_jp_oshio_heihachiro', name: '大鹽平八郎', courtesyName: '號中齋', lifeSpan: '1793 - 1837', clanTag: '陽明學', emblemChar: '鹽', mainColor: '#f87171', bgColor: '#450a0a',
    role: '陽明學者 / 前大坂町奉行所與力', roleType: 'scholar', importance: 3, hometown: '攝津國大坂 (今大阪府大阪市)',
    shortBio: '大坂東町奉行所與力，以清廉著稱，退職後開設私塾洗心洞講授陽明學。天保飢荒中不滿官府與富商的作為，1837 年起兵，失敗後潛逃約四十天自盡。',
    historicalSignificance: '前幕府官員在大坂起兵，對各地震撼甚大。',
  }),
  fig({
    id: 'fig_jp_mizuno_tadakuni', name: '水野忠邦', lifeSpan: '1794 - 1851', clanTag: '老中', emblemChar: '水', mainColor: '#60a5fa', bgColor: '#172554',
    role: '老中首座 / 天保改革主導者', roleType: 'ruler', importance: 3, hometown: '肥前國唐津藩 (今佐賀縣唐津市)',
    shortBio: '唐津藩主出身，為求進入幕府中樞自願轉封濱松藩。1841 年以老中首座推行天保改革，1843 年因上知令遭強烈反對而罷免，翌年一度復職，不久再度去職。',
    historicalSignificance: '江戶三大改革最後一次的主導者。',
  }),
  fig({
    id: 'fig_jp_watanabe_kazan', name: '渡邊崋山', lifeSpan: '1793 - 1841', clanTag: '田原藩', emblemChar: '崋', mainColor: '#94a3b8', bgColor: '#1e293b',
    role: '田原藩家老、畫家、蘭學者', roleType: 'scholar', importance: 3, hometown: '武藏國江戶田原藩邸 (今東京都)',
    shortBio: '三河田原藩士，以寫實的肖像畫聞名，作品《鷹見泉石像》為日本國寶。任家老期間致力藩政與海防，並與高野長英等人研究西洋知識。1839 年因著《慎機論》批評幕府對外政策，在蠻社之獄中被捕，蟄居田原期間於 1841 年自盡。',
    historicalSignificance: '江戶後期關心海外情勢的蘭學者與代表性畫家。',
  }),
  fig({
    id: 'fig_jp_siebold', name: '西博爾德', courtesyName: 'Philipp Franz von Siebold', lifeSpan: '1796 - 1866', clanTag: '荷蘭商館', emblemChar: '醫', mainColor: '#34d399', bgColor: '#022c22',
    role: '荷蘭商館醫師 / 博物學者', roleType: 'scholar', importance: 3, hometown: '德意志維爾茨堡',
    shortBio: '德國出身，1823 年以荷蘭商館醫師身分來到長崎，開設鳴瀧塾教授西洋醫學，門下包括高野長英等人。1828 年因攜帶禁止出境的日本地圖被查獲，翌年被驅逐。歸國後出版《日本》等著作。1859 年再度來日。',
    historicalSignificance: '向歐洲系統介紹日本的博物學者，也培育了許多日本蘭學者。',
  }),
  fig({
    id: 'fig_jp_takano_choei', name: '高野長英', lifeSpan: '1804 - 1850', clanTag: '蘭學', emblemChar: '長', mainColor: '#38bdf8', bgColor: '#082f49',
    role: '蘭方醫、蘭學者', roleType: 'scholar', importance: 3, hometown: '陸奧國水澤 (今岩手縣奧州市)',
    shortBio: '在長崎鳴瀧塾師事西博爾德。1838 年著《戊戌夢物語》批評幕府砲擊莫里森號，翌年在蠻社之獄中被判永牢。1844 年趁牢房火災越獄，改換姓名四處逃亡，1850 年在江戶被捕時身亡。',
    historicalSignificance: '蠻社之獄的代表人物，江戶後期重要的蘭學者。',
  }),
];

// Sources: ja.wikisource pages fetched 2026-10-31 whose text contains the date,
// author or subject the record relies on. No Wikisource text was found for the
// 1614 禁教令, 己酉約條 or 公事方御定書, so the early batch carries no sources.
const S = {
  kanseiIgaku: ws('〈寛政異学の禁〉（學派維持ノ儀ニ付申達，寛政二年）', '寛政異学の禁'),
  yumeMonogatari: ws('高野長英《戊戌夢物語》（1838 年）', '戊戌夢物語'),
  oshioGekibun: ws('〈大鹽平八郞檄文〉（1837 年）', '大鹽平八郞檄文'),
};
const SOURCES = {
  evt_jp_kansei_reforms_1787: [S.kanseiIgaku],
  evt_jp_bansha_no_goku_1839: [S.yumeMonogatari],
  evt_jp_oshio_rebellion_1837: [S.oshioGekibun],
  fig_jp_takano_choei: [S.yumeMonogatari],
  fig_jp_oshio_heihachiro: [S.oshioGekibun],
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
const edo = eras.find((e) => e.id === 'jp_edo');
const addBatch = (evts, bats, figs) => {
  assertNew(edo.keyEvents, evts);
  assertNew(battles, bats);
  assertNew(figures, figs);
  // Events naming no figure would otherwise fall back to the generic 東瀛名士 badge.
  edo.keyEvents.push(...evts.map((e) => withSources({ ...e, faction: 'edo' })));
  edo.keyEvents.sort((a, b) => a.year - b.year);
  edo.highlightFigures.push(...figs.map((f) => f.id));
  battles.push(...bats.map(withSources));
  figures.push(...figs.map(withSources));
  return bats.map((b) => b.id);
};

let battleIds;
if (batch === 'early') battleIds = addBatch(EARLY_EVENTS, EARLY_BATTLES, EARLY_FIGURES);
else if (batch === 'late') battleIds = addBatch(LATE_EVENTS, LATE_BATTLES, LATE_FIGURES);
else throw new Error('usage: early|late');

const eventCount = eras.reduce((n, e) => n + e.keyEvents.length, 0);
save('japanEras.js', 'JAPAN_ERAS', `// Japanese Historical Atlas Eras Dataset (${eras.length} Master Historical Eras with ${eventCount} Detailed Events)`, eras);
save('japanFigures.js', 'JAPAN_FIGURES', `// Japanese Historical Atlas Figures Dataset (${figures.length} Authoritative Figures)`, figures);
save('japanBattles.js', 'JAPAN_BATTLES', `// Japanese Historical Atlas Battles Dataset (${battles.length} Authoritative Epic Battles with Full Military Intelligence)`, battles);

// Battle-to-era mapping lives in index.js as a literal object (CRLF on disk).
const indexPath = path.join(dataDir, 'index.js');
const raw = fs.readFileSync(indexPath, 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
let index = raw.replace(/\r\n/g, '\n');
const re = /(  jp_edo: \[\n)([\s\S]*?)(\n  \])/;
if (!re.test(index)) throw new Error('jp_edo battle list not found in index.js');
index = index.replace(re, (_, a, body, c) => `${a}${body},\n${battleIds.map((id) => `    "${id}"`).join(',\n')}${c}`);
fs.writeFileSync(indexPath, index.replace(/\n/g, eol));
console.log(`batch ${batch}: events ${eventCount}, figures ${figures.length}, battles ${battles.length}`);
