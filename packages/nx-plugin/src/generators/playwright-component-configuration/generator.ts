import {
  formatFiles,
  generateFiles,
  Tree,
  updateProjectConfiguration,
  readProjectConfiguration,
  joinPathFragments,
  ProjectConfiguration,
  updateJson,
} from '@nx/devkit';
import * as path from 'path';
import { PlaywrightComponentConfigurationGeneratorSchema } from './schema';

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

  addExtendsToLintConfig(tree, normalizedOptions);

  await formatFiles(tree);
}

function addExtendsToLintConfig(tree: Tree, options: Options) {
  const fileName = joinPathFragments(
    options.projectConfig.root,
    '.eslintrc.json'
  );
  updateJson(tree, fileName, (json) => {
    json.overrides ??= [];
    json.overrides.push({
      files: ['src/**/*.spec.{ts,js,tsx,jsx}'],
      extends: ['plugin:playwright/recommended'],
      rules: {},
    });

    return json;
  });
}

function addComponentTestTarget(tree: Tree, options: Options) {
  const config = options.projectConfig;

  const targetDefinition = {
    executor: '@fluentui-contrib/nx-plugin:playwright',
    options: {
      testingType: 'component',
      outputs: [`{workspaceRoot}/dist/.playwright/${config.root}`],
      options: {
        config: `${config.root}/playwright.config.ts`,
      },
    },
  };

  config.targets = config.targets ?? {};
  config.targets['component-test'] = targetDefinition;

  updateProjectConfiguration(tree, options.name, { ...config });
}
