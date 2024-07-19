import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { TableExample } from '../../src/components/fluent/TableExample';

export const Table = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <TableExample />
  </FluentProvider>
);
