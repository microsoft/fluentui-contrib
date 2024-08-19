import { renderHook } from '@testing-library/react';
import { useHotkeys } from './useHotkeys';
import userEvent from '@testing-library/user-event';

describe('useHotkeys', () => {
  it('should trigger callbacks', () => {
    const handlerFirst = jest.fn();
    const handlerSecond = jest.fn();

    renderHook(() =>
      useHotkeys([
        ['alt+control', handlerFirst],
        ['alt+x', handlerSecond],
      ])
    );

    userEvent.keyboard('{Alt}{Control}');
    expect(handlerFirst).toHaveBeenCalledTimes(1);
    expect(handlerSecond).not.toHaveBeenCalled();

    userEvent.keyboard('{Alt}{x}');
    expect(handlerSecond).toHaveBeenCalledTimes(1);
  });

  it('should not trigger callback', () => {
    const cb = jest.fn();
    renderHook(() => useHotkeys([['alt+X', cb]]));
    userEvent.keyboard('{Alt}{C}');
    expect(cb).toHaveBeenCalledTimes(0);
  });
});
