import { addModule } from '../../util/addModule';

export const registerPaintWorklet = (
  targetWindow: Window | undefined,
  baseUrl: string,
  filebaseUrl: string
): Promise<void> => {
  return addModule(targetWindow, baseUrl, filebaseUrl);
};
