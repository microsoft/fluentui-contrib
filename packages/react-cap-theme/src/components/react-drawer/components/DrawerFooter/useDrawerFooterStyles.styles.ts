import type { DrawerFooterState } from '@fluentui/react-drawer';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

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
  return state;
};
