import { useFluent, useEventCallback } from '@fluentui/react-components';
import {
  getEventClientCoords,
  NativeTouchOrMouseEvent,
  isMouseEvent,
  isTouchEvent,
} from '@fluentui/react-utilities';
import * as React from 'react';
import { GrowDirection } from '../types';
import { elementDimension } from '../utils';

export type UseMouseHandlerParams = {
  onDown?: (event: NativeTouchOrMouseEvent) => void;
  onMove?: (event: NativeTouchOrMouseEvent) => void;
  elementRef: React.RefObject<HTMLElement>;
  growDirection: GrowDirection;
  onValueChange: (value: number) => void;
  onDragEnd?: (e: NativeTouchOrMouseEvent) => void;
  onDragStart?: (e: NativeTouchOrMouseEvent) => void;
};

export function useMouseHandler(params: UseMouseHandlerParams) {
  const { targetDocument, dir } = useFluent();
  const targetWindow = targetDocument?.defaultView;

  const dragStartOriginCoords = React.useRef({ clientX: 0, clientY: 0 });
  const { growDirection, onValueChange, elementRef } = params;

  const initialElementSize = React.useRef(
    elementDimension(elementRef.current, growDirection)
  );

  const recalculatePosition = useEventCallback(
    (event: NativeTouchOrMouseEvent) => {
      const { clientX, clientY } = getEventClientCoords(event);
      const deltaCoords = [
        clientX - dragStartOriginCoords.current.clientX,
        clientY - dragStartOriginCoords.current.clientY,
      ];

      let newValue = initialElementSize.current;

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

      onValueChange(Math.round(newValue));

      // If, after resize, the element size is different than the value we set, that we have reached the boundary
      // and the element size is controlled by something else (minmax, clamp, max, min css functions etc.)
      // In this case, we need to update the value to the actual element size so that the css var and a11y props
      // reflect the reality.
      const elSize = elementDimension(elementRef.current, growDirection);
      if (elSize !== newValue) {
        onValueChange(elSize);
      }
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
    initialElementSize.current = elementDimension(
      elementRef.current,
      growDirection
    );

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
