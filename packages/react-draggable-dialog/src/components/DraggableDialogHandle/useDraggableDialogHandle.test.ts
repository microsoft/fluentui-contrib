import { renderHook } from '@testing-library/react';
import { useDraggableDialogHandle } from './useDraggableDialogHandle';
import { useDraggableDialogContext } from '../../contexts/DraggableDialogContext';
import { useDraggable } from '@dnd-kit/core';

jest.mock('../../contexts/DraggableDialogContext');
jest.mock('@dnd-kit/core');

type UseDraggableFn = (
  args: Parameters<typeof useDraggable>[number]
) => Partial<ReturnType<typeof useDraggable>>;
type UseDraggableDialogContextFn = () => Partial<
  ReturnType<typeof useDraggableDialogContext>
>;

const useDraggableDialogContextSpy = jest.mocked<UseDraggableDialogContextFn>(
  useDraggableDialogContext
);
const useDraggableSpy = jest.mocked<UseDraggableFn>(useDraggable);

describe('useDraggableDialogHandle', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation((error: string) => error);

    // Set up default mocks
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      hasDraggableParent: false,
    });

    useDraggableSpy.mockReturnValue({
      setActivatorNodeRef: jest.fn(),
      attributes: {
        role: 'button',
        tabIndex: 0,
        'aria-disabled': false,
        'aria-pressed': false,
        'aria-roledescription': 'draggable',
        'aria-describedby': 'default-dialog-id',
      },
      listeners: undefined,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if not a descendant of DraggableDialog', () => {
    renderHook(() => useDraggableDialogHandle());

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: DraggableDialogHandle needs to be a descendant of DraggableDialog. Example:\n' +
        '  <DraggableDialog>\n    <DraggableDialogHandle />\n  </DraggableDialog>'
    );
  });

  it('should not throw an error if a descendant of DraggableDialog', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      hasDraggableParent: true,
    });

    renderHook(() => useDraggableDialogHandle());

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should call useDraggable with the correct id from context', () => {
    const mockId = 'custom-dialog-id';
    useDraggableDialogContextSpy.mockReturnValue({
      id: mockId,
      hasDraggableParent: true,
    });

    renderHook(() => useDraggableDialogHandle());

    expect(useDraggableSpy).toHaveBeenCalledWith({ id: mockId });
  });

  it('should return the correct state from useDraggable and handle various scenarios', () => {
    const mockSetActivatorNodeRef = jest.fn();
    const mockAttributes = {
      'aria-describedby': 'dialog-id',
      'aria-disabled': false,
      role: 'button',
      tabIndex: 0,
      'aria-pressed': false,
      'aria-roledescription': 'draggable',
    };
    const mockListeners = {
      onMouseDown: jest.fn(),
      onTouchStart: jest.fn(),
    };

    useDraggableDialogContextSpy.mockReturnValue({
      id: 'test-dialog-id',
      hasDraggableParent: true,
    });

    useDraggableSpy.mockReturnValue({
      setActivatorNodeRef: mockSetActivatorNodeRef,
      attributes: mockAttributes,
      listeners: mockListeners,
    });

    const { result } = renderHook(() => useDraggableDialogHandle());

    expect(result.current).toEqual({
      setActivatorNodeRef: mockSetActivatorNodeRef,
      attributes: mockAttributes,
      listeners: mockListeners,
    });

    // Test with undefined listeners
    useDraggableSpy.mockReturnValue({
      setActivatorNodeRef: mockSetActivatorNodeRef,
      attributes: mockAttributes,
      listeners: undefined,
    });

    const { result: resultWithoutListeners } = renderHook(() =>
      useDraggableDialogHandle()
    );
    expect(resultWithoutListeners.current.listeners).toBeUndefined();
  });

  it('should work with different id values and listener types', () => {
    const testIds = ['dialog-1', 'dialog-2', 'complex-dialog-id-123'];

    testIds.forEach((testId) => {
      useDraggableDialogContextSpy.mockReturnValue({
        id: testId,
        hasDraggableParent: true,
      });

      renderHook(() => useDraggableDialogHandle());
      expect(useDraggableSpy).toHaveBeenCalledWith({ id: testId });
    });

    // Test with different listener types
    const mockListeners = { onPointerDown: jest.fn() };
    const completeAttributes = {
      role: 'button' as const,
      tabIndex: 0,
      'aria-disabled': false,
      'aria-pressed': false,
      'aria-roledescription': 'draggable' as const,
      'aria-describedby': 'dialog-id',
    };

    useDraggableSpy.mockReturnValue({
      setActivatorNodeRef: jest.fn(),
      attributes: completeAttributes,
      listeners: mockListeners,
    });

    const { result } = renderHook(() => useDraggableDialogHandle());
    expect(result.current.listeners).toBe(mockListeners);
  });
});
