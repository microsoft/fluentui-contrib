/** @jsxRuntime classic */
/** @jsx createElement */

import { Button, Tooltip } from '@fluentui/react-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import type { ReactElement } from 'react';
import type { AppLauncherTriggerState } from './useAppLauncherTrigger';

/**
 * Renders the app launcher trigger.
 *
 * The tooltip is bound with `relationship="label"` so sighted users and
 * assistive technology read the same text, and the explicit `aria-label`
 * keeps the button named even while the tooltip is hidden. The caller can
 * suppress the tooltip with `hideTooltip` — the launcher does so while its
 * surface is open, so the label does not float over the panel.
 *
 * Suppressing keeps the tooltip mounted and only changes its `visible` prop:
 * removing the wrapper would replace the button element in the DOM whenever
 * the panel opens, losing DOM identity and any focus the button holds. The
 * tooltip is therefore visibility-controlled — it reports hover and focus
 * requests through `onVisibleChange`, and the render forces it hidden while
 * `hideTooltip` is set.
 *
 * @param state - resolved trigger state
 * @returns the icon-only trigger button inside its label tooltip
 */
export function renderAppLauncherTrigger(
  state: AppLauncherTriggerState
): ReactElement {
  return (
    <Tooltip
      content={state.label}
      relationship="label"
      visible={state.hideTooltip ? false : state.tooltipVisible}
      onVisibleChange={state.onTooltipVisibleChange}
    >
      <Button
        {...state.rootProps}
        appearance={state.appearance}
        shape={state.shape}
        size={state.size}
        aria-label={state.label}
        icon={state.icon}
        ref={state.buttonRef}
      />
    </Tooltip>
  );
}
