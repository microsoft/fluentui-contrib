import { type MenuDividerState } from '@fluentui/react-menu';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

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
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
