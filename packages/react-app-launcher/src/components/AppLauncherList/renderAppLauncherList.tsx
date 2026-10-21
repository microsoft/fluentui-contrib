/** @jsxRuntime classic */
/** @jsx createElement */

import { mergeClasses } from '@fluentui/react-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import type { ReactElement } from 'react';
import { Children } from 'react';
import { AppLauncherItemLayoutContext } from '../AppLauncherItem/AppLauncherItemLayoutContext';
import type { AppLauncherListState } from './useAppLauncherList';

/**
 * Renders the app launcher list.
 *
 * Each child is wrapped in an `<li>`, which gives the panel correct list
 * semantics: assistive technology announces the rows as a list, and the
 * buttons inside them carry the accessible names. The list also tells every
 * item inside it to render as a row.
 *
 * @param state - resolved list state
 * @returns the list that stacks the rows
 */
export function renderAppLauncherList(
  state: AppLauncherListState
): ReactElement {
  return (
    <ul
      {...state.rootProps}
      className={mergeClasses(state.classes.root, state.rootProps.className)}
      ref={state.rootRef}
    >
      <AppLauncherItemLayoutContext.Provider value="row">
        {Children.map(state.children, (child) => (
          <li>{child}</li>
        ))}
      </AppLauncherItemLayoutContext.Provider>
    </ul>
  );
}
