const baseConfig = require('../../eslint.config.js');

const newBaseConfig = baseConfig.map((config) => {
  // Find the specific configuration entry that contains the @nx/dependency-checks rule
  if (config.rules?.['@nx/dependency-checks']) {
    // Create a new config object with the extended ignoredFiles array
    return {
      ...config,
      rules: {
        ...config.rules,
        '@nx/dependency-checks': [
          config.rules['@nx/dependency-checks'][0],
          {
            ...config.rules['@nx/dependency-checks'][1],
            ignoredFiles: [
              ...config.rules['@nx/dependency-checks'][1].ignoredFiles,
              // Exclude our test files from the dep checks
              '{projectRoot}/**/__tests__/test-files/**',
            ],
          },
        ],
      },
    };
  }

  // Return other config entries unchanged
  return config;
});

module.exports = [
  ...newBaseConfig,
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
];
