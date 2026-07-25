import { Meta } from '@storybook/react';
import { DraggableDialog } from '@fluentui-contrib/react-draggable-dialog';

export { Default } from './Default.stories';
export { WithMargin } from './WithMargin.stories';
export { NoBoundary } from './NoBoundary.stories';
export { CustomBoundary } from './CustomBoundary.stories';
export { CustomPosition } from './CustomPosition.stories';

const meta: Meta<typeof DraggableDialog> = {
  title: 'Packages/react-draggable-dialog',
  component: DraggableDialog,
  parameters: {
    docs: {
      description: {
        component: 'A draggable dialog component powered by Fluent UI.',
      },
    },
  },
};

export default meta;
