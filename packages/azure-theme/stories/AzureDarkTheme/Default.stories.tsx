import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { AllControls } from '../../src/components/AllControls/AllControls';

export const Default = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <AllControls />
  </FluentProvider>
);
