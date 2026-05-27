import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useButtonStyles } from '../../../react-button';
import type { ToolbarButtonState } from './ToolbarButton.types';

const useStyles = makeStyles({
  root: { maxWidth: 'fit-content', minWidth: 'fit-content' },
});

export const useToolbarButtonStyles = (
  state: ToolbarButtonState
): ToolbarButtonState => {
  const styles = useStyles();

  useButtonStyles(state);

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
