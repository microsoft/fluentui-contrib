import type { Meta } from '@storybook/react';
import { Popover } from '@fluentui-contrib/react-popover';
export { Default } from './Default.stories';
export { ControllingOpenAndClose } from './ControllingOpenAndClose.stories';
export { NestedPopovers } from './NestedPopovers.stories';
export { TrappingFocus } from './TrappingFocus.stories';

const meta = {
  title: 'Packages/react-popover/Popover',
  component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;
