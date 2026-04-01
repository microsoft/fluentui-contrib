import type { StorybookConfig } from '@storybook/react-webpack5';

import rootConfig from '../../../.storybook/main';

const config: StorybookConfig = {
  ...rootConfig,
  addons: [...(rootConfig.addons ?? []), 'storybook-addon-pseudo-states'],
  stories: ['../stories/**/index.stories.@(js|jsx|ts|tsx|mdx)'],
};

export default config;
