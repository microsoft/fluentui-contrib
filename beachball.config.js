// @ts-check

/**
 * @type {import('beachball').BeachballConfig}
 */
module.exports = {
  gitTags: false,
  ignorePatterns: [
    '**/*.test.tsx',
    '**/*.test.ts',
    '**/*.spec.tsx',
    '**/*.spec.ts',
    '**/*.component-browser-spec.tsx',
    '**/*.stories.tsx',
    '**/eslint.config.{js,mjs}',
    '**/jest.config.{ts,mts,cts,js,mjs,cjs}',
    '**/playwright.config.ts',
    '**/project.json',
    '**/*.md',
    '**/*.babelrc',
    '**/playwright/**',
    '**/.storybook/**',
  ],
  hooks: require('./beachball.hooks'),
};
