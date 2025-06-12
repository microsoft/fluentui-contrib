import * as React from 'react';
import {
  renderFluentProvider_unstable,
  slot,
  useFluent,
  useFluentProviderContextValues_unstable,
} from '@fluentui/react-components';
import type {
  FluentProviderProps,
  FluentProviderState,
} from '@fluentui/react-components';
import {
  CustomStyleHooksContext_unstable as CustomStyleHooksContext,
  useOverrides_unstable as useOverrides,
} from '@fluentui/react-shared-contexts';
import type { CustomStyleHooksContextValue_unstable as CustomStyleHooksContextValue } from '@fluentui/react-shared-contexts';

type HeadlessFluentProviderProps = Omit<
  FluentProviderProps,
  'applyStylesToPortals' | 'theme'
>;

function shallowMerge<T>(a: T, b: T): T {
  // Merge impacts perf: we should like to avoid it if it's possible
  if (a && b) {
    return { ...a, ...b };
  }

  if (a) {
    return a;
  }

  return b;
}

function useHeadlessFluentProviderState(
  props: HeadlessFluentProviderProps
): FluentProviderState {
  const parentContext = useFluent();
  const parentOverrides = useOverrides();
  const parentCustomStyleHooks: CustomStyleHooksContextValue =
    React.useContext(CustomStyleHooksContext) || {};

  const {
    customStyleHooks_unstable,
    children,
    dir = parentContext.dir,
    targetDocument = parentContext.targetDocument,
    overrides_unstable: overrides = {},
  } = props;

  const mergedOverrides = shallowMerge(parentOverrides, overrides);
  const mergedCustomStyleHooks = shallowMerge(
    parentCustomStyleHooks,
    customStyleHooks_unstable
  ) as CustomStyleHooksContextValue;

  return {
    // "dir" & "document" needs to be specified for proper rendering of children
    dir,
    targetDocument,

    customStyleHooks_unstable: mergedCustomStyleHooks,
    overrides_unstable: mergedOverrides,

    // In headless mode, we don't render any elements

    components: { root: React.Fragment },
    root: slot.always({ children }, { elementType: React.Fragment }),

    // Styling is ignored in headless mode

    themeClassName: '',
    theme: {},

    applyStylesToPortals: false,
    serverStyleProps: {
      cssRule: '',
      attributes: {},
    },
  };
}

export const HeadlessFluentProvider: React.FC<HeadlessFluentProviderProps> = (
  props
) => {
  const state = useHeadlessFluentProviderState(props);
  const contextValues = useFluentProviderContextValues_unstable(state);

  return renderFluentProvider_unstable(state, contextValues);
};
