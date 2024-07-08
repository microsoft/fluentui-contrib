import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { RadioGroupExample } from '../../src/components/fluent/RadioGroupExample';

export const RadioGroup = () => (
  <FluentProvider theme={AzureLightTheme}>
    <RadioGroupExample />
  </FluentProvider>
);
