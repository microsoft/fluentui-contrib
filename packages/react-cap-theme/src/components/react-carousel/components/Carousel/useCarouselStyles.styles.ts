import {
  carouselButtonClassNames,
  carouselCardClassNames,
  carouselSliderClassNames,
  carouselViewportClassNames,
} from '@fluentui/react-carousel';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { CarouselState } from './Carousel.types';

const NAV_HEIGHT = 28;

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    [`& .${carouselSliderClassNames.root}`]: {
      borderRadius: tokens.borderRadiusXLarge,
    },
  },
  'inline-expanded': {
    [`& .${carouselViewportClassNames.root}`]: {
      marginBottom: `calc(${tokens.spacingHorizontalM} + ${NAV_HEIGHT}px)`,
    },
    [`& .${carouselCardClassNames.root}`]: {
      boxSizing: 'border-box',
      padding: `0 calc(${tokens.spacingHorizontalM} * 2 + ${NAV_HEIGHT}px)`,
    },
    [`& .${carouselButtonClassNames.root}`]: {
      top: `calc(50% - ${NAV_HEIGHT / 2}px)`,
    },
  },
});

export const useCarouselStyles = (state: CarouselState): CarouselState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    state.layout === 'inline-expanded' && styles['inline-expanded'],
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
