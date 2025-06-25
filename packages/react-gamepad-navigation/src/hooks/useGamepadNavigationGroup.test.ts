jest.mock('./useGamepadNavigation', () => {
  const mockCleanup = jest.fn();
  const mockUseGamepadNavigation = jest.fn(() => mockCleanup);
  return {
    useGamepadNavigation: mockUseGamepadNavigation,
    __mockUseGamepadNavigation: mockUseGamepadNavigation,
    __mockCleanup: mockCleanup,
  };
});
jest.mock('@fluentui/react-components', () => ({
  useFluent: () => ({ targetDocument: document }),
  useId: (prefix: string) => `${prefix}-mock-id`,
}));
const mockFindFirstFocusable = jest.fn();
jest.mock('@fluentui/react-tabster', () => ({
  useFocusableGroup: jest.fn(() => 'focusAttr'),
  useArrowNavigationGroup: jest.fn(() => 'arrowAttr'),
  useMergedTabsterAttributes_unstable: jest.fn((a, b) => ({ merged: [a, b] })),
  useFocusFinders: jest.fn(() => ({
    findFirstFocusable: mockFindFirstFocusable,
  })),
}));

import { renderHook } from '@testing-library/react';
import { useGamepadNavigationGroup } from './useGamepadNavigationGroup';
import { InputMode } from '../types/InputMode';
import type { UseGamepadNavigationGroupOptions } from './useGamepadNavigationGroup';

