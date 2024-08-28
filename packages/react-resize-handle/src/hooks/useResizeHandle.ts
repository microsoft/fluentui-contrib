import * as React from 'react';
import { useKeyboardHandler } from './useKeyboardHandler';
import { useMouseHandler } from './useMouseHandler';
import { clamp, elementDimension } from '../utils';
import { useEventCallback } from '@fluentui/react-components';
import {
  EVENTS,
  GrowDirection,
  ResizeHandleUpdateEventData,
  UNMEASURED,
} from '../types';

const clampWithMode = (
  value: number,
  min: number,
  max: number,
  relative?: boolean
) => {
  return relative || value === UNMEASURED ? value : clamp(value, min, max);
};

import type { EventHandler } from '@fluentui/react-utilities';

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
   * The minimum value in pixels that the element can be resized to. Only applicable if relative is false.
   */
  minValue?: number;
  /**
   * The maximum value in pixels that the element can be resized to. Only applicable if relative is false.
   */
  maxValue?: number;
  /**
   * A callback that will be called when the element is resized.
   *
   * @remarks The passed function should be memoization for better performance.
   */
  onChange?: EventHandler<ResizeHandleUpdateEventData>;
  /**
   * A callback that will be called when the resize operation starts.
   */
  onDragStart?: EventHandler<ResizeHandleUpdateEventData>;
  /**
   * A callback that will be called when the resize operation ends.
   */
  onDragEnd?: EventHandler<ResizeHandleUpdateEventData>;
  /**
   * A function that will be called to get the value that will be set as the aria-valuetext attribute on the resize handle.
   * Use this for localization.
   */
  getA11ValueText?: (value: number) => string | undefined;
  /**
   * Only measure relative change in size, useful to use with CSS calc() function.
   * Example: clamp(60px, calc(20% + var(--nav-size)), 40%)
   * This will take 20% of the parent size by default, but will allow to resize between 60px and 40%.
   * Also, the size will still be relative in nature (20% + (X)px).
   */
  relative?: boolean;
};

const DEFAULT_GET_A11_VALUE_TEXT: UseResizeHandleParams['getA11ValueText'] = (
  value
) => (value === UNMEASURED ? undefined : `${value.toFixed(0)}px`);

