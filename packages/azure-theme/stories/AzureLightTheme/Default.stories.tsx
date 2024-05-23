import * as React from 'react';
import { AzureLightTheme, AllControls } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';

export const Default = () => (
  <FluentProvider theme={AzureLightTheme}>
    <AllControls />
  </FluentProvider>
);
