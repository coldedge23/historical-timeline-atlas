// The esbuild options for the browser bundle, shared by build.cjs and tests/bundle-boundary.test.js.
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const dependencyRoot = process.env.ATLAS_NODE_MODULES;

function bundleOptions(outdir = path.join(ROOT, 'dist', 'assets')) {
  return {
    nodePaths: dependencyRoot ? [dependencyRoot] : [],
    absWorkingDir: ROOT, entryPoints: { app: 'src/main.js' },
    outdir, entryNames: '[name].[hash]', chunkNames: 'chunk.[hash]',
    bundle: true, write: false, splitting: true, format: 'esm',
    loader: { '.js': 'jsx', '.jsx': 'jsx' },
    define: { 'process.env.NODE_ENV': '"production"' },
    charset: 'utf8', minify: true, metafile: true,
  };
}

module.exports = { bundleOptions };
