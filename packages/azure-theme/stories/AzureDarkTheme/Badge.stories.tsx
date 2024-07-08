import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { BadgeExample } from '../../src/components/fluent/BadgeExample';

export const Badge = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <BadgeExample />
  </FluentProvider>
);
