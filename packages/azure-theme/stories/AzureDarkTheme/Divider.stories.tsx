import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { DividerExample } from '../../src/components/fluent/DividerExample';

export const Divider = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <DividerExample />
  </FluentProvider>
);
