const prettierConfig = require('eslint-config-prettier');
const nxEslintPlugin = require('@nx/eslint-plugin');
const rnxKitEslintPlugin = require('@rnx-kit/eslint-plugin');
const stylisticPlugin = require('@stylistic/eslint-plugin');
const jsonParser = require('jsonc-eslint-parser');
const playwright = require('eslint-plugin-playwright');
const globals = require('globals');

const ignores = [
  'node_modules',
  'dist',
  '**/playwright/.cache',
  '.nx',
  '.yarn',
];

module.exports = [
  prettierConfig,
  ...nxEslintPlugin.configs['flat/base'],
  ...nxEslintPlugin.configs['flat/typescript'],
  ...nxEslintPlugin.configs['flat/javascript'],
  {
    ignores,
  },
  {
    plugins: {
      '@nx': nxEslintPlugin,
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
  {
    files: ['**/*.ts?(x)'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@stylistic/no-extra-semi': 'error',
    },
  },
  {
    files: ['**/*.js?(x)'],
    rules: {
      '@stylistic/no-extra-semi': 'error',
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['**/*.component-browser-spec.tsx'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
    },
  },
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsonParser,
    },
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          includeTransitiveDependencies: false,
          ignoredDependencies: [
            '@types/react',
            '@types/react-dom',
            '@swc/helpers',
          ],
          ignoredFiles: [
            '{projectRoot}/playwright.config.ts',
            '{projectRoot}/playwright/**',
            '{projectRoot}/.storybook/**',
            '{projectRoot}/stories/**',
            '{projectRoot}/**/*.component-browser-spec.tsx',
          ],
        },
      ],
    },
  },
];
