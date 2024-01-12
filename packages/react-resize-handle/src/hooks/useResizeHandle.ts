import * as React from 'react';
import { useKeyboardHandler } from './useKeyboardHandler';
import { useMouseHandler } from './useMouseHandler';
import { clamp } from '../utils';
import {
  NativeTouchOrMouseEvent,
  useEventCallback,
} from '@fluentui/react-utilities';

export type UseResizeHandleParams = {
  growDirection: 'right' | 'left' | 'top' | 'bottom';
  variableName: string;
  initialValue: number;
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
    initialValue,
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

  const currentValue = React.useRef(initialValue);

  const updateDomElements = React.useCallback(() => {
    wrapperRef.current?.style.setProperty(
      variableName,
      `${currentValue.current}px`
    );
    const handleAttributes = {
      tabIndex: 0,
      role: 'separator',
      'aria-valuemin': minValue,
      'aria-valuemax': maxValue,
      'aria-valuetext': getValueText(currentValue.current),
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
        console.log('DDD');
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

  return {
    setValue,
    elementRef,
    handleRef: setHandleRef,
    wrapperRef: setWrapperRef,
  };
};
