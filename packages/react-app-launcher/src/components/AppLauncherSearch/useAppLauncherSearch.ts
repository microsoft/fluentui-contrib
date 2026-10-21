import type { SearchBoxProps } from '@fluentui/react-components';
import type { KeyboardEventHandler, Ref } from 'react';
import type { AppLauncherSearchProps } from './AppLauncherSearch.types';
import type { AppLauncherSearchClasses } from './useAppLauncherSearchStyles.styles';
import { useAppLauncherSearchStyles } from './useAppLauncherSearchStyles.styles';

/** Placeholder the field shows while no query is present. */
const DEFAULT_PLACEHOLDER = 'Search';

/**
 * State that {@link renderAppLauncherSearch} renders.
 */
export type AppLauncherSearchState = {
  /** Accessible name of the field. */
  label: string;
  /** Visible placeholder of the field. */
  placeholder: string;
  /** Current controlled query, when the caller drives the field. */
  value: SearchBoxProps['value'];
  /** Caller-provided query change handler, forwarded to the field. */
  onChange: AppLauncherSearchProps['onChange'];
  /** Escape handling that keeps the panel open while clearing a query. */
  handleKeyDown: KeyboardEventHandler<Element>;
  /** Remaining SearchBox props forwarded to the field. */
  rootProps: Omit<
    AppLauncherSearchProps,
    'label' | 'onChange' | 'placeholder' | 'value'
  >;
  /** Ref to the input element, forwarded to the applications. */
  inputRef: Ref<HTMLInputElement>;
  /** Resolved search field style classes. */
  classes: AppLauncherSearchClasses;
};

/**
 * Resolves the search field props into render state.
 *
 * The hook owns one behavior beyond forwarding: Escape inside the field must
 * clear a controlled query before the popover surface sees the key and
 * closes. Fluent closes the surface on Escape unconditionally, and its own
 * source says that stopping the propagation is the supported opt-out. So:
 * with a non-empty controlled `value`, the first Escape clears the field and
 * stops the event; with an empty or uncontrolled field there is nothing to
 * clear, the key travels on, and the panel closes as usual.
 *
 * @param props - props from this instance of the search field
 * @param ref - ref to the input element
 * @returns the state consumed by {@link renderAppLauncherSearch}
 */
export function useAppLauncherSearch(
  props: AppLauncherSearchProps,
  ref: Ref<HTMLInputElement>
): AppLauncherSearchState {
  const {
    label,
    onChange,
    placeholder = DEFAULT_PLACEHOLDER,
    value,
    ...rootProps
  } = props;

  const classes = useAppLauncherSearchStyles();

  const handleKeyDown: KeyboardEventHandler<Element> = (event) => {
    if (event.key !== 'Escape' || event.defaultPrevented) {
      return;
    }

    if (value === undefined || value === '') {
      // Nothing to clear: let the surface handle Escape and close.
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    onChange?.(event, { value: '' });
  };

  return {
    label,
    placeholder,
    value,
    onChange,
    handleKeyDown,
    rootProps,
    inputRef: ref,
    classes,
  };
}
