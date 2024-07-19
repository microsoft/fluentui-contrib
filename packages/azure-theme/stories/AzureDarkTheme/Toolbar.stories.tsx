import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { ToolbarExample } from '../../src/components/fluent/Toolbar';

export const Toolbar = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <ToolbarExample />
  </FluentProvider>
);
