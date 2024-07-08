import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { TreeExample } from '../../src/components/fluent/Tree';

export const Tree = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <TreeExample />
  </FluentProvider>
);
