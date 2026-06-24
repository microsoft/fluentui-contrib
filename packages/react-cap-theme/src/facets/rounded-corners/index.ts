import { FluentProviderProps } from '@fluentui/react-components';
import { type GriffelStyle, makeStyles, mergeClasses } from '@griffel/react';
import {
  createCustomFocusIndicatorStyle,
  createFocusOutlineStyle,
} from '@fluentui/react-tabster';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/tokens';
import { capTokens } from '../../components/tokens';

import type { AccordionHeaderState } from '@fluentui/react-accordion';
import type { AvatarState } from '@fluentui/react-avatar';
import type { BadgeState } from '@fluentui/react-badge';
import type {
  ButtonState,
  MenuButtonState,
  SplitButtonState,
  ToggleButtonState,
} from '../../components/react-button';
import type { CompoundButtonState } from '@fluentui/react-button';
import type { CardState, CardPreviewState } from '../../components/react-card';
import type { CheckboxState } from '../../components/react-checkbox';
import type {
  ComboboxState,
  DropdownState,
} from '../../components/react-combobox';
import type { DialogSurfaceState } from '@fluentui/react-dialog';
import type { OverlayDrawerState } from '@fluentui/react-drawer';
import type { InlineDrawerState } from '../../components/react-drawer';
import type { ImageState } from '@fluentui/react-image';
import type { InputState } from '../../components/react-input';
import {
  menuItemClassNames,
  type MenuItemState,
  type MenuItemSwitchState,
  type MenuPopoverState,
  type MenuSplitGroupState,
} from '@fluentui/react-menu';
import type { PopoverSurfaceState } from '@fluentui/react-popover';
import type { SearchBoxState } from '../../components/react-search';
import type {
  TagState,
  InteractionTagState,
  InteractionTagPrimaryState,
  InteractionTagSecondaryState,
} from '@fluentui/react-tags';
import type { TabState } from '@fluentui/react-tabs';
import type { ToolbarState } from '../../components/react-toolbar';
import type { TooltipState } from '../../components/react-tooltip';
import type { TeachingPopoverBodyState } from '@fluentui/react-teaching-popover';

/**
 * Every border-radius value used by the CAP theme, in one place.
 *
 * `none`/`small`/`medium`/`large`/`xLarge`/`circular` are stock Fluent radii;
 * `xxLarge`/`xxxLarge`/`xxxxLarge` are the CAP-specific radii (`capTokens`).
 */
export const CAP_BORDER_RADII = {
  none: tokens.borderRadiusNone,
  small: tokens.borderRadiusSmall,
  medium: tokens.borderRadiusMedium,
  large: tokens.borderRadiusLarge,
  xLarge: tokens.borderRadiusXLarge,
  circular: tokens.borderRadiusCircular,
  xxLarge: capTokens.borderRadius2XLarge,
  xxxLarge: capTokens.borderRadius3XLarge,
  xxxxLarge: capTokens.borderRadius4XLarge,
} as const;

const useButtonRadius = makeStyles({
  base: { borderRadius: CAP_BORDER_RADII.xxLarge },
  square: { borderRadius: CAP_BORDER_RADII.none },
  circular: { borderRadius: CAP_BORDER_RADII.circular },
  small: { borderRadius: CAP_BORDER_RADII.xLarge },
  focusBase: createCustomFocusIndicatorStyle({
    borderRadius: CAP_BORDER_RADII.xxLarge,
  }) as unknown as GriffelStyle,
  focusSmall: createCustomFocusIndicatorStyle({
    borderRadius: CAP_BORDER_RADII.xLarge,
  }) as unknown as GriffelStyle,
});

/** Applies the base Button radius (root slot). Shared by the button family. */
const applyButtonRadius = (state: ButtonState): void => {
  const s = useButtonRadius();
  const { shape, size } = state;
  state.root.className = mergeClasses(
    state.root.className,
    s.base,
    s.focusBase,
    size === 'small' && s.small,
    (shape === 'square' || shape === 'circular') && s[shape],
    size === 'small' && s.focusSmall,
    getSlotClassNameProp_unstable(state.root)
  );
};

