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
import { useGamepadNavigation } from './useGamepadNavigation';

/**
 * Options to configure gamepad navigation, extends UseArrowNavigationGroupOptions
 */
export type UseGamepadNavigationGroupOptions =
  Partial<UseArrowNavigationGroupOptions> &
    Partial<UseFocusableGroupOptions> & {
      /**
       * First focusable element in the group will be focused when the group is focused for the first time.
       * @defaultValue false
       */
      focusFirstElement?: boolean;
    };

/**
 * A hook that returns the necessary tabster attributes to support gamepad navigation
 * @param options - Options to configure keyboard navigation
 */
export const useGamepadNavigationGroup = (
  options: UseGamepadNavigationGroupOptions = {}
): TabsterDOMAttribute => {
  const {
    axis = 'grid',
    circular = false,
    focusFirstElement = true,
    memorizeCurrent = true,
    tabbable = true,
    tabBehavior = 'limited-trap-focus',
    ignoreDefaultKeydown = {},
    unstable_hasDefault,
  } = options;
  const focusFinderFns = useFocusFinders();
  const { targetDocument } = useFluent();
  const gpnProps = {
    targetDocument,
  };
  console.log('window', targetDocument?.defaultView?.name);

  useGamepadNavigation(gpnProps);

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

  return useMergedTabsterAttributes_unstable(moverAttr, groupperAttr);
};
