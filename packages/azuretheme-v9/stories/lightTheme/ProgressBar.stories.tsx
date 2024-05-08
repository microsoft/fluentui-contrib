import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { ProgressBarExample } from '../../src/components/fluent/ProgressBarExample';

export const ProgressBar = () => (
  <FluentProvider theme={azureLightTheme}>
    <ProgressBarExample />
  </FluentProvider>
);
