import { addModule } from '../../util/addModule';
import { hasHoudini } from '../../util/featureDetect';

export const registerPaintWorklet = (baseUrl: string, filebaseUrl: string) => {
  if (hasHoudini()) {
    return addModule(baseUrl, filebaseUrl);
  }

  return Promise.resolve();
};
