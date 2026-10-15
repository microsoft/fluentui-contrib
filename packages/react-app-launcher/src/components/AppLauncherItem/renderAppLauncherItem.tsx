/** @jsxRuntime classic */
/** @jsx createElement */

import { Button, mergeClasses } from '@fluentui/react-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import type { ReactElement } from 'react';
import type { AppLauncherItemState } from './useAppLauncherItem';

/**
 * Renders an app launcher tile.
 *
 * The icon and the app name are rendered as button children rather than
 * through the button's `icon` slot: the slot is sized for inline icons that
 * match the text height, which a large app logo would fight. The icon also
 * gets a box of its own, so the disabled state can dim a colorful logo
 * without touching the name.
 *
 * @param state - resolved tile state
 * @returns the tile button
 */
export function renderAppLauncherItem(
  state: AppLauncherItemState
): ReactElement {
  return (
    <Button
      {...state.rootProps}
      appearance="subtle"
      className={mergeClasses(state.classes.root, state.rootProps.className)}
      ref={state.buttonRef}
    >
      {state.icon ? (
        <span
          className={mergeClasses(
            state.classes.icon,
            (state.rootProps.disabled || state.rootProps.disabledFocusable) &&
              state.classes.iconDisabled
          )}
        >
          {state.icon}
        </span>
      ) : null}
      <span className={state.classes.label}>{state.label}</span>
    </Button>
  );
}
