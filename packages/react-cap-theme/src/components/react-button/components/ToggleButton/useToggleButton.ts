import { useToggleState } from '@fluentui/react-button';
import { useButton } from '../Button/useButton';

import type {
  ToggleButtonProps,
  ToggleButtonState,
} from '../../../../customStyleHooks/react-button';

export const useToggleButton = (
  props: ToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>
): ToggleButtonState => {
  const buttonState = useButton(props, ref) as ToggleButtonState;
  return useToggleState(props, buttonState) as ToggleButtonState;
};
