import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { InputExample } from '../../src/components/fluent/InputExample';

export const Input = () => (
  <FluentProvider theme={AzureLightTheme}>
    <InputExample />
  </FluentProvider>
);
