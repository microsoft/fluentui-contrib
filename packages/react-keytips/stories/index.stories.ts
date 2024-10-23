import { Meta } from '@storybook/react';
import { Keytips } from '@fluentui-contrib/react-keytips';
export { DefaultStory as Default } from './Default.stories';
export { WithTabsStory as WithTabs } from './WithTabs.stories';
export { DynamicStory as Dynamic } from './Dynamic.stories';
export { OverflowStory as Overflow } from './OverflowMenu.stories';

const meta = {
  title: 'Packages/react-keytips',
  component: Keytips,
} satisfies Meta<typeof Keytips>;

export default meta;
