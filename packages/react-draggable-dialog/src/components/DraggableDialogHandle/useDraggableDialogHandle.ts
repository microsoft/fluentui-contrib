import { useDraggable } from '@dnd-kit/core';

import { useDraggableDialogContext } from '../../contexts/DraggableDialogContext';
import { DraggableDialogHandleState } from './DraggableDialogHandle.types';

/**
 * Returns the state needed to make a draggable dialog handle.
 */
export const useDraggableDialogHandle = (): DraggableDialogHandleState => {
  const { id } = useDraggableDialogContext();
  const { setActivatorNodeRef, attributes, listeners } = useDraggable({
    id,
  });

  return {
    setActivatorNodeRef,
    attributes,
    listeners,
  };
};
