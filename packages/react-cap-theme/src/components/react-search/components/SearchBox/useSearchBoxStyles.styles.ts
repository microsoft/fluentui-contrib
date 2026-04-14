import type { SlotClassNames } from '@fluentui/react-utilities';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { searchBoxClassNames } from '@fluentui/react-search';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/tokens';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { capTokens } from '../../../tokens';
import { useInputStyles } from '../../react-input/components/Input/useInputStyles.styles';

import type { SearchBoxInternalSlots, SearchBoxState } from './SearchBox.types';

const searchBoxInternalClassNames: SlotClassNames<SearchBoxInternalSlots> = {
  separator: 'spui-SearchBox__separator',
};

const useStyles = makeStyles({
  root: {
    maxWidth: '468px',
    display: 'flex',
    ...shorthands.borderColor(capTokens.colorNeutralStroke4),
  },
  isEditable: {
    ':hover': {
      ...shorthands.borderColor(capTokens.colorNeutralStroke4Hover),
    },
  },
  input: {
    flex: '1 1 0%',
    '::-webkit-search-decoration': { display: 'none' },
    '::-webkit-search-cancel-button': { display: 'none' },
  },
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
  disabled: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
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
  root: {
    display: 'none',
    alignSelf: 'center',
    boxSizing: 'border-box',
    color: tokens.colorNeutralForeground5Pressed,
    cursor: 'pointer',

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
    ...shorthands.borderColor(tokens.colorTransparentStroke),
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

/**
 * Apply styling to the SearchBox based on the state.
 * @param state - The state of the SearchBox component
 * @returns The updated state with styles applied
 * @alpha
 */
export const useSearchBoxStyles = (state: SearchBoxState): SearchBoxState => {
  const styles = useStyles();
  const filledInsetStyles = useFilledInsetStyles();
  const separatorStyles = useSeparatorStyles();
  const dismissStyles = useDismissStyles();
  const contentAfterStyles = useContentAfterStyles();

  const appearance = state.appearance ?? 'outline';
  const { size } = state;
  const { disabled } = state.input;
  const isEditable = !disabled;
  const hasInputValue: boolean = !!state.input.value;
  const contentAfter: boolean = !!state.contentAfter?.children;

  state.root.className = mergeClasses(
    state.root.className,
    searchBoxClassNames.root,
    styles.root,
    isEditable && styles.isEditable,
    appearance === 'filled-inset' &&
      mergeClasses(
        filledInsetStyles.root,
        isEditable && filledInsetStyles.isEditable,
      ),
    isEditable && hasInputValue && styles.isEditableHasInputValue,
    isEditable &&
      hasInputValue &&
      contentAfter &&
      styles.isEditableHasInputValueHasContentAfter,
    disabled &&
      (appearance === 'filled-inset'
        ? filledInsetStyles.disabled
        : styles.disabled),
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.separator) {
    state.separator.className = mergeClasses(
      state.separator.className,
      searchBoxInternalClassNames.separator,
      separatorStyles.root,
      separatorStyles[size],
      getSlotClassNameProp_unstable(state.separator),
    );
  }

  if (state.dismiss) {
    state.dismiss.className = mergeClasses(
      state.dismiss.className,
      searchBoxClassNames.dismiss,
      dismissStyles.root,
      isEditable && dismissStyles.isEditable,
      dismissStyles[size],
      getSlotClassNameProp_unstable(state.dismiss),
    );
  }

  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(
      state.contentBefore.className,
      searchBoxClassNames.contentBefore,
      getSlotClassNameProp_unstable(state.contentBefore),
    );
  }

  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(
      state.contentAfter.className,
      searchBoxClassNames.contentAfter,
      contentAfterStyles[size],
      getSlotClassNameProp_unstable(state.contentAfter),
    );
  }

  if (state.input) {
    state.input.className = mergeClasses(
      state.input.className,
      searchBoxClassNames.input,
      styles.input,
      getSlotClassNameProp_unstable(state.input),
    );
  }

  useInputStyles({ ...state, appearance: 'outline' });

  return state;
};
