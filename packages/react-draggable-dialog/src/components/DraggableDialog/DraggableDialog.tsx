import * as React from 'react';
import {
  DndContext,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensors,
  DragEndEvent,
  PointerSensor,
  Announcements,
} from '@dnd-kit/core';
import { Dialog, useId } from '@fluentui/react-components';

import { DraggableDialogContextProvider } from '../../contexts/DraggableDialogContext';
import { DraggableDialogProps } from './DraggableDialog.types';
import { getParsedDraggableMargin, restrictToMarginModifier } from './utils';

export const DraggableDialog: React.FC<DraggableDialogProps> = (props) => {
  const { margin, keepInViewport, id, announcements } = {
    id: useId('draggable-dialog-'),
    keepInViewport: true,
    ...props,
    margin: getParsedDraggableMargin(props.margin),
  };

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

  return (
    <DndContext
      sensors={sensors}
      modifiers={modifiers}
      accessibility={accessibilityProps}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <DraggableDialogContextProvider value={contextValue}>
        <Dialog {...props} />
      </DraggableDialogContextProvider>
    </DndContext>
  );
};
