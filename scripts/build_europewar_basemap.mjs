// Builds the WWII Europe base map (plan docs/20261108_二戰歐洲戰場模組規劃_v8.md, section 7.2) from Natural Earth
// (public domain). Downloads into .cache/naturalearth/ (not in git), checks each file's SHA-256, clips to the map,
// projects with src/utils/conicProjection.js, simplifies, and writes:
//   src/data/europewar/europeWarMapGeoData.js   land and lake paths plus the projection (class geo)
//   tests/fixtures/europewar_anchor_cities.json  Natural Earth city points for the coordinate anchor tests
// Run: node scripts/build_europewar_basemap.mjs
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lambertConic } from '../src/utils/conicProjection.js';
import { EUROPEWAR_MAP_BOUNDS as BOUNDS } from '../src/data/europewar/rules.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = join(ROOT, '.cache', 'naturalearth');
const VERSION = 'v5.1.2';
const BASE_URL = `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/${VERSION}/geojson/`;
// Scale 1:50m. Sizes and hashes recorded on 2026-11-07 at the first download.
const SOURCES = {
  land: { file: 'ne_50m_land.geojson', bytes: 1636166, sha256: 'e874b27a51d146452be360cafb3cc50c86001074a67d534113e6534682f9826b' },
  lakes: { file: 'ne_50m_lakes.geojson', bytes: 876018, sha256: 'd350b75978b26fe839b797c2c529b2fb8f47fb3983c03f4964e36d5df9378a52' },
  places: { file: 'ne_50m_populated_places_simple.geojson', bytes: 850767, sha256: '8e70756b39fae9bcdc1e332bfc510c024c5edd3a13203ffd20092ee37b61d978' },
};
// Cities the anchor tests may use, by Natural Earth name (the name field).
const ANCHOR_CITIES = ['Warsaw', 'Moscow', 'Berlin', 'London', 'Paris', 'Volgograd', 'St.  Petersburg', 'Rome', 'Oslo', 'Kyiv',
  'Minsk', 'Kharkiv', 'Sevastopol', 'Caen', 'Helsinki', 'Athens', 'Belgrade', 'Alexandria', 'Algiers', 'Palermo',
  'Budapest', 'Kaliningrad', 'Hamburg', 'Tunis'];

// Projection: standard parallels 40° and 62° N, centred on the map; 1,000 px wide.
const PROJECTION = { lng0: (BOUNDS.minLng + BOUNDS.maxLng) / 2, lat0: 50, lat1: 40, lat2: 62 };
const WIDTH = 1000, PAD = 12;
const TOLERANCE = 0.9; // px, Douglas-Peucker
const MIN_AREA = 6; // px², smaller islands and lakes are dropped

async function source(key) {
  const { file, sha256 } = SOURCES[key];
  const path = join(CACHE, file);
  if (!existsSync(path)) {
    mkdirSync(CACHE, { recursive: true });
    const response = await fetch(BASE_URL + file);
    if (!response.ok) throw new Error(`下載失敗 ${BASE_URL + file}：HTTP ${response.status}`);
    writeFileSync(path, Buffer.from(await response.arrayBuffer()));
  }
  const body = readFileSync(path);
  const actual = createHash('sha256').update(body).digest('hex');
  if (actual !== sha256) throw new Error(`${file} 的 SHA-256 不符：預期 ${sha256}，實際 ${actual}`);
  return JSON.parse(body.toString('utf8'));
}

const raw = lambertConic(PROJECTION);
// Pixel frame: the bounding box of the projected map bounds.
const edge = [];
for (let lng = BOUNDS.minLng; lng <= BOUNDS.maxLng; lng += 0.5) edge.push([lng, BOUNDS.minLat], [lng, BOUNDS.maxLat]);
for (let lat = BOUNDS.minLat; lat <= BOUNDS.maxLat; lat += 0.5) edge.push([BOUNDS.minLng, lat], [BOUNDS.maxLng, lat]);
const projectedEdge = edge.map(([lng, lat]) => raw(lng, lat));
const minX = Math.min(...projectedEdge.map(p => p[0])), maxX = Math.max(...projectedEdge.map(p => p[0]));
const minY = Math.min(...projectedEdge.map(p => p[1])), maxY = Math.max(...projectedEdge.map(p => p[1]));
const scale = (WIDTH - 2 * PAD) / (maxX - minX);
const HEIGHT = Math.round((maxY - minY) * scale + 2 * PAD);
const params = { ...PROJECTION, scale: +scale.toFixed(6), tx: +(PAD - minX * scale).toFixed(4), ty: +(PAD + maxY * scale).toFixed(4) };
const toPixel = ([lng, lat]) => { const [x, y] = raw(lng, lat); return [params.tx + params.scale * x, params.ty - params.scale * y]; };

