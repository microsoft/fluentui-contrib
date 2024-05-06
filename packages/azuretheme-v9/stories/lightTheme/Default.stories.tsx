import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { AllControls } from '../../src/components/AllControls/AllControls';

export const Default = () => (
  <FluentProvider theme={azureLightTheme}>
    <div>Light theme</div>
    <AllControls />
  </FluentProvider>
);
