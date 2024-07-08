import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { DataGridExample } from '../../src/components/fluent/DataGridExample';

export const DataGrid = () => (
  <FluentProvider theme={AzureLightTheme}>
    <DataGridExample />
  </FluentProvider>
);
