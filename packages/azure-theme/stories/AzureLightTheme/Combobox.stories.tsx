import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { ComboboxExample } from '../../src/components/fluent/ComboboxExample';

export const Combobox = () => (
  <FluentProvider theme={AzureLightTheme}>
    <ComboboxExample />
  </FluentProvider>
);