export const useResizeHandle = (params: UseResizeHandleParams) => {
  const {
    growDirection,
    variableName,
    minValue = 0,
    maxValue = Number.MAX_SAFE_INTEGER,
    onChange,
    onDragStart,
    onDragEnd,
    getA11ValueText = DEFAULT_GET_A11_VALUE_TEXT,
    relative,
  } = params;

  const handleRef = React.useRef<HTMLElement | null>(null);
  const wrapperRef = React.useRef<HTMLElement | null>(null);
  const elementRef = React.useRef<HTMLElement | null>(null);

  const currentValue = React.useRef(UNMEASURED);

  const updateElementsAttrs = React.useCallback(
    (eventData: ResizeHandleUpdateEventData) => {
      const a11yValue = relative
        ? // If relative mode is enabled, we actually have to measure the element,
          // because the currentValue is just the px offset.
          getA11ValueText(elementDimension(elementRef.current, growDirection))
        : getA11ValueText(currentValue.current);

      const handleAttributes = {
        role: 'slider',
        'aria-valuemin': minValue,
        ...(maxValue < Number.MAX_SAFE_INTEGER && {
          'aria-valuemax': maxValue,
        }),
        ...(a11yValue && { 'aria-valuetext': a11yValue }),
        'aria-orientation':
          growDirection === 'end' || growDirection === 'start'
            ? 'horizontal'
            : 'vertical',
      };

      Object.entries(handleAttributes).forEach(([key, value]) => {
        handleRef.current?.setAttribute(key, String(value));
      });

      // Make sure to only apply the value if it's not the initial value!
      if (currentValue.current !== UNMEASURED) {
        wrapperRef.current?.style.setProperty(
          variableName,
          `${currentValue.current}px`
        );

        onChange?.(eventData.event, eventData);
      }
    },
    [getA11ValueText, maxValue, minValue, onChange, variableName]
  );

  // In case the maxValue or minValue is changed, we need to make sure we are not exceeding the new limits
  React.useEffect(() => {
    currentValue.current = clampWithMode(
      currentValue.current,
      minValue,
      maxValue,
      relative
    );
  }, [maxValue, minValue]);

  const onValueChange: EventHandler<ResizeHandleUpdateEventData> =
    React.useCallback(
      (_, eventData: ResizeHandleUpdateEventData) => {
        const { value } = eventData;
        const newValue = clampWithMode(value, minValue, maxValue, relative);

        if (newValue !== currentValue.current) {
          // Save the current value, we might need to revert to it if the new value doesn't have any impact on size
          const oldValue = currentValue.current;

          // Measure the size before setting the new value
          const previousSizeInPx = elementDimension(
            elementRef.current,
            growDirection
          );

          // Set the new value and update the elements, this should result in element resize
          currentValue.current = newValue;
          updateElementsAttrs(eventData);

          // Measure the size after setting the new value
          const newSizeInPx = elementDimension(
            elementRef.current,
            growDirection
          );

          // If the size hasn't changed, we need to revert to the old value to keep the state and DOM in sync.
          // If we don't do this, then the handle might be stuck in a place where small changes
          // in value don't have any effect.
          if (newSizeInPx === previousSizeInPx) {
            currentValue.current = oldValue;
            updateElementsAttrs(eventData);
          }
        }
      },
      [minValue, maxValue, updateElementsAttrs]
    );

  const setValue = React.useCallback(
    (value: number) => {
      const event = new CustomEvent(EVENTS.setValue);
      onValueChange(event, { event, value, type: EVENTS.setValue });
    },
    [onValueChange]
  );

  const onDragStartLocal: EventHandler<
    Omit<ResizeHandleUpdateEventData, 'value'>
  > = useEventCallback((e, data) => {
    onDragStart?.(e, {
      ...data,
      value: currentValue.current,
    } as ResizeHandleUpdateEventData);
  });

  const onDragEndLocal: EventHandler<
    Omit<ResizeHandleUpdateEventData, 'value'>
  > = useEventCallback((e, data) => {
    onDragEnd?.(e, {
      ...data,
      value: currentValue.current,
    } as ResizeHandleUpdateEventData);
  });

  const getCurrentValue = React.useCallback(() => {
    return relative
      ? currentValue.current
      : elementDimension(elementRef.current, growDirection);
  }, []);

  const {
    attachHandlers: attachMouseHandlers,
    detachHandlers: detachMouseHandlers,
  } = useMouseHandler({
    growDirection,
    onValueChange,
    onDragStart: onDragStartLocal,
    onDragEnd: onDragEndLocal,
    getCurrentValue,
  });

  const {
    attachHandlers: attachKeyboardHandlers,
    detachHandlers: detachKeyboardHandlers,
  } = useKeyboardHandler({
    growDirection,
    onValueChange,
    getCurrentValue,
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
        updateElementsAttrs({
          type: EVENTS.handleRef,
          event: new CustomEvent(EVENTS.handleRef),
          value: currentValue.current,
        });
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
        updateElementsAttrs({
          type: EVENTS.wrapperRef,
          event: new CustomEvent(EVENTS.wrapperRef),
          value: currentValue.current,
        });
      }
    },
    [updateElementsAttrs]
  );

  const setElementRef: React.RefCallback<HTMLElement> = React.useCallback(
    (node) => {
      elementRef.current = node;
      if (elementRef.current) {
        if (currentValue.current === UNMEASURED && relative) {
          currentValue.current = 0;
        }
        updateElementsAttrs({
          type: EVENTS.elementRef,
          event: new CustomEvent(EVENTS.elementRef),
          value: currentValue.current,
        });
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
