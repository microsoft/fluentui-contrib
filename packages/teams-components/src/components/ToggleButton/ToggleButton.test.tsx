import * as React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { ToggleButton } from './ToggleButton';

describe('ToggleButton', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('should throw error for icon button if no tooltip or aria-label is provided', () => {
    console.error = jest.fn();
    expect(() => render(<ToggleButton checked icon={<i>X</i>} />)).toThrow(
      'Icon button must have a tooltip'
    );
  });

  it('should not throw error for icon button if aria-label is provided', () => {
    console.error = jest.fn();
    expect(() =>
      render(<ToggleButton checked aria-label="label" icon={<i>X</i>} />)
    ).not.toThrow();
  });

  it('should render tooltip', () => {
    jest.useFakeTimers();
    const { getByRole } = render(
      <ToggleButton checked icon={<i>X</i>} tooltip={'Tooltip'} />
    );

    const button = getByRole('button');
    fireEvent.pointerEnter(button);
    act(() => {
      jest.runOnlyPendingTimers();
    });

    const tooltip = screen.queryByText('Tooltip');
    expect(tooltip).not.toBeNull();

    expect(tooltip?.textContent).toEqual(button.getAttribute('aria-label'));
  });
});
