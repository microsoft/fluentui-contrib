import type { StorybookConfig } from '@storybook/react-webpack5';

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootConfig from '../../../../.storybook/main';

const config: StorybookConfig = {
  ...rootConfig,
  stories: ['../stories/**/index.stories.@(js|jsx|ts|tsx|mdx)'],
  // Serve generated theme CSS so CSS custom properties resolve in stories.
  // Run `nx run cap-foundations-core:build-themes` before starting Storybook.
  staticDirs: [{ from: '../../core/dist/themes', to: '/themes' }],
  // Disable react-docgen-typescript: it runs the full TS type-checker on every
  // cold start which adds significant overhead. Controls still work; arg types
  // are just not auto-inferred from TypeScript types.
  typescript: { reactDocgen: false },
  // Enable webpack filesystem cache so that subsequent starts reuse the previous
  // compilation instead of rebuilding from scratch each time.
  webpackFinal: async config => {
    config.cache = { type: 'filesystem', name: 'cap-foundations-react-storybook' };
    return config;
  },
};
export default config;
