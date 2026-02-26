const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    // Override or add rules here
    rules: {
      '@rnx-kit/no-export-all': 'off',
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {
      '@nx/dependency-checks': 'off',
    },
  },
];
