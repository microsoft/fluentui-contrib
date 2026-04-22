import {
  useToggleButtonStyles as useCapToggleButtonStyles,
  type ToggleButtonState,
  type ButtonState,
} from '../../../../../components/react-button';
import { useButtonStyles } from '../Button/useButtonStyles.styles';

export const useToggleButtonStyles = (
  state: ToggleButtonState
): ToggleButtonState => {
  useCapToggleButtonStyles(state);
  useButtonStyles(state as unknown as ButtonState);
  return state;
};
