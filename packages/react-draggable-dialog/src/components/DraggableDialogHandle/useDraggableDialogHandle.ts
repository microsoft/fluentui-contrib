import { useDraggable } from '@dnd-kit/core';

import { assertDialogParent } from '../../utils/assertDialogParent';
import { useDraggableDialogState } from '../../contexts/DraggableDialogContext';
import { DraggableDialogHandleState } from './DraggableDialogHandle.types';

/**
 * Returns the state needed to make a draggable dialog handle.
 */
export const useDraggableDialogHandle = (): DraggableDialogHandleState => {
  const { id, hasDialogParent } = useDraggableDialogState();
  const { setActivatorNodeRef, attributes, listeners } = useDraggable({
    id,
  });

  assertDialogParent(hasDialogParent, 'DraggableDialogHandle');

  return {
    setActivatorNodeRef,
    attributes,
    listeners,
  };
};
