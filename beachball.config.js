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
    '**/playwright.config.ts',
    '**/project.json',
    '**/README.md',
    '**/playwright/**',
    '**/.storybook/**',
  ],
  hooks: require('./beachball.hooks'),
};
