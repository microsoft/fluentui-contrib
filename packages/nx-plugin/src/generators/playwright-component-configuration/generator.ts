import {
  formatFiles,
  generateFiles,
  Tree,
  updateProjectConfiguration,
  readProjectConfiguration,
  ProjectConfiguration,
  TargetConfiguration,
} from '@nx/devkit';
import * as path from 'path';
import { PlaywrightComponentConfigurationGeneratorSchema } from './schema';
import { type PlaywrightExecutorSchema } from '../../executors/playwright/schema';

interface Options extends PlaywrightComponentConfigurationGeneratorSchema {
  projectConfig: ProjectConfiguration;
}

export default async function (
  tree: Tree,
  options: PlaywrightComponentConfigurationGeneratorSchema
) {
  const projectConfig = readProjectConfiguration(tree, options.name);

  const normalizedOptions: Options = { projectConfig, ...options };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    projectConfig.root,
    options
  );

  addComponentTestTarget(tree, normalizedOptions);

  await formatFiles(tree);
}

function addComponentTestTarget(tree: Tree, options: Options) {
  const config = options.projectConfig;

  const targetDefinition: TargetConfiguration<PlaywrightExecutorSchema> = {
    executor: '@fluentui-contrib/nx-plugin:playwright',
    options: {
      testingType: 'component',
      output: `{workspaceRoot}/dist/.playwright/${config.root}`,
      config: `${config.root}/playwright.config.ts`,
    },
  };

  config.targets = config.targets ?? {};
  config.targets['component-test'] = targetDefinition;

  updateProjectConfiguration(tree, options.name, { ...config });
}
