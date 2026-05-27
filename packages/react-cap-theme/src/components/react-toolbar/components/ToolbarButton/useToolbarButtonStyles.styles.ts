import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useButtonStyles } from '../../../react-button';
import type { ToolbarButtonState } from './ToolbarButton.types';

const useStyles = makeStyles({
  root: { maxWidth: 'fit-content', minWidth: 'fit-content' },
});

/**
 * Apply styles to the ToolbarButton component.
 * Combines Fluent UI styles with SharePoint-specific styling including optimized padding and sizing.
 * @param state - The button state to apply styles to
 * @returns The updated ToolbarButtonState object
 * @alpha
 */
export const useToolbarButtonStyles = (
  state: ToolbarButtonState
): ToolbarButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );

  useButtonStyles(state);
  return state;
};
