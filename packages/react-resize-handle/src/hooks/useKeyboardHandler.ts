import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { GrowDirection, SupportedKeys } from '../types';
import { useFluent } from '@fluentui/react-components';

export type UseKeyboardHandlerOptions = {
  onValueChange: (value: number) => void;
  elementRef: React.RefObject<HTMLElement>;
  growDirection: GrowDirection;
};

const DEFAULT_STEP = 20;

const multipliers: Record<
  GrowDirection,
  Partial<Record<SupportedKeys, number>>
> = {
  right: {
    ArrowRight: 1,
    ArrowLeft: -1,
  },
  left: {
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

export const useKeyboardHandler = (options: UseKeyboardHandlerOptions) => {
  const { elementRef, onValueChange, growDirection } = options;
  const { dir } = useFluent();

  const onKeyDown = useEventCallback((event: KeyboardEvent) => {
    const key =
      growDirection === 'right' || growDirection === 'left'
        ? 'width'
        : 'height';

    let newValue = elementRef.current?.getBoundingClientRect()[key] || 0;

    if (event.key && multipliers[growDirection]?.[event.key as SupportedKeys]) {
      newValue += ((multipliers[growDirection]?.[event.key as SupportedKeys] ||
        1) *
        DEFAULT_STEP *
        (dir === 'rtl' && key === 'width' ? -1 : 1)) as number;
    }

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
