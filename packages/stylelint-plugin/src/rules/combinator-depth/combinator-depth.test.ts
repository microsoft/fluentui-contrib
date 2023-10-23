import rule from './combinator-depth';
import * as stylelint from 'stylelint';

describe('combinator-depth', () => {
  it.each([
    ['.foo .bar', 0],
    ['.foo .bar .baz', 1],
  ])('should fail %s with allowed depth %s', async (selector, allowedDepth) => {
    const { errored, results } = await stylelint.lint({
      code: `${selector} { color: red; }`,
      config: {
        pluginFunctions: {
          [rule.ruleName]: rule,
        },
        rules: {
          [rule.ruleName]: [allowedDepth],
        },
      },
    });

    expect(errored).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].warnings.length).toEqual(1);
    expect(results[0].warnings[0].rule).toEqual(
      '@fluentui-contrib/combinator-depth'
    );
    expect(results[0].warnings[0].text).toContain(`Selector ${selector}`);
    expect(results[0].warnings[0].text).toContain(
      `maximum allowed depth of ${allowedDepth}`
    );
  });

  it.each([
    ['.foo .bar', 1],
    ['.foo .bar .baz', 2],
  ])(
    'should not fail %s with allowed depth %s',
    async (selector, allowedDepth) => {
      const { errored } = await stylelint.lint({
        code: `${selector} { color: red; }`,
        config: {
          pluginFunctions: {
            [rule.ruleName]: rule,
          },
          rules: {
            [rule.ruleName]: [allowedDepth],
          },
        },
      });

      expect(errored).toBe(false);
    }
  );

  it('should report error on fail to parse selector', async () => {
    const { errored, results } = await stylelint.lint({
      code: `.foo .[object Object] { color: red; }`,
      config: {
        pluginFunctions: {
          [rule.ruleName]: rule,
        },
        rules: {
          [rule.ruleName]: [0],
        },
      },
    });

    expect(errored).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].warnings.length).toBe(1);
    expect(results[0].warnings[0].rule).toEqual(rule.ruleName);
    expect(results[0].warnings[0].text).toMatchInlineSnapshot(
      `"Failed to parse selector .foo .[object Object] (@fluentui-contrib/combinator-depth)"`
    );
  });
});
