import test from 'node:test';
import assert from 'node:assert/strict';
import {HISTORY_LINK_GRAPH} from '../src/data/linkedHistoryCatalog.js';
import {isContextReview,applyChronologyReviews} from '../src/data/chronologyReviews.js';
import {classifyHistorySources} from '../src/utils/historySources.js';
import {linkedEvents} from '../src/utils/figureLinks.js';

test('a link outside the lifespan stays contextual, never a direct event participant in the UI split',()=>{
 // Synthetic data: the real dataset no longer holds such links after the 2026-10-30 cleanup.
 const [dataset]=applyChronologyReviews([{id:'t',
  figures:[{id:'f',datasetId:'t',birthYear:150,deathYear:200,participatedEventIds:['e']}],
  events:[{id:'e',datasetId:'t',year:210,figureIds:['f']}]}]);
 const figure=dataset.figures[0],event=dataset.events[0];
 assert.equal(figure.eventLinkReviews.e.status,'outside');
 assert.equal(isContextReview(figure.eventLinkReviews.e),true);
 assert.equal(isContextReview(event.figureLinkReviews.f),true);
 const direct=linkedEvents(figure,dataset.events).filter(item=>!isContextReview(figure.eventLinkReviews[item.id]));
 assert.equal(direct.length,0);
});

test('links judged unsupported on 2026-10-30 are removed from both sides',()=>{
 // 張飛 died 221 (Wikisource review in sourceReviews.js); 袁譚 died 205 by the record's own exact year.
 const dataset=HISTORY_LINK_GRAPH.datasets.find(dataset=>dataset.id==='threeKingdoms');
 for(const [figureId,eventId] of [['zhang_fei','evt_northern_expedition_228'],['yuan_tan','evt_bailangshan_207']]){
  const figure=dataset.figures.find(item=>item.id===figureId);
  const event=dataset.events.find(item=>item.id===eventId);
  assert.ok(!figure.participatedEventIds.includes(event.id),figureId);
  assert.ok(!(event.figureIds||[]).includes(figure.id),figureId);
 }
});

test('posthumous commentary has an owner-specific explanation and narrowly scoped external review',()=>{
 const figure=HISTORY_LINK_GRAPH.datasets.find(dataset=>dataset.id==='threeKingdoms').figures.find(figure=>figure.id==='guo_jia');
 assert.equal(figure.eventLinkReviews.evt_chibi_208.type,'posthumous-influence');
 const source=classifyHistorySources(figure);
 assert.equal(source.reviewed,true);
 assert.ok(source.claimScopes.some(scope=>scope.includes('不是郭嘉親自參加')));
 const other=HISTORY_LINK_GRAPH.datasets.find(dataset=>dataset.id==='threeKingdoms').figures.find(figure=>figure.id==='liu_bei');
 assert.equal(classifyHistorySources(other).reviewed,false);
});

test('review layer preserves inputs and separates partial event intervals from incompatible dates',()=>{
 const input=[{id:'sample',figures:[{id:'f',datasetId:'sample',birthYear:200,deathYear:213,participatedEventIds:['e']}],events:[{id:'e',datasetId:'sample',year:214,yearDisplay:'212—214',figureIds:['f']}]}];
 const before=structuredClone(input);
 const result=applyChronologyReviews(input);
 assert.deepEqual(input,before);
 assert.equal(result[0].figures[0].eventLinkReviews.e.status,'overlap');
 assert.equal(isContextReview(result[0].figures[0].eventLinkReviews.e),false);
});
