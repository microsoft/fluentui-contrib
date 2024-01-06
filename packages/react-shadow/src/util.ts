import { REACT_SHADOW_INSERTION_BUCKET_NAME } from './constants';
import type { ExtendedCSSStyleSheet } from '@griffel/shadow-dom';

export const makeInsertionPointSheet = (): ExtendedCSSStyleSheet => {
  const insertionPointSheet = new CSSStyleSheet() as ExtendedCSSStyleSheet;
  insertionPointSheet.metadata = { [REACT_SHADOW_INSERTION_BUCKET_NAME]: true };

  return insertionPointSheet;
};

export const getInsertionPointSheet = (
  sheets: ExtendedCSSStyleSheet[]
): ExtendedCSSStyleSheet | undefined => {
  return sheets.find(
    (sheet) => sheet.metadata[REACT_SHADOW_INSERTION_BUCKET_NAME]
  );
};
