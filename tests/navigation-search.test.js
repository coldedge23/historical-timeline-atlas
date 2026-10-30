import test from 'node:test';
import assert from 'node:assert/strict';
import {parseNavigationHash, serializeNavigation, resolveNavigation, unknownRouteParts} from '../src/utils/navigation.js';
import {createSearchIndex, searchIndex} from '../src/utils/search.js';
const catalogs = {
 yuanMing:{id:'yuanMing',name:'元明',events:[{id:'cn',title:'朱元璋建國'}],figures:[],battles:[]},
 taiwan:{id:'taiwanLens',civ:'taiwan',name:'臺灣歷史',events:[{id:'tw',title:'臺灣事件',eraId:'tw_tungning'}],figures:[{id:'tw_fig',name:'臺灣人物'}],battles:[{id:'tw_bat',name:'臺灣戰役'}]},
 japan:{id:'japanAtlas',civ:'japan',name:'日本歷史',events:[{id:'jp',title:'日本事件',eraId:'jp_sengoku'},{id:'jp_edo_evt',title:'江戶事件',eraId:'jp_edo'}],figures:[{id:'jp_fig',name:'織田信長'}],battles:[{id:'jp_bat',name:'關原之戰'}]}
};
const eras={taiwan:[{id:'tw_tungning'}], japan:[{id:'jp_sengoku'},{id:'jp_edo'}]};
test('explicit civ, legacy lens, and malformed route defaults are supported',()=>{
 assert.equal(parseNavigationHash('#civ=japan').civ,'japan');
 assert.equal(parseNavigationHash('#lens=taiwan').civ,'taiwan');
 assert.equal(parseNavigationHash('#civ=other&tab=other').civ,'china');
 assert.equal(parseNavigationHash('#tab=other').tab,'map-timeline');
});
test('Japanese and Taiwanese entity links restore from their own catalogs',()=>{
 for(const [civ,prefix] of [['japan','jp'],['taiwan','tw']]){
  const route=resolveNavigation('#civ='+civ+'&figure='+prefix+'_fig&battle='+prefix+'_bat',catalogs,eras);
  assert.equal(route.selectedFigure.id,prefix+'_fig'); assert.equal(route.selectedBattle.id,prefix+'_bat');
  assert.equal(parseNavigationHash(serializeNavigation(route)).civ,civ);
 }
});
test('explicit event takes its own era; stale ids recover to the selected era',()=>{
 assert.equal(resolveNavigation('#civ=japan&event=jp_edo_evt&era=jp_sengoku',catalogs,eras).era,'jp_edo');
 const route=resolveNavigation('#civ=japan&event=missing&era=jp_edo&figure=missing',catalogs,eras);
 assert.equal(route.selectedEvent.id,'jp_edo_evt'); assert.equal(route.selectedFigure,null);
});
test('cross-civilization search returns dedicated figures and battles with navigation metadata',()=>{
 const index=createSearchIndex(Object.values(catalogs));
 for(const [query,civ,type] of [['織田信長','japan','figure'],['臺灣戰役','taiwan','battle'],['朱元璋','china','event']]){
  const found=searchIndex(index,query,'yuanMing'); assert.equal(found[0].civ,civ); assert.equal(found[0].type,type);
 }
 assert.deepEqual(searchIndex(index,'不存在','yuanMing'),[]);
 assert.deepEqual(searchIndex(index,'  ','yuanMing'),[]);
});
test('unknown period or civilization in a link is reported, valid ones are not',()=>{
 const known=id=>['yuanMing','threeKingdoms'].includes(id);
 assert.deepEqual(unknownRouteParts('#period=sanguo',known),{civ:'',period:'sanguo'});
 assert.deepEqual(unknownRouteParts('#civ=korea',known),{civ:'korea',period:''});
 assert.deepEqual(unknownRouteParts('#period=threeKingdoms&event=x',known),{civ:'',period:''});
 assert.deepEqual(unknownRouteParts('',known),{civ:'',period:''});
});
