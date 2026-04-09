import type { DrawerHeaderTitleState } from '@fluentui/react-drawer';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

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

  return state;
};
