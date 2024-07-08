import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { DataGridExample } from '../../src/components/fluent/DataGridExample';

export const DataGrid = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <DataGridExample />
  </FluentProvider>
);
