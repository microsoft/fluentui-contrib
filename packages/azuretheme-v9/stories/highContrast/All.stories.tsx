import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { AllControls } from '../../src/components/AllControls/AllControls';

export const All = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <div>Light theme</div>
    <AllControls />
  </FluentProvider>
);
