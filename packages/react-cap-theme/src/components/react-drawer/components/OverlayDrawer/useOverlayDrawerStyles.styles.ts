import type { OverlayDrawerState } from '@fluentui/react-drawer';
import { useOverlayDrawerStyles_unstable } from '@fluentui/react-drawer';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useDrawerBaseClassNames } from '../../shared/useDrawerBaseStyles.styles';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
  return useOverlayDrawerStyles_unstable(state);
};
