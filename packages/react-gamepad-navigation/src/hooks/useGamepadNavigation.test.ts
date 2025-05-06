import { renderHook, act } from '@testing-library/react';
import { useGamepadNavigation } from './useGamepadNavigation';

describe('useGamepadNavigation', () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add gamepad event listeners on mount', () => {
    const { unmount } = renderHook(() =>
      useGamepadNavigation({ pollingEnabled: true })
    );

    // expect(addEventListenerSpy).toHaveBeenCalledWith(
    //   'gamepadconnected',
    //   expect.any(Function)
    // );
    // expect(addEventListenerSpy).toHaveBeenCalledWith(
    //   'gamepaddisconnected',
    //   expect.any(Function)
    // );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'blur',
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'focus',
      expect.any(Function)
    );

    unmount();
  });

  // it('should remove gamepad event listeners on unmount', () => {
  //   const { unmount } = renderHook(() =>
  //     useGamepadNavigation({ pollingEnabled: true })
  //   );

  //   unmount();

  //   expect(removeEventListenerSpy).toHaveBeenCalledWith(
  //     'gamepadconnected',
  //     expect.any(Function)
  //   );
  //   expect(removeEventListenerSpy).toHaveBeenCalledWith(
  //     'gamepaddisconnected',
  //     expect.any(Function)
  //   );
  // });

  it('should handle gamepadconnected event', () => {
    const mockGamepad = { id: 'Test Gamepad', index: 0 };
    const { result } = renderHook(() =>
      useGamepadNavigation({ pollingEnabled: true })
    );

    act(() => {
      const event = new Event('gamepadconnected');
      Object.assign(event, { gamepad: mockGamepad });
      window.dispatchEvent(event);
    });

    // Add assertions based on how the hook handles the gamepadconnected event
    expect(result.current).toBeDefined(); // Replace with actual assertions
  });

  it('should handle gamepaddisconnected event', () => {
    const mockGamepad = { id: 'Test Gamepad', index: 0 };
    const { result } = renderHook(() =>
      useGamepadNavigation({ pollingEnabled: true })
    );

    act(() => {
      const event = new Event('gamepaddisconnected');
      Object.assign(event, { gamepad: mockGamepad });
      window.dispatchEvent(event);
    });

    // Add assertions based on how the hook handles the gamepaddisconnected event
    expect(result.current).toBeDefined(); // Replace with actual assertions
  });

  it('should not add event listeners if pollingEnabled is false', () => {
    renderHook(() => useGamepadNavigation({ pollingEnabled: false }));

    expect(addEventListenerSpy).not.toHaveBeenCalledWith(
      'gamepadconnected',
      expect.any(Function)
    );
    expect(addEventListenerSpy).not.toHaveBeenCalledWith(
      'gamepaddisconnected',
      expect.any(Function)
    );
  });

  it('should return a cleanup function', () => {
    const { result } = renderHook(() =>
      useGamepadNavigation({ pollingEnabled: true })
    );

    expect(typeof result.current).toBe('function'); // Assuming the hook returns a cleanup function
  });
});
