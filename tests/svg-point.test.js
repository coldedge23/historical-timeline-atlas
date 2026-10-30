import test from 'node:test';
import assert from 'node:assert/strict';
import {toSvgPoint,projectChinaLngLat,resolveChinaEventPoint} from '../src/utils/svgPoint.js';
import {HISTORICAL_PERIODS} from '../src/data/periodsRegistry.js';

test('array and object map points resolve to the same [x, y]',()=>{
 assert.deepEqual(toSvgPoint([600,320]),[600,320]);
 assert.deepEqual(toSvgPoint({x:600,y:320}),[600,320]);
 for(const bad of [undefined,null,[],[1],{x:1},{x:'a',y:2},[NaN,1]]) assert.deepEqual(toSvgPoint(bad,[512,345]),[512,345]);
});
test('hand-placed svgPos wins; coordinates are projected in either order; off-map places draw nothing',()=>{
 assert.deepEqual(resolveChinaEventPoint({svgPos:{x:600,y:320},coordinates:[0,0]}),[600,320]);
 const wuchang=resolveChinaEventPoint({coordinates:[114.3,30.55]});
 assert.deepEqual(resolveChinaEventPoint({coordinates:[30.55,114.3]}),wuchang);
 assert.deepEqual(resolveChinaEventPoint({coordinates:{lat:30.55,lng:114.3}}),wuchang);
 assert.equal(resolveChinaEventPoint({coordinates:[31.13,29.98]}),null);
 assert.equal(projectChinaLngLat(31.13,29.98),null);
 assert.equal(resolveChinaEventPoint({}),null);
});
test('every China-period event resolves to a map point, except places outside the drawn map',()=>{
 const unplaced=[];
 for(const [id,period] of Object.entries(HISTORICAL_PERIODS)) for(const e of period.events||[]) if(!resolveChinaEventPoint(e)) unplaced.push(`${id}/${e.id}`);
 assert.deepEqual(unplaced,['republicModern/evt_1943_cairo_conference']);
});
