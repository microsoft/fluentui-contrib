import { normalizeCSSBucketEntry, styleBucketOrdering } from '@griffel/core';
import type { GriffelRenderer, StyleBucketName } from '@griffel/core';

import { createFallbackRenderer } from './createFallbackRenderer';

const SUPPORTS_CONSTRUCTABLE_STYLESHEETS: boolean = (() => {
  try {
    new CSSStyleSheet();
    return true;
  } catch {
    return false;
  }
})();

export type ExtendedCSSStyleSheet = CSSStyleSheet & {
  bucketName: StyleBucketName;
  metadata: Record<string, unknown>;
};
export type GriffelShadowDOMRenderer = GriffelRenderer & {
  adoptedStyleSheets: ExtendedCSSStyleSheet[];
};

let rendererId = 0;

const styleBucketOrderingMap = styleBucketOrdering.reduce((acc, cur, j) => {
  acc[cur as StyleBucketName] = j;
  return acc;
}, {} as Record<StyleBucketName, number>);

export function findInsertionPoint(
  renderer: GriffelShadowDOMRenderer,
  styleSheet: ExtendedCSSStyleSheet
): ExtendedCSSStyleSheet | null {
  let styleSheets = renderer.adoptedStyleSheets;
  const targetOrder = styleBucketOrderingMap[styleSheet.bucketName];

  let comparer = (sheet: ExtendedCSSStyleSheet): number =>
    targetOrder - styleBucketOrderingMap[sheet.bucketName];

  if (styleSheet.bucketName === 'm' && styleSheet.metadata) {
    const mediaElements = renderer.adoptedStyleSheets.filter(
      (styleSheet) => styleSheet.bucketName === 'm'
    );

    if (mediaElements.length) {
      styleSheets = mediaElements;
      comparer = (sheet) =>
        renderer.compareMediaQueries(
          styleSheet.metadata['m'] as string,
          sheet.metadata['m'] as string
        );
    }
  }

  for (let l = styleSheets.length, i = l - 1; i >= 0; i--) {
    const styleElement = styleSheets[i];

    if (comparer(styleElement) > 0) {
      return styleElement;
    }
  }

  return null;
}

function getCSSStyleSheetForBucket(
  cssSheetsCache: Record<string, ExtendedCSSStyleSheet>,

  bucketName: StyleBucketName,
  metadata: Record<string, unknown> = {},

  onStyleSheetInsert: (stylesheet: ExtendedCSSStyleSheet) => void
): ExtendedCSSStyleSheet {
  const isMediaBucket = bucketName === 'm';
  const styleSheetKey: StyleBucketName | string = isMediaBucket
    ? ((bucketName + metadata['m']) as string)
    : bucketName;

  if (!cssSheetsCache[styleSheetKey]) {
    const styleSheet = new CSSStyleSheet() as ExtendedCSSStyleSheet;

    styleSheet.bucketName = bucketName;
    styleSheet.metadata = metadata;

    cssSheetsCache[styleSheetKey] = styleSheet;
    onStyleSheetInsert(styleSheet);
  }

  return cssSheetsCache[styleSheetKey];
}

function insertAfter<T extends CSSStyleSheet | ExtendedCSSStyleSheet>(
  arr: T[],
  sheetToInsert: T,
  targetSheet: T | null
): T[] {
  if (targetSheet === null) {
    return [sheetToInsert, ...arr];
  }

  const index = arr.indexOf(targetSheet);

  return [...arr.slice(0, index + 1), sheetToInsert, ...arr.slice(index + 1)];
}

export function createShadowDOMRenderer(shadowRoot: ShadowRoot) {
  if (!SUPPORTS_CONSTRUCTABLE_STYLESHEETS) {
    return createFallbackRenderer(shadowRoot) as GriffelRenderer & {
      adoptedStyleSheets?: never;
    };
  }

  const cssSheetsCache: Record<string, ExtendedCSSStyleSheet> = {};
  const renderer: GriffelShadowDOMRenderer = {
    id: `@fluentui-contrib/react-shadow:${rendererId++}`,

    adoptedStyleSheets: [],
    insertionCache: {},
    stylesheets: {},

    compareMediaQueries: (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0),
    insertCSSRules(cssRules) {
      for (const [_styleBucketName, cssBucketEntries] of Object.entries(
        cssRules
      )) {
        const styleBucketName = _styleBucketName as StyleBucketName;

        for (let i = 0, l = cssBucketEntries.length; i < l; i++) {
          const [ruleCSS, metadata] = normalizeCSSBucketEntry(
            cssBucketEntries[i]
          );
          const sheet = getCSSStyleSheetForBucket(
            cssSheetsCache,

            styleBucketName,
            metadata,

            (styleSheet) => {
              const targetStyleSheet = findInsertionPoint(renderer, styleSheet);

              renderer.adoptedStyleSheets = insertAfter(
                renderer.adoptedStyleSheets,
                styleSheet,
                targetStyleSheet
              );
              shadowRoot.adoptedStyleSheets = insertAfter(
                shadowRoot.adoptedStyleSheets,
                styleSheet,
                targetStyleSheet
              );
            }
          );

          if (renderer.insertionCache[ruleCSS]) {
            continue;
          }

          renderer.insertionCache[ruleCSS] = styleBucketName;

          // TODO: clearer error message & check for browser specific prefixes
          try {
            sheet.insertRule(ruleCSS);
          } catch (e) {
            // We've disabled these warnings due to false-positive errors with browser prefixes
            if (
              process.env.NODE_ENV !== 'production' &&
              !ignoreSuffixesRegex.test(ruleCSS)
            ) {
              // eslint-disable-next-line no-console
              console.error(
                `There was a problem inserting the following rule: "${ruleCSS}"`,
                e
              );
            }
          }
        }
      }
    },
  };

  return renderer;
}

/**
 * Suffixes to be ignored in case of error
 */
const ignoreSuffixes = [
  '-moz-placeholder',
  '-moz-focus-inner',
  '-moz-focusring',
  '-ms-input-placeholder',
  '-moz-read-write',
  '-moz-read-only',
].join('|');
const ignoreSuffixesRegex = new RegExp(`:(${ignoreSuffixes})`);
