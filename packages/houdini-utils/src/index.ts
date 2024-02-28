export { PaintWorkletBase } from './types';
export { registerPaintWorklet } from './paint/houdini/registerPaintWorklet';
export { fallbackPaintAnimation } from './paint/fallback/fallbackPaintAnimation';
export {
  hasHoudini,
  hasMozElement,
  hasWebkitCanvas,
  canUseHoudini,
} from './util/featureDetect';
