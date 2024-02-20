import * as React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useMergedRefs } from '@fluentui/react-components';

import { useDraggableDialogContext } from '../../contexts/DraggableDialogContext';
import { DraggableDialogSurfaceState } from './DraggableDialogSurface.types';

/**
 * Returns the state needed to make a draggable dialog surface.
 */
export const useDraggableDialogSurface = (): DraggableDialogSurfaceState => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const {
    id,
    hasBeenDragged,
    isDragging,
    position: { x, y },
  } = useDraggableDialogContext();
  const { setNodeRef, transform } = useDraggable({
    id,
  });

  const style = React.useMemo(() => {
    if (!hasBeenDragged) {
      return;
    }

    const resetStyles = {
      margin: 0,
      transition: 'none',
    };

    if (ref.current) {
      const baseStyles = {
        ...resetStyles,
        top: `calc(50% + ${y}px)`,
        left: `calc(50% + ${x}px)`,
        marginTop: -Math.ceil(ref.current.clientHeight / 2),
        marginLeft: -Math.ceil(ref.current.clientWidth / 2),
      };

      if (isDragging) {
        /* When the dialog is being dragged */
        return {
          ...baseStyles,
          transform: CSS.Translate.toString(transform),
        };
      }

      /* The final position of the dialog */
      return baseStyles;
    }

    /* Restore a previously dragged dialog */
    return {
      ...resetStyles,
      top: '50%',
      left: '50%',
      marginTop: y,
      marginLeft: x,
      transform: `translate3D(-50%, -50%, 0)`,
    };
  }, [transform, x, y, hasBeenDragged, isDragging]);

  return {
    ref: useMergedRefs(setNodeRef as React.Ref<HTMLDivElement>, ref),
    style,
  };
};
