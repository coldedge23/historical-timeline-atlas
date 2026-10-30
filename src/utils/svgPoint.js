// Event data stores map points as [x, y] or { x, y } depending on the period.
export function toSvgPoint(pos, fallback = null) {
  const point = Array.isArray(pos) ? pos : pos && typeof pos === 'object' ? [pos.x, pos.y] : null;
  return point && Number.isFinite(point[0]) && Number.isFinite(point[1]) ? [point[0], point[1]] : fallback;
}

// Linear lng/lat projection onto CHINA_PROVINCE_PATHS. Fitted against the province
// shapes: 195 of 223 location-named events fall inside their named province.
const CHINA_MAP_VIEW = { minX: 195, minY: 130, maxX: 710, maxY: 570 };
export function projectChinaLngLat(lng, lat) {
  const point = [12.97 * lng - 967.16, -15.14 * lat + 862.49];
  const { minX, minY, maxX, maxY } = CHINA_MAP_VIEW;
  return point[0] >= minX && point[0] <= maxX && point[1] >= minY && point[1] <= maxY ? point : null;
}

// Same order rule as schemaNormalizer: in China data a first value above 60 is longitude.
function readLngLat(coordinates) {
  if (Array.isArray(coordinates) && coordinates.length >= 2) {
    const [a, b] = coordinates;
    return a > 60 ? [a, b] : [b, a];
  }
  if (coordinates && typeof coordinates === 'object') return [coordinates.lng, coordinates.lat];
  return null;
}

// Hand-placed svgPos wins; otherwise project the event's own coordinates. Places
// outside the drawn map (e.g. Cairo) return null so no marker is drawn.
export function resolveChinaEventPoint(event) {
  const placed = toSvgPoint(event?.svgPos);
  if (placed) return placed;
  const lngLat = readLngLat(event?.coordinates ?? event?.coords);
  return lngLat && Number.isFinite(lngLat[0]) && Number.isFinite(lngLat[1]) ? projectChinaLngLat(lngLat[0], lngLat[1]) : null;
}
