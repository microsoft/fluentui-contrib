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

export interface CSSWithPaintWorklet {
  paintWorklet: {
    addModule: (url: string) => Promise<void>;
  };
  registerProperty?: any;
}

export type FeatureDetectFn = (target?: HTMLElement | null) => boolean;
export type AsyncFeatureDetectFn = (target?: HTMLElement | null) => Promise<boolean>;

export const hasDom: FeatureDetectFn = (target?: HTMLElement | null) => {
  return (
    typeof getDocument(target) !== 'undefined'
  );
};

/**
 * Test if the APIs neccessary for the Firefox fallback exist.
 *
 * @returns `true` if the browser supports the necessary APIs, `false` otherwise.
 */
export const hasMozElement: FeatureDetectFn = (target?: HTMLElement | null) => {
  return hasDom(target) && typeof getDocument(target).mozSetImageElement === 'function';
};

/**
 * Test if the APIs necessary for the Safari fallback exist.
 * @returns `true` if the browser supports the necessary APIs, `false` otherwise.
 */
export const hasWebkitCanvas: FeatureDetectFn = (target?: HTMLElement | null) => {
  return hasDom() && typeof getDocument(target).getCSSCanvasContext === 'function';
};

/**
 * Test if CSS Houdini APIs are availabe.
 * @see canUseHoudini() for a more robust test.
 * @returns `true` if the browser supports necessary Houdini APIs, `false` otherwise.
 */
export const hasHoudini: FeatureDetectFn = (target?: HTMLElement | null) => {
  const localWindow = getWindow(target);
  return (
    typeof localWindow !== 'undefined' &&
    localWindow.CSS &&
    'paintWorklet' in localWindow.CSS &&
    'registerProperty' in localWindow.CSS
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
export const canUseHoudini: AsyncFeatureDetectFn = async (target?: HTMLElement | null) => {
  if (typeof canUseHoudiniCache === 'boolean') {
    return canUseHoudiniCache;
  }

  if (!hasHoudini(target)) {
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
      '',
      target
    );
    canUseHoudiniCache = true;
    return true;
  } catch (e) {
    canUseHoudiniCache = false;
    return false;
  }
};

/**
 * Get the document object for a specific target element.
 * @param target Optional target element to determine the document context.
 * @returns The document object for the specified target element or the global document.
 */
export const getDocument = (target?: HTMLElement | null): Document => target?.ownerDocument ?? document;

/**
 * Get the window object for a specific target element.
 * @param target Optional target element to determine the window context.
 * @returns The window object for the specified target element or the global window.
 */
export const getWindow = (target?: HTMLElement | null): Window & typeof globalThis => getDocument(target).defaultView ?? window;

/**
 * Get the CSS object for a specific target element.
 * @param target Optional target element to determine the document context.
 * @returns The CSS object for the specified target element or the global CSS object.
 */
export const getCSS = (target?: HTMLElement | null): CSSWithPaintWorklet =>
  getWindow(target).CSS as unknown as CSSWithPaintWorklet;
