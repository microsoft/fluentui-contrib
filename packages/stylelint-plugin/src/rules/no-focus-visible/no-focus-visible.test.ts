import rule from './no-focus-visible';
import * as stylelint from 'stylelint';

describe('no-focus-visible', () => {
  it('should fail with :focus-visible', async () => {
    const { errored, results } = await stylelint.lint({
      code: `.foo:focus-visible { color: red; }`,
      config: {
        pluginFunctions: {
          [rule.ruleName]: rule,
        },
        rules: {
          [rule.ruleName]: [],
        },
      },
    });

    expect(errored).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].warnings.length).toEqual(1);
    expect(results[0].warnings[0].rule).toEqual(rule.ruleName);
    expect(results[0].warnings[0].text).toMatchInlineSnapshot(
      `"Selector .foo:focus-visible contains :focus-visible (@fluentui-contrib/no-focus-visible)"`
    );
  });

  it('should fail with :focus', async () => {
    const { errored, results } = await stylelint.lint({
      code: `.foo:focus{ color: red; }`,
      config: {
        pluginFunctions: {
          [rule.ruleName]: rule,
        },
        rules: {
          [rule.ruleName]: [],
        },
      },
    });

    expect(errored).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].warnings.length).toEqual(1);
    expect(results[0].warnings[0].rule).toEqual(rule.ruleName);
    expect(results[0].warnings[0].text).toMatchInlineSnapshot(
      `"Selector .foo:focus contains :focus (@fluentui-contrib/no-focus-visible)"`
    );
  });
  it('should report error on fail to parse selector', async () => {
    const { errored, results } = await stylelint.lint({
      code: `.[object Object]:focus-visible { color: red; }`,
      config: {
        pluginFunctions: {
          [rule.ruleName]: rule,
        },
        rules: {
          [rule.ruleName]: [],
        },
      },
    });

    expect(errored).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].warnings.length).toBe(1);
    expect(results[0].warnings[0].rule).toEqual(rule.ruleName);
    expect(results[0].warnings[0].text).toMatchInlineSnapshot(
      `"Failed to parse selector .[object Object]:focus-visible (@fluentui-contrib/no-focus-visible)"`
    );
  });
});
