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
    // Override or add rules here
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ...dependencyChecksConfig,
          ignoredDependencies: [
            ...dependencyChecksConfig.ignoredDependencies,
            // FIXME: suite version needs to be aligned in monorepo: "error  The version specifier does not contain the installed version of "@fluentui/react-components" package: 9.54.14  @nx/dependency-checks"
            '@fluentui/react-components',
          ],
        },
      ],
    },
  },
];
