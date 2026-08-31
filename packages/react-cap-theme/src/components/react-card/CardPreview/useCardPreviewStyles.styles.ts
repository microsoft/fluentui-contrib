import { cardPreviewClassNames } from '@fluentui/react-card';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { capTokens } from '../../tokens/tokens';
import { cardCSSVars } from '../Card/cssVariables';
import type { CardPreviewState } from './CardPreview.types';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    overflow: 'hidden',

    [`> :not(.${cardPreviewClassNames.logo})`]: {
      display: 'block',
      height: '100%',
      width: '100%',
    },
  },
  logo: {
    position: 'absolute',
    fontSize: tokens.fontSizeBase600,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
  },
});

const useLayoutStyles = makeStyles({
  full: {
    [cardCSSVars.cardChildMarginVar]: `calc(-1 * var(${cardCSSVars.cardSizeVar}))`,
  },
  contained: { borderRadius: capTokens.borderRadius3XLarge },
  vertical: {
    marginLeft: `var(${cardCSSVars.cardChildMarginVar})`,
    marginRight: `var(${cardCSSVars.cardChildMarginVar})`,
  },
  horizontal: {
    marginTop: `var(${cardCSSVars.cardChildMarginVar})`,
    marginBottom: `var(${cardCSSVars.cardChildMarginVar})`,
  },
});

const useLogoFullStyles = makeStyles({
  small: { top: tokens.spacingVerticalL, left: tokens.spacingHorizontalL },
  medium: { top: tokens.spacingVerticalXL, left: tokens.spacingHorizontalXL },
  large: {
    top: tokens.spacingVerticalXXXL,
    left: tokens.spacingHorizontalXXXL,
  },
});

const useLogoContainedStyles = makeStyles({
  small: { top: tokens.spacingVerticalS, left: tokens.spacingHorizontalS },
  medium: { top: tokens.spacingVerticalS, left: tokens.spacingHorizontalS },
  large: { top: tokens.spacingVerticalXL, left: tokens.spacingHorizontalXL },
});

export const useCardPreviewStyles = (
  state: CardPreviewState
): CardPreviewState => {
  const styles = useStyles();
  const layoutStyles = useLayoutStyles();
  const logoFullStyles = useLogoFullStyles();
  const logoContainedStyles = useLogoContainedStyles();
  const { layout, size, orientation } = state;

  state.root.className = mergeClasses(
    state.root.className,
    cardPreviewClassNames.root,
    styles.root,
    layoutStyles[layout],
    layoutStyles[orientation],
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.logo) {
    state.logo.className = mergeClasses(
      state.logo.className,
      cardPreviewClassNames.logo,
      styles.logo,
      layout === 'full' ? logoFullStyles[size] : logoContainedStyles[size],
      getSlotClassNameProp_unstable(state.logo)
    );
  }

  return state;
};
