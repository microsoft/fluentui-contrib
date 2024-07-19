import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { TableExample } from '../../src/components/fluent/TableExample';

export const Table = () => (
  <FluentProvider theme={AzureLightTheme}>
    <TableExample />
  </FluentProvider>
);
