import { renderHook, act } from '@testing-library/react';
import { useHotkeys } from './useHotkeys';
import userEvent from '@testing-library/user-event';

describe('useHotkeys', () => {
  it('should trigger callbacks', async () => {
    const handlerFirst = jest.fn();
    const handlerSecond = jest.fn();

    renderHook(() =>
      useHotkeys([
        ['alt+control', handlerFirst],
        ['alt+x', handlerSecond],
      ])
    );

    await userEvent.keyboard('{Alt>}{Control}');
    expect(handlerFirst).toHaveBeenCalledTimes(1);
    expect(handlerSecond).not.toHaveBeenCalled();

    await userEvent.keyboard('{Alt>}{x}');
    expect(handlerSecond).toHaveBeenCalledTimes(1);
  });

  it('should not trigger callback', async () => {
    const cb = jest.fn();
    renderHook(() => useHotkeys([['alt+X', cb]]));
    await userEvent.keyboard('{Alt}{C}');
    expect(cb).toHaveBeenCalledTimes(0);
  });

  it('should run handler only if the sequence is hold for certain time', async () => {
    jest.useFakeTimers();

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const cb = jest.fn();

    renderHook(() => useHotkeys([['alt+control', cb, { delay: 1000 }]]));

    await user.keyboard('{Alt>}{Control>}');

    expect(cb).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(cb).toHaveBeenCalledTimes(1);
  });
});
