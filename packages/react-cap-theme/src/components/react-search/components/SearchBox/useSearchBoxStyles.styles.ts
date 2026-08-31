import type { SlotClassNames } from '@fluentui/react-utilities';
import { searchBoxClassNames } from '@fluentui/react-search';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { tokens } from '@fluentui/tokens';
import { capTokens } from '../../../tokens';
import { useInputStyles } from '../../../react-input';

import type { SearchBoxInternalSlots, SearchBoxState } from './SearchBox.types';

const searchBoxInternalClassNames: SlotClassNames<SearchBoxInternalSlots> = {
  separator: 'fui-SearchBox__separator',
};

const useStyles = makeStyles({
  outline: {
    ...shorthands.borderColor(capTokens.colorNeutralStroke4),
    ':hover': { ...shorthands.borderColor(capTokens.colorNeutralStroke4Hover) },
  },
  underline: {
    borderBottomColor: capTokens.colorNeutralStroke4,
    ':hover': { borderBottomColor: capTokens.colorNeutralStroke4Hover },
  },
  // CAP-only: reveal dismiss/separator on active/focus when there's a value.
  isEditableHasInputValue: {
    ':active,:focus-within': {
      [`& .${searchBoxClassNames.dismiss}`]: { display: 'flex' },
    },
  },
  isEditableHasInputValueHasContentAfter: {
    ':active,:focus-within': {
      [`& .${searchBoxInternalClassNames.separator}`]: { display: 'flex' },
    },
  },
  // CAP delta: with `display: flex` on root, give the input `flex-basis: 0`
  // so it distributes remaining space proportionally instead of starting from
  // its intrinsic content width (which `flex-basis: auto` would do).
  // Fluent base already handles the `::-webkit-search-*` resets.
  input: {
    flex: '1 1 0%',
  },
});

const useSeparatorStyles = makeStyles({
  root: {
    display: 'none',
    alignSelf: 'stretch',
    borderLeft: `${tokens.strokeWidthThin} solid ${capTokens.colorNeutralStroke4Pressed}`,
    borderRadius: tokens.borderRadiusCircular,
    margin: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
  },
  small: {
    margin: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXXS} ${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
  },
  medium: {},
  large: {
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXS} ${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
  },
});

const useDismissStyles = makeStyles({
  // Fluent base sets boxSizing/display/cursor/> svg fontSize (20px @ medium)
  // and disabled color. CAP only hides by default (revealed on focus+hasValue),
  // centers vertically, and uses CAP's foreground token.
  root: {
    display: 'none',
    alignSelf: 'center',
    color: capTokens.colorNeutralForeground5Pressed,

    '> svg': { fontSize: tokens.fontSizeBase500 },
  },
  isEditable: {
    ':hover': {
      [`& .${iconRegularClassName}`]: { display: 'none' },
      [`& .${iconFilledClassName}`]: { display: 'inline' },
    },
  },
  small: { '> svg': { fontSize: tokens.fontSizeBase400 } },
  medium: {},
  large: {},
});

const useContentAfterStyles = makeStyles({
  small: { gap: tokens.spacingHorizontalXXS },
  medium: { gap: tokens.spacingHorizontalXS },
  large: { gap: tokens.spacingHorizontalS },
});

const useFilledInsetStyles = makeStyles({
  root: {
    ...shorthands.borderColor(tokens.colorTransparentStroke), // High contrast support
    borderRadius: tokens.borderRadiusCircular,
    boxShadow: `0 1px 3px 0 ${tokens.colorNeutralShadowAmbient} inset`,
  },
  isEditable: {
    ':active,:focus-within': {
      boxShadow: 'none',
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
  disabled: {
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    backgroundColor: tokens.colorTransparentBackground,
    boxShadow: `0 1px 3px 0 ${tokens.colorNeutralShadowAmbient} inset`,
  },
});

export const useSearchBoxStyles = (state: SearchBoxState): SearchBoxState => {
  const styles = useStyles();
  const filledInsetStyles = useFilledInsetStyles();
  const separatorStyles = useSeparatorStyles();
  const dismissStyles = useDismissStyles();
  const contentAfterStyles = useContentAfterStyles();

  const { appearance, size } = state;
  const { disabled } = state.input;
  const isEditable = !disabled;
  const hasInputValue = !!state.input.value;
  const contentAfter = !!state.contentAfter?.children;

  // Forward state as-is, but treat 'filled-inset' as 'outline' so CAP's
  // Input outline deltas (border/radius/etc.) are applied as the base.
  useInputStyles({
    ...state,
    appearance: appearance === 'filled-inset' ? 'outline' : appearance,
  });

  state.root.className = mergeClasses(
    state.root.className,
    isEditable &&
      (appearance === 'outline' ||
        appearance === 'underline' ||
        appearance === 'filled-inset') &&
      styles[appearance === 'filled-inset' ? 'outline' : appearance],
    appearance === 'filled-inset' &&
      mergeClasses(
        filledInsetStyles.root,
        isEditable && filledInsetStyles.isEditable
      ),
    isEditable && hasInputValue && styles.isEditableHasInputValue,
    isEditable &&
      hasInputValue &&
      contentAfter &&
      styles.isEditableHasInputValueHasContentAfter,
    disabled && appearance === 'filled-inset' && filledInsetStyles.disabled,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.separator) {
    state.separator.className = mergeClasses(
      state.separator.className,
      searchBoxInternalClassNames.separator,
      separatorStyles.root,
      separatorStyles[size],
      getSlotClassNameProp_unstable(state.separator)
    );
  }

  if (state.dismiss) {
    state.dismiss.className = mergeClasses(
      state.dismiss.className,
      dismissStyles.root,
      isEditable && dismissStyles.isEditable,
      dismissStyles[size],
      getSlotClassNameProp_unstable(state.dismiss)
    );
  }

  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(
      state.contentAfter.className,
      contentAfterStyles[size],
      getSlotClassNameProp_unstable(state.contentAfter)
    );
  }

  if (state.input) {
    state.input.className = mergeClasses(
      state.input.className,
      styles.input,
      getSlotClassNameProp_unstable(state.input)
    );
  }

  return state;
};
