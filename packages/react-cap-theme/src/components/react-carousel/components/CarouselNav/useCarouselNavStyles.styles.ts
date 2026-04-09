import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { CarouselNavState } from './CarouselNav.types';

const useStyles = makeStyles({
  root: {
    margin: `auto ${tokens.spacingHorizontalM}`,
    maxHeight: 'fit-content',
  },
  compact: {},
  comfortable: { gap: tokens.spacingHorizontalM },
});

export const useCarouselNavStyles = (
  state: CarouselNavState
): CarouselNavState => {
  const { density } = state;
  const classes = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    classes[density],
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
