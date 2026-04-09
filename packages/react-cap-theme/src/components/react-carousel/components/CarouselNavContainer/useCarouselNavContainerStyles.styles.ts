import { useCarouselNavContainerStyles_unstable } from '@fluentui/react-carousel';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import type {
  CarouselNavContainerState,
  FluentCarouselNavContainerState,
} from './CarouselNavContainer.types';

const useStyles = makeStyles({
  inline: {},
  'inline-expanded': {},
  'inline-wide': {},
  overlay: {},
  'overlay-expanded': { bottom: tokens.spacingVerticalM },
  'overlay-wide': { padding: `0 ${tokens.spacingHorizontalM}` },
  expanded: {
    height: 'auto', // Ensure bottom spacing doesn't increase height
    top: 0,
    '> div': {
      bottom: tokens.spacingVerticalXXS, // Vertically center with autoplay button
    },
  },
});

const useButtonStyles = makeStyles({
  base: {
    borderRadius: tokens.borderRadiusXLarge,
    maxHeight: '28px',
    maxWidth: '28px',
    minHeight: '28px',
    minWidth: '28px',
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
  },
  autoplay: { marginRight: tokens.spacingHorizontalS },
  inline: {},
  'inline-expanded': {},
  'inline-wide': {},
  overlay: { backgroundColor: tokens.colorNeutralBackgroundAlpha },
  'overlay-expanded': { backgroundColor: tokens.colorNeutralBackgroundAlpha },
  'overlay-wide': { backgroundColor: tokens.colorNeutralBackgroundAlpha },
  autoPlayExpanded: { marginBottom: 0 },
  autoplayOverlayWide: { marginLeft: 0 },
  prevOverlayWide: { marginLeft: 0 },
  nextOverlayWide: { marginRight: 0 },
});

export const useCarouselNavContainerStyles = (
  state: CarouselNavContainerState
): CarouselNavContainerState => {
  const { baseLayout, layout } = state;
  const isExpanded =
    layout === 'inline-expanded' || layout === 'overlay-expanded';
  const classes = useStyles();
  const buttonClasses = useButtonStyles();

  state.root.className = mergeClasses(
    state.root.className,
    classes[layout],
    isExpanded && classes.expanded,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.autoplay) {
    state.autoplay.className = mergeClasses(
      state.autoplay.className,
      buttonClasses.base,
      buttonClasses.autoplay,
      buttonClasses[layout],
      isExpanded && buttonClasses.autoPlayExpanded,
      layout === 'overlay-wide' && buttonClasses.autoplayOverlayWide,
      getSlotClassNameProp_unstable(state.autoplay)
    );
  }
  if (state.prev) {
    state.prev.className = mergeClasses(
      state.prev.className,
      buttonClasses.base,
      buttonClasses[layout],
      layout === 'overlay-wide' && buttonClasses.prevOverlayWide,
      getSlotClassNameProp_unstable(state.prev)
    );
  }
  if (state.next) {
    state.next.className = mergeClasses(
      state.next.className,
      buttonClasses.base,
      buttonClasses[layout],
      layout === 'overlay-wide' && buttonClasses.nextOverlayWide,
      getSlotClassNameProp_unstable(state.next)
    );
  }

  return {
    ...useCarouselNavContainerStyles_unstable({
      ...state,
      layout: baseLayout,
    } as FluentCarouselNavContainerState),
    baseLayout,
    layout,
  };
};
