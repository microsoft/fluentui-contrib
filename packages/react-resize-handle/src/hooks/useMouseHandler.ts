import { useFluent, useEventCallback } from '@fluentui/react-components';
import {
  getEventClientCoords,
  isMouseEvent,
  isTouchEvent,
  type NativeTouchOrMouseEvent,
  type EventHandler,
} from '@fluentui/react-utilities';
import * as React from 'react';

import { EVENTS, GrowDirection, ResizeHandleUpdateEventData } from '../types';
import type { UnitHandle } from './useUnitHandle';

export type UseMouseHandlerParams = {
  growDirection: GrowDirection;
  onValueChange: EventHandler<ResizeHandleUpdateEventData>;
  onDragEnd?: EventHandler<Omit<ResizeHandleUpdateEventData, 'value'>>;
  onDragStart?: EventHandler<Omit<ResizeHandleUpdateEventData, 'value'>>;

  getCurrentValue: () => number;
  unitHandle: UnitHandle;
};

export function useMouseHandler(params: UseMouseHandlerParams): {
  attachHandlers: (node: HTMLElement) => void;
  detachHandlers: (node: HTMLElement) => void;
} {
  const { targetDocument, dir } = useFluent();
  const targetWindow = targetDocument?.defaultView;

  const dragStartOriginCoords = React.useRef({ clientX: 0, clientY: 0 });
  const { growDirection, getCurrentValue, onValueChange, unitHandle } = params;

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
          newValue += unitHandle.fromPxToValue(
            deltaCoords[0] * (dir === 'rtl' ? -1 : 1)
          );
          break;
        case 'start':
          newValue -= unitHandle.fromPxToValue(
            deltaCoords[0] * (dir === 'rtl' ? -1 : 1)
          );
          break;
        case 'up':
          newValue -= unitHandle.fromPxToValue(deltaCoords[1]);
          break;
        case 'down':
          newValue += unitHandle.fromPxToValue(deltaCoords[1]);
          break;
      }

      onValueChange(event, {
        value: unitHandle.roundValue(newValue),
        unit: unitHandle.name,
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

  // Suppressing "selectstart" on the document during a drag prevents the browser from
  // selecting text as the user moves the pointer. The listener is added on drag start
  // and removed on drag end so normal text selection is unaffected outside of a resize.
  const onSelectStart = useEventCallback((event: Event) => {
    event.preventDefault();
  });

  const onDragEnd = useEventCallback((event: NativeTouchOrMouseEvent) => {
    targetDocument?.removeEventListener('selectstart', onSelectStart);

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
        ? { event, type: EVENTS.touch, unit: unitHandle.name }
        : { event, type: EVENTS.mouse, unit: unitHandle.name }
    );
  });

  // Pointer capture ensures that all subsequent pointer events (and their compatibility
  // mouse events) are routed to the capturing element, even when the cursor moves outside
  // the element bounds. This prevents a "stuck drag" state that occurs when the user drags
  // rapidly to a limit and the cursor leaves the handle before mouseup fires.
  // Touch events already have implicit capture, so this is only needed for mouse/pen.
  const onPointerCaptureStart = useEventCallback((event: PointerEvent) => {
    if (
      event.pointerType !== 'touch' &&
      event.currentTarget instanceof Element
    ) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  });

  // Suppressing the native "dragstart" event prevents the browser's HTML5 drag-and-drop
  // system from activating on the handle element. Without this, the browser can enter a
  // native drag state (showing a 🚫 cursor) that swallows mousemove/mouseup events,
  // leaving the custom drag in a permanently stuck state.
  const onNativeDragStart = useEventCallback((event: Event) => {
    event.preventDefault();
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
      targetDocument?.addEventListener('selectstart', onSelectStart);
      targetDocument?.addEventListener('mouseup', onDragEnd);
      targetDocument?.addEventListener('mousemove', onDrag);
    }

    if (isTouchEvent(event)) {
      targetDocument?.addEventListener('selectstart', onSelectStart);
      targetDocument?.addEventListener('touchend', onDragEnd);
      targetDocument?.addEventListener('touchmove', onDrag);
    }

    params.onDragStart?.(
      event,
      isTouchEvent(event)
        ? { event, type: EVENTS.touch, unit: unitHandle.name }
        : { event, type: EVENTS.mouse, unit: unitHandle.name }
    );
  });

  const attachHandlers = React.useCallback(
    (node: HTMLElement) => {
      node.addEventListener('pointerdown', onPointerCaptureStart);
      node.addEventListener('mousedown', onPointerDown);
      node.addEventListener('touchstart', onPointerDown);
      node.addEventListener('dragstart', onNativeDragStart);
    },
    [onPointerCaptureStart, onPointerDown, onNativeDragStart]
  );

  const detachHandlers = React.useCallback(
    (node: HTMLElement) => {
      node.removeEventListener('pointerdown', onPointerCaptureStart);
      node.removeEventListener('mousedown', onPointerDown);
      node.removeEventListener('touchstart', onPointerDown);
      node.removeEventListener('dragstart', onNativeDragStart);
    },
    [onPointerCaptureStart, onPointerDown, onNativeDragStart]
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
