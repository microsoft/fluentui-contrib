/** @jsxRuntime classic */
/** @jsx createElement */

import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from '@fluentui/react-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import type { ReactElement } from 'react';
import { AppLauncherTrigger } from '../AppLauncherTrigger';
import type { AppLauncherState } from './useAppLauncher';

/**
 * Renders the app launcher: the trigger inside `PopoverTrigger` and the
 * caller's content inside `PopoverSurface`. The trigger is the built-in
 * waffle button unless the caller passed `trigger`, which then renders in its
 * place.
 *
 * `disableButtonEnhancement` keeps the existing button as the trigger instead
 * of letting `PopoverTrigger` wrap it in a second button. Both the built-in
 * trigger and a caller-provided element accept and forward injected props and
 * refs, which is all the trigger enhancer needs, and it lets `PopoverTrigger`
 * merge its own anchor ref with the forwarded one. The built-in trigger's
 * tooltip is hidden while the surface is open so the label does not float
 * over the panel.
 *
 * The surface carries `data-app-launcher-surface`, which the style rules of
 * this package target to outweigh Fluent's own surface styles: Fluent's
 * stylesheet is inserted after this package's, so an equal-specificity rule
 * would lose to its defaults.
 *
 * @param state - resolved launcher state
 * @returns the trigger and the popover surface
 */
export function renderAppLauncher(state: AppLauncherState): ReactElement {
  return (
    <Popover
      positioning={state.positioning}
      open={state.controlledOpen}
      onOpenChange={state.onOpenChange}
    >
      <PopoverTrigger disableButtonEnhancement>
        {state.trigger ?? (
          <AppLauncherTrigger
            label={state.label}
            icon={state.icon}
            hideTooltip={state.open}
            ref={state.triggerRef}
          />
        )}
      </PopoverTrigger>
      <PopoverSurface
        className={state.classes.surface}
        data-app-launcher-surface=""
      >
        {state.children}
      </PopoverSurface>
    </Popover>
  );
}
