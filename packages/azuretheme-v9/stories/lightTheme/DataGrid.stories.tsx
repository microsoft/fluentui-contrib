import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { DataGridExample } from '../../src/components/fluent/DataGridExample';

export const DataGrid = () => (
  <FluentProvider theme={azureLightTheme}>
    <DataGridExample />
  </FluentProvider>
);
