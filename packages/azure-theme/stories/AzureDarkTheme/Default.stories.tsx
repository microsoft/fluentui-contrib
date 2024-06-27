import * as React from 'react';
import { AzureDarkTheme, Controls } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';

export const Default = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <Controls />
  </FluentProvider>
);