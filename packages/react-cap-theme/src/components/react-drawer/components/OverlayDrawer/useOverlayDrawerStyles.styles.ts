import type { OverlayDrawerState } from '@fluentui/react-drawer';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useDrawerBaseClassNames } from '../../shared/useDrawerBaseStyles.styles';

const useStyles = makeStyles({
  root: { boxShadow: tokens.shadow64 },
});

export const useOverlayDrawerStyles = (
  state: OverlayDrawerState
): OverlayDrawerState => {
  const baseClassNames = useDrawerBaseClassNames(state);
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    baseClassNames,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
