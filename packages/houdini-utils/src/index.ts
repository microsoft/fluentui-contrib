export { PaintWorklet } from './types';
export type { PaintWorkletGeometry } from './types';
export { registerPaintWorklet } from './paint/houdini/registerPaintWorklet';
export { fallbackPaintAnimation } from './paint/fallback/fallbackPaintAnimation';
export {
  hasHoudini,
  hasMozElement,
  hasWebkitCanvas,
} from './util/featureDetect';

export { blobify } from './util/blobify';
