import * as React from 'react';

import {
  Announcements,
  DragEndEvent,
  DragMoveEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useAnimationFrame, useId } from '@fluentui/react-components';

import {
  DraggableDialogProps,
  DraggableDialogState,
} from './DraggableDialog.types';
import { getParsedDraggableMargin } from './utils/getParsedDraggableMargin';
import { restrictToBoundaryModifier } from './utils/restrictToBoundaryModifier';

/**
 * This function is used to partition the props into two separate objects. The first object contains
 * the props that are specific to the DraggableDialog component, and the second object contains the
 * props that should be passed down to the Dialog component.
 */
const usePartitionedDraggableProps = (props: DraggableDialogProps) => {
  const {
    margin,
    boundary,
    position,
    id,
    announcements,
    onPositionChange,
    ...dialogProps
  } = props;
  const defaultId = useId('draggable-dialog-');
  const draggableDialogProps = {
    id: id || defaultId,
    boundary: boundary === null ? null : boundary ?? 'viewport',
    position: position ?? null,
    announcements,
    margin: getParsedDraggableMargin(margin),
    onPositionChange: onPositionChange ?? (() => ({})),
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
    draggableDialogProps: {
      margin,
      boundary,
      id,
      announcements,
      position,
      onPositionChange,
    },
    dialogProps,
  } = usePartitionedDraggableProps(props);

  const [dropPosition, setDropPosition] = React.useState({ x: 0, y: 0 });
  const [hasBeenDragged, setHasBeenDragged] = React.useState(false);

  const [setOnDragAnimationFrame, cancelOnDragAnimationFrame] =
    useAnimationFrame();

  const keyboardSensor = useSensor(KeyboardSensor);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(keyboardSensor, mouseSensor, touchSensor);

  const onDragMove = React.useCallback(
    ({ active }: DragMoveEvent | DragEndEvent) => {
      cancelOnDragAnimationFrame();
      setOnDragAnimationFrame(() => {
        const { translated: rect } = active.rect.current;

        if (!onPositionChange || !rect) {
          return;
        }

        onPositionChange({
          x: rect.left,
          y: rect.top,
        });
      });
    },
    [cancelOnDragAnimationFrame, setOnDragAnimationFrame, onPositionChange]
  );

  const setInitialDropPosition = React.useCallback(
    ({ x, y }: typeof dropPosition) => {
      setHasBeenDragged(true);
      setDropPosition({
        x,
        y,
      });
    },
    []
  );

  const onDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { translated: rect } = event.active.rect.current;

      if (!rect) {
        return;
      }

      setInitialDropPosition({
        x: rect.left,
        y: rect.top,
      });
      onDragMove(event);
    },
    [onDragMove, setInitialDropPosition]
  );

  const modifiers = React.useMemo(() => {
    return [restrictToBoundaryModifier({ margin, boundary })];
  }, [margin, boundary]);

  const accessibility = React.useMemo(() => {
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

  React.useEffect(
    () => () => cancelOnDragAnimationFrame(),
    [cancelOnDragAnimationFrame]
  );

  return React.useMemo(
    () => ({
      onDragMove,
      onDragEnd,
      sensors,
      modifiers,
      accessibility,
      dialogProps,
      contextValue: {
        hasDraggableParent: true,
        dropPosition,
        position,
        onPositionChange,
        id,
        hasBeenDragged,
        margin,
        boundary,
        setDropPosition: () => undefined, // deprecated but needed for compatibility
      },
    }),
    [
      onDragMove,
      onDragEnd,
      sensors,
      modifiers,
      accessibility,
      dialogProps,
      dropPosition,
      position,
      onPositionChange,
      id,
      hasBeenDragged,
      margin,
      boundary,
    ]
  );
};
