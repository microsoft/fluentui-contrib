export const SUPPORTS_CONSTRUCTABLE_STYLESHEETS =
  typeof document !== 'undefined' &&
  Array.isArray(document.adoptedStyleSheets) &&
  'replace' in CSSStyleSheet.prototype;

// The current spec allows the `adoptedStyleSheets` array to be modified.
// Previous versions of the spec required a new array to be created.
// For more details see: https://github.com/microsoft/fast/pull/6703
let canModifyAdoptedSheetArray = false;
if (SUPPORTS_CONSTRUCTABLE_STYLESHEETS) {
  try {
    document.adoptedStyleSheets.push();
    canModifyAdoptedSheetArray = true;
  } catch (e) {
    canModifyAdoptedSheetArray = false;
  }
}

export const SUPPORTS_MODIFYING_ADOPTED_STYLESHEETS =
  canModifyAdoptedSheetArray;

export const REACT_SHADOW_INSERTION_BUCKET_NAME =
  'react-shadow-insertion-point';
