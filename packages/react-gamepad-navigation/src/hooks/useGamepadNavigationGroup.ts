import {
  useArrowNavigationGroup,
  UseArrowNavigationGroupOptions,
} from '@fluentui/react-components';
import { Types } from 'tabster';

export type UseGamepadNavigationGroupOptions = UseArrowNavigationGroupOptions;

/**
 * A hook that returns the necessary tabster attributes to support gamepad navigation
 * @param options - Options to configure keyboard navigation
 */
export const userGamepadNavigationGroup = (
  option?: UseArrowNavigationGroupOptions
): Types.TabsterDOMAttribute => {
  option = option || {};
  option.circular = false;
  option.axis = 'grid';

  // TODO: handle gamepad navigation

  return useArrowNavigationGroup(option);
};
