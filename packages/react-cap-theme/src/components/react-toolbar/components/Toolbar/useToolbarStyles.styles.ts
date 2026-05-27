import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { ToolbarState } from './Toolbar.types';

const useStyles = makeStyles({
  root: {
    ...shorthands.border(
      tokens.strokeWidthThin,
      'solid',
      tokens.colorTransparentStroke
    ),
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    display: 'inline-flex',
  },
  contextual: { boxShadow: tokens.shadow8 },
  static: { boxShadow: 'none' },
});

/**
 * Apply styles to the Toolbar component.
 * @param state - The toolbar state containing appearance and styling information
 * @returns The updated toolbar state with applied styles
 * @public
 */
export const useToolbarStyles = (state: ToolbarState): ToolbarState => {
  const styles = useStyles();
  const { appearance } = state;

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    styles[appearance],
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
