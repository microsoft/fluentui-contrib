import { STRICT_SYMBOL } from './STRICT_SYMBOL';
import type { StrictCssClass } from './types';

export const createStrictClass = (className: string): StrictCssClass => {
  return {
    toString: () => className,
    DO_NOT_USE_OR_YOU_WILL_BE_FIRED: STRICT_SYMBOL,
  };
};
