import { Meta } from '@storybook/react';
import { ThemelessFluentProvider } from '@fluentui-contrib/react-themeless-provider';
export { Default } from './Default.stories';

const meta: Meta<typeof ThemelessFluentProvider> = {
  title: 'Packages/react-themeless-provider',
  component: ThemelessFluentProvider,
  parameters: {
    docs: {
      description: {
        component:
          'Provides ThemelessFluentProvider, a FluentProvider replacement for shadow DOM scenarios where theme CSS variables are managed externally.',
      },
    },
  },
};

export default meta;
