import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SpinButtonExample } from '../../src/components/fluent/SpinButtonExample';

export const SpinButton = () => (
  <FluentProvider theme={azureDarkTheme}>
    <SpinButtonExample />
  </FluentProvider>
);
