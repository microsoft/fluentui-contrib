import { hasHoudini } from './featureDetect';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace CSS {
  export const paintWorklet: {
    addModule: (url: string) => Promise<void>;
  };
}

/**
 * Add a PaintWorklet module to the CSS Paint API.
 * @param baseUrl Base URL (e.g., https://cdn.example.com/paintworklets/)
 * @param fileName Name of the PaintWorklet file (e.g., "Flair.min.js")
 * @returns Promise that resolves when the module is added and throws when there is an error.
 */
export const addModule = (baseUrl: string, fileName: string): Promise<void> => {
  if (hasHoudini()) {
    const url = `${baseUrl}${fileName}`;
    return CSS.paintWorklet.addModule(url);
  }

  return Promise.resolve();
};
