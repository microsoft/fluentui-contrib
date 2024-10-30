import * as React from 'react';

import { Meta } from '@storybook/react';
import { Keytips } from '@fluentui-contrib/react-keytips';
import description from '../README.md';
export { DefaultStory as Default } from './Default.stories';
export { WithTabsStory as WithTabs } from './WithTabs.stories';
export { DynamicStory as Dynamic } from './Dynamic.stories';
export { OverflowStory as Overflow } from './OverflowMenu.stories';

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
        component: description,
      },
    },
  },
} satisfies Meta<typeof Keytips>;

export default meta;
