import {
  type MenuDividerSlots,
  type MenuDividerState,
} from '@fluentui/react-menu';
import {
  getSlotClassNameProp_unstable,
  type SlotClassNames,
} from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

export const menuDividerClassNames: SlotClassNames<MenuDividerSlots> = {
  root: 'fui-MenuDivider',
};

const useStyles = makeStyles({
  root: {
    borderBottomColor: tokens.colorNeutralStroke3,
    margin: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalXS}`,
  },
});

export const useMenuDividerStyles = (
  state: MenuDividerState
): MenuDividerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    menuDividerClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
