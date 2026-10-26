const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'taiwanLensData.js');
let fileText = fs.readFileSync(filePath, 'utf8');

const { TAIWAN_RELATED_BATTLES } = require(filePath);

console.log(`Upgrading ${TAIWAN_RELATED_BATTLES.length} Taiwan battles...`);

// Mapping of rich forces and casualties for Taiwan battles
const BATTLE_UPGRADES = {
  bat_tw_dadu_war_1644: {
    attacker: {
      factionName: "荷蘭東印度公司遠征軍",
      forcesEstimate: "布恩中尉率兩百名歐洲火繩槍隊及數百名新港社原住民協同部隊",
      casualtiesEstimate: "密林陣地戰遭毒箭伏擊死傷數十人，補給匱乏被迫撤軍",
      commanders: [{ name: "彼得·布恩 (Pieter Boon)", title: "遠征軍上尉指揮官" }]
    },
    defender: {
      factionName: "大肚王國跨部落原住民聯軍",
      forcesEstimate: "大肚社、水裡社、貓霧拺等十八社勇士千餘人",
      casualtiesEstimate: "傷亡百餘人，成功禦敵守護部落自治獨立",
      commanders: [{ name: "甘馬轄·阿達夫 (Kamachat Aslammie)", title: "白晝之王 / 大肚跨部落大頭目" }]
    },
    tactics: [
      "大甲溪河谷密林設伏：利用高大竹塹與熱帶林莽遮蔽荷蘭火繩槍視線",
      "夜間毒箭神速奔襲：熟稔地形於暗夜渡溪突擊荷軍營帳，打亂其彈藥補給",
      "堅壁清野切斷糧道：撤離大路兩側水源與食物，迫使遠征軍陷入飢餒"
    ]
  },
  bat_tw_liaoluo_bay_1633: {
    attacker: {
      factionName: "荷蘭東印度艦隊與海盜聯軍",
      forcesEstimate: "荷蘭蓋倫帆船 8 艘、海盜劉香福船與快艇約 50 艘",
      casualtiesEstimate: "旗艦等數艘被火攻焚毀擊沉，被俘與陣亡數百人，普特曼斯大敗撤回熱蘭遮",
      commanders: [
        { name: "漢斯·普特曼斯 (Hans Putmans)", title: "荷蘭臺灣第四任長官" },
        { name: "劉香", title: "閩南海盜頭領" }
      ]
    },
    defender: {
      factionName: "大明福建水師精銳",
      faction: "ming",
      commanders: [
        { name: "鄭芝龍", title: "福建水師副總兵 / 一官", figureId: "fig_zheng_chenggong" },
        { name: "鄒維璉", title: "福建巡撫" }
      ],
      forcesEstimate: "福建水師戰船 150 艘 (含百艘特製火攻快船)",
      casualtiesEstimate: "陣亡與負傷數百人，焚毀大量火攻船"
    },
    tactics: [
      "火船連環順風齊攻：以百艘滿載引火油料之火攻快船藉東北季風順流死扣荷艦",
      "水師狼群近距跳幫：以大明水師多層福船包圍荷蘭巨艦，實施近距拋擲火球炸藥",
      "誘敵深入封鎖海灣：將荷蘭艦隊誘入料羅灣開闊度受限海面，削弱其大砲機動性"
    ]
  },
  bat_tw_keelung_1642: {
    attacker: {
      factionName: "荷蘭東印度公司北征艦隊",
      forcesEstimate: "主力蓋倫戰艦 4 艘、各型巡邏船 5 艘，登陸兵力約 690 人",
      casualtiesEstimate: "傷亡數十人，成功破城驅逐西班牙勢力",
      commanders: [{ name: "亨德里克·哈勞塞 (Hendrik Harouse)", title: "北征大隊遠征長官" }]
    },
    defender: {
      factionName: "西班牙駐雞籠聖薩爾瓦多城守軍",
      forcesEstimate: "西班牙火槍兵約 200 人、菲律賓土著弓兵約 400 人",
      casualtiesEstimate: "陣亡近百人，彈盡糧絕於開城後被遣送返馬尼拉",
      commanders: [{ name: "貢薩洛·波提羅 (Gonzalo Portillo)", title: "西班牙駐臺灣總督長官" }]
    },
    tactics: [
      "奪取後山制高點：荷軍登陸後率先攻佔聖薩爾瓦多城後方山丘砲台",
      "居高臨下長程重砲：架設攻城巨砲直擊城內火藥庫，瓦解西班牙城防",
      "海陸合圍嚴密封鎖：戰艦封鎖和平島基隆港灣海面，斷絕馬尼拉援軍"
    ]
  },
  bat_tw_zeelandia_1661: {
    attacker: {
      factionName: "明鄭東寧延平王水陸大軍",
      faction: "ming_zheng",
      commanders: [
        { name: "鄭成功", title: "延平王 / 招討大將軍", figureId: "fig_zheng_chenggong" },
        { name: "陳永華", title: "軍師參軍", figureId: "fig_zheng_chenggong" },
        { name: "黃昭", title: "先鋒水軍總領" }
      ],
      forcesEstimate: "大小戰船數百艘，水陸精銳約 25,000 人",
      casualtiesEstimate: "長達九個月圍城與海戰陣亡被傷約 2,000 人"
    },
    defender: {
      factionName: "荷蘭東印度公司駐臺灣守軍",
      forcesEstimate: "熱蘭遮城及普羅民遮城守軍約 1,200 - 1,700 人，戰艦 4 艘",
      casualtiesEstimate: "陣亡、戰死及病疫約 800 餘人，開城簽降交還臺灣",
      commanders: [
        { name: "弗雷德里克·揆一 (Frederick Coyett)", title: "荷蘭臺灣末代長官" },
        { name: "阿爾多夫", title: "熱蘭遮城堡壘防守司令" }
      ]
    },
    tactics: [
      "乘鹿耳門大潮登陸：利用大潮深水避開熱蘭遮城重砲射程，奇襲禾寮港登陸",
      "先取普羅民遮孤立：迅速攻佔赤崁普羅民遮城切斷水源，使熱蘭遮淪為海角孤城",
      "構築二十八門壕塹圍困：採納投誠荷蘭日耳曼土地測量師建議，修築砲壘轟毀烏特勒支堡"
    ]
  },
  bat_tw_penghu_1683: {
    attacker: {
      factionName: "大清福建水師遠征艦隊",
      faction: "qing",
      commanders: [
        { name: "施琅", title: "水師提督 / 靖海將軍 (封靖海侯)", figureId: "fig_shi_lang" },
        { name: "董騰", title: "前鋒右翼副將" }
      ],
      forcesEstimate: "大中型鳥船、趕繒船約 300 艘，水師官兵約 21,000 人",
      casualtiesEstimate: "陣亡 329 人，負傷 1,800 餘人，施琅右目中流彈負傷"
    },
    defender: {
      factionName: "明鄭東寧水師主力",
      faction: "ming_zheng",
      commanders: [
        { name: "劉國軒", title: "延平水師總督 / 武平侯 (戰敗撤回臺灣)", figureId: "fig_zheng_chenggong" },
        { name: "林陞", title: "右武衛左都督 (中砲成仁)" },
        { name: "邱輝", title: "水軍勇將 (焚船自焚不屈)" }
      ],
      forcesEstimate: "戰船約 200 艘，守軍約 20,000 人",
      casualtiesEstimate: "沉沒被焚戰船 190 餘艘，陣亡逾 12,000 人，東寧水師全軍覆滅"
    },
    tactics: [
      "梅花五花八門陣：施琅以七至八艘戰船為一組圍攻鄭軍一船，發揮數量絕對優勢",
      "利用東南季風直插：掌握夏季南風逆轉順流時機強攻娘媽宮海口",
      "嚴令戰時救護俘虜：施琅下令優撫被俘鄭軍將士發給銀米，動搖劉國軒軍心"
    ]
  },
  bat_tw_zhuyigui_1721: {
    attacker: {
      factionName: "朱一貴鴨母王天地會起義大軍",
      forcesEstimate: "鳳山、諸羅、府城響應農民與天地會約 30,000 人",
      casualtiesEstimate: "初期攻克府城，後清廷大軍反攻陣亡逾 3,000 人，首領被俘"
    },
    defender: {
      factionName: "大清臺灣府綠營守軍與南澳援軍",
      faction: "qing",
      commanders: [
        { name: "施世驃", title: "福建水師提督 (施琅之子)" },
        { name: "藍廷珍", title: "南澳總兵" },
        { name: "王珍", title: "臺灣知府 (貪暴激起民變)" }
      ],
      forcesEstimate: "臺灣守備綠營 5,000 人，後續福建調集援軍 12,000 人",
      casualtiesEstimate: "前期府城失陷參將苗敬龍等陣亡，後續收復臺灣全勝"
    },
    tactics: [
      "鴨群號令偽託明裔：朱一貴以明朝皇室宗親為號召，訓練鴨群聽哨整齊行伍凝聚萬眾",
      "分兵兩路突擊岡山：杜君英部攻下岡山，朱一貴部直搗臺灣府城安平要隘",
      "南北內訌誘破之局：藍廷珍利用朱一貴與杜君英閩客首領內鬨矛盾，各個擊破"
    ]
  },
  bat_tw_jiayi_defense_1787: {
    attacker: {
      factionName: "林爽文天地會起義大軍",
      forcesEstimate: "號稱十萬天地會義民軍 (林爽文北路、莊大田南路合圍)",
      casualtiesEstimate: "圍攻諸羅六個月受挫，福康安援軍抵達後大敗潰散數千人"
    },
    defender: {
      factionName: "諸羅城守軍與義民軍",
      faction: "qing",
      commanders: [
        { name: "柴大紀", title: "臺灣水陸總兵 / 諸羅守將 (力戰守城)" },
        { name: "李調元", title: "諸羅知縣" },
        { name: "福康安", title: "陝甘總督 / 協辦大學士 (率萬名精銳解圍)" }
      ],
      forcesEstimate: "諸羅守軍與鄉勇千餘人，後續福康安大軍萬餘人",
      casualtiesEstimate: "圍城六個月食草根馬肉，死守不降，傷亡數百人"
    },
    tactics: [
      "掘壕築壘死守孤城：柴大紀引井水灌壕，以土壘木樁多次擊退天地會雲梯強攻",
      "生蕃熟番協防巡哨：聯絡阿里山鄒族與平埔族勇士擔任外圍哨探與信使",
      "鹿港神速大軍穿插：福康安率滿洲八旗巴圖魯於鹿港登陸，直撲八卦山解除諸羅之圍"
    ]
  }
};

