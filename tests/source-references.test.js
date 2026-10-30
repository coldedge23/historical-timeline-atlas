import test from 'node:test';
import assert from 'node:assert/strict';
import {SOURCE_REFERENCES} from '../src/data/sourceReferences.js';
import {SOURCE_REVIEWS} from '../src/data/sourceReviews.js';
import {HISTORY_LINK_GRAPH} from '../src/data/linkedHistoryCatalog.js';
import {classifyHistorySources} from '../src/utils/historySources.js';
import {parseBirthDeathYears} from '../src/utils/historicalDates.js';

// Death-year windows each official history may cite (same rule as the 2026-10-31 matching run).
const ERA={後漢書:[0,230],晉書:[235,420],史記:[-3000,-80],漢書:[-250,25],宋書:[400,480],南齊書:[460,510],梁書:[480,560],陳書:[540,600],魏書:[300,560],北齊書:[530,590],周書:[530,600],南史:[400,600],北史:[370,630],隋書:[560,660],舊唐書:[600,960],新唐書:[600,960],宋史:[940,1300],遼史:[890,1160],金史:[1090,1260],元史:[1180,1400],明史:[1340,1700],清史稿:[1580,1930]};
const BOOKS=['三國志',...Object.keys(ERA)].join('|');
const figuresByKey=new Map(HISTORY_LINK_GRAPH.datasets.flatMap(dataset=>dataset.figures.map(figure=>[`${dataset.id}:${figure.id}`,figure])));

test('biography locations are traceable references, never marked as reviewed',()=>{
 for(const [key,entries] of Object.entries(SOURCE_REFERENCES)) for(const entry of entries){
  // Either a named biography (…傳, optionally 附) or the Wikisource heading/name quoted in brackets.
  assert.match(entry.title,new RegExp(`^《(${BOOKS})》卷[一二三四五六七八九十百零]+[上中下]?(・[魏蜀吳]書)?(・.+傳(（附 .+）)?|（.+）)$`),key);
  assert.match(entry.url,new RegExp(`^https://zh\\.wikisource\\.org/zh-hant/(${BOOKS})/卷\\d+[上中下]?(#.+)?$`),key);
  assert.equal(entry.externalReviewed,undefined,key);
  assert.ok(figuresByKey.has(key),key);
 }
});
test('each history only cites figures from its own era',()=>{
 for(const [key,entries] of Object.entries(SOURCE_REFERENCES)) for(const entry of entries){
  const book=entry.title.match(/^《(.+?)》/)[1];
  if(!ERA[book]) continue;
  if(book==='史記'&&/^(xiaShangZhou|warringStates):/.test(key)) continue; // pre-Qin: 史記 only, dates often legendary
  const {deathYear}=parseBirthDeathYears(figuresByKey.get(key));
  assert.ok(deathYear>=ERA[book][0]&&deathYear<=ERA[book][1],`${key} ${book} ${deathYear}`);
 }
});
test('hand-reviewed figures keep their review, and same-name or courtesy-name mismatches stay out',()=>{
 for(const key of Object.keys(SOURCE_REVIEWS)) assert.equal(SOURCE_REFERENCES[key],undefined,key);
 assert.equal(SOURCE_REFERENCES['threeKingdoms:ma_zhong'],undefined); // 吳將馬忠, not 蜀書卷43
 assert.ok(!SOURCE_REFERENCES['songLiao:kou_zhun'].some(entry=>entry.url.endsWith('卷344'))); // 平仲 there is another man
 assert.ok(!(SOURCE_REFERENCES['weiJin:wang_meng']||[]).some(entry=>entry.title.startsWith('《魏書》'))); // 景略 there is 元景略
 const figures=HISTORY_LINK_GRAPH.datasets.find(dataset=>dataset.id==='threeKingdoms').figures;
 assert.equal(classifyHistorySources(figures.find(figure=>figure.id==='guan_yu')).status,'traceable-reference');
 assert.equal(classifyHistorySources(figures.find(figure=>figure.id==='zhang_fei')).status,'verified-web');
});
