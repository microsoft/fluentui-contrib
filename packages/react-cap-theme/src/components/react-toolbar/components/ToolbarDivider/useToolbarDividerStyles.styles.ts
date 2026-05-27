import type { ToolbarDividerState } from '@fluentui/react-toolbar';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/tokens';

const useStyles = makeStyles({
  root: {
    paddingLeft: tokens.spacingHorizontalMNudge,
    paddingRight: tokens.spacingHorizontalMNudge,
  },
});

/**
 * Apply styles to the ToolbarDivider component.
 * Adds horizontal padding around the divider and delegates to Fluent's styles.
 * @param state - The ToolbarDivider state to apply styles to
 * @returns The updated ToolbarDividerState object
 * @alpha
 */
export const useToolbarDividerStyles = (
  state: ToolbarDividerState
): ToolbarDividerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
