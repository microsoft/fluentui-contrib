import { mergeClasses } from '@fluentui/react-components';
import type { MergeStrictClasses, StrictCssClass } from './types';
import { createStrictClass } from './createStrictClass';
import { validateStrictClasses } from './validateStrictClasses';

export const mergeStrictClassesImpl: MergeStrictClasses = (
  ...strictClasses: (StrictCssClass | false | undefined)[]
) => {
  strictClasses.forEach(validateStrictClasses);

  const mergedClasses = mergeClasses(
    ...strictClasses.map((x) => x?.toString())
  );
  return createStrictClass(mergedClasses);
};

export const mergeStrictClasses: MergeStrictClasses =
  process.env.NODE_ENV === 'production'
    ? // @ts-expect-error - mergeClasses returns strings, so it is still valid with a `.toString` call
      (mergeClasses as MergeStrictClasses)
    : mergeStrictClassesImpl;
