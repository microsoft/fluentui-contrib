import { Meta } from '@storybook/react';
import { Keytips } from '@fluentui-contrib/react-keytips';
export { Default } from './Default.stories';
export { WithTabs } from './WithTabs.stories';
export { Dynamic } from './Dynamic.stories';

const meta: Meta<typeof Keytips> = {
  title: 'Keytips',
  component: Keytips,
};

export default meta;
