import { type DialogTitleState } from '@fluentui/react-dialog';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';

const useStyles = makeStyles({
  action: {
    marginRight: '-8px',
  },
});

export const useDialogTitleStyles = (
  state: DialogTitleState
): DialogTitleState => {
  const styles = useStyles();
  if (state.action)
    state.action.className = mergeClasses(
      state.action.className,
      styles.action,
      getSlotClassNameProp_unstable(state.action)
    );
  return state;
};
