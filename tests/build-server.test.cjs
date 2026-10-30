const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { createServer } = require('../server.cjs');
const dist = path.resolve(__dirname, '../dist');
const manifest = () => JSON.parse(fs.readFileSync(path.join(dist, 'build-manifest.json'), 'utf8'));
function request(port, target, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port, path: target, method }, (res) => {
      let body = ''; res.setEncoding('utf8'); res.on('data', (part) => { body += part; }); res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    }); req.on('error', reject); req.end();
  });
}
test('完整發布產物不依賴 CDN，並保留 CSS 與分包引用', () => {
  const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
  assert.match(html, /type="module"/);
  assert.doesNotMatch(html, /cdn\.tailwindcss|fonts\.googleapis/);
  for (const asset of manifest().assets) assert.ok(fs.statSync(path.join(dist, asset)).size > 0);
  const css = fs.readFileSync(path.join(dist, manifest().assets.find((asset) => asset.endsWith('.css'))), 'utf8');
  assert.doesNotMatch(css, /@tailwind/);
  assert.match(css, /\.text-amber-200/);
});
test('預覽伺服器只提供發布根目錄，正確區分快取並拒絕寫入', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const port = server.address().port;
  const index = await request(port, '/');
  assert.equal(index.status, 200); assert.equal(index.headers['cache-control'], 'no-cache');
  const asset = await request(port, '/' + manifest().entry, 'HEAD');
  assert.equal(asset.status, 200); assert.match(asset.headers['cache-control'], /immutable/); assert.equal(asset.body, '');
  assert.equal((await request(port, '/package.json')).status, 404);
  assert.equal((await request(port, '/%2e%2e/package.json')).status, 403);
  assert.equal((await request(port, '/%2e%2e%5cpackage.json')).status, 403);
  assert.equal((await request(port, '/%ZZ')).status, 400);
  assert.equal((await request(port, '/', 'POST')).status, 405);
});
