import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { LabelExample } from '../../src/components/fluent/LabelExample';

export const Label = () => (
  <FluentProvider theme={AzureLightTheme}>
    <LabelExample />
  </FluentProvider>
);
