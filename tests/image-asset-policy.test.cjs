const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const os=require('node:os');
const {normalizeImagePath,assertWithin,prepareImageAssets,verifyImageAssets}=require('../scripts/image_asset_policy.cjs');
async function fixture(t){
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'history-image-policy-'));
  t.after(async()=>{assert.ok(root.startsWith(path.join(os.tmpdir(),'history-image-policy-')));await fs.rm(root,{recursive:true,force:true});});
  for(const directory of ['src/data','images/figures','images/archive_koei_backup','dist/images/figures','dist/images/archive_koei_backup'])await fs.mkdir(path.join(root,directory),{recursive:true});
  await fs.writeFile(path.join(root,'package.json'),'{"type":"module"}');
  await fs.writeFile(path.join(root,'src/data/linkedHistoryCatalog.js'),`export const HISTORY_LINK_GRAPH={datasets:[{figures:[{id:'safe',avatar:'./images/figures/safe.svg'}]}]};`);
  await fs.writeFile(path.join(root,'images/archive_koei_backup/old.jpg'),'known archived bytes');
  await fs.writeFile(path.join(root,'images/figures/safe.svg'),'<svg>safe vector</svg>');
  await fs.writeFile(path.join(root,'images/figures/unused_alt.jpg'),'known archived bytes');
  await fs.writeFile(path.join(root,'dist/images/figures/unused_alt.jpg'),'known archived bytes');
  await fs.writeFile(path.join(root,'dist/images/archive_koei_backup/old.jpg'),'known archived bytes');
  return root;
}
test('image path allowlist rejects archive and escaping paths',()=>{
  assert.equal(normalizeImagePath('./images/figures/a.svg'),'images/figures/a.svg');
  assert.throws(()=>normalizeImagePath('images/archive_koei_backup/a.jpg'),/拒絕/);
  assert.throws(()=>normalizeImagePath('images/../a.jpg'),/拒絕/);
  assert.throws(()=>assertWithin(path.resolve('safe'),path.resolve('outside')),/超出/);
});
test('build packs referenced assets only and reversibly quarantines stale archive and unused portraits',async t=>{
  const root=await fixture(t);const result=await prepareImageAssets(root);
  assert.equal(result.images.length,1);assert.equal(result.quarantinedThisBuild.length,2);
  assert.equal(await fs.readFile(path.join(root,'images/figures/unused_alt.jpg'),'utf8'),'known archived bytes');
  assert.equal(await fs.readFile(path.join(root,'_backups/20261030_發布圖像隔離/images/figures/unused_alt.jpg'),'utf8'),'known archived bytes');
  assert.equal(await fs.stat(path.join(root,'dist/images/archive_koei_backup')).catch(()=>null),null);
  assert.equal((await verifyImageAssets(root)).images,1);
  await fs.writeFile(path.join(root,'dist/images/figures/safe.svg'),'known archived bytes');
  await assert.rejects(verifyImageAssets(root),/命中已知備份SHA256/);
});
test('a runtime portrait matching archived bytes blocks the build instead of silently replacing it',async t=>{
  const root=await fixture(t);await fs.writeFile(path.join(root,'images/figures/safe.svg'),'known archived bytes');
  await assert.rejects(prepareImageAssets(root),/runtime avatar 命中已知備份SHA256/);
});

test('persistent denied hashes remain active when local archive directory is absent',async t=>{
  const root=await fixture(t);
  const {knownArchiveHashes}=require('../scripts/image_asset_policy.cjs');
  const baseline=require('../scripts/blocked_image_hashes.json');
  await fs.rename(path.join(root,'images/archive_koei_backup'),path.join(root,'images/archive-moved-by-test'));
  const denied=await knownArchiveHashes(root);
  assert.ok(baseline.hashes.length>0);
  assert.ok(denied.has(baseline.hashes[0]));
});
