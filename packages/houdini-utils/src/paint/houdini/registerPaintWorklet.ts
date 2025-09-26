import { addModule } from '../../util/addModule';
import { hasHoudini } from '../../util/featureDetect';

export const registerPaintWorklet = (
  baseUrl: string,
  filebaseUrl: string,
  target?: HTMLElement | null
): Promise<void> => {
  if (hasHoudini(target)) {
    return addModule(baseUrl, filebaseUrl, target);
  }

  return Promise.resolve();
};
