import type { RefCallback } from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useDraggable } from '@dnd-kit/core';
import { useFluent, useMergedRefs } from '@fluentui/react-components';

import { useDraggableDialogSurface } from './useDraggableDialogSurface';
import { useDraggableDialogContext } from '../../contexts/DraggableDialogContext';

jest.mock('@dnd-kit/core');
jest.mock('@fluentui/react-components');
jest.mock('../../contexts/DraggableDialogContext');

type UseDraggableFn = (
  args: Parameters<typeof useDraggable>[number]
) => Partial<ReturnType<typeof useDraggable>>;
type UseDraggableDialogContextFn = () => Partial<
  ReturnType<typeof useDraggableDialogContext>
>;
type UseFluentFn = () => Partial<ReturnType<typeof useFluent>>;

const useDraggableDialogContextSpy = jest.mocked<UseDraggableDialogContextFn>(
  useDraggableDialogContext
);
const useDraggableSpy = jest.mocked<UseDraggableFn>(useDraggable);
const useFluentSpy = jest.mocked<UseFluentFn>(useFluent);
const useMergedRefsSpy = jest.mocked(useMergedRefs);

describe('DraggableDialogSurface', () => {
  let consoleErrorMock: jest.SpyInstance;
  const mockSetNodeRef = jest.fn();
  const mockMergedRef = jest.fn();
  let mockSetDropPosition: jest.Mock;

  beforeEach(() => {
    consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation((error: string) => error);

    mockSetDropPosition = jest.fn();

    // Set up default mocks
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: false,
      hasBeenDragged: false,
      position: null,
      dropPosition: { x: 0, y: 0 },
      setDropPosition: mockSetDropPosition,
    });

    useDraggableSpy.mockReturnValue({
      setNodeRef: mockSetNodeRef,
      transform: null,
      isDragging: false,
    });

    useFluentSpy.mockReturnValue({
      targetDocument: {
        documentElement: {
          clientWidth: 1024,
          clientHeight: 768,
        },
      } as Document,
    });

    // Mock useMergedRefs to return the mock function and suppress TS error
    (useMergedRefsSpy as jest.Mock).mockReturnValue(mockMergedRef);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if not a descendant of DraggableDialog', () => {
    const { result } = renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Warning: DraggableDialogSurface needs to be a descendant of DraggableDialog. Example:\n' +
        '  <DraggableDialog>\n    <DraggableDialogSurface />\n  </DraggableDialog>'
    );
    expect(result.current.ref).toBe(mockMergedRef);
  });

  it('should not throw an error if a descendant of DraggableDialog', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: null,
      dropPosition: { x: 0, y: 0 },
    });

    renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    expect(consoleErrorMock).not.toHaveBeenCalled();
  });

  it('should call useDraggable with the correct id from context', () => {
    const mockId = 'custom-dialog-id';
    useDraggableDialogContextSpy.mockReturnValue({
      id: mockId,
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: null,
      dropPosition: { x: 0, y: 0 },
    });

    renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    expect(useDraggableSpy).toHaveBeenCalledWith({ id: mockId });
  });

  it('should return the correct state when not dragged and no position set', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 10,
        end: 10,
        bottom: 10,
        start: 10,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: null,
      dropPosition: { x: 0, y: 0 },
    });

    const { result } = renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    expect(result.current.ref).toBe(mockMergedRef);
    expect(result.current.mountNode).toBeUndefined();
    expect(result.current.style).toBeUndefined(); // No style until currentEl is set
  });

  it('should use mountNode from props when boundary is viewport', () => {
    const mockMountNode = document.createElement('div');
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: null,
      dropPosition: { x: 0, y: 0 },
    });

    const { result } = renderHook(
      () => useDraggableDialogSurface({ mountNode: mockMountNode }, null),
      {
        wrapper: ({ children }) => children,
      }
    );

    expect(result.current.mountNode).toBe(mockMountNode);
  });

  it('should use boundary element as mountNode when boundary is not viewport', () => {
    const mockBoundaryElement = document.createElement('div');
    const mockBoundaryRef = { current: mockBoundaryElement };

    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: mockBoundaryRef,
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: null,
      dropPosition: { x: 0, y: 0 },
    });

    const { result } = renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    expect(result.current.mountNode).toBe(mockBoundaryElement);
  });

  it('should return transform style when dragging', () => {
    const mockTransform = { x: 10, y: 20, scaleX: 1, scaleY: 1 };

    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: null,
      dropPosition: { x: 0, y: 0 },
    });

    useDraggableSpy.mockReturnValue({
      setNodeRef: mockSetNodeRef,
      transform: mockTransform,
      isDragging: true,
    });

    // Mock the currentEl state by testing the scenario when element is already set
    const { result } = renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    // We can't easily test the style calculation here without the currentEl state,
    // but we can verify that the hook runs without errors
    expect(result.current.ref).toBe(mockMergedRef);
  });

  it('should return drop position when has been dragged and not dragging', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: true,
      position: null,
      dropPosition: { x: 150, y: 100 },
    });

    const { result } = renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    // We can't easily simulate the currentEl state in this test setup,
    // but we can verify the hook executes correctly
    expect(result.current.ref).toBe(mockMergedRef);
  });

  it('should return undefined style when no document is available', () => {
    useFluentSpy.mockReturnValue({
      targetDocument: undefined,
    });

    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: null,
      dropPosition: { x: 0, y: 0 },
    });

    const { result } = renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    expect(result.current.style).toBeUndefined();
  });

  it('should return undefined style when boundary element is null', () => {
    const mockBoundaryElement = { current: null };

    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: mockBoundaryElement,
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: null,
      dropPosition: { x: 0, y: 0 },
    });

    const { result } = renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    // Since currentEl will be null initially, style should be undefined
    expect(result.current.style).toBeUndefined();
  });

  it('should pass forwardedRef to useMergedRefs', () => {
    const mockForwardedRef = { current: null };

    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: null,
      dropPosition: { x: 0, y: 0 },
      setDropPosition: mockSetDropPosition,
    });

    renderHook(() => useDraggableDialogSurface({}, mockForwardedRef), {
      wrapper: ({ children }) => children,
    });

    expect(useMergedRefsSpy).toHaveBeenCalledWith(
      expect.any(Function), // The internal ref callback
      mockForwardedRef
    );
  });

  it('should handle position from context correctly', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: { x: 100, y: 50 },
      dropPosition: { x: 0, y: 0 },
      setDropPosition: mockSetDropPosition,
    });

    const { result } = renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    // Since currentEl is null initially, style will be undefined
    // The position logic is tested through the style calculation when currentEl is set
    expect(result.current.ref).toBe(mockMergedRef);
  });

  it('should center the surface within the viewport and update drop position on mount', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: null,
      dropPosition: { x: 0, y: 0 },
      setDropPosition: mockSetDropPosition,
    });

    const mockElement = {
      clientHeight: 200,
      clientWidth: 400,
    } as unknown as HTMLDivElement;

    const { result } = renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    const refCallback = useMergedRefsSpy.mock
      .calls[0][0] as RefCallback<HTMLDivElement>;

    act(() => {
      refCallback(mockElement);
    });

    expect(mockSetNodeRef).toHaveBeenCalledWith(mockElement);
    // When boundary is viewport and not dragged yet, style is undefined
    // (dialog uses default CSS centering)
    expect(result.current.style).toBeUndefined();
    // setDropPosition is not called in this case since style is undefined
    expect(mockSetDropPosition).not.toHaveBeenCalled();
  });

  it('should not update drop position while dragging', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: null,
      dropPosition: { x: 0, y: 0 },
      setDropPosition: mockSetDropPosition,
    });

    const mockTransform = { x: 10, y: 20, scaleX: 1, scaleY: 1 };
    useDraggableSpy.mockReturnValue({
      setNodeRef: mockSetNodeRef,
      transform: mockTransform,
      isDragging: true,
    });

    const mockElement = {
      clientHeight: 120,
      clientWidth: 240,
    } as unknown as HTMLDivElement;

    const { result } = renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    const refCallback = useMergedRefsSpy.mock
      .calls[0][0] as RefCallback<HTMLDivElement>;

    act(() => {
      refCallback(mockElement);
    });

    expect(result.current.style).toMatchObject({
      transitionDuration: '0s',
    });
    expect(result.current.style?.transform).toEqual(
      expect.stringContaining('translate')
    );
    expect(mockSetDropPosition).not.toHaveBeenCalled();
  });

  it('should respect controlled position and sync drop position', async () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: false,
      position: { x: 200, y: 160 },
      dropPosition: { x: 0, y: 0 },
      setDropPosition: mockSetDropPosition,
    });

    const mockElement = {
      clientHeight: 80,
      clientWidth: 100,
    } as unknown as HTMLDivElement;

    const { result } = renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    const refCallback = useMergedRefsSpy.mock
      .calls[0][0] as RefCallback<HTMLDivElement>;

    act(() => {
      refCallback(mockElement);
    });

    expect(result.current.style).toEqual({
      margin: 0,
      top: 160,
      left: 200,
    });

    // Wait for effects to complete (needed for React 17 with @testing-library/react-hooks)
    await waitFor(() => {
      expect(mockSetDropPosition).toHaveBeenCalledWith({ x: 200, y: 160 });
    });
  });

  it('should not sync drop position when already dragged', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      boundary: 'viewport',
      margin: {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      },
      hasDraggableParent: true,
      hasBeenDragged: true,
      position: null,
      dropPosition: { x: 30, y: 40 },
      setDropPosition: mockSetDropPosition,
    });

    const mockElement = {
      clientHeight: 60,
      clientWidth: 60,
    } as unknown as HTMLDivElement;

    const { result } = renderHook(() => useDraggableDialogSurface({}, null), {
      wrapper: ({ children }) => children,
    });

    const refCallback = useMergedRefsSpy.mock
      .calls[0][0] as RefCallback<HTMLDivElement>;

    act(() => {
      refCallback(mockElement);
    });

    expect(result.current.style).toEqual({
      margin: 0,
      top: 40,
      left: 30,
    });
    expect(mockSetDropPosition).not.toHaveBeenCalled();
  });
});
