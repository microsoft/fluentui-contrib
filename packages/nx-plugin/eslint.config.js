const baseConfig = require('../../eslint.config.js');

const jsonRuleset = baseConfig.find((ruleset) => {
  return ruleset.files?.includes('**/*.json');
});
const [, dependencyChecksConfig] =
  jsonRuleset.rules['@nx/dependency-checks'] ?? [];

// use magic executor resolution of runtimeHelpers
delete dependencyChecksConfig.runtimeHelpers;

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        project: ['packages/nx-plugin/tsconfig.*?.json'],
      },
    },
    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  {
    files: ['./package.json', './generators.json', './executors.json'],
    rules: {
      '@nx/nx-plugin-checks': 'error',
    },
  },
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ...dependencyChecksConfig,
        },
      ],
    },
  },
];
