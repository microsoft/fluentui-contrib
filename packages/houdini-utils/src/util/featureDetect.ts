import { addModule } from './addModule';

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

  interface CSS {
    paintWorklet: {
      addModule: (url: string) => Promise<void>;
    };
  }
}

export type FeatureDetectFn = () => boolean;
export type AsyncFeatureDetectFn = () => Promise<boolean>;

/**
 * Test if the APIs neccessary for the Firefox fallback exist.
 *
 * @returns `true` if the browser supports the necessary APIs, `false` otherwise.
 */
export const hasMozElement: FeatureDetectFn = () =>
  typeof document?.mozSetImageElement === 'function';

/**
 * Test if the APIs necessary for the Safari fallback exist.
 * @returns `true` if the browser supports the necessary APIs, `false` otherwise.
 */
export const hasWebkitCanvas: FeatureDetectFn = () =>
  typeof document?.getCSSCanvasContext === 'function';

/**
 * Test if CSS Houdini APIs are availabe.
 * @see canUseHoudini() for a more robust test.
 * @returns `true` if the browser supports necessary Houdini APIs, `false` otherwise.
 */
export const hasHoudini: FeatureDetectFn = () =>
  window?.CSS && 'paintWorklet' in CSS && 'registerProperty' in CSS;

let canUseHoudiniCache: boolean | undefined = undefined;
/**
 * A more robust test for CSS Houdini APIs. This function also verifies that a simple
 * PaintWorklet can be loaded.
 * @returns `Promise<true>` if the browser supports necessary Houdini APIs, `Promise<false>` otherwise.
 */
export const canUseHoudini: AsyncFeatureDetectFn = async () => {
  if (typeof canUseHoudiniCache === 'boolean') {
    return Promise.resolve(canUseHoudiniCache);
  }

  if (!hasHoudini()) {
    canUseHoudiniCache = false;
    return Promise.resolve(canUseHoudiniCache);
  }

  try {
    // Users had issues where using a simple class declaration here would cause the feature
    // detect to fail when it should have passed. Turns out the issue was that transpilers/bundlers
    // were converting this simple class to `const myvar = class { ...}` which fails to load as
    // as PaintWorklet. Using a string here ensures our test class will not be converted as gives
    // more accurate feature detection results.
    const featureDetectClassAsString = `class FluentAiCanUseHoudiniFeatureDetect { paint() {} }`;
    await addModule(
      '__fluent_ai__canUseHoudini__feature__detect__',
      featureDetectClassAsString,
      'FluentAiCanUseHoudiniFeatureDetect'
    );
    canUseHoudiniCache = true;
    return true;
  } catch (e) {
    canUseHoudiniCache = false;
    return false;
  }
};
