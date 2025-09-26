import { lerp } from './lerp';
import {
  stepValueToPercentage,
  timeToNumber,
  processTimingFunction,
  parseValue,
} from './util/css';
import type {
  CreateKeyframeAnimationFn,
  FallbackAnimation,
  FallbackAnimationValues,
  EaseMap,
} from '../../types';
import { getWindow } from '../../util/featureDetect';

const eases: EaseMap = {
  linear: lerp,
};

export const createKeyframeAnimation: CreateKeyframeAnimationFn = ({
  animations,
  delay,
  duration,
  timingFunction,
  iterationCount = [1],
  target,
}) => {
  const iterations = iterationCount;
  const durations = duration.split(',').map(timeToNumber);
  const delays = delay.split(',').map(timeToNumber);
  const timingFunctions = timingFunction.split(',').map(processTimingFunction);

  const anims = [] as FallbackAnimation[];
  let overallDuration = 0;
  const styles = getWindow(target).getComputedStyle(target);
  for (
    let animationIndex = 0;
    animationIndex < animations.length;
    animationIndex++
  ) {
    const animation = animations[animationIndex];
    const steps = Object.entries(animation);

    if (steps.length < 2) {
      console.error('Animation must have at least 2 steps');
      return;
    }

    const iterationCount = iterations[animationIndex] ?? 1;
    const delay = delays[animationIndex] ?? 0;
    const duration = durations[animationIndex] ?? 0;
    const animDuration = delay + duration;

    if (animDuration > overallDuration) {
      overallDuration = animDuration;
    }

    const timingFunction = timingFunctions[animationIndex] ?? 'linear';

    const anim = {
      currentValues: {},
      keyframes: [],
    } as FallbackAnimation;

    anims.push(anim);

    for (let endIndex = 1; endIndex < steps.length; endIndex++) {
      const startIndex = endIndex - 1;

      const [startKey, startValues] = steps[startIndex];
      const [endKey, endValues] = steps[endIndex];

      const startPercentage = stepValueToPercentage(startKey);
      const endPercentage = stepValueToPercentage(endKey);
      const startTime = duration * startPercentage + delay;
      const endTime = Math.min(
        duration * endPercentage + delay,
        overallDuration
      );

      const tweenStartValues = {} as FallbackAnimationValues;
      const tweenEndValues = {} as FallbackAnimationValues;
      for (const value of Object.keys(startValues)) {
        const v = parseValue(startValues[value], value, styles);
        if (v === undefined) {
          return;
        }
        anim.currentValues[value] ??= v;
        tweenStartValues[value] ??= v;
      }

      for (const value of Object.keys(endValues)) {
        const v = parseValue(endValues[value], value, styles);
        if (v === undefined) {
          return;
        }
        tweenEndValues[value] ??= v;
      }

      anim.keyframes.push({
        iterationCount,
        startTime,
        endTime,
        duration: endTime - startTime,
        ease: eases[timingFunction],
        startValues: tweenStartValues,
        endValues: tweenEndValues,
      });
    }
  }

  return { anims, overallDuration };
};
