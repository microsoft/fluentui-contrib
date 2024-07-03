import { useEventCallback, useFluent } from '@fluentui/react-components';
import * as React from 'react';
import { GrowDirection, SupportedKeys } from '../types';
import { elementDimension } from '../utils/index';

export type UseKeyboardHandlerOptions = {
  onValueChange: (value: number) => void;
  growDirection: GrowDirection;
  currentValue: React.RefObject<number>;
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
  const { onValueChange, growDirection, currentValue } = options;
  const { dir } = useFluent();

  const onKeyDown = useEventCallback((event: KeyboardEvent) => {
    if (!isSupportedKey(growDirection, event.key)) {
      return;
    }

    let newValue = currentValue.current || 0;

    const multiplier = multipliers[growDirection][event.key] ?? 1;
    const directionMultiplier =
      dir === 'rtl' && ['start', 'end'].includes(growDirection) ? -1 : 1;

    newValue += multiplier * DEFAULT_STEP * directionMultiplier;

    onValueChange(Math.round(newValue));
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
