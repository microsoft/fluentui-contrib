import {
  type MenuItemLinkState,
  type MenuItemState,
  menuItemLinkClassNames,
} from '@fluentui/react-menu';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles.styles';

const useStyles = makeStyles({
  resetLink: {
    textDecorationLine: 'none',
    textDecorationThickness: 'initial',
    textDecorationStyle: 'initial',
    textDecorationColor: 'initial',
  },
});

export const useMenuItemLinkStyles = (
  state: MenuItemLinkState
): MenuItemLinkState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    menuItemLinkClassNames.root,
    styles.resetLink,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      menuItemLinkClassNames.icon,
    );
  }

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      menuItemLinkClassNames.content,
    );
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      menuItemLinkClassNames.secondaryContent,
    );
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      state.checkmark.className,
      menuItemLinkClassNames.checkmark,
    );
  }

  useMenuItemStyles(state as MenuItemState);

  return state;
};
