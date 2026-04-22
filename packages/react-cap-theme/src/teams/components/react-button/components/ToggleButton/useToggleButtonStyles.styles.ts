import {
  useToggleButtonStyles as useCapToggleButtonStyles,
  type ToggleButtonState,
  type ButtonState,
} from '../../../../../components/react-button';
import { useTeamsButtonStyles } from '../Button/useButtonStyles.styles';

export const useTeamsToggleButtonStyles = (
  state: ToggleButtonState
): ToggleButtonState => {
  useCapToggleButtonStyles(state);
  useTeamsButtonStyles(state as unknown as ButtonState);
  return state;
};
