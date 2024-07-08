import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { TextExample } from '../../src/components/fluent/Text';

export const Text = () => (
  <FluentProvider theme={AzureLightTheme}>
    <TextExample />
  </FluentProvider>
);
