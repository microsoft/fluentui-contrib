import { getCSSPaintWorklet } from './getCSSPaintWorklet';

declare global {
  interface Document {
    mozSetImageElement?: (
      imageElementId: string,
      imageElement: HTMLCanvasElement
    ) => void;
    getCSSCanvasContext?: (
      contextId: string,
      name: string,
      width: number,
      height: number
    ) => CanvasRenderingContext2D;
  }
}

export type FeatureDetectFn = (targetWindow: Window | undefined) => boolean;

/**
 * Test if the APIs neccessary for the Firefox fallback exist.
 *
 * @returns `true` if the browser supports the necessary APIs, `false` otherwise.
 */
export const hasMozElement: FeatureDetectFn = (targetWindow) => {
  return typeof targetWindow?.document?.mozSetImageElement === 'function';
};

/**
 * Test if the APIs necessary for the Safari fallback exist.
 *
 * @returns `true` if the browser supports the necessary APIs, `false` otherwise.
 */
export const hasWebkitCanvas: FeatureDetectFn = (targetWindow) => {
  return typeof targetWindow?.document?.getCSSCanvasContext === 'function';
};

/**
 * Test if CSS Houdini APIs are available.
 *
 * @returns `true` if the browser supports necessary Houdini APIs, `false` otherwise.
 */
export const hasHoudini: FeatureDetectFn = (
  targetWindow: Window | undefined
) => {
  return (
    targetWindow !== undefined && getCSSPaintWorklet(targetWindow) !== null
  );
};
