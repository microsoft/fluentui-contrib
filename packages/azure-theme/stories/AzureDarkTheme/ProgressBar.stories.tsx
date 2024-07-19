import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { ProgressBarExample } from '../../src/components/fluent/ProgressBarExample';

export const ProgressBar = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <ProgressBarExample />
  </FluentProvider>
);
