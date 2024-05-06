import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SpinButtonExample } from '../../src/components/fluent/SpinButtonExample';

export const SpinButton = () => (
  <FluentProvider theme={azureLightTheme}>
    <SpinButtonExample />
  </FluentProvider>
);
