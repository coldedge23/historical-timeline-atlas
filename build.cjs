const dependencyRoot = process.env.ATLAS_NODE_MODULES;
const dependency = (name) => require(dependencyRoot ? require('node:path').join(dependencyRoot, name) : name);
const esbuild = dependency('esbuild');
const postcss = dependency('postcss');
const tailwindcss = dependency('tailwindcss');
const autoprefixer = dependency('autoprefixer');
const path = require('node:path');
const fs = require('node:fs/promises');
const crypto = require('node:crypto');
const { pathToFileURL } = require('node:url');
const { prepareImageAssets } = require('./scripts/image_asset_policy.cjs');
const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const digest = (value) => crypto.createHash('sha256').update(value).digest('hex').slice(0, 12);

async function build() {
  const { default: config } = await import(pathToFileURL(path.join(ROOT, 'tailwind.config.js')).href);
  config.content = [path.join(ROOT, 'index.html'), path.join(ROOT, 'src/**/*.{js,ts,jsx,tsx}')];
  const result = await esbuild.build({
    nodePaths: dependencyRoot ? [dependencyRoot] : [],
    absWorkingDir: ROOT, entryPoints: { app: 'src/main.js' },
    outdir: path.join(DIST, 'assets'), entryNames: '[name].[hash]', chunkNames: 'chunk.[hash]',
    bundle: true, write: false, splitting: true, format: 'esm',
    loader: { '.js': 'jsx', '.jsx': 'jsx' },
    define: { 'process.env.NODE_ENV': '"production"' },
    charset: 'utf8', minify: true, metafile: true,
  });
  const jsFiles = result.outputFiles.filter((file) => file.path.endsWith('.js'));
  const rawCss = result.outputFiles.filter((file) => file.path.endsWith('.css')).map((file) => file.text).join('\n');
  if (!rawCss.includes('@tailwind')) throw new Error('入口必須 import src/index.css');
  const cssResult = await postcss([tailwindcss(config), autoprefixer]).process(rawCss, { from: path.join(ROOT, 'src/index.css'), map: false });
  const css = (await esbuild.transform(cssResult.css, { loader: 'css', minify: true })).code;
  const cssName = `app.${digest(css)}.css`;
  const entry = jsFiles.find((file) => /^app\./.test(path.basename(file.path)));
  if (!entry) throw new Error('缺少應用程式入口');
  await fs.mkdir(path.join(DIST, 'assets'), { recursive: true });
  for (const file of jsFiles) await fs.writeFile(file.path, file.contents);
  await fs.writeFile(path.join(DIST, 'assets', cssName), css);
  const imageManifest = await prepareImageAssets(ROOT, { codeOnly: process.argv.includes('--code-only') });
  const { writeDataPacks } = await import(pathToFileURL(path.join(ROOT, 'scripts/build_data_packs.mjs')).href);
  const data = await writeDataPacks(DIST);
  const template = await fs.readFile(path.join(ROOT, 'index.html'), 'utf8');
  if (!template.includes('<!-- APP_ASSETS -->')) throw new Error('index.html 缺少 APP_ASSETS 標記');
  const html = template.replace('<!-- APP_ASSETS -->', `<link rel="stylesheet" href="./assets/${cssName}">\n    <script type="module" src="./assets/${path.basename(entry.path)}"></script>`);
  await fs.writeFile(path.join(DIST, 'index.html'), html);
  await fs.writeFile(path.join(DIST, '.nojekyll'), '');
  const assets = [...jsFiles.map((file) => `assets/${path.basename(file.path)}`), `assets/${cssName}`];
  await fs.writeFile(path.join(DIST, 'build-manifest.json'), JSON.stringify({ imageCount: imageManifest.images.length, assets, entry: `assets/${path.basename(entry.path)}`, jsBytes: jsFiles.reduce((sum, file) => sum + file.contents.length, 0), cssBytes: Buffer.byteLength(css), data: { catalog: 'data/catalog.json', files: data.files } }, null, 2));
  console.log(`建置完成：${jsFiles.length} 個 JS 分包、CSS ${(Buffer.byteLength(css) / 1024).toFixed(1)} KB、資料包 ${Object.keys(data.catalog.packs).length} 個；發布目錄 dist`);
}
build().catch((error) => { console.error('建置失敗：', error.message); process.exitCode = 1; });



