import { mergeStrictClasses } from './mergeStrictClasses';
import { createStrictClass } from './createStrictClass';
import { STRICT_SYMBOL } from './STRICT_SYMBOL';

describe('mergeStrictClasses', () => {
  it('should merge multiple StrictCssClass instances into one', () => {
    const class1 = createStrictClass('class1');
    const class2 = createStrictClass('class2');
    const mergedClass = mergeStrictClasses(class1, class2);

    expect(mergedClass.toString()).toBe('class1 class2');
    expect(mergedClass.DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toBe(STRICT_SYMBOL);
  });

  it('should return a single StrictCssClass instance if only one is provided', () => {
    const class1 = createStrictClass('class1');
    const mergedClass = mergeStrictClasses(class1);

    expect(mergedClass.toString()).toBe('class1');
    expect(mergedClass.DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toBe(STRICT_SYMBOL);
  });

  it('should handle an empty array of StrictCssClass instances', () => {
    const mergedClass = mergeStrictClasses();

    expect(mergedClass.toString()).toBe('');
    expect(mergedClass.DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toBe(STRICT_SYMBOL);
  });
});
