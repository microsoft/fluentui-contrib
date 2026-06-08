import { Meta } from '@storybook/react';

export { Default } from './Default.stories';
export { Fallback } from './Fallback.stories';
export { FallbackWithDuration } from './FallbackWithDuration.stories';

const meta: Meta = {
  title: 'Packages/houdini-utils',
  parameters: {
    docs: {
      description: {
        component:
          'Low-level utilities for CSS Houdini APIs plus a canvas fallback for paint worklet scenarios.',
      },
      hideArgsTable: true,
    },
  },
};

export default meta;
