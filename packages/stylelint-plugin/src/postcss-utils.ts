// nx-ignore-next-line - needs https://github.com/nrwl/nx/issues/29853 to resolve transitive dependency if direct import is used
import type { Document, AtRule, Root, Container, Rule } from 'postcss';

export function isAtRule(container: { type: string }): container is AtRule {
  return container?.type === 'atrule';
}

export function isDocument(container: { type: string }): container is Document {
  return container.type === 'document';
}

export function extractAllSelectors(root: Root) {
  const selectors: string[] = [];
  const selectorToRule: Record<string, Rule> = {};
  root.walkRules((rule) => {
    let cur: Container | Document | undefined = rule.parent;
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

  return { selectors, selectorToRule };
}
