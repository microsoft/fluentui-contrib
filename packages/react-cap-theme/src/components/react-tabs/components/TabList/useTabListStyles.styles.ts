import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { TabListState } from './TabList.types';

const useStyles = makeStyles({
  horizontal: { gap: tokens.spacingHorizontalS },
  vertical: { alignItems: 'start', gap: tokens.spacingVerticalSNudge },
  verticalLarge: { gap: tokens.spacingVerticalS },
});

/**
 * Applies styles to the TabList component.
 * @param state - The TabList component state object.
 * @returns The updated state object with applied styles.
 * @alpha
 */
export const useTabListStyles = (state: TabListState): TabListState => {
  const styles = useStyles();
  const { size, vertical } = state;

  state.root.className = mergeClasses(
    state.root.className,
    vertical ? styles.vertical : styles.horizontal,
    vertical && size === 'large' && styles.verticalLarge,
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
