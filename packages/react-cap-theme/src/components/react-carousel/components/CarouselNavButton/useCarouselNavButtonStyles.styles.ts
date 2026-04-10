import { type CarouselNavButtonState } from '@fluentui/react-carousel';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

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
  return state;
};
