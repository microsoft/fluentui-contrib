import { Rule, RuleMessages, RuleBase } from 'stylelint';
import { getDocUrl } from './get-doc-url';
import { normalizeRuleName } from './normalize-rule-name';

interface CreateRuleOptions {
  messages: RuleMessages;
  ruleFunction: RuleBase;
  ruleName: string;
}

export function createRule(options: CreateRuleOptions) {
  const { ruleFunction, ruleName, messages } = options;
  const rule: Rule = ruleFunction as Rule;
  rule.ruleName = normalizeRuleName(ruleName);
  rule.messages = messages;
  rule.meta = {
    url: getDocUrl(ruleName),
    fixable: false,
    deprecated: false,
  };

  return rule;
}
