import { inputClassNames } from '@fluentui/react-input';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/tokens';
import { capTokens } from '../../../tokens';
import type { InputState } from './Input.types';

const iconFilledClassName = 'fui-Icon-filled';
const iconRegularClassName = 'fui-Icon-regular';

const useStyles = makeStyles({
  // Fluent already sets display/align/flex/box/vertical-align/typography/bg/border on the root.
  // CAP only overrides height, padding, border (all-sides accessible color),
  // radius, foreground color, and removes Fluent's focus underline (::after).
  root: {
    minHeight: '36px',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalMNudge}`,
    color: tokens.colorNeutralForeground1,
    borderRadius: capTokens.borderRadius2XLarge,
    '::after': { content: 'unset' },
  },
  small: {
    minHeight: '28px',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusXLarge,
  },
  medium: {
    /* same as root */
  },
  large: {
    minHeight: '44px',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalM}`,
  },
  // Fluent already handles disabled root visuals; CAP only needs to keep the
  // foreground color override so the input inherits it (see inputStyles.base).
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
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
    ':active,:focus-within': {
      color: capTokens.colorNeutralForeground5Pressed,
    },
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
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
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
  // Fluent already sets display:flex, color, > svg font size, box-sizing on content slots.
  // CAP only needs to override the color to inherit from the root (so hasValue/noValue
  // color transitions propagate to icons) and add per-size content paddings.
  base: {
    color: 'inherit',
  },

  smallContentBefore: { paddingRight: tokens.spacingHorizontalXS },
  smallContentAfter: { paddingLeft: tokens.spacingHorizontalS },

  mediumContentBefore: { paddingRight: tokens.spacingHorizontalSNudge },
  mediumContentAfter: { paddingLeft: tokens.spacingHorizontalMNudge },

  largeContentBefore: { paddingRight: tokens.spacingHorizontalS },
  largeContentAfter: { paddingLeft: tokens.spacingHorizontalM },

  disabled: { color: 'inherit' },
});

const useInputElementStyles = makeStyles({
  // Fluent already sets layout/reset (alignSelf, flexGrow, minWidth, box-sizing,
  // border:none, outline:none, font-family/size/weight/line-height, bg:transparent).
  // CAP only needs the foreground inheritance so root color drives the input + placeholder.
  base: {
    color: 'inherit',
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
    (appearance === 'outline' || appearance === 'underline') &&
      isEditable &&
      appearanceStyles[appearance],
    isEditable && isEditableStyles[color],
    invalid && styles.invalid,
    disabled && styles.disabled,
    disabled && appearance === 'underline' && styles.disabledUnderline,
    getSlotClassNameProp_unstable(state.root)
  );

  state.input.className = mergeClasses(
    state.input.className,
    inputClassNames.input,
    inputStyles.base,
    disabled && inputStyles.disabled,
    getSlotClassNameProp_unstable(state.input)
  );

  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(
      state.contentBefore.className,
      inputClassNames.contentBefore,
      contentStyles.base,
      contentStyles[`${size}ContentBefore`],
      disabled && contentStyles.disabled,
      getSlotClassNameProp_unstable(state.contentBefore)
    );
  }

  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(
      state.contentAfter.className,
      inputClassNames.contentAfter,
      contentStyles.base,
      contentStyles[`${size}ContentAfter`],
      disabled && contentStyles.disabled,
      getSlotClassNameProp_unstable(state.contentAfter)
    );
  }

  return state;
};
