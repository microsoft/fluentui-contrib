import * as React from 'react';
import { render } from '@testing-library/react';
import { DraggableDialogSurface } from './DraggableDialogSurface';

jest.mock('../../contexts/DraggableDialogContext', () => ({
  __esModule: true,
  ...jest.requireActual('../../contexts/DraggableDialogContext'),
}));

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

    expect(consoleErrorMock).toHaveBeenCalledWith(expect.any(String));
  });

  it('should render DialogSurface with draggable class', () => {
    const { baseElement } = render(
      <DraggableDialogSurface>
        <div>Surface</div>
      </DraggableDialogSurface>
    );
    const dialogSurface = baseElement.querySelector('.fui-DialogSurface');

    expect(dialogSurface).toBeTruthy();
    expect(
      dialogSurface?.classList.contains('fui-DraggableDialogSurface')
    ).toBe(true);
  });
});
