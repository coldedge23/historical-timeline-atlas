import test from 'node:test';
import assert from 'node:assert/strict';
import {toSvgPoint} from '../src/utils/svgPoint.js';
import {HISTORICAL_PERIODS} from '../src/data/periodsRegistry.js';

test('array and object map points resolve to the same [x, y]',()=>{
 assert.deepEqual(toSvgPoint([600,320]),[600,320]);
 assert.deepEqual(toSvgPoint({x:600,y:320}),[600,320]);
 for(const bad of [undefined,null,[],[1],{x:1},{x:'a',y:2},[NaN,1]]) assert.deepEqual(toSvgPoint(bad,[512,345]),[512,345]);
});
test('every China-period event with svgPos yields a drawable point',()=>{
 const broken=[];
 for(const [id,period] of Object.entries(HISTORICAL_PERIODS)) for(const e of period.events||[]) if(e.svgPos!==undefined&&!toSvgPoint(e.svgPos)) broken.push(`${id}/${e.id}`);
 assert.deepEqual(broken,[]);
});
