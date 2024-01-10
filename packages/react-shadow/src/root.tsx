import {
  RendererProvider,
  PortalMountNodeProvider,
} from '@fluentui/react-components';
import { createShadowDOMRenderer } from '@griffel/shadow-dom';
import * as React from 'react';
import { createProxy } from 'react-shadow';
import type { Root } from 'react-shadow';

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
  ({ children, root }) => (
    <ReactComponentsWrapper root={root}>{children}</ReactComponentsWrapper>
  )
);
