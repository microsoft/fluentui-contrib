import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { MenuExample } from '../../src/components/fluent/MenuExample';

export const Menu = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <MenuExample />
  </FluentProvider>
);
