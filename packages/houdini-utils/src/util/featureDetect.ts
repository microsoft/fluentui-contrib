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
export const hasMozElement: FeatureDetectFn = () => {
  return typeof document?.mozSetImageElement === 'function';
};

/**
 * Test if the APIs necessary for the Safari fallback exist.
 * @returns `true` if the browser supports the necessary APIs, `false` otherwise.
 */
export const hasWebkitCanvas: FeatureDetectFn = () => {
  return typeof document?.getCSSCanvasContext === 'function';
};

/**
 * Test if CSS Houdini APIs are availabe.
 * @see canUseHoudini() for a more robust test.
 * @returns `true` if the browser supports necessary Houdini APIs, `false` otherwise.
 */
export const hasHoudini: FeatureDetectFn = () => {
  return (
    typeof window !== 'undefined' &&
    window.CSS &&
    'paintWorklet' in CSS &&
    'registerProperty' in CSS
  );
};

let canUseHoudiniCache: boolean | undefined = undefined;
/**
 * A more robust test for CSS Houdini APIs. This function also verifies that a simple
 * PaintWorklet can be loaded.
 *
 * Note that this check will add a PaintWorklet as a blob URL, apps with CSP policies will always fail this check.
 * @see hasHoudini
 * @returns `Promise<true>` if the browser supports necessary Houdini APIs, `Promise<false>` otherwise.
 */
export const canUseHoudini: AsyncFeatureDetectFn = async () => {
  if (typeof canUseHoudiniCache === 'boolean') {
    return canUseHoudiniCache;
  }

  if (!hasHoudini()) {
    return false;
  }

  try {
    // Users had issues where using a simple class declaration here would cause the feature
    // detect to fail when it should have passed. Turns out the issue was that transpilers/bundlers
    // were converting this simple class to `const myvar = class { ...}` which fails to load as
    // as PaintWorklet. Using a string here ensures our test class will not be converted as gives
    // more accurate feature detection results.
    await addModule(
      `data:text/javascript,${encodeURIComponent(
        `registerPaint('fluent-ai-can-use-houdini-feature-detect', class { paint() {} })`
      )}`,
      ''
    );
    canUseHoudiniCache = true;
    return true;
  } catch (e) {
    canUseHoudiniCache = false;
    return false;
  }
};
