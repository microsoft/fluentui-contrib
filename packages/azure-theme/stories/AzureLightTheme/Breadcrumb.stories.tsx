import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { BreadcrumbExample } from '../../src/components/fluent/BreadcrumbExample';

export const Breadcrumb = () => (
  <FluentProvider theme={AzureLightTheme}>
    <BreadcrumbExample />
  </FluentProvider>
);
