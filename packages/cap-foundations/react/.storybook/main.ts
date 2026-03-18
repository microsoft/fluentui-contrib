import type { StorybookConfig } from '@storybook/react-webpack5';

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootConfig from '../../../../.storybook/main';

const config: StorybookConfig = {
  ...rootConfig,
  stories: ['../stories/**/index.stories.@(js|jsx|ts|tsx|mdx)'],
  // Serve generated theme CSS so CSS custom properties resolve in stories.
  // Run `nx run cap-foundations-core:build-themes` before starting Storybook.
  staticDirs: [{ from: '../../core/dist/themes', to: '/themes' }],
};

export default config;
