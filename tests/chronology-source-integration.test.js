import test from 'node:test';
import assert from 'node:assert/strict';
import {HISTORY_LINK_GRAPH} from '../src/data/linkedHistoryCatalog.js';
import {isContextReview,applyChronologyReviews} from '../src/data/chronologyReviews.js';
import {classifyHistorySources} from '../src/utils/historySources.js';
import {linkedEvents} from '../src/utils/figureLinks.js';

test('deceased figures are kept as contextual review links, never direct event participants in the UI split',()=>{
 const dataset=HISTORY_LINK_GRAPH.datasets.find(dataset=>dataset.id==='threeKingdoms');
 const figure=dataset.figures.find(figure=>figure.id==='zhang_fei');
 const event=dataset.events.find(event=>event.id==='evt_northern_expedition_228');
 assert.equal(figure.eventLinkReviews[event.id].status,'outside');
 assert.equal(isContextReview(figure.eventLinkReviews[event.id]),true);
 assert.equal(isContextReview(event.figureLinkReviews[figure.id]),true);
 assert.ok(figure.participatedEventIds.includes(event.id)); // preserved, not erased
 const direct=linkedEvents(figure,dataset.events).filter(event=>!isContextReview(figure.eventLinkReviews[event.id]));
 assert.ok(!direct.some(event=>event.id==='evt_northern_expedition_228'));
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
