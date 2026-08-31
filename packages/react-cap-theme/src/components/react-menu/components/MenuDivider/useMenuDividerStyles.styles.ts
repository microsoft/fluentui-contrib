import { type MenuDividerState } from '@fluentui/react-menu';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { capTokens } from '../../../tokens/tokens';

const useStyles = makeStyles({
  root: {
    borderBottomColor: capTokens.colorNeutralStroke4,
    margin: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
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
