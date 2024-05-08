import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { BreadcrumbExample } from '../../src/components/fluent/BreadcrumbExample';

export const Breadcrumb = () => (
  <FluentProvider theme={azureDarkTheme}>
    <BreadcrumbExample />
  </FluentProvider>
);
