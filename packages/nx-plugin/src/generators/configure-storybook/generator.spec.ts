import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, joinPathFragments, readProjectConfiguration } from '@nx/devkit';

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

    expect(tree.children(joinPathFragments(config.root, '.storybook')))
      .toMatchInlineSnapshot(`
      [
        "main.ts",
        "preview.ts",
        "tsconfig.json",
        "preview.tsx",
      ]
    `);

    expect(
      tree.exists(joinPathFragments(config.root, 'stories/.gitkeep'))
    ).toBe(true);
  });
});
