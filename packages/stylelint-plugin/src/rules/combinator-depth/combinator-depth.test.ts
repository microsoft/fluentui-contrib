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

  it('should not report error if the second token is a pseudo class', async () => {
    const { errored, results } = await stylelint.lint({
      code: `.foo:hover div { color: red; }`,
      config: {
        pluginFunctions: {
          [rule.ruleName]: rule,
        },
        rules: {
          [rule.ruleName]: [0],
        },
      },
    });

    expect(errored).toBe(false);
    expect(results.length).toBe(1);
    expect(results[0].warnings.length).toBe(0);
  });

  it('should report error if combinator depth after a pseudo class exceeds allowed depth', async () => {
    const { errored, results } = await stylelint.lint({
      code: `.foo:hover div div { color: red; }`,
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
    expect(results[0].warnings[0].text).toContain(`maximum allowed depth of 0`);
  });

  it.each([false, 'a', '%'])(
    'should throw an error if not configured with an %s',
    (allowedDepth) => {
      const promise = stylelint.lint({
        code: `.foo .[object Object] { color: red; }`,
        config: {
          pluginFunctions: {
            [rule.ruleName]: rule,
          },
          rules: {
            [rule.ruleName]: [allowedDepth],
          },
        },
      });

      expect(promise).rejects.toMatchInlineSnapshot(
        `[Error: @fluentui-contrib/stylelint-plugin: combinator-depth rule needs a number as configuration]`
      );
    }
  );
});
