import {
  menuItemClassNames,
  type MenuSplitGroupSlots,
  type MenuSplitGroupState,
} from '@fluentui/react-menu';
import {
  getSlotClassNameProp_unstable,
  type SlotClassNames,
} from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

export const menuSplitGroupClassNames: SlotClassNames<MenuSplitGroupSlots> = {
  root: 'fui-MenuSplitGroup',
};

const useStyles = makeStyles({
  root: {
    [`& > .${menuItemClassNames.root}:nth-of-type(1)`]: {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
    },
    [`& > .${menuItemClassNames.root}:nth-of-type(2)`]: {
      paddingBottom: tokens.spacingVerticalSNudge,
      paddingRight: tokens.spacingHorizontalSNudge,
      paddingTop: tokens.spacingVerticalSNudge,
    },
    [`& > .${menuItemClassNames.root}:nth-of-type(2)::before`]: {
      alignSelf: 'center',
      height: '100%',
      marginTop: tokens.spacingVerticalS,
      marginBottom: tokens.spacingVerticalS,
    },
    [`& .${menuItemClassNames.submenuIndicator}`]: {
      marginLeft: tokens.spacingHorizontalSNudge,
    },
  },
});

export const useMenuSplitGroupStyles = (
  state: MenuSplitGroupState
): MenuSplitGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    menuSplitGroupClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
