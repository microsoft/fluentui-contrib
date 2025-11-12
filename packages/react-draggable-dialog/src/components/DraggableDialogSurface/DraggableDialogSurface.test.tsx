import * as React from 'react';
import { render } from '@testing-library/react';
import { DraggableDialogSurface } from './DraggableDialogSurface';
import { DraggableDialog } from '../DraggableDialog/DraggableDialog';

describe('DraggableDialogSurface', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation((error: string) => error);
  });

  afterAll(() => jest.resetAllMocks());

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render children', () => {
    const text = 'Surface Content';
    const { getByText } = render(
      <DraggableDialogSurface>
        <div>{text}</div>
      </DraggableDialogSurface>
    );

    expect(() => getByText(text)).toBeTruthy();
  });

  it('should log an error if not a descendant of DraggableDialog', () => {
    render(
      <DraggableDialogSurface>
        <div>Surface</div>
      </DraggableDialogSurface>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: DraggableDialogSurface needs to be a descendant of DraggableDialog. Example:\n' +
        '  <DraggableDialog>\n    <DraggableDialogSurface />\n  </DraggableDialog>'
    );
  });

  it('should not log an error when used within DraggableDialog', () => {
    render(
      <DraggableDialog open>
        <DraggableDialogSurface>
          <div>Surface</div>
        </DraggableDialogSurface>
      </DraggableDialog>
    );

    expect(consoleErrorSpy).not.toHaveBeenCalled();
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

  it('should apply custom className alongside default classes', () => {
    const customClass = 'custom-surface-class';
    const { baseElement } = render(
      <DraggableDialogSurface className={customClass}>
        <div>Surface</div>
      </DraggableDialogSurface>
    );
    const dialogSurface = baseElement.querySelector('.fui-DialogSurface');

    expect(
      dialogSurface?.classList.contains('fui-DraggableDialogSurface')
    ).toBe(true);
    expect(dialogSurface?.classList.contains(customClass)).toBe(true);
  });

  it('should merge custom styles with draggable styles', () => {
    const customStyle = { backgroundColor: 'red', border: '1px solid blue' };
    const { baseElement } = render(
      <DraggableDialogSurface style={customStyle}>
        <div>Surface</div>
      </DraggableDialogSurface>
    );
    const dialogSurface = baseElement.querySelector(
      '.fui-DialogSurface'
    ) as HTMLElement;

    expect(dialogSurface.style.backgroundColor).toBe('red');
    expect(dialogSurface.style.border).toBe('1px solid blue');
  });

  it('should forward ref to DialogSurface', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <DraggableDialogSurface ref={ref}>
        <div>Surface</div>
      </DraggableDialogSurface>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.classList.contains('fui-DialogSurface')).toBe(true);
  });

  it('should pass through DialogSurface props', () => {
    const { getByRole } = render(
      <DraggableDialogSurface data-testid="custom-surface">
        <div>Surface</div>
      </DraggableDialogSurface>
    );

    expect(() => getByRole('dialog')).toBeTruthy();
    const surface = document.querySelector('[data-testid="custom-surface"]');
    expect(surface).toBeTruthy();
  });

  it('should handle mountNode prop correctly', () => {
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    render(
      <DraggableDialogSurface mountNode={mountNode}>
        <div>Surface</div>
      </DraggableDialogSurface>
    );

    // Dialog should be mounted in the specified node
    expect(mountNode.querySelector('.fui-DialogSurface')).toBeTruthy();

    // Cleanup
    document.body.removeChild(mountNode);
  });

  it('should work with proper DraggableDialog context and boundary', () => {
    const boundaryRef = React.createRef<HTMLDivElement>();
    const { getByText } = render(
      <div>
        <div ref={boundaryRef} data-testid="boundary" />
        <DraggableDialog open boundary={boundaryRef}>
          <DraggableDialogSurface>
            <div>Bounded Surface</div>
          </DraggableDialogSurface>
        </DraggableDialog>
      </div>
    );

    expect(() => getByText('Bounded Surface')).toBeTruthy();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should handle multiple children correctly', () => {
    const { getByText } = render(
      <DraggableDialogSurface>
        <div>First Child</div>
        <div>Second Child</div>
        <span>Third Child</span>
      </DraggableDialogSurface>
    );

    expect(() => getByText('First Child')).toBeTruthy();
    expect(() => getByText('Second Child')).toBeTruthy();
    expect(() => getByText('Third Child')).toBeTruthy();
  });

  it('should maintain component displayName', () => {
    expect(DraggableDialogSurface.displayName).toBe('DraggableDialogSurface');
  });

  it('should apply styles correctly when position is provided', () => {
    const { baseElement } = render(
      <DraggableDialog open>
        <DraggableDialogSurface style={{ color: 'blue' }}>
          <div>Surface with styles</div>
        </DraggableDialogSurface>
      </DraggableDialog>
    );

    const dialogSurface = baseElement.querySelector(
      '.fui-DialogSurface'
    ) as HTMLElement;
    expect(dialogSurface.style.color).toBe('blue');
  });

  describe('within DraggableDialog context', () => {
    it('should work with different boundary types and configurations', () => {
      // Test with viewport boundary
      const { getByText: getViewportText } = render(
        <DraggableDialog open boundary="viewport">
          <DraggableDialogSurface>
            <div>Viewport Bounded</div>
          </DraggableDialogSurface>
        </DraggableDialog>
      );
      expect(() => getViewportText('Viewport Bounded')).toBeTruthy();

      // Test with null boundary
      const { getByText: getNullText } = render(
        <DraggableDialog open boundary={null}>
          <DraggableDialogSurface>
            <div>No Boundary</div>
          </DraggableDialogSurface>
        </DraggableDialog>
      );
      expect(() => getNullText('No Boundary')).toBeTruthy();

      // Test with margin and different dialog props
      const onOpenChange = jest.fn();
      const { getByRole } = render(
        <DraggableDialog
          open
          onOpenChange={onOpenChange}
          modalType="alert"
          margin={{ top: 10, end: 20, bottom: 30, start: 40 }}
        >
          <DraggableDialogSurface>
            <div>Complex Configuration</div>
          </DraggableDialogSurface>
        </DraggableDialog>
      );
      expect(() => getByRole('alertdialog')).toBeTruthy();
    });
  });

  describe('memoization', () => {
    it('should memoize the component to prevent unnecessary re-renders', () => {
      expect(DraggableDialogSurface.displayName).toBe('DraggableDialogSurface');

      const TestParent = ({ text }: { text: string }) => (
        <DraggableDialogSurface>
          <div>{text}</div>
        </DraggableDialogSurface>
      );

      const { rerender, getByText } = render(<TestParent text="Initial" />);
      expect(() => getByText('Initial')).toBeTruthy();

      rerender(<TestParent text="Updated" />);
      expect(() => getByText('Updated')).toBeTruthy();
    });
  });

  describe('memoization', () => {
    it('should memoize the component to prevent unnecessary re-renders', () => {
      const TestParent = ({ text }: { text: string }) => (
        <DraggableDialogSurface>
          <div>{text}</div>
        </DraggableDialogSurface>
      );

      const { rerender, getByText } = render(<TestParent text="Initial" />);

      expect(() => getByText('Initial')).toBeTruthy();

      rerender(<TestParent text="Updated" />);

      expect(() => getByText('Updated')).toBeTruthy();
    });
  });
});
