import * as stylelint from 'stylelint';
import * as parsel from 'parsel-js';
import { extractAllSelectors } from '../../postcss-utils';
import { createRule } from '../../create-rule';
import { normalizeRuleName } from '../../normalize-rule-name';

export const ruleName = normalizeRuleName('combinator-depth');

const messages = stylelint.utils.ruleMessages(ruleName, {
  failed: (selector: string, depth: number, allowedDepth: number) =>
    `Selector ${selector} has a combinator depth of ${depth} exceeding the maximum allowed depth of ${allowedDepth}`,

  parseError: (selector: string) => `Failed to parse selector ${selector}`,
});

export default createRule({
  messages,
  ruleName,
  ruleFunction: (allowedDepth) => (postcssRoot, postcssResult) => {
    const validOptions = stylelint.utils.validateOptions(
      postcssResult,
      ruleName,
      {
        actual: allowedDepth,
        possible: [(val) => typeof val === 'number'],
      }
    );

    if (!validOptions) {
      throw new Error(
        '@fluentui-contrib/stylelint-plugin: combinator-depth rule needs a number as configuration'
      );
    }

    const { selectorToRule, selectors } = extractAllSelectors(postcssRoot);
    for (const selector of selectors) {
      let tokenizedSelector = [];
      try {
        tokenizedSelector = parsel.tokenize(selector);
      } catch {
        stylelint.utils.report({
          ruleName,
          message: messages.parseError,
          messageArgs: [selector],
          result: postcssResult,
          node: selectorToRule[selector],
        });

        continue;
      }
      const combinatorCount = tokenizedSelector.filter(
        (token) => token.type === 'combinator'
      ).length;

      if (
        tokenizedSelector[1].type === 'pseudo-class' &&
        [':hover', ':active'].includes(tokenizedSelector[1].content) &&
        combinatorCount <= allowedDepth + 1
      ) {
        continue;
      }

      if (combinatorCount > allowedDepth) {
        stylelint.utils.report({
          ruleName,
          message: messages.failed,
          messageArgs: [selector, combinatorCount, allowedDepth],
          result: postcssResult,
          node: selectorToRule[selector],
        });
      }
    }
  },
});
