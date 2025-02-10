import { createStrictClass } from './createStrictClass';
import { MergeStrictClasses } from './types';

describe('mergeStrictClasses (production)', () => {
  let mergeStrictClasses: MergeStrictClasses = jest.fn();
  beforeAll(() => {
    process.env.NODE_ENV = 'production';

    // Use require here since the process.env is used at file scope
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    mergeStrictClasses = require('./mergeStrictClasses').mergeStrictClasses;
  });

  it('should use mergeClasses', () => {
    const class1 = createStrictClass('class1');
    const class2 = createStrictClass('class2');

    const result = mergeStrictClasses(class1, class2);
    expect(typeof result).toBe('string');
    expect(result.DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toBeUndefined();
  });
});
