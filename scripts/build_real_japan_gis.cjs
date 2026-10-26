// Script to build authentic 47-prefecture GIS vector data from official Japan TopoJSON
const https = require('https');
const vm = require('vm');
const fs = require('fs');
const path = require('path');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Proportional Mercator Projection tuned for 820 x 720 canvas
function project(lng, lat, width = 820, height = 720, centerLng = 137.5, centerLat = 37.8, scale = 1700) {
  const rad = Math.PI / 180;
  const lambda = (lng - centerLng) * rad;
  const phi = lat * rad;
  const centerPhi = centerLat * rad;

  const x = width / 2 + scale * lambda;
  const y = height / 2 - scale * (Math.log(Math.tan(Math.PI / 4 + phi / 2)) - Math.log(Math.tan(Math.PI / 4 + centerPhi / 2)));
  return [Number(x.toFixed(1)), Number(y.toFixed(1))];
}

// Simplify ring by dropping redundant sub-pixel points
function simplifyRing(coords, minDistance = 0.75) {
  if (coords.length <= 4) return coords;
  const result = [coords[0]];
  let lastPt = project(coords[0][0], coords[0][1]);
  for (let i = 1; i < coords.length - 1; i++) {
    const pt = project(coords[i][0], coords[i][1]);
    const distSq = (pt[0] - lastPt[0]) ** 2 + (pt[1] - lastPt[1]) ** 2;
    if (distSq >= minDistance * minDistance) {
      result.push(coords[i]);
      lastPt = pt;
    }
  }
  result.push(coords[coords.length - 1]);
  return result;
}

function coordsToSvgPath(coords, minDistance = 0.75, filterFarSouth = false) {
  if (!coords || coords.length === 0) return '';
  if (typeof coords[0][0] === 'number') {
    // For Kagoshima, filter out very distant southern islands below lat 30.0 (Amami/Tokara) to keep canvas focused
    if (filterFarSouth) {
      const avgLat = coords.reduce((acc, pt) => acc + pt[1], 0) / coords.length;
      if (avgLat < 30.2) return '';
    }
    const simplified = simplifyRing(coords, minDistance);
    return simplified.map((pt, i) => {
      const [px, py] = project(pt[0], pt[1]);
      return (i === 0 ? 'M ' : 'L ') + px + ',' + py;
    }).join(' ') + ' Z';
  } else {
    return coords.map(c => coordsToSvgPath(c, minDistance, filterFarSouth)).filter(Boolean).join(' ');
  }
}

// Prefectures mapping to romanized keys and historical info
const PREFECTURE_META = {
  1: { key: 'hokkaido', name: '北海道 (蝦夷地)', kanji: '蝦夷' },
  2: { key: 'aomori', name: '青森縣 (陸奧津輕)', kanji: '津輕' },
  3: { key: 'iwate', name: '岩手縣 (陸奧南部)', kanji: '陸奧' },
  4: { key: 'miyagi', name: '宮城縣 (陸奧仙台)', kanji: '仙台' },
  5: { key: 'akita', name: '秋田縣 (出羽秋田)', kanji: '秋田' },
  6: { key: 'yamagata', name: '山形縣 (出羽最上)', kanji: '最上' },
  7: { key: 'fukushima', name: '福島縣 (會津·磐城)', kanji: '會津' },
  8: { key: 'ibaraki', name: '茨城縣 (常陸水戶)', kanji: '水戶' },
  9: { key: 'tochigi', name: '栃木縣 (下野日光)', kanji: '日光' },
  10: { key: 'gunma', name: '群馬縣 (上野箕輪)', kanji: '上野' },
  11: { key: 'saitama', name: '埼玉縣 (武藏忍城)', kanji: '武藏' },
  12: { key: 'chiba', name: '千葉縣 (下總·安房)', kanji: '房總' },
  13: { key: 'tokyo', name: '東京都 (武藏江戶)', kanji: '江戶' },
  14: { key: 'kanagawa', name: '神奈川縣 (相模小田原)', kanji: '相模' },
  15: { key: 'niigata', name: '新潟縣 (越後春日山)', kanji: '越後' },
  16: { key: 'toyama', name: '富山縣 (越中富山)', kanji: '越中' },
  17: { key: 'ishikawa', name: '石川縣 (加賀·能登)', kanji: '加賀' },
  18: { key: 'fukui', name: '福井縣 (越前北之莊)', kanji: '越前' },
  19: { key: 'yamanashi', name: '山梨縣 (甲斐甲府)', kanji: '甲斐' },
  20: { key: 'nagano', name: '長野縣 (信濃川中島)', kanji: '信濃' },
  21: { key: 'gifu', name: '岐阜縣 (美濃·飛驒)', kanji: '美濃' },
  22: { key: 'shizuoka', name: '靜岡縣 (駿河·遠江)', kanji: '駿河' },
  23: { key: 'aichi', name: '愛知縣 (尾張·三河)', kanji: '尾張' },
  24: { key: 'mie', name: '三重縣 (伊勢·志摩)', kanji: '伊勢' },
  25: { key: 'shiga', name: '滋賀縣 (近江安土)', kanji: '近江' },
  26: { key: 'kyoto', name: '京都府 (山城帝都)', kanji: '京都' },
  27: { key: 'osaka', name: '大阪府 (攝津大坂)', kanji: '大坂' },
  28: { key: 'hyogo', name: '兵庫縣 (播磨·但馬)', kanji: '播磨' },
  29: { key: 'nara', name: '奈良縣 (大和南都)', kanji: '大和' },
  30: { key: 'wakayama', name: '和歌山縣 (紀伊高野)', kanji: '紀伊' },
  31: { key: 'tottori', name: '鳥取縣 (因幡·伯耆)', kanji: '因幡' },
  32: { key: 'shimane', name: '島根縣 (出雲·石見)', kanji: '出雲' },
  33: { key: 'okayama', name: '岡山縣 (備前·美作)', kanji: '備前' },
  34: { key: 'hiroshima', name: '廣島縣 (安芸嚴島)', kanji: '安芸' },
  35: { key: 'yamaguchi', name: '山口縣 (長門·周防)', kanji: '長門' },
  36: { key: 'tokushima', name: '德島縣 (阿波鳴門)', kanji: '阿波' },
  37: { key: 'kagawa', name: '香川縣 (讚岐屋島)', kanji: '讚岐' },
  38: { key: 'ehime', name: '愛媛縣 (伊予松山)', kanji: '伊予' },
  39: { key: 'kochi', name: '高知縣 (土佐浦戶)', kanji: '土佐' },
  40: { key: 'fukuoka', name: '福岡縣 (筑前·豐前)', kanji: '筑前' },
  41: { key: 'saga', name: '佐賀縣 (肥前佐賀)', kanji: '肥前' },
  42: { key: 'nagasaki', name: '長崎縣 (肥前出島)', kanji: '出島' },
  43: { key: 'kumamoto', name: '熊本縣 (肥後熊本)', kanji: '肥後' },
  44: { key: 'oita', name: '大分縣 (豐後府內)', kanji: '豐後' },
  45: { key: 'miyazaki', name: '宮崎縣 (日向飫肥)', kanji: '日向' },
  46: { key: 'kagoshima', name: '鹿兒島縣 (薩摩·大隅)', kanji: '薩摩' },
  47: { key: 'okinawa', name: '沖繩縣 (琉球王國)', kanji: '琉球' }
};

