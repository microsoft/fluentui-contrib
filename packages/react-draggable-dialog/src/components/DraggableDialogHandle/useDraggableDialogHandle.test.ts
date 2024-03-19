import { renderHook } from '@testing-library/react';
import { useDraggableDialogHandle } from './useDraggableDialogHandle';

import * as contexts from '../../contexts/DraggableDialogContext';
import * as dnd from '@dnd-kit/core';
import { DraggableDialogHandleState } from './DraggableDialogHandle.types';

jest.mock('../../contexts/DraggableDialogContext', () => ({
  __esModule: true,
  ...jest.requireActual('../../contexts/DraggableDialogContext'),
}));

jest.mock('@dnd-kit/core', () => ({
  __esModule: true,
  ...jest.requireActual('@dnd-kit/core'),
}));

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

  it('should throw an error if not a descendant of DraggableDialog', () => {
    renderHook(() => useDraggableDialogHandle());

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: DraggableDialogHandle is not a descendant of DraggableDialog'
    );
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
