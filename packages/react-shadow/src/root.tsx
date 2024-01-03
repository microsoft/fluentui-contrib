import {
  RendererProvider,
  PortalMountNodeProvider,
} from '@fluentui/react-components';
import { createShadowDOMRenderer } from '@griffel/shadow-dom';
import * as React from 'react';
import { createProxy } from 'react-shadow';
import {
  REACT_SHADOW_INSERTION_BUCKET_NAME,
  SUPPORTS_MODIFYING_ADOPTED_STYLESHEETS,
} from './constants';
import type { Root } from 'react-shadow';
import type { GriffelShadowDOMRenderer } from '@griffel/shadow-dom';

// Hack to get this type that is not directly exported at the moment.
type ExtendedCSSStyleSheet = GriffelShadowDOMRenderer['adoptedStyleSheets'][0];

const ReactComponentsWrapper: React.FC<{
  children: React.ReactNode;
  root: ShadowRoot;
}> = ({ children, root }) => {
  const renderer = React.useMemo(() => createShadowDOMRenderer(root), [root]);

  return (
    <RendererProvider renderer={renderer}>
      <PortalMountNodeProvider value={root}>{children}</PortalMountNodeProvider>
    </RendererProvider>
  );
};

export const root: Root = createProxy(
  {},
  '@fluentui/react-components',
  ({ children, root, insertionPoint }) => (
    <ReactComponentsWrapper root={root} insertionPoint={insertionPoint}>
      {children}
    </ReactComponentsWrapper>
  )
);
