import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useDrawerBaseClassNames } from '../../shared/useDrawerBaseStyles.styles';
import type { InlineDrawerState } from './InlineDrawer.types';

const useStyles = makeStyles({
  solid: { boxShadow: tokens.shadow2 },
  transparent: { backgroundColor: tokens.colorTransparentBackground },
});

export const useInlineDrawerStyles = (
  state: InlineDrawerState
): InlineDrawerState => {
  const baseClassNames = useDrawerBaseClassNames(state);
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    baseClassNames,
    styles[state.appearance],
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
