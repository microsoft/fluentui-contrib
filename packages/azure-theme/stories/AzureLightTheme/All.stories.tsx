import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { AllControls } from '../../src/components/AllControls/AllControls';

export const All = () => (
  <FluentProvider theme={AzureLightTheme}>
    <div>Light theme</div>
    <AllControls />
  </FluentProvider>
);
