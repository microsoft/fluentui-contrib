import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SwitchExample } from '../../src/components/fluent/SwitchExample';

export const Switch = () => (
  <FluentProvider theme={azureDarkTheme}>
    <SwitchExample />
  </FluentProvider>
);
