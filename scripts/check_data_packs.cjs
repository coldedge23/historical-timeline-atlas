// Data pack checks for npm run verify (plan v2, stage 1): every file listed and parseable,
// one schemaVersion, every link target present in its home pack, no unlisted leftovers in CI.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const zlib = require('node:zlib');

const gzipKb = (text) => zlib.gzipSync(text).length / 1024;

function walk(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full, base) : [path.relative(base, full).split(path.sep).join('/')];
  });
}

// Every object carrying key + homePack is a link descriptor (plan 3.2).
function descriptors(value, out = []) {
  if (Array.isArray(value)) value.forEach((item) => descriptors(item, out));
  else if (value && typeof value === 'object') {
    if (typeof value.key === 'string' && typeof value.homePack === 'string') out.push(value);
    else Object.values(value).forEach((item) => descriptors(item, out));
  }
  return out;
}

function checkDataPacks(dist, manifest, { strictLeftovers = !!process.env.CI } = {}) {
  assert(manifest.data, 'build-manifest.json 缺少資料包清單，請重新建置');
  const read = (file) => {
    assert(!file.includes('..'), `資料包路徑不得向外跳脫：${file}`);
    const full = path.join(dist, file);
    assert(fs.existsSync(full), `缺少資料檔 ${file}`);
    const text = fs.readFileSync(full);
    try { return { text, json: JSON.parse(text) }; } catch { assert.fail(`資料檔不是有效 JSON：${file}`); }
  };
  const catalog = read(manifest.data.catalog);
  const version = catalog.json.schemaVersion;
  assert(Number.isInteger(version), '總目錄缺少 schemaVersion');
  const packs = {};
  const sizes = { catalog: gzipKb(catalog.text), packs: {}, searchIndex: 0, rawPacks: {} };
  for (const [id, info] of Object.entries(catalog.json.packs)) {
    const { text, json } = read(info.file);
    assert.equal(json.meta?.schemaVersion, version, `${info.file} 的 schemaVersion 與總目錄不一致`);
    assert.equal(json.meta?.pack, id, `${info.file} 的資料包 ID 不符`);
    packs[id] = json;
    sizes.packs[id] = gzipKb(text);
    sizes.rawPacks[id] = text.length / 1024;
  }
  const search = read(catalog.json.searchIndex.file);
  assert.equal(search.json.schemaVersion, version, '搜尋索引的 schemaVersion 與總目錄不一致');
  sizes.searchIndex = gzipKb(search.text);

  const index = {};
  for (const [id, pack] of Object.entries(packs)) {
    for (const type of ['event', 'figure', 'battle']) for (const record of pack[`${type}s`] || []) index[`${id}|${type}|${record.id}`] = true;
  }
  const missing = [];
  const resolves = (homePack, type, id) => index[`${homePack}|${type}|${id}`];
  for (const [id, pack] of Object.entries(packs)) {
    for (const d of descriptors(pack.links)) if (!resolves(d.homePack, d.type, d.id)) missing.push(`${id} → ${d.key}`);
    for (const figure of pack.figures) if (figure.ref) { const [home, , fid] = figure.ref.split(':'); if (!resolves(home, 'figure', fid)) missing.push(`${id} 參照 ${figure.ref}`); }
  }
  const keyIndex = search.json.fields.indexOf('key');
  const homeIndex = search.json.fields.indexOf('homePack');
  for (const entry of search.json.entries) { const [, type, id] = entry[keyIndex].split(':'); if (!resolves(entry[homeIndex], type, id)) missing.push(`搜尋索引 → ${entry[keyIndex]}`); }
  for (const pool of Object.values(catalog.json.contemporary)) for (const [key] of pool) { const [home, type, id] = key.split(':'); if (!resolves(home, type, id)) missing.push(`同期對照 → ${key}`); }
  assert.equal(missing.length, 0, `關聯目標找不到實體 ${missing.length} 筆：${missing.slice(0, 10).join('、')}`);

  // Local builds keep old files on purpose (README); a fresh CI build must not contain any.
  const listed = new Set(manifest.data.files);
  const leftovers = fs.existsSync(path.join(dist, 'data')) ? walk(path.join(dist, 'data')).map((file) => `data/${file}`).filter((file) => !listed.has(file)) : [];
  if (leftovers.length && strictLeftovers) assert.fail(`dist/data 有總目錄未列出的檔案 ${leftovers.length} 個：${leftovers.slice(0, 5).join('、')}`);
  return { catalog: catalog.json, sizes, linkCount: Object.values(packs).reduce((sum, pack) => sum + descriptors(pack.links).length, 0), leftovers };
}

module.exports = { checkDataPacks, descriptors };
