import * as React from 'react';
import { render, renderHook } from '@testing-library/react';
import { DraggableDialogHandle } from './DraggableDialogHandle';
import { useDraggableDialogHandle } from './useDraggableDialogHandle';

import * as contexts from '../../contexts/DraggableDialogContext';
import * as dnd from '@dnd-kit/core';
import { DraggableDialogHandleState } from './DraggableDialogHandle.types';

jest.mock('../../contexts/DraggableDialogContext', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../../contexts/DraggableDialogContext'),
  };
});

jest.mock('@dnd-kit/core', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@dnd-kit/core'),
  };
});

describe('DraggableDialogHandle', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let useDraggableDialogContextSpy: jest.SpyInstance;
  let useDraggableSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation((error: string) => error);
    useDraggableDialogContextSpy = jest.spyOn(
      contexts,
      'useDraggableDialogContext'
    );
    useDraggableSpy = jest.spyOn(dnd, 'useDraggable');
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
      'aria-disabled': 'false',
      role: 'button',
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

      expect(handle.getAttribute(prop)).toBe(mockAttributes[prop]);
    });
  });

  it('should throw an error if not a descendant of DraggableDialog', () => {
    render(
      <DraggableDialogHandle>
        <div>Handle</div>
      </DraggableDialogHandle>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: DraggableDialogHandle is not a descendant of DraggableDialog'
    );
  });

  it('should not throw an error if a descendant of DraggableDialog', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      hasDialogParent: true,
    });

    render(
      <DraggableDialogHandle>
        <div>Handle</div>
      </DraggableDialogHandle>
    );

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should return default values', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'draggable-dialog-handle',
    });

    const { result } = renderHook(() => useDraggableDialogHandle());

    expect(Object.keys(result.current)).toStrictEqual([
      'setActivatorNodeRef',
      'attributes',
      'listeners',
    ]);
    ['setActivatorNodeRef', 'attributes', 'listeners'].forEach((key) => {
      const prop = key as keyof DraggableDialogHandleState;

      expect(useDraggableSpy.mock.results[0].value[prop]).toBe(
        result.current[prop]
      );
    });
  });

  it('should call useDraggable with the correct id', () => {
    const mockedId = 'draggable-dialog-handle';

    useDraggableDialogContextSpy.mockReturnValue({
      id: mockedId,
    });

    renderHook(() => useDraggableDialogHandle());

    expect(useDraggableDialogContextSpy).toHaveBeenCalled();
    expect(useDraggableSpy).toHaveBeenCalledWith({
      id: mockedId,
    });
  });
});
