import { animate } from '../animate';
import { handleCanvasResize } from '../util/canvas';
import type {
  CallbackFn,
  FallbackAnimationParams,
  FallbackAnimationState,
  PaintWorklet,
} from '../../../types';
import { hasMozElement, hasWebkitCanvas } from '../../../util/featureDetect';

export const playAnim = (
  paintWorklet: PaintWorklet,
  state: FallbackAnimationState,
  animationParams: FallbackAnimationParams
): ((onComplete: CallbackFn, onUpdate?: CallbackFn) => void) => {
  const targetEl = state.targetEl;
  const targetWindow = state.targetWindow;

  const props = new Map<string, string>();
  const lazyStyles = targetWindow.getComputedStyle(targetEl);
  const rect = { width: 0, height: 0 };

  const resizeObserver = new targetWindow.ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === targetEl) {
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
          state.id,
          state.wrapper as HTMLElement,
          state.ctx,
          rect.width,
          rect.height
        );
      }
    }
  });

  return (onComplete: CallbackFn, onUpdate?: CallbackFn) => {
    state.running = true;
    resizeObserver.observe(state.targetEl);

    const onAnimUpdate: CallbackFn = (currentValues) => {
      const inputProperties: string[] =
        (paintWorklet.constructor as { inputProperties?: string[] })
          .inputProperties ?? [];
      for (const prop of inputProperties) {
        props.set(prop, lazyStyles.getPropertyValue(prop));
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
      if (hasMozElement(targetWindow)) {
        state.targetEl.style.backgroundImage = `-moz-element(#${state.id})`;
      } else if (hasWebkitCanvas(targetWindow)) {
        // Note: Safari references its vendor-specific CSSCanvasContext
        // ID which does not use the CSS ID selector (#).
        state.targetEl.style.backgroundImage = `-webkit-canvas(${state.id})`;
      } else {
        const urlBackgroundImage = `url(${state.ctx.canvas.toDataURL(
          'image/png'
        )})`;
        state.targetEl.style.backgroundImage = urlBackgroundImage;
      }

      onUpdate?.(currentValues);
    };

    animate({
      ...animationParams,

      targetEl: state.targetEl,
      targetWindow,

      isStopped: () => !state.running,
      onUpdate: onAnimUpdate,
      onComplete: (currentValues) => {
        state.running = false;
        resizeObserver.unobserve(state.targetEl);
        onComplete(currentValues);
      },
    });
  };
};
