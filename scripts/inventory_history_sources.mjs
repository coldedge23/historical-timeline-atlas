import {pathToFileURL,fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {writeFile,mkdir} from 'node:fs/promises';
import {classifyHistorySources,HISTORY_SOURCE_FIELDS} from '../src/utils/historySources.js';
import {TAIWAN_LENS_ERAS,TAIWAN_DEDICATED_FIGURES,TAIWAN_RELATED_BATTLES} from '../src/data/taiwanLensData.js';
import {JAPAN_ALL_EVENTS,JAPAN_FIGURES,JAPAN_BATTLES} from '../src/data/japan/index.js';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const datasets=[];
for(const id of ['xiaShangZhou','warringStates','qinHan','threeKingdoms','weiJin','suiTang','songLiao','yuanMing','qingDynasty','republicModern']){
  const dataset={id};
  for(const kind of ['events','figures','battles']){
    const mod=await import(pathToFileURL(resolve(root,'src/data',id==='threeKingdoms'?id:`periods/${id}`,`${kind}.js`)).href);
    dataset[kind]=Object.entries(mod).find(([key,value])=>key.endsWith(`_${kind.toUpperCase()}`)&&Array.isArray(value))[1];
  }
  datasets.push(dataset);
}
datasets.push({id:'taiwanLens',events:TAIWAN_LENS_ERAS.flatMap(era=>era.keyEvents||[]),figures:TAIWAN_DEDICATED_FIGURES,battles:TAIWAN_RELATED_BATTLES});
datasets.push({id:'japanAtlas',events:JAPAN_ALL_EVENTS,figures:JAPAN_FIGURES,battles:JAPAN_BATTLES});
const hasLegacySource=record=>HISTORY_SOURCE_FIELDS.some(field=>Array.isArray(record[field])?record[field].length>0:typeof record[field]==='string'&&record[field].trim());
const alternativeKeys=['bibliography','sourceNotes','historicalSources','provenance','出處','史料來源','資料來源'];
const statusCounts={},byDataset={},byKind={},legacyPresence={present:0,missing:0},sourceFieldPresence={},candidates={explicitAlternativeFields:{records:0,byField:{},examples:[]},narrativeBookMentions:{records:0,byField:{},examples:[]},nonSourceUrls:{records:0,byField:{},examples:[]}};
const addCandidate=(group,field,record,datasetId,kind,value)=>{
  group.byField[field]=(group.byField[field]||0)+1;
  if(group.examples.length<5) group.examples.push({datasetId,kind,id:record.id,field,excerpt:value.slice(0,220),automaticPromotion:false});
};
let total=0;
for(const dataset of datasets)for(const kind of ['events','figures','battles'])for(const record of dataset[kind]){
  total++;
  const status=classifyHistorySources(record).status;
  statusCounts[status]=(statusCounts[status]||0)+1;
  (byDataset[dataset.id]??={total:0,statusCounts:{}}).total++;
  byDataset[dataset.id].statusCounts[status]=(byDataset[dataset.id].statusCounts[status]||0)+1;
  (byKind[kind]??={total:0,statusCounts:{}}).total++;
  byKind[kind].statusCounts[status]=(byKind[kind].statusCounts[status]||0)+1;
  const legacyPresent=hasLegacySource(record); legacyPresence[legacyPresent?'present':'missing']++;
  for(const field of HISTORY_SOURCE_FIELDS)if(record[field]!=null)sourceFieldPresence[field]=(sourceFieldPresence[field]||0)+1;
  if(legacyPresent)continue;
  const hitGroups=new Set();
  for(const [field,value]of Object.entries(record)){
    if(HISTORY_SOURCE_FIELDS.includes(field)||field==='avatar')continue;
    const text=typeof value==='string'?value:Array.isArray(value)&&value.every(item=>typeof item==='string')?value.join('；'):'';
    if(!text)continue;
    if(alternativeKeys.includes(field)) {addCandidate(candidates.explicitAlternativeFields,field,record,dataset.id,kind,text);hitGroups.add('explicitAlternativeFields');}
    if(/《[^》]{2,100}》/.test(text)){addCandidate(candidates.narrativeBookMentions,field,record,dataset.id,kind,text);hitGroups.add('narrativeBookMentions');}
    if(/https?:\/\//i.test(text)){addCandidate(candidates.nonSourceUrls,field,record,dataset.id,kind,text);hitGroups.add('nonSourceUrls');}
  }
  for(const group of hitGroups)candidates[group].records++;
}
const report={date:'2026-10-30',scope:'12組原始資料的events/figures/battles；不含人口統計巢狀欄位或normalizer生成內容',unit:'datasetId + kind + id；跨期同ID分別計入',networkReviewed:false,total,legacyPresence,statusCounts,byDataset,byKind,sourceFieldPresence,candidates,interpretation:[
  'explicitAlternativeFields僅是其他明確來源欄位候選，尚未自動搬移或核實。',
  '敘事中的書名可能是人物著作、名言或事件內容；不能因出現書名就當作該筆資料來源。',
  'avatar圖像URL不等於人物或事件內容來源，已排除；其餘非來源URL仍需判斷用途。',
  '不產生不存在的引用，不把書目或網址標成已查證；verified-web需要明確externalReviewed=true、有效URL及claimScope。'
],reproduce:'node scripts/inventory_history_sources.mjs'};
await mkdir(resolve(root,'docs'),{recursive:true});
const output=resolve(root,'docs/20261030_來源欄位盤點.json');
await writeFile(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({total,legacyPresence,statusCounts,candidateCounts:Object.fromEntries(Object.entries(candidates).map(([key,value])=>[key,value.records])),output},null,2));
