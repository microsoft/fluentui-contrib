import { STRICT_SYMBOL } from './STRICT_SYMBOL';
import type { StrictCssClass } from './types';

export const createStrictClass = (className: string): StrictCssClass => {
  if (process.env.NODE_ENV === 'production') {
    // @ts-expect-error in prodution we want to revert to normal strings anyway
    return className as StrictCssClass;
  }

  return {
    toString: () => className,
    DO_NOT_USE_OR_YOU_WILL_BE_FIRED: STRICT_SYMBOL,
  };
};
