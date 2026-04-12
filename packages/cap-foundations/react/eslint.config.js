const baseConfig = require('../../../eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {},
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    files: ['**/package.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          includeTransitiveDependencies: false,
          runtimeHelpers: ['@swc/helpers'],
          ignoredDependencies: ['@types/react', '@types/react-dom', '@testing-library/jest-dom'],
          ignoredFiles: [
            '{projectRoot}/playwright.config.ts',
            '{projectRoot}/playwright/**',
            '{projectRoot}/.storybook/**',
            '{projectRoot}/stories/**',
          ],
        },
      ],
    },
  },
];
