import { makeStyles, mergeClasses } from '@griffel/react';
import type { ListboxState } from '@fluentui/react-combobox';
import { tokens } from '@fluentui/tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAlpha}`,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow4,
    maxHeight: '80vh',
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
  },
});

/**
 * Apply styling to the Listbox slots based on the state
 * @param state - The current Listbox state
 * @returns The updated Listbox state with applied styles
 * @alpha
 */
export const useListboxStyles = (state: ListboxState): ListboxState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
