import { useToggleState } from '@fluentui/react-button';
import { useButton } from '../../Button';

import type {
  ToggleButtonProps,
  ToggleButtonState,
} from './ToggleButton.types';

export const useToggleButton = (
  props: ToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>
): ToggleButtonState => {
  const buttonState = useButton(props, ref) as ToggleButtonState;
  return useToggleState(props, buttonState) as ToggleButtonState;
};
