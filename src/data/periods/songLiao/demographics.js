// Demographic census records, population distribution, and multi-ethnic integration for Song, Liao, Jin, and Western Xia (960 - 1279 CE)
export const SONG_LIAO_DEMOGRAPHICS = {
  year: '西元 960 — 1279 年',
  eraName: '兩宋遼金夏蒙多民族爭鳴時期',
  estimatedTotalPopulation: '北宋極盛逾 1.1 億人，金朝達 5,350 萬人，南宋達 6,500 萬人',
  commentary: '宋代為華夏歷史上人口突破一億大關之空前繁盛期。水稻早熟品種占城稻推廣、梯田開墾、南方市鎮商業繁華與海上絲路鼎盛，促成江南經濟重心徹底確立。同時代北方大遼、女真金朝與西夏黨項各建法制，多民族並峙深度融會，文化科技與海外貿易達到古代文明最高峰。',
  dataPoints: [
    {
      regimeName: '北宋 (大觀四年·官方戶籍極盛)',
      name: '北宋 (大觀四年·官方戶籍極盛)',
      population: '約 110,000,000 人（主客口數計）',
      households: '20,882,258 戶',
      armyCount: '禁軍與廂軍合計約 1,200,000 人',
      officialsCount: '文武內外官員約 40,000 員',
      source: '《宋史·地理志》《文獻通考·戶口考》'
    },
    {
      regimeName: '大金帝國 (泰和七年·戶口巔峰)',
      name: '大金帝國 (泰和七年·戶口巔峰)',
      population: '53,532,151 人',
      households: '8,413,164 戶',
      armyCount: '猛安謀克軍與漢軍約 700,000 人',
      officialsCount: '內外百官約 32,000 員',
      source: '《金史·地理志》《三朝北盟會編》'
    },
    {
      regimeName: '南宋 (淳熙十三年·東南半壁)',
      name: '南宋 (淳熙十三年·東南半壁)',
      population: '約 65,000,000 人',
      households: '12,986,520 戶',
      armyCount: '御前諸軍與各司大軍約 400,000 人',
      officialsCount: '朝廷文武官員約 25,000 員',
      source: '《宋史·食貨志》《建炎以來朝野雜記》'
    },
    {
      regimeName: '大遼國 (清寧九年·五京版圖)',
      name: '大遼國 (清寧九年·五京版圖)',
      population: '約 9,000,000 人（契丹、漢人、渤海人）',
      households: '約 1,600,000 戶',
      armyCount: '宮衛騎兵與部族軍約 350,000 騎',
      officialsCount: '南面官與北面官系統約 12,000 員',
      source: '《遼史·兵衛志》《遼史·百官志》'
    },
    {
      regimeName: '大夏國 (西夏·天盛年間)',
      name: '大夏國 (西夏·天盛年間)',
      population: '約 3,000,000 人',
      households: '約 600,000 戶',
      armyCount: '鐵鷂子、步跋子、強弩軍約 300,000 人',
      officialsCount: '番漢中書省六部約 4,500 員',
      source: '《西夏書事》《天盛改舊新定律令》'
    }
  ],
  ethnicGroups: [
    {
      name: '契丹族（大遼國）',
      distributionRegion: '上京臨潢府、中京大定府、燕雲十六州、遼河流域',
      relationshipWithRegime: '建立大遼國，實行「因俗而治」之北面官治契丹、南面官治漢人之二元政治體制；與北宋締結澶淵之盟，維持長達百餘年之和平朝貢與互市繁榮。'
    },
    {
      name: '女真族（生女真與熟女真）',
      distributionRegion: '長白山白山黑水、按出虎水、會寧府（阿城）、中原燕京與開封',
      relationshipWithRegime: '完顏阿骨打起兵反遼建立金朝，以猛安謀克制度動員全國軍民，滅遼破北宋入主中原；後推行深度漢化與科舉制度，尊孔重儒，開創大定之治。'
    },
    {
      name: '黨項羌族（西夏國）',
      distributionRegion: '靈州、夏州、興慶府（銀川）、河西走廊瓜沙二州',
      relationshipWithRegime: '李元昊脫離宋藩稱帝建立大夏國，創制西夏文，創立鐵鷂子重裝鐵騎；扼守絲綢之路要道，宋夏慶曆年間三戰大勝，迫宋每年賜予歲幣茶彩。'
    },
    {
      name: '漢族（兩宋與北方遺民）',
      distributionRegion: '黃河流域、江淮、兩浙、兩湖、巴蜀、福建、廣東與澎湖臺灣',
      relationshipWithRegime: '兩宋主體民族。市鎮民庶、士大夫與海外商賈階層崛起，文人政治與科舉制度登峰造極，理學思想傳承千年，南渡江南使臨安、泉州成為世界第一大商港。'
    },
    {
      name: '大理白蠻與烏蠻（大理國）',
      distributionRegion: '雲南蒼山洱海、大理府、滇東南及緬甸邊陲',
      relationshipWithRegime: '段思平建立大理國，尊崇佛教，政治安和，與兩宋保持優良朝貢與茶馬互市關係，數百年未生大戰，保全西南邊陲寧靜。'
    },
    {
      name: '蒙古族（草原諸部與大蒙古國）',
      distributionRegion: '斡難河、克魯倫河、呼倫貝爾草原、和林',
      relationshipWithRegime: '成吉思汗鐵木真於 1206 年統一蒙古各部，創立千戶制與怯薛軍，引發橫跨歐亞之軍事西征與南下滅金、降夏、滅宋之歷史巨浪。'
    }
  ]
};
