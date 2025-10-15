import * as React from 'react';
import { DndContext } from '@dnd-kit/core';
import { Dialog } from '@fluentui/react-components';

import { DraggableDialogContextProvider } from '../../contexts/DraggableDialogContext';
import { DraggableDialogProps } from './DraggableDialog.types';
import { useDraggableDialog } from './useDraggableDialog';

/**
 * DraggableDialog is a wrapper around the Dialog component that makes it draggable.
 */
export const DraggableDialog: React.FC<DraggableDialogProps> = React.memo(
  (props) => {
    const { contextValue, dialogProps, ...dndProps } =
      useDraggableDialog(props);

    return (
      <DndContext {...dndProps}>
        <DraggableDialogContextProvider value={contextValue}>
          <Dialog {...dialogProps} />
        </DraggableDialogContextProvider>
      </DndContext>
    );
  }
);

DraggableDialog.displayName = 'DraggableDialog';
