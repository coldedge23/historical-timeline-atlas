import test from 'node:test';
import assert from 'node:assert/strict';
import { buildHistoryLinkGraph } from '../src/data/historyLinkGraph.js';
const tables = { figureCorrections: { 'a:old': {to:'good',evidence:'記錄ID校正'}, 'a:absent':{to:'also-absent',evidence:'無目標'} }, eventCorrections: {'a:old-event':{to:'event-b',evidence:'事件ID校正'}} };
const seed = () => [{id:'a', events:[{id:'event-a',year:100,figureIds:['old','old','missing','absent','shared'],figuresInvolved:['old']}], figures:[{id:'shared',name:'本期'},{id:'owner',participatedEventIds:['old-event','unknown-event'],relations:[{figureId:'old',relationType:'ally'},{figureId:'no-relation'}]}],battles:[]}, {id:'japanAtlas', events:[{id:'event-b',year:101,eraId:'jp_sengoku'}],figures:[{id:'good',name:'確認人物'},{id:'shared',name:'跨期同名ID'}],battles:[]}];
test('link graph applies explicit corrections, deduplicates, and retains original immutable references', () => {
  const raw=seed(), before=structuredClone(raw);
  const graph=buildHistoryLinkGraph(raw,tables);
  assert.deepEqual(raw,before);
  assert.notEqual(graph.datasets[0],raw[0]);
  const event=graph.datasets[0].events[0];
  assert.deepEqual(event.figureIds,['good','shared']);
  assert.deepEqual(event.originalLinkIds.figureIds,raw[0].events[0].figureIds);
  assert.equal(event.linkTargets.figures.find(target=>target.id==='shared').datasetId,'a');
  assert.equal(event.linkTargets.figures.find(target=>target.id==='good').civ,'japan');
  const owner=graph.datasets[0].figures.find(figure=>figure.id==='owner');
  assert.deepEqual(owner.participatedEventIds,['event-b']);
  assert.equal(owner.linkTargets.events[0].eraId,'jp_sengoku');
  assert.equal(owner.relations[0].figureId,'good');
  assert.equal(owner.relations[0].civ,'japan');
  assert.ok(graph.repairs.every(repair=>repair.evidence));
  assert.equal(graph.pending.length,4);
  assert.match(graph.pending.find(link=>link.id==='absent').reason,/校正目標/);
});
test('existing local IDs win even when a correction table contains a different target', () => {
  const graph=buildHistoryLinkGraph(seed(),{...tables,figureCorrections:{...tables.figureCorrections,'a:shared':{to:'good',evidence:'不得蓋過有效資料'}}});
  assert.ok(graph.datasets[0].events[0].figureIds.includes('shared'));
  assert.ok(!graph.repairs.some(repair=>repair.from==='shared'));
});
test('unknown relations stay visible as pending and are removed from active links', () => {
  const graph=buildHistoryLinkGraph(seed(),tables);
  const owner=graph.datasets[0].figures.find(figure=>figure.id==='owner');
  assert.equal(owner.relations.length,1);
  assert.ok(owner.pendingLinks.some(link=>link.kind==='relation' && link.id==='no-relation'));
  const repeated=buildHistoryLinkGraph(graph.datasets,tables);
  assert.equal(repeated.pending.length,graph.pending.length);
  assert.deepEqual(repeated.datasets[0].events[0].originalLinkIds,graph.datasets[0].events[0].originalLinkIds);
});

test('owner-specific correction and participation whitelist prevent indiscriminate event aliases', () => {
  const raw=[{id:'a',events:[{id:'target',year:100},{id:'specific',year:101}],figures:[{id:'approved',participatedEventIds:['old']},{id:'unconfirmed',participatedEventIds:['old']},{id:'specific-owner',participatedEventIds:['old']}],battles:[]}];
  const result=buildHistoryLinkGraph(raw,{figureCorrections:{},eventCorrections:{'a:old':{to:'target',evidence:'別名確認',allowedFigureIds:['approved']},'a:specific-owner:old':{to:'specific',evidence:'個別引用確認'}}});
  assert.deepEqual(result.datasets[0].figures[0].participatedEventIds,['target']);
  assert.deepEqual(result.datasets[0].figures[1].participatedEventIds,[]);
  assert.match(result.datasets[0].figures[1].pendingLinks[0].reason,/人物參與關係待確認/);
  assert.deepEqual(result.datasets[0].figures[2].participatedEventIds,['specific']);
});

test('cross-period event-declared figure links produce traceable reverse navigation without rewriting original references', () => {
  const raw=[{id:'songLiao',events:[{id:'song-event',year:1279,figureIds:['kublai']}],figures:[],battles:[]},{id:'yuanMing',events:[{id:'local-event',year:1271}],figures:[{id:'kublai',participatedEventIds:['local-event']}],battles:[]}];
  const before=structuredClone(raw);
  const result=buildHistoryLinkGraph(raw,{figureCorrections:{},eventCorrections:{}});
  const figure=result.datasets[1].figures[0];
  assert.deepEqual(figure.participatedEventIds,['local-event','song-event']);
  assert.deepEqual(figure.originalLinkIds.participatedEventIds,['local-event']);
  assert.equal(figure.linkTargets.events[1].datasetId,'songLiao');
  assert.deepEqual(figure.derivedEventLinks,[{eventId:'song-event',datasetId:'songLiao',basis:'event-declared-figure'}]);
  assert.deepEqual(raw,before);
  const again=buildHistoryLinkGraph(result.datasets,{figureCorrections:{},eventCorrections:{}});
  assert.equal(again.datasets[1].figures[0].derivedEventLinks.length,1);
});
test('reverse navigation never overrides disputed participation, same-dataset discrepancies, or an existing local event ID', () => {
  const raw=[{id:'a',events:[{id:'cross-event',year:221,figureIds:['disputed','local-first']}],figures:[],battles:[]},{id:'b',events:[{id:'cross-event',year:200},{id:'same-event',year:201,figureIds:['same-dataset']}],figures:[{id:'disputed',participatedEventIds:['old-event']},{id:'local-first',participatedEventIds:['cross-event']},{id:'same-dataset',participatedEventIds:[]}],battles:[]}];
  const result=buildHistoryLinkGraph(raw,{figureCorrections:{},eventCorrections:{'b:old-event':{to:'cross-event',evidence:'別名明確但參與待查',allowedFigureIds:['someone-else']}}});
  const [disputed,localFirst,sameDataset]=result.datasets[1].figures;
  assert.deepEqual(disputed.participatedEventIds,[]);
  assert.ok(disputed.pendingLinks.some(link=>link.id==='old-event'));
  assert.equal(localFirst.linkTargets.events[0].datasetId,'b');
  assert.equal(localFirst.derivedEventLinks,undefined);
  assert.deepEqual(sameDataset.participatedEventIds,[]);
});
