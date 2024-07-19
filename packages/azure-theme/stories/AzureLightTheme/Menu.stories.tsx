import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { MenuExample } from '../../src/components/fluent/MenuExample';

export const Menu = () => (
  <FluentProvider theme={AzureLightTheme}>
    <MenuExample />
  </FluentProvider>
);
