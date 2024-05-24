// @ts-check

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';

import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

main();

function main() {
  /**
   * @type {string[]}
   */
  const log = [];

  log.push(verifyPackageJson());

  log.forEach((message) => {
    console.log(`- ✅ ${chalk.bold.green(message)}`);
  });
}

function verifyPackageJson() {
  /** @type {import('nx/src/utils/package-json').PackageJson} */
  const json = JSON.parse(
    readFileSync(join(__dirname, '../../package.json'), 'utf-8')
  );

  if (json.private !== true) {
    throw new Error('The package.json must have a private field set to true');
  }

  if (json.version !== '0.0.0') {
    throw new Error('The package.json must have a version field set to 0.0.0');
  }

  return 'The package.json is valid.';
}
