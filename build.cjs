const esbuild = require('C:/Users/colde/history-build/node_modules/esbuild');
const path = require('path');
const fs = require('fs');

try {
  esbuild.buildSync({
    entryPoints: [path.join(__dirname, 'src', 'main.js')],
    bundle: true,
    outfile: path.join(__dirname, 'dist', 'bundle.js'),
    loader: { '.js': 'jsx', '.jsx': 'jsx' },
    format: 'iife',
    nodePaths: ['C:/Users/colde/history-build/node_modules'],
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    charset: 'utf8',
    minify: false,
  });
  // Also create unique versioned bundle to bypass file:/// memory cache in Chrome
  fs.copyFileSync(
    path.join(__dirname, 'dist', 'bundle.js'),
    path.join(__dirname, 'dist', 'bundle_v40.js')
  );
  console.log('BUILD SUCCESS! Created dist/bundle.js and dist/bundle_v40.js');
} catch (err) {
  console.error('BUILD FAILED:', err);
  process.exit(1);
}
