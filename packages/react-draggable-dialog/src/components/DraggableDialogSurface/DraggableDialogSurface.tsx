import * as React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
  DialogSurface,
  mergeClasses,
  useMergedRefs,
} from '@fluentui/react-components';

import { DraggableDialogSurfaceProps } from './DraggableDialogSurface.types';
import { useStyles } from './DraggableDialogSurface.styles';
import { useDraggableDialog } from '../../hooks/useDraggableDialog';

export const DraggableDialogSurface: React.FC<DraggableDialogSurfaceProps> = ({
  children,
  className,
}) => {
  const styles = useStyles();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const {
    id,
    hasBeenDragged,
    isDragging,
    position: { x, y },
  } = useDraggableDialog();
  const { setNodeRef, transform } = useDraggable({
    id,
  });
  const refs = useMergedRefs(setNodeRef as React.Ref<HTMLDivElement>, ref);

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
        /* Styles for when the dialog is being dragged */
        return {
          ...baseStyles,
          transform: CSS.Translate.toString(transform),
        };
      }

      /* Styles for the final position of the dialog */
      return baseStyles;
    }

    /* Styles to restore a previously dragged dialog */
    return {
      ...resetStyles,
      top: '50%',
      left: '50%',
      marginTop: y,
      marginLeft: x,
      transform: `translate3D(-50%, -50%, 0)`,
    };
  }, [transform, x, y, hasBeenDragged, isDragging]);

  return (
    <DialogSurface
      ref={refs}
      style={style}
      className={mergeClasses(
        'fui-DraggableDialogSurface',
        styles.root,
        className
      )}
    >
      {children}
    </DialogSurface>
  );
};
