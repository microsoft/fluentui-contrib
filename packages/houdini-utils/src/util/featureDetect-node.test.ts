/**
 * @jest-environment node
 */

import { hasMozElement, hasWebkitCanvas, hasHoudini } from './featureDetect';

describe('featureDetect (node)', () => {
  it('hasMozElement should be false', () => {
    expect(hasMozElement(undefined)).toBe(false);
  });

  it('hasWebkitCanvas should be false', () => {
    expect(hasWebkitCanvas(undefined)).toBe(false);
  });

  it('hasHoudini should be false', () => {
    expect(hasHoudini(undefined)).toBe(false);
  });
});
