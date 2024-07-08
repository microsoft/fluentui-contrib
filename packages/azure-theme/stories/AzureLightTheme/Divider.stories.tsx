import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { DividerExample } from '../../src/components/fluent/DividerExample';

export const Divider = () => (
  <FluentProvider theme={AzureLightTheme}>
    <DividerExample />
  </FluentProvider>
);
