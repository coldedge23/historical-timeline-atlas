// 二戰歐洲戰場地圖的城市標籤（規劃 docs/20261108_二戰歐洲戰場模組規劃_v8.md 第 7.2 節）。
// 點位：Natural Earth v5.1.2 ne_50m_populated_places_simple（公有領域），與 tests/fixtures/europewar_anchor_cities.json
// 同一份資料（scripts/build_europewar_basemap.mjs 下載並核對 SHA-256）；測試核對兩邊座標一致。
// 中文名稱：用當時名稱，現代名稱不同時加括號。名稱沿用本模組戰役與事件資料已使用的譯名，未對照官方譯名表
// （2026-11-08 Ivan 決定）。只收本模組資料已出現過的城市。
const NAME_SOURCE = '本專案慣用譯名（沿用本模組戰役與事件資料的寫法），未對照官方譯名表';

const city = (neName, name, lng, lat, labelSide = 'right') => ({ neName, name, lng, lat, labelSide, nameSource: NAME_SOURCE });

export const EUROPEWAR_MAP_CITIES = [
  city('London', '倫敦', -0.118668, 51.501941, 'left'),
  city('Paris', '巴黎', 2.352992, 48.858092),
  city('Berlin', '柏林', 13.399603, 52.523764),
  city('Warsaw', '華沙', 21.005347, 52.230872),
  city('Moscow', '莫斯科', 37.613577, 55.75411),
  city('Volgograd', '史達林格勒（今伏爾加格勒）', 44.498015, 48.711956),
  city('St.  Petersburg', '列寧格勒（今聖彼得堡）', 30.314074, 59.94096),
  city('Rome', '羅馬', 12.481313, 41.897902),
  city('Oslo', '奧斯陸', 10.748033, 59.918636),
  city('Kyiv', '基輔', 30.514682, 50.435313),
  city('Minsk', '明斯克', 27.564681, 53.901923),
  city('Kharkiv', '哈爾科夫', 36.248079, 50.001929),
  city('Belgrade', '貝爾格勒', 20.466045, 44.820591),
  city('Algiers', '阿爾及爾', 3.048607, 36.765011),
  city('Palermo', '巴勒摩', 13.348081, 38.126969),
  city('Budapest', '布達佩斯', 19.081375, 47.501952),
  city('Kaliningrad', '柯尼斯堡（今加里寧格勒）', 20.497343, 54.700006),
  city('Hamburg', '漢堡', 9.998053, 53.551971),
  city('Tunis', '突尼斯', 10.179678, 36.802778),
  city('Smolensk', '斯摩稜斯克', 32.047336, 54.782688),
  city('Bucharest', '布加勒斯特', 26.098001, 44.435318),
  city('Athens', '雅典', 23.731375, 37.985272),
  city('Lviv', '利沃夫', 24.029995, 49.83498),
];
