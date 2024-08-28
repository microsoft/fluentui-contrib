import { useFluent, useEventCallback } from '@fluentui/react-components';
import {
  getEventClientCoords,
  NativeTouchOrMouseEvent,
  isMouseEvent,
  isTouchEvent,
} from '@fluentui/react-utilities';
import * as React from 'react';
import { GrowDirection } from '../types';

export type UseMouseHandlerParams = {
  onDown?: (event: NativeTouchOrMouseEvent) => void;
  onMove?: (event: NativeTouchOrMouseEvent) => void;
  growDirection: GrowDirection;
  onValueChange: (event: NativeTouchOrMouseEvent, value: number) => void;
  onDragEnd?: (e: NativeTouchOrMouseEvent) => void;
  onDragStart?: (e: NativeTouchOrMouseEvent) => void;
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

      onValueChange(event, Math.round(newValue));
    }
  );

  const onDrag = useEventCallback((event: NativeTouchOrMouseEvent) => {
    targetWindow?.requestAnimationFrame(() => recalculatePosition(event));
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

    params.onDragEnd?.(event);
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

    params.onDragStart?.(event);
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

  return {
    attachHandlers,
    detachHandlers,
  };
}
