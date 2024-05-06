import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';

export const Buttons = () => (
  <FluentProvider theme={azureLightTheme}>
    <div>BUTTONS</div>
  </FluentProvider>
);
