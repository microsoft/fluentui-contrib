import {
  RendererProvider,
  PortalMountNodeProvider,
} from '@fluentui/react-components';
import { createShadowDOMRenderer } from '@griffel/shadow-dom';
import * as React from 'react';
import { createProxy } from 'react-shadow';
import type { Root } from 'react-shadow';
import type { CreateRoot, CreateRootOptions, RootRenderFn } from './types';

const ID = '@fluentui/react-components';

const ReactComponentsWrapper: React.FC<{
  children: React.ReactNode;
  root: ShadowRoot;
  insertionPoint?: CSSStyleSheet;
}> = ({ children, root, insertionPoint }) => {
  const renderer = React.useMemo(() => {
    return createShadowDOMRenderer(root, { insertionPoint });
  }, [root]);

  return (
    <RendererProvider renderer={renderer}>
      <PortalMountNodeProvider value={root}>{children}</PortalMountNodeProvider>
    </RendererProvider>
  );
};

const createWrapper = (options?: CreateRootOptions): RootRenderFn => {
  return ({ children, root }) => (
    <ReactComponentsWrapper
      root={root}
      insertionPoint={options?.insertionPoint}
    >
      {children}
    </ReactComponentsWrapper>
  );
};

export const createRoot: CreateRoot = (options) => {
  return createProxy({}, ID, createWrapper(options));
};

export const root: Root = createProxy({}, ID, createWrapper());
