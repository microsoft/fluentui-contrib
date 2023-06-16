import type { StyleBucketName } from '@griffel/core';

import { findInsertionPoint } from './createShadowDOMRenderer';
import type {
  ExtendedCSSStyleSheet,
  GriffelShadowDOMRenderer,
} from './createShadowDOMRenderer';

function createRendererMock(adoptedStyleSheets: ExtendedCSSStyleSheet[]) {
  const renderer: Partial<GriffelShadowDOMRenderer> = { adoptedStyleSheets };

  return renderer as GriffelShadowDOMRenderer;
}

function createStyleSheetMock(
  bucketName: StyleBucketName,
  metadata: Record<string, unknown>
) {
  const sheet = new CSSStyleSheet() as ExtendedCSSStyleSheet;

  sheet.bucketName = bucketName;
  sheet.metadata = metadata;

  return sheet;
}

describe('findInsertionPoint', () => {
  it('finds a position in empty array', () => {
    const renderer = createRendererMock([]);
    const styleSheet = createStyleSheetMock('d', {});

    expect(findInsertionPoint(renderer, styleSheet)).toBe(null);
  });

  it('finds a position at beginning', () => {
    const renderer = createRendererMock([
      createStyleSheetMock('d', {}),
      createStyleSheetMock('a', {}),
    ]);
    const styleSheet = createStyleSheetMock('r', {});

    expect(findInsertionPoint(renderer, styleSheet)).toBe(null);
  });

  it('finds a position in middle', () => {
    const renderer = createRendererMock([
      createStyleSheetMock('d', {}),
      createStyleSheetMock('a', {}),
    ]);
    const styleSheet = createStyleSheetMock('h', {});

    expect(findInsertionPoint(renderer, styleSheet)).toHaveProperty(
      'bucketName',
      'd'
    );
  });

  it('finds a position in end', () => {
    const renderer = createRendererMock([
      createStyleSheetMock('d', {}),
      createStyleSheetMock('a', {}),
    ]);
    const styleSheet = createStyleSheetMock('t', {});

    expect(findInsertionPoint(renderer, styleSheet)).toHaveProperty(
      'bucketName',
      'a'
    );
  });
});
