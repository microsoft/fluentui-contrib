import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { AllControls } from '../../src/components/AllControls/AllControls';
export const Default = () => (
  <FluentProvider theme={azureDarkTheme}>
    <div>Dark theme </div>
    <AllControls />
  </FluentProvider>
);
