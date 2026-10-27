import * as React from 'react';
import type { AppLauncherTriggerProps } from './AppLauncherTrigger.types';
import { renderAppLauncherTrigger } from './renderAppLauncherTrigger';
import { useAppLauncherTrigger } from './useAppLauncherTrigger';

/**
 * Icon-only trigger button for the application launcher.
 *
 * Renders the Fluent waffle glyph in a subtle button and exposes `label` as
 * the accessible name and the tooltip. The component forwards its ref to the
 * button element and passes every other `Button` prop through, so a later
 * iteration can wrap it in `PopoverTrigger` without changing this API.
 *
 * @example
 * ```tsx
 * <AppLauncherTrigger label="App launcher" />
 * ```
 */
export const AppLauncherTrigger = React.forwardRef<
  HTMLButtonElement,
  AppLauncherTriggerProps
>((props, ref) => {
  const state = useAppLauncherTrigger(props, ref);

  return renderAppLauncherTrigger(state);
});

AppLauncherTrigger.displayName = 'AppLauncherTrigger';
