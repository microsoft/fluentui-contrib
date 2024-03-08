import { animate } from '../animate';
import { handleCanvasResize } from '../util/canvas';
import type {
  CallbackFn,
  FallbackAnimationParams,
  FallbackAnimationState,
  PaintWorklet,
} from '../../../types';

export type PlayAnimFn = () => (state: FallbackAnimationState) => () => void;

export const playAnim = (
  state: FallbackAnimationState,
  paintWorklet: PaintWorklet,
  animationParams: FallbackAnimationParams
) => {
  const props = new Map<string, string>();
  const styles = getComputedStyle(state.target);
  const rect = { width: 0, height: 0 };
  const resizeObserver = new ResizeObserver((entries) => {
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

  return (
    onComplete: CallbackFn,
    onUpdate?: CallbackFn
  ) => {
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
