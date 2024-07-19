import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { SwitchExample } from '../../src/components/fluent/SwitchExample';

export const Switch = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <SwitchExample />
  </FluentProvider>
);
