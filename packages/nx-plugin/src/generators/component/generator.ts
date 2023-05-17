import {
  formatFiles,
  generateFiles,
  Tree,
  workspaceRoot,
} from '@nx/devkit';
import * as path from 'path';
import { ComponentGeneratorSchema } from './schema';
import { getPackagePaths, getProject, npmScope } from '../../utils';

export default async function (tree: Tree, options: ComponentGeneratorSchema) {
  const { name, componentName } = options;
  const project = getProject(tree, name);

  const { root: projectRoot } = project;
  const paths = getPackagePaths(workspaceRoot, projectRoot);

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {...options, npmScope});

  let main = tree.read(paths.main)?.toString();
  if (!main) {
    throw new Error('No index.ts main entrypoint');
  }

  main = `export * from './components/${componentName}';` + '\n' + main;
  tree.write(paths.main, main);
  await formatFiles(tree);
}
