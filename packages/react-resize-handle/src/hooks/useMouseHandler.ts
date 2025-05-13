import { useFluent, useEventCallback } from '@fluentui/react-components';

import type { EventHandler } from '@fluentui/react-utilities';
import {
  getEventClientCoords,
  NativeTouchOrMouseEvent,
  isMouseEvent,
  isTouchEvent,
} from '@fluentui/react-utilities';
import * as React from 'react';
import { EVENTS, GrowDirection, ResizeHandleUpdateEventData } from '../types';

export type UseMouseHandlerParams = {
  growDirection: GrowDirection;
  onValueChange: EventHandler<ResizeHandleUpdateEventData>;
  onDragEnd?: EventHandler<Omit<ResizeHandleUpdateEventData, 'value'>>;
  onDragStart?: EventHandler<Omit<ResizeHandleUpdateEventData, 'value'>>;
  getCurrentValue: () => number;
};

export function useMouseHandler(params: UseMouseHandlerParams) {
  const { targetDocument, dir } = useFluent();
  const targetWindow = targetDocument?.defaultView;

  const dragStartOriginCoords = React.useRef({ clientX: 0, clientY: 0 });
  const { growDirection, onValueChange, getCurrentValue } = params;

  const startValue = React.useRef(0);

  const recalculatePosition = useEventCallback(
    (event: NativeTouchOrMouseEvent) => {
      const { clientX, clientY } = getEventClientCoords(event);
      const deltaCoords = [
        clientX - dragStartOriginCoords.current.clientX,
        clientY - dragStartOriginCoords.current.clientY,
      ];

      let newValue = startValue.current;

      switch (growDirection) {
        case 'end':
          newValue += deltaCoords[0] * (dir === 'rtl' ? -1 : 1);
          break;
        case 'start':
          newValue -= deltaCoords[0] * (dir === 'rtl' ? -1 : 1);
          break;
        case 'up':
          newValue -= deltaCoords[1];
          break;
        case 'down':
          newValue += deltaCoords[1];
          break;
      }

      onValueChange(event, {
        value: Math.round(newValue),
        ...(isTouchEvent(event)
          ? { event, type: EVENTS.touch }
          : { event, type: EVENTS.mouse }),
      });
    }
  );

  const rafIdRef = React.useRef<number | null>(null);
  const onDrag = useEventCallback((event: NativeTouchOrMouseEvent) => {
    if (targetWindow) {
      rafIdRef.current = targetWindow.requestAnimationFrame(() =>
        recalculatePosition(event)
      );
    }
  });

  const onDragEnd = useEventCallback((event: NativeTouchOrMouseEvent) => {
    if (isMouseEvent(event)) {
      targetDocument?.removeEventListener('mouseup', onDragEnd);
      targetDocument?.removeEventListener('mousemove', onDrag);
    }

    if (isTouchEvent(event)) {
      targetDocument?.removeEventListener('touchend', onDragEnd);
      targetDocument?.removeEventListener('touchmove', onDrag);
    }

    // Heads up!
    //
    // To keep the order of events, we need to cancel the animation frame i.e. the order should be always:
    // - onChange
    // - onDragEnd

    if (targetWindow && rafIdRef.current) {
      targetWindow.cancelAnimationFrame(rafIdRef.current);
    }

    recalculatePosition(event);
    params.onDragEnd?.(
      event,
      isTouchEvent(event)
        ? { event, type: EVENTS.touch }
        : { event, type: EVENTS.mouse }
    );
  });

  const onPointerDown = useEventCallback((event: NativeTouchOrMouseEvent) => {
    dragStartOriginCoords.current = getEventClientCoords(event);
    // As we start dragging, save the current value otherwise the value increases,
    // the delta compounds and the element grows/shrinks too fast.
    startValue.current = getCurrentValue();

    if (event.defaultPrevented) {
      return;
    }

    if (isMouseEvent(event)) {
      // ignore other buttons than primary mouse button
      if (event.target !== event.currentTarget || event.button !== 0) {
        return;
      }
      targetDocument?.addEventListener('mouseup', onDragEnd);
      targetDocument?.addEventListener('mousemove', onDrag);
    }

    if (isTouchEvent(event)) {
      targetDocument?.addEventListener('touchend', onDragEnd);
      targetDocument?.addEventListener('touchmove', onDrag);
    }

    params.onDragStart?.(
      event,
      isTouchEvent(event)
        ? { event, type: EVENTS.touch }
        : { event, type: EVENTS.mouse }
    );
  });

  const attachHandlers = React.useCallback(
    (node: HTMLElement) => {
      node.addEventListener('mousedown', onPointerDown);
      node.addEventListener('touchstart', onPointerDown);
    },
    [onPointerDown]
  );

  const detachHandlers = React.useCallback(
    (node: HTMLElement) => {
      node.removeEventListener('mousedown', onPointerDown);
      node.removeEventListener('touchstart', onPointerDown);
    },
    [onPointerDown]
  );

  React.useEffect(() => {
    return () => {
      if (targetWindow && rafIdRef.current) {
        targetWindow.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [targetWindow]);

  return {
    attachHandlers,
    detachHandlers,
  };
}
