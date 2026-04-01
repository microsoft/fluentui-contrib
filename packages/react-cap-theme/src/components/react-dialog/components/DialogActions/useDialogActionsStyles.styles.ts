import {
  type DialogActionsState,
  useDialogActionsStyles_unstable,
} from '@fluentui/react-dialog';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { DIALOG_CONTAINER_QUERY_BREAKPOINT_SELECTOR } from '../../constants/queries';

const useStyles = makeStyles({
  root: {
    gap: tokens.spacingHorizontalS,
    [DIALOG_CONTAINER_QUERY_BREAKPOINT_SELECTOR]: {
      flexDirection: 'column',
      justifySelf: 'stretch',
    },
  },
  end: {
    gridColumnStart: 'auto',
    [DIALOG_CONTAINER_QUERY_BREAKPOINT_SELECTOR]: {
      gridColumnStart: 1,
      gridRowEnd: 'auto',
    },
  },
  start: {
    [DIALOG_CONTAINER_QUERY_BREAKPOINT_SELECTOR]: { gridColumnEnd: 4 },
  },
});

export const useDialogActionsStyles = (
  state: DialogActionsState
): DialogActionsState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    state.position === 'start' && styles.start,
    state.position === 'end' && styles.end,
    getSlotClassNameProp_unstable(state.root)
  );
  return useDialogActionsStyles_unstable(state);
};
