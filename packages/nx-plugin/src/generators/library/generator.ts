import {
  formatFiles,
  Tree,
  updateProjectConfiguration,
  workspaceRoot,
  updateJson,
  generateFiles,
  readProjectConfiguration,
  joinPathFragments,
  ProjectConfiguration,
  readNxJson,
  updateNxJson,
} from '@nx/devkit';
import * as path from 'path';
import { libraryGenerator } from '@nx/js';
import { LibraryGeneratorSchema } from './schema';
import { PackageJson, getPackagePaths, npmScope } from '../../utils';
import { addCodeowner } from '../add-codeowners';

export default async function (tree: Tree, options: LibraryGeneratorSchema) {
  const { name, owner } = options;

  const { projectConfig: newProject } = await invokeNxGenerators(tree, options);

  const { root: projectRoot } = newProject;
  const paths = getPackagePaths(workspaceRoot, projectRoot);

  if (!newProject.targets) {
    return;
  }

  newProject.targets.build = {
    executor: '@fluentui-contrib/nx-plugin:build',
  };

  newProject.targets['type-check'] = {
    executor: '@fluentui-contrib/nx-plugin:type-check',
  };

  newProject.targets.lint.options = {
    lintFilePatterns: [`${projectRoot}/**/*.ts`, `${projectRoot}/**/*.tsx`],
  };

  newProject.targets.test.options.passWithNoTests = true;

  addCodeowner(tree, {
    path: projectRoot,
    owner,
  });
  updateProjectConfiguration(tree, name, newProject);
  tree.delete(path.join(paths.src, 'lib'));

  updateJson(tree, paths.packageJson, (packageJson) => {
    packageJson.type = undefined;
    packageJson.private = true;

    return packageJson;
  });

  generateFiles(tree, path.join(__dirname, 'files'), paths.root, options);

  await formatFiles(tree);
}

async function invokeNxGenerators(tree: Tree, options: LibraryGeneratorSchema) {
  const { name } = options;
  const currentNxJson = readNxJson(tree);

  await libraryGenerator(tree, {
    name,
    directory: `packages/${name}`,
    publishable: true,
    compiler: 'swc',
    testEnvironment: options.testEnvironment,
    unitTestRunner: 'jest',
    importPath: `${npmScope}/${name}`,
  });

  const projectConfig = readProjectConfiguration(tree, name);

  // remove nx/js generator defaults that we generate ourselves
  tree.delete(joinPathFragments(projectConfig.root, 'eslint.config.mjs'));
  tree.delete(joinPathFragments(projectConfig.root, 'eslint.config.cjs'));

  // remove nx release implicit config @see https://github.com/nrwl/nx/blob/master/packages/js/src/generators/library/library.ts#L341-L356
  if (projectConfig.release) {
    delete projectConfig.release;
  }
  if (projectConfig.targets?.['nx-release-publish']) {
    delete projectConfig.targets?.['nx-release-publish'];
  }
  updateProjectConfiguration(tree, name, { ...projectConfig });

  // remove nx/jest generator defaults that we don't need
  updateJson(
    tree,
    joinPathFragments(projectConfig.root, 'project.json'),
    (json: ProjectConfiguration) => {
      if (json.release) {
        delete json.release;
      }
      if (json.targets?.['nx-release-publish']) {
        delete json.targets?.['nx-release-publish'];
      }

      return json;
    }
  );

  // remove unwanted release.version.preVersionCommand override @see https://github.com/nrwl/nx/blob/master/packages/js/src/generators/library/library.ts#L1252
  const nxJson = readNxJson(tree) ?? {};
  if (currentNxJson?.release?.version && nxJson?.release?.version) {
    nxJson.release.version = currentNxJson.release.version;
  } else {
    delete nxJson?.release?.version;
  }

  // remove swc target defaults added by @nx/js:library generator
  delete nxJson.targetDefaults?.['@nx/js:swc'];
  updateNxJson(tree, nxJson);

  updateJson(tree, '/package.json', (json: PackageJson) => {
    if (json.devDependencies) {
      // @see https://github.com/nrwl/nx/blob/master/packages/jest/src/generators/configuration/lib/ensure-dependencies.ts#L26

      delete json.devDependencies['ts-jest'];
    }

    return json;
  });

  return { tree, projectConfig };
}
