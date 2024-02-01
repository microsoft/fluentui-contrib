import {
  formatFiles,
  generateFiles,
  Tree,
  updateProjectConfiguration,
  readProjectConfiguration,
} from '@nx/devkit';
import * as path from 'path';
import { PlaywrightComponentConfigurationGeneratorSchema } from './schema';

export default async function (
  tree: Tree,
  options: PlaywrightComponentConfigurationGeneratorSchema
) {
  const config = readProjectConfiguration(tree, options.name);

  const targetDefinition = {
    executor: '@fluentui-contrib/nx-plugin:playwright',
    options: {
      testingType: 'component',
    },
  };

  config.targets = config.targets ?? {};
  config.targets['component-test'] = targetDefinition;

  updateProjectConfiguration(tree, options.name, { ...config });

  generateFiles(tree, path.join(__dirname, 'files'), config.root, options);
  await formatFiles(tree);
}
