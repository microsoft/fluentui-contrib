import { Meta } from '@storybook/react';
import description from '../../README.md';

export { Default } from './Default.stories';
export { Fallback } from './Fallback.stories';
export { FallbackWithDuration } from './FallbackWithDuration.stories';

const meta: Meta = {
  title: 'Packages/houdini-utils',
  parameters: {
    docs: {
      description: {
        component: description,
      },
      hideArgsTable: true,
    },
  },
};

export default meta;
