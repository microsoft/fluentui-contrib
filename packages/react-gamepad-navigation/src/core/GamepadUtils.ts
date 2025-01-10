/* eslint-disable no-restricted-globals */

export type TimeoutId = ReturnType<typeof setTimeout> | undefined;
export type IntervalId = ReturnType<typeof setInterval> | undefined;

/*
    RTL Support
*/

export const isInRtlMode = (): boolean => {
  return document.body.dir === 'rtl' || document.documentElement.dir === 'rtl';
};
