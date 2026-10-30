import test from 'node:test';
import assert from 'node:assert/strict';
import {SOURCE_REFERENCES} from '../src/data/sourceReferences.js';
import {SOURCE_REVIEWS} from '../src/data/sourceReviews.js';
import {HISTORY_LINK_GRAPH} from '../src/data/linkedHistoryCatalog.js';
import {classifyHistorySources} from '../src/utils/historySources.js';

test('biography locations are traceable references, never marked as reviewed',()=>{
 for(const [key,entries] of Object.entries(SOURCE_REFERENCES)) for(const entry of entries){
  // Either a named biography (…傳, optionally 附) or the Wikisource heading quoted in brackets.
  assert.match(entry.title,/^《(三國志|後漢書|晉書)》卷[一二三四五六七八九十]+[上下]?(・[魏蜀吳]書)?(・.+傳(（附 .+）)?|（.+）)$/,key);
  assert.match(entry.url,/^https:\/\/zh\.wikisource\.org\/zh-hant\/(三國志|後漢書|晉書)\/卷\d+[上下]?(#.+)?$/,key);
  assert.equal(entry.externalReviewed,undefined,key);
 }
});
test('later and earlier histories only cite figures from their own era',()=>{
 const figures=new Map(HISTORY_LINK_GRAPH.datasets.find(dataset=>dataset.id==='threeKingdoms').figures.map(figure=>[figure.id,figure]));
 for(const [key,entries] of Object.entries(SOURCE_REFERENCES)) for(const entry of entries){
  const figure=figures.get(key.split(':')[1]);
  if(entry.title.startsWith('《後漢書》')) assert.ok(figure.deathYear<=230,key);
  if(entry.title.startsWith('《晉書》')) assert.ok(figure.deathYear>=235,key);
 }
});
test('hand-reviewed figures keep their review, and same-name mismatches stay unsourced',()=>{
 for(const key of Object.keys(SOURCE_REVIEWS)) assert.equal(SOURCE_REFERENCES[key],undefined,key);
 assert.equal(SOURCE_REFERENCES['threeKingdoms:ma_zhong'],undefined); // 吳將馬忠, not 蜀書卷43
 const figures=HISTORY_LINK_GRAPH.datasets.find(dataset=>dataset.id==='threeKingdoms').figures;
 assert.equal(classifyHistorySources(figures.find(figure=>figure.id==='guan_yu')).status,'traceable-reference');
 assert.equal(classifyHistorySources(figures.find(figure=>figure.id==='zhang_fei')).status,'verified-web');
});
