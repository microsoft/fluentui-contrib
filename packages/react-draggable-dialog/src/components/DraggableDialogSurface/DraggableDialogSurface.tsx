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
  React.memo(
    React.forwardRef((props, forwardedRef) => {
      const { children, className, style, ...rest } = props;
      const styles = useStyles();
      const {
        ref,
        style: draggableStyle,
        mountNode,
      } = useDraggableDialogSurface(props, forwardedRef);

      return (
        <DialogSurface
          ref={ref}
          style={{
            ...style,
            ...draggableStyle,
          }}
          className={mergeClasses(
            'fui-DraggableDialogSurface',
            styles.root,
            className
          )}
          mountNode={mountNode}
          {...rest}
        >
          {children}
        </DialogSurface>
      );
    })
  );

DraggableDialogSurface.displayName = 'DraggableDialogSurface';
