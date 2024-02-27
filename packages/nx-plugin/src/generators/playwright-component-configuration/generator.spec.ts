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
import { PlaywrightComponentConfigurationGeneratorSchema } from './schema';

describe('playwright-component-configuration generator', () => {
  let tree: Tree;
  const options: PlaywrightComponentConfigurationGeneratorSchema = {
    name: 'hello',
  };

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace();
    createCodeowners(tree);

    await libraryGenerator(tree, { name: 'hello', owner: '@MrWick' });
  });

  it('should generate playwright config for component testing', async () => {
    await generator(tree, options);
    const config = readProjectConfiguration(tree, 'hello');

    expect(tree.children(joinPathFragments(config.root, 'playwright')))
      .toMatchInlineSnapshot(`
      [
        "index.html",
        "index.tsx",
      ]
    `);

    expect(
      tree.exists(joinPathFragments(config.root, 'playwright.config.ts'))
    ).toBe(true);

    expect(config.targets?.['component-test']).toMatchInlineSnapshot(`
      {
        "executor": "@fluentui-contrib/nx-plugin:playwright",
        "options": {
          "config": "hello/playwright.config.ts",
          "output": "{workspaceRoot}/dist/.playwright/hello",
          "testingType": "component",
        },
      }
    `);
  });

  it(`should setup eslint for playwright files`, async () => {
    await generator(tree, options);
    const config = readProjectConfiguration(tree, 'hello');

    const eslintConfig = readJson(
      tree,
      joinPathFragments(config.root, '.eslintrc.json')
    );
    expect(eslintConfig.overrides).toContainEqual({
      extends: ['plugin:playwright/recommended'],
      files: ['src/**/*.spec.{ts,js,tsx,jsx}'],
      rules: {},
    });
  });
});
