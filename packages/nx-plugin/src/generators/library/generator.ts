import {
  formatFiles,
  Tree,
  getProjects,
  updateProjectConfiguration,
  workspaceRoot,
  updateJson,
  generateFiles,
} from '@nx/devkit';
import * as path from 'path';
import { libraryGenerator } from '@nx/js';
import { LibraryGeneratorSchema } from './schema';
import { getPackagePaths, npmScope } from '../../utils';

export default async function (
  tree: Tree,
  options: LibraryGeneratorSchema
) {
  const { name } = options;
  await libraryGenerator(tree, {
    name,
    publishable: true,
    compiler: 'swc',
    testEnvironment: 'jsdom',
    unitTestRunner: 'jest',
    importPath: `${npmScope}/${name}`,
  });

  const projects = getProjects(tree);
  const newProject = projects.get(name);
  if (!newProject) {
    return;
  }

  const { root: projectRoot, targets } = newProject;
  if (!targets) {
    return;
  }

  targets.build = {
    executor: '@fluentui-contrib/nx-plugin:build',
  };

  targets['type-check'] = {
    executor: '@fluentui-contrib/nx-plugin:type-check',
  }

  updateProjectConfiguration(tree, name, newProject);

  const paths = getPackagePaths(workspaceRoot, projectRoot);
  tree.delete(path.join(paths.src, 'lib'));

  updateJson(tree, paths.packageJson, (packageJson) => {
    packageJson.type = undefined;
    packageJson.private = true;

    packageJson.peerDependencies ??= {
      '@fluentui/react-components': '^9.0.0',
      '@types/react': '>=16.8.0 <19.0.0',
      '@types/react-dom': '>=16.8.0 <19.0.0',
      react: '>=16.8.0 <19.0.0',
      'react-dom': '>=16.8.0 <19.0.0',
    };

    return packageJson;
  });

  updateJson(tree, paths.swcrc, (swcrc) => {
    swcrc.jsc = {
      ...swcrc.jsc,
      parser: {
        syntax: 'typescript',
        tsx: true,
        decorators: false,
        dynamicImport: false,
      },
      externalHelpers: true,
      transform: {
        react: {
          runtime: 'classic',
          useSpread: true,
        },
      },
      target: 'es2019',
    };

    swcrc['$schema']= 'https://json.schemastore.org/swcrc';
    return swcrc;
  });

  await generateFiles(tree, path.join(__dirname, 'files'), paths.root, options)

  await formatFiles(tree);
}
