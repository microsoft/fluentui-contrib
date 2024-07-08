import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { CheckboxExample } from '../../src/components/fluent/CheckboxExample';

export const Checkbox = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <CheckboxExample />
  </FluentProvider>
);
