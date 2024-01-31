import * as React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { mergeClasses } from '@fluentui/react-components';

import { DraggableDialogHandleProps } from './DraggableDialogHandle.types';
import { useStyles } from './DraggableDialogHandle.styles';
import { useDraggableDialogState } from '../../contexts/DraggableDialogContext';

export const DraggableDialogHandle: React.FC<DraggableDialogHandleProps> = ({
  children,
  className,
}) => {
  const styles = useStyles();
  const { id } = useDraggableDialogState();
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
