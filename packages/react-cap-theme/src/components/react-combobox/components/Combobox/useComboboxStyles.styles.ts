import { comboboxClassNames } from '@fluentui/react-combobox';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { capTokens } from '../../../tokens/tokens';
import type { ComboboxState } from './Combobox.types';

const paddingHorizontalSmall = tokens.spacingHorizontalS;
const paddingHorizontalMedium = tokens.spacingHorizontalMNudge;
const paddingHorizontalLarge = tokens.spacingHorizontalM;

const useStyles = makeStyles({
  root: {
    minWidth: '250px',
    minHeight: '36px',
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    verticalAlign: 'middle',
    padding: `${tokens.spacingVerticalNone} ${paddingHorizontalMedium}`,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: capTokens.borderRadius2XLarge,
    ...typographyStyles.body1,
    '::after': { content: 'unset' },
  },

  small: {
    minHeight: '28px',
    padding: `${tokens.spacingVerticalNone} ${paddingHorizontalSmall}`,
    ...typographyStyles.caption1,
    borderRadius: tokens.borderRadiusXLarge,
  },
  medium: {
    /* same as root */
  },
  large: {
    minHeight: '44px',
    ...typographyStyles.body2,
    padding: `${tokens.spacingVerticalNone} ${paddingHorizontalLarge}`,
  },
  invalid: {
    ...shorthands.borderColor(tokens.colorStatusDangerBorder2),
    ':hover': shorthands.borderColor(tokens.colorStatusDangerBorder2),
  },

  listboxCollapsed: { display: 'none' },
  // When rendering inline, the popupSurface will be rendered under relatively positioned elements
  // such as Input. zIndex: 1 ensures that won't happen.
  inlineListbox: { zIndex: 1 },
  hidden: { display: 'none' },
});

