import { dropdownClassNames } from '@fluentui/react-combobox';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import {
  makeResetStyles,
  makeStyles,
  mergeClasses,
  shorthands,
} from '@griffel/react';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { capTokens } from '../../../tokens/tokens';
import type { DropdownState } from './Dropdown.types';

const defaultGridTemplate = '[content] 1fr [icon] auto [end]';
const paddingHorizontalSmall = tokens.spacingHorizontalS;
const paddingHorizontalMedium = tokens.spacingHorizontalMNudge;
const paddingHorizontalLarge = tokens.spacingHorizontalM;

// Adjust clearButton's target size for accessibility
const clearButtonMarginAdjust = tokens.spacingHorizontalXXS;

const useStyles = makeStyles({
  root: {
    minWidth: '250px',
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: capTokens.borderRadius2XLarge,
    ...typographyStyles.body1,
    '::after': { content: 'unset' },
  },

  small: {
    ...typographyStyles.caption1,
    borderRadius: tokens.borderRadiusXLarge,
  },
  medium: {
    /* same as root */
  },
  large: typographyStyles.body2,
  invalid: {
    ...shorthands.borderColor(tokens.colorStatusDangerBorder2),
    ':hover': shorthands.borderColor(tokens.colorStatusDangerBorder2),
  },

  listboxCollapsed: { display: 'none' },
  // When rendering inline, the popupSurface will be rendered under relatively positioned elements such as Input.
  // This is due to the surface being positioned as absolute, therefore zIndex: 1 ensures that won't happen.
  inlineListbox: { zIndex: 1 },
  hidden: { display: 'none' },
});

