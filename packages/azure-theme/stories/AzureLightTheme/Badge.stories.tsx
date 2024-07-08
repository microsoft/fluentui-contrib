import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { BadgeExample } from '../../src/components/fluent/BadgeExample';

export const Badge = () => (
  <FluentProvider theme={AzureLightTheme}>
    <BadgeExample />
  </FluentProvider>
);
