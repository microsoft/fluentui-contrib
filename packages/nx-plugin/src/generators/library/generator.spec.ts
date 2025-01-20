import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  readJson,
  workspaceRoot,
  joinPathFragments,
  readNxJson,
  updateNxJson,
} from '@nx/devkit';

import generator from './generator';
import { LibraryGeneratorSchema } from './schema';
import { getPackagePaths } from '../../utils';
import {
  createCodeowners,
  setupWorkspaceDependencies,
} from '../../utils-testing';

describe('create-package generator', () => {
  let tree: Tree;
  const options: LibraryGeneratorSchema = { name: 'test', owner: 'person' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    setupWorkspaceDependencies(tree);
    updateNxJson(tree, {
      release: { projects: ['packages/**/*', '!tag:npm:private'] },
    });
    createCodeowners(tree);
  });

  describe(`generates files`, () => {
    it('should generate file tree', async () => {
      await generator(tree, options);
      const config = readProjectConfiguration(tree, 'test');

      expect(tree.children(config.root)).toMatchInlineSnapshot(`
        [
          "tsconfig.json",
          "src",
          "tsconfig.lib.json",
          "README.md",
          ".swcrc",
          "package.json",
          "project.json",
          ".eslintrc.json",
          "jest.config.ts",
          "tsconfig.spec.json",
        ]
      `);

      expect(tree.children(joinPathFragments(config.root, 'src')))
        .toMatchInlineSnapshot(`
        [
          "index.ts",
        ]
      `);
    });

    it('should generate jest config', async () => {
      await generator(tree, options);
      const config = readProjectConfiguration(tree, 'test');

      expect(
        tree.read(joinPathFragments(config.root, 'jest.config.ts'), 'utf-8')
      ).toMatchInlineSnapshot(`
        "/* eslint-disable */
        import { readFileSync } from 'fs';

        // Reading the SWC compilation config and remove the "exclude"
        // for the test files to be compiled by SWC
        const { exclude: _, ...swcJestConfig } = JSON.parse(
          readFileSync(\`\${__dirname}/.swcrc\`, 'utf-8')
        );

        // disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves.
        // If we do not disable this, SWC Core will read .swcrc and won't transform our test files due to "exclude"
        if (swcJestConfig.swcrc === undefined) {
          swcJestConfig.swcrc = false;
        }

        // Uncomment if using global setup/teardown files being transformed via swc
        // https://nx.dev/nx-api/jest/documents/overview#global-setupteardown-with-nx-libraries
        // jest needs EsModule Interop to find the default exported setup/teardown functions
        // swcJestConfig.module.noInterop = false;

        export default {
          displayName: 'test',
          preset: '../../jest.preset.js',
          transform: {
            '^.+\\\\.[tj]s$': ['@swc/jest', swcJestConfig],
          },
          moduleFileExtensions: ['ts', 'js', 'html'],
          testEnvironment: '',
          coverageDirectory: '../../coverage/packages/test',
        };
        "
      `);
    });
  });

  describe(`package.json`, () => {
    it('should generate peer dependencies', async () => {
      await generator(tree, options);
      const config = readProjectConfiguration(tree, 'test');
      const paths = getPackagePaths(workspaceRoot, config.root);
      const pkgJson = readJson(tree, paths.packageJson);
      expect(pkgJson.peerDependencies).toMatchInlineSnapshot(`
              {
                "@fluentui/react-components": ">=9.46.3 <10.0.0",
                "@types/react": ">=16.8.0 <19.0.0",
                "@types/react-dom": ">=16.8.0 <19.0.0",
                "react": ">=16.8.0 <19.0.0",
                "react-dom": ">=16.8.0 <19.0.0",
              }
          `);
    });
  });

  describe(`targets`, () => {
    it('should add test target', async () => {
      await generator(tree, options);
      const config = readProjectConfiguration(tree, 'test');
      expect(config.targets?.test).toMatchInlineSnapshot(`
        {
          "executor": "@nx/jest:jest",
          "options": {
            "jestConfig": "packages/test/jest.config.ts",
            "passWithNoTests": true,
          },
          "outputs": [
            "{workspaceRoot}/coverage/{projectRoot}",
          ],
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
          "executor": "@nx/eslint:lint",
          "options": {
            "lintFilePatterns": [
              "packages/test/**/*.ts",
              "packages/test/**/*.tsx",
            ],
          },
        }
      `);
    });
  });

  describe(`nx generators overrides`, () => {
    it(`should not update /package.json with deps we dont need`, async () => {
      await generator(tree, options);

      expect(readJson(tree, '/package.json').devDependencies).not.toEqual(
        expect.objectContaining({ 'ts-jest': expect.any(String) })
      );
    });

    it(`should not update /project.json with release metadata`, async () => {
      await generator(tree, options);

      const project = readProjectConfiguration(tree, 'test');

      expect(project.release).toEqual(undefined);
      expect(project.targets?.['nx-release-publish']).toEqual(undefined);
    });

    it(`should not force update nx.json#release`, async () => {
      await generator(tree, options);

      const nxJson = readNxJson(tree);

      expect(nxJson.release).toEqual({
        projects: ['packages/**/*', '!tag:npm:private'],
      });
    });
  });
});
