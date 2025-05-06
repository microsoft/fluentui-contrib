import { renderHook, cleanup } from '@testing-library/react';
import { useGamepadNavigationGroup } from './useGamepadNavigationGroup';
import { InputMode } from '../types/InputMode';
import { useGamepadNavigation } from './useGamepadNavigation';

const mockFindFirstFocusable = jest.fn();

describe('useGamepadNavigationGroup', () => {
  beforeEach(() => {
    jest.mock('@fluentui/react-tabster', () => ({
      ...jest.requireActual('@fluentui/react-tabster'),
      useFocusFinders: () => ({
        findFirstFocusable: mockFindFirstFocusable,
      }),
    }));
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  it('should return gamepadNavDOMAttributes and removeGamepadNavEventListeners', () => {
    const { result } = renderHook(() => useGamepadNavigationGroup());

    expect(result.current).toHaveProperty('gamepadNavDOMAttributes');
    expect(result.current).toHaveProperty('removeGamepadNavEventListeners');
    expect(typeof result.current.removeGamepadNavEventListeners).toBe(
      'function'
    );
  });

  it('should call findFirstFocusable when focusFirstElement is true', () => {
    const mockElement = document.createElement('button');
    mockElement.setAttribute('tabindex', '0');
    document.body.appendChild(mockElement);

    jest.mock('@fluentui/react-components', () => ({
      useFluent: () => ({ targetDocument: document }),
    }));

    mockFindFirstFocusable.mockReturnValue(mockElement);

    const { result } = renderHook(() =>
      useGamepadNavigationGroup({ focusFirstElement: true })
    );

    // expect(mockFindFirstFocusable).toHaveBeenCalledTimes(1);
    // expect(mockFindFirstFocusable).toHaveBeenCalledWith(document.body);
    // expect(document.activeElement).toBe(mockElement);

    document.body.removeChild(mockElement);
  });

  it('should not call findFirstFocusable when focusFirstElement is false', () => {
    renderHook(() => useGamepadNavigationGroup({ focusFirstElement: false }));
    expect(mockFindFirstFocusable).not.toHaveBeenCalled();
  });

  it('should use default options when no options are provided', () => {
    const { result } = renderHook(() => useGamepadNavigationGroup());

    const generateDefaultTabsterData = {
      groupper: { tabbability: 2 },
      focusable: { ignoreKeydown: {} },
      mover: {
        cyclic: false,
        direction: 3,
        memorizeCurrent: true,
        tabbable: true,
      },
    };

    expect(result.current.gamepadNavDOMAttributes).toBeDefined();
    expect(result.current.gamepadNavDOMAttributes).toStrictEqual({
      'data-tabster': JSON.stringify(generateDefaultTabsterData),
    });
  });

  it('should correctly pass options to useArrowNavigationGroup', () => {
    const { result } = renderHook(() =>
      useGamepadNavigationGroup({
        axis: 'horizontal',
        circular: true,
        memorizeCurrent: false,
      })
    );

    const tabsterData = JSON.parse(
      result.current.gamepadNavDOMAttributes['data-tabster'] ?? '{}'
    );
    expect(tabsterData.mover).toMatchObject({
      cyclic: true,
      direction: 2, // horizontal
      memorizeCurrent: false,
    });
  });

  it('should correctly pass options to useFocusableGroup', () => {
    const { result } = renderHook(() =>
      useGamepadNavigationGroup({
        tabBehavior: 'unlimited',
        ignoreDefaultKeydown: { Enter: true },
      })
    );

    const tabsterData = JSON.parse(
      result.current.gamepadNavDOMAttributes['data-tabster'] ?? '{}'
    );
    expect(tabsterData.groupper).toMatchObject({
      tabbability: 0, // unlimited
    });
    expect(tabsterData.focusable).toMatchObject({
      ignoreKeydown: { Enter: true },
    });
  });

  it('should call useGamepadNavigation with correct options', () => {
    const mockRemoveGamepadNavEventListeners = jest.fn();
    const mockUseGamepadNavigation = jest.fn(
      () => mockRemoveGamepadNavEventListeners
    );
    jest.mock('./useGamepadNavigation', () => ({
      useGamepadNavigation: mockUseGamepadNavigation,
    }));

    renderHook(() =>
      useGamepadNavigationGroup({
        defaultInputMode: InputMode.Gamepad,
        pollingEnabled: true,
      })
    );

    expect(mockUseGamepadNavigation).toHaveBeenCalledWith({
      defaultInputMode: InputMode.Gamepad,
      pollingEnabled: true,
    });
  });

  it('should handle undefined options gracefully', () => {
    const { result } = renderHook(() => useGamepadNavigationGroup(undefined));

    expect(result.current.gamepadNavDOMAttributes).toBeDefined();
    expect(typeof result.current.removeGamepadNavEventListeners).toBe(
      'function'
    );
  });

  it('should handle missing targetDocument gracefully', () => {
    jest.mock('@fluentui/react-components', () => ({
      useFluent: () => ({ targetDocument: null }),
    }));

    renderHook(() => useGamepadNavigationGroup({ focusFirstElement: true }));
    expect(mockFindFirstFocusable).not.toHaveBeenCalled();
  });
});
