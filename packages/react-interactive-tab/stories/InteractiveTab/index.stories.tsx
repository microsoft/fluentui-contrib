import type { Meta } from '@storybook/react';
import { InteractiveTab } from '@fluentui-contrib/react-interactive-tab';

export { Default } from './Default.stories';

const meta = {
  title: 'Packages/react-interactive-tab',
  component: InteractiveTab,
  parameters: {
    docs: {
      description: {
        component:
          'InteractiveTab extends Fluent UI Tab to support interactive content inside a tab, including before and after content slots around the tab button.',
      },
    },
  },
} satisfies Meta<typeof InteractiveTab>;

export default meta;
