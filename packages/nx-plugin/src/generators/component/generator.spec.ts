import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, joinPathFragments, readProjectConfiguration } from '@nx/devkit';

import libraryGenerator from '../library/generator';
import {
  createCodeowners,
  setupWorkspaceDependencies,
} from '../../utils-testing';

import generator from './generator';
import { ComponentGeneratorSchema } from './schema';

describe('component generator', () => {
  let tree: Tree;
  const options: ComponentGeneratorSchema = {
    name: 'hello-world',
    componentName: 'foo',
  };

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace();
    setupWorkspaceDependencies(tree);
    createCodeowners(tree);
    await libraryGenerator(tree, { name: options.name, owner: '@MrWick' });
  });

  it('should create component with story', async () => {
    await generator(tree, options);
    const config = readProjectConfiguration(tree, options.name);

    expect(
      tree.children(
        joinPathFragments(config.sourceRoot as string, 'components/foo')
      )
    ).toMatchInlineSnapshot(`
      [
        "foo.styles.ts",
        "foo.test.tsx",
        "foo.tsx",
        "index.ts",
      ]
    `);

    expect(tree.children(joinPathFragments(config.root, 'stories/foo')))
      .toMatchInlineSnapshot(`
      [
        "Default.stories.tsx",
        "index.stories.tsx",
      ]
    `);
  });
});
