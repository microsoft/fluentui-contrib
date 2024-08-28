import { useEventCallback, useFluent } from '@fluentui/react-components';
import * as React from 'react';
import {
  EVENTS,
  GrowDirection,
  ResizeHandleUpdateEventData,
  SupportedKeys,
} from '../types';
import type { EventHandler } from '@fluentui/react-utilities';

export type UseKeyboardHandlerOptions = {
  onValueChange: EventHandler<ResizeHandleUpdateEventData>;
  growDirection: GrowDirection;
  getCurrentValue: () => number;
};

const DEFAULT_STEP = 20;

const multipliers: Record<
  GrowDirection,
  Partial<Record<SupportedKeys, number>>
> = {
  end: {
    ArrowRight: 1,
    ArrowLeft: -1,
  },
  start: {
    ArrowRight: -1,
    ArrowLeft: 1,
  },
  up: {
    ArrowUp: 1,
    ArrowDown: -1,
  },
  down: {
    ArrowUp: -1,
    ArrowDown: 1,
  },
};

function isSupportedKey(
  growDirection: GrowDirection,
  key: string
): key is SupportedKeys {
  return (
    Object.prototype.hasOwnProperty.call(multipliers, growDirection) &&
    Object.prototype.hasOwnProperty.call(multipliers[growDirection], key)
  );
}

export const useKeyboardHandler = (options: UseKeyboardHandlerOptions) => {
  const { onValueChange, growDirection, getCurrentValue } = options;
  const { dir } = useFluent();

  const onKeyDown = useEventCallback((event: KeyboardEvent) => {
    if (!isSupportedKey(growDirection, event.key)) {
      return;
    }

    let newValue = getCurrentValue();

    const multiplier = multipliers[growDirection][event.key] ?? 1;
    const directionMultiplier =
      dir === 'rtl' && ['start', 'end'].includes(growDirection) ? -1 : 1;

    newValue += multiplier * DEFAULT_STEP * directionMultiplier;

    onValueChange(event, {
      event: event,
      value: Math.round(newValue),
      type: EVENTS.keyboard,
    });
  });

  const attachHandlers = React.useCallback(
    (node: HTMLElement) => {
      node.addEventListener('keydown', onKeyDown);
    },
    [onKeyDown]
  );

  const detachHandlers = React.useCallback(
    (node: HTMLElement) => {
      node.removeEventListener('keydown', onKeyDown);
    },
    [onKeyDown]
  );

  return {
    attachHandlers,
    detachHandlers,
  };
};
