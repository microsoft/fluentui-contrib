import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { TreeExample } from '../../src/components/fluent/Tree';

export const Tree = () => (
  <FluentProvider theme={AzureLightTheme}>
    <TreeExample />
  </FluentProvider>
);
