import { hasHoudini } from './featureDetect';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace CSS {
  export const paintWorklet: {
    addModule: (url: string) => Promise<void>;
  };
}

const FLUENT_CDN_BASE_URL =
  'https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001';
const DEFAULT_BASE_URL = `${FLUENT_CDN_BASE_URL}/paintworklets/`;
const DEFAULT_FILE_URL = 'Flair.min.js';

/**
 * Add a PaintWorklet module to the CSS Paint API.
 * @param baseUrl Base URL (e.g., https://cdn.example.com/paintworklets/)
 * @param fileName Name of the PaintWorklet file (e.g., "Flair.min.js")
 * @returns Promise that resolves when the module is added and throws when there is an error.
 */
export const addModule = (
  baseUrl: string = DEFAULT_BASE_URL,
  fileName: string = DEFAULT_FILE_URL
) => {
  if (hasHoudini()) {
    const url = `${baseUrl}${fileName}`;
    return CSS.paintWorklet.addModule(url);
  }

  return Promise.resolve();
};
