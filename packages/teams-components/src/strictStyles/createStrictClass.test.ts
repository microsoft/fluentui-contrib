import { createStrictClass } from './createStrictClass';
import { STRICT_SYMBOL } from './STRICT_SYMBOL';

describe('createStrictClass', () => {
  it('should return an object with a toString method that returns the className', () => {
    const className = 'test-class';
    const strictClass = createStrictClass(className);
    expect(strictClass.toString()).toBe(className);
  });

  it('should include the STRICT_SYMBOL in the returned object', () => {
    const className = 'test-class';
    const strictClass = createStrictClass(className);
    expect(strictClass.DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toBe(STRICT_SYMBOL);
  });

  it('should return an object with the correct structure', () => {
    const className = 'test-class';
    const strictClass = createStrictClass(className);
    expect(strictClass).toHaveProperty('toString');
    expect(strictClass).toHaveProperty('DO_NOT_USE_OR_YOU_WILL_BE_FIRED');
  });
});
