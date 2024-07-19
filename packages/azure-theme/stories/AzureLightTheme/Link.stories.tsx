import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { LinkExample } from '../../src/components/fluent/LinkExample';

export const Link = () => (
  <FluentProvider theme={AzureLightTheme}>
    <LinkExample />
  </FluentProvider>
);
