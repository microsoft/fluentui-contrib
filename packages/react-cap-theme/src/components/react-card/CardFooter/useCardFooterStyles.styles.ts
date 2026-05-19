import { type CardFooterState } from '@fluentui/react-card';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    ...typographyStyles.caption1,
    alignItems: 'center',
    gap: tokens.spacingHorizontalSNudge,
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalSNudge,
    paddingLeft: tokens.spacingHorizontalM,
  },
});

export const useCardFooterStyles = (
  state: CardFooterState
): CardFooterState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.action) {
    state.action.className = mergeClasses(
      state.action.className,
      styles.action,
      getSlotClassNameProp_unstable(state.action)
    );
  }

  return state;
};
