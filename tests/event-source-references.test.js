import test from 'node:test';
import assert from 'node:assert/strict';
import {EVENT_SOURCE_REFERENCES} from '../src/data/eventSourceReferences.js';
import {SOURCE_REFERENCES} from '../src/data/sourceReferences.js';
import {SOURCE_REVIEWS} from '../src/data/sourceReviews.js';
import {HISTORY_LINK_GRAPH} from '../src/data/linkedHistoryCatalog.js';
import {classifyHistorySources} from '../src/utils/historySources.js';

const recordsByKey=new Map(HISTORY_LINK_GRAPH.datasets.flatMap(dataset=>[...dataset.events,...dataset.battles].map(record=>[`${dataset.id}:${record.id}`,record])));
// A figure's location, from the unreviewed list or a reviewed excerpt (only title and url are reused, never the review).
const biographies=new Set([...Object.values(SOURCE_REFERENCES),...Object.values(SOURCE_REVIEWS)].flat().map(entry=>`${entry.title}|${entry.url}`));
const DIGITS='〇一二三四五六七八九';
const westernYear=(bc,digits)=>(bc?-1:1)*(/^\d+$/.test(digits)?Number(digits):Number([...digits.replace(/零/g,'〇')].map(c=>DIGITS.indexOf(c)).join('')));
// 魯公 reign start years (BCE) as the 春秋 chronology counts them.
const DUKES={隱公:722,桓公:711,莊公:693,閔公:661,僖公:659,文公:626,宣公:608,成公:590,襄公:572,昭公:541,定公:509,哀公:494};
const NUM={一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9};
const cnNumber=text=>{if(text==='元') return 1;const t=text.replace('廿','二十').replace('卅','三十');const [tens,ones]=t.includes('十')?t.split('十'):['',t];return (t.includes('十')?(NUM[tens]||1)*10:0)+(NUM[ones]||0);};
const dukeYear=heading=>{const [,duke,n]=heading.match(/^(.公)(.+)年$/);return -(DUKES[duke]-cnNumber(n)+1);};

test('event and battle locations point at real records and stay unreviewed',()=>{
 for(const [key,entries] of Object.entries(EVENT_SOURCE_REFERENCES)){
  const record=recordsByKey.get(key);
  assert.ok(record,key);
  assert.ok(entries.length>=1&&entries.length<=3,key);
  assert.equal(new Set(entries.map(entry=>entry.url)).size,entries.length,key);
  for(const entry of entries) assert.equal(entry.externalReviewed,undefined,key);
  assert.equal(classifyHistorySources(record).status,'traceable-reference',key);
 }
});
test('資治通鑑 and 左傳 entries cite the year section of the record year',()=>{
 for(const [key,entries] of Object.entries(EVENT_SOURCE_REFERENCES)) for(const entry of entries){
  const year=recordsByKey.get(key).year;
  if(entry.title.startsWith('《資治通鑑》')){
   assert.match(entry.title,/^《資治通鑑》卷[一二三四五六七八九十百零]+(・[^（]+)?（.+）$/,key);
   assert.match(entry.url,/^https:\/\/zh\.wikisource\.org\/zh-hant\/資治通鑑\/卷\d{3}(#.+)?$/,key);
   // Year markers that are headings carry an anchor with the Western year; check it when present.
   const m=entry.url.match(/[，、；](?:西元|公元)(前)?([〇零一二三四五六七八九0-9]+)年[；）〉]/);
   if(m) assert.equal(westernYear(m[1],m[2]),year,key);
  } else if(entry.title.startsWith('《春秋左氏傳》')){
   const m=entry.url.match(/^https:\/\/zh\.wikisource\.org\/zh-hant\/春秋左氏傳\/(.公)#(.公.+年)$/);
   assert.ok(m&&entry.title===`《春秋左氏傳》${m[2]}`&&m[2].startsWith(m[1]),key);
   assert.equal(dukeYear(m[2]),year,key);
  }
 }
});
test('biography entries reuse a figure biography location verbatim',()=>{
 for(const [key,entries] of Object.entries(EVENT_SOURCE_REFERENCES)) for(const entry of entries){
  if(/^《(資治通鑑|春秋左氏傳)》/.test(entry.title)) continue;
  if(key.startsWith('republicModern:')) assert.match(entry.url,/^https:\/\/zh\.wikisource\.org\/zh-hant\/.+/,key); // primary documents, see docs
  else assert.ok(biographies.has(`${entry.title}|${entry.url}`),`${key} ${entry.title}`);
 }
});
