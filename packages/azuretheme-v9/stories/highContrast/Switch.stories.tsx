import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SwitchExample } from '../../src/components/fluent/SwitchExample';

export const Switch = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <SwitchExample />
  </FluentProvider>
);
