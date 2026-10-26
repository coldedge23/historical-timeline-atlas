const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'taiwanLensData.js');
let fileText = fs.readFileSync(filePath, 'utf8');
const { TAIWAN_RELATED_BATTLES } = require(filePath);

const PRECISION_UPDATES = {
  bat_tw_caiqian_1805: {
    attackerForces: "大清福建水師各型戰船百餘艘，兵力約 8,000 人",
    attackerCas: "陣亡提督李長庚，數百官兵死傷，王得祿受傷依然追擊",
    defenderForces: "蔡牽艦隊巨型大船及改裝砲船百餘艘，海盜萬餘人",
    defenderCas: "蔡牽旗艦被王得祿火砲擊穿沉沒，蔡牽攜妻帶子開砲沉海自盡，餘黨潰散"
  },
  bat_tw_mudanshe_1874: {
    attackerForces: "大日本帝國陸軍中佐佐久間左馬太率部 3,658 人 (運輸艦與砲艦 4 艘支援)",
    attackerCas: "石門之戰戰死 12 人，但因熱帶風土瘧疾死者達 561 人",
    defenderForces: "排灣族牡丹社、高士佛社部落勇士約 300 - 500 人",
    defenderCas: "戰死約 30 餘人，頭目阿祿古父子壯烈陣亡，其餘部落隱入深山"
  },
  bat_tw_keelung_1884: {
    attackerForces: "法國遠東艦隊海軍陸戰隊及艦隊水兵約 2,000 人 (裝甲艦 5 艘砲火支援)",
    attackerCas: "獅球嶺攻防戰陣亡與負傷數百人，法軍無法越過基隆山脊一步",
    defenderForces: "淮軍守備部隊與霧峰林家林朝棟「棟軍」鄉勇約 4,000 人",
    defenderCas: "傷亡約 300 - 400 人，成功扼守獅球嶺咽喉要塞確保臺北府城安全"
  },
  bat_tw_tamsui_1884: {
    attackerForces: "法國遠東艦隊海軍陸戰隊 800 - 1,000 人 (戰艦 5 艘狂轟砲火掩護登陸)",
    attackerCas: "陣亡 17 人，負傷 49 人，法軍狼狽逃回登陸艇撤退",
    defenderForces: "提督孫開華恪靖軍、章高元淮軍與張李成義民軍約 3,000 人",
    defenderCas: "陣亡 80 餘人，負傷 200 餘人，取得中法戰爭難得之陸戰大捷"
  },
  bat_tw_aodi_landing_1895: {
    attackerForces: "近衛師團步兵聯隊及海軍艦隊約 7,000 人",
    attackerCas: "三貂角伏擊戰死傷數十人",
    defenderForces: "簡大獅義軍、在地客閩民防鄉勇千餘人",
    defenderCas: "傷亡百餘人，邊戰邊撤退入三貂嶺山區開展游擊戰"
  },
  bat_tw_daxi_1895: {
    attackerForces: "近衛師團步兵聯隊坊城少佐大隊約 1,200 人",
    attackerCas: "安平鎮與大嵙崁峽谷遭伏擊死傷百餘人，坊城少佐狼狽求援",
    defenderForces: "徐驤客家義軍、江國榮民軍約 5,000 人",
    defenderCas: "陣亡約 200 餘人，成功阻滯日軍南進步伐近半月"
  },
  bat_tw_baguashan_1895: {
    attackerForces: "近衛師團第一旅團與第二旅團主力約 15,000 人 (大砲 30 門)",
    attackerCas: "陣亡逾千人，第二旅團長山根信成少將負傷後染疾殞命",
    defenderForces: "吳湯興客家義民軍、徐驤秀才軍、吳彭年黑旗軍七星隊約 3,600 - 5,000 人",
    defenderCas: "陣亡約 4,000 - 5,000 人，吳湯興、吳彭年壯烈殉國，八卦山血染草木"
  },
  bat_tw_dapu_lin_1895: {
    attackerForces: "第二師團第四聯隊先鋒步兵大隊千餘人",
    attackerCas: "遭竹林地雷伏擊死傷近百人",
    defenderForces: "黑旗軍營官楊泗洪率部及雲林抗日義民三千餘人",
    defenderCas: "營官楊泗洪英勇中彈殉國，義軍傷亡百餘人後退守他里霧"
  },
  bat_tw_buyuelou_1895: {
    attackerForces: "第二師團乃木希典中將率登陸步兵聯隊約 6,000 人",
    attackerCas: "遭步月樓堅固客家圍堡狙擊死傷百餘人",
    defenderForces: "六堆客家抗日義軍 (左堆總理蕭光明率鄉勇約 2,000 人)",
    defenderCas: "蕭光明次子蕭昇祥等壯烈戰死，陣亡數百人，步月樓化為焦土"
  },
  bat_tw_zengwenxi_1895: {
    attackerForces: "近衛師團本隊及第二師團合圍主力約 20,000 人",
    attackerCas: "遭河道泥沼伏擊死傷數百人",
    defenderForces: "徐驤田賦軍與黑旗軍殘部約千餘人",
    defenderCas: "抗日第一烈士徐驤身中數彈壯烈成仁，義軍彈盡全線覆滅"
  },
  bat_tw_tapani_1915: {
    attackerForces: "臺灣總督府警察隊、憲兵隊及步兵第二聯隊約 2,500 人",
    attackerCas: "虎頭山前哨戰警察隊死傷數十人",
    defenderForces: "余清芳、江定率南臺灣農民信仰起義軍約 2,000 - 3,000 人",
    defenderCas: "遭日軍近代野戰重砲掃射戰死千餘人，事後八百餘人被判死刑"
  },
  bat_tw_wushe_1930: {
    attackerForces: "臺灣軍司令部步兵聯隊、警察隊 1,300 人 (出動大砲、飛機與毒氣彈)",
    attackerCas: "霧社公學校事件及山地圍剿戰死 28 人，負傷 26 人",
    defenderForces: "賽德克族馬赫坡等六社原住民族勇士約 1,200 人 (全族男女老幼 1,236 人)",
    defenderCas: "戰死及斷崖自縊殉難 644 人，頭目莫那·魯道於斷崖深處飲彈自盡"
  },
  bat_tw_guningtou_1949: {
    attackerForces: "中國人民解放軍第二十八軍登陸部隊三個團約 9,086 人",
    attackerCas: "全軍覆滅，陣亡 3,873 人，被俘 5,175 人 (登陸船隻全數被焚)",
    defenderForces: "中華民國國軍第十二兵團、金防部守軍約 40,000 人 (M5A1 金門之熊戰車隊)",
    defenderCas: "陣亡 1,267 人，負傷 1,982 人"
  },
  bat_tw_daerdan_1950: {
    attackerForces: "中國人民解放軍第八十六師二五八團加強營 700 餘人",
    attackerCas: "陣亡 300 餘人，被俘 252 人，大二膽登陸突擊全線受挫",
    defenderForces: "中華民國陸軍第七十五師第二二五團第一營 (史恆豐少校營長率不到 300 守軍)",
    defenderCas: "陣亡 18 人，負傷 41 人，創立以寡擊眾完全防衛戰蹟"
  },
  bat_tw_nanri_1952: {
    attackerForces: "中華民國金門防衛司令部突擊支隊 (胡璉司令官指揮陸空協同約 9,000 人)",
    attackerCas: "陣亡 150 餘人，負傷 200 餘人",
    defenderForces: "中國人民解放軍南日島守備營及後續增援部隊約 2,000 人",
    defenderCas: "陣亡 800 餘人，被俘 700 餘人，南日島守備全損"
  },
  bat_tw_yijiangshan_1955: {
    attackerForces: "中國人民解放軍海陸空三軍突擊部隊約 10,000 人 (飛機 184 架次, 艦艇 137 艘)",
    attackerCas: "陣亡 393 人，負傷 1,027 人",
    defenderForces: "中華民國一江山守備司令部 (王生明司令官率浙江反共救國軍 1,030 人)",
    defenderCas: "全島守軍戰至最後一人，陣亡 720 人，負傷被俘 310 人，王生明引爆手榴彈殉國"
  },
  bat_tw_823_1958: {
    attackerForces: "中國人民解放軍福建前線砲兵部隊 30 個營，各型巨砲 568 門 (發射砲彈 47 萬發)",
    attackerCas: "遭金門守軍八吋巨砲等反擊火網壓制，砲兵陣地受創數百人死傷",
    defenderForces: "中華民國金門防衛司令部約 85,000 人，砲兵各營及美援 240 巨砲、八吋榴彈砲",
    defenderCas: "陣亡 440 人，負傷 1,911 人 (副司令官吉星文、趙家驤、章傑殉國)"
  },
  bat_tw_wuchiu_1965: {
    attackerForces: "中國人民解放軍海軍快艇第 6 大隊高速護衛艇及魚雷艇 16 艘",
    attackerCas: "快艇被擊沉 2 艘，負傷受創 2 艘，數十人死傷",
    defenderForces: "中華民國海軍巡邏編隊 (臨淮艦、山海艦)",
    defenderCas: "臨淮艦遭四枚魚雷命中沉沒，陣亡 19 人，失蹤 72 人，14 人獲美軍救起"
  }
};

TAIWAN_RELATED_BATTLES.forEach(b => {
  const p = PRECISION_UPDATES[b.id];
  if (p) {
    if (!b.attacker) b.attacker = {};
    if (!b.defender) b.defender = {};
    b.attacker.forcesEstimate = p.attackerForces;
    b.attacker.casualtiesEstimate = p.attackerCas;
    b.defender.forcesEstimate = p.defenderForces;
    b.defender.casualtiesEstimate = p.defenderCas;
  }
});

const exportRegex = /export\s+const\s+TAIWAN_RELATED_BATTLES\s*=\s*\[[\s\S]*?\];/;
const newBattlesCode = `export const TAIWAN_RELATED_BATTLES = ${JSON.stringify(TAIWAN_RELATED_BATTLES, null, 2)};`;

fileText = fileText.replace(exportRegex, newBattlesCode);
fs.writeFileSync(filePath, fileText, 'utf8');
console.log("Successfully refined Taiwan battles with precise troop numbers and casualty figures!");
