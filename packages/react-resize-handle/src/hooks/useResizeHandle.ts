import * as React from 'react';
import { useKeyboardHandler } from './useKeyboardHandler';
import { useMouseHandler } from './useMouseHandler';
import { clamp, elementDimension } from '../utils';
import {
  NativeTouchOrMouseEvent,
  useEventCallback,
} from '@fluentui/react-utilities';
import { GrowDirection, UNMEASURED } from '../types';

export type UseResizeHandleParams = {
  growDirection: GrowDirection;
  variableName: string;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
  onDragStart?: (e: NativeTouchOrMouseEvent, value: number) => void;
  onDragEnd?: (e: NativeTouchOrMouseEvent, value: number) => void;
  getValueText?: (value: number) => string;
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
    getValueText = (value) => `${value.toFixed(0)}px`,
  } = params;

  const handleRef = React.useRef<HTMLElement | null>(null);
  const wrapperRef = React.useRef<HTMLElement | null>(null);
  const elementRef = React.useRef<HTMLElement | null>(null);

  const currentValue = React.useRef(UNMEASURED);

  const updateDomElements = React.useCallback(() => {
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
      'aria-valuetext': getValueText(currentValue.current),
      'aria-orientation':
        growDirection === 'right' || growDirection === 'left'
          ? 'vertical'
          : 'horizontal',
    };

    Object.entries(handleAttributes).forEach(([key, value]) => {
      handleRef.current?.setAttribute(key, String(value));
    });

    onChange?.(currentValue.current);
  }, [getValueText, maxValue, minValue, onChange, variableName]);

  // In case the maxValue or minValue is changed, we need to make sure we are not exceeding the new limits
  React.useEffect(() => {
    const newValue = clamp(currentValue.current, minValue, maxValue);
    if (newValue !== currentValue.current) {
      currentValue.current = newValue;
      updateDomElements();
    }
  }, [maxValue, minValue, updateDomElements]);

  const setValue = React.useCallback(
    (value: number) => {
      const newValue = clamp(value, minValue, maxValue);
      if (newValue !== currentValue.current) {
        currentValue.current = newValue;
        updateDomElements();
      }
    },
    [minValue, maxValue, updateDomElements]
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
        // TODO If node different, remove handlers from previous node
        handleRef.current = node;
        attachMouseHandlers(node);
        attachKeyboardHandlers(node);
        updateDomElements();
      }
    },
    [
      attachKeyboardHandlers,
      attachMouseHandlers,
      detachKeyboardHandlers,
      detachMouseHandlers,
      updateDomElements,
    ]
  );

  const setWrapperRef: React.RefCallback<HTMLElement> = React.useCallback(
    (node) => {
      if (node) {
        wrapperRef.current = node;
        updateDomElements();
      }
    },
    [updateDomElements]
  );

  const setElementRef: React.RefCallback<HTMLElement> = React.useCallback(
    (node) => {
      if (node) {
        elementRef.current = node;
        if (currentValue.current === UNMEASURED) {
          currentValue.current = elementDimension(node, growDirection);
        }
        updateDomElements();
      }
    },
    [updateDomElements]
  );

  return {
    setValue,
    elementRef: setElementRef,
    handleRef: setHandleRef,
    wrapperRef: setWrapperRef,
  };
};
