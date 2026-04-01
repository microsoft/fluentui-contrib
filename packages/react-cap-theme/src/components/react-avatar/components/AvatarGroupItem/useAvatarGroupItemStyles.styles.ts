import { useAvatarGroupItemStyles_unstable } from '@fluentui/react-avatar';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { AvatarGroupItemState } from './AvatarGroupItem.types';

const useStackStyles = makeStyles({
  thin: {
    boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorNeutralStrokeOnBrand}`,
  },
  thick: {
    boxShadow: `0 0 0 ${tokens.strokeWidthThick} ${tokens.colorNeutralStrokeOnBrand}`,
  },
  thicker: {
    boxShadow: `0 0 0 ${tokens.strokeWidthThicker} ${tokens.colorNeutralStrokeOnBrand}`,
  },
  thickest: {
    boxShadow: `0 0 0 ${tokens.strokeWidthThickest} ${tokens.colorNeutralStrokeOnBrand}`,
  },
});

export const useAvatarGroupItemStyles = (
  state: AvatarGroupItemState
): AvatarGroupItemState => {
  const stackStyles = useStackStyles();
  let rootStackClass = '';

  if (state.size && state.layout === 'stack' && !state.isOverflowItem) {
    switch (state.size) {
      case 16:
        rootStackClass = stackStyles.thin;
        break;
      case 20:
      case 24:
      case 28:
      case 32:
        rootStackClass = stackStyles.thick;
        break;
      case 36:
      case 40:
      case 48:
      case 56:
        rootStackClass = stackStyles.thicker;
        break;
      case 64:
      case 72:
      case 96:
      case 120:
      case 128:
        rootStackClass = stackStyles.thickest;
        break;
      default:
        rootStackClass = stackStyles.thick;
        break;
    }
  }

  state.root.className = mergeClasses(
    state.root.className,
    rootStackClass,
    getSlotClassNameProp_unstable(state.root)
  );
  return useAvatarGroupItemStyles_unstable(state);
};
