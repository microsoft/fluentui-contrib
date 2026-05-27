import type { TeachingPopoverHeaderState } from '@fluentui/react-teaching-popover';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/tokens';

const useStyles = makeStyles({
  root: { paddingBottom: tokens.spacingHorizontalMNudge },
  iconSize: { width: '20px', height: '20px' },
  iconColor: { color: tokens.colorNeutralForeground3 },
  dismissButton: {
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
  },
});

export const useTeachingPopoverHeaderStyles = (
  state: TeachingPopoverHeaderState
): TeachingPopoverHeaderState => {
  const styles = useStyles();
  const isBrand = state.appearance === 'brand';

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      styles.iconSize,
      !isBrand && styles.iconColor,
      getSlotClassNameProp_unstable(state.icon)
    );
  }

  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      state.dismissButton.className,
      styles.dismissButton,
      getSlotClassNameProp_unstable(state.dismissButton)
    );
  }

  return state;
};
