import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppLauncher, AppLauncherItem, AppLauncherList } from '../../index';

/**
 * Renders a small app list inside the theme provider, mirroring how
 * applications mount the panel content.
 */
function renderList() {
  return render(
    <FluentProvider theme={webLightTheme}>
      <AppLauncherList>
        <AppLauncherItem label="Mail" />
        <AppLauncherItem label="Calendar" />
        <AppLauncherItem label="Files" />
      </AppLauncherList>
    </FluentProvider>
  );
}

describe('AppLauncherList', () => {
  it('renders its children as a list of rows', () => {
    renderList();

    expect(screen.getByRole('list')).toBeDefined();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Mail' })).toBeDefined();
  });

  it('composes inside the launcher surface', () => {
    render(
      <FluentProvider theme={webLightTheme}>
        <AppLauncher>
          <AppLauncherList>
            <AppLauncherItem label="Mail" />
          </AppLauncherList>
        </AppLauncher>
      </FluentProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'App launcher' }));

    expect(screen.getByRole('button', { name: 'Mail' })).toBeDefined();
  });
});
