/** @jsxRuntime classic */
/** @jsx createElement */

import { mergeClasses, SearchBox } from '@fluentui/react-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import type { ReactElement } from 'react';
import type { AppLauncherSearchState } from './useAppLauncherSearch';

/**
 * Renders the app launcher search field.
 *
 * The field is a Fluent SearchBox inside a sticky wrapper: the wrapper pins
 * the field to the panel's top while the content scrolls beneath, and its
 * opaque background covers the surface's padding band so no content shows
 * above the field. Keeping that band on the wrapper leaves the SearchBox at
 * its native size — padding on the field itself would stretch its outline.
 *
 * @param state - resolved search field state
 * @returns the sticky search field wrapper
 */
export function renderAppLauncherSearch(
  state: AppLauncherSearchState
): ReactElement {
  return (
    <div className={state.classes.root}>
      <SearchBox
        {...state.rootProps}
        aria-label={state.label}
        className={mergeClasses(state.classes.field, state.rootProps.className)}
        onChange={state.onChange}
        onKeyDown={state.handleKeyDown}
        placeholder={state.placeholder}
        ref={state.inputRef}
        value={state.value}
      />
    </div>
  );
}
