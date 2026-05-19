import { type MenuPopoverState } from '@fluentui/react-menu';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/tokens';
import { capTokens } from '../../../tokens/tokens';

const useStyles = makeStyles({
  root: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAlpha}`,
    borderRadius: capTokens.borderRadius2XLarge,
    boxShadow: '0 3px 12px 0 rgba(0, 0, 0, 0.18)', // FIXME: update to use shadow token once it's available
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
    width: 'auto',
    minWidth: '160px',
  },
});

/**
 * @param state - The MenuPopover state object
 * @returns The updated state with applied styles
 * @alpha
 */
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
