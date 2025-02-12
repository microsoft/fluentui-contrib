import { useEffect } from 'react';
import {
  UseArrowNavigationGroupOptions,
  useFluent,
  useFocusFinders,
} from '@fluentui/react-components';
import {
  TabsterDOMAttribute,
  useArrowNavigationGroup,
  useFocusableGroup,
  UseFocusableGroupOptions,
  useMergedTabsterAttributes_unstable,
} from '@fluentui/react-tabster';
import {
  GamepadNavigationOptions,
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
  gamepadNavAttributes: TabsterDOMAttribute;
  removeNavEventListeners: () => void;
} => {
  const {
    axis = 'grid',
    circular = false,
    focusFirstElement = true,
    memorizeCurrent = true,
    tabbable = true,
    tabBehavior = 'limited-trap-focus',
    ignoreDefaultKeydown = {},
    unstable_hasDefault,
    defaultInputMode,
    pollingEnabled,
  } = options;
  const focusFinderFns = useFocusFinders();
  const { targetDocument } = useFluent();
  const gpnProps = {
    defaultInputMode,
    pollingEnabled,
  };

  const removeNavEventListeners = useGamepadNavigation(gpnProps);

  useEffect(() => {
    if (focusFirstElement) {
      focusFinderFns
        .findFirstFocusable(targetDocument?.activeElement as HTMLElement)
        ?.focus();
    }
  }, []);

  const moverAttr = useArrowNavigationGroup({
    axis,
    circular,
    memorizeCurrent,
    tabbable,
    ignoreDefaultKeydown,
    unstable_hasDefault,
  });
  const groupperAttr = useFocusableGroup({ tabBehavior, ignoreDefaultKeydown });

  return {
    gamepadNavAttributes: useMergedTabsterAttributes_unstable(
      moverAttr,
      groupperAttr
    ),
    removeNavEventListeners,
  };
};
