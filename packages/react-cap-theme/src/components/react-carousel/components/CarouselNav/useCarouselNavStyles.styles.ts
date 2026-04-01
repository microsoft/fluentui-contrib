import { useCarouselNavStyles_unstable } from '@fluentui/react-carousel';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { CarouselNavState } from './CarouselNav.types';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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

  return useCarouselNavStyles_unstable(state) as CarouselNavState;
};
