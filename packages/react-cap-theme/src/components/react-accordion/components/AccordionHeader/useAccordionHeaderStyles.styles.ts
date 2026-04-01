import {
  useAccordionHeaderStyles_unstable,
  type AccordionHeaderState,
} from '@fluentui/react-accordion';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    [`:hover .${iconFilledClassName}`]: { display: 'inline' },
    [`:hover .${iconRegularClassName}`]: { display: 'none' },
  },
  button: {
    padding: `0 ${tokens.spacingHorizontalS}`,
  },
  buttonSmall: {
    minHeight: '28px',
    ...typographyStyles.caption1,
  },
  buttonMedium: {
    minHeight: '36px',
    ...typographyStyles.body1,
  },
  buttonLarge: {
    ...typographyStyles.body2,
  },
  buttonExtraLarge: {
    minHeight: '52px',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightRegular,
  },
  expandIconStart: {
    paddingRight: tokens.spacingHorizontalSNudge,
  },
  expandIconEnd: {
    padingLeft: tokens.spacingHorizontalSNudge,
  },
  expandIconSmall: {
    lineHeight: tokens.fontSizeBase200,
    fontSize: tokens.fontSizeBase200,
  },
  expandIconMedium: {
    lineHeight: tokens.fontSizeBase400,
    fontSize: tokens.fontSizeBase400,
  },
  focusIndicator: createFocusOutlineStyle({
    style: { outlineRadius: tokens.borderRadius2XLarge },
  }),
  focusIndicatorSmall: createFocusOutlineStyle({
    style: { outlineRadius: tokens.borderRadiusXLarge },
  }),
  icon: {
    paddingRight: tokens.spacingHorizontalXS,
    lineHeight: tokens.lineHeightBase600,
    fontSize: tokens.fontSizeBase600,
  },
  iconSmall: {
    lineHeight: tokens.lineHeightBase400,
    fontSize: tokens.fontSizeBase400,
  },
  iconMedium: {
    lineHeight: tokens.lineHeightBase500,
    fontSize: tokens.fontSizeBase500,
  },
});

export const useAccordionHeaderStyles = (
  state: AccordionHeaderState
): AccordionHeaderState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );

  state.button.className = mergeClasses(
    state.button.className,
    styles.button,
    state.size === 'small' ? styles.focusIndicatorSmall : styles.focusIndicator,
    state.size === 'small' && styles.buttonSmall,
    state.size === 'medium' && styles.buttonMedium,
    state.size === 'large' && styles.buttonLarge,
    state.size === 'extra-large' && styles.buttonExtraLarge,
    getSlotClassNameProp_unstable(state.button)
  );

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      state.expandIcon.className,
      state.expandIconPosition === 'start' && styles.expandIconStart,
      state.expandIconPosition === 'end' && styles.expandIconEnd,
      state.size === 'small' && styles.expandIconSmall,
      state.size === 'medium' && styles.expandIconMedium,
      getSlotClassNameProp_unstable(state.expandIcon)
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      styles.icon,
      state.size === 'small' && styles.iconSmall,
      state.size === 'medium' && styles.iconMedium,
      getSlotClassNameProp_unstable(state.icon)
    );
  }

  return useAccordionHeaderStyles_unstable(state);
};