const useButtonRadiusStyles = (state: ButtonState): ButtonState => {
  applyButtonRadius(state);
  return state;
};

const useCompoundButtonIconRadius = makeStyles({
  small: { borderRadius: CAP_BORDER_RADII.medium },
  medium: { borderRadius: CAP_BORDER_RADII.xLarge },
  large: { borderRadius: CAP_BORDER_RADII.xLarge },
});

const useCompoundButtonRadiusStyles = (
  state: CompoundButtonState
): CompoundButtonState => {
  const iconRadius = useCompoundButtonIconRadius();
  applyButtonRadius(state as unknown as ButtonState);
  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      iconRadius[state.size],
      getSlotClassNameProp_unstable(state.icon)
    );
  }
  return state;
};

const useMenuButtonRadiusStyles = (state: MenuButtonState): MenuButtonState => {
  applyButtonRadius(state as unknown as ButtonState);
  return state;
};

const useToggleButtonRadiusStyles = (
  state: ToggleButtonState
): ToggleButtonState => {
  applyButtonRadius(state as unknown as ButtonState);
  return state;
};

// The split button's sub-buttons are Buttons, so they pick up the base Button
// radius via `useButtonStyles_unstable`. Here we only re-flatten the inner
// corners (which the enlarged base radius would otherwise round).
const useSplitButtonRadius = makeStyles({
  primary: {
    borderTopRightRadius: CAP_BORDER_RADII.none,
    borderBottomRightRadius: CAP_BORDER_RADII.none,
  },
  primaryFocus: createCustomFocusIndicatorStyle({
    borderTopRightRadius: CAP_BORDER_RADII.none,
    borderBottomRightRadius: CAP_BORDER_RADII.none,
  }) as unknown as GriffelStyle,
  menu: {
    borderTopLeftRadius: CAP_BORDER_RADII.none,
    borderBottomLeftRadius: CAP_BORDER_RADII.none,
  },
  menuFocus: createCustomFocusIndicatorStyle({
    borderTopLeftRadius: CAP_BORDER_RADII.none,
    borderBottomLeftRadius: CAP_BORDER_RADII.none,
  }) as unknown as GriffelStyle,
});

const useSplitButtonRadiusStyles = (
  state: SplitButtonState
): SplitButtonState => {
  const s = useSplitButtonRadius();
  if (state.primaryActionButton) {
    state.primaryActionButton.className = mergeClasses(
      state.primaryActionButton.className,
      s.primary,
      s.primaryFocus,
      getSlotClassNameProp_unstable(state.primaryActionButton)
    );
  }
  if (state.menuButton) {
    state.menuButton.className = mergeClasses(
      state.menuButton.className,
      s.menu,
      s.menuFocus,
      getSlotClassNameProp_unstable(state.menuButton)
    );
  }
  return state;
};

// Rounds a field's (Input/Combobox/Dropdown/…) root corners while keeping its
// `:focus-within` bottom border in sync.
//
// That bottom border is drawn by an `::after` pseudo-element whose bottom
// corners Fluent hard-codes to `borderRadiusMedium`, using the radius as the
// element's height so the corner curve has room to render before `clipPath`
// trims it to the bottom 2px. Round only the root and that underline keeps the
// smaller corners and bleeds past the rounded edges on focus. Always set both
// through this helper so the two can never drift apart.
const fieldRadius = (radius: string): GriffelStyle => ({
  borderRadius: radius,
  '::after': {
    height: `max(2px, ${radius})`,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
  },
});

// Input/Combobox/Dropdown share the same radius behaviour:
// base 2XLarge, small XLarge, and a flat (none) radius for the underline
// appearance (both while editable and while disabled).
const useFieldRadius = makeStyles({
  base: fieldRadius(CAP_BORDER_RADII.xxLarge),
  small: fieldRadius(CAP_BORDER_RADII.xLarge),
  underline: fieldRadius(CAP_BORDER_RADII.none),
});

