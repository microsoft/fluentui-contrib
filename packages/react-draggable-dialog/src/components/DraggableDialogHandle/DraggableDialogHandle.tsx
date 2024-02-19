import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';

import { DraggableDialogHandleProps } from './DraggableDialogHandle.types';
import { useStyles } from './DraggableDialogHandle.styles';
import { useDraggableDialogHandle } from './useDraggableDialogHandle';

/**
 * DraggableDialogHandle is the handle element that can be used to drag the DraggableDialog.
 */
export const DraggableDialogHandle: React.FC<DraggableDialogHandleProps> = ({
  children,
  className,
}) => {
  const styles = useStyles();
  const { setActivatorNodeRef, attributes, listeners } =
    useDraggableDialogHandle();

  return React.cloneElement(children, {
    ref: setActivatorNodeRef,
    className: mergeClasses(
      'fui-DraggableDialogHandle',
      styles.root,
      className
    ),
    ...attributes,
    ...listeners,
  });
};
