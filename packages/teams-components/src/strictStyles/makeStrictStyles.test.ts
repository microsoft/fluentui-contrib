import { makeStrictStyles } from './makeStrictStyles';
import { renderHook } from '@testing-library/react';

describe('makeStrictStyles', () => {
  it('should create strict styles', () => {
    const useStyles = makeStrictStyles({
      root: {
        marginInlineStart: '19px',
      },
    });
    const {
      result: { current: classes },
    } = renderHook(useStyles);

    expect(typeof classes.root).toBe('object');
    expect(classes.root.toString()).toEqual(expect.any(String));
    expect(classes.root.DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toBeDefined();
  });
});
