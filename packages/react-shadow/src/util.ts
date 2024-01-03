import { REACT_SHADOW_INSERTION_BUCKET_NAME } from './constants';
import type { GriffelShadowDOMRenderer } from '@griffel/shadow-dom';

// Hack to get this type that is not directly exported at the moment.
type ExtendedCSSStyleSheet = GriffelShadowDOMRenderer['adoptedStyleSheets'][0];

export const makeInsertionPointSheet = (): ExtendedCSSStyleSheet => {
  const insertionPointSheet = new CSSStyleSheet() as ExtendedCSSStyleSheet;
  insertionPointSheet.metadata = { [REACT_SHADOW_INSERTION_BUCKET_NAME]: true };

  return insertionPointSheet;
};
