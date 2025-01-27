import { useEffect } from 'react';
import {
  UseArrowNavigationGroupOptions,
  useFluent,
  useFocusFinders,
} from '@fluentui/react-components';
import {
  TabsterDOMAttribute,
  TabsterTypes,
  useArrowNavigationGroup,
  useFocusableGroup,
  useMergedTabsterAttributes_unstable,
} from '@fluentui/react-tabster';
import { initGamepadNavigation } from '../core/GamepadNavigation';

/**
 * Options to configure gamepad navigation, extends UseArrowNavigationGroupOptions
 */
export type UseGamepadNavigationGroupOptions =
  Partial<UseArrowNavigationGroupOptions> & {
    /**
     * Focus will navigate vertically, horizontally or in both directions (grid).
     * @defaultValue grid
     */
    axis?: 'vertical' | 'horizontal' | 'grid' | 'grid-linear' | 'both';

    /**
     * Focus will cycle to the first/last elements of the group without stopping.
     * @defaultValue true
     */
    circular?: boolean;

    /**
     * First focusable element in the group will be focused when the group is focused for the first time.
     * @defaultValue false
     */
    focusFirstElement?: boolean;

    /**
     * Last focused element in the group will be remembered and focused (if still
     * available) when tabbing from outside of the group.
     * @defaultValue true
     */
    memorizeCurrent?: boolean;

    /**
     * Allow tabbing within the arrow navigation group items.
     * @defaultValue true
     */
    tabbable?: boolean;

    /**
     * Behavior for the Tab key.
     * @defaultValue 'limited-trap-focus'
     */
    tabBehavior?: 'unlimited' | 'limited' | 'limited-trap-focus';

    /**
     * Tabster can ignore default handling of keydown events.
     */
    ignoreDefaultKeydown?: TabsterTypes.FocusableProps['ignoreKeydown'];
  };

/**
 * A hook that returns the necessary tabster attributes to support gamepad navigation
 * @param options - Options to configure keyboard navigation
 */
export const useGamepadNavigationGroup = (
  option: UseGamepadNavigationGroupOptions = {}
): TabsterDOMAttribute => {
  const {
    axis = 'grid',
    circular = false,
    focusFirstElement = true,
    memorizeCurrent = true,
    tabbable = true,
    tabBehavior = 'limited-trap-focus',
    ignoreDefaultKeydown = {},
  } = option;
  const { findFirstFocusable } = useFocusFinders();
  const { targetDocument } = useFluent();
  const gpnProps = { targetDocument };

  useEffect(() => {
    if (focusFirstElement) {
      findFirstFocusable(targetDocument?.activeElement as HTMLElement)?.focus();
    }
    initGamepadNavigation(gpnProps);
  }, []);

  const moverAttr = useArrowNavigationGroup({
    axis,
    circular,
    memorizeCurrent,
    tabbable,
  });
  const groupperAttr = useFocusableGroup({ tabBehavior, ignoreDefaultKeydown });

  return useMergedTabsterAttributes_unstable(moverAttr, groupperAttr);
};
