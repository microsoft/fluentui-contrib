import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { DrawerExample } from '../../src/components/fluent/DrawerExample';

export const Drawer = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <DrawerExample />
  </FluentProvider>
);
