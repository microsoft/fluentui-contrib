import * as React from 'react';
import {
  getIntrinsicElementProps,
  useFluent,
  useFluentProviderContextValues_unstable,
  useFocusVisible,
  useMergedRefs,
  slot,
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

import { useThemelessProviderStyles_unstable } from './useThemelessFluentProviderStyles.styles';
import { renderThemelessFluentProvider_unstable } from './renderThemelessFluentProvider';

type ThemelessFluentProviderProps = Omit<
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

function useThemelessFluentProviderState(
  props: ThemelessFluentProviderProps,
  ref: React.Ref<HTMLDivElement>
): FluentProviderState {
  const parentContext = useFluent();
  const parentOverrides = useOverrides();
  const parentCustomStyleHooks: CustomStyleHooksContextValue =
    React.useContext(CustomStyleHooksContext) || {};

  const {
    customStyleHooks_unstable,
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
    applyStylesToPortals: false,
    customStyleHooks_unstable: mergedCustomStyleHooks,
    dir,
    targetDocument,
    theme: {},
    overrides_unstable: mergedOverrides,
    themeClassName: '',

    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
        dir,
        ref: useMergedRefs(
          ref,
          useFocusVisible<HTMLDivElement>({ targetDocument })
        ),
      }),
      { elementType: 'div' }
    ),

    // server-side rendering not supported
    serverStyleProps: {
      cssRule: '',
      attributes: {},
    },
  };
}

export const ThemelessFluentProvider = React.forwardRef<
  HTMLElement,
  ThemelessFluentProviderProps
>((props, ref) => {
  const state = useThemelessFluentProviderState(props, ref);
  useThemelessProviderStyles_unstable(state);
  const contextValues = useFluentProviderContextValues_unstable(state);

  return renderThemelessFluentProvider_unstable(state, contextValues);
});

ThemelessFluentProvider.displayName = 'ThemelessFluentProvider';