// The radius is identical (`none`) whether the underline is editable or
// disabled, so only appearance + size are needed.
const applyFieldRadius = (
  root: { className?: string },
  appearance: string,
  size: string
): void => {
  const s = useFieldRadius();
  root.className = mergeClasses(
    root.className,
    s.base,
    size === 'small' && s.small,
    appearance === 'underline' && s.underline,
    getSlotClassNameProp_unstable(root as never)
  );
};

const useInputRadiusStyles = (state: InputState): InputState => {
  applyFieldRadius(state.root, state.appearance ?? 'outline', state.size);
  return state;
};

const useComboboxRadiusStyles = (state: ComboboxState): ComboboxState => {
  applyFieldRadius(state.root, state.appearance, state.size);
  return state;
};

const useDropdownRadiusStyles = (state: DropdownState): DropdownState => {
  applyFieldRadius(state.root, state.appearance, state.size);
  return state;
};

const useSurfaceRadius = makeStyles({
  dialogSurface: { borderRadius: CAP_BORDER_RADII.xxxxLarge },
  popoverSurface: { borderRadius: CAP_BORDER_RADII.xxxxLarge },
  card: { borderRadius: CAP_BORDER_RADII.xxxxLarge },
  menuPopover: { borderRadius: CAP_BORDER_RADII.xxLarge },
});

