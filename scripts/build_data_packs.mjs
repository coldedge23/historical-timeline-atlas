// Build-time data packs (plan v2, sections 3.2-3.6): catalog.json, search-index.<hash>.json, packs/<pack>.<hash>.json.
// Called by build.cjs; read in the browser by src/store/packSource.js.
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { LINKED_PERIODS, PERIOD_OPTIONS, TAIWAN_LENS_ERAS, ERA_BATTLE_IDS, JAPAN_ERAS, JAPAN_ERA_BATTLE_IDS, JAPAN_WARLORD_PERIOD_CONFIGS,
  appPages, appCatalogs, appContemporaryPools } from './lib/app_views.mjs';
import { createSearchIndex } from '../src/utils/search.js';
import { entityKey, pageLinks } from '../src/utils/linkDerivation.js';
import { getContemporaryRegimeLabel } from '../src/utils/relationRules.js';

export { entityKey };
export const SCHEMA_VERSION = 1;
const CIVILIZATIONS = [{ id: 'china', name: '華夏' }, { id: 'taiwan', name: '臺灣' }, { id: 'japan', name: '日本' }];
const digest = (text) => createHash('sha256').update(text).digest('hex').slice(0, 12);

const eraSummary = ({ keyEvents, ...era }) => ({ ...era, firstEventId: keyEvents?.[0]?.id ?? null });

function buildPack(page) {
  const pack = { meta: { schemaVersion: SCHEMA_VERSION, pack: page.id, civ: page.civ } };
  if (page.civ === 'china') {
    const { events, figures, battles, territories, warlordPeriods, demographics, ...period } = LINKED_PERIODS[page.id];
    pack.period = period;
  }
  // Figures homed in another pack are reference copies; edit them in their home pack's source.
  pack.events = page.events;
  pack.figures = page.figures.map(f => f.datasetId && f.datasetId !== page.id ? { ...f, ref: entityKey(f.datasetId, 'figure', f.id) } : f);
  pack.battles = page.battles;
  if (page.civ === 'china') {
    const p = LINKED_PERIODS[page.id];
    Object.assign(pack, { territories: p.territories, demographics: p.demographics, warlordPeriods: p.warlordPeriods || [] });
  }
  if (page.civ === 'taiwan') Object.assign(pack, { eras: TAIWAN_LENS_ERAS.map(eraSummary), eraBattleIds: ERA_BATTLE_IDS });
  if (page.civ === 'japan') Object.assign(pack, { eras: JAPAN_ERAS.map(eraSummary), eraBattleIds: JAPAN_ERA_BATTLE_IDS, warlordPeriods: JAPAN_WARLORD_PERIOD_CONFIGS });
  pack.links = pageLinks(page);
  return pack;
}

export const SEARCH_FIELDS = ['type', 'periodId', 'periodName', 'civ', 'eraId', 'title', 'subtitle', 'text', 'key', 'homePack'];
function buildSearchIndex() {
  // One entry per appearance; appearancePack is periodId (the dataset the result opens in).
  const entries = createSearchIndex(Object.values(appCatalogs())).map(e => {
    const home = e.item.datasetId || e.periodId;
    return [e.type, e.periodId, e.periodName, e.civ, e.eraId ?? null, e.title, e.subtitle, e.text, entityKey(home, e.type, e.item.id), home];
  });
  return { schemaVersion: SCHEMA_VERSION, fields: SEARCH_FIELDS, entries };
}

export const CONTEMPORARY_FIELDS = ['key', 'year', 'title', 'periodId', 'eraId', 'regimes'];
function buildContemporary() {
  const pools = appContemporaryPools();
  // regimes: the label each civilization's row shows when this event is selected (Timeline sync list).
  return Object.fromEntries(Object.entries(pools).map(([civ, pool]) => [civ, pool.map(e => [
    entityKey(e.datasetId, 'event', e.id), e.year ?? null, e.title ?? null, e.periodId ?? null, e.eraId ?? null,
    typeof e.year === 'number' ? Object.fromEntries(CIVILIZATIONS.filter(c => c.id !== civ).map(c => [c.id, getContemporaryRegimeLabel(c.id, e.year)])) : null,
  ])]));
}

// Returns every file as text keyed by its path under dist/, plus the parsed catalog.
export function createDataPacks() {
  const files = {};
  const packs = {};
  for (const page of appPages()) {
    const text = JSON.stringify(buildPack(page));
    const file = `data/packs/${page.id}.${digest(text)}.json`;
    files[file] = text;
    const years = page.events.map(e => e.year).filter(y => typeof y === 'number');
    packs[page.id] = { civ: page.civ, file, bytes: Buffer.byteLength(text),
      counts: { events: page.events.length, figures: page.figures.length, battles: page.battles.length },
      yearRange: years.length ? [Math.min(...years), Math.max(...years)] : null };
  }
  const searchText = JSON.stringify(buildSearchIndex());
  const searchFile = `data/search-index.${digest(searchText)}.json`;
  files[searchFile] = searchText;
  const body = {
    civilizations: CIVILIZATIONS.map(c => ({ ...c, packs: Object.keys(packs).filter(id => packs[id].civ === c.id) })),
    periodOptions: PERIOD_OPTIONS, packs,
    // Era menus for Taiwan and Japan, needed before their packs load (Header, cold-start routing).
    eras: { taiwan: TAIWAN_LENS_ERAS.map(eraSummary), japan: JAPAN_ERAS.map(eraSummary) },
    searchIndex: { file: searchFile, bytes: Buffer.byteLength(searchText) },
    contemporaryFields: CONTEMPORARY_FIELDS, contemporary: buildContemporary() };
  // buildId changes whenever any pack, the search index or the catalog body changes.
  const catalog = { schemaVersion: SCHEMA_VERSION, buildId: digest(Object.keys(files).sort().join('\n') + JSON.stringify(body)), ...body };
  files['data/catalog.json'] = JSON.stringify(catalog);
  return { catalog, files };
}

export async function writeDataPacks(distDir) {
  const { catalog, files } = createDataPacks();
  await mkdir(join(distDir, 'data', 'packs'), { recursive: true });
  for (const [file, text] of Object.entries(files)) await writeFile(join(distDir, file), text);
  return { catalog, files: Object.keys(files) };
}
