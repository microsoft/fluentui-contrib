import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { GrowDirection, SupportedKeys } from '../types';
import { useFluent } from '@fluentui/react-components';
import { Operation, add, subtract } from '../utils';

export type UseKeyboardHandlerOptions = {
  onValueChange: (value: number) => void;
  elementRef: React.RefObject<HTMLElement>;
  growDirection: GrowDirection;
};

const DEFAULT_STEP = 20;

const operations: Record<
  GrowDirection,
  Partial<Record<SupportedKeys, Operation>>
> = {
  right: {
    ArrowRight: add,
    ArrowLeft: subtract,
  },
  left: {
    ArrowRight: subtract,
    ArrowLeft: add,
  },
  up: {
    ArrowUp: add,
    ArrowDown: subtract,
  },
  down: {
    ArrowUp: subtract,
    ArrowDown: add,
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

    if (event.key) {
      newValue =
        operations[growDirection]?.[event.key as SupportedKeys]?.(
          newValue,
          DEFAULT_STEP * (dir === 'rtl' && key === 'width' ? -1 : 1)
        ) ?? newValue;
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
