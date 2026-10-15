import { createContext } from 'react';

/**
 * Layout a container block asks its items to render with.
 *
 * `'tile'` is the vertical grid layout — icon above the app name — and
 * `'row'` is the horizontal list layout with the icon beside the name.
 */
export type AppLauncherItemLayout = 'tile' | 'row';

/**
 * Layout that app launcher items render with.
 *
 * Container blocks provide their layout: `AppLauncherGrid` provides `'tile'`
 * and `AppLauncherList` provides `'row'`, so the innermost container wins for
 * the items it wraps. Items outside any container fall back to `'tile'`, the
 * layout of the first container block.
 */
export const AppLauncherItemLayoutContext =
  createContext<AppLauncherItemLayout>('tile');
