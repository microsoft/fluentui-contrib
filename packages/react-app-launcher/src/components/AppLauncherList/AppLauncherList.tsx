import * as React from 'react';
import type { AppLauncherListProps } from './AppLauncherList.types';
import { renderAppLauncherList } from './renderAppLauncherList';
import { useAppLauncherList } from './useAppLauncherList';

/**
 * Vertical list of application rows inside the launcher panel.
 *
 * Lays `AppLauncherItem` children out as full-width rows — the icon beside
 * the app name — the layout the search results of the Microsoft 365 app
 * launcher use. The list owns the panel width the same way the grid does.
 *
 * @example
 * ```tsx
 * <AppLauncherList>
 *     <AppLauncherItem label="Mail" icon={<Mail20Regular />} onClick={openMail} />
 * </AppLauncherList>
 * ```
 */
export const AppLauncherList = React.forwardRef<
  HTMLUListElement,
  AppLauncherListProps
>((props, ref) => {
  const state = useAppLauncherList(props, ref);

  return renderAppLauncherList(state);
});

AppLauncherList.displayName = 'AppLauncherList';
