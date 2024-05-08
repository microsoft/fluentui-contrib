import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { ProgressBarExample } from '../../src/components/fluent/ProgressBarExample';

export const ProgressBar = () => (
  <FluentProvider theme={azureDarkTheme}>
    <ProgressBarExample />
  </FluentProvider>
);
