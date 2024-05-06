import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { TableExample } from '../../src/components/fluent/TableExample';

export const Table = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <TableExample />
  </FluentProvider>
);
