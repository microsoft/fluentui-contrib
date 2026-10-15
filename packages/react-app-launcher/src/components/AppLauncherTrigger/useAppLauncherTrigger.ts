import type { ButtonProps, TooltipProps } from '@fluentui/react-components';
import { GridDots20Regular } from '@fluentui/react-icons';
import type { ReactElement, Ref } from 'react';
import { createElement, useState } from 'react';
import type { AppLauncherTriggerProps } from './AppLauncherTrigger.types';

/**
 * State that {@link renderAppLauncherTrigger} renders.
 */
export type AppLauncherTriggerState = {
  /** Resolved accessible name and tooltip text. */
  label: string;
  /** Resolved icon element. */
  icon: ReactElement;
  /** Resolved visual style of the button. */
  appearance: ButtonProps['appearance'];
  /** Resolved button size. */
  size: ButtonProps['size'];
  /** Resolved button shape. */
  shape: ButtonProps['shape'];
  /** Whether the tooltip is hidden. */
  hideTooltip: boolean;
  /**
   * Whether the tooltip wants to be visible, as reported by its hover and
   * focus handling. The trigger controls the tooltip's `visible` prop so it
   * can be suppressed without leaving the tree; this mirror keeps the usual
   * behavior while it is not suppressed.
   */
  tooltipVisible: boolean;
  /** Records tooltip visibility requests; passed to the tooltip. */
  onTooltipVisibleChange: NonNullable<TooltipProps['onVisibleChange']>;
  /** Remaining native button props forwarded to the root element. */
  rootProps: Omit<
    AppLauncherTriggerProps,
    'appearance' | 'hideTooltip' | 'icon' | 'label' | 'shape' | 'size'
  >;
  /** Ref to the root button element. */
  buttonRef: Ref<HTMLButtonElement>;
};

/**
 * Resolves the trigger props into render state.
 *
 * All defaulting happens here so that rendering stays declarative: `label`
 * falls back to `'App launcher'`, the icon falls back to the waffle glyph,
 * `appearance` falls back to `'subtle'`, the borderless style used in
 * application headers, and the tooltip is shown unless `hideTooltip` is set.
 * Everything else is passed through unchanged.
 *
 * The tooltip visibility is controlled rather than left to the tooltip
 * itself: hiding the tooltip by removing it would also replace the button
 * element in the DOM, so instead the trigger mirrors every visibility change
 * the tooltip requests and forces it hidden while `hideTooltip` is set.
 *
 * @param props - props from this instance of the trigger
 * @param ref - ref to the root button element
 * @returns the state consumed by {@link renderAppLauncherTrigger}
 */
export function useAppLauncherTrigger(
  props: AppLauncherTriggerProps,
  ref: Ref<HTMLButtonElement>
): AppLauncherTriggerState {
  const {
    appearance = 'subtle',
    hideTooltip = false,
    icon,
    label = 'App launcher',
    shape,
    size,
    ...rootProps
  } = props;

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleTooltipVisibleChange: NonNullable<
    TooltipProps['onVisibleChange']
  > = (_event, data) => {
    setTooltipVisible(data.visible);
  };

  return {
    label,
    icon: icon ?? createElement(GridDots20Regular),
    appearance,
    size,
    shape,
    hideTooltip,
    tooltipVisible,
    onTooltipVisibleChange: handleTooltipVisibleChange,
    rootProps,
    buttonRef: ref,
  };
}
