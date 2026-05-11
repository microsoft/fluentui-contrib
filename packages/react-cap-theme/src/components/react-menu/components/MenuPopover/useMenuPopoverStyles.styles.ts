import { type MenuPopoverState } from '@fluentui/react-menu';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

const useStyles = makeStyles({
  root: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAlpha}`,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow4,
    padding: `calc(${tokens.spacingVerticalSNudge} - 1px) calc(${tokens.spacingHorizontalSNudge} - 1px)`,
    width: '248px',
  },
});

export const useMenuPopoverStyles = (
  state: MenuPopoverState
): MenuPopoverState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
