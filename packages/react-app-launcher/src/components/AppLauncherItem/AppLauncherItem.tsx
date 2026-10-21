import * as React from 'react';
import type { AppLauncherItemProps } from './AppLauncherItem.types';
import { renderAppLauncherItem } from './renderAppLauncherItem';
import { useAppLauncherItem } from './useAppLauncherItem';

/**
 * One application of the launcher panel.
 *
 * Renders the app icon and its name in a subtle button, laid out as the
 * surrounding container asks: a tile (icon above the name) inside an
 * `AppLauncherGrid`, a row (icon beside the name) inside an
 * `AppLauncherList`. The item is presentation only: the application decides
 * what activation means through `onClick`.
 *
 * @example
 * ```tsx
 * <AppLauncherItem label="Mail" icon={<Mail32Regular />} onClick={openMail} />
 * ```
 */
export const AppLauncherItem = React.forwardRef<
  HTMLButtonElement,
  AppLauncherItemProps
>((props, ref) => {
  const state = useAppLauncherItem(props, ref);

  return renderAppLauncherItem(state);
});

AppLauncherItem.displayName = 'AppLauncherItem';
