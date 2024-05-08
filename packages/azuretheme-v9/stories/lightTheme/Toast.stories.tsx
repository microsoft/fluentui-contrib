import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { ToastExample } from '../../src/components/fluent/Toast';

export const Toast = () => (
  <FluentProvider theme={azureLightTheme}>
    <ToastExample />
  </FluentProvider>
);
