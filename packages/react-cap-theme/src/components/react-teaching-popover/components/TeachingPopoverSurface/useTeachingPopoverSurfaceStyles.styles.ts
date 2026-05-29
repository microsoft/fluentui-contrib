import type { TeachingPopoverSurfaceState } from '@fluentui/react-teaching-popover';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { usePopoverSurfaceStyles } from '../../../react-popover';

const useStyles = makeStyles({
  root: {
    minWidth: '320px',
    boxSizing: 'border-box',
  },
});

export const useTeachingPopoverSurfaceStyles = (
  state: TeachingPopoverSurfaceState
): TeachingPopoverSurfaceState => {
  const styles = useStyles();

  usePopoverSurfaceStyles(state);

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
