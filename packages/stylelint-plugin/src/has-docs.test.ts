import plugins from '.';
import * as fs from 'fs';
import * as path from 'path';
import { Plugin, Rule } from 'stylelint';

describe('All rules', () => {
  it('should have docs', () => {
    const urlsAndNames: [string, string][] = [];
    for (const plugin of plugins) {
      if (!isNormalizedPlugin(plugin)) {
        throw new Error('Plugin does not follow correct export structure');
      }

      expect(plugin.rule.meta?.url).toBeDefined();
      urlsAndNames.push([plugin.ruleName, plugin.rule.meta?.url ?? '']);
    }

    const urlBase =
      'https://github.com/microsoft/fluentui-contrib/blob/main/packages/stylelint-plugin/src/rules';
    for (const [ruleName, url] of urlsAndNames) {
      const ruleNameWithoutNamespace = ruleName.replace(
        '@fluentui-contrib/',
        ''
      );
      expect(url).toBe(`${urlBase}/${ruleNameWithoutNamespace}/README.md`);

      const pathToDoc = path.resolve(
        __dirname,
        'rules',
        ruleNameWithoutNamespace,
        'README.md'
      );

      expect(fs.existsSync(pathToDoc)).toBe(true);
    }
  });
});

function isNormalizedPlugin(
  plugin: Plugin
): plugin is { ruleName: string; rule: Rule } {
  // eslint-disable-next-line no-prototype-builtins
  return !plugin.hasOwnProperty('default');
}
