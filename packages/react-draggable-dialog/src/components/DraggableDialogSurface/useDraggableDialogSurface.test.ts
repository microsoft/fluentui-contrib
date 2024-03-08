import { renderHook } from '@testing-library/react';

import * as contexts from '../../contexts/DraggableDialogContext';
import { useDraggableDialogSurface } from './useDraggableDialogSurface';

jest.mock('../../contexts/DraggableDialogContext', () => ({
  __esModule: true,
  ...jest.requireActual('../../contexts/DraggableDialogContext'),
}));

describe('DraggableDialogSurface', () => {
  let consoleErrorMock: jest.SpyInstance;
  let useDraggableDialogContextSpy: jest.SpyInstance<contexts.DraggableDialogContextValue>;

  beforeEach(() => {
    consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation((error: string) => error);

    useDraggableDialogContextSpy = jest.spyOn(
      contexts,
      'useDraggableDialogContext'
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if not a descendant of DraggableDialog', () => {
    renderHook(() => useDraggableDialogSurface({}));

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Warning: DraggableDialogSurface is not a descendant of DraggableDialog'
    );
  });

  it('should return default values', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      ...contexts.draggableDialogContextDefaultValue,
      id: 'draggable-dialog',
      hasDraggableParent: true,
    });

    const { result } = renderHook(() => useDraggableDialogSurface({}));

    expect(result.current.ref.current).toBe(undefined);
    expect(result.current.style).toEqual(undefined);
    expect(result.current.mountNode).toEqual(undefined);
  });
});
