import {
  UseArrowNavigationGroupOptions,
  useFluent,
  useFocusFinders,
} from '@fluentui/react-components';
import { useEffect } from 'react';
import {
  TabsterDOMAttribute,
  useArrowNavigationGroup,
} from '@fluentui/react-tabster';
import { initGamepadNavigation } from '../core/GamepadNavigation';

export type UseGamepadNavigationGroupOptions =
  Partial<UseArrowNavigationGroupOptions> & {
    /**
     * Focus will navigate vertically, horizontally or in both directions (grid), defaults to horizontally
     * @defaultValue grid
     */
    axis?: 'vertical' | 'horizontal' | 'grid' | 'grid-linear' | 'both';
    /**
     * Focus will cycle to the first/last elements of the group without stopping
     * @defaultValue false
     */
    circular?: boolean;
    /**
     * Last focused element in the group will be remembered and focused (if still
     * available) when tabbing from outside of the group
     * @default true
     */
    memorizeCurrent?: boolean;
    /**
     * Allow tabbing within the arrow navigation group items.
     * @defaultValue true
     */
    tabbable?: boolean;
  };

/**
 * A hook that returns the necessary tabster attributes to support gamepad navigation
 * @param options - Options to configure keyboard navigation
 */
export const userGamepadNavigationGroup = (
  option: UseGamepadNavigationGroupOptions = {}
): TabsterDOMAttribute => {
  const {
    axis = 'grid',
    circular = false,
    memorizeCurrent = true,
    tabbable = true,
  } = option;
  const { findFirstFocusable } = useFocusFinders();
  const { targetDocument } = useFluent();

  const gpnProps = { targetDocument };
  // TODO: handle gamepad navigation
  useEffect(() => {
    // we shuld only initialize once, but we need to wait for the targetDocument to be set
    findFirstFocusable(targetDocument?.activeElement as HTMLElement)?.focus();
    initGamepadNavigation(gpnProps);
  }, []);

  return useArrowNavigationGroup({ axis, circular, memorizeCurrent, tabbable });
};
