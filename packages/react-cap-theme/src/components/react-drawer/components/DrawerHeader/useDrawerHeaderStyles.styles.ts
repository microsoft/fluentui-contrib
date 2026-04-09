import type { DrawerHeaderState } from '@fluentui/react-drawer';
import {
  drawerHeaderNavigationClassNames,
  drawerHeaderTitleClassNames,
} from '@fluentui/react-drawer';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

const useStyles = makeStyles({
  root: {
    gap: tokens.spacingVerticalMNudge,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL} ${tokens.spacingVerticalXS}`,
    [`:has(.${drawerHeaderNavigationClassNames.root})`]: {
      padding: `${tokens.spacingVerticalL} 0 ${tokens.spacingVerticalM}`,
      [`& .${drawerHeaderTitleClassNames.root}`]: {
        padding: `0 ${tokens.spacingHorizontalXL}`,
      },
    },
  },
});

export const useDrawerHeaderStyles = (
  state: DrawerHeaderState
): DrawerHeaderState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
