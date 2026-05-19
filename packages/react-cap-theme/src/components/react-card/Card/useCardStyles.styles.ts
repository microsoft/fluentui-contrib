import * as React from 'react';
import {
  cardClassNames,
  cardFooterClassNames,
  cardPreviewClassNames,
} from '@fluentui/react-card';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import {
  type GriffelStyle,
  makeStyles,
  mergeClasses,
  shorthands,
} from '@griffel/react';
import { textClassNames } from '@fluentui/react-text';
import { tokens } from '@fluentui/tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { cardCSSVars } from './cssVariables';
import type { CardProps, CardState } from './Card.types';
import { capTokens } from '../../tokens/tokens';

// Negative margin styles so child can bleed into the Card's padding
const getInsetChildStyles = (
  orientation: NonNullable<CardProps['orientation']>,
  childClassName: string
): GriffelStyle => {
  const styles = {
    vertical: {
      // First child
      // After Tabster's hidden "Groupper" element, after hidden checkbox, after floatingAction
      [`& > .${childClassName}:first-child`]: {
        marginTop: `var(${cardCSSVars.cardChildMarginVar})`,
      },
      [`& > [aria-hidden="true"]:first-child + .${childClassName}`]: {
        marginTop: `var(${cardCSSVars.cardChildMarginVar})`,
      },
      [`& > .${cardClassNames.checkbox} + .${childClassName}`]: {
        marginTop: `var(${cardCSSVars.cardChildMarginVar})`,
      },
      [`& > .${cardClassNames.floatingAction} + .${childClassName}`]: {
        marginTop: `var(${cardCSSVars.cardChildMarginVar})`,
      },
      // Last child
      // Before Tabster's hidden "Groupper" element
      [`& > .${childClassName}:last-child`]: {
        marginBottom: `var(${cardCSSVars.cardChildMarginVar})`,
      },
      [`& > .${childClassName}:has(+ [aria-hidden="true"]:last-child)`]: {
        marginBottom: `var(${cardCSSVars.cardChildMarginVar})`,
      },
    },
    horizontal: {
      // First child
      // // After Tabster's hidden "Groupper" element, after hidden checkbox, after floatingAction
      [`& > .${childClassName}:first-child`]: {
        marginLeft: `var(${cardCSSVars.cardChildMarginVar})`,
      },
      [`& > [aria-hidden="true"]:first-child + .${childClassName}`]: {
        marginLeft: `var(${cardCSSVars.cardChildMarginVar})`,
      },
      [`& > .${cardClassNames.checkbox} + .${childClassName}`]: {
        marginLeft: `var(${cardCSSVars.cardChildMarginVar})`,
      },
      [`& > .${cardClassNames.floatingAction} + .${childClassName}`]: {
        marginLeft: `var(${cardCSSVars.cardChildMarginVar})`,
      },
      // Last child
      // Before Tabster's hidden "Groupper" element
      [`& > .${childClassName}:last-child`]: {
        marginRight: `var(${cardCSSVars.cardChildMarginVar})`,
      },
      [`& > .${childClassName}:has(+ [aria-hidden="true"]:last-child)`]: {
        marginRight: `var(${cardCSSVars.cardChildMarginVar})`,
      },
    },
  };
  return styles[orientation];
};

const highContrastStyles: GriffelStyle = {
  forcedColorAdjust: 'none',
  backgroundColor: 'Highlight',
  color: 'HighlightText',

  [`& .${cardPreviewClassNames.root}, & .${cardFooterClassNames.root}`]: {
    forcedColorAdjust: 'auto',
  },
};

const focusOutlineStyle = {
  '::after': {
    ...shorthands.borderColor(tokens.colorStrokeFocus2),
    boxShadow: `
      0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2} inset,
      0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus1} inset
    `,

    '@media (forced-colors: active)': {
      ...shorthands.borderColor('Highlight'),
      ...shorthands.borderWidth(tokens.strokeWidthThick),
    },
  },
};

