import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppLauncher, AppLauncherGrid, AppLauncherItem } from '../../index';

/**
 * Renders a small app grid inside the theme provider, mirroring how
 * applications mount the panel content.
 */
function renderGrid() {
  return render(
    <FluentProvider theme={webLightTheme}>
      <AppLauncherGrid>
        <AppLauncherItem label="Mail" />
        <AppLauncherItem label="Calendar" />
        <AppLauncherItem label="Files" />
      </AppLauncherGrid>
    </FluentProvider>
  );
}

describe('AppLauncherGrid', () => {
  it('renders its children as a list of tiles', () => {
    renderGrid();

    expect(screen.getByRole('list')).toBeDefined();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Mail' })).toBeDefined();
  });

  it('composes inside the launcher surface', () => {
    render(
      <FluentProvider theme={webLightTheme}>
        <AppLauncher>
          <AppLauncherGrid>
            <AppLauncherItem label="Mail" />
          </AppLauncherGrid>
        </AppLauncher>
      </FluentProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'App launcher' }));

    expect(screen.getByRole('button', { name: 'Mail' })).toBeDefined();
  });
});
