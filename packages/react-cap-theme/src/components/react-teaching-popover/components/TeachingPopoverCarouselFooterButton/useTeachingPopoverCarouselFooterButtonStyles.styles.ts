import { useButtonStyles } from '../../../react-button';
import { mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterButtonState } from './TeachingPopoverCarouselFooterButton.types';

export const useTeachingPopoverCarouselFooterButtonStyles = (
  state: TeachingPopoverCarouselFooterButtonState
): TeachingPopoverCarouselFooterButtonState => {
  useButtonStyles(state);
  state.root.className = mergeClasses(
    state.root.className,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
