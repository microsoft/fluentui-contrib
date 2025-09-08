/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement, Fragment } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-components';
import { TextDirectionProvider } from '@griffel/react';
import {
  OverridesProvider_unstable as OverridesProvider,
  Provider_unstable as Provider,
  TooltipVisibilityProvider_unstable as TooltipVisibilityProvider,
  CustomStyleHooksProvider_unstable as CustomStyleHooksProvider,
  CustomStyleHooksContextValue_unstable as CustomStyleHooksContextValue,
} from '@fluentui/react-shared-contexts';
import type {
  FluentProviderContextValues,
  FluentProviderState,
  FluentProviderSlots,
} from '@fluentui/react-components';
import { IconDirectionContextProvider } from '@fluentui/react-icons';

/**
 * Render the final JSX of ThemelessFluentProvider
 */
export const renderThemelessFluentProvider_unstable = (
  state: FluentProviderState,
  contextValues: FluentProviderContextValues
): JSX.Element => {
  assertSlots<FluentProviderSlots>(state);

  // Typescript (vscode) incorrectly references the FluentProviderProps.customStyleHooks_unstable
  // instead of FluentProviderContextValues.customStyleHooks_unstable and thinks it is
  // Partial<CustomStyleHooksContextValue>, so it needs to be cast to Required<CustomStyleHooksContextValue>
  return (
    <Provider value={contextValues.provider}>
      <CustomStyleHooksProvider
        value={
          contextValues.customStyleHooks_unstable as Required<CustomStyleHooksContextValue>
        }
      >
        <TooltipVisibilityProvider value={contextValues.tooltip}>
          <TextDirectionProvider dir={contextValues.textDirection}>
            <IconDirectionContextProvider value={contextValues.iconDirection}>
              <OverridesProvider value={contextValues.overrides_unstable}>
                <state.root>{state.root.children}</state.root>
              </OverridesProvider>
            </IconDirectionContextProvider>
          </TextDirectionProvider>
        </TooltipVisibilityProvider>
      </CustomStyleHooksProvider>
    </Provider>
  );
};
