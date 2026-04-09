import type { DialogBodyState } from '@fluentui/react-dialog';
import { dialogActionsClassNames } from '@fluentui/react-dialog';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { DIALOG_CONTAINER_QUERY_BREAKPOINT_SELECTOR } from '../../constants/queries';

const useStyles = makeStyles({
  root: {
    gap: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalS}`,
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    [DIALOG_CONTAINER_QUERY_BREAKPOINT_SELECTOR]: {
      [`& > .${dialogActionsClassNames.root}`]: {
        gridRowStart: 3,
      },
      [`& > .${dialogActionsClassNames.root} + .${dialogActionsClassNames.root}`]:
        {
          gridRowStart: 4,
        },
    },
  },
});

export const useDialogBodyStyles = (
  state: DialogBodyState
): DialogBodyState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
