import { Meta } from '@storybook/react';
import { TreeGrid } from '@fluentui-contrib/react-tree-grid';

export { Default } from './Default.stories';
export { Meet } from './Meet.stories';
export { Virtualization } from './Virtualization.stories';
export { Interaction } from './Interaction.stories';
export { EmailInbox } from './EmailInbox.stories';

const meta: Meta<typeof TreeGrid> = {
  title: 'TreeGrid',
  component: TreeGrid,
};

export default meta;
