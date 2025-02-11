import * as React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('should throw error for icon button if no tooltip is provided', () => {
    console.error = jest.fn();
    expect(() => render(<Button icon={<i>X</i>} />)).toThrow(
      'Icon button must have a tooltip'
    );
  });

  it('should render tooltip', () => {
    jest.useFakeTimers();
    const { getByRole } = render(
      <Button icon={<i>X</i>} tooltip={'Tooltip'} />
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
