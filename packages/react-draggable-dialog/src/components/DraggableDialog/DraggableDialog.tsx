import * as React from 'react';
import { DndContext } from '@dnd-kit/core';
import { Dialog } from '@fluentui/react-components';

import { DraggableDialogContextProvider } from '../../contexts/DraggableDialogContext';
import { DraggableDialogProps } from './DraggableDialog.types';
import { useDraggableDialog } from './useDraggableDialog';

/**
 * DraggableDialog is a wrapper around the Dialog component that makes it draggable.
 */
export const DraggableDialog: React.FC<DraggableDialogProps> = (props) => {
  const {
    sensors,
    modifiers,
    onDragStart,
    onDragEnd,
    accessibilityProps,
    contextValue,
    dialogProps,
  } = useDraggableDialog(props);

  return (
    <DndContext
      sensors={sensors}
      modifiers={modifiers}
      accessibility={accessibilityProps}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <DraggableDialogContextProvider value={contextValue}>
        <Dialog {...dialogProps} />
      </DraggableDialogContextProvider>
    </DndContext>
  );
};
