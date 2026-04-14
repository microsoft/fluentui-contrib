import {
  menuItemSwitchClassNames,
  type MenuItemSwitchState,
} from '@fluentui/react-menu';
import type { ElementType } from 'react';
import {
  makeStyles,
  makeResetStyles,
  mergeClasses,
  shorthands,
} from '@griffel/react';
import { tokens } from '@fluentui/tokens';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles.styles';
import { useCheckmarkStyles_unstable } from '../../selectable/useCheckmarkStyles.style';

const circleFilledClassName =
  'fui-MenuItemSwitch__switchIndicator__circleFilled';

const spaceBetweenThumbAndTrack = 4;
const trackHeight = 24;
const trackWidth = 48;
const thumbSize = 20;

const useSwitchIndicatorBaseClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXXS}`,
  fontSize: `${thumbSize}px`,
  height: `${trackHeight}px`,
  width: `${trackWidth}px`,
  borderRadius: tokens.borderRadiusCircular,
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
  lineHeight: 0,
  boxSizing: 'border-box',
  fill: 'currentColor',
  flexShrink: 0,
  transitionDuration: tokens.durationNormal,
  transitionTimingFunction: tokens.curveEasyEase,
  transitionProperty: 'background, border, color',

  '@media screen and (prefers-reduced-motion: reduce)': {
    transitionDuration: '0.01ms',
  },

  [`& .${circleFilledClassName}`]: {
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    transitionProperty: 'transform',

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },
  },
});

const useStyles = makeStyles({
  root: {
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
  },
  switchIndicator: { marginLeft: tokens.spacingHorizontalS },
  content: {
    marginTop: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalXXS,
  },
  icon: {
    marginTop: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalXXS,
  },
  secondaryContent: {
    marginTop: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalXXS,
  },
});

const useInteractiveStyles = makeStyles({
  unchecked: {
    ':hover': {
      [`& .${menuItemSwitchClassNames.switchIndicator}`]: {
        ...shorthands.borderColor(
          tokens.colorNeutralStrokeAccessibleHover,
        ),
        color: tokens.colorNeutralForeground3Hover,
      },
    },
    ':hover:active': {
      [`& .${menuItemSwitchClassNames.switchIndicator}`]: {
        ...shorthands.borderColor(
          tokens.colorNeutralStrokeAccessiblePressed,
        ),
        color: tokens.colorNeutralForeground3Pressed,
      },
    },
    '@media (forced-colors: active)': {
      ':hover': {
        [`& .${menuItemSwitchClassNames.switchIndicator}`]: {
          ...shorthands.borderColor('Highlight'),
          color: 'inherit',
        },
      },
      ':hover:active': {
        [`& .${menuItemSwitchClassNames.switchIndicator}`]: {
          ...shorthands.borderColor('Highlight'),
          color: 'inherit',
        },
      },
    },
  },
  checked: {
    ':hover': {
      [`& .${menuItemSwitchClassNames.switchIndicator}`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundHover,
      },
    },
    ':hover:active': {
      [`& .${menuItemSwitchClassNames.switchIndicator}`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundPressed,
      },
    },
    '@media (forced-colors: active)': {
      ':hover': {
        [`& .${menuItemSwitchClassNames.switchIndicator}`]: {
          backgroundColor: 'Highlight',
        },
      },
      ':hover:active': {
        [`& .${menuItemSwitchClassNames.switchIndicator}`]: {
          backgroundColor: 'Highlight',
        },
      },
    },
  },
});

const useSwitchIndicatorStyles = makeStyles({
  unchecked: { color: tokens.colorNeutralForeground3 },
  checked: {
    backgroundColor: tokens.colorCompoundBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    [`& .${circleFilledClassName}`]: {
      transform: `translateX(${trackWidth - thumbSize - spaceBetweenThumbAndTrack}px)`,
    },

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      ...shorthands.borderColor('Highlight'),
      color: 'HighlightText',
    },
  },
  disabled: {
    color: 'inherit',
    '@media (forced-colors: active)': {
      backgroundColor: 'Canvas',
      ...shorthands.borderColor('GrayText'),
      color: 'inherit',
    },
  },
  disabledChecked: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
  },
  disabledUnchecked: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
});

export const useMenuItemSwitchStyles = (
  state: MenuItemSwitchState
): MenuItemSwitchState => {
  const styles = useStyles();
  const interactiveStyles = useInteractiveStyles();
  const switchIndicatorBaseStyles = useSwitchIndicatorBaseClassName();
  const switchIndicatorStyles = useSwitchIndicatorStyles();

  const { checked, disabled } = state;

  state.root.className = mergeClasses(
    state.root.className,
    menuItemSwitchClassNames.root,
    styles.root,
    !disabled &&
      (checked ? interactiveStyles.checked : interactiveStyles.unchecked),
  );

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      menuItemSwitchClassNames.content,
      styles.content,
    );
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      menuItemSwitchClassNames.secondaryContent,
      styles.secondaryContent,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      menuItemSwitchClassNames.icon,
      styles.icon,
    );
  }

  if (state.subText) {
    state.subText.className = mergeClasses(
      state.subText.className,
      menuItemSwitchClassNames.subText,
    );
  }

  if (state.switchIndicator) {
    state.switchIndicator.className = mergeClasses(
      state.switchIndicator.className,
      menuItemSwitchClassNames.switchIndicator,
      switchIndicatorBaseStyles,
      styles.switchIndicator,
      checked
        ? switchIndicatorStyles.checked
        : switchIndicatorStyles.unchecked,
      disabled && switchIndicatorStyles.disabled,
      disabled &&
        (checked
          ? switchIndicatorStyles.disabledChecked
          : switchIndicatorStyles.disabledUnchecked),
    );
  }

  const partialMenuItemState = {
    components: {
      ...state.components,
      checkmark: 'span' as ElementType,
      submenuIndicator: 'span' as ElementType,
    },
    hasSubmenu: false,
    persistOnClick: true,
  };

  useCheckmarkStyles_unstable({ ...state, ...partialMenuItemState });
  useMenuItemStyles({
    ...state,
    ...partialMenuItemState,
    checkmark: undefined,
    submenuIndicator: undefined,
  });

  return state;
};
