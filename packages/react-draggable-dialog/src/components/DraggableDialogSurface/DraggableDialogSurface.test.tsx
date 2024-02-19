import * as React from 'react';
import { render } from '@testing-library/react';
import { DraggableDialogSurface } from './DraggableDialogSurface';

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

  it('should render', () => {
    const text = 'Surface';
    const { getByText } = render(
      <DraggableDialogSurface>
        <div>{text}</div>
      </DraggableDialogSurface>
    );

    expect(() => getByText(text)).toBeTruthy();
  });

  it('should throw an error if not a descendant of DraggableDialog', () => {
    render(
      <DraggableDialogSurface>
        <div>Surface</div>
      </DraggableDialogSurface>
    );

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Warning: DraggableDialogSurface is not a descendant of DraggableDialog'
    );
  });
});
