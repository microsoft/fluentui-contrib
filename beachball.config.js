// @ts-check

/**
 * @type {import('beachball').BeachballConfig}
 */
module.exports = {
  gitTags: false,
  ignorePatterns: [
    '**/*.test.{ts,tsx}',
    '**/*.stories.tsx',
    '**/.eslintrc.json',
    '**/jest.config.js',
    '**/project.json',
    '**/README.md',
    '**/.storybook/**',
  ],
  hooks: require('./beachball.hooks'),
};
