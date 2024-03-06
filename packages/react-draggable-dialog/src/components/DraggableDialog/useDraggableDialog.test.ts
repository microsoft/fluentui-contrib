import * as React from 'react';
import { act, renderHook } from '@testing-library/react';

import { useDraggableDialog } from './useDraggableDialog';
import { DragEndEvent } from '@dnd-kit/core';

const dialogChild = React.createElement('div', null, 'Dialog Child');

describe('DraggableDialog', () => {
  it('should return default values', () => {
    const { result } = renderHook(() => {
      return useDraggableDialog({
        children: dialogChild,
      });
    });

    expect(Object.keys(result.current)).toStrictEqual([
      'sensors',
      'modifiers',
      'accessibilityProps',
      'onDragStart',
      'onDragEnd',
      'contextValue',
      'dialogProps',
    ]);
    expect(result.current.modifiers).toHaveLength(1);
    expect(result.current.accessibilityProps).toEqual(undefined);
    expect(result.current.onDragStart).toBeInstanceOf(Function);
    expect(result.current.onDragEnd).toBeInstanceOf(Function);
    expect(result.current.dialogProps).toEqual({ children: dialogChild });

    const { id, ...values } = result.current.contextValue;

    expect(values).toEqual({
      hasBeenDragged: false,
      hasDraggableParent: true,
      isDragging: false,
      position: { x: 0, y: 0 },
    });
    expect(id).toEqual(expect.any(String));

    const sensorNames = result.current.sensors.map(({ sensor }) => sensor.name);

    expect(sensorNames).toStrictEqual([
      'PointerSensor',
      'MouseSensor',
      'TouchSensor',
      'KeyboardSensor',
    ]);
  });

  it('should return default values with keepInViewport', () => {
    const { result } = renderHook(() => {
      return useDraggableDialog({
        children: dialogChild,
        keepInViewport: true,
      });
    });

    const { id, ...values } = result.current.contextValue;

    expect(values).toEqual({
      hasBeenDragged: false,
      hasDraggableParent: true,
      isDragging: false,
      position: { x: 0, y: 0 },
    });
    expect(id).toEqual(expect.any(String));
  });

  it('should return default values with announcements', () => {
    const { result } = renderHook(() => {
      return useDraggableDialog({
        children: dialogChild,
        announcements: { start: 'start', end: 'end' },
      });
    });

    expect(result.current.accessibilityProps).toEqual({
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

    expect(result.current.accessibilityProps).toEqual(undefined);
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

  it('should change position on drag', () => {
    const { result } = renderHook(() => {
      return useDraggableDialog({
        children: dialogChild,
      });
    });

    act(() => {
      result.current.onDragStart();
      result.current.onDragEnd({ delta: { x: 10, y: 10 } } as DragEndEvent);
    });

    expect(result.current.contextValue.position).toEqual({ x: 10, y: 10 });

    act(() => {
      result.current.onDragStart();
      result.current.onDragEnd({ delta: { x: 10, y: 10 } } as DragEndEvent);
    });

    expect(result.current.contextValue.position).toEqual({ x: 20, y: 20 });
  });

  it('should change isDragging on drag start and end', () => {
    const { result } = renderHook(() => {
      return useDraggableDialog({
        children: dialogChild,
      });
    });

    expect(result.current.contextValue.hasBeenDragged).toEqual(false);
    act(() => {
      result.current.onDragStart();
    });

    expect(result.current.contextValue.hasBeenDragged).toEqual(true);
    expect(result.current.contextValue.isDragging).toEqual(true);

    act(() => {
      result.current.onDragEnd({ delta: { x: 10, y: 10 } } as DragEndEvent);
    });

    expect(result.current.contextValue.isDragging).toEqual(false);
    expect(result.current.contextValue.hasBeenDragged).toEqual(true);
  });
});
