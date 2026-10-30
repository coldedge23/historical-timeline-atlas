import { applyImagePolicy } from './imagePolicy.js';
import { applySourceReviews } from './sourceReviews.js';
import { applyChronologyReviews } from './chronologyReviews.js';
// One resolved reference graph for rendering, counts, and cross-period navigation.
// Raw source modules stay unchanged; corrections carry evidence and unresolved IDs
// remain visible in pendingLinks and the audit report.
import { RAW_HISTORICAL_PERIODS as BASE_PERIODS } from './periodsRegistry.js';
import { normalizePeriodDataset } from './schemaNormalizer.js';
import { buildHistoryLinkGraph } from './historyLinkGraph.js';
import { TAIWAN_LENS_ERAS, TAIWAN_DEDICATED_FIGURES, TAIWAN_RELATED_FIGURE_IDS, TAIWAN_RELATED_BATTLES } from './taiwanLensData.js';
import { JAPAN_FIGURES, JAPAN_BATTLES, JAPAN_ALL_EVENTS, projectLngLatToJapanMap } from './japan/index.js';

const taiwanEvents = TAIWAN_LENS_ERAS.flatMap(era => (era.keyEvents || []).map(event => ({...event,
  eraId:era.id, eraName:era.name,
  svgPos:event.coordinates ? [580+(event.coordinates[0]-118)*7.5,495-(event.coordinates[1]-22)*9.5] : [602,478]
}))).sort((a,b)=>a.year-b.year);
const japanEvents = JAPAN_ALL_EVENTS.map(event => ({...event,
  svgPos:event.coordinates ? projectLngLatToJapanMap(...event.coordinates) : [400,360]
}));
// Repair original declarations first so normalization cannot build recommendations
// from stale IDs; validate the generated links once more before the UI consumes them.
const originalGraph = buildHistoryLinkGraph(applySourceReviews([
  ...Object.values(BASE_PERIODS),
  {id:'taiwanLens', name:'臺灣歷史', figures:TAIWAN_DEDICATED_FIGURES,events:taiwanEvents,battles:TAIWAN_RELATED_BATTLES},
  {id:'japanAtlas', name:'日本歷史', figures:JAPAN_FIGURES,events:japanEvents,battles:JAPAN_BATTLES}
]));
const resolvedGraph = buildHistoryLinkGraph(originalGraph.datasets.map(normalizePeriodDataset));
export const HISTORY_LINK_GRAPH = {...resolvedGraph,datasets:applyImagePolicy(applyChronologyReviews(resolvedGraph.datasets))};
const byId = Object.fromEntries(HISTORY_LINK_GRAPH.datasets.map(dataset=>[dataset.id,dataset]));
export const LINKED_PERIODS = Object.fromEntries(Object.keys(BASE_PERIODS).map(id=>[id,byId[id]]));
export const LINKED_TAIWAN_EVENTS = byId.taiwanLens.events;
export const LINKED_JAPAN_EVENTS = byId.japanAtlas.events;
export const LINKED_JAPAN_FIGURES = byId.japanAtlas.figures;
const uniqueById = records => [...new Map(records.map(record=>[record.id,record])).values()];
// First catalog wins for duplicates, consistent with the original pool.
export const ALL_LINKED_FIGURES = HISTORY_LINK_GRAPH.datasets.flatMap(dataset=>dataset.figures).filter((figure,index,all)=>all.findIndex(other=>other.id===figure.id)===index);
export const ALL_LINKED_EVENTS = HISTORY_LINK_GRAPH.datasets.flatMap(dataset=>dataset.events);
export const ALL_LINKED_BATTLES = HISTORY_LINK_GRAPH.datasets.flatMap(dataset=>dataset.battles);
export const LINKED_TAIWAN_FIGURES = uniqueById(ALL_LINKED_FIGURES.filter(figure=>
  TAIWAN_RELATED_FIGURE_IDS.includes(figure.id) || figure.faction==='taiwan' || /[臺台]/.test(figure.hometown || '')
)).sort((a,b)=>(b.importance||3)-(a.importance||3));
