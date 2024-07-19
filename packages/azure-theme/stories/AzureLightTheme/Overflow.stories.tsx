import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { OverflowExample } from '../../src/components/fluent/OverflowExample';

export const Overflow = () => (
  <FluentProvider theme={AzureLightTheme}>
    <OverflowExample />
  </FluentProvider>
);
