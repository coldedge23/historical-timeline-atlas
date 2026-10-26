const esbuild = require('C:/Users/colde/history-build/node_modules/esbuild');
const path = require('path');
const fs = require('fs');

const CURRENT_VERSION = 'bundle_v54.js';
const distDir = path.join(__dirname, 'dist');

try {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Clean up old redundant bundle_v*.js files to keep dist directory lightweight
  const existingFiles = fs.readdirSync(distDir);
  existingFiles.forEach((file) => {
    if (/^bundle_v\d+\.js$/.test(file) && file !== CURRENT_VERSION) {
      try {
        fs.unlinkSync(path.join(distDir, file));
      } catch {}
    }
  });

  esbuild.buildSync({
    entryPoints: [path.join(__dirname, 'src', 'main.js')],
    bundle: true,
    outfile: path.join(distDir, 'bundle.js'),
    loader: { '.js': 'jsx', '.jsx': 'jsx' },
    format: 'iife',
    nodePaths: ['C:/Users/colde/history-build/node_modules'],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    charset: 'utf8',
    minify: true,
  });

  // Also create unique versioned bundle to bypass memory cache in browsers
  fs.copyFileSync(
    path.join(distDir, 'bundle.js'),
    path.join(distDir, CURRENT_VERSION)
  );
  const sizeKB = (fs.statSync(path.join(distDir, CURRENT_VERSION)).size / 1024).toFixed(1);
  console.log(`BUILD SUCCESS! Created dist/bundle.js and dist/${CURRENT_VERSION} (${sizeKB} KB)`);
} catch (err) {
  console.error('BUILD FAILED:', err);
  process.exit(1);
}
