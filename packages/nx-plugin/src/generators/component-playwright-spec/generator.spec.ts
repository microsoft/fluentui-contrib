import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, joinPathFragments, readProjectConfiguration } from '@nx/devkit';

import { default as libraryGenerator } from '../library/generator';
import { default as componentGenerator } from '../component/generator';
import { createCodeowners } from '../../utils-testing';

import generator from './generator';
import { PlaywrightComponentSpecGeneratorSchema } from './schema';

describe('playwright-component-configuration generator', () => {
  let tree: Tree;
  const options: PlaywrightComponentSpecGeneratorSchema = {
    name: 'hello',
    componentName: 'Hello',
  };

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace();
    createCodeowners(tree);

    await libraryGenerator(tree, { name: 'hello', owner: '@MrWick' });
    await componentGenerator(tree, { name: 'hello', componentName: 'Hello' });
  }, 10000);

  it('should generate playwright component spec', async () => {
    await generator(tree, options);
    const config = readProjectConfiguration(tree, 'hello');

    expect(
      tree.children(joinPathFragments(config.root, 'src/components/Hello'))
    ).toMatchInlineSnapshot(`
      [
        "Hello.styles.ts",
        "Hello.test.tsx",
        "Hello.tsx",
        "index.ts",
        "Hello.spec.tsx",
      ]
    `);
  });
});
