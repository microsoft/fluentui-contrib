import {
  formatFiles,
  generateFiles,
  Tree,
  joinPathFragments,
  readProjectConfiguration,
  updateJson,
  ProjectConfiguration,
  offsetFromRoot,
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
    uiFramework: '@storybook/react-webpack5',
    tsConfiguration: true,
    interactionTests: false,
  });

  // remove nx/storybook generator defaults that we don't need
  tree.delete(joinPathFragments(projectRoot, '.storybook/preview.ts'));
  tree.delete(joinPathFragments(projectRoot, 'tsconfig.storybook.json'));

  updateJson(tree, '/package.json', (json) => {
    json.devDependencies = json.devDependencies ?? {};
    // remove nx/storybook generator defaults that we don't need
    delete json.devDependencies['core-js'];
    return json;
  });

  // add our boilerplate
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...offsetFromRoot,
    rootOffset: [offsetFromRoot(projectRoot), '..'].join(''),
  });
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
