import { getProjects, formatFiles, generateFiles, Tree } from '@nx/devkit';
import { configurationGenerator } from '@nx/storybook';
import * as path from 'path';
import { ConfigureStorybookGeneratorSchema } from './schema';

export default async function (
  tree: Tree,
  options: ConfigureStorybookGeneratorSchema
) {
  const { name } = options;
  const projects = getProjects(tree);
  const project = projects.get(name);
  if (!project) {
    return;
  }

  const { root: projectRoot } = project;
  await configurationGenerator(tree, {
    project: name,
    configureCypress: false,
    uiFramework: '@storybook/react-webpack5',
    tsConfiguration: true,
  });

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}
