import * as React from 'react';

import {
  Announcements,
  ClientRect,
  DragEndEvent,
  DragMoveEvent,
  KeyboardSensor,
  PointerSensor,
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
import { DraggableDialogContextValue } from '../../contexts/DraggableDialogContext';

const noopPositionChange = () => ({});

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
    onPositionChange: onPositionChange ?? noopPositionChange,
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

  const onPositionChangeRef = React.useRef(onPositionChange);
  React.useEffect(() => {
    onPositionChangeRef.current = onPositionChange;
  }, [onPositionChange]);

  const lastReportedPositionRef = React.useRef({
    x: 0,
    y: 0,
  });

  const [setOnDragAnimationFrame, cancelOnDragAnimationFrame] =
    useAnimationFrame();

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(PointerSensor)
  );

  const reportPositionChange = React.useCallback(
    (rect: ClientRect) => {
      const handler = onPositionChangeRef.current;

      if (handler === noopPositionChange) {
        return;
      }

      cancelOnDragAnimationFrame();
      setOnDragAnimationFrame(() => {
        const x = rect.left;
        const y = rect.top;

        const last = lastReportedPositionRef.current;

        if (last.x === x && last.y === y) {
          return;
        }

        lastReportedPositionRef.current = { x, y };
        handler({ x, y });
      });
    },
    [cancelOnDragAnimationFrame, setOnDragAnimationFrame]
  );

  const onDragMove = React.useCallback(
    ({ active }: DragMoveEvent | DragEndEvent) => {
      const { translated: rect } = active.rect.current;

      if (!rect) {
        return;
      }

      reportPositionChange(rect);
    },
    [reportPositionChange]
  );

  const setInitialDropPosition = React.useCallback(
    ({ x, y }: typeof dropPosition) => {
      setHasBeenDragged((prev) => (prev ? prev : true));
      lastReportedPositionRef.current = { x, y };
      setDropPosition((prev) =>
        prev.x === x && prev.y === y ? prev : { x, y }
      );
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
      reportPositionChange(rect);
    },
    [onDragMove, setInitialDropPosition]
  );

  const modifiers = React.useMemo(() => {
    return [restrictToBoundaryModifier({ margin, boundary })];
  }, [margin, boundary]);

  const accessibility = React.useMemo(() => {
    if (!announcements?.start && !announcements?.end) {
      return undefined;
    }

    const announcementsProps: Partial<Announcements> = {};

    if (announcements.start) {
      const startMsg = announcements.start;
      announcementsProps.onDragStart = () => startMsg;
    }

    if (announcements.end) {
      const endMsg = announcements.end;
      announcementsProps.onDragEnd = () => endMsg;
    }

    return {
      announcements: announcementsProps,
    };
  }, [announcements?.start, announcements?.end]);

  React.useEffect(
    () => () => cancelOnDragAnimationFrame(),
    [cancelOnDragAnimationFrame]
  );

  const contextValue = React.useMemo<DraggableDialogContextValue>(
    () => ({
      hasDraggableParent: true,
      dropPosition,
      position,
      onPositionChange,
      id,
      hasBeenDragged,
      margin,
      boundary,
      setDropPosition: setInitialDropPosition,
    }),
    [
      dropPosition,
      position,
      onPositionChange,
      id,
      hasBeenDragged,
      margin,
      boundary,
      setInitialDropPosition,
    ]
  );

  return React.useMemo(
    () => ({
      onDragMove,
      onDragEnd,
      sensors,
      modifiers,
      accessibility,
      dialogProps,
      contextValue,
    }),
    [
      onDragMove,
      onDragEnd,
      sensors,
      modifiers,
      accessibility,
      dialogProps,
      contextValue,
    ]
  );
};
