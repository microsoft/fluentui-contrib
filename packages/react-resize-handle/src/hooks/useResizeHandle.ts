import * as React from 'react';
import { useKeyboardHandler } from './useKeyboardHandler';
import { useMouseHandler } from './useMouseHandler';
import { clamp, elementDimension } from '../utils';
import { useEventCallback } from '@fluentui/react-components';
import { NativeTouchOrMouseEvent } from '@fluentui/react-utilities';
import { GrowDirection, UNMEASURED } from '../types';

export type UseResizeHandleParams = {
  /**
   * The direction in which the element is considered growing in size ('end', 'start', 'up', or 'down').
   */
  growDirection: GrowDirection;
  /**
   * The name of the CSS variable that will be set on the wrapper element to reflect the current size of the element.
   */
  variableName: string;
  /**
   * The minimum value in pixels that the element can be resized to.
   */
  minValue?: number;
  /**
   * The maximum value in pixels that the element can be resized to.
   */
  maxValue?: number;
  /**
   * A callback that will be called when the element is resized.
   */
  onChange?: (value: number) => void;
  /**
   * A callback that will be called when the resize operation starts.
   */
  onDragStart?: (e: NativeTouchOrMouseEvent, value: number) => void;
  /**
   * A callback that will be called when the resize operation ends.
   */
  onDragEnd?: (e: NativeTouchOrMouseEvent, value: number) => void;
  /**
   * A function that will be called to get the value that will be set as the aria-valuetext attribute on the resize handle.
   * Use this for localization.
   */
  getA11ValueText?: (value: number) => string;
};

export const useResizeHandle = (params: UseResizeHandleParams) => {
  const {
    growDirection,
    variableName,
    minValue = 0,
    maxValue = Number.MAX_SAFE_INTEGER,
    onChange,
    onDragStart,
    onDragEnd,
    getA11ValueText = (value) => `${value.toFixed(0)}px`,
  } = params;

  const handleRef = React.useRef<HTMLElement | null>(null);
  const wrapperRef = React.useRef<HTMLElement | null>(null);
  const elementRef = React.useRef<HTMLElement | null>(null);

  const currentValue = React.useRef(UNMEASURED);

  const updateElementsAttrs = React.useCallback(() => {
    wrapperRef.current?.style.setProperty(
      variableName,
      `${currentValue.current}px`
    );
    const handleAttributes = {
      tabIndex: 0,
      role: 'separator',
      'aria-valuemin': minValue,
      ...(maxValue < Number.MAX_SAFE_INTEGER
        ? { 'aria-valuemax': maxValue }
        : {}),
      'aria-valuetext': getA11ValueText(currentValue.current),
      'aria-orientation':
        growDirection === 'end' || growDirection === 'start'
          ? 'vertical'
          : 'horizontal',
    };

    Object.entries(handleAttributes).forEach(([key, value]) => {
      handleRef.current?.setAttribute(key, String(value));
    });

    onChange?.(currentValue.current);
  }, [getA11ValueText, maxValue, minValue, onChange, variableName]);

  // In case the maxValue or minValue is changed, we need to make sure we are not exceeding the new limits
  React.useEffect(() => {
    setValue(currentValue.current);
  }, [maxValue, minValue, updateElementsAttrs]);

  const setValue = React.useCallback(
    (value: number) => {
      const newValue = clamp(value, minValue, maxValue);
      if (newValue !== currentValue.current) {
        currentValue.current = newValue;
        updateElementsAttrs();
      }
    },
    [minValue, maxValue, updateElementsAttrs]
  );

  const onDragStartLocal = useEventCallback((e: NativeTouchOrMouseEvent) => {
    onDragStart?.(e, currentValue.current);
  });
  const onDragEndLocal = useEventCallback((e: NativeTouchOrMouseEvent) => {
    onDragEnd?.(e, currentValue.current);
  });
  const {
    attachHandlers: attachMouseHandlers,
    detachHandlers: detachMouseHandlers,
  } = useMouseHandler({
    elementRef,
    growDirection,
    onValueChange: setValue,
    onDragStart: onDragStartLocal,
    onDragEnd: onDragEndLocal,
  });

  const {
    attachHandlers: attachKeyboardHandlers,
    detachHandlers: detachKeyboardHandlers,
  } = useKeyboardHandler({
    elementRef,
    growDirection,
    onValueChange: setValue,
  });

  const setHandleRef: React.RefCallback<HTMLElement> = React.useCallback(
    (node) => {
      if (node) {
        if (handleRef.current !== node) {
          detachMouseHandlers(node);
          detachKeyboardHandlers(node);
        }
        attachMouseHandlers(node);
        attachKeyboardHandlers(node);
        updateElementsAttrs();
      }
      handleRef.current = node;
    },
    [
      attachKeyboardHandlers,
      attachMouseHandlers,
      detachKeyboardHandlers,
      detachMouseHandlers,
      updateElementsAttrs,
    ]
  );

  const setWrapperRef: React.RefCallback<HTMLElement> = React.useCallback(
    (node) => {
      wrapperRef.current = node;
      if (elementRef.current) {
        updateElementsAttrs();
      }
    },
    [updateElementsAttrs]
  );

  const setElementRef: React.RefCallback<HTMLElement> = React.useCallback(
    (node) => {
      elementRef.current = node;
      if (elementRef.current) {
        if (currentValue.current === UNMEASURED) {
          currentValue.current = elementDimension(node, growDirection);
        }
        updateElementsAttrs();
      }
    },
    [updateElementsAttrs]
  );

  return {
    setValue,
    elementRef: setElementRef,
    handleRef: setHandleRef,
    wrapperRef: setWrapperRef,
    growDirection,
  };
};
