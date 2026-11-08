// Lambert conformal conic projection for the WWII Europe map (plan docs/20261108_二戰歐洲戰場模組規劃_v8.md, section 7).
// Pure, no data. scripts/build_europewar_basemap.mjs projects the coastline with it and writes the parameters into
// the map data; the map component and the tests project record coordinates with the same parameters.
// Input is always [lng, lat] in degrees (plan section 4.5).

const RAD = Math.PI / 180;

// The projection in its own units: { lng0, lat0, lat1, lat2 } in degrees -> (lng, lat) => [x, y], y pointing north.
export function lambertConic({ lng0, lat0, lat1, lat2 }) {
  const p1 = lat1 * RAD, p2 = lat2 * RAD;
  const t = (p) => Math.tan(Math.PI / 4 + p / 2);
  const n = Math.log(Math.cos(p1) / Math.cos(p2)) / Math.log(t(p2) / t(p1));
  const F = (Math.cos(p1) * Math.pow(t(p1), n)) / n;
  const rho0 = F / Math.pow(t(lat0 * RAD), n);
  return (lng, lat) => {
    const rho = F / Math.pow(t(lat * RAD), n);
    const theta = n * (lng - lng0) * RAD;
    return [rho * Math.sin(theta), rho0 - rho * Math.cos(theta)];
  };
}

// Map pixels: params adds { scale, tx, ty } (from the build script); SVG y points down.
export function createMapProjection(params) {
  const project = lambertConic(params);
  return ([lng, lat]) => {
    const [x, y] = project(lng, lat);
    return [params.tx + params.scale * x, params.ty - params.scale * y];
  };
}
