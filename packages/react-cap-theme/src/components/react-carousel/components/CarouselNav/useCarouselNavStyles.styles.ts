import { useCarouselNavStyles_unstable } from '@fluentui/react-carousel';
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

  state.root.className = mergeClasses(classes[density], state.root.className);

  return useCarouselNavStyles_unstable(state) as CarouselNavState;
};
