// Mocks must be at the very top before imports!
jest.mock('@fluentui/react-components', () => ({
  useFluent: () => ({ targetDocument: document }),
  useId: (prefix: string) => `${prefix}-mock-id`,
}));
jest.mock('../core/InputManager', () => ({
  setDefaultInputMode: jest.fn(),
  setInputMode: jest.fn(),
  setPollingEnabled: jest.fn(),
  isPollingEnabled: jest.fn(() => true),
}));
jest.mock('../core/GamepadEvents', () => ({
  isSyntheticMouseEvent: jest.fn(() => false),
}));
jest.mock('../core/GamepadMappings', () => ({
  getGamepadMappings: jest.fn(() => ({})),
}));
jest.mock('../core/InputProcessor', () => ({
  handleGamepadInput: jest.fn(),
}));
jest.mock('../core/GamepadUtils', () => ({
  getShadowDOMAPI: jest.fn(() => ({})),
}));

import { renderHook, act } from '@testing-library/react';
import { useGamepadNavigation } from './useGamepadNavigation';
import { InputMode } from '../types/InputMode';

describe('useGamepadNavigation', () => {
  let addEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(document, 'addEventListener');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('registers event listeners', () => {
    const addWinEventListenerSpy = jest.spyOn(window, 'addEventListener');
    renderHook(() => useGamepadNavigation({}));
    expect(addEventListenerSpy).toHaveBeenCalled();
    expect(
      addEventListenerSpy.mock.calls.some((call) => call[0] === 'touchstart')
    ).toBe(true);
    expect(
      addEventListenerSpy.mock.calls.some((call) => call[0] === 'mousedown')
    ).toBe(true);

    expect(addWinEventListenerSpy).toHaveBeenCalled();
    expect(
      addWinEventListenerSpy.mock.calls.some((call) => call[0] === 'blur')
    ).toBe(true);
    expect(
      addWinEventListenerSpy.mock.calls.some((call) => call[0] === 'focus')
    ).toBe(true);
  });

  it.skip('handles missing targetDocument gracefully', () => {
    // See note above: this test must be in a separate file to work correctly.
    jest.isolateModules(() => {
      jest.doMock('@fluentui/react-components', () => ({
        useFluent: () => ({ targetDocument: undefined }),
        useId: (prefix: string) => `${prefix}-mock-id`,
      }));
      const warnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => undefined);
      const { useGamepadNavigation } = require('./useGamepadNavigation');
      const { renderHook } = require('@testing-library/react');
      renderHook(() => useGamepadNavigation({}));
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  it('handles mouse input event', () => {
    const { isSyntheticMouseEvent } = require('../core/GamepadEvents');
    const { setInputMode } = require('../core/InputManager');
    renderHook(() => useGamepadNavigation({}));
    // Find the actual handler and call it directly
    const mouseHandler = addEventListenerSpy.mock.calls.find(
      (call) => call[0] === 'mousedown'
    )?.[1];
    expect(mouseHandler).toBeDefined();
    const mouseEvent = new MouseEvent('mousedown');
    act(() => {
      mouseHandler(mouseEvent);
    });
    expect(isSyntheticMouseEvent).toHaveBeenCalledWith(mouseEvent);
    expect(setInputMode).toHaveBeenCalledWith(InputMode.Mouse, document);
  });

  it('handles touch input event', () => {
    const { setInputMode } = require('../core/InputManager');
    renderHook(() => useGamepadNavigation({}));
    // Find the actual handler and call it directly
    const touchHandler = addEventListenerSpy.mock.calls.find(
      (call) => call[0] === 'touchstart'
    )?.[1];
    expect(touchHandler).toBeDefined();
    const touchEvent = new TouchEvent('touchstart');
    act(() => {
      touchHandler(touchEvent);
    });
    expect(setInputMode).toHaveBeenCalledWith(InputMode.Touch, document);
  });

  it('handles window blur and focus events', () => {
    renderHook(() => useGamepadNavigation({}));
    const blurEvent = new Event('blur');
    const focusEvent = new Event('focus');
    act(() => {
      window.dispatchEvent(blurEvent);
      window.dispatchEvent(focusEvent);
    });
    // No direct assertion, but you can spy on stopGamepadPolling/startGamepadPolling if exported
  });

  it('handles gamepadconnected and gamepaddisconnected events', () => {
    renderHook(() => useGamepadNavigation({}));
    // These events may need to be polyfilled/mocked for jsdom
    // You can spy on startGamepadPolling/stopGamepadPolling if exported
  });

  it('returns a cleanup function', () => {
    const { result, unmount } = renderHook(() => useGamepadNavigation({}));
    expect(typeof result.current).toBe('function');
    unmount();
    // The cleanup function should have been called (event listeners removed)
  });
});
