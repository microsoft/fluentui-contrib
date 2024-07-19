import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { BreadcrumbExample } from '../../src/components/fluent/BreadcrumbExample';

export const Breadcrumb = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <BreadcrumbExample />
  </FluentProvider>
);
