import {
  formatFiles,
  generateFiles,
  Tree,
  readProjectConfiguration,
} from '@nx/devkit';
import * as path from 'path';
import { PlaywrightComponentSpecGeneratorSchema } from './schema';

export default async function (
  tree: Tree,
  options: PlaywrightComponentSpecGeneratorSchema
) {
  const { name } = options;
  const projectConfig = readProjectConfiguration(tree, name);
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    projectConfig.root,
    options
  );
  await formatFiles(tree);
}
