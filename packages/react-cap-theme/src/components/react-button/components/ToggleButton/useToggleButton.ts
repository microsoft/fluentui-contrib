import {
  useToggleState,
  useButton_unstable,
  ButtonProps as BaseButtonProps,
} from '@fluentui/react-button';

import type {
  ToggleButtonProps,
  ToggleButtonState,
} from './ToggleButton.types';

export const useToggleButton = (
  props: ToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>
): ToggleButtonState => {
  const buttonState = useButton_unstable(props as BaseButtonProps, ref);
  return useToggleState(props, buttonState);
};
