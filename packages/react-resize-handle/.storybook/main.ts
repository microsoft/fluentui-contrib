import type { StorybookConfig } from '@storybook/react-webpack5';

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootConfig from '../../../.storybook/main';

const config: StorybookConfig = {
  ...rootConfig,
  stories: ['../stories/**/index.stories.@(js|jsx|ts|tsx|mdx)'],
};

export default config;
