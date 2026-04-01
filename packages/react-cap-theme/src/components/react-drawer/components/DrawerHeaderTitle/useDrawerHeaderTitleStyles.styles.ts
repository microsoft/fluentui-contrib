import type { DrawerHeaderTitleState } from '@fluentui/react-drawer';
import { useDrawerHeaderTitleStyles_unstable } from '@fluentui/react-drawer';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  action: {
    alignItems: 'center',
    display: 'flex',
    marginRight: '-12px',
    paddingLeft: tokens.spacingHorizontalS,
  },
});

export const useDrawerHeaderTitleStyles = (
  state: DrawerHeaderTitleState
): DrawerHeaderTitleState => {
  const styles = useStyles();

  if (state.action) {
    state.action.className = mergeClasses(
      state.action.className,
      styles.action,
      getSlotClassNameProp_unstable(state.action)
    );
  }

  return useDrawerHeaderTitleStyles_unstable(state);
};
