import { Meta } from '@storybook/react';
import { HeadlessFluentProvider } from '@fluentui-contrib/react-headless-provider';

export { Default } from './Default.stories';

const meta: Meta<typeof HeadlessFluentProvider> = {
  title: 'Packages/react-headless-provider',
  component: HeadlessFluentProvider,
  parameters: {
    docs: {
      description: {
        component:
          'HeadlessFluentProvider applies Fluent UI React contexts without rendering an extra DOM wrapper element.',
      },
    },
  },
};

export default meta;
