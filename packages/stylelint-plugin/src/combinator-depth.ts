import type { Rule } from 'stylelint';
import type * as PostCSS from 'postcss';
import * as stylelint from 'stylelint';
import * as parsel from 'parsel-js';
import { isAtRule, isDocument } from './utils';

export const ruleName = 'test-plugin/combinator-depth';

const messages = stylelint.utils.ruleMessages(ruleName, {
  failed: (selector: string, depth: number, allowedDepth: number) =>
    `Selector ${selector} has a combinator depth of ${depth} exceeding the maximum allowed depth of ${allowedDepth}`,

  parseError: (selector: string) => `Failed to parse selector ${selector}`,
});

const meta = {
  url: 'https://github.com/foo-org/stylelint-foo/blob/main/src/rules/foo-bar/README.md',
};

export const ruleFunction: Rule =
  (allowedDepth) => (postcssRoot, postcssResult) => {
    const validOptions = stylelint.utils.validateOptions(
      postcssResult,
      ruleName,
      {
        actual: allowedDepth,
        possible: [(val) => typeof val === 'number'],
      }
    );

    if (!validOptions) {
      return;
    }

    const selectors: string[] = [];
    const selectorToRule: Record<string, PostCSS.Rule> = {};
    postcssRoot.walkRules((rule) => {
      let cur: PostCSS.Container | PostCSS.Document | undefined = rule.parent;
      while (cur && !isDocument(cur)) {
        if (isAtRule(cur) && cur.name.includes('keyframes')) {
          return;
        }

        cur = cur.parent;
      }

      const splitSelectors = rule.selector.split(',');
      for (const selector of splitSelectors) {
        selectorToRule[selector] = rule;
      }
      selectors.push(...splitSelectors);
    });

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
      tokenizedSelector.reverse();
      let combinatorCount = 0;
      for (const token of tokenizedSelector) {
        if (token.type === 'combinator') {
          combinatorCount++;
        }
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
  };

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;
