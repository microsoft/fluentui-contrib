import {
  formatFiles,
  Tree,
  updateProjectConfiguration,
  workspaceRoot,
  updateJson,
  generateFiles,
  readProjectConfiguration,
} from '@nx/devkit';
import * as path from 'path';
import { libraryGenerator } from '@nx/js';
import { LibraryGeneratorSchema } from './schema';
import { getPackagePaths, npmScope } from '../../utils';
import { findInstalledReactComponentsVersion } from './findInstalledReactComponentsVersion';
import { addCodeowner } from '../add-codeowners';

export default async function (tree: Tree, options: LibraryGeneratorSchema) {
  const { name, owner } = options;
  await libraryGenerator(tree, {
    name,
    publishable: true,
    compiler: 'swc',
    testEnvironment: options.testEnvironment,
    unitTestRunner: 'jest',
    importPath: `${npmScope}/${name}`,
  });

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
  const reactComponentsVersion = await findInstalledReactComponentsVersion();

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
