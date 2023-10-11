import * as stylelint from 'stylelint';
import * as combinatorDepth from './combinator-depth';

module.exports = stylelint.createPlugin(
  combinatorDepth.ruleName,
  combinatorDepth.ruleFunction
);
