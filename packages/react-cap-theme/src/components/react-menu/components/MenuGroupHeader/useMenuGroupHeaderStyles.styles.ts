import { type MenuGroupHeaderState } from '@fluentui/react-menu';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/tokens';
import { typographyStyles } from '@fluentui/tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

const useStyles = makeStyles({
  root: {
    ...typographyStyles.caption1Strong,
    height: 'auto',
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalS} ${tokens.spacingVerticalS}`,
    color: tokens.colorNeutralForeground2,
  },
});

export const useMenuGroupHeaderStyles = (
  state: MenuGroupHeaderState
): MenuGroupHeaderState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
