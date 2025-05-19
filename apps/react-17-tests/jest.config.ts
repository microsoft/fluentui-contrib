// @ts-check
/* eslint-disable */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const { exclude: _, ...swcJestConfig } = JSON.parse(
  readFileSync(join(__dirname, '.swcrc'), 'utf-8')
);

// disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves.
// If we do not disable this, SWC Core will read .swcrc and won't transform our test files due to "exclude"
if (swcJestConfig.swcrc === undefined) {
  swcJestConfig.swcrc = false;
}

// Uncomment if using global setup/teardown files being transformed via swc
// https://nx.dev/packages/jest/documents/overview#global-setup/teardown-with-nx-libraries
// jest needs EsModule Interop to find the default exported setup/teardown functions
// swcJestConfig.module.noInterop = false;

const rootNodeModulesPath = join(__dirname, '../..', 'node_modules');
const nohoistNodeModulesPath = join(__dirname, 'node_modules');
const usedNodeModulesPath = existsSync(join(nohoistNodeModulesPath, 'react'))
  ? nohoistNodeModulesPath
  : rootNodeModulesPath;

export default {
  displayName: 'react-17-tests',
  preset: '../../jest.preset.js',
  roots: createRoots(),
  transform: {
    '^.+\\.tsx?$': ['<rootDir>/jest-custom-transformer.js', swcJestConfig],
  },
  coverageDirectory: '../../coverage/apps/react-17-tests',
  moduleNameMapper: {
    '^react$': join(usedNodeModulesPath, 'react'),
    '^react-dom$': join(usedNodeModulesPath, 'react-dom'),
    '^react-test-renderer$': join(usedNodeModulesPath, 'react-test-renderer'),
    '^@testing-library/(react|dom|react-hooks)$': join(
      usedNodeModulesPath,
      '@testing-library/$1'
    ),
  },
};

/**
 * Creates an array of paths to packages that don't have specific tags
 * @returns {string[]} An array of paths to test
 */
function createRoots() {
  const rootDir = resolve(__dirname, '../../packages/');
  return findValidPackagePaths(rootDir);

  /**
   * Recursively finds valid package paths that don't have excluded tags
   * @param {string} dirPath - Directory to scan
   * @returns {string[]} Array of valid package paths
   */
  function findValidPackagePaths(dirPath: string) {
    const entries = readdirSync(dirPath, { withFileTypes: true });
    let validPaths = [] as string[];

    // Check if current directory is a valid package
    if (isValidPackage(dirPath)) {
      validPaths.push(dirPath);
    }

    // Recursively check subdirectories
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const fullPath = join(dirPath, entry.name);
        validPaths = validPaths.concat(findValidPackagePaths(fullPath));
      }
    }

    return validPaths;
  }

  /**
   * Checks if a directory is a valid package based on its project.json
   * @param {string} packagePath - Path to potential package
   * @returns {boolean} Whether the package is valid
   */
  function isValidPackage(packagePath: string) {
    try {
      const projectJsonPath = join(packagePath, 'project.json');

      if (existsSync(projectJsonPath)) {
        const projectJson = JSON.parse(readFileSync(projectJsonPath, 'utf8'));

        return !['nx-plugin', 'houdini-utils', 'stylelint-plugin'].some(
          (projectName) => projectName === projectJson.name
        );
      }

      return false; // Only include directories with project.json
    } catch (error) {
      console.warn(`Error reading project.json for ${packagePath}:`, error);
      return false; // Skip directories with invalid project.json
    }
  }
}
