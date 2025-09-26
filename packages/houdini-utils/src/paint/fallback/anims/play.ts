import { animate } from '../animate';
import { handleCanvasResize } from '../util/canvas';
import type {
  CallbackFn,
  FallbackAnimationParams,
  FallbackAnimationState,
  PaintWorklet,
} from '../../../types';
import {
  getWindow,
  hasMozElement,
  hasWebkitCanvas,
} from '../../../util/featureDetect';

export type PlayAnimFn = () => (state: FallbackAnimationState) => () => void;

export const playAnim = (
  state: FallbackAnimationState,
  paintWorklet: PaintWorklet,
  animationParams: FallbackAnimationParams,
  target?: HTMLElement | null
): ((onComplete: CallbackFn, onUpdate?: CallbackFn) => void) => {
  const props = new Map<string, string>();
  const localWindow = getWindow(target);
  const styles = localWindow.getComputedStyle(state.target);
  const rect = { width: 0, height: 0 };
  const resizeObserver = new localWindow.ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === state.target) {
        if (Array.isArray(entry.borderBoxSize)) {
          rect.width = entry.borderBoxSize[0].inlineSize;
          rect.height = entry.borderBoxSize[0].blockSize;
        } else {
          const { width, height } = entry.target.getBoundingClientRect();
          rect.width = width;
          rect.height = height;
        }

        // Move to resize observer callback
        state.ctx = handleCanvasResize(
          state.wrapper as HTMLElement,
          state.ctx,
          state.id,
          rect.width,
          rect.height
        );
      }
    }
  });

  return (onComplete: CallbackFn, onUpdate?: CallbackFn) => {
    state.running = true;
    resizeObserver.observe(state.target);

    const onAnimUpdate: CallbackFn = (currentValues) => {
      const inputProperties: string[] =
        (paintWorklet.constructor as { inputProperties?: string[] })
          .inputProperties ?? [];
      for (const prop of inputProperties) {
        props.set(prop, styles.getPropertyValue(prop));
      }

      if (!state.ctx) {
        return;
      }

      for (const [key, value] of currentValues.entries()) {
        props.set(key, value);
      }
      paintWorklet.paint(state.ctx, rect, props);

      // Firefox and webkit both support using canvas as a background image
      // For all other browsers, we'll use a data url
      if (hasMozElement(target)) {
        state.target.style.backgroundImage = `-moz-element(#${state.id})`;
      } else if (hasWebkitCanvas(target)) {
        // Note: Safari references its vendor-specific CSSCanvasContext
        // ID which does not use the CSS ID selector (#).
        state.target.style.backgroundImage = `-webkit-canvas(${state.id})`;
      } else {
        const urlBackgroundImage = `url(${state.ctx.canvas.toDataURL(
          'image/png'
        )})`;
        state.target.style.backgroundImage = urlBackgroundImage;
      }

      onUpdate?.(currentValues);
    };

    animate({
      ...animationParams,
      target: state.target,
      isStopped: () => !state.running,
      onUpdate: onAnimUpdate,
      onComplete: (currentValues) => {
        state.running = false;
        resizeObserver.unobserve(state.target);
        onComplete(currentValues);
      },
    });
  };
};
