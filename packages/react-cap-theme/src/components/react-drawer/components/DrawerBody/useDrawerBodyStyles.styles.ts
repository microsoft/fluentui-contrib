import type { DrawerBodyState } from '@fluentui/react-drawer';
import { useDrawerBodyStyles_unstable } from '@fluentui/react-drawer';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: { padding: `0 ${tokens.spacingHorizontalXL}` },
});

export const useDrawerBodyStyles = (
  state: DrawerBodyState
): DrawerBodyState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return useDrawerBodyStyles_unstable(state);
};
