import { Meta } from '@storybook/react';
import { HeadlessFluentProvider } from '@fluentui-contrib/react-headless-provider';
import description from '../../README.md';

export { Default } from './Default.stories';

const meta: Meta<typeof HeadlessFluentProvider> = {
  title: 'Packages/react-headless-provider',
  component: HeadlessFluentProvider,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
};

export default meta;
