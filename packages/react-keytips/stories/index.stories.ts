import { Meta } from '@storybook/react';
import { Keytips } from '@fluentui-contrib/react-keytips';
export { DefaultStory as Default } from './Default.stories';
export { WithTabsStory as WithTabs } from './WithTabs.stories';
export { DynamicStory as Dynamic } from './Dynamic.stories';
export { OverflowStory as Overflow } from './Overflow.stories';

const meta: Meta<typeof Keytips> = {
  title: 'Keytips',
  component: Keytips,
};

export default meta;
