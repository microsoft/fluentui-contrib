import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { FieldExample } from '../../src/components/fluent/FieldExample';

export const Field = () => (
  <FluentProvider theme={AzureLightTheme}>
    <FieldExample />
  </FluentProvider>
);
