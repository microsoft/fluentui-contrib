import type { DrawerHeaderNavigationState } from '@fluentui/react-drawer';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

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
  return state;
};
