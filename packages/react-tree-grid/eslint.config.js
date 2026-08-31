const baseConfig = require('../../eslint.config.js');

const jsonRuleset = baseConfig.find((ruleset) => {
  return ruleset.files?.includes('**/*.json');
});

const [, dependencyChecksConfig] =
  jsonRuleset.rules['@nx/dependency-checks'] ?? [];

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
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ...dependencyChecksConfig,
          ignoredFiles: [
            ...dependencyChecksConfig.ignoredFiles,
            '{projectRoot}/src/**/__tests__/fixtures/**',
          ],
        },
      ],
    },
  },
];
