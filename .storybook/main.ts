import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@nx/react/plugins/storybook',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: true,
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config;
