import {
  useMenuButtonStyles as capUseMenuButtonStyles,
  type MenuButtonState,
} from '@fluentui-contrib/react-cap-theme/react-button';
import { mergeClasses } from '@griffel/react';
import {
  useRootIconOnlySizeStyles,
  useRootSizeStyles,
} from '../Button/useButtonStyles.styles';

export const useMenuButtonStyles = (
  state: MenuButtonState
): MenuButtonState => {
  const rootSizeStyles = useRootSizeStyles();
  const rootIconOnlySizeStyles = useRootIconOnlySizeStyles();

  capUseMenuButtonStyles(state);

  state.root.className = mergeClasses(
    state.root.className,
    state.iconOnly
      ? rootIconOnlySizeStyles[state.size]
      : rootSizeStyles[state.size as keyof typeof rootSizeStyles]
  );

  return state;
};