const useIsEditableStyles = makeStyles({
  base: {
    ':hover': {
      [`& .${comboboxClassNames.clearIcon}`]: {
        color: capTokens.colorNeutralForeground5Hover,
      },
      [`& .${comboboxClassNames.expandIcon}`]: {
        color: capTokens.colorNeutralForeground5Hover,
      },

      [`& .${comboboxClassNames.expandIcon} .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${comboboxClassNames.expandIcon} .${iconFilledClassName}`]: {
        display: 'inline',
      },

      // Don't update sub component icons (e.g Button)
      // [`& .${comboboxClassNames.contentBefore} > .${iconRegularClassName}`]: {
      //   display: 'none',
      // },
      // [`& .${comboboxClassNames.contentBefore} > .${iconFilledClassName}`]: {
      //   display: 'inline',
      // },
      // End --
    },
    ':active,:focus-within': {
      [`& .${comboboxClassNames.clearIcon}`]: {
        color: capTokens.colorNeutralForeground5Pressed,
      },
      [`& .${comboboxClassNames.expandIcon}`]: {
        color: capTokens.colorNeutralForeground5Pressed,
      },

      [`& .${comboboxClassNames.expandIcon} .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${comboboxClassNames.expandIcon} .${iconFilledClassName}`]: {
        display: 'inline',
      },

      // Don't update sub component icons (e.g Button)
      // [`& .${comboboxClassNames.contentBefore} > .${iconRegularClassName}`]: {
      //   display: 'none',
      // },
      // [`& .${comboboxClassNames.contentBefore} > .${iconFilledClassName}`]: {
      //   display: 'inline',
      // },
      ...shorthands.borderColor(tokens.colorBrandStroke1),
    },

    ':focus-within': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`, // For high contrast
    },
  },
  hasValue: {
    color: tokens.colorNeutralForeground1,
    ':hover': { color: tokens.colorNeutralForeground1Hover },
    ':active,:focus-within': { color: tokens.colorNeutralForeground1Pressed },
  },
  noValue: {
    color: capTokens.colorNeutralForeground5,
    ':hover': { color: capTokens.colorNeutralForeground5Hover },
    ':active,:focus-within': {
      color: capTokens.colorNeutralForeground5Pressed,
    },
  },
  brand: {
    ':active,:focus-within': {
      ...shorthands.borderColor(tokens.colorBrandStroke1),
      // [`& .${comboboxClassNames.contentBefore}`]: {
      //   color: tokens.colorBrandForeground2,
      // },
    },
  },
  neutral: {
    ':active,:focus-within': shorthands.borderColor(
      tokens.colorNeutralStrokeAccessiblePressed
    ),
  },
});

const useAppearanceStyles = makeStyles({
  outline: {
    ':hover': shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
  },
  underline: {
    backgroundColor: tokens.colorTransparentBackground,
    borderRadius: tokens.borderRadiusNone,
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderLeftStyle: 'none',
    ':hover': shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
    '@media (forced-colors: active)': {
      ':focus-within': { borderBottomColor: 'Canvas' },
    },
  },
  'filled-lighter': {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,

    // FIXME awaiting design. Temp fix to support contrast
    ':active,:focus-within': {
      boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1}`,
    },
  },
  'filled-darker': {
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,

    // FIXME awaiting design. Temp fix to support contrast
    ':active,:focus-within': {
      boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1}`,
    },
  },
});

const useDisabledStyles = makeStyles({
  base: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForegroundDisabled,
    cursor: 'not-allowed',

    '@media (forced-colors: active)': shorthands.borderColor('GrayText'),
  },
  outline: {
    /* same as base */
  },
  underline: {
    borderRadius: tokens.borderRadiusNone,
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderLeftStyle: 'none',
  },
  'filled-lighter': {
    /* same as base */
  },
  'filled-darker': {
    /* same as base */
  },
});

const useInputStyles = makeStyles({
  base: {
    // Remove browser styling
    alignSelf: 'stretch',
    boxSizing: 'border-box',
    flexGrow: 1,
    minWidth: 0, // required to make the input shrink to fit the wrapper
    backgroundColor: tokens.colorTransparentBackground,
    border: 'none',
    padding: 0,
    outline: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',

    '::placeholder': {
      opacity: 1,
      color: 'inherit',
    },
  },
  small: { paddingRight: tokens.spacingHorizontalS },
  medium: { paddingRight: tokens.spacingHorizontalMNudge },
  large: { paddingRight: tokens.spacingHorizontalM },
  disabled: { cursor: 'inherit' },
});

const useContentBeforeStyles = makeStyles({
  base: { display: 'flex' },
  small: {
    marginRight: tokens.spacingHorizontalXS,
    '> svg': { fontSize: tokens.fontSizeBase400 },
  },
  medium: {
    marginRight: tokens.spacingHorizontalSNudge,
    '> svg': { fontSize: tokens.fontSizeBase500 },
  },
  large: {
    marginRight: tokens.spacingHorizontalS,
    '> svg': { fontSize: tokens.fontSizeBase600 },
  },
});

// Expand and clear icon styles
const useIconStyles = makeStyles({
  base: {
    display: 'flex',
    color: capTokens.colorNeutralForeground5,
    cursor: 'pointer',
    position: 'relative',

    // Extend the clickable area to cover root's paddingRight "dead zone" and meet target size requirements.
    // Without this, clicking between the icon and the right border does not trigger the icon's handler.
    '::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  small: {
    fontSize: tokens.fontSizeBase400,
    '::after': { right: `calc(-1 * ${paddingHorizontalSmall})` }, // Match root's spacing.
  },
  medium: {
    fontSize: tokens.fontSizeBase500,
    '::after': { right: `calc(-1 * ${paddingHorizontalMedium})` }, // Match root's spacing.
  },
  large: {
    fontSize: tokens.fontSizeBase500,
    '::after': { right: `calc(-1 * ${paddingHorizontalLarge})` }, // Match root's spacing.
  },
  disabled: { color: 'inherit', cursor: 'inherit' },
});

const useClearIconStyles = makeStyles({
  isEditable: {
    ':hover': {
      [`& .${iconRegularClassName}`]: { display: 'none' },
      [`& .${iconFilledClassName}`]: { display: 'inline' },
    },
    ':active,:focus-within': {
      [`& .${iconRegularClassName}`]: { display: 'none' },
      [`& .${iconFilledClassName}`]: { display: 'inline' },
    },
  },
});

export const useComboboxStyles = (state: ComboboxState): ComboboxState => {
  const styles = useStyles();
  const isEditableStyles = useIsEditableStyles();
  const appearanceStyles = useAppearanceStyles();
  const inputStyles = useInputStyles();
  const contentBeforeStyles = useContentBeforeStyles();
  const iconStyles = useIconStyles();
  const clearIconStyles = useClearIconStyles();
  const disabledStyles = useDisabledStyles();

  const { appearance, color, disabled, open, size, showClearIcon } = state;
  const isEditable = !disabled;
  const hasValue = !!state.value;
  const invalid = `${state.input['aria-invalid']}` === 'true';

  state.root.className = mergeClasses(
    state.root.className,
    comboboxClassNames.root,
    styles.root,
    styles[size],
    isEditable && isEditableStyles.base,
    isEditable &&
      (hasValue ? isEditableStyles.hasValue : isEditableStyles.noValue),
    isEditable && appearanceStyles[appearance],
    isEditable && isEditableStyles[color],
    invalid && styles.invalid,
    disabled && disabledStyles.base,
    disabled && disabledStyles[appearance],
    getSlotClassNameProp_unstable(state.root)
  );

  state.input.className = mergeClasses(
    state.input.className,
    comboboxClassNames.input,
    inputStyles.base,
    inputStyles[size],
    disabled && inputStyles.disabled,
    getSlotClassNameProp_unstable(state.input)
  );

  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(
      state.contentBefore.className,
      // comboboxClassNames.contentBefore,
      contentBeforeStyles.base,
      contentBeforeStyles[size],
      getSlotClassNameProp_unstable(state.contentBefore)
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      state.expandIcon.className,
      comboboxClassNames.expandIcon,
      iconStyles.base,
      iconStyles[size],
      disabled && iconStyles.disabled,
      showClearIcon && styles.hidden,
      getSlotClassNameProp_unstable(state.expandIcon)
    );
  }

  if (state.clearIcon) {
    state.clearIcon.className = mergeClasses(
      state.clearIcon.className,
      comboboxClassNames.clearIcon,
      iconStyles.base,
      isEditable && clearIconStyles.isEditable,
      iconStyles[size],
      !showClearIcon && styles.hidden,
      getSlotClassNameProp_unstable(state.clearIcon)
    );
  }

  if (state.listbox) {
    state.listbox.className = mergeClasses(
      state.listbox.className,
      comboboxClassNames.listbox,
      state.inlinePopup && styles.inlineListbox,
      !open && styles.listboxCollapsed,
      getSlotClassNameProp_unstable(state.listbox)
    );
  }

  return state;
};
