// Event data stores map points as [x, y] or { x, y } depending on the period.
export function toSvgPoint(pos, fallback = null) {
  const point = Array.isArray(pos) ? pos : pos && typeof pos === 'object' ? [pos.x, pos.y] : null;
  return point && Number.isFinite(point[0]) && Number.isFinite(point[1]) ? [point[0], point[1]] : fallback;
}
