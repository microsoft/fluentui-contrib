import * as React from 'react';
import { render } from '@testing-library/react';
import { DraggableDialogSurface } from './DraggableDialogSurface';

describe('DraggableDialogSurface', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation((error: string) => error);
  });

  afterAll(() => jest.resetAllMocks());

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

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(String));
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
