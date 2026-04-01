import {
  type DialogTitleState,
  useDialogTitleStyles_unstable,
} from '@fluentui/react-dialog';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
  return useDialogTitleStyles_unstable(state);
};
