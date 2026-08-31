import { cardCSSVars as fluentCardCSSVars } from '@fluentui/react-card';

// Declared in a separate file to avoid circular dependency.
/**
 * CSS variable names used internally for uniform styling in Card.
 * @internal
 */
export const cardCSSVars = {
  ...fluentCardCSSVars,
  cardChildMarginVar: '--cap-Card--child-margin',
};
