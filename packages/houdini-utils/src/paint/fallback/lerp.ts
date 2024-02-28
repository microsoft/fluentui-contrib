import type { LerpFn } from '../../types';

export const lerp: LerpFn = (start, end, currentTime, duration, delay = 0) => {
  const totalDuration = delay + duration;

  if (currentTime <= delay) {
    return start;
  } else if (currentTime >= totalDuration) {
    return end;
  }

  if (typeof start === 'number') {
    return doLerp(start, end as number, currentTime / totalDuration);
  } else {
    return start.map((s, i) =>
      doLerp(s, (end as number[])[i], currentTime / totalDuration)
    );
  }
};

const doLerp = (start: number, end: number, t: number): number => {
  const value = start + (end - start) * t;

  return start > end ? Math.max(value, end) : Math.min(value, end);
};
