import { useLinkStyles_unstable } from '@fluentui/react-link';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

import type { LinkState } from './Link.types';
import { toBaseState } from './Link.utils';

const useStyles = makeStyles({
  bold: {
    fontWeight: tokens.fontWeightSemibold,
  },
  inverted: {
    color: tokens.colorNeutralForegroundInvertedLink,
    ':hover': {
      color: tokens.colorNeutralForegroundInvertedLinkHover,
    },
    ':hover:active': {
      color: tokens.colorNeutralForegroundInvertedLinkPressed,
    },
    ':focus': {
      textDecorationColor: tokens.colorNeutralForegroundInvertedLink,
    },
  },
});

export const useLinkStyles = (state: LinkState): LinkState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    state.bold && styles.bold,
    state.appearance === 'inverted' && styles.inverted,
    getSlotClassNameProp_unstable(state.root)
  );

  useLinkStyles_unstable(toBaseState(state));
  return state;
};
