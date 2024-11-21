import { Meta } from '@storybook/react';
import { TreeGrid } from '@fluentui-contrib/react-tree-grid';
import description from '../README.md';
import a11y from './a11y.md';

export { Default } from './Default.stories';
export { Meet } from './Meet.stories';
export { LiveMeetingsList } from './LiveMeetingsList.stories';
export { Virtualization } from './Virtualization.stories';
export { EmailInbox } from './EmailInbox.stories';
export { Calls } from './Calls.stories';

const meta = {
  title: 'Packages/react-tree-grid',
  component: TreeGrid,
  parameters: {
    docs: {
      description: {
        component: [description, a11y].join('\n'),
      },
    },
  },
} as Meta<typeof TreeGrid>;

export default meta;
