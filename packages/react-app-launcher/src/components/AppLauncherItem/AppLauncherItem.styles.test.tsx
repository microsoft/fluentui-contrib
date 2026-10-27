import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Mail32Regular } from '@fluentui/react-icons';
import { render, screen } from '@testing-library/react';
import { AppLauncherGrid, AppLauncherItem, AppLauncherList } from '../../index';

describe('AppLauncherItem', () => {
  it('follows the layout of the surrounding container', () => {
    // jsdom has no layout engine, so the class names stand in for the
    // visual difference: a grid renders tiles, a list renders rows.
    const grid = render(
      <FluentProvider theme={webLightTheme}>
        <AppLauncherGrid>
          <AppLauncherItem label="Mail" />
        </AppLauncherGrid>
      </FluentProvider>
    );
    const tileClasses = screen.getByRole('button', { name: 'Mail' }).className;
    grid.unmount();

    render(
      <FluentProvider theme={webLightTheme}>
        <AppLauncherList>
          <AppLauncherItem label="Mail" />
        </AppLauncherList>
      </FluentProvider>
    );
    const rowClasses = screen.getByRole('button', { name: 'Mail' }).className;

    expect(tileClasses).not.toBe(rowClasses);
  });

  it('dims the icon of a disabled item', () => {
    // jsdom has no layout engine, so the class names stand in for the
    // visual difference: only a disabled item carries the dimming class
    // on its icon box. The icon box is the first span inside the button.
    const enabled = render(
      <FluentProvider theme={webLightTheme}>
        <AppLauncherItem label="Mail" icon={<Mail32Regular />} />
      </FluentProvider>
    );
    const enabledIconClasses = screen
      .getByRole('button', { name: 'Mail' })
      .querySelector('span')?.className;
    enabled.unmount();

    render(
      <FluentProvider theme={webLightTheme}>
        <AppLauncherItem label="Mail" icon={<Mail32Regular />} disabled />
      </FluentProvider>
    );
    const disabledIconClasses = screen
      .getByRole('button', { name: 'Mail' })
      .querySelector('span')?.className;

    expect(disabledIconClasses).toBeTruthy();
    expect(disabledIconClasses).not.toBe(enabledIconClasses);
  });

  it('dims the icon of a disabledFocusable item exactly as for a disabled item', () => {
    // jsdom has no layout engine, so the class names stand in for the
    // visual difference: a disabledFocusable item carries the same
    // dimming class on its icon box as a native-disabled item.
    const disabled = render(
      <FluentProvider theme={webLightTheme}>
        <AppLauncherItem label="Mail" icon={<Mail32Regular />} disabled />
      </FluentProvider>
    );
    const disabledIconClasses = screen
      .getByRole('button', { name: 'Mail' })
      .querySelector('span')?.className;
    disabled.unmount();

    render(
      <FluentProvider theme={webLightTheme}>
        <AppLauncherItem
          label="Mail"
          icon={<Mail32Regular />}
          disabledFocusable
        />
      </FluentProvider>
    );
    const focusableIconClasses = screen
      .getByRole('button', { name: 'Mail' })
      .querySelector('span')?.className;

    expect(focusableIconClasses).toBeTruthy();
    expect(focusableIconClasses).toBe(disabledIconClasses);
  });
});
