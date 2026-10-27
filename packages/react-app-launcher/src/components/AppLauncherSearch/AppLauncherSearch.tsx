import * as React from 'react';
import type { AppLauncherSearchProps } from './AppLauncherSearch.types';
import { renderAppLauncherSearch } from './renderAppLauncherSearch';
import { useAppLauncherSearch } from './useAppLauncherSearch';

/**
 * Search field of the launcher panel.
 *
 * A Fluent `SearchBox` with the launcher defaults: the field spans the panel,
 * and Escape clears a controlled query before the panel may close — the
 * first Escape empties the field, the next one lets the surface close.
 * Filtering and switching the panel content stay application concerns;
 * render the field above whatever the query should change.
 *
 * @example
 * ```tsx
 * const [query, setQuery] = useState('');
 *
 * <AppLauncherSearch
 *     label="Search apps"
 *     value={query}
 *     onChange={(_, data) => setQuery(data.value)}
 * />
 * ```
 */
export const AppLauncherSearch = React.forwardRef<
  HTMLInputElement,
  AppLauncherSearchProps
>((props, ref) => {
  const state = useAppLauncherSearch(props, ref);

  return renderAppLauncherSearch(state);
});

AppLauncherSearch.displayName = 'AppLauncherSearch';
