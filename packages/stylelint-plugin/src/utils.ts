import type { Document, AtRule } from 'postcss';
export function isAtRule(container: { type: string }): container is AtRule {
  return container?.type === 'atrule';
}

export function isDocument(container: { type: string }): container is Document {
  return container.type === 'document';
}
