import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { LinkExample } from '../../src/components/fluent/LinkExample';

export const Link = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <LinkExample />
  </FluentProvider>
);
