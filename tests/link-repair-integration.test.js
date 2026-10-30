import test from 'node:test';
import assert from 'node:assert/strict';
import { HISTORY_LINK_GRAPH, ALL_LINKED_FIGURES, ALL_LINKED_EVENTS } from '../src/data/linkedHistoryCatalog.js';
import { linkedEvents, figureRelations, pendingLinkCount } from '../src/utils/figureLinks.js';
import { buildHistoryLinkGraph } from '../src/data/historyLinkGraph.js';

test('render catalog has no active dangling figure, event or relationship references', () => {
  const figures = new Set(ALL_LINKED_FIGURES.map(figure=>figure.id));
  const events = new Set(ALL_LINKED_EVENTS.map(event=>event.id));
  for (const dataset of HISTORY_LINK_GRAPH.datasets) {
    for (const event of dataset.events) for (const id of event.figureIds || event.figuresInvolved || []) assert.ok(figures.has(id),`${dataset.id}/${event.id}->${id}`);
    for (const figure of dataset.figures) {
      for (const id of figure.participatedEventIds || []) assert.ok(events.has(id),`${dataset.id}/${figure.id}->${id}`);
      for (const relation of figure.relations || []) assert.ok(figures.has(relation.figureId),`${dataset.id}/${figure.id}->${relation.figureId}`);
      assert.equal(linkedEvents(figure, ALL_LINKED_EVENTS).length,new Set(figure.participatedEventIds || []).size);
    }
  }
});

test('confirmed aliases resolve, while unconfirmed participation stays out of active counts', () => {
  const song = HISTORY_LINK_GRAPH.datasets.find(dataset=>dataset.id==='songLiao');
  assert.ok(song.events.find(event=>event.id==='evt_song_01').figureIds.includes('zhao_kuangyin'));
  const warring = HISTORY_LINK_GRAPH.datasets.find(dataset=>dataset.id==='warringStates');
  const emperor = warring.figures.find(figure=>figure.id==='qin_shihuang');
  assert.ok(emperor.participatedEventIds.includes('evt_qin_unify_221'));
  const hanfei = warring.figures.find(figure=>figure.id==='han_feizi');
  assert.ok(!hanfei.participatedEventIds.includes('evt_qin_unify_221'));
  assert.ok(hanfei.pendingLinks.some(link=>link.id==='evt_wangjian_mie_liuguo_221'));
});

test('pending references do not inflate unique visible event and relationship counts', () => {
  const seed=[{id:'a',events:[{id:'e',year:100}],figures:[{id:'one',participatedEventIds:['e','e','missing'],relations:[{figureId:'two'},{figureId:'two'},{figureId:'absent'}]},{id:'two',relations:[{figureId:'one'}]}]}];
  const graph=buildHistoryLinkGraph(seed,{figureCorrections:{},eventCorrections:{}});
  const figure=graph.datasets[0].figures[0];
  assert.equal(linkedEvents(figure,graph.datasets[0].events).length,1);
  assert.equal(figureRelations(figure,graph.datasets[0].figures).length,1);
  assert.equal(pendingLinkCount(figure),2);
});

test('cross-period event links keep destination context and resolve outside the current period', () => {
  const graph=buildHistoryLinkGraph([{id:'from',figures:[{id:'person',participatedEventIds:['e']}],events:[]},{id:'japanAtlas',figures:[],events:[{id:'e',year:1500,eraId:'jp_sengoku'}]}],{figureCorrections:{},eventCorrections:{}});
  const figure=graph.datasets[0].figures[0];
  const [event]=linkedEvents(figure,graph.datasets.flatMap(dataset=>dataset.events));
  assert.equal(event.datasetId,'japanAtlas');
  assert.equal(event.civ,'japan');
  assert.equal(event.eraId,'jp_sengoku');
});