const useDialogSurfaceRadiusStyles = (
  state: DialogSurfaceState
): DialogSurfaceState => {
  const s = useSurfaceRadius();
  state.root.className = mergeClasses(
    state.root.className,
    s.dialogSurface,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

const usePopoverSurfaceRadiusStyles = (
  state: PopoverSurfaceState
): PopoverSurfaceState => {
  const s = useSurfaceRadius();
  state.root.className = mergeClasses(
    state.root.className,
    s.popoverSurface,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

const useCardRadiusStyles = (state: CardState): CardState => {
  const s = useSurfaceRadius();
  // The card's border/focus overlay (`::after`) uses `border-radius: inherit`,
  // so overriding the root radius cascades to it.
  state.root.className = mergeClasses(
    state.root.className,
    s.card,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

const useMenuPopoverRadiusStyles = (
  state: MenuPopoverState
): MenuPopoverState => {
  const s = useSurfaceRadius();
  state.root.className = mergeClasses(
    state.root.className,
    s.menuPopover,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

const useCardPreviewRadius = makeStyles({
  contained: { borderRadius: CAP_BORDER_RADII.xxxLarge },
  logo: { borderRadius: CAP_BORDER_RADII.xLarge },
});

const useCardPreviewRadiusStyles = (
  state: CardPreviewState
): CardPreviewState => {
  const s = useCardPreviewRadius();
  state.root.className = mergeClasses(
    state.root.className,
    state.layout === 'contained' && s.contained,
    getSlotClassNameProp_unstable(state.root)
  );
  if (state.logo) {
    state.logo.className = mergeClasses(
      state.logo.className,
      s.logo,
      getSlotClassNameProp_unstable(state.logo)
    );
  }
  return state;
};

/* -------------------------------------------------------------------------- */
/* Drawer (inline / overlay)                                                  */
/* -------------------------------------------------------------------------- */

const drawerRadius = CAP_BORDER_RADII.xxxLarge;
const useDrawerRadius = makeStyles({
  start: { borderRadius: `0 ${drawerRadius} ${drawerRadius} 0` },
  end: { borderRadius: `${drawerRadius} 0 0 ${drawerRadius}` },
  bottom: { borderRadius: `${drawerRadius} ${drawerRadius} 0 0` },
});

const useInlineDrawerRadiusStyles = (
  state: InlineDrawerState
): InlineDrawerState => {
  const s = useDrawerRadius();
  state.root.className = mergeClasses(
    state.root.className,
    s[state.position as keyof typeof s],
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

const useOverlayDrawerRadiusStyles = (
  state: OverlayDrawerState
): OverlayDrawerState => {
  const s = useDrawerRadius();
  state.root.className = mergeClasses(
    state.root.className,
    s[state.position as keyof typeof s],
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

/* -------------------------------------------------------------------------- */
/* Focus-indicator-only radius (AccordionHeader, Checkbox, MenuItem)          */
/* -------------------------------------------------------------------------- */

const useAccordionHeaderRadius = makeStyles({
  focus: createFocusOutlineStyle({
    style: { outlineRadius: CAP_BORDER_RADII.xxLarge },
  }),
  focusSmall: createFocusOutlineStyle({
    style: { outlineRadius: CAP_BORDER_RADII.xLarge },
  }),
});

const useAccordionHeaderRadiusStyles = (
  state: AccordionHeaderState
): AccordionHeaderState => {
  const s = useAccordionHeaderRadius();
  state.button.className = mergeClasses(
    state.button.className,
    state.size === 'small' ? s.focusSmall : s.focus,
    getSlotClassNameProp_unstable(state.button)
  );
  return state;
};

const useCheckboxRadius = makeStyles({
  root: {
    ...createFocusOutlineStyle({
      style: { outlineRadius: CAP_BORDER_RADII.xxLarge },
      selector: 'focus-within',
    }),
  },
});

const useCheckboxRadiusStyles = (state: CheckboxState): CheckboxState => {
  const s = useCheckboxRadius();
  state.root.className = mergeClasses(
    state.root.className,
    s.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

const useMenuItemRadius = makeStyles({
  root: {
    borderRadius: CAP_BORDER_RADII.large,
    ...createFocusOutlineStyle({
      style: { outlineRadius: CAP_BORDER_RADII.xLarge },
    }),
  },
});

const applyMenuItemRadius = (root: { className?: string }): void => {
  const s = useMenuItemRadius();
  root.className = mergeClasses(
    root.className,
    s.root,
    getSlotClassNameProp_unstable(root as never)
  );
};

const useMenuItemRadiusStyles = (state: MenuItemState): MenuItemState => {
  applyMenuItemRadius(state.root);
  return state;
};

const useMenuItemSwitchRadius = makeStyles({
  switchIndicator: { borderRadius: CAP_BORDER_RADII.circular },
});

const useMenuItemSwitchRadiusStyles = (
  state: MenuItemSwitchState
): MenuItemSwitchState => {
  const s = useMenuItemSwitchRadius();
  applyMenuItemRadius(state.root);
  if (state.switchIndicator) {
    state.switchIndicator.className = mergeClasses(
      state.switchIndicator.className,
      s.switchIndicator,
      getSlotClassNameProp_unstable(state.switchIndicator)
    );
  }
  return state;
};

const useMenuSplitGroupRadius = makeStyles({
  root: {
    [`& > .${menuItemClassNames.root}:nth-of-type(1)`]: {
      borderBottomRightRadius: CAP_BORDER_RADII.large,
      borderTopRightRadius: CAP_BORDER_RADII.large,
    },
    [`& > .${menuItemClassNames.root}:nth-of-type(2)`]: {
      borderTopLeftRadius: CAP_BORDER_RADII.large,
      borderBottomLeftRadius: CAP_BORDER_RADII.large,
    },
  },
});

const useMenuSplitGroupRadiusStyles = (
  state: MenuSplitGroupState
): MenuSplitGroupState => {
  const s = useMenuSplitGroupRadius();
  state.root.className = mergeClasses(
    state.root.className,
    s.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

/* -------------------------------------------------------------------------- */
/* Tags                                                                       */
/* -------------------------------------------------------------------------- */

// Tag sets the visible radius on the element AND mirrors it on the focus ring.
const useTagRadius = makeStyles({
  medium: {
    borderRadius: CAP_BORDER_RADII.xxLarge,
    ...createCustomFocusIndicatorStyle({
      borderRadius: CAP_BORDER_RADII.xxLarge,
    }),
  },
  small: {
    borderRadius: CAP_BORDER_RADII.xLarge,
    ...createCustomFocusIndicatorStyle({
      borderRadius: CAP_BORDER_RADII.xLarge,
    }),
  },
  'extra-small': {
    borderRadius: CAP_BORDER_RADII.large,
    ...createCustomFocusIndicatorStyle({
      borderRadius: CAP_BORDER_RADII.large,
    }),
  },
  circular: {
    borderRadius: CAP_BORDER_RADII.circular,
    ...createCustomFocusIndicatorStyle({
      borderRadius: CAP_BORDER_RADII.circular,
    }),
  },
});

const useTagRadiusStyles = (state: TagState): TagState => {
  const s = useTagRadius();
  const { shape, size } = state;
  state.root.className = mergeClasses(
    state.root.className,
    s[size],
    shape === 'circular' && s.circular,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

// InteractionTag root: same per-size/shape element radius as Tag (the
// Primary/Secondary parts inherit their visible corners from it).
const useInteractionTagRadius = makeStyles({
  medium: { borderRadius: CAP_BORDER_RADII.xxLarge },
  small: { borderRadius: CAP_BORDER_RADII.xLarge },
  'extra-small': { borderRadius: CAP_BORDER_RADII.large },
  circular: { borderRadius: CAP_BORDER_RADII.circular },
});

const useInteractionTagRadiusStyles = (
  state: InteractionTagState
): InteractionTagState => {
  const s = useInteractionTagRadius();
  const { shape, size } = state;
  state.root.className = mergeClasses(
    state.root.className,
    s[size],
    shape === 'circular' && s.circular,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

// InteractionTagPrimary: round the outer (left) corners to the CAP tag radius.
// When paired with a secondary (dismiss) action, the inner (right) corners stay
// flat so the two halves meet flush; standalone, all four corners are rounded.
// Corners are set as explicit longhands (never the `border-radius` shorthand) so
// they reliably win over Fluent's own longhand corner styles — Griffel orders
// shorthands before longhands, so a shorthand here would lose to Fluent's.
const useInteractionTagPrimaryRadius = makeStyles({
  // Outer (left) corners + focus-ring radius, per size.
  medium: {
    borderTopLeftRadius: CAP_BORDER_RADII.xxLarge,
    borderBottomLeftRadius: CAP_BORDER_RADII.xxLarge,
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: CAP_BORDER_RADII.xxLarge },
    }),
  },
  small: {
    borderTopLeftRadius: CAP_BORDER_RADII.xLarge,
    borderBottomLeftRadius: CAP_BORDER_RADII.xLarge,
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: CAP_BORDER_RADII.xLarge },
    }),
  },
  'extra-small': {
    borderTopLeftRadius: CAP_BORDER_RADII.large,
    borderBottomLeftRadius: CAP_BORDER_RADII.large,
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: CAP_BORDER_RADII.large },
    }),
  },
  circular: {
    borderTopLeftRadius: CAP_BORDER_RADII.circular,
    borderBottomLeftRadius: CAP_BORDER_RADII.circular,
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: CAP_BORDER_RADII.circular },
    }),
  },
  // Inner (right) corners — applied only when there is no secondary action.
  standaloneMedium: {
    borderTopRightRadius: CAP_BORDER_RADII.xxLarge,
    borderBottomRightRadius: CAP_BORDER_RADII.xxLarge,
  },
  standaloneSmall: {
    borderTopRightRadius: CAP_BORDER_RADII.xLarge,
    borderBottomRightRadius: CAP_BORDER_RADII.xLarge,
  },
  'standaloneExtra-small': {
    borderTopRightRadius: CAP_BORDER_RADII.large,
    borderBottomRightRadius: CAP_BORDER_RADII.large,
  },
  standaloneCircular: {
    borderTopRightRadius: CAP_BORDER_RADII.circular,
    borderBottomRightRadius: CAP_BORDER_RADII.circular,
  },
});

const standalonePrimaryRadiusKey = {
  medium: 'standaloneMedium',
  small: 'standaloneSmall',
  'extra-small': 'standaloneExtra-small',
} as const;

const useInteractionTagPrimaryRadiusStyles = (
  state: InteractionTagPrimaryState
): InteractionTagPrimaryState => {
  const s = useInteractionTagPrimaryRadius();
  const { shape, size, hasSecondaryAction } = state;
  state.root.className = mergeClasses(
    state.root.className,
    s[size],
    shape === 'circular' && s.circular,
    !hasSecondaryAction &&
      (shape === 'circular'
        ? s.standaloneCircular
        : s[standalonePrimaryRadiusKey[size]]),
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

// InteractionTagSecondary: flat left corners, explicit per-size right corners,
// and a matching `::after` focus-ring radius. All corners are set as longhands
// (no `border-radius` shorthand) so they win over Fluent's longhand styles.
const useInteractionTagSecondaryRadius = makeStyles({
  base: {
    borderTopLeftRadius: CAP_BORDER_RADII.none,
    borderBottomLeftRadius: CAP_BORDER_RADII.none,
  },
  medium: {
    borderTopRightRadius: CAP_BORDER_RADII.xxLarge,
    borderBottomRightRadius: CAP_BORDER_RADII.xxLarge,
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: CAP_BORDER_RADII.xxLarge },
    }),
  },
  small: {
    borderTopRightRadius: CAP_BORDER_RADII.xLarge,
    borderBottomRightRadius: CAP_BORDER_RADII.xLarge,
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: CAP_BORDER_RADII.xLarge },
    }),
  },
  'extra-small': {
    borderTopRightRadius: CAP_BORDER_RADII.large,
    borderBottomRightRadius: CAP_BORDER_RADII.large,
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: CAP_BORDER_RADII.large },
    }),
  },
  circular: {
    borderTopRightRadius: CAP_BORDER_RADII.circular,
    borderBottomRightRadius: CAP_BORDER_RADII.circular,
    ...createCustomFocusIndicatorStyle({
      '::after': { borderRadius: CAP_BORDER_RADII.circular },
    }),
  },
});

const useInteractionTagSecondaryRadiusStyles = (
  state: InteractionTagSecondaryState
): InteractionTagSecondaryState => {
  const s = useInteractionTagSecondaryRadius();
  const { shape, size } = state;
  state.root.className = mergeClasses(
    state.root.className,
    s.base,
    s[size],
    shape === 'circular' && s.circular,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

const useImageRadius = makeStyles({
  rounded: { borderRadius: CAP_BORDER_RADII.xxLarge },
});

const useImageRadiusStyles = (state: ImageState): ImageState => {
  const s = useImageRadius();
  state.root.className = mergeClasses(
    state.root.className,
    state.shape === 'rounded' && s.rounded,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

const useBadgeRadius = makeStyles({
  'rounded-tiny': { borderRadius: CAP_BORDER_RADII.small },
  'rounded-extra-small': { borderRadius: CAP_BORDER_RADII.small },
  'rounded-small': { borderRadius: CAP_BORDER_RADII.small },
  'rounded-medium': { borderRadius: CAP_BORDER_RADII.medium },
  'rounded-large': { borderRadius: CAP_BORDER_RADII.large },
  'rounded-extra-large': { borderRadius: CAP_BORDER_RADII.xLarge },
  square: { borderRadius: CAP_BORDER_RADII.small },
});

const useBadgeRadiusStyles = (state: BadgeState): BadgeState => {
  const s = useBadgeRadius();
  const { shape, size } = state;
  const shapeClassKey = shape === 'rounded' ? `${shape}-${size}` : shape;
  state.root.className = mergeClasses(
    state.root.className,
    s[shapeClassKey as keyof typeof s],
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

const useAvatarRadius = makeStyles({
  medium: { borderRadius: CAP_BORDER_RADII.medium },
  large: { borderRadius: CAP_BORDER_RADII.large },
  xLarge: { borderRadius: CAP_BORDER_RADII.xLarge },
});

const useAvatarRadiusStyles = (state: AvatarState): AvatarState => {
  const s = useAvatarRadius();
  let squareRadius: string | undefined;
  if (state.shape === 'square') {
    switch (state.size) {
      case 16:
        squareRadius = s.medium;
        break;
      case 20:
      case 24:
      case 28:
        squareRadius = s.large;
        break;
      default:
        squareRadius = s.xLarge;
        break;
    }
  }
  state.root.className = mergeClasses(
    state.root.className,
    squareRadius,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

const useTabRadius = makeStyles({
  underline: createCustomFocusIndicatorStyle({
    borderRadius: CAP_BORDER_RADII.xxLarge,
  }) as unknown as GriffelStyle,
});

const useTabRadiusStyles = (state: TabState): TabState => {
  const s = useTabRadius();
  const isCircular = state.appearance?.includes('-circular');
  state.root.className = mergeClasses(
    state.root.className,
    !isCircular && s.underline,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

const useToolbarRadius = makeStyles({
  base: { borderRadius: CAP_BORDER_RADII.xLarge },
  small: { borderRadius: CAP_BORDER_RADII.xLarge },
  medium: { borderRadius: CAP_BORDER_RADII.xxLarge },
  large: { borderRadius: CAP_BORDER_RADII.xxxLarge },
});

const useToolbarRadiusStyles = (state: ToolbarState): ToolbarState => {
  const s = useToolbarRadius();
  state.root.className = mergeClasses(
    state.root.className,
    s.base,
    s[state.size],
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};

const useTooltipRadius = makeStyles({
  content: { borderRadius: CAP_BORDER_RADII.xLarge },
});

const useTooltipRadiusStyles = (state: TooltipState): TooltipState => {
  const s = useTooltipRadius();
  state.content.className = mergeClasses(
    state.content.className,
    s.content,
    getSlotClassNameProp_unstable(state.content)
  );
  return state;
};

const useTeachingPopoverBodyRadius = makeStyles({
  media: { borderRadius: CAP_BORDER_RADII.xLarge },
});

const useTeachingPopoverBodyRadiusStyles = (
  state: TeachingPopoverBodyState
): TeachingPopoverBodyState => {
  const s = useTeachingPopoverBodyRadius();
  if (state.media) {
    state.media.className = mergeClasses(
      state.media.className,
      s.media,
      getSlotClassNameProp_unstable(state.media)
    );
  }
  return state;
};

const useSearchBoxFilledInsetRadius = makeStyles({
  root: { borderRadius: CAP_BORDER_RADII.circular },
  separator: { borderRadius: CAP_BORDER_RADII.circular },
});

const useSearchBoxRadiusStyles = (state: SearchBoxState): SearchBoxState => {
  const s = useSearchBoxFilledInsetRadius();
  const appearance = state.appearance;
  // SearchBox composes Input; treat 'filled-inset' as 'outline' for the base
  // field radius, then override the root to circular for 'filled-inset'.
  applyFieldRadius(
    state.root,
    appearance === 'filled-inset' ? 'outline' : appearance,
    state.size
  );
  if (appearance === 'filled-inset') {
    state.root.className = mergeClasses(
      state.root.className,
      s.root,
      getSlotClassNameProp_unstable(state.root)
    );
  }
  if (state.separator) {
    state.separator.className = mergeClasses(
      state.separator.className,
      s.separator,
      getSlotClassNameProp_unstable(state.separator)
    );
  }
  return state;
};

/**
 * Rounded-corners-only variant of {@link CAP_STYLE_HOOKS}. Pass to
 * `FluentProvider`'s `customStyleHooks_unstable` to apply CAP's rounded corners
 * on top of an otherwise-stock Fluent theme.
 */
export const CAP_STYLE_HOOKS_ROUNDED_CORNERS: NonNullable<
  FluentProviderProps['customStyleHooks_unstable']
> = {
  useAccordionHeaderStyles_unstable: (state) =>
    useAccordionHeaderRadiusStyles(state as AccordionHeaderState),
  useAvatarStyles_unstable: (state) =>
    useAvatarRadiusStyles(state as AvatarState),
  useBadgeStyles_unstable: (state) => useBadgeRadiusStyles(state as BadgeState),
  useButtonStyles_unstable: (state) =>
    useButtonRadiusStyles(state as ButtonState),
  useCompoundButtonStyles_unstable: (state) =>
    useCompoundButtonRadiusStyles(state as CompoundButtonState),
  useMenuButtonStyles_unstable: (state) =>
    useMenuButtonRadiusStyles(state as MenuButtonState),
  useToggleButtonStyles_unstable: (state) =>
    useToggleButtonRadiusStyles(state as ToggleButtonState),
  useSplitButtonStyles_unstable: (state) =>
    useSplitButtonRadiusStyles(state as SplitButtonState),
  useCardStyles_unstable: (state) => useCardRadiusStyles(state as CardState),
  useCardPreviewStyles_unstable: (state) =>
    useCardPreviewRadiusStyles(state as CardPreviewState),
  useCheckboxStyles_unstable: (state) =>
    useCheckboxRadiusStyles(state as CheckboxState),
  useComboboxStyles_unstable: (state) =>
    useComboboxRadiusStyles(state as ComboboxState),
  useDropdownStyles_unstable: (state) =>
    useDropdownRadiusStyles(state as DropdownState),
  useDialogSurfaceStyles_unstable: (state) =>
    useDialogSurfaceRadiusStyles(state as DialogSurfaceState),
  useInlineDrawerStyles_unstable: (state) =>
    useInlineDrawerRadiusStyles(state as InlineDrawerState),
  useOverlayDrawerStyles_unstable: (state) =>
    useOverlayDrawerRadiusStyles(state as OverlayDrawerState),
  useImageStyles_unstable: (state) => useImageRadiusStyles(state as ImageState),
  useInputStyles_unstable: (state) => useInputRadiusStyles(state as InputState),
  useMenuItemStyles_unstable: (state) =>
    useMenuItemRadiusStyles(state as MenuItemState),
  useMenuItemSwitchStyles_unstable: (state) =>
    useMenuItemSwitchRadiusStyles(state as MenuItemSwitchState),
  useMenuPopoverStyles_unstable: (state) =>
    useMenuPopoverRadiusStyles(state as MenuPopoverState),
  useMenuSplitGroupStyles_unstable: (state) =>
    useMenuSplitGroupRadiusStyles(state as MenuSplitGroupState),
  usePopoverSurfaceStyles_unstable: (state) =>
    usePopoverSurfaceRadiusStyles(state as PopoverSurfaceState),
  useSearchBoxStyles_unstable: (state) =>
    useSearchBoxRadiusStyles(state as SearchBoxState),
  useTagStyles_unstable: (state) => useTagRadiusStyles(state as TagState),
  useInteractionTagStyles_unstable: (state) =>
    useInteractionTagRadiusStyles(state as InteractionTagState),
  useInteractionTagPrimaryStyles_unstable: (state) =>
    useInteractionTagPrimaryRadiusStyles(state as InteractionTagPrimaryState),
  useInteractionTagSecondaryStyles_unstable: (state) =>
    useInteractionTagSecondaryRadiusStyles(
      state as InteractionTagSecondaryState
    ),
  useTabStyles_unstable: (state) => useTabRadiusStyles(state as TabState),
  useToolbarStyles_unstable: (state) =>
    useToolbarRadiusStyles(state as ToolbarState),
  useTooltipStyles_unstable: (state) =>
    useTooltipRadiusStyles(state as TooltipState),
  useTeachingPopoverBodyStyles_unstable: (state) =>
    useTeachingPopoverBodyRadiusStyles(state as TeachingPopoverBodyState),
};
