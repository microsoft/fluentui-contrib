import * as React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useAnimationFrame } from '@fluentui/react-components';
import { useDraggableDialog } from './useDraggableDialog';

jest.mock('@fluentui/react-components', () => ({
  ...jest.requireActual('@fluentui/react-components'),
  useAnimationFrame: jest.fn(),
}));

const setAnimationFrameSpy = jest.fn((callback: () => void) => callback());
const cancelAnimationFrameSpy = jest.fn();

const useAnimationFrameMock = jest.mocked(useAnimationFrame);

useAnimationFrameMock.mockImplementation(() => [
  (callback: () => void) => {
    setAnimationFrameSpy(callback);
  },
  cancelAnimationFrameSpy,
]);

const dialogChild = React.createElement('div', null, 'Dialog Child');

describe('DraggableDialog', () => {
  beforeEach(() => {
    setAnimationFrameSpy.mockClear();
    cancelAnimationFrameSpy.mockClear();
  });

  it('should return default values', () => {
    const { result } = renderHook(() => {
      return useDraggableDialog({
        children: dialogChild,
      });
    });

    expect(Object.keys(result.current)).toStrictEqual([
      'onDragMove',
      'onDragEnd',
      'sensors',
      'modifiers',
      'accessibility',
      'dialogProps',
      'contextValue',
    ]);
    expect(result.current.modifiers).toHaveLength(1);
    expect(result.current.accessibility).toEqual(undefined);
    expect(result.current.onDragEnd).toBeInstanceOf(Function);
    expect(result.current.dialogProps).toEqual({ children: dialogChild });

    const { contextValue } = result.current;

    expect(contextValue.boundary).toBe('viewport');
    expect(contextValue.dropPosition).toEqual({ x: 0, y: 0 });
    expect(contextValue.hasBeenDragged).toBe(false);
    expect(contextValue.hasDraggableParent).toBe(true);
    expect(contextValue.id).toEqual(expect.any(String));
    expect(contextValue.margin).toEqual({
      top: 0,
      end: 0,
      bottom: 0,
      start: 0,
    });
    expect(contextValue.onPositionChange).toEqual(expect.any(Function));
    expect(contextValue.position).toBe(null);
    expect(contextValue.setDropPosition).toEqual(expect.any(Function));

    const sensorNames = result.current.sensors.map(({ sensor }) => sensor.name);

    expect(sensorNames).toStrictEqual(['KeyboardSensor', 'PointerSensor']);
  });

  it('should return default values with announcements', () => {
    const { result } = renderHook(() => {
      return useDraggableDialog({
        children: dialogChild,
        announcements: { start: 'start', end: 'end' },
      });
    });

    expect(result.current.accessibility).toEqual({
      announcements: {
        onDragStart: expect.any(Function),
        onDragEnd: expect.any(Function),
      },
    });
  });

  it('should not return announcements', () => {
    const { result } = renderHook(() => {
      return useDraggableDialog({
        children: dialogChild,
        announcements: {},
      });
    });

    expect(result.current.accessibility).toEqual(undefined);
  });

  it('should not pass unknown props to Dialog', () => {
    const { result } = renderHook(() => {
      return useDraggableDialog({
        children: dialogChild,
        announcements: {},
      });
    });

    expect(result.current.dialogProps).toEqual({ children: dialogChild });
  });

  it('should pass known props to Dialog', () => {
    const { result } = renderHook(() => {
      return useDraggableDialog({
        children: dialogChild,
        open: true,
      });
    });

    expect(result.current.dialogProps).toEqual({
      children: dialogChild,
      open: true,
    });
  });

  describe('margin configuration', () => {
    it('should handle numeric margin', () => {
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          margin: 10,
        });
      });

      expect(result.current.contextValue.margin).toEqual({
        top: 10,
        end: 10,
        bottom: 10,
        start: 10,
      });
    });

    it('should handle axis-based and viewport-based margins', () => {
      // Test axis-based margin
      const { result: axisResult } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          margin: { mainAxis: 20, crossAxis: 15 },
        });
      });

      expect(axisResult.current.contextValue.margin).toEqual({
        top: 15,
        end: 20,
        bottom: 15,
        start: 20,
      });

      // Test viewport-based margin (full and partial)
      const { result: viewportResult } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          margin: { top: 5, end: 10 },
        });
      });

      expect(viewportResult.current.contextValue.margin).toEqual({
        top: 5,
        end: 10,
        bottom: 0,
        start: 0,
      });
    });
  });

  describe('boundary configuration', () => {
    it('should handle different boundary types', () => {
      // Test viewport boundary (default)
      const { result: viewportResult } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          boundary: 'viewport',
        });
      });
      expect(viewportResult.current.contextValue.boundary).toBe('viewport');

      // Test null boundary
      const { result: nullResult } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          boundary: null,
        });
      });
      expect(nullResult.current.contextValue.boundary).toBe(null);

      // Test custom boundary ref
      const boundaryRef = React.createRef<HTMLDivElement>();
      const { result: refResult } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          boundary: boundaryRef,
        });
      });
      expect(refResult.current.contextValue.boundary).toBe(boundaryRef);
    });
  });

  describe('position handling', () => {
    it('should handle initial position', () => {
      const position = { x: 100, y: 200 };
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          position,
        });
      });

      expect(result.current.contextValue.position).toEqual(position);
    });

    it('should default position to null', () => {
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
        });
      });

      expect(result.current.contextValue.position).toBe(null);
    });

    it('should call onPositionChange when provided', () => {
      const onPositionChange = jest.fn();
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          onPositionChange,
        });
      });

      expect(result.current.contextValue.onPositionChange).toBe(
        onPositionChange
      );
    });

    it('should provide default onPositionChange when not provided', () => {
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
        });
      });

      expect(result.current.contextValue.onPositionChange).toEqual(
        expect.any(Function)
      );
      // Should not throw when called
      if (result.current.contextValue.onPositionChange) {
        result.current.contextValue.onPositionChange({ x: 0, y: 0 });
      }
    });
  });

  describe('drag event handlers', () => {
    it('should handle onDragEnd and update state', () => {
      const onPositionChange = jest.fn();
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          onPositionChange,
        });
      });

      // Create a minimal mock event for testing
      const mockEvent = {
        active: {
          rect: {
            current: {
              translated: {
                left: 150,
                top: 250,
              },
            },
          },
        },
      } as Parameters<typeof result.current.onDragEnd>[0];

      // Initial state
      expect(result.current.contextValue.hasBeenDragged).toBe(false);
      expect(result.current.contextValue.dropPosition).toEqual({ x: 0, y: 0 });

      // Simulate drag end
      act(() => {
        result.current.onDragEnd(mockEvent);
      });

      // Check state updates
      expect(result.current.contextValue.hasBeenDragged).toBe(true);
      expect(result.current.contextValue.dropPosition).toEqual({
        x: 150,
        y: 250,
      });
      expect(cancelAnimationFrameSpy).toHaveBeenCalled();
      expect(setAnimationFrameSpy).toHaveBeenCalled();
      expect(onPositionChange).not.toHaveBeenCalled();
    });

    it('should handle onDragEnd without rect', () => {
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
        });
      });

      const mockEvent = {
        active: {
          rect: {
            current: {
              translated: null,
            },
          },
        },
      } as Parameters<typeof result.current.onDragEnd>[0];

      // Should not throw
      expect(() => result.current.onDragEnd(mockEvent)).not.toThrow();

      // State should not change
      expect(result.current.contextValue.hasBeenDragged).toBe(false);
      expect(result.current.contextValue.dropPosition).toEqual({ x: 0, y: 0 });
    });

    it('should handle onDragMove', () => {
      const onPositionChange = jest.fn();
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          onPositionChange,
        });
      });

      const mockEvent = {
        active: {
          rect: {
            current: {
              translated: {
                left: 100,
                top: 200,
              },
            },
          },
        },
      } as Parameters<typeof result.current.onDragMove>[0];

      act(() => {
        result.current.onDragMove(mockEvent);
      });

      expect(cancelAnimationFrameSpy).toHaveBeenCalledTimes(1);
      expect(setAnimationFrameSpy).toHaveBeenCalledTimes(1);
      expect(onPositionChange).toHaveBeenCalledWith({ x: 100, y: 200 });
    });

    it('should debounce repeated onDragMove notifications', () => {
      const onPositionChange = jest.fn();
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          onPositionChange,
        });
      });

      const dragEvent = {
        active: {
          rect: {
            current: {
              translated: {
                left: 10,
                top: 20,
              },
            },
          },
        },
      } as Parameters<typeof result.current.onDragMove>[0];

      const updatedDragEvent = {
        active: {
          rect: {
            current: {
              translated: {
                left: 40,
                top: 60,
              },
            },
          },
        },
      } as Parameters<typeof result.current.onDragMove>[0];

      const nowSpy = jest.spyOn(Date, 'now');

      nowSpy.mockReturnValue(20);
      act(() => {
        result.current.onDragMove(dragEvent);
      });
      expect(onPositionChange).toHaveBeenCalledTimes(1);

      nowSpy.mockReturnValue(25);
      act(() => {
        result.current.onDragMove(dragEvent);
      });
      expect(onPositionChange).toHaveBeenCalledTimes(1);

      nowSpy.mockReturnValue(60);
      act(() => {
        result.current.onDragMove(dragEvent);
      });
      expect(onPositionChange).toHaveBeenCalledTimes(1);

      nowSpy.mockReturnValue(120);
      act(() => {
        result.current.onDragMove(updatedDragEvent);
      });
      expect(onPositionChange).toHaveBeenCalledTimes(2);
      expect(onPositionChange).toHaveBeenLastCalledWith({ x: 40, y: 60 });

      nowSpy.mockRestore();
    });
  });

  describe('ID handling', () => {
    it('should use provided ID', () => {
      const customId = 'custom-dialog-id';
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          id: customId,
        });
      });

      expect(result.current.contextValue.id).toBe(customId);
    });

    it('should generate ID when not provided', () => {
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
        });
      });

      expect(result.current.contextValue.id).toEqual(
        expect.stringContaining('draggable-dialog-')
      );
    });

    it('should generate unique IDs for different instances', () => {
      const { result: result1 } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
        });
      });

      const { result: result2 } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
        });
      });

      expect(result1.current.contextValue.id).not.toBe(
        result2.current.contextValue.id
      );
    });
  });

  describe('announcements', () => {
    it('should handle both start and end announcements', () => {
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          announcements: { start: 'Drag started', end: 'Drag ended' },
        });
      });

      expect(result.current.accessibility).toEqual({
        announcements: {
          onDragStart: expect.any(Function),
          onDragEnd: expect.any(Function),
        },
      });

      // Test announcement functions with minimal mock
      if (result.current.accessibility?.announcements) {
        const { announcements } = result.current.accessibility;
        if (announcements.onDragStart) {
          // Just test that the function exists and can be called
          expect(typeof announcements.onDragStart).toBe('function');
        }
        if (announcements.onDragEnd) {
          // Just test that the function exists and can be called
          expect(typeof announcements.onDragEnd).toBe('function');
        }
      }
    });

    it('should handle only start announcement', () => {
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          announcements: { start: 'Drag started' },
        });
      });

      expect(result.current.accessibility).toEqual({
        announcements: {
          onDragStart: expect.any(Function),
        },
      });

      if (result.current.accessibility?.announcements?.onDragStart) {
        expect(
          typeof result.current.accessibility.announcements.onDragStart
        ).toBe('function');
      }
      expect(
        result.current.accessibility?.announcements?.onDragEnd
      ).toBeUndefined();
    });

    it('should handle only end announcement', () => {
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          announcements: { end: 'Drag ended' },
        });
      });

      expect(result.current.accessibility).toEqual({
        announcements: {
          onDragEnd: expect.any(Function),
        },
      });

      if (result.current.accessibility?.announcements?.onDragEnd) {
        expect(
          typeof result.current.accessibility.announcements.onDragEnd
        ).toBe('function');
      }
      expect(
        result.current.accessibility?.announcements?.onDragStart
      ).toBeUndefined();
    });
  });

  describe('context value properties', () => {
    it('should set hasDraggableParent to true', () => {
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
        });
      });

      expect(result.current.contextValue.hasDraggableParent).toBe(true);
    });

    it('should provide setDropPosition function', () => {
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
        });
      });

      expect(result.current.contextValue.setDropPosition).toEqual(
        expect.any(Function)
      );

      act(() => {
        result.current.contextValue.setDropPosition?.({
          x: 50,
          y: 60,
        });
      });

      expect(result.current.contextValue.dropPosition).toEqual({
        x: 50,
        y: 60,
      });
      expect(result.current.contextValue.hasBeenDragged).toBe(true);

      const currentDropPosition = result.current.contextValue.dropPosition;
      const currentContextValue = result.current.contextValue;

      act(() => {
        result.current.contextValue.setDropPosition?.({
          x: 50,
          y: 60,
        });
      });

      expect(result.current.contextValue.dropPosition).toBe(
        currentDropPosition
      );
      expect(result.current.contextValue).toBe(currentContextValue);
    });
  });

  describe('modifiers', () => {
    it('should include restrictToBoundaryModifier', () => {
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
        });
      });

      expect(result.current.modifiers).toHaveLength(1);
      expect(result.current.modifiers[0]).toEqual(expect.any(Function));
    });

    it('should update modifiers when margin or boundary changes', () => {
      const { result, rerender } = renderHook(
        ({ margin, boundary }) => {
          return useDraggableDialog({
            children: dialogChild,
            margin,
            boundary,
          });
        },
        {
          initialProps: { margin: 10, boundary: 'viewport' as const },
        }
      );

      const initialModifiers = result.current.modifiers;

      rerender({ margin: 20, boundary: 'viewport' as const });

      // Modifiers should be recreated when dependencies change
      expect(result.current.modifiers).not.toBe(initialModifiers);
    });
  });

  describe('prop filtering', () => {
    it('should filter out draggable-specific props from dialogProps', () => {
      const mockOnPositionChange = jest.fn();
      const { result } = renderHook(() => {
        return useDraggableDialog({
          children: dialogChild,
          margin: 10,
          boundary: 'viewport',
          position: { x: 0, y: 0 },
          id: 'test-id',
          announcements: { start: 'start' },
          onPositionChange: mockOnPositionChange,
          // Dialog props
          open: true,
          modalType: 'modal',
        });
      });

      expect(result.current.dialogProps).toEqual({
        children: dialogChild,
        open: true,
        modalType: 'modal',
      });
    });
  });
});