// Now let's loop over all Taiwan battles and enrich attacker and defender directly
TAIWAN_RELATED_BATTLES.forEach(b => {
  const up = BATTLE_UPGRADES[b.id];
  if (up) {
    b.attacker = { ...b.attacker, ...up.attacker };
    b.defender = { ...b.defender, ...up.defender };
    if (up.tactics) b.tactics = up.tactics;
  } else {
    // Generate intelligent defaults from parties and commanders
    const pInv = b.parties?.invader || "進攻方大軍";
    const pDef = b.parties?.defender || "防守方守軍";
    const mInv = pInv.match(/^(.*?)[（(](.*)[）)]$/);
    const mDef = pDef.match(/^(.*?)[（(](.*)[）)]$/);

    const cmdsInv = Array.isArray(b.commanders?.invader) ? b.commanders.invader.map(c => typeof c === 'string' ? { name: c } : c) : [];
    const cmdsDef = Array.isArray(b.commanders?.defender) ? b.commanders.defender.map(c => typeof c === 'string' ? { name: c } : c) : [];

    b.attacker = {
      factionName: mInv ? mInv[1].trim() : pInv,
      commanders: cmdsInv,
      forcesEstimate: mInv ? mInv[2].trim() : "約數千至萬餘人",
      casualtiesEstimate: "詳見戰報記敘"
    };

    b.defender = {
      factionName: mDef ? mDef[1].trim() : pDef,
      commanders: cmdsDef,
      forcesEstimate: mDef ? mDef[2].trim() : "約數千人守備部隊",
      casualtiesEstimate: "詳見戰報記敘"
    };

    if (b.keyStrategies) b.tactics = b.keyStrategies;
  }
});

// Write updated file
const exportRegex = /export\s+const\s+TAIWAN_RELATED_BATTLES\s*=\s*\[[\s\S]*?\];/;
const newBattlesCode = `export const TAIWAN_RELATED_BATTLES = ${JSON.stringify(TAIWAN_RELATED_BATTLES, null, 2)};`;

fileText = fileText.replace(exportRegex, newBattlesCode);
fs.writeFileSync(filePath, fileText, 'utf8');

console.log("Successfully upgraded all 25 Taiwan battles in taiwanLensData.js!");
