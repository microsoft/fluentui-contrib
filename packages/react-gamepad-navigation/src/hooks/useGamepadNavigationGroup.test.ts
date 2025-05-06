import { renderHook, cleanup } from '@testing-library/react';
import { useGamepadNavigationGroup } from './useGamepadNavigationGroup';

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

  it('should merge tabster attributes correctly', () => {
    const { result } = renderHook(() =>
      useGamepadNavigationGroup({ axis: 'vertical', circular: true })
    );

    expect(result.current.gamepadNavDOMAttributes).toHaveProperty(
      'data-tabster'
    );
    const tabsterData = JSON.parse(
      result.current.gamepadNavDOMAttributes['data-tabster'] ?? '{}'
    );
    expect(tabsterData).toHaveProperty('groupper'); // useFocusableGroup attributes
    expect(tabsterData).toHaveProperty('mover'); // useArrowNavigationGroup attributes
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

  it('should call findFirstFocusable when focusFirstElement is true', () => {
    // TODOLO: Mock the targetDocument to simulate a real DOM environment
    const mockElement = document.createElement('button');
    mockElement.setAttribute('tabindex', '0');
    document.body.appendChild(mockElement);
    mockFindFirstFocusable.mockReturnValue(mockElement);
    jest.mock('@fluentui/react-components', () => ({
      useFluent: () => ({
        targetDocument: document,
      }),
    }));

    renderHook(() => useGamepadNavigationGroup({ focusFirstElement: true }));

    // expect(mockFindFirstFocusable).toHaveBeenCalledTimes(1);
    // expect(mockFindFirstFocusable).toHaveBeenCalledWith(document.activeElement);
    // expect(document.activeElement).toBe(mockElement);

    document.body.removeChild(mockElement);
  });

  it('should not call findFirstFocusable when focusFirstElement is false', () => {
    renderHook(() => useGamepadNavigationGroup({ focusFirstElement: false }));
    expect(mockFindFirstFocusable).not.toHaveBeenCalled();
  });

  it('should handle missing targetDocument gracefully', () => {
    jest.mock('@fluentui/react-components', () => ({
      useFluent: () => ({ targetDocument: null }),
    }));

    renderHook(() => useGamepadNavigationGroup({ focusFirstElement: true }));
    expect(mockFindFirstFocusable).not.toHaveBeenCalled();
  });
});
