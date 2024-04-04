import { createCSSRuleFromTheme } from '@fluentui/react-components';
import type { PartialTheme } from '@fluentui/react-components';

export const createCSSStyleSheetFromTheme = (
  rule: string,
  theme: PartialTheme | undefined
): CSSStyleSheet => {
  const cssRule = createCSSRuleFromTheme(rule, theme);
  const sheet = new CSSStyleSheet();
  sheet.insertRule(cssRule);

  return sheet;
};
