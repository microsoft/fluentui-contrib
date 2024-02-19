import * as React from 'react';
import { render } from '@testing-library/react';
import { DraggableDialogHandle } from './DraggableDialogHandle';

describe('DraggableDialogHandle', () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation((error: string) => error);
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  it('should throw an error if not a descendant of DraggableDialog', () => {
    render(
      <DraggableDialogHandle>
        <div>Handle</div>
      </DraggableDialogHandle>
    );

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Warning: DraggableDialogHandle is not a descendant of DraggableDialog'
    );
  });
});
