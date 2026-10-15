import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Mail32Regular } from '@fluentui/react-icons';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { AppLauncherItem } from '../../index';

/**
 * Renders the tile inside the theme provider, mirroring how applications
 * mount it.
 */
function renderItem(item: ReactElement) {
  return render(<FluentProvider theme={webLightTheme}>{item}</FluentProvider>);
}

describe('AppLauncherItem', () => {
  it('renders the app name as the button text', () => {
    renderItem(<AppLauncherItem label="Mail" icon={<Mail32Regular />} />);

    const button = screen.getByRole('button', { name: 'Mail' });

    expect(button.textContent).toBe('Mail');
    expect(button.querySelector('svg')).not.toBeNull();
  });

  it('renders without an icon', () => {
    renderItem(<AppLauncherItem label="Mail" />);

    const button = screen.getByRole('button', { name: 'Mail' });

    expect(button.querySelector('svg')).toBeNull();
  });

  it('calls onClick when the tile is activated', () => {
    const onClick = jest.fn();
    renderItem(<AppLauncherItem label="Mail" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Mail' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a disabled tile as a disabled button', () => {
    // The native disabled attribute is what stops activation for users;
    // the accessible name stays readable.
    renderItem(
      <AppLauncherItem label="Bookings" icon={<Mail32Regular />} disabled />
    );

    const button = screen.getByRole('button', { name: 'Bookings' });

    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('renders a disabledFocusable tile as an aria-disabled button that stays focusable', () => {
    // A disabledFocusable tile relies on `aria-disabled` alone: because
    // no native `disabled` attribute is set, keyboard users can still
    // reach the tile, and the button reports itself as disabled.
    renderItem(<AppLauncherItem label="Bookings" disabledFocusable />);

    const button = screen.getByRole('button', { name: 'Bookings' });

    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.hasAttribute('disabled')).toBe(false);

    button.focus();

    expect(document.activeElement).toBe(button);
  });

  it('does not activate a disabledFocusable tile when it is clicked', () => {
    const onClick = jest.fn();
    renderItem(
      <AppLauncherItem label="Bookings" disabledFocusable onClick={onClick} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Bookings' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not activate a disabled tile when it is clicked', () => {
    const onClick = jest.fn();
    renderItem(<AppLauncherItem label="Bookings" disabled onClick={onClick} />);

    const button = screen.getByRole('button', { name: 'Bookings' });

    expect(button.hasAttribute('disabled')).toBe(true);

    button.focus();

    expect(document.activeElement).not.toBe(button);

    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('lets disabledFocusable win when a tile is both disabled and disabledFocusable', () => {
    // A disabledFocusable prop takes precedence over a native disabled
    // prop: the tile never carries the native attribute and stays
    // focusable, while the accessible state still reads as disabled.
    const onClick = jest.fn();
    renderItem(
      <AppLauncherItem
        label="Bookings"
        disabled
        disabledFocusable
        onClick={onClick}
      />
    );

    const button = screen.getByRole('button', { name: 'Bookings' });

    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.hasAttribute('disabled')).toBe(false);

    button.focus();

    expect(document.activeElement).toBe(button);

    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not activate a disabledFocusable tile when Enter is pressed', () => {
    // jsdom does not synthesize a click from Enter, so the key events are
    // dispatched directly. The tile must ignore them.
    const onClick = jest.fn();
    renderItem(
      <AppLauncherItem label="Bookings" disabledFocusable onClick={onClick} />
    );

    const button = screen.getByRole('button', { name: 'Bookings' });

    button.focus();

    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyUp(button, { key: 'Enter' });

    expect(onClick).not.toHaveBeenCalled();
  });
});
