import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { AppLauncher, AppLauncherSearch } from '../../index';

/**
 * Controlled search field wired to component state, the smallest wiring an
 * application needs to filter its own app list.
 */
function ControlledSearch() {
  const [query, setQuery] = useState('mail');

  return (
    <AppLauncherSearch
      label="Search apps"
      value={query}
      onChange={(_event, data) => setQuery(data.value)}
    />
  );
}

/**
 * Narrows an element found by role to the input the field renders.
 *
 * @param element - element found by role
 * @returns the element as an input element
 */
function asInput(element: HTMLElement): HTMLInputElement {
  if (!(element instanceof HTMLInputElement)) {
    throw new Error('Expected the search field to render an input element');
  }

  return element;
}

describe('AppLauncherSearch', () => {
  it('renders a labelled search field with the launcher placeholder', () => {
    render(
      <FluentProvider theme={webLightTheme}>
        <AppLauncherSearch label="Search apps" />
      </FluentProvider>
    );

    const field = asInput(
      screen.getByRole('searchbox', { name: 'Search apps' })
    );

    expect(field.placeholder).toBe('Search');
  });

  it('reports the typed query through onChange', () => {
    const onChange = jest.fn();

    render(
      <FluentProvider theme={webLightTheme}>
        <AppLauncherSearch label="Search apps" onChange={onChange} />
      </FluentProvider>
    );

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'mail' },
    });

    expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 'mail' });
  });

  it('clears the query on the first Escape and closes the panel on the second', async () => {
    render(
      <FluentProvider theme={webLightTheme}>
        <AppLauncher>
          <ControlledSearch />
        </AppLauncher>
      </FluentProvider>
    );

    const trigger = screen.getByRole('button', { name: 'App launcher' });
    fireEvent.click(trigger);
    const field = asInput(
      await screen.findByRole('searchbox', { name: 'Search apps' })
    );

    expect(field.value).toBe('mail');

    // jsdom skips the browser focus move into the surface, so focus is
    // set manually the way the panel Escape tests do it.
    field.focus();
    fireEvent.keyDown(field, { key: 'Escape' });

    // The clearing Escape must not reach the surface's close handler:
    // the field empties and the panel stays open.
    expect(field.value).toBe('');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    fireEvent.keyDown(field, { key: 'Escape' });

    await waitFor(() => {
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('searchbox')).toBeNull();
    });
  });

  it('stops a clearing Escape from reaching handlers outside the field', () => {
    const outerKeyDown = jest.fn();
    document.addEventListener('keydown', outerKeyDown);

    try {
      render(
        <FluentProvider theme={webLightTheme}>
          <ControlledSearch />
        </FluentProvider>
      );

      const field = screen.getByRole('searchbox', { name: 'Search apps' });

      fireEvent.keyDown(field, { key: 'Escape' });
      expect(outerKeyDown).not.toHaveBeenCalled();

      // Once the field is empty there is nothing to clear, so the next
      // Escape travels on to outer handlers, the way it reaches the
      // popover surface and closes the panel.
      fireEvent.keyDown(field, { key: 'Escape' });
      expect(outerKeyDown).toHaveBeenCalledTimes(1);
    } finally {
      document.removeEventListener('keydown', outerKeyDown);
    }
  });
});
