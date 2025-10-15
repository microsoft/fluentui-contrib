import * as React from 'react';
import { render } from '@testing-library/react';
import { DraggableDialogHandle } from './DraggableDialogHandle';

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

describe('DraggableDialogHandle', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation((error: string) => error);

    useDraggableSpy.mockReturnValue({
      setActivatorNodeRef: jest.fn(),
    });
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'draggable-dialog-id',
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    const text = 'Handle';
    const { getByText } = render(
      <DraggableDialogHandle>
        <div>{text}</div>
      </DraggableDialogHandle>
    );

    expect(() => getByText(text)).toBeTruthy();
  });

  it('should not wrap children in any additional elements', () => {
    const { container, rerender } = render(
      <DraggableDialogHandle>
        <div className="custom-handle">Handle</div>
      </DraggableDialogHandle>
    );
    const getHandle = () => container.firstChild as HTMLElement;
    let handle = getHandle();

    expect(handle).toBeTruthy();
    expect(handle.tagName.toLowerCase()).toBe('div');
    expect(handle.classList.contains('custom-handle')).toBe(true);
    expect(handle.classList.contains('fui-DraggableDialogHandle')).toBe(true);

    rerender(
      <DraggableDialogHandle>
        <button className="button">Handle</button>
      </DraggableDialogHandle>
    );

    handle = getHandle();

    expect(handle.tagName.toLowerCase()).toBe('button');
    expect(handle.classList.contains('button')).toBe(true);
    expect(handle.classList.contains('custom-handle')).toBe(false);
    expect(handle.classList.contains('fui-DraggableDialogHandle')).toBe(true);
  });

  it('should add draggable props to the child', () => {
    const mockAttributes = {
      'aria-describedby': 'dialog-id',
      'aria-disabled': false,
      role: 'button',
      tabIndex: 0,
      'aria-pressed': false,
      'aria-roledescription': 'draggable',
    };
    useDraggableSpy.mockReturnValue({
      setActivatorNodeRef: jest.fn(),
      attributes: mockAttributes,
    });

    const { container } = render(
      <DraggableDialogHandle>
        <div>Handle</div>
      </DraggableDialogHandle>
    );
    const handle = container.firstChild as HTMLElement;

    Object.keys(mockAttributes).forEach((key) => {
      const prop = key as keyof typeof mockAttributes;

      expect(handle.getAttribute(prop)).toBe(String(mockAttributes[prop]));
    });
  });

  it('should throw an error if not a descendant of DraggableDialog', () => {
    render(
      <DraggableDialogHandle>
        <div>Handle</div>
      </DraggableDialogHandle>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(String));
  });

  it('should not throw an error if a descendant of DraggableDialog', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      hasDraggableParent: true,
    });

    render(
      <DraggableDialogHandle>
        <div>Handle</div>
      </DraggableDialogHandle>
    );

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should apply event listeners to the child element', () => {
    const mockListeners = {
      onMouseDown: jest.fn(),
      onTouchStart: jest.fn(),
    };
    useDraggableSpy.mockReturnValue({
      setActivatorNodeRef: jest.fn(),
      listeners: mockListeners,
    });
    useDraggableDialogContextSpy.mockReturnValue({
      hasDraggableParent: true,
    });

    const { container } = render(
      <DraggableDialogHandle>
        <div>Handle</div>
      </DraggableDialogHandle>
    );
    const handle = container.firstChild as HTMLElement;

    // Trigger the events to verify they are attached
    handle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    handle.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));

    expect(mockListeners.onMouseDown).toHaveBeenCalled();
    expect(mockListeners.onTouchStart).toHaveBeenCalled();
  });

  it('should properly merge className props', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      hasDraggableParent: true,
    });

    const { container, rerender } = render(
      <DraggableDialogHandle className="parent-class">
        <div className="child-class">Handle</div>
      </DraggableDialogHandle>
    );
    let handle = container.firstChild as HTMLElement;

    expect(handle.classList.contains('fui-DraggableDialogHandle')).toBe(true);
    expect(handle.classList.contains('child-class')).toBe(true);
    expect(handle.classList.contains('parent-class')).toBe(true);

    // Test with no parent className
    rerender(
      <DraggableDialogHandle>
        <div className="child-only">Handle</div>
      </DraggableDialogHandle>
    );
    handle = container.firstChild as HTMLElement;

    expect(handle.classList.contains('fui-DraggableDialogHandle')).toBe(true);
    expect(handle.classList.contains('child-only')).toBe(true);
    expect(handle.classList.contains('parent-class')).toBe(false);

    // Test with no child className
    rerender(
      <DraggableDialogHandle className="parent-only">
        <div>Handle</div>
      </DraggableDialogHandle>
    );
    handle = container.firstChild as HTMLElement;

    expect(handle.classList.contains('fui-DraggableDialogHandle')).toBe(true);
    expect(handle.classList.contains('parent-only')).toBe(true);
    expect(handle.classList.contains('child-only')).toBe(false);
  });

  it('should pass ref to the child element', () => {
    const mockRef = jest.fn();
    useDraggableSpy.mockReturnValue({
      setActivatorNodeRef: mockRef,
    });
    useDraggableDialogContextSpy.mockReturnValue({
      hasDraggableParent: true,
    });

    render(
      <DraggableDialogHandle>
        <div>Handle</div>
      </DraggableDialogHandle>
    );

    expect(mockRef).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  it('should preserve existing props on child element', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      hasDraggableParent: true,
    });

    const { container } = render(
      <DraggableDialogHandle>
        <button disabled data-testid="custom-button">
          Handle
        </button>
      </DraggableDialogHandle>
    );
    const handle = container.firstChild as HTMLButtonElement;

    // Test that non-event props are preserved
    expect(handle.disabled).toBe(true);
    expect(handle.getAttribute('data-testid')).toBe('custom-button');
    expect(handle.textContent).toBe('Handle');
  });

  it('should throw error when multiple children are provided', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      hasDraggableParent: true,
    });

    expect(() => {
      render(
        // @ts-expect-error - Testing invalid usage
        <DraggableDialogHandle>
          <div>Handle 1</div>
          <div>Handle 2</div>
        </DraggableDialogHandle>
      );
    }).toThrow();
  });

  it('should throw error when no children are provided', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      hasDraggableParent: true,
    });

    expect(() => {
      // @ts-expect-error - Testing invalid usage
      render(<DraggableDialogHandle>{null}</DraggableDialogHandle>);
    }).toThrow();
  });

  it('should call useDraggable with correct id', () => {
    const mockId = 'test-dialog-id';
    useDraggableDialogContextSpy.mockReturnValue({
      id: mockId,
      hasDraggableParent: true,
    });

    render(
      <DraggableDialogHandle>
        <div>Handle</div>
      </DraggableDialogHandle>
    );

    expect(useDraggableSpy).toHaveBeenCalledWith({
      id: mockId,
    });
  });

  it('should handle string children', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      hasDraggableParent: true,
    });

    const { container } = render(
      <DraggableDialogHandle>
        <span>Handle Text</span>
      </DraggableDialogHandle>
    );
    const handle = container.firstChild as HTMLElement;

    expect(handle.tagName.toLowerCase()).toBe('span');
    expect(handle.textContent).toBe('Handle Text');
    expect(handle.classList.contains('fui-DraggableDialogHandle')).toBe(true);
  });

  it('should not apply listeners when they are undefined', () => {
    useDraggableSpy.mockReturnValue({
      setActivatorNodeRef: jest.fn(),
      listeners: undefined,
    });
    useDraggableDialogContextSpy.mockReturnValue({
      hasDraggableParent: true,
    });

    const { container } = render(
      <DraggableDialogHandle>
        <div>Handle</div>
      </DraggableDialogHandle>
    );
    const handle = container.firstChild as HTMLElement;

    // Check that no event listeners were added by verifying we can't trigger them
    const mouseEvent = new MouseEvent('mousedown', { bubbles: true });
    const touchEvent = new TouchEvent('touchstart', { bubbles: true });

    // These should not throw or cause issues
    expect(() => {
      handle.dispatchEvent(mouseEvent);
      handle.dispatchEvent(touchEvent);
    }).not.toThrow();
  });
});
