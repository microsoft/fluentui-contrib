import { Meta } from '@storybook/react';
import { HeadlessFluentProvider } from '@fluentui-contrib/react-headless-provider';

export { Default } from './Default.stories';

const meta: Meta<typeof HeadlessFluentProvider> = {
  component: HeadlessFluentProvider,
};

export default meta;
