import type { Meta } from '@storybook/react';
import { InteractiveTab } from '@fluentui-contrib/react-interactive-tab';
import description from '../../README.md';

export { Default } from './Default.stories';

const meta = {
  title: 'Packages/react-interactive-tab',
  component: InteractiveTab,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta<typeof InteractiveTab>;

export default meta;
