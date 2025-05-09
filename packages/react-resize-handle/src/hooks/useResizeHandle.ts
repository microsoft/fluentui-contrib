import { useEventCallback } from '@fluentui/react-components';
import type { EventHandler } from '@fluentui/react-utilities';
import * as React from 'react';

import { clamp } from '../utils';
import {
  CSSUnit,
  EVENTS,
  GrowDirection,
  ResizeHandleUpdateEventData,
  UNMEASURED,
} from '../types';
import { useKeyboardHandler } from './useKeyboardHandler';
import { useMouseHandler } from './useMouseHandler';
import { useUnitHandle } from './useUnitHandle';

const clampWithMode = (
  value: number,
  min: number,
  max: number,
  relative?: boolean
) => {
  return relative || value === UNMEASURED ? value : clamp(value, min, max);
};

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
   * Defines where to apply a variable:
   * - 'wrapper' - apply to the wrapper element
   * - 'element' - apply to the element itself
   *
   * @default 'wrapper'
   */
  variableTarget?: 'wrapper' | 'element';
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
  getA11ValueText?: (value: number, unit: string) => string | undefined;
  /**
   * Only measure relative change in size, useful to use with CSS calc() function.
   * Example: clamp(60px, calc(20% + var(--nav-size)), 40%)
   * This will take 20% of the parent size by default, but will allow to resize between 60px and 40%.
   * Also, the size will still be relative in nature (20% + (X)px).
   */
  relative?: boolean;

  /**
   * The unit to use for the value. Can be 'px' or 'viewport' (will use 'vh' or 'vw' depending on 'growDirection').
   */
  unit?: CSSUnit;
};

const DEFAULT_GET_A11_VALUE_TEXT: UseResizeHandleParams['getA11ValueText'] = (
  value,
  unit
) => (value === UNMEASURED ? undefined : `${value}${unit}`);

export const useResizeHandle = (params: UseResizeHandleParams) => {
  const {
    growDirection,
    variableName,
    variableTarget = 'wrapper',
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

  const currentValue = React.useRef<number>(UNMEASURED);
  const unitHandle = useUnitHandle(growDirection, params.unit ?? 'px');

  const updateTargetElVariable = React.useCallback(
    (value: number) => {
      const targetEl =
        variableTarget === 'wrapper' ? wrapperRef.current : elementRef.current;

      targetEl?.style.setProperty(variableName, value + unitHandle.name);
    },
    [variableName, unitHandle]
  );

  const updateElementsAttrs = React.useCallback(
    (eventData: ResizeHandleUpdateEventData) => {
      const a11yValue = relative
        ? // If relative mode is enabled, we actually have to measure the element,
          // because the currentValue is just the px offset.
          getA11ValueText(
            unitHandle.elementDimension(elementRef.current),
            unitHandle.name
          )
        : getA11ValueText(eventData.value, unitHandle.name);

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
      if (eventData.value !== UNMEASURED) {
        updateTargetElVariable(eventData.value);
        onChange?.(eventData.event, eventData);
      }
    },
    [getA11ValueText, maxValue, minValue, onChange, updateTargetElVariable]
  );

  // In case the maxValue or minValue is changed, we need to make sure we are not exceeding the new limits
  React.useEffect(() => {
    currentValue.current = clampWithMode(
      currentValue.current,
      minValue,
      maxValue,
      relative
    );
  }, [maxValue, minValue, relative]);

  const onValueChange: EventHandler<ResizeHandleUpdateEventData> =
    React.useCallback(
      (_, eventData: ResizeHandleUpdateEventData) => {
        const { value } = eventData;
        const newValue = clampWithMode(value, minValue, maxValue, relative);

        if (newValue !== currentValue.current) {
          // FIXME
          // "relative" mode implementation is buggy, so the proper implementation is done only for the "absolute" mode.
          if (relative) {
            // Save the current value, we might need to revert to it if the new value doesn't have any impact on size
            const oldValue = currentValue.current;

            // Measure the size before setting the new value
            const previousSize = unitHandle.elementDimension(
              elementRef.current
            );

            // Set the new value and update the elements, this should result in element resize
            currentValue.current = newValue;
            updateElementsAttrs({ ...eventData, value: currentValue.current });

            // Measure the size after setting the new value
            const newSizeIn = unitHandle.elementDimension(elementRef.current);

            // If the size hasn't changed, we need to revert to the old value to keep the state and DOM in sync.
            // If we don't do this, then the handle might be stuck in a place where small changes
            // in value don't have any effect.
            if (newSizeIn === previousSize) {
              currentValue.current = oldValue;
              updateElementsAttrs({
                ...eventData,
                value: currentValue.current,
              });
            }

            return;
          }

          const previousSize = unitHandle.elementDimension(elementRef.current);

          updateTargetElVariable(newValue);

          const newSize = unitHandle.elementDimension(elementRef.current);

          if (previousSize === newSize) {
            // If the size hasn't changed, we need to revert to the old value to keep the state and DOM in sync
            updateTargetElVariable(previousSize);

            return;
          }

          currentValue.current = unitHandle.roundValue(newSize);
          updateElementsAttrs({ ...eventData, value: currentValue.current });
        }
      },
      [minValue, maxValue, relative, unitHandle, updateElementsAttrs]
    );

  const setValue = React.useCallback(
    (value: number) => {
      const event = new CustomEvent(EVENTS.setValue);

      onValueChange(event, {
        event,
        value,
        type: EVENTS.setValue,
        unit: unitHandle.name,
      });
    },
    [onValueChange, unitHandle]
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
      : unitHandle.elementDimension(elementRef.current);
  }, [relative, unitHandle]);

  const {
    attachHandlers: attachMouseHandlers,
    detachHandlers: detachMouseHandlers,
  } = useMouseHandler({
    onDragStart: onDragStartLocal,
    onDragEnd: onDragEndLocal,
    onValueChange,

    getCurrentValue,
    growDirection,
    unitHandle,
  });

  const {
    attachHandlers: attachKeyboardHandlers,
    detachHandlers: detachKeyboardHandlers,
  } = useKeyboardHandler({
    onValueChange,

    growDirection,
    getCurrentValue,
    unitHandle,
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
          value: UNMEASURED,
          unit: unitHandle.name,
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
      unitHandle,
    ]
  );

  const setWrapperRef: React.RefCallback<HTMLElement> = React.useCallback(
    (node) => {
      wrapperRef.current = node;

      if (elementRef.current) {
        updateElementsAttrs({
          type: EVENTS.wrapperRef,
          event: new CustomEvent(EVENTS.wrapperRef),
          value: UNMEASURED,
          unit: unitHandle.name,
        });
      }
    },
    [updateElementsAttrs, unitHandle]
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
          value: UNMEASURED,
          unit: unitHandle.name,
        });
      }
    },
    [relative, updateElementsAttrs, unitHandle]
  );

  return {
    setValue,
    elementRef: setElementRef,
    handleRef: setHandleRef,
    wrapperRef: setWrapperRef,
    growDirection,
  };
};
