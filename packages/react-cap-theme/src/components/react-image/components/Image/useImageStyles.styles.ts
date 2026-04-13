import { type ImageState } from '@fluentui/react-image';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/tokens';
import { capTokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

const useRootStyles = makeStyles({
  circular: {
    /** same as base */
  },
  rounded: {
    borderRadius: capTokens.borderRadius2XLarge,
  },
  square: {
    /** same as base */
  },
});

export function useImageStyles(state: ImageState): ImageState {
  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(
    state.root.className,
    rootStyles[state.shape],
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
}
