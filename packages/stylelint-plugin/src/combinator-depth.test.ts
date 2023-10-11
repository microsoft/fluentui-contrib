import * as path from 'path';
import { ruleFunction, ruleName } from './combinator-depth';
import * as stylelint from 'stylelint';

describe('combinator-depth', () => {
  it.each([
    ['.foo .bar', 0],
    ['.foo .bar .baz', 1],
  ])('should fail %s with allowed depth %s', async (selector, allowedDepth) => {
    const res = await stylelint.lint({
      code: `${selector} { color: red; }`,
      config: {
        pluginFunctions: {
          'test-plugin/combinator-depth': ruleFunction,
        },
        rules: {
          [ruleName]: [allowedDepth],
        },
      },
    });

    console.log(res);
  });
});
