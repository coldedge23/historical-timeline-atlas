const esbuild = require('esbuild');
const path = require('path');

try {
  esbuild.buildSync({
    entryPoints: [path.join(__dirname, 'src', 'main.js')],
    bundle: true,
    outfile: path.join(__dirname, 'dist', 'bundle.js'),
    loader: { '.js': 'jsx', '.jsx': 'jsx' },
    format: 'iife',
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    minify: false,
  });
  console.log('BUILD SUCCESS!');
} catch (err) {
  console.error('BUILD FAILED:', err);
  process.exit(1);
}
