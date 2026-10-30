const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const {pathToFileURL} = require('node:url');
const EXPLICIT_IMAGE_ALLOWLIST = []; // Maps are inline SVG; no unreferenced image exceptions.
const hashBytes = value => crypto.createHash('sha256').update(value).digest('hex');
function assertWithin(root,target) {
  const resolvedRoot=path.resolve(root), resolvedTarget=path.resolve(target);
  if(resolvedTarget!==resolvedRoot&&!resolvedTarget.startsWith(resolvedRoot+path.sep))throw new Error(`圖像路徑超出預期目錄：${target}`);
  return resolvedTarget;
}
function normalizeImagePath(value) {
  if(typeof value!=='string'||!value.trim())return null;
  if(/^https?:\/\//i.test(value))return null;
  const normalized=value.replace(/^\.\//,'').replace(/^\//,'').split(/[?#]/)[0].replaceAll('\\','/');
  if(!normalized.startsWith('images/')||normalized.split('/').some(part=>part==='..'||part==='archive_koei_backup'))throw new Error(`拒絕發布圖像路徑：${value}`);
  return normalized;
}
async function listFiles(directory) {
  const result=[];
  try { for(const entry of await fs.readdir(directory,{withFileTypes:true})) {const file=path.join(directory,entry.name);if(entry.isDirectory())result.push(...await listFiles(file));else if(entry.isFile())result.push(file);} }
  catch(error){if(error.code!=='ENOENT')throw error;}
  return result;
}
async function parallelMap(items,work,limit=12) {
  const result=new Array(items.length);let index=0;
  await Promise.all(Array.from({length:Math.min(limit,items.length)},async()=>{while(index<items.length){const current=index++;result[current]=await work(items[current]);}}));
  return result;
}
async function collectRuntimeImagePaths(root) {
  const {HISTORY_LINK_GRAPH}=await import(pathToFileURL(path.join(root,'src/data/linkedHistoryCatalog.js')).href);
  const paths=new Set(EXPLICIT_IMAGE_ALLOWLIST);
  for(const dataset of HISTORY_LINK_GRAPH.datasets)for(const figure of dataset.figures){const image=normalizeImagePath(figure.avatar);if(image)paths.add(image);}
  return [...paths].sort();
}
async function knownArchiveHashes(root) {
  const archive=assertWithin(root,path.join(root,'images/archive_koei_backup'));
  const files=await listFiles(archive);
  const baseline=JSON.parse(await fs.readFile(path.join(__dirname,'blocked_image_hashes.json'),'utf8'));
  if(!Array.isArray(baseline.hashes)||baseline.hashes.some(hash=>! /^[a-f0-9]{64}$/.test(hash)))throw new Error('已知備份SHA256基準格式錯誤');
  const hashes=new Set(baseline.hashes);
  for(const hash of await parallelMap(files,async file=>hashBytes(await fs.readFile(file))))hashes.add(hash);
  if(!hashes.size)throw new Error('缺少已知備份圖像基準，無法執行發布排除檢查');
  return hashes;
}
async function imagePlan(root) {
  const paths=await collectRuntimeImagePaths(root), denied=await knownArchiveHashes(root);
  const images=await parallelMap(paths,async relative=>{
    const file=assertWithin(path.join(root,'images'),path.join(root,relative));
    const bytes=await fs.readFile(file), sha256=hashBytes(bytes);
    if(denied.has(sha256))throw new Error(`runtime avatar 命中已知備份SHA256，停止發布：${relative}`);
    return {path:relative,sha256,bytes:bytes.length};
  });
  return {images,denied};
}
async function prepareImageAssets(root,{codeOnly=false}={}) {
  const {images,denied}=await imagePlan(root);
  const allowed=new Set(images.map(image=>image.path));
  const dist=assertWithin(root,path.join(root,'dist'));
  const quarantine=assertWithin(root,path.join(root,'_backups/20261030_發布圖像隔離'));
  const moves=[];
  for(const file of await listFiles(path.join(dist,'images'))) {
    const relative=path.relative(dist,file).replaceAll('\\','/');
    if(allowed.has(relative))continue;
    const originalTarget=assertWithin(quarantine,path.join(quarantine,relative));
    let target=originalTarget,suffix=1;
    while(await fs.stat(target).catch(()=>null))target=originalTarget+`.${suffix++}`;
    await fs.mkdir(path.dirname(target),{recursive:true});
    // Each source and destination is explicitly checked before each reversible move.
    assertWithin(path.join(dist,'images'),file);assertWithin(quarantine,target);
    await fs.rename(file,target);
    moves.push({from:path.relative(root,file).replaceAll('\\','/'),to:path.relative(root,target).replaceAll('\\','/'),reason:'not-runtime-referenced-or-explicitly-allowed'});
  }
  await parallelMap(images,async image=>{
    const source=assertWithin(path.join(root,'images'),path.join(root,image.path));
    const target=assertWithin(path.join(dist,'images'),path.join(dist,image.path));
    const current=await fs.readFile(target).catch(()=>null);
    if(current&&hashBytes(current)===image.sha256)return;
    if(codeOnly)throw new Error(`--code-only 發布圖像缺失或與原圖不符：${image.path}；請完整建置`);
    await fs.mkdir(path.dirname(target),{recursive:true});await fs.copyFile(source,target);
  });
  // Remove only empty directories, never recursively delete image content.
  const oldArchive=assertWithin(dist,path.join(dist,'images/archive_koei_backup'));
  await fs.rmdir(oldArchive).catch(error=>{if(!['ENOENT','ENOTEMPTY'].includes(error.code))throw error;});
  const manifest={policyVersion:1,images,archiveHashCount:denied.size,quarantinedThisBuild:moves,licenseAssurance:false,note:'僅排除已知備份相同位元與未引用檔案；不保證其他圖像來源或授權。'};
  await fs.writeFile(path.join(dist,'image-manifest.json'),JSON.stringify(manifest,null,2));
  if(moves.length){await fs.mkdir(quarantine,{recursive:true});await fs.writeFile(path.join(quarantine,`移動紀錄_${Date.now()}.json`),JSON.stringify(moves,null,2));}
  return manifest;
}
async function verifyImageAssets(root) {
  const {images,denied}=await imagePlan(root),allowed=new Map(images.map(image=>[image.path,image]));
  const dist=path.join(root,'dist');
  const actual=await listFiles(path.join(dist,'images'));
  for(const file of actual){const relative=path.relative(dist,file).replaceAll('\\','/');if(!allowed.has(relative))throw new Error(`dist 包含未引用或禁止的圖像：${relative}`);}
  await parallelMap(images,async image=>{
    const target=assertWithin(path.join(dist,'images'),path.join(dist,image.path));const sha256=hashBytes(await fs.readFile(target));
    if(denied.has(sha256))throw new Error(`dist 命中已知備份SHA256：${image.path}`);
    if(sha256!==image.sha256)throw new Error(`dist 圖像與runtime來源不符：${image.path}`);
  });
  const archiveExists=await fs.stat(path.join(dist,'images/archive_koei_backup')).catch(()=>null);
  if(archiveExists)throw new Error('dist 不得包含archive_koei_backup目錄');
  return {images:images.length,archiveHashCount:denied.size};
}
module.exports={EXPLICIT_IMAGE_ALLOWLIST,assertWithin,normalizeImagePath,hashBytes,listFiles,parallelMap,collectRuntimeImagePaths,knownArchiveHashes,imagePlan,prepareImageAssets,verifyImageAssets};

