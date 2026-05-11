import type { MenuItemCheckboxState } from '@fluentui/react-menu';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles.styles';

const useStyles = makeStyles({
  checkmark: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
});

export const useMenuItemCheckboxStyles = (
  state: MenuItemCheckboxState
): MenuItemCheckboxState => {
  const styles = useStyles();

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      state.checkmark.className,
      styles.checkmark,
      getSlotClassNameProp_unstable(state.checkmark)
    );
  }

  useMenuItemStyles(state);

  return state;
};
