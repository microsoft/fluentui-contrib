import { renderHook } from '@testing-library/react';
import { useDraggableDialogHandle } from './useDraggableDialogHandle';

describe('DraggableDialogHandle', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation((error: string) => error);
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
});
