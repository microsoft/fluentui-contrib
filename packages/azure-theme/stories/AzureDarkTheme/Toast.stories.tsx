import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { ToastExample } from '../../src/components/fluent/Toast';

export const Toast = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <ToastExample />
  </FluentProvider>
);
