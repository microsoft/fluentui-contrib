import {
  menuItemClassNames,
  type MenuSplitGroupState,
} from '@fluentui/react-menu';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/tokens';
import { capTokens } from '../../../tokens/tokens';

const useStyles = makeStyles({
  root: {
    [`& > .${menuItemClassNames.root}:nth-of-type(1)`]: {
      alignSelf: 'center',
      borderBottomRightRadius: tokens.borderRadiusLarge,
      borderTopRightRadius: tokens.borderRadiusLarge,
    },
    [`& > .${menuItemClassNames.root}:nth-of-type(2)`]: {
      paddingBottom: tokens.spacingVerticalSNudge,
      paddingRight: tokens.spacingHorizontalSNudge,
      paddingTop: tokens.spacingVerticalSNudge,
      borderTopLeftRadius: tokens.borderRadiusLarge,
      borderBottomLeftRadius: tokens.borderRadiusLarge,
    },
    [`& > .${menuItemClassNames.root}:nth-of-type(2):hover::before`]: {
      backgroundColor: capTokens.colorNeutralStroke4Hover,
    },
    [`& > .${menuItemClassNames.root}:nth-of-type(2):hover:active::before`]: {
      backgroundColor: capTokens.colorNeutralStroke4Pressed,
    },
    [`& > .${menuItemClassNames.root}:nth-of-type(2)::before`]: {
      alignSelf: 'center',
      height: '16px',
      backgroundColor: capTokens.colorNeutralStroke4,
    },
  },
});

/**
 * @param state - The MenuSplitGroup state object
 * @returns The updated state with applied styles
 * @alpha
 */
export const useMenuSplitGroupStyles = (
  state: MenuSplitGroupState
): MenuSplitGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
