import {
  type CarouselNavButtonState,
  useCarouselNavButtonStyles_unstable,
} from '@fluentui/react-carousel';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  brand: { '::after': { backgroundColor: tokens.colorBrandForeground2 } },
});
const useUnSelectedStyles = makeStyles({
  brand: { '::after': { opacity: 0.3 } },
});

export const useCarouselNavButtonStyles = (
  state: CarouselNavButtonState
): CarouselNavButtonState => {
  const classes = useStyles();
  const unSelectedClasses = useUnSelectedStyles();

  state.root.className = mergeClasses(
    state.root.className,
    state.appearance === 'brand' && classes.brand,
    !state.selected && state.appearance === 'brand' && unSelectedClasses.brand,
    getSlotClassNameProp_unstable(state.root)
  );
  return useCarouselNavButtonStyles_unstable(state);
};
