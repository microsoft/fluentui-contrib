import { toolbarGroupClassNames } from '@fluentui/react-toolbar';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/tokens';
import { capTokens } from '../../../tokens';
import type { ToolbarState } from './Toolbar.types';

const useStyles = makeStyles({
  root: {
    ...shorthands.border(
      tokens.strokeWidthThin,
      'solid',
      tokens.colorTransparentStroke
    ),
    borderRadius: tokens.borderRadiusXLarge,
    gap: tokens.spacingHorizontalSNudge,
    whiteSpace: 'nowrap',
    [`& .${toolbarGroupClassNames.root}`]: {
      gap: tokens.spacingHorizontalSNudge,
    },
    '@media (forced-colors: active)': shorthands.borderColor('Canvas'),
  },
  contextual: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
  },
  static: {
    backgroundColor: tokens.colorTransparentBackground,
    boxShadow: 'none',
  },
  start: { justifyContent: 'flex-start' },
  ['space-between']: { justifyContent: 'space-between' },
  end: { justifyContent: 'flex-end' },
  large: {
    borderRadius: capTokens.borderRadius3XLarge,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
  },
  medium: {
    borderRadius: capTokens.borderRadius2XLarge,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalSNudge}`,
  },
  small: {
    borderRadius: tokens.borderRadiusXLarge,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXXS}`,
  },
  contained: { display: 'inline-flex', width: 'fit-content' },
  full: { boxSizing: 'border-box', display: 'flex', width: '100%' },
});

export const useToolbarStyles = (state: ToolbarState): ToolbarState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    styles[state.appearance],
    styles[state.layout],
    styles[state.size],
    styles[state.width],
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
