import { GriffelRenderer } from '@griffel/core';
import { createDOMRenderer } from '@fluentui/react-components';

export const createFallbackRenderer = (
  shadowRoot: ShadowRoot
): GriffelRenderer => {
  const documentFallback: Partial<Document> = {
    head: shadowRoot as unknown as HTMLHeadElement,
    createElement: shadowRoot.ownerDocument.createElement.bind(
      shadowRoot.ownerDocument
    ),
  };

  return createDOMRenderer(documentFallback as Document);
};
