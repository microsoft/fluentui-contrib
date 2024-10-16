import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  joinPathFragments,
  readJson,
  readProjectConfiguration,
} from '@nx/devkit';

import { default as libraryGenerator } from '../library/generator';
import {
  createCodeowners,
  setupWorkspaceDependencies,
} from '../../utils-testing';

import generator from './generator';
import { ConfigureStorybookGeneratorSchema } from './schema';

describe('configure-storybook generator', () => {
  let tree: Tree;
  const options: ConfigureStorybookGeneratorSchema = { name: 'hello' };

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace();
    setupWorkspaceDependencies(tree);
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

      // eslint-disable-next-line @nx/enforce-module-boundaries
      import rootConfig from '../../../.storybook/main';

      const config: StorybookConfig = {
        ...rootConfig,
        stories: ['../stories/**/index.stories.@(js|jsx|ts|tsx|mdx)'],
      };

      export default config;
      "
    `);

    expect(
      tree.read(
        joinPathFragments(config.root, '.storybook/preview.tsx'),
        'utf-8'
      )
    ).toMatchInlineSnapshot(`
      "import type { Preview } from '@storybook/react';

      // eslint-disable-next-line @nx/enforce-module-boundaries
      import rootPreview from '../../../.storybook/preview';

      const preview: Preview = {
        ...rootPreview,
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

  describe(`nx generators overrides`, () => {
    it(`should not update /package.json with deps we dont need`, async () => {
      await generator(tree, options);

      expect(
        readJson(tree, '/package.json').devDependencies['core-js']
      ).toBeUndefined();
    });
  });
});
