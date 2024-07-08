import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { SpinButtonExample } from '../../src/components/fluent/SpinButtonExample';

export const SpinButton = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <SpinButtonExample />
  </FluentProvider>
);