describe('useGamepadNavigationGroup', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should call useGamepadNavigation with correct options', () => {
    const defaultInputMode = InputMode.Gamepad;
    const pollingEnabled = true;

    renderHook(() =>
      useGamepadNavigationGroup({ defaultInputMode, pollingEnabled })
    );

    const { __mockUseGamepadNavigation } = require('./useGamepadNavigation');
    expect(__mockUseGamepadNavigation).toHaveBeenCalledWith({
      defaultInputMode,
      pollingEnabled,
    });
  });

  it('returns the merged DOM attributes', () => {
    const { result } = renderHook(() => useGamepadNavigationGroup({}));
    // merged attributes come from our mock: { merged: ['focusAttr','arrowAttr'] }
    expect(result.current.gamepadNavDOMAttributes).toEqual({
      merged: ['focusAttr', 'arrowAttr'],
    });
  });

  it('calls focusFirstElement effect when option is true', () => {
    // Prepare a mock focusable element as document.activeElement
    const mockElement = { focus: jest.fn() } as unknown as HTMLElement;
    const originalActive = document.activeElement;
    Object.defineProperty(document, 'activeElement', {
      value: mockElement,
      configurable: true,
    });
    mockFindFirstFocusable.mockReturnValue(mockElement);
    renderHook(() => useGamepadNavigationGroup({ focusFirstElement: true }));
    expect(mockFindFirstFocusable).toHaveBeenCalledWith(mockElement);
    expect(mockElement.focus).toHaveBeenCalled();
    // restore original
    Object.defineProperty(document, 'activeElement', { value: originalActive });
  });

  it('passes custom arrow and focusable group options', () => {
    const opts = {
      axis: 'horizontal' as const,
      circular: true,
      memorizeCurrent: false,
      tabbable: false,
      ignoreDefaultKeydown: { ArrowUp: true },
      unstable_hasDefault: true,
    };
    renderHook(() => useGamepadNavigationGroup(opts));
    const tabster = require('@fluentui/react-tabster');
    expect(tabster.useFocusableGroup).toHaveBeenCalledWith({
      tabBehavior: 'limited-trap-focus',
      ignoreDefaultKeydown: opts.ignoreDefaultKeydown,
    });
    expect(tabster.useArrowNavigationGroup).toHaveBeenCalledWith({
      axis: opts.axis,
      circular: opts.circular,
      memorizeCurrent: opts.memorizeCurrent,
      tabbable: opts.tabbable,
      ignoreDefaultKeydown: opts.ignoreDefaultKeydown,
      unstable_hasDefault: opts.unstable_hasDefault,
    });
  });

  it('returns cleanup function from useGamepadNavigation', () => {
    const { __mockCleanup } = require('./useGamepadNavigation');
    const { result } = renderHook(() => useGamepadNavigationGroup({}));
    expect(result.current.removeGamepadNavEventListeners).toBe(__mockCleanup);
  });

  it('calls useGamepadNavigation with undefined options by default', () => {
    renderHook(() => useGamepadNavigationGroup({}));
    const { __mockUseGamepadNavigation } = require('./useGamepadNavigation');
    expect(__mockUseGamepadNavigation).toHaveBeenCalledWith({
      defaultInputMode: undefined,
      pollingEnabled: undefined,
    });
  });

  it('passes custom tabBehavior to focusable group', () => {
    const tabster = require('@fluentui/react-tabster');
    renderHook(() =>
      useGamepadNavigationGroup({ tabBehavior: 'limited-trap-focus' })
    );
    expect(tabster.useFocusableGroup).toHaveBeenCalledWith({
      tabBehavior: 'limited-trap-focus',
      ignoreDefaultKeydown: {},
    });
  });

  it('uses useFocusFinders hook', () => {
    const tabster = require('@fluentui/react-tabster');
    renderHook(() => useGamepadNavigationGroup({}));
    expect(tabster.useFocusFinders).toHaveBeenCalled();
  });

  it('cleanup function calls internal cleanup', () => {
    const { __mockCleanup } = require('./useGamepadNavigation');
    const { result } = renderHook(() => useGamepadNavigationGroup({}));
    // The returned cleanup should be the internal mock cleanup
    const cleanup = result.current.removeGamepadNavEventListeners;
    cleanup();
    expect(__mockCleanup).toHaveBeenCalled();
  });

  it('rerenders with new options and calls useGamepadNavigation again', () => {
    const { __mockUseGamepadNavigation } = require('./useGamepadNavigation');
    const { rerender } = renderHook(
      ({ options }: { options: UseGamepadNavigationGroupOptions }) =>
        useGamepadNavigationGroup(options),
      {
        initialProps: {
          options: {
            defaultInputMode: undefined,
            pollingEnabled: undefined,
          } as UseGamepadNavigationGroupOptions,
        },
      }
    );
    expect(__mockUseGamepadNavigation).toHaveBeenCalledTimes(1);
    // Rerender with new options
    rerender({
      options: {
        defaultInputMode: InputMode.Touch,
        pollingEnabled: false,
      } as UseGamepadNavigationGroupOptions,
    });
    expect(__mockUseGamepadNavigation).toHaveBeenCalledTimes(2);
    expect(__mockUseGamepadNavigation).toHaveBeenLastCalledWith({
      defaultInputMode: InputMode.Touch,
      pollingEnabled: false,
    });
  });

  it('does not call focusFirstElement when option is false', () => {
    // default focusFirstElement is false
    mockFindFirstFocusable.mockClear();
    renderHook(() => useGamepadNavigationGroup({}));
    expect(mockFindFirstFocusable).not.toHaveBeenCalled();
  });

  it('calls Tabster attribute hooks with default parameters', () => {
    renderHook(() => useGamepadNavigationGroup({}));
    const tabster = require('@fluentui/react-tabster');
    expect(tabster.useFocusableGroup).toHaveBeenCalledWith({
      tabBehavior: 'limited-trap-focus',
      ignoreDefaultKeydown: {},
    });
    expect(tabster.useArrowNavigationGroup).toHaveBeenCalledWith({
      axis: 'grid',
      circular: false,
      memorizeCurrent: true,
      tabbable: true,
      ignoreDefaultKeydown: {},
      unstable_hasDefault: undefined,
    });
    expect(tabster.useMergedTabsterAttributes_unstable).toHaveBeenCalledWith(
      'focusAttr',
      'arrowAttr'
    );
  });
});
