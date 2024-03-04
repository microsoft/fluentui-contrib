import { Meta } from '@storybook/react';
import { TreeGrid } from '@fluentui-contrib/react-tree-grid';

export { Default } from './Default.stories';
export { Meet } from './Meet.stories';
export { Virtualization } from './Virtualization.stories';
export { EmailInbox } from './EmailInbox.stories';

const meta = {
  title: 'TreeGrid',
  component: TreeGrid,
} as Meta<typeof TreeGrid>;

export default meta;