// Sutherland-Hodgman against an axis-aligned box; works on [a, b] points in any planar frame.
function clipRing(ring, box) {
  const sides = [
    [p => p[0] >= box.minA, (p, q) => cross(p, q, 0, box.minA)], [p => p[0] <= box.maxA, (p, q) => cross(p, q, 0, box.maxA)],
    [p => p[1] >= box.minB, (p, q) => cross(p, q, 1, box.minB)], [p => p[1] <= box.maxB, (p, q) => cross(p, q, 1, box.maxB)],
  ];
  let out = ring;
  for (const [inside, intersect] of sides) {
    const input = out; out = [];
    for (let i = 0; i < input.length; i++) {
      const cur = input[i], prev = input[(i + input.length - 1) % input.length];
      if (inside(cur)) { if (!inside(prev)) out.push(intersect(prev, cur)); out.push(cur); }
      else if (inside(prev)) out.push(intersect(prev, cur));
    }
    if (!out.length) return [];
  }
  return out;
}
function cross(p, q, axis, value) {
  const t = (value - p[axis]) / (q[axis] - p[axis]);
  return axis === 0 ? [value, p[1] + t * (q[1] - p[1])] : [p[0] + t * (q[0] - p[0]), value];
}

function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const keep = new Uint8Array(points.length); keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let worst = -1, at = -1;
    const [ax, ay] = points[a], [bx, by] = points[b], len = Math.hypot(bx - ax, by - ay) || 1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs((bx - ax) * (ay - points[i][1]) - (ax - points[i][0]) * (by - ay)) / len;
      if (d > worst) { worst = d; at = i; }
    }
    if (worst > tolerance) { keep[at] = 1; stack.push([a, at], [at, b]); }
  }
  return points.filter((_, i) => keep[i]);
}
// A closed ring: split at the point farthest from the first, so neither half has identical end points.
function simplifyRing(ring, tolerance) {
  let far = 0, best = -1;
  ring.forEach((p, i) => { const d = Math.hypot(p[0] - ring[0][0], p[1] - ring[0][1]); if (d > best) { best = d; far = i; } });
  if (far === 0) return [];
  const first = simplify(ring.slice(0, far + 1), tolerance), second = simplify([...ring.slice(far), ring[0]], tolerance);
  return [...first, ...second.slice(1, -1)];
}
const area = (ring) => ring.reduce((sum, p, i) => { const q = ring[(i + 1) % ring.length]; return sum + p[0] * q[1] - q[0] * p[1]; }, 0) / 2;

// Lng/lat pre-clip keeps the conic away from its singularity; the pixel clip leaves cut edges outside the view.
// Wide in longitude: meridians are straight lines in this projection, so a cut along one near the map could show
// in the view's corners.
const GEO_BOX = { minA: BOUNDS.minLng - 60, maxA: BOUNDS.maxLng + 60, minB: BOUNDS.minLat - 12, maxB: 89 };
const PIXEL_BOX = { minA: -20, maxA: WIDTH + 20, minB: -20, maxB: HEIGHT + 20 };
const fmt = (n) => String(Math.round(n * 10) / 10);

function toPath(geojson) {
  const parts = [];
  let rings = 0;
  for (const feature of geojson.features) {
    const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.type === 'MultiPolygon' ? feature.geometry.coordinates : [];
    for (const polygon of polygons) for (const ring of polygon) {
      const geo = clipRing(ring.slice(0, -1), GEO_BOX);
      if (geo.length < 3) continue;
      const pixel = clipRing(geo.map(toPixel), PIXEL_BOX);
      if (pixel.length < 3) continue;
      const simple = simplifyRing(pixel, TOLERANCE);
      if (simple.length < 3 || Math.abs(area(simple)) < MIN_AREA) continue;
      parts.push(`M${simple.map(p => `${fmt(p[0])} ${fmt(p[1])}`).join('L')}Z`);
      rings++;
    }
  }
  return { d: parts.join(''), rings };
}

const [land, lakes, places] = await Promise.all([source('land'), source('lakes'), source('places')]);
const landPath = toPath(land), lakePath = toPath(lakes);

const header = `// 由 scripts/build_europewar_basemap.mjs 產生，不要手動修改。
// 來源：Natural Earth ${VERSION}（公有領域），1:50m ${SOURCES.land.file}、${SOURCES.lakes.file}；
// 下載網址 ${BASE_URL}；SHA-256 記錄在產生腳本。只有現代海岸線與湖泊，不含國界（規劃 v5 第 7.2 節）。
`;
const map = { viewBox: `0 0 ${WIDTH} ${HEIGHT}`, width: WIDTH, height: HEIGHT, projection: params,
  source: { name: 'Natural Earth', version: VERSION, scale: '1:50m', files: [SOURCES.land.file, SOURCES.lakes.file] },
  land: landPath.d, lakes: lakePath.d };
writeFileSync(join(ROOT, 'src', 'data', 'europewar', 'europeWarMapGeoData.js'), `${header}export const EUROPEWAR_MAP = ${JSON.stringify(map)};\n`);

const cities = ANCHOR_CITIES.map((name) => {
  const f = places.features.find((feature) => feature.properties.name === name);
  if (!f) throw new Error(`Natural Earth 城市點位找不到：${name}`);
  return { name, lng: f.geometry.coordinates[0], lat: f.geometry.coordinates[1] };
});
writeFileSync(join(ROOT, 'tests', 'fixtures', 'europewar_anchor_cities.json'), `${JSON.stringify({
  source: `Natural Earth ${VERSION} ${SOURCES.places.file}`, sha256: SOURCES.places.sha256, cities }, null, 2)}\n`);

console.log(`底圖完成：${WIDTH}×${HEIGHT}；陸地 ${landPath.rings} 個環、湖泊 ${lakePath.rings} 個環；路徑 ${(landPath.d.length + lakePath.d.length).toLocaleString()} 字元；錨點城市 ${cities.length} 個`);
