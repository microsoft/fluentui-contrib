import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { BreadcrumbExample } from '../../src/components/fluent/BreadcrumbExample';

export const Breadcrumb = () => (
  <FluentProvider theme={azureLightTheme}>
    <BreadcrumbExample />
  </FluentProvider>
);
