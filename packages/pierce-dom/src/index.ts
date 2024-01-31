/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { getShadowDOMAPI } from 'tabster';
import { useFluent } from '@fluentui/react-components';

export type DOMAPI = ReturnType<typeof getShadowDOMAPI>;

interface WindowWithTabsterShadowDOMAPI extends Window {
  __tabsterShadowDOMAPI?: DOMAPI;
}

/**
 * Imports support for ShadowDOM and assigns it to the current window, so that it can be used from useTabster()
 * but remains tree-shakeable when not needed.
 *
 * Must be called before useTabster() is called, right after FluentProvider.
 *
 * @returns Tabster ShadowDOM API
 */
export const useShadowDOMSupport = (): DOMAPI | undefined => {
  const { targetDocument } = useFluent();
  const defaultView = targetDocument?.defaultView as
    | WindowWithTabsterShadowDOMAPI
    | undefined;

  return defaultView
    ? (defaultView.__tabsterShadowDOMAPI = getShadowDOMAPI())
    : undefined;
};

export { getShadowDOMAPI };
