const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..', 'src', 'data', 'periods', 'yuanMing');

// 1. Demographics
const demographics = {
  periodId: 'yuanMing',
  title: '元明人口規模與社會結構變遷',
  summary: '大元混一四海、創設行省與澎湖巡檢司；大明洪武休養生息、萬曆盛世人口突破一億五千萬，海商開闢台灣笨港海防樞紐。',
  peakPopulation: '約 16,000 萬 (大明萬曆二十八年 1600 CE)',
  censusData: [
    { year: 1290, yearDisplay: '西元 1290 年 (元世祖至元二十七年)', total: '58,834,711', households: '13,196,206', note: '元朝官方統計之極盛，未計西域吐蕃與未附戶籍者' },
    { year: 1393, yearDisplay: '西元 1393 年 (明太祖洪武二十六年)', total: '60,545,812', households: '10,652,870', note: '大明立國經洪武休養生息，賦役黃冊與魚鱗圖冊清查' },
    { year: 1479, yearDisplay: '西元 1479 年 (明憲宗成化十五年)', total: '71,850,132', households: '11,480,240', note: '明代中期人口穩步增長，江南城鎮手工業繁榮' },
    { year: 1600, yearDisplay: '西元 1600 年 (明神宗萬曆二十八年)', total: '160,000,000', households: '約 2,200 萬 (估算)', note: '美洲作物引進番薯玉米推動人口爆炸，官冊因避稅匿報約6,000萬' }
  ],
  ethnicGroups: [
    { name: '漢民族 (農耕市井主體)', proportion: '88%', region: '兩京十三布政使司、中原江淮與東南沿海', traits: '科舉取士、理學心學傳播、市井白話小說繁盛、一條鞭法折銀' },
    { name: '蒙古部族 (草原騎射與八旗先驅)', proportion: '5%', region: '漠北草原、漠南察哈爾與遼東諸衛', traits: '千戶百戶制、北元殘部與瓦剌韃靼爭雄、俺答汗封貢互市' },
    { name: '回回/色目群體 (西域經貿軍政)', proportion: '3%', region: '西北陝甘、大都北京、雲南及泉州海港', traits: '掌算曆法財賦、鄭和下西洋航海世家、雲南咸陽王賽典赤後裔' },
    { name: '女真/滿洲諸部 (白山黑水崛起)', proportion: '2%', region: '奴兒干都司、建州衛與海西野人女真', traits: '努爾哈赤創八旗制度、滿漢一體推動後金崛起' },
    { name: '苗瑤壯彝土家族 (西南各部族)', proportion: '1.5%', region: '雲貴川湖廣廣西山區土司轄境', traits: '土司制度、改土歸流、播州楊氏及水西奢安土酋' },
    { name: '東番高山諸族 (台灣原住民族)', proportion: '0.5%', region: '台灣全島、澎湖三十六嶼與大員', traits: '南島語系獵鹿農耕、澎湖巡檢司設立、海商顏思齊鄭芝龍結寨開墾' }
  ]
};

// 2. Territories
const territories = {
  yuanPeak: {
    year: '西元 1311 年 (大元至大年間極盛)',
    name: '大元帝國極盛版圖',
    description: '大元北逾陰山北海，東瀕大海，南控南海諸島，設澎湖巡檢司管轄澎湖及台灣海峽，宣政院管轄吐蕃，十行省縱橫萬里。'
  },
  mingPeak: {
    year: '西元 1413 年 (大明永樂盛世疆域)',
    name: '大明永樂兩京十三省版圖',
    description: '大明設南北直隸與十三布政使司，東北置奴兒干都司，西北設關西八衛，西南設烏斯藏都司，海防設衛所與澎湖巡檢司。'
  }
};

fs.writeFileSync(path.join(dir, 'demographics.js'), 'export const YUAN_MING_DEMOGRAPHICS = ' + JSON.stringify(demographics, null, 2) + ';\n', 'utf8');
fs.writeFileSync(path.join(dir, 'territories.js'), 'export const YUAN_MING_TERRITORIES = ' + JSON.stringify(territories, null, 2) + ';\n', 'utf8');
console.log('Created demographics.js & territories.js');
