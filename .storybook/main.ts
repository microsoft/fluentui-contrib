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
    '@storybook/addon-webpack5-compiler-babel',
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
