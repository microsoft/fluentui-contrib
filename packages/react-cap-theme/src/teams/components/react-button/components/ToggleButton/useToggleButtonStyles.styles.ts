import {
  useToggleButtonStyles as capUseToggleButtonStyles,
  type ToggleButtonState,
} from '@fluentui-contrib/react-cap-theme/react-button';
import { mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import {
  useRootIconOnlySizeStyles,
  useRootSizeStyles,
} from '../Button/useButtonStyles.styles';

export const useToggleButtonStyles = (
  state: ToggleButtonState
): ToggleButtonState => {
  const rootSizeStyles = useRootSizeStyles();
  const rootIconOnlySizeStyles = useRootIconOnlySizeStyles();

  capUseToggleButtonStyles(state);

  state.root.className = mergeClasses(
    state.root.className,
    state.iconOnly
      ? rootIconOnlySizeStyles[state.size]
      : rootSizeStyles[state.size],
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
