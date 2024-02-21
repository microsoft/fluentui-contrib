import { useDraggable } from '@dnd-kit/core';

import { assertDialogParent } from '../../utils/assertDialogParent';
import { useDraggableDialogContext } from '../../contexts/DraggableDialogContext';
import { DraggableDialogHandleState } from './DraggableDialogHandle.types';

/**
 * Returns the state needed to make a draggable dialog handle.
 */
export const useDraggableDialogHandle = (): DraggableDialogHandleState => {
  const { id, hasDraggableParent } = useDraggableDialogContext();
  const { setActivatorNodeRef, attributes, listeners } = useDraggable({
    id,
  });

  assertDialogParent(hasDraggableParent, 'DraggableDialogHandle');

  return {
    setActivatorNodeRef,
    attributes,
    listeners,
  };
};
