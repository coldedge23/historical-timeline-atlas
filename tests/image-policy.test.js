import test from 'node:test';
import assert from 'node:assert/strict';
import {applyImagePolicy,QUARANTINED_AVATAR_PATHS} from '../src/data/imagePolicy.js';
test('known archived avatar matches become reversible name placeholders without mutating raw records',()=>{
  const blocked=QUARANTINED_AVATAR_PATHS[0];
  const raw=[{id:'test',figures:[{id:'a',name:'甲',avatar:'./'+blocked},{id:'b',avatar:'images/figures/unrelated.svg'}]}];
  const original=structuredClone(raw),result=applyImagePolicy(raw);
  assert.deepEqual(raw,original);assert.equal(result[0].figures[0].avatar,'');
  assert.equal(result[0].figures[0].originalAvatar,'./'+blocked);
  assert.equal(result[0].figures[0].imageReview.status,'quarantined-archive-match');
  assert.equal(result[0].figures[1].avatar,'images/figures/unrelated.svg');
  assert.deepEqual(applyImagePolicy(result),result);
});
