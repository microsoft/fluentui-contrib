import type { DrawerFooterState } from '@fluentui/react-drawer';
import { useDrawerFooterStyles_unstable } from '@fluentui/react-drawer';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    justifyContent: 'flex-end',
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
  },
});

export const useDrawerFooterStyles = (
  state: DrawerFooterState
): DrawerFooterState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return useDrawerFooterStyles_unstable(state);
};
