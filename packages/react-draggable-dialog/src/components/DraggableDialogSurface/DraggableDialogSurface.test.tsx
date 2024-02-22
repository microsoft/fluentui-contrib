import * as React from 'react';
import { render, renderHook } from '@testing-library/react';
import { DraggableDialogSurface } from './DraggableDialogSurface';

import * as contexts from '../../contexts/DraggableDialogContext';
import { useDraggableDialogSurface } from './useDraggableDialogSurface';

jest.mock('../../contexts/DraggableDialogContext', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../../contexts/DraggableDialogContext'),
  };
});

const getCustomEl = () => {
  const divEl = document.createElement('div');

  divEl.setAttribute('style', 'width: 100px; height: 100px;');

  return divEl;
};

describe('DraggableDialogSurface', () => {
  let consoleErrorMock: jest.SpyInstance;
  let useDraggableDialogContextSpy: jest.SpyInstance;
  let useRefSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation((error: string) => error);

    useDraggableDialogContextSpy = jest.spyOn(
      contexts,
      'useDraggableDialogContext'
    );

    useRefSpy = jest.spyOn(React, 'useRef');
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

  it('should return default values', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'draggable-dialog-handle',
      hasDialogParent: true,
      isDragging: false,
      hasBeenDragged: false,
      position: {
        x: 0,
        y: 0,
      },
    });

    const { result } = renderHook(() => useDraggableDialogSurface());

    expect(result.current.ref.current).toBe(undefined);
    expect(result.current.style).toEqual(undefined);
  });

  it('should compute styles after dragging', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'draggable-dialog-handle',
      hasDialogParent: true,
      isDragging: false,
      hasBeenDragged: true,
      position: {
        x: 10,
        y: 10,
      },
    });

    const { result, rerender } = renderHook(() => useDraggableDialogSurface());

    expect(result.current.ref.current).toBe(undefined);
    expect(result.current.style).toEqual({
      transform: 'translate3D(-50%, -50%, 0)',
      left: '50%',
      margin: 0,
      marginLeft: 10,
      marginTop: 10,
      top: '50%',
      transition: 'none',
    });

    useDraggableDialogContextSpy.mockReturnValue({
      id: 'draggable-dialog-handle',
      hasDialogParent: true,
      isDragging: false,
      hasBeenDragged: true,
      position: {
        x: 20,
        y: 10,
      },
    });

    rerender();

    expect(result.current.style).toEqual({
      transform: 'translate3D(-50%, -50%, 0)',
      left: '50%',
      margin: 0,
      marginLeft: 20,
      marginTop: 10,
      top: '50%',
      transition: 'none',
    });
  });

  it('should compute styles after opening dialog', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'draggable-dialog-handle',
      hasDialogParent: true,
      isDragging: false,
      hasBeenDragged: true,
      position: {
        x: 0,
        y: 0,
      },
    });

    useRefSpy.mockReturnValue({
      current: getCustomEl(),
    });

    const { result } = renderHook(() => useDraggableDialogSurface());

    expect(result.current.ref.current).toBe(undefined);
    expect(result.current.style).toEqual({
      left: 'calc(50% + 0px)',
      margin: 0,
      marginLeft: -0,
      marginTop: -0,
      top: 'calc(50% + 0px)',
      transition: 'none',
    });
  });

  it('should compute styles while dragging', () => {
    useDraggableDialogContextSpy.mockReturnValue({
      id: 'draggable-dialog-handle',
      hasDialogParent: true,
      isDragging: true,
      hasBeenDragged: true,
      position: {
        x: 10,
        y: 10,
      },
    });

    useRefSpy.mockReturnValue({
      current: getCustomEl(),
    });

    const { result, rerender } = renderHook(() => useDraggableDialogSurface());

    expect(result.current.style).toEqual({
      margin: 0,
      marginLeft: -0,
      marginTop: -0,
      top: 'calc(50% + 10px)',
      left: 'calc(50% + 10px)',
      transition: 'none',
    });

    useDraggableDialogContextSpy.mockReturnValue({
      id: 'draggable-dialog-handle',
      hasDialogParent: true,
      isDragging: true,
      hasBeenDragged: true,
      position: {
        x: 20,
        y: 20,
      },
    });

    rerender();

    expect(result.current.style).toEqual({
      margin: 0,
      marginLeft: -0,
      marginTop: -0,
      top: 'calc(50% + 20px)',
      left: 'calc(50% + 20px)',
      transition: 'none',
    });
  });
});
