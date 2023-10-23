import * as stylelint from 'stylelint';
import combinatorDepth from './rules/combinator-depth/combinator-depth';
import noFocusVisible from './rules/no-focus-visible/no-focus-visible';

export default [
  stylelint.createPlugin(combinatorDepth.ruleName, combinatorDepth),
  stylelint.createPlugin(noFocusVisible.ruleName, noFocusVisible),
];
