import { renderHook } from '@testing-library/react';
import type { MakeStrictStyles } from './types';

describe('makeStrictStyles (production)', () => {
  let makeStrictStyles: MakeStrictStyles = jest.fn();
  beforeAll(() => {
    process.env.NODE_ENV = 'production';

    // Use require here since the process.env is used at file scope
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    makeStrictStyles = require('./makeStrictStyles').makeStrictStyles;
  });

  it('should use makeStyles', () => {
    const useStyles = makeStrictStyles({
      root: {
        marginInlineStart: '19px',
      },
    });
    const {
      result: { current: classes },
    } = renderHook(useStyles);

    expect(typeof classes.root).toBe('string');
    expect(classes.root.toString()).toEqual(expect.any(String));
    expect(classes.root.DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toBeUndefined();
  });
});
