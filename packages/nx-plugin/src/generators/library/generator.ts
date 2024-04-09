import {
  formatFiles,
  Tree,
  updateProjectConfiguration,
  workspaceRoot,
  updateJson,
  generateFiles,
  readProjectConfiguration,
  readJson,
} from '@nx/devkit';
import * as path from 'path';
import { libraryGenerator } from '@nx/js';
import { LibraryGeneratorSchema } from './schema';
import { PackageJson, getPackagePaths, npmScope } from '../../utils';
import { addCodeowner } from '../add-codeowners';

export default async function (tree: Tree, options: LibraryGeneratorSchema) {
  const { name, owner } = options;

  await invokeNxGenerators(tree, options);

  const newProject = readProjectConfiguration(tree, name);

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

  const reactComponentsVersion = getReactComponentsVersion(tree);

  updateJson(tree, paths.packageJson, (packageJson) => {
    packageJson.type = undefined;
    packageJson.private = true;

    packageJson.peerDependencies ??= {
      '@fluentui/react-components': `>=${reactComponentsVersion} <10.0.0`,
      '@types/react': '>=16.8.0 <19.0.0',
      '@types/react-dom': '>=16.8.0 <19.0.0',
      react: '>=16.8.0 <19.0.0',
      'react-dom': '>=16.8.0 <19.0.0',
    };

    return packageJson;
  });

  generateFiles(tree, path.join(__dirname, 'files'), paths.root, options);

  await formatFiles(tree);
}

function getReactComponentsVersion(tree: Tree) {
  const pkgJson: PackageJson = readJson(tree, '/package.json');
  const { dependencies = {}, devDependencies = {} } = pkgJson;
  const reactComponentsVersion =
    dependencies['@fluentui/react-components'] ||
    devDependencies['@fluentui/react-components'];

  if (!reactComponentsVersion) {
    throw new Error(
      '🚨 Could not find @fluentui/react-components in package.json. please report this issue'
    );
  }

  // strip version ranges non-numeric characters
  return reactComponentsVersion.replace(/^[~^]/, '');
}

async function invokeNxGenerators(tree: Tree, options: LibraryGeneratorSchema) {
  const { name } = options;

  await libraryGenerator(tree, {
    name,
    directory: `packages/${name}`,
    projectNameAndRootFormat: 'as-provided',
    publishable: true,
    compiler: 'swc',
    testEnvironment: options.testEnvironment,
    unitTestRunner: 'jest',
    importPath: `${npmScope}/${name}`,
  });

  // remove nx/jest generator defaults that we don't need
  updateJson(tree, '/package.json', (json: PackageJson) => {
    if (json.devDependencies) {
      // @see https://github.com/nrwl/nx/blob/master/packages/jest/src/generators/configuration/lib/ensure-dependencies.ts#L26

      delete json.devDependencies['ts-jest'];
    }

    return json;
  });

  return tree;
}
