import { createKeyframeAnimation } from './keyframe';
import { arrayToRgba } from './util/css';
import type {
  FallbackAnimation,
  FallbackAnimationFn,
  TickFn,
} from '../../types';

export const animate: FallbackAnimationFn = (params) => {
  const { onComplete, isStopped, onUpdate, ...otherParams } = params;
  const result = createKeyframeAnimation(otherParams);
  if (!result) {
    console.error('Unable to create keyframe animation.');
    return;
  }

  const { anims, overallDuration } = result;

  tick(anims, overallDuration, onComplete, onUpdate, isStopped);
};

const stringifyValue = (value: number | number[]): string =>
  typeof value === 'number' ? String(value) : arrayToRgba(value);

const tick: TickFn = (
  anims,
  overallDuration,
  onComplete,
  onUpdate,
  isStopped
) => {
  // TODO: fix global. See: https://github.com/microsoft/fluentui-contrib/issues/183
  // eslint-disable-next-line no-restricted-globals
  let start = performance.now();
  const currentValues = new Map<string, string>();
  let currentIteration = 1;

  // TODO: fix global. See: https://github.com/microsoft/fluentui-contrib/issues/183
  // eslint-disable-next-line no-restricted-globals
  const raf = (time: number = performance.now()) => {
    const currentDuration = time - start;
    currentValues.clear();

    const initialFrame = (animValue: FallbackAnimation) => {
      for (const [key, value] of Object.entries(
        animValue.keyframes[0].startValues
      )) {
        currentValues.set(key, stringifyValue(value));
      }
    };

    const lastFrame = (animValue: FallbackAnimation) => {
      for (const [key, value] of Object.entries(
        animValue.keyframes[animValue.keyframes.length - 1].endValues
      )) {
        currentValues.set(key, stringifyValue(value));
      }
    };

    const nextFrame = (animValue: FallbackAnimation) => {
      const animData = animValue.keyframes.find(
        (animData) =>
          currentDuration >= animData.startTime &&
          currentDuration <= animData.endTime
      );

      if (!animData) {
        console.error(
          'Could not find animData for currentDuration',
          currentDuration
        );
        return;
      }

      for (const key of Object.keys(animData.startValues)) {
        const startValue = animData.startValues[key];
        const endValue = animData.endValues[key];
        const value = animData.ease(
          startValue,
          endValue,
          currentDuration - animData.startTime,
          animData.duration
        );

        animValue.currentValues[key] = value;
        currentValues.set(key, stringifyValue(value));
      }
    };

    for (const animValue of anims) {
      if (currentIteration > animValue.keyframes[0].iterationCount) {
        // We've completed all iterations - just render the last frame
        lastFrame(animValue);
      } else if (currentDuration <= animValue.keyframes[0].startTime) {
        initialFrame(animValue);
      } else if (
        currentDuration >=
        animValue.keyframes[animValue.keyframes.length - 1].endTime
      ) {
        // We're after the last animation.
        // Just use its final values.
        lastFrame(animValue);
      } else {
        nextFrame(animValue);
      }
    }

    if (isStopped()) {
      for (const animValue of anims) {
        initialFrame(animValue);
      }
      onComplete(currentValues);
    } else if (
      currentDuration >= overallDuration &&
      anims.some((anim) =>
        anim.keyframes.some(
          (keyframe) => currentIteration < keyframe.iterationCount
        )
      )
    ) {
      currentIteration++;
      // TODO: fix global. See: https://github.com/microsoft/fluentui-contrib/issues/183
      // eslint-disable-next-line no-restricted-globals
      start = performance.now();
      // TODO: fix global. See: https://github.com/microsoft/fluentui-contrib/issues/183
      // eslint-disable-next-line no-restricted-globals
      requestAnimationFrame(raf);
    } else if (currentDuration >= overallDuration) {
      onComplete(currentValues);
    } else {
      // TODO: fix global. See: https://github.com/microsoft/fluentui-contrib/issues/183
      // eslint-disable-next-line no-restricted-globals
      requestAnimationFrame(raf);
    }

    onUpdate(currentValues);
  };

  raf();
};
