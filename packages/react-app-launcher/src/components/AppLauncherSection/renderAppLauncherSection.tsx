/** @jsxRuntime classic */
/** @jsx createElement */

import { mergeClasses } from '@fluentui/react-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import type { ReactElement } from 'react';
import type { AppLauncherSectionState } from './useAppLauncherSection';

/**
 * Renders an app launcher section.
 *
 * The title is a plain label above the content; grouping semantics for
 * assistive technology are deliberately left to the content block, so the
 * section can hold a grid, a list, or anything else.
 *
 * @param state - resolved section state
 * @returns the section element with an optional title and its content
 */
export function renderAppLauncherSection(
  state: AppLauncherSectionState
): ReactElement {
  return (
    <div
      {...state.rootProps}
      className={mergeClasses(
        state.classes.root,
        state.divider && state.classes.rootWithDivider,
        state.rootProps.className
      )}
      ref={state.rootRef}
    >
      {state.title ? (
        <div className={state.classes.title}>{state.title}</div>
      ) : null}
      {state.children}
    </div>
  );
}
