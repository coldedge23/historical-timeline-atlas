import { classifyEventChronology } from '../src/utils/historicalDates.js';
import { classifyHistorySources } from '../src/utils/historySources.js';
import { applySourceReviews } from '../src/data/sourceReviews.js';
import { applyChronologyReviews } from '../src/data/chronologyReviews.js';
import { buildHistoryLinkGraph } from '../src/data/historyLinkGraph.js';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TAIWAN_LENS_ERAS, TAIWAN_DEDICATED_FIGURES, TAIWAN_RELATED_BATTLES } from '../src/data/taiwanLensData.js';
import { JAPAN_ALL_EVENTS, JAPAN_FIGURES, JAPAN_BATTLES } from '../src/data/japan/index.js';
import { parseBirthDeathYears } from '../src/data/schemaNormalizer.js';

// Inspect original exports before normalization, so defaults cannot hide missing values.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const periodPaths = ['xiaShangZhou','warringStates','qinHan','threeKingdoms','weiJin','suiTang','songLiao','yuanMing','qingDynasty','republicModern'];
let datasets = [];
for (const id of periodPaths) {
  const directory = id === 'threeKingdoms' ? 'threeKingdoms' : `periods/${id}`;
  const data = {id};
  for (const kind of ['events','figures','battles']) {
    const exports = await import(pathToFileURL(resolve(root, 'src/data', directory, `${kind}.js`)).href);
    const entry = Object.entries(exports).find(([name, value]) => name.endsWith(`_${kind.toUpperCase()}`) && Array.isArray(value));
    if (!entry) throw new Error(`${id}/${kind}: 找不到原始資料陣列`);
    data[kind] = entry[1];
  }
  datasets.push(data);
}
datasets.push({id:'taiwanLens', events:TAIWAN_LENS_ERAS.flatMap(era=>era.keyEvents || []), figures:TAIWAN_DEDICATED_FIGURES, battles:TAIWAN_RELATED_BATTLES});
datasets.push({id:'japanAtlas', events:JAPAN_ALL_EVENTS, figures:JAPAN_FIGURES, battles:JAPAN_BATTLES});
const runtime = process.argv.includes('--runtime');
const effective = runtime || process.argv.includes('--effective');
const graph = runtime ? (await import('../src/data/linkedHistoryCatalog.js')).HISTORY_LINK_GRAPH : effective ? buildHistoryLinkGraph(applySourceReviews(datasets)) : null;
if (graph) datasets = runtime ? graph.datasets : applyChronologyReviews(graph.datasets);
const allFigures = new Set(datasets.flatMap(d=>d.figures.map(f=>f.id)));
const eventRecords = datasets.flatMap(d=>d.events);
const allEvents = new Set(eventRecords.map(e=>e.id));
const eventsById = new Map();
for (const event of eventRecords) { const list = eventsById.get(event.id) || []; list.push(event); eventsById.set(event.id,list); }
const findings = [];
const sourceStatusCounts = {};
const chronologyCounts = {};
const add = (severity, rule, dataset, kind, record, detail) => findings.push({severity,rule,dataset,kind,id:record.id ?? '(缺少ID)',detail});
const hasSource = record => ['source','sources','sourceNote','references','citations','reference','sourceUrl','sourceText'].some(key => {
  const value = record[key]; return Array.isArray(value) ? value.length > 0 : typeof value === 'string' && value.trim().length > 0;
});
for (const dataset of datasets) {
  const seen = new Set();
  for (const kind of ['events','figures','battles']) {
    for (const record of dataset[kind]) {
      if (typeof record.id !== 'string' || !record.id.trim()) add('fail','missing-id',dataset.id,kind,record,'ID 不存在或不是非空字串');
      else if (seen.has(record.id)) add('fail','duplicate-id',dataset.id,kind,record,'同一資料集內 ID 重複');
      seen.add(record.id);
      for (const link of record.pendingLinks || []) add('warn','pending-link-review',dataset.id,kind,record,`${link.kind} ${link.id}：${link.reason}`);
      const sourceStatus = classifyHistorySources(record);
      sourceStatusCounts[sourceStatus.status] = (sourceStatusCounts[sourceStatus.status] || 0) + 1;
      if (sourceStatus.status === 'missing') add('warn','missing-source',dataset.id,kind,record,'缺少可追溯來源欄位；未判斷內容真偽');
      else if (sourceStatus.status === 'unverified-note') add('warn','unverified-source-note',dataset.id,kind,record,'來源只有泛稱，仍需具體引用');
      if (kind === 'events' && !Number.isFinite(record.year)) add('fail','invalid-event-year',dataset.id,kind,record,'事件年份不是有限數值');
      const coordinate = record.coordinates ?? record.coords;
      if (coordinate != null) {
        let lat, lng;
        if (Array.isArray(coordinate)) {
          // history.ts defines China coordinates as [lat,lng]; legacy coords and TW/JP use [lng,lat].
          if (record.coords && !record.coordinates) {
            // Legacy coords uses both orders. Match the runtime normalizer's
            // c0>60 convention, but record the inferred order for later cleanup.
            if (coordinate[0] > 60) [lng,lat] = coordinate;
            else [lat,lng] = coordinate;
            add('warn','legacy-coordinate-order',dataset.id,kind,record,'舊 coords 欄位依現行正規化規則判斷順序，建議統一明確經緯度物件');
          } else if (['taiwanLens','japanAtlas'].includes(dataset.id)) [lng,lat] = coordinate;
          else [lat,lng] = coordinate;
        } else if (typeof coordinate === 'object') ({lat,lng} = coordinate);
        if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat)>90 || Math.abs(lng)>180) {
          if (Array.isArray(coordinate) && Number.isFinite(lng) && Number.isFinite(lat) && Math.abs(lng)<=90 && Math.abs(lat)<=180)
            add('warn','coordinate-order-mismatch',dataset.id,kind,record,`座標倒序後才符合地理範圍，與宣告格式不一致：${JSON.stringify(coordinate)}`);
          else add('fail','invalid-coordinate',dataset.id,kind,record,`無效經緯度：${JSON.stringify(coordinate)}`);
        }
      } else if (kind === 'events') add('warn','missing-coordinate',dataset.id,kind,record,'缺少地理座標，不適合直接定位');
      if (kind === 'events') {
        for (const id of record.figureIds || record.figuresInvolved || []) if (!allFigures.has(id)) add('fail','dangling-event-figure',dataset.id,kind,record,`人物連結不存在：${id}`);
      }
      if (kind === 'figures') {
        for (const id of record.participatedEventIds || []) if (!allEvents.has(id)) add('fail','dangling-figure-event',dataset.id,kind,record,`事件連結不存在：${id}`);
        const years = parseBirthDeathYears(record);
        if (years.birthYear === null || years.deathYear === null) add('warn','incomplete-lifespan',dataset.id,kind,record,'生卒年不完整或格式無法確定，保留未知');
        if (years.birthYear !== null && years.deathYear !== null && (years.deathYear < years.birthYear || years.deathYear - years.birthYear > 120)) add('warn','lifespan-review',dataset.id,kind,record,`生卒年需人工複核：${years.birthYear}～${years.deathYear}`);
        if (years.birthYear !== null && years.deathYear !== null) {
          for (const id of record.participatedEventIds || []) {
            const linked = eventsById.get(id) || [];
            if (!linked.length) continue;
            const preferred = linked.find(event => event.datasetId === dataset.id) || linked[0];
            const review = record.eventLinkReviews?.[id] || classifyEventChronology(record, preferred);
            chronologyCounts[review.type || review.status] = (chronologyCounts[review.type || review.status] || 0) + 1;
            if (review.type) add('info','event-background-context',dataset.id,kind,record,`事件 ${id}：${review.label}；保留背景關聯，不列親身參與`);
            else if (review.status === 'outside') add('warn','event-outside-lifespan',dataset.id,kind,record,`事件 ${id} 的記載期間與生卒不相容，列背景/年代待考，未更改原始年份`);
            else if (review.status === 'overlap') add('info','event-range-overlap',dataset.id,kind,record,`事件 ${id} 為多年度區間，與人物生卒部分重疊，不再當作單點年代錯誤`);
            else if (review.status === 'unknown') add('warn','event-date-review',dataset.id,kind,record,`事件 ${id} 年代資料不足或欄位衝突，不能確定時序`);
          }
        }
        for (const relation of record.relations || []) {
          if (!allFigures.has(relation.figureId)) add('warn','dangling-relation',dataset.id,kind,record,`關係對象不存在：${relation.figureId}`);
          if (!hasSource(relation)) add('warn','relation-source-review',dataset.id,kind,record,'關係缺少個別來源，需人工複核');
        }
      }
    }
  }
}
const failures = findings.filter(f=>f.severity === 'fail');
const warnings = findings.filter(f=>f.severity === 'warn');
const groups = {};
for (const item of findings) {
  const key = `${item.severity}/${item.rule}`;
  const group = groups[key] ||= {count:0,byDataset:{},examples:[]};
  group.count++; group.byDataset[item.dataset] = (group.byDataset[item.dataset] || 0) + 1;
  if (group.examples.length < 5) group.examples.push(`${item.dataset}/${item.id}: ${item.detail}`);
}
const report = {mode:runtime?'runtime':effective?'effective':'raw', sourceStatusCounts, chronologyCounts, ...(graph ? {linkResolution:{repairCount:graph.repairs.length,pendingCount:graph.pending.length,repairs:graph.repairs,pending:graph.pending}} : {}), status:failures.length?'FAIL':warnings.length?'WARN':'PASS', datasets:datasets.map(d=>({id:d.id,events:d.events.length,figures:d.figures.length,battles:d.battles.length})), failureCount:failures.length,warningCount:warnings.length,groups};
if (process.argv.includes('--json')) console.log(JSON.stringify({...report,findings},null,2));
else {
  console.log(`歷史資料驗證：${report.status}；${datasets.length} 組${effective ? '有效連結視圖' : '原始資料'}，${failures.length} 項失敗、${warnings.length} 項警告。`);
  if (graph) console.log(`連結校正：${graph.repairs.length} 筆明確修復、${graph.pending.length} 筆待確認隔離（保留原始引用，未宣稱史實校正）。`);
  console.log('fail：重複/缺少ID、無效年份/座標、失效事件人物連結。warn：來源缺漏、年代或人物關係待複核。info：明確背景/區間重疊，不等於史實已驗證。跨期同名ID允許。');
  console.log(`來源狀態 ${JSON.stringify(sourceStatusCounts)}；年代分類 ${JSON.stringify(chronologyCounts)}`);
  for (const [key,group] of Object.entries(groups)) {
    console.log(`\n${key}: ${group.count}；各資料集 ${JSON.stringify(group.byDataset)}`);
    for(const example of group.examples) console.log(`  ${example}`);
  }
  console.log('\n本檢查不驗證史實，也不讀取圖像或修改任何資料；完整項目可加 --json。');
}
process.exitCode = failures.length ? 1 : process.argv.includes('--strict') && warnings.length ? 2 : 0;


