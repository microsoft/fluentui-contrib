import * as React from 'react';

import { Meta } from '@storybook/react';
import { Keytips } from '@fluentui-contrib/react-keytips';
export { DefaultStory as Default } from './Default.stories';
export { WithTabsStory as WithTabs } from './WithTabs.stories';
export { DynamicStory as Dynamic } from './Dynamic.stories';
export { ShortcutStory as Shortcut } from './Shortcuts.stories';
export { OverflowStory as Overflow } from './Overflow/Overflow.stories';

const meta = {
  title: 'Packages/react-keytips',
  component: Keytips,
  decorators: [
    (Story, { viewMode, name }) => (
      <>
        {viewMode === 'story' && <Keytips />}
        {viewMode === 'docs' && name === 'Default' && <Keytips />}
        <Story />
      </>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Keytips are popup hints that guide keyboard navigation through UI hierarchies using key sequences. Add a single `<Keytips />` root component and attach tips to targets with `useKeytipRef`.',
      },
    },
  },
} satisfies Meta<typeof Keytips>;

export default meta;
