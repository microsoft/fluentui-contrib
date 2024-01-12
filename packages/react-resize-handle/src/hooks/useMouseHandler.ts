import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  getEventClientCoords,
  NativeTouchOrMouseEvent,
  isMouseEvent,
  isTouchEvent,
  useEventCallback,
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
  const globalWin = targetDocument?.defaultView;

  const startCoords = React.useRef({ clientX: 0, clientY: 0 });
  const { growDirection, onValueChange, elementRef } = params;

  const key =
    growDirection === 'right' || growDirection === 'left' ? 'width' : 'height';
  const initialValue = React.useRef(
    elementRef.current?.getBoundingClientRect()[key] || 0
  );

  const recalculatePosition = useEventCallback(
    (event: NativeTouchOrMouseEvent) => {
      const { clientX, clientY } = getEventClientCoords(event);
      const deltaCoords = [
        clientX - startCoords.current.clientX,
        clientY - startCoords.current.clientY,
      ];

      let newValue = initialValue.current;

      switch (growDirection) {
        case 'right':
          newValue += deltaCoords[0] * (dir === 'rtl' ? -1 : 1);
          break;
        case 'left':
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
      const elSize = Math.round(
        elementRef.current?.getBoundingClientRect()[key] || 0
      );
      if (elSize !== newValue) {
        onValueChange(elSize);
      }
    }
  );

  const onDrag = useEventCallback((event: NativeTouchOrMouseEvent) => {
    //Using requestAnimationFrame improves performance on slower CPUs
    if (typeof globalWin?.requestAnimationFrame === 'function') {
      requestAnimationFrame(() => recalculatePosition(event));
    } else {
      recalculatePosition(event);
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

    params.onDragEnd?.(event);
  });

  const onPointerDown = useEventCallback((event: NativeTouchOrMouseEvent) => {
    startCoords.current = getEventClientCoords(event);
    initialValue.current = elementDimension(elementRef.current, growDirection);

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
