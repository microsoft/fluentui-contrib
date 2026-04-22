import {
  useMenuButtonStyles as useCapMenuButtonStyles,
  type MenuButtonState,
  type ButtonState,
} from '../../../../../components/react-button';
import { useButtonStyles } from '../Button/useButtonStyles.styles';

export const useMenuButtonStyles = (
  state: MenuButtonState
): MenuButtonState => {
  useCapMenuButtonStyles(state);
  useButtonStyles(state as unknown as ButtonState);
  return state;
};
