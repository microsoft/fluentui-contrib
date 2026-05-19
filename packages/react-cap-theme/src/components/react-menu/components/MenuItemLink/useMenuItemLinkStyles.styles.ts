import {
  type MenuItemLinkState,
  type MenuItemState,
} from '@fluentui/react-menu';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles.styles';

const useStyles = makeStyles({
  resetLink: {
    textDecorationLine: 'none',
    textDecorationThickness: 'initial',
    textDecorationStyle: 'initial',
    textDecorationColor: 'initial',
  },
});

/**
 * @param state - The MenuItemLink state object
 * @returns The updated state with applied styles
 * @alpha
 */
export const useMenuItemLinkStyles = (
  state: MenuItemLinkState
): MenuItemLinkState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.resetLink,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      getSlotClassNameProp_unstable(state.icon)
    );
  }

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      getSlotClassNameProp_unstable(state.content)
    );
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      getSlotClassNameProp_unstable(state.secondaryContent)
    );
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      state.checkmark.className,
      getSlotClassNameProp_unstable(state.checkmark)
    );
  }

  useMenuItemStyles(state as MenuItemState);

  return state;
};
