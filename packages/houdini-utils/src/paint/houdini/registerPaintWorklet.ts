import type { PaintWorkletBase } from '../../types';
import { addModule } from '../../util/addModule';
import { hasHoudini } from '../../util/featureDetect';

export const registerPaintWorklet = (
  name: string,
  worklet: typeof PaintWorkletBase
) => {
  if (hasHoudini()) {
    return addModule(name, worklet);
  }

  return Promise.resolve();
};
