import {
  formatFiles,
  generateFiles,
  Tree,
  joinPathFragments,
  readProjectConfiguration,
} from '@nx/devkit';
import { configurationGenerator } from '@nx/storybook';
import * as path from 'path';
import { ConfigureStorybookGeneratorSchema } from './schema';

export default async function (
  tree: Tree,
  options: ConfigureStorybookGeneratorSchema
) {
  const { name } = options;

  const project = readProjectConfiguration(tree, name);

  const { root: projectRoot } = project;

  await configurationGenerator(tree, {
    project: name,
    configureCypress: false,
    uiFramework: '@storybook/react-webpack5',
    tsConfiguration: true,
  });

  // remove nx/storybook generator defaults that we don't need
  tree.delete(joinPathFragments(projectRoot, '.storybook/preview.ts'));

  // add our boilerplate
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);

  await formatFiles(tree);
}
