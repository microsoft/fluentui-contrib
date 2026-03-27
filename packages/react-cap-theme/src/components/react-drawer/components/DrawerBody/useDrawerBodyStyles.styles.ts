import type { DrawerBodyState } from '@fluentui/react-drawer';
import { useDrawerBodyStyles_unstable } from '@fluentui/react-drawer';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

const useStyles = makeStyles({
  root: { padding: `0 ${tokens.spacingHorizontalXL}` },
});

export const useDrawerBodyStyles = (
  state: DrawerBodyState
): DrawerBodyState => {
  const styles = useStyles();

  state.root.className = mergeClasses(styles.root, state.root.className);
  return useDrawerBodyStyles_unstable(state);
};
