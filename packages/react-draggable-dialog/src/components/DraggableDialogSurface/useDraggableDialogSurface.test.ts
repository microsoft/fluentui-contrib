import { renderHook } from '@testing-library/react';

import { useDraggableDialogSurface } from './useDraggableDialogSurface';

describe('DraggableDialogSurface', () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation((error: string) => error);
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
});
