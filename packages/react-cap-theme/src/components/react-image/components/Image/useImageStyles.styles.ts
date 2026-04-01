import {
  type ImageState,
  useImageStyles_unstable,
} from '@fluentui/react-image';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useRootStyles = makeStyles({
  circular: {
    /** same as base */
  },
  rounded: {
    borderRadius: tokens.borderRadius2XLarge,
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

  return useImageStyles_unstable(state);
}
