import type { MenuItemRadioState } from '@fluentui/react-menu';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles.styles';

const useStyles = makeStyles({
  checkmark: {
    fontSize: '20px',
    height: '20px',
    marginTop: 0,
    visibility: 'visible',
    width: '20px',
  },
});

export const useMenuItemRadioStyles = (
  state: MenuItemRadioState
): MenuItemRadioState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    getSlotClassNameProp_unstable(state.root)
  );
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
