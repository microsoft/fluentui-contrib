export type { PaintWorklet, PaintWorkletGeometry } from './types';

export { fallbackPaintAnimation } from './paint/fallback/fallbackPaintAnimation';
export { registerPaintWorklet } from './paint/houdini/registerPaintWorklet';

export {
  hasHoudini,
  hasMozElement,
  hasWebkitCanvas,
} from './util/featureDetect';

export { blobify } from './util/blobify';
export { addModule } from './util/addModule';
