import * as React from 'react';
import type { AppLauncherGridProps } from './AppLauncherGrid.types';
import { renderAppLauncherGrid } from './renderAppLauncherGrid';
import { useAppLauncherGrid } from './useAppLauncherGrid';

/**
 * App tile grid of the launcher panel.
 *
 * Lays `AppLauncherItem` children out in three columns by default, the
 * Microsoft 365 app launcher layout, and wraps each tile in a list item so
 * the panel reads as a list to assistive technology. Tiles are reached with
 * Tab in reading order.
 *
 * @example
 * ```tsx
 * <AppLauncherGrid>
 *     <AppLauncherItem label="Mail" icon={<Mail32Regular />} />
 *     <AppLauncherItem label="Calendar" icon={<CalendarLtr32Regular />} />
 * </AppLauncherGrid>
 * ```
 */
export const AppLauncherGrid = React.forwardRef<
  HTMLUListElement,
  AppLauncherGridProps
>((props, ref) => {
  const state = useAppLauncherGrid(props, ref);

  return renderAppLauncherGrid(state);
});

AppLauncherGrid.displayName = 'AppLauncherGrid';
