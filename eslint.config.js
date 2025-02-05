const js = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');
const nxEslintPlugin = require('@nx/eslint-plugin');
const eslintPluginImport = require('eslint-plugin-import');
const rnxKitEslintPlugin = require('@rnx-kit/eslint-plugin');
const stylisticPlugin = require('@stylistic/eslint-plugin');
const jsonParser = require('jsonc-eslint-parser');
const { FlatCompat } = require('@eslint/eslintrc');
const globals = require('globals');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const ignores = [
  'node_modules',
  'dist',
  '**/playwright/.cache',
  '.nx',
  '.yarn',
];

module.exports = [
  prettierConfig,
  {
    ignores,
  },
  {
    plugins: {
      '@nx': nxEslintPlugin,
      import: eslintPluginImport,
      '@rnx-kit': rnxKitEslintPlugin,
      '@stylistic': stylisticPlugin,
    },
  },
  {
    rules: {
      'no-restricted-globals': [
        'error',
        'window',
        'document',
        'customElements',
        'devicePixelRatio',
        'location',
        'navigator',
        'performance',
        'cancelAnimationFrame',
        'cancelIdleCallback',
        'clearImmediate',
        'clearInterval',
        'clearTimeout',
        'fetch',
        'getComputedStyle',
        'matchMedia',
        'requestAnimationFrame',
        'requestIdleCallback',
        'setImmediate',
        'setInterval',
        'setTimeout',
        'IntersectionObserver',
        'MutationObserver',
        'ResizeObserver',
      ],
    },
  },
  {
    files: ['**/src/index.[jt]s'],
    rules: {
      '@rnx-kit/no-export-all': 'error',
    },
  },
  {
    files: ['**/*.ts?(x)', '**/*.js?(x)'],
    rules: { 'import/no-extraneous-dependencies': ['error'] },
    ignores: [
      '**/*.test.[jt]s?(x)',
      '**/*.spec.[jt]s?(x)',
      '**/*.stories.[jt]s?(x)',
      '**/*.component-browser-spec.tsx',
      '**/generators/**/files/**',
      '**/.storybook/**',
      '**/playwright.config.ts',
      '**/playwright/**',
    ],
  },
  {
    files: ['**/*.spec.[jt]s?(x)', '**/*.test.[jt]s?(x)'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'no-restricted-globals': 'off',
    },
  },
  {
    files: ['**/*.ts?(x)', '**/*.js?(x)'],
    ignores: ['**/stories/**/*.{ts,tsx}'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...compat.config({ extends: ['plugin:@nx/typescript'] }).map((config) => ({
    ...config,
    files: ['**/*.ts?(x)'],
    rules: {
      ...config.rules,
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@stylistic/no-extra-semi': 'error',
    },
  })),
  ...compat.config({ extends: ['plugin:@nx/javascript'] }).map((config) => ({
    ...config,
    files: ['**/*.js?(x)'],
    rules: {
      ...config.rules,
      '@stylistic/no-extra-semi': 'error',
    },
  })),
  ...compat.extends('plugin:playwright/recommended').map((config) => ({
    ...config,
    files: ['**/*.component-browser-spec.tsx'],
  })),
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsonParser,
    },
    rules: {},
  },
];
