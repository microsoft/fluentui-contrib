import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';

export type UseKeyboardHandlerOptions = {
  onValueChange: (value: number) => void;
  elementRef: React.RefObject<HTMLElement>;
  growDirection: 'right' | 'left' | 'top' | 'bottom';
};

function add(a: number, b: number) {
  return a + b;
}

function subtract(a: number, b: number) {
  return a - b;
}

const operations: Record<
  string,
  Record<string, Function | undefined> | undefined
> = {
  right: {
    ArrowRight: add,
    ArrowLeft: subtract,
  },
  left: {
    ArrowRight: subtract,
    ArrowLeft: add,
  },
  top: {
    ArrowUp: add,
    ArrowDown: subtract,
  },
  bottom: {
    ArrowUp: subtract,
    ArrowDown: add,
  },
};

export const useKeyboardHandler = (options: UseKeyboardHandlerOptions) => {
  const { elementRef, onValueChange, growDirection } = options;

  const onKeyDown = useEventCallback((event: KeyboardEvent) => {
    const key =
      growDirection === 'right' || growDirection === 'left'
        ? 'width'
        : 'height';

    let newValue = elementRef.current?.getBoundingClientRect()[key] || 0;

    if (event.key) {
      newValue =
        operations[growDirection]?.[event.key]?.(newValue, 20) ?? newValue;
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
