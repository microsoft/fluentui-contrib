import type { MenuItemRadioState, MenuItemSlots } from '@fluentui/react-menu';
import {
  getSlotClassNameProp_unstable,
  type SlotClassNames,
} from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles.styles';

export const menuItemRadioClassNames: SlotClassNames<
  Omit<MenuItemSlots, 'submenuIndicator'>
> = {
  root: 'fui-MenuItemRadio',
  content: 'fui-MenuItemRadio__content',
  icon: 'fui-MenuItemRadio__icon',
  checkmark: 'fui-MenuItemRadio__checkmark',
  secondaryContent: 'fui-MenuItemRadio__secondaryContent',
  subText: 'fui-MenuItemRadio__subText',
};

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
    menuItemRadioClassNames.root,
    getSlotClassNameProp_unstable(state.root)
  );
  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      state.checkmark.className,
      menuItemRadioClassNames.content,
      styles.checkmark,
      getSlotClassNameProp_unstable(state.checkmark)
    );
  }

  useMenuItemStyles(state);
  return state;
};
