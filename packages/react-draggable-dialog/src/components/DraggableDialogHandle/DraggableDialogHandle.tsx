import * as React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { mergeClasses } from '@fluentui/react-components';

import { useDraggableDialog } from '../../hooks/useDraggableDialog';
import { DraggableDialogHandleProps } from './DraggableDialogHandle.types';
import { useStyles } from './DraggableDialogHandle.styles';

export const DraggableDialogHandle: React.FC<DraggableDialogHandleProps> = ({
  children,
  className,
}) => {
  const styles = useStyles();
  const { id } = useDraggableDialog();
  const { setActivatorNodeRef, attributes, listeners } = useDraggable({
    id,
  });

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
