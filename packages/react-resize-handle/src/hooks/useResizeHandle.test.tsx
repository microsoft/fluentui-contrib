import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';

import { useResizeHandle, UseResizeHandleParams } from './useResizeHandle';

const TestComponent = (
  props: Pick<UseResizeHandleParams, 'onDragStart' | 'onDragEnd' | 'onChange'>
) => {
  const { onChange, onDragStart, onDragEnd } = props;

  const { elementRef, handleRef, wrapperRef } = useResizeHandle({
    growDirection: 'end',
    variableName: '--width',

    onChange,
    onDragEnd,
    onDragStart,
  });

  return (
    <div ref={wrapperRef}>
      <div ref={elementRef} data-testid="element" />
      <div ref={handleRef} data-testid="handle" />
    </div>
  );
};

jest.useFakeTimers();

describe('useResizeHandle', () => {
  describe('events', () => {
    it('should call events in proper order', () => {
      const onChange = jest.fn();
      const onDragStart = jest.fn();
      const onDragEnd = jest.fn();

      const { getByTestId } = render(
        <TestComponent
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onChange={onChange}
        />
      );

      const elementEl = getByTestId('element');
      const handleEl = getByTestId('handle');

      jest
        .spyOn(elementEl, 'getBoundingClientRect')
        .mockReturnValue({ width: 100 } as DOMRect)
        .mockReturnValueOnce({ width: 100 } as DOMRect)
        .mockReturnValueOnce({ width: 50 } as DOMRect);

      fireEvent.mouseDown(handleEl);
      fireEvent.mouseMove(handleEl, { clientX: 100, clientY: 0 });

      // Drag start
      // ----------------

      // Drag started, onChange will be called in rAF
      expect(onDragStart).toHaveBeenCalledTimes(1);
      expect(onDragEnd).toHaveBeenCalledTimes(0);
      expect(onChange).toHaveBeenCalledTimes(0);

      jest.advanceTimersToNextTimer();
      expect(onChange).toHaveBeenCalledTimes(1);

      // Drag end
      // ----------------

      jest.clearAllMocks();

      jest
        .spyOn(elementEl, 'getBoundingClientRect')
        .mockReturnValueOnce({ width: 50 } as DOMRect)
        .mockReturnValueOnce({ width: 100 } as DOMRect);

      fireEvent.mouseMove(handleEl, { clientX: 200, clientY: 0 });
      fireEvent.mouseUp(document.body, { clientX: 200, clientY: 0 });

      // onChange will be called immediately and *before* onDragEnd as the drag ends
      expect(onDragStart).toHaveBeenCalledTimes(0);
      expect(onDragEnd).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.invocationCallOrder[0]).toBeLessThan(
        onDragEnd.mock.invocationCallOrder[0]
      );
    });
  });
});
