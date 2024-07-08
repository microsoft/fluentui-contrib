import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { TextExample } from '../../src/components/fluent/Text';

export const Text = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <TextExample />
  </FluentProvider>
);
