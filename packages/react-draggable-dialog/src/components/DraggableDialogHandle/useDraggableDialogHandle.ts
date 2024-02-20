import { useDraggable } from '@dnd-kit/core';

import { assertDialogParent } from '../../utils/assertDialogParent';
import { useDraggableDialogContext } from '../../contexts/DraggableDialogContext';
import { DraggableDialogHandleState } from './DraggableDialogHandle.types';

/**
 * Returns the state needed to make a draggable dialog handle.
 */
export const useDraggableDialogHandle = (): DraggableDialogHandleState => {
  const { id, hasDialogParent } = useDraggableDialogContext();
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
