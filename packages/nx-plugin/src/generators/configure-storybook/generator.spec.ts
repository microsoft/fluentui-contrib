import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  joinPathFragments,
  readJson,
  readProjectConfiguration,
} from '@nx/devkit';

import { default as libraryGenerator } from '../library/generator';
import { createCodeowners } from '../../utils-testing';

import generator from './generator';
import { ConfigureStorybookGeneratorSchema } from './schema';

describe('configure-storybook generator', () => {
  let tree: Tree;
  const options: ConfigureStorybookGeneratorSchema = { name: 'hello' };

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace();
    createCodeowners(tree);

    await libraryGenerator(tree, { name: 'hello', owner: '@MrWick' });
  });

  it('should generate storybook config including stories/ folder', async () => {
    await generator(tree, options);

    const config = readProjectConfiguration(tree, 'hello');

    expect(tree.children(joinPathFragments(config.root, '.storybook'))).toEqual(
      ['main.ts', 'tsconfig.json', 'preview.tsx']
    );

    expect(
      tree.exists(joinPathFragments(config.root, 'stories/.gitkeep'))
    ).toBe(true);

    expect(
      tree.exists(joinPathFragments(config.root, 'tsconfig.storybook.json'))
    ).toBe(false);

    expect(
      readJson(tree, joinPathFragments(config.root, 'tsconfig.json')).references
    ).toContainEqual({ path: './.storybook/tsconfig.json' });
  });

  it('should generate storybook config boilerplate', async () => {
    await generator(tree, options);

    const config = readProjectConfiguration(tree, 'hello');

    expect(
      tree.read(joinPathFragments(config.root, '.storybook/main.ts'), 'utf-8')
    ).toMatchInlineSnapshot(`
      "import type { StorybookConfig } from '@storybook/react-webpack5';

      const config: StorybookConfig = {
        stories: ['../stories/**/index.stories.@(js|jsx|ts|tsx|mdx)'],
        addons: [
          '@nx/react/plugins/storybook',
          {
            name: '@storybook/addon-storysource',
            options: {
              loaderOptions: {
                injectStoryParameters: true,
              },
            },
          },
        ],
        framework: {
          name: '@storybook/react-webpack5',
          options: {},
        },
      };

      export default config;

      // To customize your webpack configuration you can use the webpackFinal field.
      // Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
      // and https://nx.dev/packages/storybook/documents/custom-builder-configs
      "
    `);

    expect(
      tree.read(
        joinPathFragments(config.root, '.storybook/preview.tsx'),
        'utf-8'
      )
    ).toMatchInlineSnapshot(`
      "import * as React from 'react';

      import { Preview } from '@storybook/react';

      import { FluentProvider, webLightTheme } from '@fluentui/react-components';

      const preview: Preview = {
        decorators: [
          (Story) => (
            <FluentProvider theme={webLightTheme}>
              <Story />
            </FluentProvider>
          ),
        ],
      };

      export default preview;
      "
    `);

    expect(
      readJson(tree, joinPathFragments(config.root, '.storybook/tsconfig.json'))
    ).toMatchInlineSnapshot(`
      {
        "compilerOptions": {
          "emitDecoratorMetadata": true,
          "outDir": "",
        },
        "exclude": [
          "../**/*.spec.ts",
          "../**/*.spec.js",
          "../**/*.spec.tsx",
          "../**/*.spec.jsx",
        ],
        "extends": "../tsconfig.json",
        "files": [
          "../../../node_modules/@nx/react/typings/styled-jsx.d.ts",
          "../../../node_modules/@nx/react/typings/cssmodule.d.ts",
          "../../../node_modules/@nx/react/typings/image.d.ts",
        ],
        "include": [
          "../stories/**/*.stories.ts",
          "../stories/**/*.stories.js",
          "../stories/**/*.stories.jsx",
          "../stories/**/*.stories.tsx",
          "../stories/**/*.stories.mdx",
          "*.ts",
          "*.js",
        ],
      }
    `);
  });
});