const useStyles = makeStyles({
  root: {
    [cardCSSVars.cardSizeVar]: tokens.spacingVerticalXL,
    [cardCSSVars.cardChildMarginVar]: `calc((-1 * var(${cardCSSVars.cardSizeVar})) + ${tokens.spacingHorizontalM})`, // FIXME refactor to remove the `calc`

    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: capTokens.borderRadius4XLarge,
    boxShadow: tokens.shadow4,
    boxSizing: 'border-box',
    padding: `var(${cardCSSVars.cardSizeVar})`,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,

    '::after': {
      position: 'absolute',
      content: '""',
      inset: 0,
      pointerEvents: 'none',
      border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
      borderRadius: 'inherit',
    },
  },

  vertical: {
    flexDirection: 'column',
    ...getInsetChildStyles('vertical', cardPreviewClassNames.root),
  },

  horizontal: {
    flexDirection: 'row',
    gap: tokens.spacingHorizontalXL,
    ...getInsetChildStyles('horizontal', cardPreviewClassNames.root),
  },

  small: {
    [cardCSSVars.cardSizeVar]: tokens.spacingVerticalL,
    gap: tokens.spacingVerticalS,
  },
  medium: { gap: tokens.spacingVerticalL },
  large: {
    [cardCSSVars.cardSizeVar]: tokens.spacingVerticalXXXL,
    gap: tokens.spacingVerticalL,
  },

  interactive: {
    cursor: 'pointer',

    [`& .${textClassNames.root}`]: { color: 'currentColor' },

    ':hover': { boxShadow: tokens.shadow8 },

    ':active': { boxShadow: tokens.shadow4 },

    '@media (forced-colors: active)': {
      ':hover, :active': highContrastStyles,
      '::after': shorthands.borderColor('Highlight'),
    },
  },
  filled: {
    /* Same as root */
  },
  ['filled-interactive']: {
    ':hover': { backgroundColor: tokens.colorNeutralBackground1Hover },
    ':active': { backgroundColor: tokens.colorNeutralBackground1Pressed },
  },
  ['filled-selected']: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
  },

  subtle: {
    backgroundColor: tokens.colorTransparentBackground,
    boxShadow: 'none',
  },
  ['subtle-interactive']: {
    ':hover': { backgroundColor: tokens.colorSubtleBackgroundHover },
    ':active': { backgroundColor: tokens.colorSubtleBackgroundPressed },
  },
  ['subtle-selected']: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
  },

  selected: {
    '::after': shorthands.borderColor(tokens.colorNeutralStroke1),
    '@media (forced-colors: active)': highContrastStyles,
  },

  focused: createCustomFocusIndicatorStyle(focusOutlineStyle),
  selectableFocused: createCustomFocusIndicatorStyle(focusOutlineStyle, {
    selector: 'focus-within',
  }),

  floatingAction: {
    position: 'absolute',
    zIndex: tokens.zIndexContent,
    top: 0,
    right: 0,
    marginTop: tokens.spacingVerticalXL,
    marginRight: tokens.spacingHorizontalXL,
  },

  hiddenCheckbox: {
    overflow: 'hidden',
    width: '1px',
    height: '1px',
    position: 'absolute',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  },

  disabled: {
    cursor: 'not-allowed',
    userSelect: 'none',
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForegroundDisabled,
    boxShadow: tokens.shadow2,

    '::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: `calc(${tokens.zIndexContent} + 1)`,
    },
    '::after': shorthands.borderColor(tokens.colorNeutralStrokeDisabled),

    ':hover': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      boxShadow: tokens.shadow2,
      '::after': shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },
    ':active': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      boxShadow: tokens.shadow2,
      '::after': shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },
  },
});

export const useCardStyles = (state: CardState): CardState => {
  const styles = useStyles();
  const {
    appearance,
    disabled,
    interactive,
    orientation,
    selected,
    selectable,
    selectFocused,
    size,
  } = state;
  const isSelectableOrInteractive = !disabled && (interactive || selectable);

  const focusedStyles = React.useMemo(() => {
    if (selectable) {
      return selectFocused ? styles.selectableFocused : '';
    }
    return styles.focused;
  }, [selectFocused, selectable, styles.focused, styles.selectableFocused]);

  state.root.className = mergeClasses(
    state.root.className,
    cardClassNames.root,
    styles.root,
    styles[size],
    styles[orientation],
    styles[appearance],
    isSelectableOrInteractive && styles.interactive,
    isSelectableOrInteractive && styles[`${appearance}-interactive`],
    selected && styles.selected,
    selected && styles[`${appearance}-selected`],
    disabled && styles.disabled,
    focusedStyles,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.floatingAction) {
    state.floatingAction.className = mergeClasses(
      state.floatingAction.className,
      cardClassNames.floatingAction,
      styles.floatingAction,
      getSlotClassNameProp_unstable(state.floatingAction)
    );
  }

  if (state.checkbox) {
    state.checkbox.className = mergeClasses(
      state.checkbox.className,
      cardClassNames.checkbox,
      styles.hiddenCheckbox,
      getSlotClassNameProp_unstable(state.checkbox)
    );
  }

  return state;
};
