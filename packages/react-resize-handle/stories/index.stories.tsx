import { Meta } from '@storybook/react';

export { Default } from './Default.stories';

const meta: Meta = {
  title: 'Packages/react-resize-handle',
  parameters: {
    docs: {
      description: {
        component:
          'Adds accessible mouse and keyboard resizing for panels and components. It works with CSS variables and grid/flex layouts, and can operate in absolute or relative resize modes.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
