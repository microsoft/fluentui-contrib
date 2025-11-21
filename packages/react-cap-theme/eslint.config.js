const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    // Override or add rules here
    rules: {
      't@typescript-eslint/explicit-module-boundary-types': false,
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];