const useIsEditableStyles = makeStyles({
  base: {
    ':hover': {
      [`& .${dropdownClassNames.clearButton}`]: {
        color: capTokens.colorNeutralForeground5Hover,
      },
      [`& .${dropdownClassNames.expandIcon}`]: {
        color: capTokens.colorNeutralForeground5Hover,
      },

      [`& .${dropdownClassNames.expandIcon} .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${dropdownClassNames.expandIcon} .${iconFilledClassName}`]: {
        display: 'inline',
      },

      // Don't update sub component icons (e.g Button)
      // [`& .${dropdownClassNames.contentBefore} > .${iconRegularClassName}`]: {
      //   display: 'none',
      // },
      // [`& .${dropdownClassNames.contentBefore} > .${iconFilledClassName}`]: {
      //   display: 'inline',
      // },
    },
    ':active,:focus-within': {
      [`& .${dropdownClassNames.clearButton}`]: {
        color: capTokens.colorNeutralForeground5Pressed,
      },
      [`& .${dropdownClassNames.expandIcon}`]: {
        color: capTokens.colorNeutralForeground5Pressed,
      },

      [`& .${dropdownClassNames.expandIcon} .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${dropdownClassNames.expandIcon} .${iconFilledClassName}`]: {
        display: 'inline',
      },

      // Don't update sub component icons (e.g Button)
      // [`& .${dropdownClassNames.contentBefore} > .${iconRegularClassName}`]: {
      //   display: 'none',
      // },
      // [`& .${dropdownClassNames.contentBefore} > .${iconFilledClassName}`]: {
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
      // [`& .${dropdownClassNames.contentBefore}`]: {
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

const useContentBeforeStyles = makeStyles({
  base: {
    display: 'flex',
    gridColumnStart: 'contentBefore',
    gridColumnEnd: 'contentBefore',
  },
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

const useButtonStyles = makeStyles({
  base: {
    display: 'grid',
    gridTemplateColumns: defaultGridTemplate,
    justifyContent: 'space-between',
    textAlign: 'left',
    alignItems: 'center',
    width: '100%',

    '&:focus': { outlineStyle: 'none' },

    boxSizing: 'border-box',

    // Remove browser styling
    backgroundColor: tokens.colorTransparentBackground,
    border: 'none',
    outline: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
  },
  hasContentBefore: {
    gridTemplateColumns: `[contentBefore] auto ${defaultGridTemplate}`,
  },

  small: { padding: `5px ${paddingHorizontalSmall}` },
  medium: { padding: `7px ${paddingHorizontalMedium}` },
  large: { padding: `9px ${paddingHorizontalLarge}` },

  disabled: { cursor: 'inherit' },
  isEditable: { cursor: 'pointer' },
});

// Reduce space between Dropdown button and clearButton to accommodate for clearButton's target size increase.
const useButtonShowClearButtonStyles = makeStyles({
  small: { paddingRight: tokens.spacingVerticalSNudge },
  medium: { paddingRight: tokens.spacingVerticalS },
  large: { paddingRight: tokens.spacingVerticalMNudge },
});

// Expand and Clear icon styles
const useIconStyles = makeStyles({
  base: {
    color: capTokens.colorNeutralForeground5,
    display: 'flex',
    gridColumnStart: 'icon',
    gridColumnEnd: 'end',
  },
  disabled: { color: 'inherit' },
  small: { fontSize: tokens.fontSizeBase400 },
  medium: { fontSize: tokens.fontSizeBase500 },
  large: { fontSize: tokens.fontSizeBase500 },
});

const useExpandButtonStyles = makeStyles({
  small: { marginLeft: tokens.spacingHorizontalS },
  medium: { marginLeft: tokens.spacingHorizontalMNudge },
  large: { marginLeft: tokens.spacingHorizontalM },
});

const useClearButtonClassName = makeResetStyles({
  marginLeft: clearButtonMarginAdjust,

  // remove browser styling
  alignSelf: 'center',
  backgroundColor: tokens.colorTransparentBackground,
  border: 'none',
  cursor: 'pointer',
  height: 'fit-content',
  padding: 0,
  position: 'relative',
  ...createFocusOutlineStyle(),
});

const useClearButtonStyles = makeStyles({
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
  small: { marginRight: paddingHorizontalSmall },
  medium: { marginRight: paddingHorizontalMedium },
  large: { marginRight: paddingHorizontalLarge },
});

export const useDropdownStyles = (state: DropdownState): DropdownState => {
  const clearButtonClassName = useClearButtonClassName();

  const styles = useStyles();
  const isEditableStyles = useIsEditableStyles();
  const appearanceStyles = useAppearanceStyles();
  const contentBeforeStyles = useContentBeforeStyles();
  const buttonStyles = useButtonStyles();
  const buttonShowClearButtonStyles = useButtonShowClearButtonStyles();
  const iconStyles = useIconStyles();
  const expandButtonStyles = useExpandButtonStyles();
  const clearButtonStyles = useClearButtonStyles();
  const disabledStyles = useDisabledStyles();

  const {
    appearance,
    color,
    disabled,
    open,
    placeholderVisible,
    size,
    showClearButton,
  } = state;
  const isEditable = !disabled;
  const invalid = `${state.button['aria-invalid']}` === 'true';

  state.root.className = mergeClasses(
    state.root.className,
    dropdownClassNames.root,
    styles.root,
    styles[size],
    isEditable && isEditableStyles.base,
    isEditable &&
      (placeholderVisible
        ? isEditableStyles.noValue
        : isEditableStyles.hasValue),
    isEditable && appearanceStyles[appearance],
    isEditable && isEditableStyles[color],
    invalid && styles.invalid,
    disabled && disabledStyles.base,
    disabled && disabledStyles[appearance],
    getSlotClassNameProp_unstable(state.root)
  );

  state.button.className = mergeClasses(
    state.button.className,
    dropdownClassNames.button,
    buttonStyles.base,
    state.contentBefore && buttonStyles.hasContentBefore,
    buttonStyles[size],
    showClearButton && buttonShowClearButtonStyles[size],
    isEditable ? buttonStyles.isEditable : buttonStyles.disabled,
    getSlotClassNameProp_unstable(state.button)
  );

  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(
      state.contentBefore.className,
      // dropdownClassNames.contentBefore,
      contentBeforeStyles.base,
      contentBeforeStyles[size],
      getSlotClassNameProp_unstable(state.contentBefore)
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      state.expandIcon.className,
      dropdownClassNames.expandIcon,
      iconStyles.base,
      iconStyles[size],
      expandButtonStyles[size],
      disabled && iconStyles.disabled,
      showClearButton && styles.hidden,
      getSlotClassNameProp_unstable(state.expandIcon)
    );
  }

  if (state.clearButton) {
    state.clearButton.className = mergeClasses(
      state.clearButton.className,
      dropdownClassNames.clearButton,
      clearButtonClassName,
      iconStyles.base,
      isEditable && clearButtonStyles.isEditable,
      iconStyles[size],
      clearButtonStyles[size],
      !showClearButton && styles.hidden,
      getSlotClassNameProp_unstable(state.clearButton)
    );
  }

  if (state.listbox) {
    state.listbox.className = mergeClasses(
      state.listbox.className,
      dropdownClassNames.listbox,
      state.inlinePopup && styles.inlineListbox,
      !open && styles.listboxCollapsed,
      getSlotClassNameProp_unstable(state.listbox)
    );
  }

  return state;
};
