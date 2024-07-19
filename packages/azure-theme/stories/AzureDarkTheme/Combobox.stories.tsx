import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { ComboboxExample } from '../../src/components/fluent/ComboboxExample';

export const Combobox = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <ComboboxExample />
  </FluentProvider>
);
