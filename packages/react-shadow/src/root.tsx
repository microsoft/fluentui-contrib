import { RendererProvider } from '@fluentui/react-components';
import { createShadowDOMRenderer } from '@griffel/shadow-dom';
import * as React from 'react';
import { createProxy } from 'react-shadow';
import type { Root } from 'react-shadow';

const ReactComponentsWrapper: React.FC<{
  children: React.ReactNode;
  root: ShadowRoot;
}> = ({ children, root }) => {
  const renderer = React.useMemo(() => createShadowDOMRenderer(root), [root]);

  // TODO: explain this
  React.useLayoutEffect(() => {
    if (renderer.adoptedStyleSheets && renderer.adoptedStyleSheets.length > 0) {
      if (
        root.adoptedStyleSheets.find(
          (styleSheet) => styleSheet === renderer.adoptedStyleSheets[0]
        )
      ) {
        return;
      }

      root.adoptedStyleSheets = [
        ...root.adoptedStyleSheets,
        ...renderer.adoptedStyleSheets,
      ];
    }
  }, [renderer.adoptedStyleSheets, root.adoptedStyleSheets]);

  // TODO: polyfill does not work with ShadowRoot
  // React.useLayoutEffect(() => {
  //   applyFocusVisiblePolyfill(
  //     root.host as HTMLElement,
  //     root.ownerDocument.defaultView!
  //   );
  // }, [root]);

  return (
    <RendererProvider renderer={renderer}>
      {/* TODO: FluentProvider should accept ShadowRoot as targetDocument*/}
      {/*<Provider_unstable*/}
      {/*  value={{ dir: 'ltr', targetDocument: root as unknown as Document }}*/}
      {/*>*/}
      {children}
      {/*</Provider_unstable>*/}
    </RendererProvider>
  );
};

export const root: Root = createProxy(
  {},
  '@fluentui/react-components',
  ({ children, root }) => (
    <ReactComponentsWrapper root={root}>{children}</ReactComponentsWrapper>
  )
);
