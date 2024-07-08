import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { AllControls } from '../../src/components/AllControls/AllControls';

export const All = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <div>Dark theme</div>
    <AllControls />
  </FluentProvider>
);
