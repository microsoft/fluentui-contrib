import type { DrawerHeaderNavigationState } from '@fluentui/react-drawer';
import { useDrawerHeaderNavigationStyles_unstable } from '@fluentui/react-drawer';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: { margin: `0 ${tokens.spacingHorizontalS}` },
});

export const useDrawerHeaderNavigationStyles = (
  state: DrawerHeaderNavigationState
): DrawerHeaderNavigationState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return useDrawerHeaderNavigationStyles_unstable(state);
};
