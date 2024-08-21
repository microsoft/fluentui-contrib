// @ts-check

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync, readdirSync, statSync } from 'node:fs';

import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workspaceRoot = join(__dirname, '../../');

main();

/**
 * @typedef {{message: string; type: 'error' | 'success';}} VerifyResult
 */

function main() {
  processVerifications(verifyYarnLock(), verifyPackageJson());
}

/**
 *
 * @param {Array<VerifyResult>} results
 */
function processVerifications(...results) {
  results.forEach((result) => {
    if (result.type === 'success') {
      console.log(`- ✅ ${chalk.bold.green(result.message)}`);
    }
    if (result.type === 'error') {
      console.log(`- 🚨 ${chalk.bold.red(result.message)}`);
      process.exit(1);
    }
  });
}

// ==== Verification ====

/**
 *
 * @returns {VerifyResult}
 */
function verifyPackageJson() {
  /** @type {import('nx/src/utils/package-json').PackageJson} */
  const json = JSON.parse(
    readFileSync(join(__dirname, '../../package.json'), 'utf-8')
  );

  if (json.private !== true) {
    return {
      message: 'The package.json must have a private field set to true',
      type: 'error',
    };
  }

  if (json.version !== '0.0.0') {
    return {
      message: 'The package.json must have a version field set to 0.0.0',
      type: 'error',
    };
  }

  return { message: 'The package.json is valid.', type: 'success' };
}

/**
 *
 * @returns {VerifyResult}
 */
function verifyYarnLock() {
  const rootYarnLockPath = join(__dirname, '../../yarn.lock');

  const nonRootYarnLock = findFileInDirectory(workspaceRoot, 'yarn.lock', [
    'node_modules',
    'dist',
    '.nx',
    '.yarn',
    '.git',
    '.github',
    '.verdaccio',
    '.vscode',
  ]);

  if (rootYarnLockPath !== nonRootYarnLock) {
    const message = [
      `Invalid yarn.lock file "${nonRootYarnLock}", yarn.lock file can exists only at monorepo root`,
      chalk.italic(
        `\tNOTE: Make sure your run "yarn install" from monorepo root`
      ),
    ].join('\n');

    return { message, type: 'error' };
  }

  return {
    message: 'yarn.lock file exists only in monorepo root.',
    type: 'success',
  };
}

// ==== Utils ====

/**
 *
 * @param {string} directory
 * @param {string} fileName
 * @param {string[]} exclude
 * @returns {string | null}
 */
function findFileInDirectory(directory, fileName, exclude) {
  const files = readdirSync(directory);

  for (const file of files) {
    if (exclude.includes(file)) {
      continue;
    }

    const filePath = join(directory, file);
    const stats = statSync(filePath);

    if (stats.isFile() && file === fileName) {
      return filePath;
    }

    if (stats.isDirectory()) {
      const foundFilePath = findFileInDirectory(filePath, fileName, exclude);
      if (foundFilePath) {
        return foundFilePath;
      }
    }
  }

  return null;
}
