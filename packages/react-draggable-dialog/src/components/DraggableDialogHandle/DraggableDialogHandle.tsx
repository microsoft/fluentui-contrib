import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';

import { DraggableDialogHandleProps } from './DraggableDialogHandle.types';
import { useStyles } from './DraggableDialogHandle.styles';
import { useDraggableDialogHandle } from './useDraggableDialogHandle';

/**
 * DraggableDialogHandle is the handle element that can be used to drag the DraggableDialog.
 */
export const DraggableDialogHandle: React.FC<DraggableDialogHandleProps> =
  React.memo(({ children, className }) => {
    const styles = useStyles();
    const { setActivatorNodeRef, attributes, listeners } =
      useDraggableDialogHandle();

    const child = React.Children.only(children);

    return React.cloneElement(child, {
      ref: setActivatorNodeRef,
      className: mergeClasses(
        'fui-DraggableDialogHandle',
        styles.root,
        child.props.className,
        className
      ),
      ...attributes,
      ...listeners,
    });
  });

DraggableDialogHandle.displayName = 'DraggableDialogHandle';
