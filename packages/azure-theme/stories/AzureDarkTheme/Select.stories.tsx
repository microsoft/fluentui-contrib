import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { SelectExample } from '../../src/components/fluent/SelectExample';

export const Select = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <SelectExample />
  </FluentProvider>
);
