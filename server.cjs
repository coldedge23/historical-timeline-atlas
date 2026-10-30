const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, 'dist');
const MIME_TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp' };
function createServer(root = ROOT) {
  const resolvedRoot = path.resolve(root);
  return http.createServer((req, res) => {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
    let raw;
    try { raw = decodeURIComponent((req.url || '/').split('?')[0]); } catch { res.writeHead(400); res.end('Bad Request'); return; }
    const filePath = path.resolve(resolvedRoot, '.' + raw.replace(/\\/g, '/'));
    if (filePath !== resolvedRoot && !filePath.startsWith(resolvedRoot + path.sep)) { res.writeHead(403); res.end('Forbidden'); return; }
    const target = filePath === resolvedRoot ? path.join(resolvedRoot, 'index.html') : filePath;
    fs.stat(target, (err, stat) => {
      if (err || !stat.isFile()) { res.writeHead(404); res.end('Not Found'); return; }
      const hashedAsset = /(?:app|chunk)\.[A-Za-z0-9]{8,12}\.(js|css)$/.test(target);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[path.extname(target)] || 'application/octet-stream', 'Content-Length': stat.size, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': hashedAsset ? 'public, max-age=31536000, immutable' : 'no-cache' });
      if (req.method === 'HEAD') { res.end(); return; }
      const stream = fs.createReadStream(target);
      stream.on('error', () => res.destroy());
      stream.pipe(res);
    });
  });
}
if (require.main === module) {
  if (!fs.existsSync(path.join(ROOT, 'index.html'))) { console.error('尚未建置，請先執行 npm run build。'); process.exitCode = 1; }
  else {
    const port = Number(process.env.PORT || 8080);
    const server = createServer();
    server.on('error', (err) => { console.error(`伺服器啟動失敗：${err.message}`); process.exitCode = 1; });
    server.listen(port, '127.0.0.1', () => console.log(`歷史星圖：http://127.0.0.1:${server.address().port}/（Ctrl+C 停止）`));
  }
}
module.exports = { createServer };

