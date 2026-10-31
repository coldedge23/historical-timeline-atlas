// Data pack source (plan v2, sections 3.4-3.6): catalog.json first, then packs and the search index on demand.
// No data imports: everything arrives over fetch, so the main entry stays free of history content.
export const SCHEMA_VERSION = 1;

// kind: network | http | parse | schema (unsupported or malformed) | updated (a newer build replaced this one) | unknown
export class DataLoadError extends Error {
  constructor(kind, message, detail = {}) {
    super(message);
    this.name = 'DataLoadError';
    this.kind = kind;
    Object.assign(this, detail);
  }
}

const entityId = (key) => key.split(':').slice(2).join(':');

// fetchImpl and maxPacks are parameters so tests can serve files from disk and fail on purpose.
export function createPackSource({ fetch: fetchImpl = (...args) => globalThis.fetch(...args), base = '', maxPacks = 6, catalogRetries = 2 } = {}) {
  let catalog = null;
  let catalogView = null;
  const pages = new Map(); // file name (content hash) -> page, oldest first
  const loading = new Map(); // file name -> promise
  let searchIndex = null; // { file, promise }

  async function getJson(path, init) {
    const url = base + path;
    let response;
    try { response = await fetchImpl(url, init); }
    catch (error) { throw new DataLoadError('network', `無法連線取得 ${path}`, { url, cause: error }); }
    if (!response.ok) throw new DataLoadError('http', `${path} 回應 HTTP ${response.status}`, { url, status: response.status });
    try { return await response.json(); }
    catch (error) { throw new DataLoadError('parse', `${path} 不是有效的 JSON`, { url, cause: error }); }
  }

  async function fetchCatalog(force) {
    // no-cache: revalidate with the server every time; a retry bypasses the browser cache completely.
    let lastError;
    for (let attempt = 0; attempt <= catalogRetries; attempt++) {
      try {
        const body = await getJson('data/catalog.json', { cache: force || attempt > 0 ? 'reload' : 'no-cache' });
        if (body?.schemaVersion !== SCHEMA_VERSION) throw new DataLoadError('schema', `不支援的總目錄版本 ${body?.schemaVersion}`);
        if (!body.packs || !body.searchIndex || !Array.isArray(body.civilizations)) throw new DataLoadError('schema', '總目錄缺少必要欄位');
        return body;
      } catch (error) {
        lastError = error;
        if (error.kind === 'schema') break;
      }
    }
    throw lastError;
  }

  function adopt(body) {
    // Packs whose file (content hash) is gone from the new catalog are dropped; unchanged ones stay cached.
    const files = new Set(Object.values(body.packs).map(info => info.file));
    for (const file of [...pages.keys()]) if (!files.has(file)) pages.delete(file);
    if (searchIndex && searchIndex.file !== body.searchIndex.file) searchIndex = null;
    catalog = body;
    const rows = (civ) => (body.contemporary?.[civ] || []).map(row => Object.fromEntries(body.contemporaryFields.map((field, i) => [field, row[i]])))
      .map(row => ({ ...row, id: entityId(row.key), datasetId: row.key.split(':')[0] }));
    catalogView = {
      schemaVersion: body.schemaVersion, buildId: body.buildId,
      periodOptions: body.periodOptions,
      periodIds: body.civilizations.find(c => c.id === 'china')?.packs || [],
      eras: body.eras || { taiwan: [], japan: [] },
      contemporaryPools: { china: rows('china'), taiwan: rows('taiwan'), japan: rows('japan') },
    };
    return catalogView;
  }

  async function loadCatalog({ force = false } = {}) {
    if (catalogView && !force) return catalogView;
    return adopt(await fetchCatalog(force));
  }

  function toPage(pack, id) {
    if (pack?.meta?.schemaVersion !== SCHEMA_VERSION || pack.meta.pack !== id) throw new DataLoadError('schema', `資料包 ${id} 版本或內容不符`);
    const { meta, period, ...content } = pack;
    return { ...(period || {}), ...content, id: meta.pack, civ: meta.civ };
  }

  function remember(file, page) {
    pages.delete(file);
    pages.set(file, page);
    while (pages.size > maxPacks) pages.delete(pages.keys().next().value);
  }

  function peekPage(id) {
    const file = catalog?.packs[id]?.file;
    return file ? pages.get(file) || null : null;
  }

  async function loadPage(id) {
    await loadCatalog();
    const info = catalog.packs[id];
    if (!info) throw new DataLoadError('unknown', `總目錄中沒有資料包 ${id}`);
    const cached = pages.get(info.file);
    if (cached) { remember(info.file, cached); return cached; }
    if (!loading.has(info.file)) {
      const buildId = catalog.buildId;
      const promise = getJson(info.file).then(pack => {
        const page = toPage(pack, id);
        remember(info.file, page);
        return page;
      }).catch(async (error) => {
        // A 404 usually means a new deployment replaced the files: check the catalog once (plan v2 section 3.6).
        if (error.kind === 'http' && error.status === 404) {
          const fresh = await fetchCatalog(true).catch(() => null);
          if (fresh && fresh.buildId !== buildId) throw new DataLoadError('updated', '網站已更新，請重新整理');
        }
        throw error;
      }).finally(() => loading.delete(info.file));
      loading.set(info.file, promise);
    }
    return loading.get(info.file);
  }

  async function loadSearchIndex() {
    await loadCatalog();
    const file = catalog.searchIndex.file;
    if (!searchIndex || searchIndex.file !== file) {
      const promise = getJson(file).then(body => {
        if (body?.schemaVersion !== SCHEMA_VERSION || !Array.isArray(body.fields) || !Array.isArray(body.entries)) throw new DataLoadError('schema', '搜尋索引版本或內容不符');
        return body.entries.map(row => {
          const entry = Object.fromEntries(body.fields.map((field, i) => [field, row[i]]));
          return { ...entry, item: { id: entityId(entry.key) } };
        });
      });
      searchIndex = { file, promise };
      // A failed load is forgotten so the retry button fetches again.
      promise.catch(() => { if (searchIndex?.promise === promise) searchIndex = null; });
    }
    return searchIndex.promise;
  }

  return { mode: 'packs', loadCatalog, loadPage, peekPage, loadSearchIndex };
}
