/** @jsxRuntime classic */
/** @jsx createElement */

import { mergeClasses } from '@fluentui/react-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import type { ReactElement } from 'react';
import { Children } from 'react';
import { AppLauncherItemLayoutContext } from '../AppLauncherItem/AppLauncherItemLayoutContext';
import type { AppLauncherGridState } from './useAppLauncherGrid';

/**
 * Renders the app launcher grid.
 *
 * Each child is wrapped in an `<li>`, which gives the panel correct list
 * semantics: assistive technology announces the app tiles as a list, and the
 * buttons inside them carry the accessible names. The grid also tells every
 * item inside it to render as a tile, so a grid nested in a list still shows
 * tiles. The column template travels as an inline style because its value is
 * computed per instance.
 *
 * @param state - resolved grid state
 * @returns the list that lays out the tiles
 */
export function renderAppLauncherGrid(
  state: AppLauncherGridState
): ReactElement {
  return (
    <ul
      {...state.rootProps}
      className={mergeClasses(state.classes.root, state.rootProps.className)}
      ref={state.rootRef}
      style={{
        gridTemplateColumns: state.gridTemplateColumns,
        ...state.rootProps.style,
      }}
    >
      <AppLauncherItemLayoutContext.Provider value="tile">
        {Children.map(state.children, (child) => (
          <li>{child}</li>
        ))}
      </AppLauncherItemLayoutContext.Provider>
    </ul>
  );
}
