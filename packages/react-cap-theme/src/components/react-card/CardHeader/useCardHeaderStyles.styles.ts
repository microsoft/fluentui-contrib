import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { CardHeaderState } from './CardHeader.types';

const useStyles = makeStyles({
  header: {
    ...typographyStyles.subtitle1,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
  },
  description: {
    ...typographyStyles.body1,
    display: 'flex',
    alignItems: 'center',
    color: tokens.colorNeutralForeground3,
    gap: tokens.spacingHorizontalXS,
  },
  action: {
    display: 'flex',
    alignItems: 'center',
  },

  alignToDescription: { alignSelf: 'end' },
  alignToHeader: { alignSelf: 'start' },
});

const useDescriptionStyles = makeStyles({
  disabled: { color: 'inherit' },
});

export const useCardHeaderStyles = (
  state: CardHeaderState
): CardHeaderState => {
  const styles = useStyles();
  const descriptionStyles = useDescriptionStyles();
  const { disabled } = state;

  if (state.header) {
    state.header.className = mergeClasses(
      state.header.className,
      styles.header,
      state.description && styles.alignToDescription,
      getSlotClassNameProp_unstable(state.header)
    );
  }

  if (state.description) {
    state.description.className = mergeClasses(
      state.description.className,
      styles.description,
      state.header && styles.alignToHeader,
      disabled && descriptionStyles.disabled,
      getSlotClassNameProp_unstable(state.description)
    );
  }

  if (state.action) {
    state.action.className = mergeClasses(
      state.action.className,
      styles.action,
      getSlotClassNameProp_unstable(state.action)
    );
  }

  return state;
};
