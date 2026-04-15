import { inputClassNames } from '@fluentui/react-input';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { capTokens } from '../../../tokens';
import type { InputState } from './Input.types';

const iconFilledClassName = 'fui-Icon-filled';
const iconRegularClassName = 'fui-Icon-regular';

const useStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    verticalAlign: 'middle',
    minHeight: '36px',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalMNudge}`,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: capTokens.borderRadius2XLarge,
    ...typographyStyles.body1,
  },
  small: {
    minHeight: '28px',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalS}`,
    ...typographyStyles.caption1,
    borderRadius: tokens.borderRadiusXLarge,
  },
  medium: {
    /* same as root */
  },
  large: {
    minHeight: '44px',
    ...typographyStyles.body2,
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalM}`,
  },
  disabled: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForegroundDisabled,
    cursor: 'not-allowed',

    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },
  disabledUnderline: {
    borderRadius: '0',
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderLeftStyle: 'none',
    '@media (forced-colors: active)': {
      borderTopColor: 'Canvas',
      borderRightColor: 'Canvas',
      borderLeftColor: 'Canvas',

      ':focus': {
        borderBottomColor: 'Canvas',
      },
    },
  },
  invalid: {
    ...shorthands.borderColor(tokens.colorStatusDangerBorder2),
    ':hover': {
      ...shorthands.borderColor(tokens.colorStatusDangerBorder2),
    },
  },
});

const useIsEditableStyles = makeStyles({
  base: {
    ':hover': {
      [`& .${inputClassNames.contentBefore} > .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${inputClassNames.contentBefore} > .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${inputClassNames.contentAfter} > .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${inputClassNames.contentAfter} > .${iconFilledClassName}`]: {
        display: 'inline',
      },
    },
    ':active,:focus-within': {
      [`& .${inputClassNames.contentBefore} > .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${inputClassNames.contentBefore} > .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${inputClassNames.contentAfter} > .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${inputClassNames.contentAfter} > .${iconFilledClassName}`]: {
        display: 'inline',
      },
    },

    ':focus-within': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`,
    },
  },

  hasValue: {
    ':hover': { color: tokens.colorNeutralForeground1Hover },
    ':active,:focus-within': { color: tokens.colorNeutralForeground1Pressed },
  },
  noValue: {
    color: capTokens.colorNeutralForeground5,
    ':hover': { color: capTokens.colorNeutralForeground5Hover },
    ':active,:focus-within': { color: capTokens.colorNeutralForeground5Pressed },
  },
  brand: {
    ':active,:focus-within': {
      ...shorthands.borderColor(tokens.colorBrandStroke1),
      [`& .${inputClassNames.contentBefore}`]: {
        color: tokens.colorBrandForeground2,
      },
    },
  },
  neutral: {
    ':active,:focus-within': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessiblePressed),
      [`& .${inputClassNames.contentBefore}`]: {
        color: tokens.colorNeutralForeground1Pressed,
      },
    },
  },
});

const useAppearanceStyles = makeStyles({
  outline: {
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
    },
  },
  underline: {
    backgroundColor: tokens.colorTransparentBackground,
    borderRadius: '0',
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderLeftStyle: 'none',
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
    '@media (forced-colors: active)': {
      ':focus-within': {
        borderBottomColor: 'Canvas',
      },
    },
  },
});

const useContentStyles = makeStyles({
  base: {
    display: 'flex',
    color: 'inherit',
    '> svg': { fontSize: tokens.fontSizeBase500 },
  },
  small: { '> svg': { fontSize: tokens.fontSizeBase400 } },
  medium: {
    /* same as base */
  },
  large: { '> svg': { fontSize: tokens.fontSizeBase600 } },

  smallContentBefore: { paddingRight: tokens.spacingHorizontalXS },
  smallContentAfter: { paddingLeft: tokens.spacingHorizontalS },

  mediumContentBefore: { paddingRight: tokens.spacingHorizontalSNudge },
  mediumContentAfter: { paddingLeft: tokens.spacingHorizontalMNudge },

  largeContentBefore: { paddingRight: tokens.spacingHorizontalS },
  largeContentAfter: { paddingLeft: tokens.spacingHorizontalM },

  disabled: { color: 'inherit' },
});

const useInputElementStyles = makeStyles({
  base: {
    alignSelf: 'stretch',
    boxSizing: 'border-box',
    flexGrow: 1,
    minWidth: 0,
    backgroundColor: tokens.colorTransparentBackground,
    border: 'none',
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
  disabled: {
    cursor: 'inherit',
  },
});

/**
 * Apply styling to the Input based on the state.
 * @param state - The current Input state
 * @returns The updated Input state with applied styles
 * @alpha
 */
export const useInputStyles = (state: InputState): InputState => {
  const styles = useStyles();
  const isEditableStyles = useIsEditableStyles();
  const appearanceStyles = useAppearanceStyles();
  const contentStyles = useContentStyles();
  const inputStyles = useInputElementStyles();

  const appearance = state.appearance ?? 'outline';
  const color = state.color ?? 'brand';
  const { size } = state;
  const { disabled, value } = state.input;
  const isEditable = !disabled;
  const hasValue = !!value;
  const invalid = `${state.input['aria-invalid']}` === 'true';

  state.root.className = mergeClasses(
    state.root.className,
    inputClassNames.root,
    styles.root,
    styles[size],
    isEditable && isEditableStyles.base,
    isEditable &&
      (hasValue ? isEditableStyles.hasValue : isEditableStyles.noValue),
    isEditable &&
      (appearance === 'outline' || appearance === 'underline') &&
      appearanceStyles[appearance],
    isEditable && isEditableStyles[color],
    invalid && styles.invalid,
    disabled && styles.disabled,
    disabled && appearance === 'underline' && styles.disabledUnderline,
    getSlotClassNameProp_unstable(state.root),
  );

  state.input.className = mergeClasses(
    state.input.className,
    inputClassNames.input,
    inputStyles.base,
    disabled && inputStyles.disabled,
    getSlotClassNameProp_unstable(state.input),
  );

  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(
      state.contentBefore.className,
      inputClassNames.contentBefore,
      contentStyles.base,
      contentStyles[size],
      contentStyles[`${size}ContentBefore`],
      disabled && contentStyles.disabled,
      getSlotClassNameProp_unstable(state.contentBefore),
    );
  }

  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(
      state.contentAfter.className,
      inputClassNames.contentAfter,
      contentStyles.base,
      contentStyles[size],
      contentStyles[`${size}ContentAfter`],
      disabled && contentStyles.disabled,
      getSlotClassNameProp_unstable(state.contentAfter),
    );
  }

  return state;
};
