import {
  formatFiles,
  generateFiles,
  Tree,
  joinPathFragments,
  readProjectConfiguration,
  updateJson,
  ProjectConfiguration,
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
  tree.delete(joinPathFragments(projectRoot, 'tsconfig.storybook.json'));

  // add our boilerplate
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  updateSolutionTsConfig(tree, { project });

  await formatFiles(tree);
}

function updateSolutionTsConfig(
  tree: Tree,
  options: { project: ProjectConfiguration }
) {
  const { root } = options.project;
  updateJson(tree, joinPathFragments(root, 'tsconfig.json'), (json) => {
    json.references = json.references ?? [];

    // remove nx/storybook generator defaults that we don't need
    json.references = json.references.filter(
      (ref: { path: string }) => ref.path !== './tsconfig.storybook.json'
    );

    json.references.push({ path: './.storybook/tsconfig.json' });
    return json;
  });
}
