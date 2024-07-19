import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { LabelExample } from '../../src/components/fluent/LabelExample';

export const Label = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <LabelExample />
  </FluentProvider>
);
