import type { Root } from 'react-shadow';

export type CreateRootOptions = {
  insertionPoint?: CSSStyleSheet;
};
export type CreateRoot = (options?: CreateRootOptions) => Root;
export type RootRenderFn = (props: {
  children: React.ReactNode;
  root: ShadowRoot;
  ssr: boolean;
}) => React.ReactNode;
