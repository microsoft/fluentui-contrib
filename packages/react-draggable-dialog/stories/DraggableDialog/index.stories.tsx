import { Meta } from '@storybook/react';
import { DraggableDialog } from '@fluentui-contrib/react-draggable-dialog';

export { Pragmatic } from './Pragmatic.stories';
export { Default } from './Default.stories';
export { WithMargin } from './WithMargin.stories';
export { NoBoundary } from './NoBoundary.stories';
export { CustomBoundary } from './CustomBoundary.stories';
export { InitialPosition } from './InitialPosition.stories';

const meta: Meta<typeof DraggableDialog> = {
  component: DraggableDialog,
};

export default meta;
