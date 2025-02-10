import { validateStrictClasses } from './validateStrictClasses';
import { createStrictClass } from './createStrictClass';
import { StrictCssClass } from './types';

describe('validateStrictClasses', () => {
  it('should not throw an error if className is undefined', () => {
    expect(() => validateStrictClasses(undefined)).not.toThrow();
  });

  it('should not throw an error if className has the correct STRICT_SYMBOL', () => {
    const validClass = createStrictClass('validClass');
    expect(() => validateStrictClasses(validClass)).not.toThrow();
  });

  it('should throw an error if className does not have the correct STRICT_SYMBOL', () => {
    const invalidClass = {
      toString: () => 'invalidClass',
      DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Symbol('wrong'),
    } as StrictCssClass;
    expect(() => validateStrictClasses(invalidClass)).toThrow(
      '@fluentui-contrib/teams-ui::This component only allows styles from makeStrictStyles'
    );
  });

  it('should throw an error if className is an empty object', () => {
    const invalidClass = {} as StrictCssClass;
    expect(() => validateStrictClasses(invalidClass)).toThrow(
      '@fluentui-contrib/teams-ui::This component only allows styles from makeStrictStyles'
    );
  });
});
