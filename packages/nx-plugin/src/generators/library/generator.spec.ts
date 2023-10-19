import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  readJson,
  workspaceRoot,
} from '@nx/devkit';

import generator from './generator';
import { LibraryGeneratorSchema } from './schema';
import { getPackagePaths } from '../../utils';

describe('create-package generator', () => {
  let tree: Tree;
  const options: LibraryGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });

  it('should generate peer dependencies', async () => {
    await generator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    const paths = getPackagePaths(workspaceRoot, config.root);
    const pkgJson = readJson(tree, paths.packageJson);
    expect(pkgJson.peerDependencies).toMatchInlineSnapshot(`
      {
        "@fluentui/react-components": ">=9.35.1 <10.0.0",
        "@types/react": ">=16.8.0 <19.0.0",
        "@types/react-dom": ">=16.8.0 <19.0.0",
        "react": ">=16.8.0 <19.0.0",
        "react-dom": ">=16.8.0 <19.0.0",
      }
    `);
  });

  it('should add build target', async () => {
    await generator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config.targets?.build).toMatchInlineSnapshot(`
      {
        "executor": "@fluentui-contrib/nx-plugin:build",
      }
    `);
  });

  it('should type-check target', async () => {
    await generator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config.targets?.['type-check']).toMatchInlineSnapshot(`
      {
        "executor": "@fluentui-contrib/nx-plugin:type-check",
      }
    `);
  });

  it('should update lint configuration', async () => {
    await generator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config.targets?.lint).toMatchInlineSnapshot(`
      {
        "executor": "@nx/linter:eslint",
        "options": {
          "lintFilePatterns": [
            "test/**/*.ts",
            "test/**/*.tsx",
          ],
        },
        "outputs": [
          "{options.outputFile}",
        ],
      }
    `);
  });
});
