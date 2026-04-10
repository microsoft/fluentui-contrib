import type { PopoverSurfaceState } from '@fluentui/react-popover';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

const useStyles = makeStyles({
  root: { borderRadius: tokens.borderRadius4XLarge },
  inverted: { backgroundColor: tokens.colorNeutralBackgroundInverted },
});

export const usePopoverSurfaceStyles_unstable = (
  state: PopoverSurfaceState
): PopoverSurfaceState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    state.appearance === 'inverted' && styles.inverted,
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
