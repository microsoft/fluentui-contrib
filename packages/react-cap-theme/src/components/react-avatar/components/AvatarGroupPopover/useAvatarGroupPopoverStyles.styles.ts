import {
  useAvatarGroupPopoverStyles_unstable,
  type AvatarGroupPopoverState as FluentAvatarGroupPopoverState,
} from '@fluentui/react-avatar';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { AvatarGroupPopoverState } from './AvatarGroupPopover.types';

const useTriggerButtonStyles = makeStyles({
  thin: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  thick: {
    border: `${tokens.strokeWidthThick} solid ${tokens.colorNeutralStroke2}`,
  },
  thicker: {
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralStroke2}`,
  },
  thickest: {
    border: `${tokens.strokeWidthThickest} solid ${tokens.colorNeutralStroke2}`,
  },
});

export const useAvatarGroupPopoverStyles = (
  state: AvatarGroupPopoverState
): AvatarGroupPopoverState => {
  const triggerButtonStyles = useTriggerButtonStyles();

  if (state.size) {
    let borderClass = '';
    switch (state.size) {
      case 16:
        borderClass = triggerButtonStyles.thin;
        break;
      case 20:
      case 24:
      case 28:
      case 32:
        borderClass = triggerButtonStyles.thick;
        break;
      case 36:
      case 40:
      case 48:
      case 56:
        borderClass = triggerButtonStyles.thicker;
        break;
      case 64:
      case 72:
      case 96:
      case 120:
      case 128:
        borderClass = triggerButtonStyles.thickest;
        break;
      default:
        borderClass = triggerButtonStyles.thick;
        break;
    }
    state.triggerButton.className = mergeClasses(
      state.triggerButton.className,
      borderClass,
      getSlotClassNameProp_unstable(state.triggerButton)
    );
  }

  useAvatarGroupPopoverStyles_unstable(state as FluentAvatarGroupPopoverState);
  return state;
};
