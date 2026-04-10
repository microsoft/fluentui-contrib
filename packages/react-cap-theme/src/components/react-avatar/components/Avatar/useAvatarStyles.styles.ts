import { type AvatarState } from '@fluentui/react-avatar';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

const useSquareStyles = makeStyles({
  medium: { borderRadius: tokens.borderRadiusMedium },
  large: { borderRadius: tokens.borderRadiusLarge },
  xLarge: { borderRadius: tokens.borderRadiusXLarge },
});

export const useAvatarStyles = (state: AvatarState): AvatarState => {
  const squareStyles = useSquareStyles();

  let rootSquareStyles: string | undefined;
  if (state.shape === 'square') {
    switch (state.size) {
      case 16:
        rootSquareStyles = squareStyles.medium;
        break;
      case 20:
      case 24:
      case 28:
        rootSquareStyles = squareStyles.large;
        break;
      case 32:
      case 36:
      case 40:
      case 48:
      case 56:
      case 64:
      case 72:
      case 96:
      case 120:
      case 128:
        rootSquareStyles = squareStyles.xLarge;
        break;
    }
  }

  state.root.className = mergeClasses(
    state.root.className,
    rootSquareStyles,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
