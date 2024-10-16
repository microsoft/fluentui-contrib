import { Meta } from '@storybook/react';
import { ThemelessFluentProvider } from '@fluentui-contrib/react-themeless-provider';
export { Default } from './Default.stories';
import description from '../../README.md';

const meta: Meta<typeof ThemelessFluentProvider> = {
  title: 'Packages/react-themeless-provider',
  component: ThemelessFluentProvider,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
};

export default meta;
