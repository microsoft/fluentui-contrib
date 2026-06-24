/**
 * Build standalone bootstrap.js for browser usage
 *
 * Uses esbuild to bundle src/runtime/bootstrap.ts into two output files:
 *   dist/bootstrap.js      — readable IIFE for debugging
 *   dist/bootstrap.min.js  — minified IIFE for production
 *
 * Run via: npx ts-node --project tsconfig.scripts.json scripts/build-bootstrap.ts
 */

import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('Building bootstrap.js...');

const entryPoint = path.resolve(rootDir, 'src', 'runtime', 'bootstrap.ts');

async function run(): Promise<void> {
  // Readable IIFE for debugging
  await esbuild.build({
    entryPoints: [entryPoint],
    outfile: path.resolve(distDir, 'bootstrap.js'),
    bundle: true,
    minify: false,
    format: 'iife',
    globalName: 'CapFoundationsBootstrap',
    target: ['es2015'],
    platform: 'browser',
    banner: {
      js: '/* @fluentui-contrib/cap-foundations-core bootstrap */\n',
    },
  });

  // Minified version for production
  await esbuild.build({
    entryPoints: [entryPoint],
    outfile: path.resolve(distDir, 'bootstrap.min.js'),
    bundle: true,
    minify: true,
    format: 'iife',
    globalName: 'CapFoundationsBootstrap',
    target: ['es2015'],
    platform: 'browser',
    banner: {
      js: '/* @fluentui-contrib/cap-foundations-core bootstrap */\n',
    },
  });

  console.log('Bootstrap built successfully:');
  console.log('  dist/bootstrap.js      (readable)');
  console.log('  dist/bootstrap.min.js  (minified)');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
