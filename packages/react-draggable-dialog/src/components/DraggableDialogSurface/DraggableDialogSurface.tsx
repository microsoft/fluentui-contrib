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

    if (ref.current) {
      const baseStyles = {
        top: `calc(50% + ${y}px)`,
        left: `calc(50% + ${x}px)`,
        margin: 0,
        marginTop: -Math.ceil(ref.current.clientHeight / 2),
        marginLeft: -Math.ceil(ref.current.clientWidth / 2),
        transition: 'none',
      };

      if (isDragging) {
        return {
          ...baseStyles,
          transform: CSS.Translate.toString(transform),
        };
      }

      return baseStyles;
    }

    return {
      top: '50%',
      left: '50%',
      margin: 0,
      marginTop: y,
      marginLeft: x,
      transform: `translate3D(-50%, -50%, 0)`,
      transition: 'none',
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
