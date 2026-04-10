import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { TooltipState } from './Tooltip.types';

const useStyles = makeStyles({
  root: {
    ...typographyStyles.caption1Strong,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow8,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalMNudge}`,
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
});

export const useTooltipStyles_unstable = (
  state: TooltipState
): TooltipState => {
  const styles = useStyles();
  const { extendedAppearance } = state;

  state.content.className = mergeClasses(
    state.content.className,
    styles.root,
    extendedAppearance === 'brand' && styles.brand,
    getSlotClassNameProp_unstable(state.content)
  );

  return state;
};
