import type {
  MenuItemCheckboxState,
  MenuItemSlots,
} from '@fluentui/react-menu';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles.styles';

export const menuItemCheckboxClassNames: SlotClassNames<MenuItemSlots> = {
  root: 'fui-MenuItemCheckbox',
  content: 'fui-MenuItemCheckbox__content',
  icon: 'fui-MenuItemCheckbox__icon',
  checkmark: 'fui-MenuItemCheckbox__checkmark',
  submenuIndicator: 'fui-MenuItemCheckbox__submenuIndicator',
  secondaryContent: 'fui-MenuItemCheckbox__secondaryContent',
  subText: 'fui-MenuItemCheckbox__subText',
};

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
      menuItemCheckboxClassNames.checkmark,
      styles.checkmark,
      state.checkmark.className
    );
  }

  useMenuItemStyles(state);

  return state;
};
