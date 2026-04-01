import {
  type AccordionPanelState,
  useAccordionPanelStyles_unstable,
} from '@fluentui/react-accordion';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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

  useAccordionPanelStyles_unstable(state);

  return state;
};
