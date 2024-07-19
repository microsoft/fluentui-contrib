import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { DropdownExample } from '../../src/components/fluent/DropdownExample';

export const Dropdown = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <DropdownExample />
  </FluentProvider>
);
