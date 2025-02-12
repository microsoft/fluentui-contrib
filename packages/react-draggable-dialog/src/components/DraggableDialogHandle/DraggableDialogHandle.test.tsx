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
});
