import {
  useMenuButtonStyles as useCapMenuButtonStyles,
  type MenuButtonState,
  type ButtonState,
} from '../../../../../components/react-button';
import { useTeamsButtonStyles } from '../Button/useButtonStyles.styles';

export const useTeamsMenuButtonStyles = (
  state: MenuButtonState
): MenuButtonState => {
  useCapMenuButtonStyles(state);
  useTeamsButtonStyles(state as unknown as ButtonState);
  return state;
};
