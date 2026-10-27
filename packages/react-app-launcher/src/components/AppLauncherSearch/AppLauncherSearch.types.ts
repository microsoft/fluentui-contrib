import type { SearchBoxProps } from '@fluentui/react-components';
import type { SyntheticEvent } from 'react';

/**
 * Payload of a query change.
 */
export type AppLauncherSearchChangeData = {
  /** The next value of the search field. */
  value: string;
};

/**
 * Props of the app launcher search field.
 *
 * The field is a Fluent `SearchBox` with the launcher defaults: it spans the
 * panel, shows the search icon and a clear button while a query is present,
 * and Escape clears a controlled query before the panel is allowed to close
 * (see `onChange`). All remaining SearchBox props (`size`, `appearance`,
 * `placeholder`, `disabled`, ...) pass through. `onKeyDown` is owned by the
 * block, because that is where the Escape behavior lives.
 */
export type AppLauncherSearchProps = Omit<
  SearchBoxProps,
  'aria-label' | 'onChange' | 'onKeyDown'
> & {
  /** Accessible name of the field. The launcher shows no visible label. */
  label: string;

  /**
   * Fired with the next query value whenever the query changes: while
   * typing, when the clear button is clicked, and when Escape clears a
   * controlled field. The event is the common `SyntheticEvent` shape
   * rather than Fluent's event union, because a clear can arrive from a
   * keyboard event while typing arrives from a change event.
   */
  onChange?: (event: SyntheticEvent, data: AppLauncherSearchChangeData) => void;
};
