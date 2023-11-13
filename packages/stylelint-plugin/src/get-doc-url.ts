const root =
  'https://github.com/microsoft/fluentui-contrib/blob/main/packages/stylelint-plugin/src/rules';

export function getDocUrl(ruleName: string) {
  const ruleNameWithoutNamespace = ruleName
    .slice()
    .replace('@fluentui-contrib/', '');
  return `${root}/${ruleNameWithoutNamespace}/README.md`;
}
