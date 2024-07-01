import * as React from 'react';
import { AzureLightTheme, Controls } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';

export const Default = () => (
  <FluentProvider theme={AzureLightTheme}>
    <Controls />
  </FluentProvider>
);
