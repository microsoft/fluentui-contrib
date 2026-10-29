import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';

import { useResizeHandle, UseResizeHandleParams } from './useResizeHandle';

const TestComponent = (
  props: Pick<
    UseResizeHandleParams,
    'onDragStart' | 'onDragEnd' | 'onChange' | 'relative'
  >
) => {
  const { onChange, onDragStart, onDragEnd, relative } = props;

  const { elementRef, handleRef, wrapperRef } = useResizeHandle({
    growDirection: 'end',
    variableName: '--width',
    relative,

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
  describe('refs', () => {
    const RefsTestComponent = (
      props: Pick<UseResizeHandleParams, 'relative'> & { withWrapper?: boolean }
    ) => {
      const { relative, withWrapper = true } = props;
      const { elementRef, handleRef, wrapperRef } = useResizeHandle({
        growDirection: 'end',
        variableName: '--width',
        relative,
      });

      return (
        <>
          {withWrapper && <div ref={wrapperRef} data-testid="wrapper" />}
          <div ref={elementRef} data-testid="element" />
          <div ref={handleRef} data-testid="handle" />
        </>
      );
    };

    it.each([
      ['relative', true],
      ['absolute', false],
    ])(
      'does not measure the element or update the handle when unmounting (%s mode)',
      (_, relative) => {
        const { getByTestId, unmount } = render(
          <TestComponent relative={relative} />
        );

        const elementEl = getByTestId('element');
        const handleEl = getByTestId('handle');

        expect(handleEl.getAttribute('role')).toBe('slider');

        const getBoundingClientRectSpy = jest.spyOn(
          elementEl,
          'getBoundingClientRect'
        );
        const setAttributeSpy = jest.spyOn(handleEl, 'setAttribute');

        unmount();

        expect(getBoundingClientRectSpy).not.toHaveBeenCalled();
        expect(setAttributeSpy).not.toHaveBeenCalled();
      }
    );

    it('updates handle attributes when the wrapper is attached, but not when it is detached', () => {
      const { getByTestId, rerender } = render(
        <RefsTestComponent relative withWrapper={false} />
      );

      const elementEl = getByTestId('element');
      const handleEl = getByTestId('handle');

      jest
        .spyOn(elementEl, 'getBoundingClientRect')
        .mockReturnValue({ width: 120 } as DOMRect);

      rerender(<RefsTestComponent relative withWrapper />);
      expect(handleEl.getAttribute('aria-valuetext')).toBe('120px');

      handleEl.removeAttribute('aria-valuetext');
      rerender(<RefsTestComponent relative withWrapper={false} />);

      expect(elementEl.getBoundingClientRect).toHaveBeenCalledTimes(1);
      expect(handleEl.hasAttribute('aria-valuetext')).toBe(false);
    });
  });

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

      jest.runAllTimers();
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
