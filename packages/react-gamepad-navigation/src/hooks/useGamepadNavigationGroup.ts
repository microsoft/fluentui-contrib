import * as React from 'react';
import { useFluent } from '@fluentui/react-components';
import {
  type TabsterDOMAttribute,
  type UseArrowNavigationGroupOptions,
  useArrowNavigationGroup,
  useFocusableGroup,
  UseFocusableGroupOptions,
  useFocusFinders,
  useMergedTabsterAttributes_unstable,
} from '@fluentui/react-tabster';
import {
  type GamepadNavigationOptions,
  useGamepadNavigation,
} from './useGamepadNavigation';

/**
 * Options to configure gamepad navigation, extends UseArrowNavigationGroupOptions
 */
export type UseGamepadNavigationGroupOptions =
  Partial<UseArrowNavigationGroupOptions> &
    Partial<UseFocusableGroupOptions> &
    Partial<GamepadNavigationOptions> & {
      /**
       * First focusable element in the group will be focused when the group is focused for the first time.
       * @defaultValue false
       */
      focusFirstElement?: boolean;
    };

/**
 * A hook that returns the necessary tabster attributes to support gamepad navigation
 * @param options - Options to configure keyboard navigation
 * @returns - The tabster attributes to apply to the group and a function to remove the event listeners
 */
export const useGamepadNavigationGroup = (
  options: UseGamepadNavigationGroupOptions = {}
): {
  gamepadNavDOMAttributes: TabsterDOMAttribute;
  removeGamepadNavEventListeners: () => void;
} => {
  const {
    axis = 'grid',
    circular = false,
    focusFirstElement,
    memorizeCurrent = true,
    tabbable = true,
    tabBehavior = 'limited-trap-focus',
    ignoreDefaultKeydown = {},
    unstable_hasDefault,
    defaultInputMode,
    pollingEnabled,
  } = options;
  const { findFirstFocusable } = useFocusFinders();
  const { targetDocument } = useFluent();
  const gpnOptions = {
    defaultInputMode,
    pollingEnabled,
  };

  React.useEffect(() => {
    if (focusFirstElement) {
      findFirstFocusable(targetDocument?.activeElement as HTMLElement)?.focus();
    }
  }, []);

  const groupperDOMAttribute = useFocusableGroup({
    tabBehavior,
    ignoreDefaultKeydown,
  });
  const moverDOMAttribute = useArrowNavigationGroup({
    axis,
    circular,
    memorizeCurrent,
    tabbable,
    ignoreDefaultKeydown,
    unstable_hasDefault,
  });
  const gamepadNavDOMAttributes = useMergedTabsterAttributes_unstable(
    groupperDOMAttribute,
    moverDOMAttribute
  );
  const removeGamepadNavEventListeners = useGamepadNavigation(gpnOptions);

  return {
    gamepadNavDOMAttributes,
    removeGamepadNavEventListeners,
  };
};
