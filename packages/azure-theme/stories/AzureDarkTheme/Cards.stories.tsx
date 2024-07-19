import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { CardExample } from '../../src/components/fluent/CardExample';

export const Card = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <CardExample />
  </FluentProvider>
);
