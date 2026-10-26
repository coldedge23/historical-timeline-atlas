const https = require('https');
const fs = require('fs');
const path = require('path');

const GEOJSON_URL = 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/taiwan.geojson';
const OUTPUT_FILE = path.resolve(__dirname, '..', 'src', 'data', 'taiwanMapGeoData.js');

console.log('Fetching official Taiwan GeoJSON...');

https.get(GEOJSON_URL, (res) => {
  let rawData = '';
  res.on('data', chunk => rawData += chunk);
  res.on('end', () => {
    try {
      const geojson = JSON.parse(rawData);
      console.log(`Successfully fetched ${geojson.features.length} features.`);

      // Mercator Projection configured for Taiwan Strait & Main Island
      // Bounding box: lng [118.15, 122.15], lat [21.8, 26.35]
      const minLng = 118.15;
      const maxLng = 122.25;
      const minLat = 21.8;
      const maxLat = 26.35;

      const canvasWidth = 820;
      const canvasHeight = 720;

      function project(lng, lat) {
        const x = ((lng - minLng) / (maxLng - minLng)) * 740 + 40;
        const latRad = (lat * Math.PI) / 180;
        const minLatRad = (minLat * Math.PI) / 180;
        const maxLatRad = (maxLat * Math.PI) / 180;

        const mercY = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
        const minMercY = Math.log(Math.tan(Math.PI / 4 + minLatRad / 2));
        const maxMercY = Math.log(Math.tan(Math.PI / 4 + maxLatRad / 2));

        const y = canvasHeight - 30 - ((mercY - minMercY) / (maxMercY - minMercY)) * 660;
        return [Number(x.toFixed(1)), Number(y.toFixed(1))];
      }

      function coordsToSvgPath(coords) {
        if (!Array.isArray(coords) || coords.length === 0) return '';
        // If single ring
        if (typeof coords[0][0] === 'number') {
          return coords
            .map((pt, i) => {
              const [px, py] = project(pt[0], pt[1]);
              return `${i === 0 ? 'M' : 'L'} ${px},${py}`;
            })
            .join(' ') + ' Z';
        }
        // If multi ring / polygon array
        return coords.map(ring => coordsToSvgPath(ring)).join(' ');
      }

      const countyPaths = {};
      const countyCenters = {};

      const nameMap = {
        'Taipei City': { id: 'taipei', name: '臺北市', region: 'north' },
        'New Taipei City': { id: 'new_taipei', name: '新北市', region: 'north' },
        'Keelung City': { id: 'keelung', name: '基隆市', region: 'north' },
        'Yilan County': { id: 'yilan', name: '宜蘭縣', region: 'east' },
        'Taoyuan County': { id: 'taoyuan', name: '桃園市', region: 'north' },
        'Hsinchu City': { id: 'hsinchu_city', name: '新竹市', region: 'hsinchu_miaoli' },
        'Hsinchu County': { id: 'hsinchu_county', name: '新竹縣', region: 'hsinchu_miaoli' },
        'Miaoli County': { id: 'miaoli', name: '苗栗縣', region: 'hsinchu_miaoli' },
        'Taichung City': { id: 'taichung', name: '臺中市', region: 'central' },
        'Changhua County': { id: 'changhua', name: '彰化縣', region: 'central' },
        'Nantou County': { id: 'nantou', name: '南投縣', region: 'central' },
        'Yunlin County': { id: 'yunlin', name: '雲林縣', region: 'yunjia' },
        'Chiayi City': { id: 'chiayi_city', name: '嘉義市', region: 'yunjia' },
        'Chiayi County': { id: 'chiayi_county', name: '嘉義縣', region: 'yunjia' },
        'Tainan City': { id: 'tainan', name: '臺南市', region: 'south' },
        'Kaohsiung City': { id: 'kaohsiung', name: '高雄市', region: 'south' },
        'Pingtung County': { id: 'pingtung', name: '屏東縣', region: 'south' },
        'Hualien County': { id: 'hualien', name: '花蓮縣', region: 'east' },
        'Taitung County': { id: 'taitung', name: '臺東縣', region: 'east' },
        'Taitung County\n': { id: 'taitung', name: '臺東縣', region: 'east' },
        'Penghu County': { id: 'penghu', name: '澎湖縣', region: 'penghu' },
        'Kinmen County': { id: 'kinmen', name: '金門縣', region: 'kinmen' },
        'Lienchiang County': { id: 'lienchiang', name: '連江縣(馬祖)', region: 'matsu' }
      };

      for (const feat of geojson.features) {
        const rawName = (feat.properties.name || '').trim();
        const conf = nameMap[rawName] || nameMap[feat.properties.name];
        if (!conf) continue;

        const geom = feat.geometry;
        let d = '';

        if (geom.type === 'Polygon') {
          d = coordsToSvgPath(geom.coordinates);
        } else if (geom.type === 'MultiPolygon') {
          d = geom.coordinates.map(poly => coordsToSvgPath(poly)).join(' ');
        }

        countyPaths[conf.id] = {
          id: conf.id,
          name: conf.name,
          region: conf.region,
          d: d
        };
      }

      console.log(`Converted ${Object.keys(countyPaths).length} counties to authentic SVG boundaries!`);

      const outputContent = `// Authentic Taiwan Geographic Boundary Vector Data (Mercator Projection)
// Extracted from official GIS Topo/GeoJSON (820 x 720 Canvas, 1000:740 Proportionality)

export const TAIWAN_PROJECT_BOUNDS = {
  minLng: ${minLng},
  maxLng: ${maxLng},
  minLat: ${minLat},
  maxLat: ${maxLat},
  canvasWidth: ${canvasWidth},
  canvasHeight: ${canvasHeight}
};

export function projectLngLatToTaiwanMap(lng, lat) {
  const minLng = ${minLng};
  const maxLng = ${maxLng};
  const minLat = ${minLat};
  const maxLat = ${maxLat};
  const canvasHeight = ${canvasHeight};

  const x = ((lng - minLng) / (maxLng - minLng)) * 740 + 40;
  const latRad = (lat * Math.PI) / 180;
  const minLatRad = (minLat * Math.PI) / 180;
  const maxLatRad = (maxLat * Math.PI) / 180;

  const mercY = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const minMercY = Math.log(Math.tan(Math.PI / 4 + minLatRad / 2));
  const maxMercY = Math.log(Math.tan(Math.PI / 4 + maxLatRad / 2));

  const y = canvasHeight - 30 - ((mercY - minMercY) / (maxMercY - minMercY)) * 660;
  return [Number(x.toFixed(1)), Number(y.toFixed(1))];
}

export const TAIWAN_COUNTY_PATHS = ${JSON.stringify(countyPaths, null, 2)};
`;

      fs.writeFileSync(OUTPUT_FILE, outputContent, 'utf8');
      console.log(`Saved output to ${OUTPUT_FILE}`);
    } catch (err) {
      console.error('Error processing GeoJSON:', err);
    }
  });
}).on('error', err => console.error('Fetch error:', err));