async function main() {
  console.log('Downloading official TopoJSON & Topojson-client...');
  const clientCode = await get('https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(clientCode, sandbox);
  const topojson = sandbox.topojson;

  const topoData = JSON.parse(await get('https://raw.githubusercontent.com/dataofjapan/land/master/japan.topojson'));
  const geojson = topojson.feature(topoData, topoData.objects.japan);

  const prefectures = {};

  geojson.features.forEach(f => {
    const id = f.properties.id;
    const meta = PREFECTURE_META[id] || { key: 'pref_' + id, name: f.properties.nam_ja, kanji: f.properties.nam_ja.slice(0, 2) };
    
    // For Kagoshima (id 46), filter far-southern islands
    const isKagoshima = id === 46;
    let pathD = coordsToSvgPath(f.geometry.coordinates, 0.75, isKagoshima);

    // Compute centroid
    let sumX = 0, sumY = 0, count = 0;
    function addPt(coords) {
      if (typeof coords[0] === 'number') {
        if (isKagoshima && coords[1] < 30.2) return;
        const [px, py] = project(coords[0], coords[1]);
        sumX += px; sumY += py; count++;
      } else coords.forEach(addPt);
    }
    addPt(f.geometry.coordinates);
    const center = count > 0 ? [Math.round(sumX / count), Math.round(sumY / count)] : [400, 360];

    prefectures[meta.key] = {
      id: meta.key,
      code: id,
      name: meta.name,
      kanji: meta.kanji,
      center: center,
      d: pathD
    };
  });

  const outputCode = `// Authentic Japan 47 Prefectures Official GIS Vector Data (Mercator Projection)
// Calibrated for 820 x 720 Viewport (Scale: 1700, Center: 137.5E, 37.8N)

export function projectLngLatToJapanMap(lng, lat) {
  const rad = Math.PI / 180;
  const lambda = (lng - 137.5) * rad;
  const phi = lat * rad;
  const centerPhi = 37.8 * rad;

  const x = 820 / 2 + 1700 * lambda;
  const y = 720 / 2 - 1700 * (Math.log(Math.tan(Math.PI / 4 + phi / 2)) - Math.log(Math.tan(Math.PI / 4 + centerPhi / 2)));
  return [Math.round(x), Math.round(y)];
}

export const JAPAN_PREFECTURE_PATHS = ${JSON.stringify(prefectures, null, 2)};
`;

  const outputPath = path.join(__dirname, '../src/data/japan/japanPrefecturesGeoData.js');
  fs.writeFileSync(outputPath, outputCode, 'utf8');
  console.log('Successfully wrote authentic GIS paths to src/data/japan/japanPrefecturesGeoData.js');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
