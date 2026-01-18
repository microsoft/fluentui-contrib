'use client';

import {
  tokens,
  typographyStyles,
  makeStyles,
} from '@fluentui/react-components';
import { mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-components';
import type {
  PopoverSurfaceSlots,
  PopoverSurfaceState,
} from './PopoverSurface.types';

export const popoverSurfaceClassNames: SlotClassNames<PopoverSurfaceSlots> = {
  root: 'fui-PopoverSurface',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorTransparentStroke}`,
    ...typographyStyles.body1,
    padding: '16px',

    // TODO need to add versions of tokens.alias.shadow.shadow16, etc. that work with filter
    filter:
      `drop-shadow(0 0 2px ${tokens.colorNeutralShadowAmbient}) ` +
      `drop-shadow(0 8px 16px ${tokens.colorNeutralShadowKey})`,
  },

  // Base anchor positioning styles
  anchorPositioned: {
    // Override browser default popover styles that center it in viewport
    inset: 'unset',
    margin: '0',
    // Position using CSS Anchor Positioning API (when supported)
    positionAnchor: 'var(--popover-anchor-name)',
    // Ensure popover is not clipped
    maxWidth: 'calc(100vw - 16px)',
    maxHeight: 'calc(100vh - 16px)',
    overflowY: 'auto',
  },

  // BELOW positions
  below: {
    top: 'calc(anchor(bottom) + 8px)',
    left: 'anchor(center)',
    marginLeft: 'calc(-1 * anchor-size(self-inline) / 2)',
    positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline',
  },
  belowStart: {
    top: 'calc(anchor(bottom) + 8px)',
    left: 'anchor(left)',
    positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline',
  },
  belowEnd: {
    top: 'calc(anchor(bottom) + 8px)',
    right: 'anchor(right)',
    positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline',
  },

  // ABOVE positions
  above: {
    bottom: 'calc(anchor(top) + 8px)',
    left: 'anchor(center)',
    marginLeft: 'calc(-1 * anchor-size(self-inline) / 2)',
    positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline',
  },
  aboveStart: {
    bottom: 'calc(anchor(top) + 8px)',
    left: 'anchor(left)',
    positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline',
  },
  aboveEnd: {
    bottom: 'calc(anchor(top) + 8px)',
    right: 'anchor(right)',
    positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline',
  },

  // AFTER positions (right in LTR)
  after: {
    left: 'calc(anchor(right) + 8px)',
    top: 'anchor(center)',
    marginTop: 'calc(-1 * anchor-size(self-block) / 2)',
    positionTryFallbacks: 'flip-inline, flip-block, flip-block flip-inline',
  },
  afterTop: {
    left: 'calc(anchor(right) + 8px)',
    top: 'anchor(top)',
    positionTryFallbacks: 'flip-inline, flip-block, flip-block flip-inline',
  },
  afterBottom: {
    left: 'calc(anchor(right) + 8px)',
    bottom: 'anchor(bottom)',
    positionTryFallbacks: 'flip-inline, flip-block, flip-block flip-inline',
  },

  // BEFORE positions (left in LTR)
  before: {
    right: 'calc(anchor(left) + 8px)',
    top: 'anchor(center)',
    marginTop: 'calc(-1 * anchor-size(self-block) / 2)',
    positionTryFallbacks: 'flip-inline, flip-block, flip-block flip-inline',
  },
  beforeTop: {
    right: 'calc(anchor(left) + 8px)',
    top: 'anchor(top)',
    positionTryFallbacks: 'flip-inline, flip-block, flip-block flip-inline',
  },
  beforeBottom: {
    right: 'calc(anchor(left) + 8px)',
    bottom: 'anchor(bottom)',
    positionTryFallbacks: 'flip-inline, flip-block, flip-block flip-inline',
  },

  inline: {
    // When rendering inline, the PopoverSurface will be rendered under relatively positioned elements such as Input.
    // This is due to the surface being positioned as absolute, therefore zIndex: 1 ensures that won't happen.
    zIndex: 1,
  },

  inverted: {
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundStaticInverted,
  },

  brand: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
});

/**
 * Apply styling to the PopoverSurface slots based on the state
 */
export const usePopoverSurfaceStyles_unstable = (
  state: PopoverSurfaceState
): PopoverSurfaceState => {
  'use no memo';

  const styles = useStyles();

  // Determine position style to apply based on PositioningShorthandValue
  const position = state.positioning || 'below';

  const positionStyleMap = {
    above: styles.above,
    'above-start': styles.aboveStart,
    'above-end': styles.aboveEnd,
    below: styles.below,
    'below-start': styles.belowStart,
    'below-end': styles.belowEnd,
    after: styles.after,
    'after-top': styles.afterTop,
    'after-bottom': styles.afterBottom,
    before: styles.before,
    'before-top': styles.beforeTop,
    'before-bottom': styles.beforeBottom,
  } as const;

  const positionStyle = positionStyleMap[position] || styles.below;

  state.root.className = mergeClasses(
    popoverSurfaceClassNames.root,
    styles.root,
    styles.anchorPositioned,
    positionStyle,
    state.inline && styles.inline,
    state.appearance === 'inverted' && styles.inverted,
    state.appearance === 'brand' && styles.brand,
    state.root.className
  );

  return state;
};
