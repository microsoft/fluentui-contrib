import {
  useMenuDividerStyles_unstable,
  type MenuDividerSlots,
  type MenuDividerState,
} from '@fluentui/react-menu';
import type { SlotClassNames } from '@fluentui/react-utilities';
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
    menuDividerClassNames.root,
    styles.root,
    state.root.className
  );
  useMenuDividerStyles_unstable(state);
  return state;
};
