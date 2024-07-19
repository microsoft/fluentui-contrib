import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { CardExample } from '../../src/components/fluent/CardExample';

export const Card = () => (
  <FluentProvider theme={AzureLightTheme}>
    <CardExample />
  </FluentProvider>
);
