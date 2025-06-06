import { useEventCallback, useFluent } from '@fluentui/react-components';
import type { EventHandler } from '@fluentui/react-utilities';
import * as React from 'react';

import {
  EVENTS,
  GrowDirection,
  ResizeHandleUpdateEventData,
  SupportedKeys,
} from '../types';
import type { UnitHandle } from './useUnitHandle';

export type UseKeyboardHandlerOptions = {
  onValueChange: EventHandler<ResizeHandleUpdateEventData>;
  growDirection: GrowDirection;

  getCurrentValue: () => number;
  unitHandle: UnitHandle;
};

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
  const { onValueChange, growDirection, getCurrentValue, unitHandle } = options;
  const { dir } = useFluent();

  const onKeyDown = useEventCallback((event: KeyboardEvent) => {
    if (!isSupportedKey(growDirection, event.key)) {
      return;
    }

    const currentValue = getCurrentValue();

    const multiplier = multipliers[growDirection][event.key] ?? 1;
    const directionMultiplier =
      dir === 'rtl' && ['start', 'end'].includes(growDirection) ? -1 : 1;
    const offset =
      multiplier * unitHandle.getOffsetStep() * directionMultiplier;

    onValueChange(event, {
      event,
      value: unitHandle.roundValue(currentValue + offset),
      type: EVENTS.keyboard,
      unit: unitHandle.name,
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
