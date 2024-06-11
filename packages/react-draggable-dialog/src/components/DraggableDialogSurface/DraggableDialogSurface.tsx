import * as React from 'react';
import {
  DialogSurface,
  ForwardRefComponent,
  mergeClasses,
} from '@fluentui/react-components';

import { DraggableDialogSurfaceProps } from './DraggableDialogSurface.types';
import { useStyles } from './DraggableDialogSurface.styles';
import { useDraggableDialogSurface } from './useDraggableDialogSurface';

/**
 * DraggableDialogSurface is a wrapper around the DialogSurface component that,
 * when composed with DraggableDialog, can be dragged.
 */
export const DraggableDialogSurface: ForwardRefComponent<DraggableDialogSurfaceProps> =
  React.forwardRef((props, _ref) => {
    const { children, className } = props;
    const styles = useStyles();
    const { ref, style, mountNode } = useDraggableDialogSurface(props, _ref);

    return (
      <DialogSurface
        ref={ref}
        style={style}
        className={mergeClasses(
          'fui-DraggableDialogSurface',
          styles.root,
          className
        )}
        mountNode={mountNode}
        {...props}
      >
        {children}
      </DialogSurface>
    );
  });
