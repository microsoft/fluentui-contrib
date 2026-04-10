import type { CarouselNavImageButtonState } from '@fluentui/react-carousel';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

const useStyles = makeStyles({
  root: { borderRadius: tokens.borderRadiusXLarge, margin: 0 },
});

export const useCarouselNavImageButtonStyles = (
  state: CarouselNavImageButtonState
): CarouselNavImageButtonState => {
  const classes = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    classes.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
