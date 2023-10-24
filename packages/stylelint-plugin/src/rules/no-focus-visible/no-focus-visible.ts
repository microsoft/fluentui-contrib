import * as stylelint from 'stylelint';
import { extractAllSelectors } from '../../postcss-utils';
import { createRule } from '../../create-rule';
import { normalizeRuleName } from '../../normalize-rule-name';

const ruleName = normalizeRuleName('no-focus-visible');

const messages = stylelint.utils.ruleMessages(ruleName, {
  focusVisible: (selector: string) =>
    `Selector ${selector} contains :focus-visible`,
  focus: (selector: string) => `Selector ${selector} contains :focus`,
  parseError: (selector: string) => `Failed to parse selector ${selector}`,
});

export default createRule({
  messages,
  ruleName,
  ruleFunction: () => (postcssRoot, postcssResult) => {
    const validOptions = stylelint.utils.validateOptions(
      postcssResult,
      ruleName
    );

    if (!validOptions) {
      return;
    }

    const { selectorToRule, selectors } = extractAllSelectors(postcssRoot);

    for (const selector of selectors) {
      if (selector.includes(':focus-visible')) {
        stylelint.utils.report({
          ruleName,
          message: messages.focusVisible(selector),
          messageArgs: [selector],
          result: postcssResult,
          node: selectorToRule[selector],
        });
      } else if (selector.includes(':focus')) {
        stylelint.utils.report({
          ruleName,
          message: messages.focus(selector),
          messageArgs: [selector],
          result: postcssResult,
          node: selectorToRule[selector],
        });
      }
    }
  },
});
