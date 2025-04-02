import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  joinPathFragments,
  readJson,
  readProjectConfiguration,
  workspaceRoot,
} from '@nx/devkit';

import libraryGenerator from '../library/generator';
import {
  createCodeowners,
  setupWorkspaceDependencies,
} from '../../utils-testing';

import generator from './generator';
import { ComponentGeneratorSchema } from './schema';
import { getPackagePaths } from '../../utils';

describe('component generator', () => {
  let tree: Tree;
  const options: ComponentGeneratorSchema = {
    name: 'hello-world',
    componentName: 'Foo',
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
        joinPathFragments(config.sourceRoot as string, 'components/Foo')
      )
    ).toMatchInlineSnapshot(`
      [
        "Foo.styles.ts",
        "Foo.test.tsx",
        "Foo.tsx",
        "index.ts",
      ]
    `);

    expect(tree.children(joinPathFragments(config.root, 'stories/Foo')))
      .toMatchInlineSnapshot(`
      [
        "Default.stories.tsx",
        "index.stories.tsx",
      ]
    `);

    const story = tree.read(
      joinPathFragments(config.root, 'stories/Foo/index.stories.tsx'),
      'utf8'
    );

    expect(story).toMatchInlineSnapshot(`
      "import type { Meta } from '@storybook/react';
      import { Foo } from '@fluentui-contrib/hello-world';
      export { Default } from './Default.stories';

      const meta = {
        title: 'Packages/hello-world/Foo',
        component: Foo,
      } satisfies Meta<typeof Foo>;

      export default meta;
      "
    `);
  });

  describe(`package.json`, () => {
    it('should update peer dependencies', async () => {
      const config = readProjectConfiguration(tree, options.name);
      const paths = getPackagePaths(workspaceRoot, config.root);
      let pkgJson = readJson(tree, paths.packageJson);

      expect(pkgJson.peerDependencies).toEqual(undefined);

      await generator(tree, options);

      pkgJson = readJson(tree, paths.packageJson);

      expect(pkgJson.peerDependencies).toEqual({
        '@fluentui/react-components': '>=9.46.3 <10.0.0',
        '@types/react': '>=16.8.0 <19.0.0',
        react: '>=16.8.0 <19.0.0',
      });
    });
  });
});
