import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { AllControls } from '../../src/components/AllControls/allControls';

export const All = () => (
  <FluentProvider theme={azureDarkTheme}>
    <div>Light theme</div>
    <AllControls />
  </FluentProvider>
);
