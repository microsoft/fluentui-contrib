import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { AppLauncherTrigger } from '../../index';

/**
 * Renders the trigger inside the theme provider, mirroring how applications
 * mount it.
 */
function renderTrigger(trigger: ReactElement) {
  return render(
    <FluentProvider theme={webLightTheme}>{trigger}</FluentProvider>
  );
}

describe('AppLauncherTrigger', () => {
  it('renders an icon-only button whose accessible name is the default label', () => {
    renderTrigger(<AppLauncherTrigger />);

    const button = screen.getByRole('button', { name: 'App launcher' });

    expect(button.textContent).toBe('');
    expect(button.querySelector('svg')).not.toBeNull();
  });

  it('uses the provided label as the accessible name', () => {
    renderTrigger(<AppLauncherTrigger label="Applaus" />);

    expect(screen.getByRole('button', { name: 'Applaus' })).toBeDefined();
  });
});
