import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRef } from 'react';
import { AppLauncher, type AppLauncherProps } from '../../index';

/**
 * Renders the launcher with a recognizable placeholder inside its surface,
 * mirroring how applications mount it.
 */
function renderLauncher(props: Partial<AppLauncherProps> = {}) {
  return render(
    <FluentProvider theme={webLightTheme}>
      <AppLauncher {...props}>
        <div>Panel content</div>
      </AppLauncher>
    </FluentProvider>
  );
}

/**
 * Mimics an application shell: a top bar with the launcher docked to it, the
 * layout the component is built for.
 */
function DockedLauncherShell() {
  const barRef = useRef<HTMLElement>(null);

  return (
    <FluentProvider theme={webLightTheme}>
      <header ref={barRef}>
        <AppLauncher dockTarget={barRef}>
          <div>Panel content</div>
        </AppLauncher>
      </header>
    </FluentProvider>
  );
}

/**
 * Renders the launcher with a focusable element inside the surface, so focus
 * movement can be exercised.
 */
function renderLauncherWithFocusablePanel() {
  return render(
    <FluentProvider theme={webLightTheme}>
      <AppLauncher>
        <button type="button">First app</button>
      </AppLauncher>
    </FluentProvider>
  );
}

describe('AppLauncher', () => {
  it('keeps the surface closed until the trigger is activated', () => {
    renderLauncher();

    expect(screen.queryByText('Panel content')).toBeNull();
  });

  it('opens the surface with its content when the trigger is activated', () => {
    renderLauncher();

    fireEvent.click(screen.getByRole('button', { name: 'App launcher' }));

    expect(screen.getByText('Panel content')).toBeDefined();
  });

  // The docked geometry (flush with the window edge) is inspected visually
  // in the workbench; jsdom has no layout, so this guards the wiring.
  it('opens the surface when docked to an element such as the application bar', () => {
    render(<DockedLauncherShell />);

    fireEvent.click(screen.getByRole('button', { name: 'App launcher' }));

    expect(screen.getByText('Panel content')).toBeDefined();
  });

  // The docked geometry itself is inspected in the workbench; jsdom has no
  // layout, so this asserts that positioning reads the dock target element.
  it('positions the surface against the dock target instead of the trigger', async () => {
    const { container } = render(<DockedLauncherShell />);
    const bar = container.querySelector('header');

    if (!bar) {
      throw new Error('Expected the shell to render a top bar');
    }

    const barRect = jest.spyOn(bar, 'getBoundingClientRect');

    fireEvent.click(screen.getByRole('button', { name: 'App launcher' }));

    await waitFor(() => {
      expect(barRect).toHaveBeenCalled();
    });

    barRect.mockRestore();
  });

  it('opens the surface in full docking mode', () => {
    renderLauncher({ docking: 'full' });

    fireEvent.click(screen.getByRole('button', { name: 'App launcher' }));

    expect(screen.getByText('Panel content')).toBeDefined();
  });

  it('follows the controlled open prop instead of toggling itself', () => {
    const onOpenChange = jest.fn();

    function ControlledLauncher({ open }: { open: boolean }) {
      return (
        <FluentProvider theme={webLightTheme}>
          <AppLauncher open={open} onOpenChange={onOpenChange}>
            <div>Panel content</div>
          </AppLauncher>
        </FluentProvider>
      );
    }

    const { rerender } = render(<ControlledLauncher open={false} />);
    const trigger = screen.getByRole('button', { name: 'App launcher' });

    fireEvent.click(trigger);

    // The click only asks to open; the controlled prop still says closed.
    expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), {
      open: true,
    });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByText('Panel content')).toBeNull();

    rerender(<ControlledLauncher open />);

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Panel content')).toBeDefined();
  });

  it('closes the surface on Escape', async () => {
    renderLauncherWithFocusablePanel();
    const trigger = screen.getByRole('button', { name: 'App launcher' });

    fireEvent.click(trigger);
    const firstApp = await screen.findByRole('button', { name: 'First app' });

    // In a real browser, opening moves focus into the surface and Escape
    // is handled there; in jsdom Tabster skips that focus move, so focus
    // is set manually to exercise the same surface-side handler.
    firstApp.focus();
    fireEvent.keyDown(firstApp, { key: 'Escape' });

    await waitFor(() => {
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('button', { name: 'First app' })).toBeNull();
    });
  });

  it('closes the surface when clicking outside', async () => {
    renderLauncher();
    fireEvent.click(screen.getByRole('button', { name: 'App launcher' }));
    expect(screen.getByText('Panel content')).toBeDefined();

    fireEvent.click(document.body);

    await waitFor(() => {
      expect(screen.queryByText('Panel content')).toBeNull();
    });
  });

  it('shows the trigger tooltip while the surface is closed', async () => {
    renderLauncher();

    fireEvent.focus(screen.getByRole('button', { name: 'App launcher' }));

    expect(await screen.findByRole('tooltip')).toBeDefined();
  });

  it('hides the trigger tooltip while the surface is open', async () => {
    renderLauncher();
    const trigger = screen.getByRole('button', { name: 'App launcher' });

    fireEvent.click(trigger);
    fireEvent.focus(trigger);

    await expect(
      screen.findByRole('tooltip', undefined, { timeout: 600 })
    ).rejects.toThrow();
  });

  it('uses a caller-provided trigger element instead of the built-in button', () => {
    renderLauncher({ trigger: <button type="button">Custom trigger</button> });

    expect(screen.queryByRole('button', { name: 'App launcher' })).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Custom trigger' })
    ).toBeDefined();
  });

  it('opens the surface from a caller-provided trigger', () => {
    renderLauncher({ trigger: <button type="button">Custom trigger</button> });

    fireEvent.click(screen.getByRole('button', { name: 'Custom trigger' }));

    expect(screen.getByText('Panel content')).toBeDefined();
  });
});
