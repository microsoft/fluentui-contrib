import * as React from 'react';
// @ts-expect-error Typings are missing
import { createProxy as _createProxy, default as _root } from 'react-shadow';

export type Root = typeof _root;

type CreateProxyRenderFn = ({
  children,
}: {
  children: React.ReactNode;
  root: ShadowRoot;
}) => React.ReactNode;
type CreateProxyFn = (
  target: unknown,
  id: string,
  render: CreateProxyRenderFn
) => Root;

export const createProxy: CreateProxyFn = _createProxy;
