import * as React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { Button } from './Button';

describe('Button', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('should throw error for icon button if no title or aria-label is provided', () => {
    expect(() => render(<Button icon={<i>X</i>} />)).toThrow(
      'Icon button must have a title'
    );
  });

  it('should not throw error for icon button if aria-label is provided', () => {
    console.error = jest.fn();
    expect(() =>
      render(<Button aria-label="label" icon={<i>X</i>} />)
    ).not.toThrow();
  });

  it('should render title', () => {
    jest.useFakeTimers();
    const { getByRole } = render(<Button icon={<i>X</i>} title={'Tooltip'} />);

    const button = getByRole('button');
    fireEvent.pointerEnter(button);
    act(() => {
      jest.runOnlyPendingTimers();
    });

    const title = screen.queryByText('Tooltip');
    expect(title).not.toBeNull();

    expect(title?.textContent).toEqual(button.getAttribute('aria-label'));
  });

  it('should error when attempting to wrap with a menu', () => {
    expect(() =>
      render(
        <Menu>
          <MenuTrigger>
            <Button icon={<i>X</i>} />
          </MenuTrigger>
          <MenuPopover></MenuPopover>
        </Menu>
      )
    ).toThrow('Icon button must have a title');
  });
});
