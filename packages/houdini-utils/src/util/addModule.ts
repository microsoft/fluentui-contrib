import { getCSSPaintWorklet } from './getCSSPaintWorklet';

/**
 * Add a PaintWorklet module to the CSS Paint API.
 *
 * @param targetWindow The target window to which the PaintWorklet module should be added.
 * @param baseUrl Base URL (e.g., https://cdn.example.com/paintworklets/)
 * @param fileName Name of the PaintWorklet file (e.g., "Flair.min.js")
 * @returns Promise that resolves when the module is added and throws when there is an error.
 */
export const addModule = (
  targetWindow: Window | undefined,
  baseUrl: string,
  fileName: string
): Promise<void> => {
  if (targetWindow) {
    const paintWorklet = getCSSPaintWorklet(targetWindow);
    const url = `${baseUrl}${fileName}`;

    if (paintWorklet) {
      return paintWorklet?.addModule(url);
    }
  }

  return Promise.resolve();
};
