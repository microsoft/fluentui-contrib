import * as React from 'react';

import {
  Announcements,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useId } from '@fluentui/react-components';

import { getParsedDraggableMargin, restrictToMarginModifier } from './utils';
import {
  DraggableDialogProps,
  DraggableDialogState,
} from './DraggableDialog.types';

/**
 * This function is used to partition the props into two separate objects. The first object contains
 * the props that are specific to the DraggableDialog component, and the second object contains the
 * props that should be passed down to the Dialog component.
 */
const getPartitionedProps = (props: DraggableDialogProps) => {
  const { margin, keepInViewport, id, announcements, ...dialogProps } = props;

  const draggableDialogProps = {
    id: useId('draggable-dialog-', id),
    keepInViewport:
      typeof keepInViewport === 'undefined' ? true : keepInViewport,
    announcements,
    margin: getParsedDraggableMargin(margin),
  };

  return {
    draggableDialogProps,
    dialogProps,
  };
};

/**
 * This hook is used to provide the necessary state and context values to the DraggableDialog component.
 */
export const useDraggableDialog = (
  props: DraggableDialogProps
): DraggableDialogState => {
  const {
    draggableDialogProps: { announcements, id, keepInViewport, margin },
    dialogProps,
  } = getPartitionedProps(props);

  const [isDragging, setIsDragging] = React.useState(false);
  const [hasBeenDragged, setHasBeenDragged] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const mouseSensor = useSensor(MouseSensor);
  const pointerSensor = useSensor(PointerSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(
    pointerSensor,
    mouseSensor,
    touchSensor,
    keyboardSensor
  );

  const contextValue = React.useMemo(
    () => ({
      hasDialogParent: true,
      isDragging,
      hasBeenDragged,
      position,
      id,
    }),
    [isDragging, hasBeenDragged, position, id]
  );

  const onDragEnd = React.useCallback((event: DragEndEvent) => {
    setPosition(({ x, y }) => ({
      x: x + event.delta.x,
      y: y + event.delta.y,
    }));
    setIsDragging(false);
  }, []);

  const onDragStart = React.useCallback(() => {
    setHasBeenDragged(true);
    setIsDragging(true);
  }, []);

  const modifiers = React.useMemo(() => {
    return [restrictToMarginModifier({ margin, keepInViewport })];
  }, [margin, keepInViewport]);

  const accessibilityProps = React.useMemo(() => {
    const { start, end } = announcements || {};

    if (!announcements || (!start && !end)) {
      return undefined;
    }

    const announcementsProps: Partial<Announcements> = {};

    if (start) {
      announcementsProps.onDragStart = () => start;
    }

    if (end) {
      announcementsProps.onDragEnd = () => end;
    }

    return {
      announcements: announcementsProps,
    };
  }, [announcements]);

  return {
    sensors,
    modifiers,
    accessibilityProps,
    onDragStart,
    onDragEnd,
    contextValue,
    dialogProps,
  };
};
