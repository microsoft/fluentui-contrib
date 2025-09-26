import { getCSS, hasHoudini } from './featureDetect';

/**
 * Add a PaintWorklet module to the CSS Paint API.
 * @param baseUrl Base URL (e.g., https://cdn.example.com/paintworklets/)
 * @param fileName Name of the PaintWorklet file (e.g., "Flair.min.js")
 * @param target Optional target element to determine the document context.
 * @returns Promise that resolves when the module is added and throws when there is an error.
 */
export const addModule = (
  baseUrl: string,
  fileName: string,
  target?: HTMLElement | null
): Promise<void> => {
  if (hasHoudini(target)) {
    const url = `${baseUrl}${fileName}`;
    return getCSS(target).paintWorklet.addModule(url);
  }

  return Promise.resolve();
};
