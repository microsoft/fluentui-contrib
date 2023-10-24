export function normalizeRuleName(ruleName: string) {
  if (ruleName.startsWith('@fluentui-contrib/')) {
    return ruleName;
  }

  return `@fluentui-contrib/${ruleName}`;
}
