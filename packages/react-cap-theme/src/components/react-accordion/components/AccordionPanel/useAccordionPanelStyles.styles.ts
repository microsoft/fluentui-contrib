import { type AccordionPanelState } from '@fluentui/react-accordion';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

const useStyles = makeStyles({
  root: {
    marginBottom: tokens.spacingVerticalM,
  },
});

export const useAccordionPanelStyles = (
  state: AccordionPanelState
): AccordionPanelState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
