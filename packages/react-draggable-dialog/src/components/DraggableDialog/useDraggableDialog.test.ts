import * as React from 'react';
import { renderHook } from '@testing-library/react';

import { useDraggableDialog } from './useDraggableDialog';

const dialogChild = React.createElement('div', null, 'Dialog Child');

describe('DraggableDialog', () => {
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
});
